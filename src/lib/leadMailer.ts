type LeadEmailInput = {
  subject: string;
  formName: string;
  fields: Record<string, string>;
};

type LeadTrackInput = {
  eventName: string;
  fields: Record<string, string>;
};

const DEFAULT_ENDPOINT = "/api/lead";
const DEFAULT_TRACK_ENDPOINT = "/api/lead-click";

export async function sendLeadEmail(input: LeadEmailInput): Promise<void> {
  const endpoint = import.meta.env.VITE_LEAD_ENDPOINT || DEFAULT_ENDPOINT;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      subject: input.subject,
      formName: input.formName,
      fields: input.fields,
    }),
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as
      | { error?: string; details?: string }
      | null;
    throw new Error(payload?.error || "Lead submission failed.");
  }
}

export function trackLeadEvent(input: LeadTrackInput): void {
  const endpoint = import.meta.env.VITE_LEAD_TRACK_ENDPOINT || DEFAULT_TRACK_ENDPOINT;
  const body = JSON.stringify({
    eventName: input.eventName,
    fields: input.fields,
  });

  if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
    const blob = new Blob([body], { type: "application/json" });
    navigator.sendBeacon(endpoint, blob);
    return;
  }

  void fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body,
    keepalive: true,
  }).catch(() => undefined);
}
