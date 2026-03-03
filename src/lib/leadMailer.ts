type LeadEmailInput = {
  subject: string;
  formName: string;
  fields: Record<string, string>;
};

const DEFAULT_ENDPOINT = "https://formsubmit.co/ajax/info@fernesta.com";

async function fallbackNoCorsPost(input: LeadEmailInput) {
  const fallbackEndpoint = "https://formsubmit.co/info@fernesta.com";
  const params = new URLSearchParams({
    _subject: input.subject,
    _template: "table",
    _captcha: "false",
    form_name: input.formName,
    ...input.fields,
  });

  await fetch(fallbackEndpoint, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });
}

export async function sendLeadEmail(input: LeadEmailInput): Promise<void> {
  const endpoint = import.meta.env.VITE_LEAD_ENDPOINT || DEFAULT_ENDPOINT;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: input.subject,
        _template: "table",
        _captcha: "false",
        form_name: input.formName,
        ...input.fields,
      }),
    });

    if (!response.ok) {
      throw new Error(`Lead request failed with status ${response.status}`);
    }

    const payload = (await response.json().catch(() => null)) as
      | { success?: string | boolean; message?: string }
      | null;

    if (payload && payload.success !== undefined) {
      const ok = payload.success === true || payload.success === "true";
      if (!ok) {
        throw new Error(payload.message || "Lead request was rejected.");
      }
    }
  } catch {
    await fallbackNoCorsPost(input);
  }
}
