import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "../fernesta.css";
import "./privacy.css";
import MarketSelector from "../MarketSelector";
import { twitterCard } from "../seo";

export const metadata: Metadata = {
  title: "Privacy Notice | Fernesta",
  description:
    "How Fernesta Digital Private Limited collects, uses, stores, and protects personal information submitted through www.fernesta.com.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    type: "website",
    url: "https://www.fernesta.com/privacy",
    title: "Privacy Notice | Fernesta",
    description:
      "How Fernesta handles personal information submitted through its website and brand-audit form.",
  },
  twitter: twitterCard(
    "Privacy Notice | Fernesta",
    "How Fernesta handles personal information submitted through its website and brand-audit form.",
  ),
};

const sections = [
  {
    title: "Who is responsible for your information",
    body: (
      <>
        <p>
          Fernesta Digital Private Limited is responsible for the personal
          information described in this notice. Fernesta is headquartered at
          215, Padmavati B Colony, Padmavti Colony, Nirman Nagar, Brijlalpura,
          Jaipur, Rajasthan 302019, India.
        </p>
        <p>
          Privacy questions and requests can be sent to{" "}
          <a href="mailto:info@fernesta.com">info@fernesta.com</a>.
        </p>
      </>
    ),
  },
  {
    title: "Information we collect",
    body: (
      <p>
        When you submit an enquiry or register for a brand audit, we may collect
        your name, work email, website, Instagram handle, business challenge,
        additional context, referral and campaign information, and essential
        technical information used to deliver and protect the form. If you
        contact us by telephone, email, WhatsApp, or social media, we also
        receive the information you choose to share through that channel.
      </p>
    ),
  },
  {
    title: "Why we use it",
    body: (
      <>
        <p>We use this information to:</p>
        <ul>
          <li>review and respond to the request you submitted;</li>
          <li>prepare an audit, proposal, or relevant recommendation;</li>
          <li>manage a prospective or active client relationship;</li>
          <li>protect the website and prevent spam, fraud, or misuse;</li>
          <li>maintain business, legal, and financial records where required.</li>
        </ul>
        <p>
          Submitting the form does not subscribe you to a marketing list. We
          will obtain a separate choice before sending recurring promotional
          email where consent is required.
        </p>
      </>
    ),
  },
  {
    title: "Our basis for processing",
    body: (
      <p>
        We process enquiry information because you have asked us to take steps
        toward a possible engagement, because responding is within your
        reasonable expectations, or because we have a legitimate business or
        legal need that does not override your rights. Where the law requires
        consent for a particular use, we will ask for it separately and you may
        withdraw it.
      </p>
    ),
  },
  {
    title: "Service providers and international processing",
    body: (
      <p>
        Fernesta may use specialised providers for website hosting, security,
        form delivery, email delivery, and lead administration. Depending on
        the form-delivery path and our deployment configuration, these may
        include Web3Forms, Cloudflare, Resend, and a controlled spreadsheet or
        customer-relationship system. Information may therefore be processed
        in India or other countries where those providers operate. We limit
        access to what is needed for the stated purpose and do not sell
        submitted personal information.
      </p>
    ),
  },
  {
    title: "How long we keep it",
    body: (
      <p>
        Enquiries that do not become client engagements are ordinarily retained
        for up to 12 months so we can respond, follow up on the request, and
        maintain an accurate contact history. Information connected with an
        engagement, invoice, dispute, or legal obligation may be retained for
        the period required by applicable law or a legitimate record-keeping
        need. We delete or anonymise information when it is no longer needed.
      </p>
    ),
  },
  {
    title: "Your choices and rights",
    body: (
      <>
        <p>
          Subject to the law that applies to you, you may ask us to access,
          correct, obtain, restrict, or delete your personal information, object
          to a particular use, or withdraw a consent you previously provided.
          You may also ask us which providers received your information.
        </p>
        <p>
          Send the request from the relevant email address to{" "}
          <a href="mailto:info@fernesta.com">info@fernesta.com</a>. We may need
          to verify your identity before acting on it.
        </p>
      </>
    ),
  },
  {
    title: "Security, external services, and updates",
    body: (
      <>
        <p>
          We use reasonable administrative and technical safeguards, but no
          internet transmission or storage system is completely secure. Links
          to WhatsApp, Instagram, LinkedIn, Google Maps, and other third-party
          services are governed by those providers&apos; own notices.
        </p>
        <p>
          We may update this notice when our website, providers, or legal
          obligations change. The current version will remain available at this
          address with its effective date.
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <div className="policy-page">
      <a className="skip-link" href="#privacy-content">
        Skip to privacy notice
      </a>
      <header className="policy-header">
        <Link className="policy-logo" href="/" aria-label="Fernesta home">
          <Image
            src="/prototype/assets/fernesta-lockup-red-transparent.webp"
            alt="Fernesta"
            width={1024}
            height={1024}
            priority
            unoptimized
          />
        </Link>
        <div className="policy-actions">
          <Link className="policy-back" href="/">
            Back to the website <span aria-hidden="true">↗</span>
          </Link>
          <MarketSelector />
        </div>
      </header>

      <main id="privacy-content">
        <section className="policy-hero" aria-labelledby="privacy-title">
          <div className="policy-kicker">
            <span>Fernesta Digital Private Limited</span>
            <span>Effective 24 July 2026</span>
          </div>
          <h1 id="privacy-title">
            Privacy,
            <br />
            stated plainly.
          </h1>
          <p>
            This notice explains what happens to personal information you share
            through www.fernesta.com and its enquiry channels.
          </p>
        </section>

        <section className="policy-content" aria-label="Privacy notice details">
          {sections.map((section, index) => (
            <article key={section.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2>{section.title}</h2>
                {section.body}
              </div>
            </article>
          ))}
        </section>
      </main>

      <footer className="policy-footer">
        <span>Fernesta Digital Private Limited</span>
        <a href="mailto:info@fernesta.com">info@fernesta.com</a>
        <span>© 2026 Fernesta</span>
      </footer>
    </div>
  );
}
