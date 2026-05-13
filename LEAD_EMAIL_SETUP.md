Lead Email Setup (Resend + Cloudflare Pages Functions)
======================================================

This project now sends form leads through `functions/api/lead.ts`.

Required environment variables in Cloudflare Pages:
- `RESEND_API_KEY`
- `LEAD_FROM_EMAIL` (example: `leads@fernesta.com`)
- `LEAD_TO_EMAIL` (example: `info@fernesta.com`)

Optional Google Sheets / automation handoff:
- `LEAD_WEBHOOK_URL` (Google Apps Script web app URL or another CRM/spreadsheet webhook)
- `LEAD_WEBHOOK_SECRET` (shared secret sent as `X-Fernesta-Lead-Secret` and in the JSON body as `webhookSecret`)

Where to set:
- Cloudflare Dashboard -> Workers & Pages -> fernesta -> Settings -> Variables and Secrets

Recommended provider:
- Resend (free tier available, low-cost paid upgrades)

Notes:
- `LEAD_FROM_EMAIL` should be a verified sender/domain in Resend.
- Forms need at least one delivery channel: Resend email variables or `LEAD_WEBHOOK_URL`.
- If both email and webhook are configured, a form submission is considered successful when at least one delivery channel works.
- If only the webhook is configured, webhook failure blocks form success so failed lead tracking is visible.
- WhatsApp CTA clicks are sent to `/api/lead-click`, which requires `LEAD_WEBHOOK_URL`.
- Social/profile WhatsApp links can use `/go/whatsapp?pipeline=fernesta&utm_source=instagram&utm_medium=bio&utm_campaign=main_lead_funnel`; the function logs the click and redirects to WhatsApp.

Google Sheets setup:
- See `Fernesta-Agency/30_Sales_And_Marketing/Lead_Generation/Google_Sheets_Automation_Setup.md`.
