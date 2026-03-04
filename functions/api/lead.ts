interface Env {
  RESEND_API_KEY?: string;
  LEAD_TO_EMAIL?: string;
  LEAD_FROM_EMAIL?: string;
}

type LeadPayload = {
  subject?: string;
  formName?: string;
  fields?: Record<string, string>;
};

const ALLOWED_ORIGINS = ["https://fernesta.com", "https://www.fernesta.com"];
const MAX_BODY_BYTES = 20_000;
const MAX_FIELD_COUNT = 20;
const MAX_KEY_LENGTH = 64;
const MAX_VALUE_LENGTH = 1000;
const RATE_WINDOW_MS = 5 * 60 * 1000;
const RATE_MAX_REQUESTS = 6;
const HONEYPOT_KEYS = new Set(["website", "url", "homepage", "hp_field"]);
const rateStore = new Map<string, number[]>();

function json(body: unknown, status = 200, origin = "") {
  const allowOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": allowOrigin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin",
    },
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isAllowedOrigin(origin: string) {
  return !origin || ALLOWED_ORIGINS.includes(origin);
}

function getClientIp(request: Request) {
  return (
    request.headers.get("CF-Connecting-IP") ||
    request.headers.get("X-Forwarded-For")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

function cleanupRateStore(now = Date.now()) {
  for (const [key, timestamps] of rateStore) {
    const filtered = timestamps.filter((ts) => now - ts < RATE_WINDOW_MS);
    if (!filtered.length) {
      rateStore.delete(key);
      continue;
    }
    rateStore.set(key, filtered);
  }
}

function isRateLimited(key: string, now = Date.now()) {
  cleanupRateStore(now);
  const existing = rateStore.get(key) ?? [];
  if (existing.length >= RATE_MAX_REQUESTS) return true;
  existing.push(now);
  rateStore.set(key, existing);
  return false;
}

function normalizeFields(fields: unknown): Record<string, string> | null {
  if (!fields || typeof fields !== "object" || Array.isArray(fields)) return null;
  const entries = Object.entries(fields);
  if (!entries.length || entries.length > MAX_FIELD_COUNT) return null;

  const normalized: Record<string, string> = {};
  for (const [rawKey, rawValue] of entries) {
    const key = String(rawKey).trim().toLowerCase().replace(/\s+/g, "_");
    if (!key || key.length > MAX_KEY_LENGTH) return null;
    const value = String(rawValue ?? "").trim();
    if (!value && !HONEYPOT_KEYS.has(key)) return null;
    if (value.length > MAX_VALUE_LENGTH) return null;
    normalized[key] = value;
  }
  return normalized;
}

function hasTriggeredHoneypot(fields: Record<string, string>) {
  return Object.entries(fields).some(([key, value]) => HONEYPOT_KEYS.has(key) && Boolean(value.trim()));
}

function buildHtml(formName: string, fields: Record<string, string>) {
  const rows = Object.entries(fields)
    .map(
      ([key, value]) =>
        `<tr><td style="padding:8px 10px;border:1px solid #d6d8d0;"><strong>${escapeHtml(
          key
        )}</strong></td><td style="padding:8px 10px;border:1px solid #d6d8d0;">${escapeHtml(
          value
        )}</td></tr>`
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto;">
      <h2 style="color:#2d4430;">New Lead Submission</h2>
      <p><strong>Form:</strong> ${escapeHtml(formName)}</p>
      <table style="border-collapse:collapse;width:100%;border:1px solid #d6d8d0;">${rows}</table>
    </div>
  `;
}

export const onRequestOptions = async (context: { request: Request }) => {
  const origin = context.request.headers.get("Origin") || "";
  if (!isAllowedOrigin(origin)) {
    return json({ error: "Origin not allowed." }, 403, origin);
  }
  return json({ ok: true }, 200, origin);
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const origin = context.request.headers.get("Origin") || "";
  if (!isAllowedOrigin(origin)) {
    return json({ error: "Origin not allowed." }, 403, origin);
  }

  const contentType = context.request.headers.get("Content-Type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return json({ error: "Unsupported content type." }, 415, origin);
  }

  const contentLength = Number(context.request.headers.get("Content-Length") || "0");
  if (contentLength > MAX_BODY_BYTES) {
    return json({ error: "Payload too large." }, 413, origin);
  }

  const { RESEND_API_KEY, LEAD_FROM_EMAIL, LEAD_TO_EMAIL } = context.env;
  if (!RESEND_API_KEY || !LEAD_FROM_EMAIL || !LEAD_TO_EMAIL) {
    return json({ error: "Lead email provider not configured." }, 500, origin);
  }

  const rawBody = await context.request.text().catch(() => "");
  if (!rawBody || rawBody.length > MAX_BODY_BYTES) {
    return json({ error: "Payload too large." }, 413, origin);
  }

  let payload: LeadPayload;
  try {
    payload = JSON.parse(rawBody || "{}") as LeadPayload;
  } catch {
    return json({ error: "Invalid JSON payload." }, 400, origin);
  }
  const subject = (payload.subject?.trim() || "New Lead").slice(0, 140);
  const formName = (payload.formName?.trim() || "Website Form").slice(0, 120);
  const fields = normalizeFields(payload.fields);
  if (!fields) {
    return json({ error: "Invalid payload" }, 400, origin);
  }

  if (hasTriggeredHoneypot(fields)) {
    return json({ success: true }, 200, origin);
  }

  const ip = getClientIp(context.request);
  const rateKey = `${ip}:${formName.toLowerCase()}`;
  if (isRateLimited(rateKey)) {
    return json({ error: "Too many requests. Please try again later." }, 429, origin);
  }

  const cleanFields = Object.fromEntries(
    Object.entries(fields).filter(([key]) => !HONEYPOT_KEYS.has(key))
  );

  if (!Object.keys(cleanFields).length) {
    return json({ error: "Invalid payload" }, 400, origin);
  }

  const emailField = cleanFields.email;
  if (emailField && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField)) {
    return json({ error: "Invalid email value." }, 400, origin);
  }

  const html = buildHtml(formName, cleanFields);
  const text = [`Form: ${formName}`, ...Object.entries(cleanFields).map(([k, v]) => `${k}: ${v}`)].join("\n");

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: LEAD_FROM_EMAIL,
      to: [LEAD_TO_EMAIL],
      subject,
      html,
      text,
    }),
  });

  if (!resendResponse.ok) {
    const details = await resendResponse.text();
    return json({ error: "Failed to send lead email", details }, 502, origin);
  }

  return json({ success: true }, 200, origin);
};
