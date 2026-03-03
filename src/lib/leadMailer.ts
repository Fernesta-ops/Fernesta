type LeadEmailInput = {
  subject: string;
  formName: string;
  fields: Record<string, string>;
};

const DEFAULT_ENDPOINT = "/api/lead";

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
