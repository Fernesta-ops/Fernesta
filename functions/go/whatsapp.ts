interface Env {
  LEAD_WEBHOOK_URL?: string;
  LEAD_WEBHOOK_SECRET?: string;
}

const PHONE_BY_PIPELINE: Record<string, string> = {
  fernesta: "918209458984",
  fernesta_events: "918209458984",
};

const DEFAULT_TEXT_BY_PIPELINE: Record<string, string> = {
  fernesta:
    "Hi Fernesta, I want help with digital marketing. Business name - , Website/social link - , Service needed - , Budget range - , Goal - ",
  fernesta_events:
    "Hi Fernesta Events, I want to plan an event. Here are my details: Event type - , Date - , City - , Guests - , Budget - ",
};

const ALLOWED_PIPELINES = new Set(Object.keys(PHONE_BY_PIPELINE));

function safeValue(value: string | null, fallback = "") {
  return (value || fallback).trim().slice(0, 120);
}

function getPipeline(url: URL) {
  const pipeline = safeValue(url.searchParams.get("pipeline"), "fernesta").toLowerCase();
  return ALLOWED_PIPELINES.has(pipeline) ? pipeline : "fernesta";
}

function buildWhatsAppUrl(url: URL, pipeline: string) {
  const phone = PHONE_BY_PIPELINE[pipeline];
  const text = safeValue(url.searchParams.get("text"), DEFAULT_TEXT_BY_PIPELINE[pipeline]).slice(0, 500);
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

async function forwardRedirectWebhook(env: Env, request: Request, url: URL, pipeline: string) {
  const webhookUrl = env.LEAD_WEBHOOK_URL?.trim();
  if (!webhookUrl) return;

  const secret = env.LEAD_WEBHOOK_SECRET?.trim();
  const headers = new Headers({
    "Content-Type": "application/json",
  });
  if (secret) headers.set("X-Fernesta-Lead-Secret", secret);

  const utmSource = safeValue(url.searchParams.get("utm_source"), "unknown");
  const utmMedium = safeValue(url.searchParams.get("utm_medium"), "tracked_redirect");
  const utmCampaign = safeValue(url.searchParams.get("utm_campaign"), "lead_funnel");

  const body: Record<string, unknown> = {
    subject: "Lead Activity - WhatsApp Redirect",
    formName: "Lead Activity",
    fields: {
      event_name: "whatsapp_redirect",
      pipeline,
      source: `${url.hostname}${url.pathname}${url.search}`,
      lead_source: `${utmSource}_${utmMedium}`,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      whatsapp_number: PHONE_BY_PIPELINE[pipeline],
      stage: "WhatsApp Started",
    },
    submittedAt: new Date().toISOString(),
    sourceOrigin: request.headers.get("Referer") || "",
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
      console.warn(`WhatsApp redirect webhook failed with status ${response.status}`);
    }
  } catch (error) {
    console.warn("WhatsApp redirect webhook failed", error);
  }
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const pipeline = getPipeline(url);
  const redirectUrl = buildWhatsAppUrl(url, pipeline);

  context.waitUntil(forwardRedirectWebhook(context.env, context.request, url, pipeline));

  return Response.redirect(redirectUrl, 302);
};
