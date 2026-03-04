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
  return json({ ok: true }, 200, origin);
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const origin = context.request.headers.get("Origin") || "";
  const { RESEND_API_KEY, LEAD_FROM_EMAIL, LEAD_TO_EMAIL } = context.env;
  if (!RESEND_API_KEY || !LEAD_FROM_EMAIL || !LEAD_TO_EMAIL) {
    return json({ error: "Lead email provider not configured." }, 500, origin);
  }

  const payload = (await context.request.json().catch(() => ({}))) as LeadPayload;
  const subject = payload.subject?.trim() || "New Lead";
  const formName = payload.formName?.trim() || "Website Form";
  const fields = payload.fields || {};

  if (!Object.keys(fields).length) {
    return json({ error: "Invalid payload" }, 400, origin);
  }

  const html = buildHtml(formName, fields);
  const text = [`Form: ${formName}`, ...Object.entries(fields).map(([k, v]) => `${k}: ${v}`)].join("\n");

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
