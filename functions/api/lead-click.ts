interface Env {
  LEAD_WEBHOOK_URL?: string;
  LEAD_WEBHOOK_SECRET?: string;
}

type LeadClickPayload = {
  eventName?: string;
  fields?: Record<string, string>;
};

const ALLOWED_ORIGINS = ["https://fernesta.com", "https://www.fernesta.com"];
const MAX_BODY_BYTES = 10_000;
const MAX_FIELD_COUNT = 20;
const MAX_KEY_LENGTH = 64;
const MAX_VALUE_LENGTH = 500;
const RATE_WINDOW_MS = 5 * 60 * 1000;
const RATE_MAX_REQUESTS = 20;
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
    if (value.length > MAX_VALUE_LENGTH) return null;
    normalized[key] = value;
  }
  return normalized;
}

async function forwardClickWebhook(
  env: Env,
  request: Request,
  payload: { eventName: string; fields: Record<string, string> }
) {
  const webhookUrl = env.LEAD_WEBHOOK_URL?.trim();
  if (!webhookUrl) return false;

  const secret = env.LEAD_WEBHOOK_SECRET?.trim();
  const headers = new Headers({
    "Content-Type": "application/json",
  });
  if (secret) headers.set("X-Fernesta-Lead-Secret", secret);

  const body: Record<string, unknown> = {
    subject: `Lead Activity - ${payload.eventName}`,
    formName: "Lead Activity",
    fields: {
      event_name: payload.eventName,
      ...payload.fields,
    },
    submittedAt: new Date().toISOString(),
    sourceOrigin: request.headers.get("Origin") || "",
    userAgent: request.headers.get("User-Agent") || "",
  };

  if (secret) body.webhookSecret = secret;

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.warn(`Lead activity webhook failed with status ${response.status}`);
      return false;
    }
    return true;
  } catch (error) {
    console.warn("Lead activity webhook failed", error);
    return false;
  }
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

  if (!context.env.LEAD_WEBHOOK_URL?.trim()) {
    return json({ error: "Lead webhook is not configured." }, 500, origin);
  }

  const contentType = context.request.headers.get("Content-Type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return json({ error: "Unsupported content type." }, 415, origin);
  }

  const contentLength = Number(context.request.headers.get("Content-Length") || "0");
  if (contentLength > MAX_BODY_BYTES) {
    return json({ error: "Payload too large." }, 413, origin);
  }

  const ip = getClientIp(context.request);
  if (isRateLimited(ip)) {
    return json({ error: "Too many requests. Please try again later." }, 429, origin);
  }

  const rawBody = await context.request.text().catch(() => "");
  if (!rawBody || rawBody.length > MAX_BODY_BYTES) {
    return json({ error: "Payload too large." }, 413, origin);
  }

  let payload: LeadClickPayload;
  try {
    payload = JSON.parse(rawBody || "{}") as LeadClickPayload;
  } catch {
    return json({ error: "Invalid JSON payload." }, 400, origin);
  }

  const eventName = (payload.eventName?.trim() || "website_click").slice(0, 80);
  const fields = normalizeFields(payload.fields);
  if (!fields) {
    return json({ error: "Invalid payload" }, 400, origin);
  }

  const delivered = await forwardClickWebhook(context.env, context.request, {
    eventName,
    fields,
  });

  if (!delivered) {
    return json({ error: "Failed to record lead activity." }, 502, origin);
  }

  return json({ success: true }, 200, origin);
};
