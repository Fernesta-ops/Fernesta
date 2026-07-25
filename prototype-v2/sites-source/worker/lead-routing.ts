export interface LeadRoutingEnv {
  WEB3FORMS_ACCESS_KEY?: string;
  RESEND_API_KEY?: string;
  LEAD_TO_EMAIL?: string;
  LEAD_FROM_EMAIL?: string;
  LEAD_WEBHOOK_URL?: string;
  LEAD_WEBHOOK_SECRET?: string;
}

interface ExecutionContextLike {
  waitUntil(promise: Promise<unknown>): void;
}

type LeadPayload = {
  subject?: string;
  formName?: string;
  fields?: Record<string, unknown>;
};

const DEFAULT_LEAD_EMAIL = "tarun@fernesta.com";
const DEFAULT_WEB3FORMS_ACCESS_KEY = "83322097-71cb-4b31-ab65-847f25109591";
const WHATSAPP_NUMBER = "918209458984";
const MAX_BODY_BYTES = 20_000;
const MAX_FIELD_COUNT = 24;
const MAX_KEY_LENGTH = 64;
const MAX_VALUE_LENGTH = 1_500;
const RATE_WINDOW_MS = 5 * 60 * 1_000;
const RATE_MAX_REQUESTS = 6;
const HONEYPOT_FIELD = "company_fax";
const rateStore = new Map<string, number[]>();

function json(
  request: Request,
  body: unknown,
  status = 200,
  extraHeaders: HeadersInit = {},
) {
  const headers = new Headers({
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    ...extraHeaders,
  });
  const origin = request.headers.get("Origin");
  if (origin && isAllowedOrigin(request, origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type");
    headers.set("Vary", "Origin");
  }
  return new Response(JSON.stringify(body), { status, headers });
}

function isAllowedOrigin(request: Request, origin: string) {
  try {
    const originUrl = new URL(origin);
    const requestUrl = new URL(request.url);
    return (
      originUrl.origin === requestUrl.origin ||
      originUrl.origin === "https://fernesta.com" ||
      originUrl.origin === "https://www.fernesta.com"
    );
  } catch {
    return false;
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalizeFields(fields: unknown) {
  if (!fields || typeof fields !== "object" || Array.isArray(fields)) return null;
  const entries = Object.entries(fields);
  if (!entries.length || entries.length > MAX_FIELD_COUNT) return null;

  const normalized: Record<string, string> = {};
  for (const [rawKey, rawValue] of entries) {
    const key = String(rawKey).trim().toLowerCase().replace(/\s+/g, "_");
    if (!key || key.length > MAX_KEY_LENGTH) return null;
    const value = String(rawValue ?? "").trim();
    if (value.length > MAX_VALUE_LENGTH) return null;
    if (value || key === HONEYPOT_FIELD) normalized[key] = value;
  }
  return normalized;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getClientIp(request: Request) {
  return (
    request.headers.get("CF-Connecting-IP") ||
    request.headers.get("X-Forwarded-For")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

function isRateLimited(key: string, now = Date.now()) {
  for (const [storedKey, timestamps] of rateStore) {
    const recent = timestamps.filter((timestamp) => now - timestamp < RATE_WINDOW_MS);
    if (recent.length) rateStore.set(storedKey, recent);
    else rateStore.delete(storedKey);
  }

  const existing = rateStore.get(key) ?? [];
  if (existing.length >= RATE_MAX_REQUESTS) return true;
  existing.push(now);
  rateStore.set(key, existing);
  return false;
}

function buildLeadHtml(formName: string, fields: Record<string, string>) {
  const rows = Object.entries(fields)
    .map(
      ([key, value]) =>
        `<tr><td style="padding:9px 11px;border:1px solid #d8c7b5;"><strong>${escapeHtml(
          key.replace(/_/g, " "),
        )}</strong></td><td style="padding:9px 11px;border:1px solid #d8c7b5;">${escapeHtml(
          value,
        )}</td></tr>`,
    )
    .join("");

  return `<div style="font-family:Arial,sans-serif;max-width:720px;margin:0 auto;color:#4d3d2c">
    <p style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#81191a">Fernesta website</p>
    <h2 style="font-weight:500">New ${escapeHtml(formName)}</h2>
    <table style="width:100%;border-collapse:collapse">${rows}</table>
  </div>`;
}

async function forwardLeadWebhook(
  env: LeadRoutingEnv,
  request: Request,
  payload: { subject: string; formName: string; fields: Record<string, string> },
) {
  const webhookUrl = env.LEAD_WEBHOOK_URL?.trim();
  if (!webhookUrl) return false;

  const secret = env.LEAD_WEBHOOK_SECRET?.trim();
  const headers = new Headers({ "Content-Type": "application/json" });
  if (secret) headers.set("X-Fernesta-Lead-Secret", secret);

  const body: Record<string, unknown> = {
    ...payload,
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
    return response.ok;
  } catch {
    return false;
  }
}

async function deliverLeadEmail(
  env: LeadRoutingEnv,
  subject: string,
  formName: string,
  fields: Record<string, string>,
) {
  const apiKey = env.RESEND_API_KEY?.trim();
  const from = env.LEAD_FROM_EMAIL?.trim();
  if (!apiKey || !from) return false;

  const to = env.LEAD_TO_EMAIL?.trim() || DEFAULT_LEAD_EMAIL;
  const text = [
    `Form: ${formName}`,
    ...Object.entries(fields).map(([key, value]) => `${key.replace(/_/g, " ")}: ${value}`),
  ].join("\n");
  const headers: Record<string, string> = {};
  if (fields.email && isValidEmail(fields.email)) headers["Reply-To"] = fields.email;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        html: buildLeadHtml(formName, fields),
        text,
        headers,
      }),
    });
    return response.ok;
  } catch {
    return false;
  }
}

async function deliverLeadWeb3Forms(
  env: LeadRoutingEnv,
  subject: string,
  formName: string,
  fields: Record<string, string>,
) {
  const accessKey =
    env.WEB3FORMS_ACCESS_KEY?.trim() || DEFAULT_WEB3FORMS_ACCESS_KEY;
  const email = fields.email || "";

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject,
        from_name: "Fernesta Website",
        email,
        replyto: email,
        form_name: formName,
        ...fields,
      }),
    });
    const result = (await response.json().catch(() => null)) as {
      success?: boolean;
    } | null;
    return response.ok && result?.success === true;
  } catch {
    return false;
  }
}

export async function handleLeadRequest(request: Request, env: LeadRoutingEnv) {
  const origin = request.headers.get("Origin");
  if (origin && !isAllowedOrigin(request, origin)) {
    return json(request, { error: "Origin not allowed." }, 403);
  }

  if (request.method === "OPTIONS") return json(request, { ok: true });
  if (request.method !== "POST") {
    return json(request, { error: "Method not allowed." }, 405, { Allow: "POST, OPTIONS" });
  }

  if (!(request.headers.get("Content-Type") || "").toLowerCase().includes("application/json")) {
    return json(request, { error: "Unsupported content type." }, 415);
  }

  const contentLength = Number(request.headers.get("Content-Length") || "0");
  if (contentLength > MAX_BODY_BYTES) {
    return json(request, { error: "Payload too large." }, 413);
  }

  const rawBody = await request.text().catch(() => "");
  if (!rawBody || rawBody.length > MAX_BODY_BYTES) {
    return json(request, { error: "Invalid payload." }, 400);
  }

  let payload: LeadPayload;
  try {
    payload = JSON.parse(rawBody) as LeadPayload;
  } catch {
    return json(request, { error: "Invalid JSON payload." }, 400);
  }

  const formName = (payload.formName?.trim() || "Website inquiry").slice(0, 120);
  const fields = normalizeFields(payload.fields);
  if (!fields) return json(request, { error: "Invalid payload." }, 400);

  if (fields[HONEYPOT_FIELD]) {
    return json(request, { success: true });
  }

  if (
    !fields.name ||
    !fields.email ||
    !isValidEmail(fields.email) ||
    !fields.business_website
  ) {
    return json(request, { error: "Name, email, and website are required." }, 400);
  }

  const rateKey = `${getClientIp(request)}:${formName.toLowerCase()}`;
  if (isRateLimited(rateKey)) {
    return json(request, { error: "Too many requests. Please try again later." }, 429);
  }

  delete fields[HONEYPOT_FIELD];
  const subject = (
    payload.subject?.trim() || `Free brand audit request — ${fields.name}`
  ).slice(0, 140);
  const [web3FormsDelivered, emailDelivered, webhookDelivered] = await Promise.all([
    deliverLeadWeb3Forms(env, subject, formName, fields),
    deliverLeadEmail(env, subject, formName, fields),
    forwardLeadWebhook(env, request, { subject, formName, fields }),
  ]);

  if (!web3FormsDelivered && !emailDelivered && !webhookDelivered) {
    return json(
      request,
      { error: "Lead delivery is not configured or is temporarily unavailable." },
      503,
    );
  }

  return json(request, {
    success: true,
    delivered: {
      web3forms: web3FormsDelivered,
      email: emailDelivered,
      tracker: webhookDelivered,
    },
  });
}

function buildWhatsAppUrl(url: URL) {
  const defaultText =
    "Hi Fernesta, I would like to discuss my brand or marketing needs. Brand name: __ Website/Instagram: __ What I need help with: __";
  const text = (url.searchParams.get("text") || defaultText).trim().slice(0, 500);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

async function recordWhatsAppStart(
  env: LeadRoutingEnv,
  request: Request,
  url: URL,
) {
  const webhookUrl = env.LEAD_WEBHOOK_URL?.trim();
  if (!webhookUrl) return;

  const secret = env.LEAD_WEBHOOK_SECRET?.trim();
  const headers = new Headers({ "Content-Type": "application/json" });
  if (secret) headers.set("X-Fernesta-Lead-Secret", secret);

  const source = (url.searchParams.get("utm_source") || "website").slice(0, 120);
  const medium = (url.searchParams.get("utm_medium") || "whatsapp_cta").slice(0, 120);
  const campaign = (url.searchParams.get("utm_campaign") || "main_lead_funnel").slice(
    0,
    120,
  );
  const body: Record<string, unknown> = {
    subject: "Lead Activity - WhatsApp Started",
    formName: "Lead Activity",
    fields: {
      event_name: "whatsapp_redirect",
      pipeline: "fernesta",
      source: `${url.hostname}${url.pathname}${url.search}`,
      lead_source: `${source}_${medium}`,
      utm_source: source,
      utm_medium: medium,
      utm_campaign: campaign,
      whatsapp_number: WHATSAPP_NUMBER,
      stage: "WhatsApp Started",
    },
    submittedAt: new Date().toISOString(),
    sourceOrigin: request.headers.get("Referer") || "",
    userAgent: request.headers.get("User-Agent") || "",
  };
  if (secret) body.webhookSecret = secret;

  await fetch(webhookUrl, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  }).catch(() => undefined);
}

export function handleWhatsAppRedirect(
  request: Request,
  env: LeadRoutingEnv,
  context: ExecutionContextLike,
) {
  if (request.method !== "GET") {
    return new Response("Method not allowed.", {
      status: 405,
      headers: { Allow: "GET" },
    });
  }

  const url = new URL(request.url);
  context.waitUntil(recordWhatsAppStart(env, request, url));
  return Response.redirect(buildWhatsAppUrl(url), 302);
}
