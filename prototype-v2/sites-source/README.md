# Fernesta Website — Immersive Preview

This is the isolated, deployment-ready first cut of Fernesta Digital Private
Limited's website. It keeps Fernesta's cream, brown, and signal-red identity,
while adding motion, responsive interaction, rich service content, client
credentials, a free brand-audit funnel, and direct inbound contact routes.

The existing production site is not changed by this project.

## Local development

Prerequisite: Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

Useful checks:

```bash
npm run lint
npm test
npm run qa:first-cut
```

`npm test` includes a production vinext build. The browser QA suite validates
desktop, laptop, tablet, mobile, narrow-mobile, and reduced-motion states.

## Lead flow

The free brand-audit form posts directly to Web3Forms using Fernesta's approved
public form access key, matching the working proposal forms already connected
to the account under `tarun@fernesta.com`. The browser checks a hidden
honeypot, handles the API response, and shows a clear success state.

If that direct request is unavailable, the form falls back to the same-origin
`/api/lead` worker route. The worker validates and rate-limits the request,
retries Web3Forms, and can also send the same lead through either or both
optional parallel channels:

- Web3Forms email delivery to the account registered under `tarun@fernesta.com`
- Resend email to `tarun@fernesta.com` as a parallel delivery path
- Fernesta's existing Google Sheets / CRM webhook

The public website field is named `business_website`; `company_fax` is the
hidden anti-spam field. Do not rename the public website field to `website`,
because older Fernesta forms used that name as a honeypot.

Copy `.env.example` to the deployment environment and configure:

```dotenv
WEB3FORMS_ACCESS_KEY=
RESEND_API_KEY=
LEAD_FROM_EMAIL=Fernesta Website <leads@fernesta.com>
LEAD_TO_EMAIL=tarun@fernesta.com
LEAD_WEBHOOK_URL=
LEAD_WEBHOOK_SECRET=
```

The currently approved public Web3Forms access key is built into the worker so
the form works without a private server credential. `WEB3FORMS_ACCESS_KEY` is
an optional deployment override. For parallel Resend delivery, verify the
sending domain first and set `LEAD_FROM_EMAIL` to an address allowed by that
account. For Google Sheets / CRM logging, use the existing Fernesta Apps Script
deployment URL and matching secret. Private credentials must be stored in the
hosting environment, never committed to this repository.

If both delivery paths are temporarily unavailable, the browser presents a
pre-addressed email fallback so the visitor's enquiry is not trapped in a
broken form.

## WhatsApp and direct contact

Website WhatsApp links use:

`/go/whatsapp?pipeline=fernesta&utm_source=website&utm_medium=whatsapp_cta&utm_campaign=main_lead_funnel`

The worker redirects to WhatsApp Business at `+91 820 945 8984` with a useful
starter brief. When the optional lead webhook is configured, it also records a
`WhatsApp Started` activity with source and campaign fields.

The same number remains the public call and outreach contact. Inbound email
goes to `tarun@fernesta.com`.

## Deploy

The Cloudflare-compatible worker entry is `worker/index.ts`. The existing Sites
project identifier is stored in `.openai/hosting.json`.

Before publishing:

1. Confirm the Web3Forms key is still active for `tarun@fernesta.com`.
2. Optionally set the Resend and Google Sheets / CRM variables in the host.
3. Run `npm run lint` and `npm test`.
4. Run the viewport QA suite against the deployment candidate.
5. Submit a real test lead and confirm arrival in Tarun's inbox and, when
   enabled, the lead tracker.

Publishing to `fernesta.com` remains an explicit production approval step.
