Lead Email Setup (Resend + Cloudflare Pages Functions)
======================================================

This project now sends form leads through `functions/api/lead.ts`.

Required environment variables in Cloudflare Pages:
- `RESEND_API_KEY`
- `LEAD_FROM_EMAIL` (example: `leads@fernesta.com`)
- `LEAD_TO_EMAIL` (example: `info@fernesta.com`)

Where to set:
- Cloudflare Dashboard -> Workers & Pages -> fernesta -> Settings -> Variables and Secrets

Recommended provider:
- Resend (free tier available, low-cost paid upgrades)

Notes:
- `LEAD_FROM_EMAIL` should be a verified sender/domain in Resend.
- Forms will fail with `Lead email provider not configured.` if secrets are missing.
