import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MarketSelector from "../MarketSelector";
import { twitterCard } from "../seo";
import "../fernesta.css";
import "../gcc/gcc.css";
import "./jaipur.css";

const pageTitle = "Marketing Agency in Jaipur: Strategy to Growth | Fernesta";
const pageDescription =
  "Fernesta is an independent marketing agency based in Jaipur, connecting brand strategy, creative, content, performance, and launch planning.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "marketing agency in Jaipur",
    "digital marketing agency Jaipur",
    "branding agency Jaipur",
    "performance marketing agency Jaipur",
    "social media agency Jaipur",
    "creative agency Jaipur",
  ],
  alternates: {
    canonical: "/jaipur",
  },
  openGraph: {
    type: "website",
    url: "https://www.fernesta.com/jaipur",
    title: "A connected marketing agency based in Jaipur | Fernesta",
    description:
      "Strategy, branding, creative, content, performance, and launch planning connected by one senior-led team in Jaipur.",
    images: [
      {
        url: "/og.jpg",
        width: 1733,
        height: 907,
        alt: "Fernesta, an independent marketing agency based in Jaipur",
      },
    ],
  },
  twitter: twitterCard(
    "A connected marketing agency based in Jaipur | Fernesta",
    "Strategy, branding, creative, content, performance, and launch planning connected by one senior-led team in Jaipur.",
  ),
};

const services = [
  {
    number: "01",
    title: "Strategy & Launch Planning",
    copy: "Customer and category evidence, positioning, go-to-market choices, launch sequencing, and marketing roadmaps.",
    href: "/services/strategy-launch-planning",
  },
  {
    number: "02",
    title: "Branding & Creative",
    copy: "Identity, story, voice, messaging, campaign platforms, and practical brand systems built from the strategic decision.",
    href: "/services/branding-creative",
  },
  {
    number: "03",
    title: "Growth & Performance",
    copy: "Acquisition, paid media, conversion, commerce, measurement, and experimentation connected to the creative system.",
    href: "/services/growth-performance",
  },
  {
    number: "04",
    title: "Social Media & Content",
    copy: "Channel strategy, editorial systems, production rhythms, creator programmes, community, and formats built to sustain attention.",
    href: "/services/social-media-content",
  },
] as const;

const evidence = [
  {
    metric: "3.2x",
    result: "blended ROAS in 120 days",
    context: "D2C skincare performance",
    href: "/work/d2c-skincare-performance-turnaround",
  },
  {
    metric: "42%",
    result: "increase in returning customer rate",
    context: "Consumer retail brand and retention",
    href: "/work/consumer-retail-brand-retention",
  },
  {
    metric: "3.6x",
    result: "increase in qualified event enquiries",
    context: "Boutique hospitality launch",
    href: "/work/boutique-hospitality-social-pr-launch",
  },
  {
    metric: "72%",
    result: "faster lead-to-quote turnaround",
    context: "B2B distribution operations",
    href: "/work/distribution-workflow-automation-reset",
  },
] as const;

const criteria = [
  {
    title: "Strategic depth",
    copy: "Can the agency explain the customer, category, position, offer, and commercial decision before recommending channels?",
  },
  {
    title: "Connected execution",
    copy: "Can brand, creative, content, media, conversion, and measurement follow the same direction without being split into disconnected tasks?",
  },
  {
    title: "Visible evidence",
    copy: "Are outcomes shown with the work, timeframe, operating context, and limitations attached—not as isolated headline numbers?",
  },
  {
    title: "Senior access",
    copy: "Will experienced decision-makers remain close to the work after the proposal and throughout delivery?",
  },
  {
    title: "Useful measurement",
    copy: "Does reporting lead to better choices about creative, audience, offer, journey, and investment instead of producing dashboards alone?",
  },
] as const;

const questions = [
  {
    question: "What kind of marketing agency is Fernesta?",
    answer:
      "Fernesta is an independent, senior-led creative marketing agency. We connect strategy and launch planning, branding and creative, growth and performance, and social media and content. A client can begin with one focused discipline or connect several when the problem crosses functions.",
  },
  {
    question: "Is Fernesta based in Jaipur?",
    answer:
      "Yes. Fernesta Digital Private Limited is headquartered in Jaipur at 215, Padmavati B Colony, Padmavti Colony, Nirman Nagar, Brijlalpura, Jaipur, Rajasthan 302019, India.",
  },
  {
    question: "Does Fernesta work only with Jaipur businesses?",
    answer:
      "No. Fernesta is based in Jaipur and works with businesses across India. The agency also supports selective GCC, European, and United States market-entry work when the right in-market expertise can be confirmed.",
  },
  {
    question: "Can we hire Fernesta for one service?",
    answer:
      "Yes. Engagements can begin with a focused need such as positioning, brand identity, launch planning, content strategy, paid acquisition, conversion, or measurement. Adjacent disciplines are connected only when the problem requires them.",
  },
  {
    question: "How should we compare marketing companies in Jaipur?",
    answer:
      "Compare strategic depth, senior access, evidence quality, connected execution, and the usefulness of measurement. Ask each agency to explain what it would decide first, how that decision changes the work, and how it will distinguish context-specific results from guarantees.",
  },
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": "https://www.fernesta.com/#organization",
      name: "Fernesta",
      legalName: "Fernesta Digital Private Limited",
      url: "https://www.fernesta.com/",
      mainEntityOfPage: "https://www.fernesta.com/jaipur",
      description: pageDescription,
      image: "https://www.fernesta.com/og.jpg",
      logo: "https://www.fernesta.com/prototype/assets/fernesta-monogram.png",
      email: "info@fernesta.com",
      telephone: "+91 820 945 8984",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "215, Padmavati B Colony, Padmavti Colony, Nirman Nagar, Brijlalpura",
        addressLocality: "Jaipur",
        addressRegion: "Rajasthan",
        postalCode: "302019",
        addressCountry: "IN",
      },
      hasMap: "https://maps.app.goo.gl/ZatXGy9xwzVFQFwo9",
      areaServed: [
        { "@type": "City", name: "Jaipur" },
        { "@type": "State", name: "Rajasthan" },
        { "@type": "Country", name: "India" },
      ],
      sameAs: [
        "https://www.linkedin.com/company/fernesta/",
        "https://www.instagram.com/fernesta.co/",
      ],
      makesOffer: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.copy,
          url: `https://www.fernesta.com${service.href}`,
        },
      })),
    },
    {
      "@type": "WebPage",
      "@id": "https://www.fernesta.com/jaipur#webpage",
      url: "https://www.fernesta.com/jaipur",
      name: pageTitle,
      description: pageDescription,
      inLanguage: "en-IN",
      about: {
        "@id": "https://www.fernesta.com/#organization",
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.fernesta.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Marketing agency in Jaipur",
          item: "https://www.fernesta.com/jaipur",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: questions.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
};

export default function JaipurPage() {
  return (
    <div className="gcc-page jaipur-page">
      <a className="skip-link" href="#jaipur-content">
        Skip to Jaipur agency information
      </a>

      <header className="gcc-header">
        <Link className="gcc-logo" href="/" aria-label="Fernesta home">
          <Image
            src="/prototype/assets/fernesta-lockup-red-transparent.webp"
            alt="Fernesta"
            width={1024}
            height={1024}
            priority
            unoptimized
          />
        </Link>
        <nav aria-label="Jaipur agency page navigation">
          <a href="#services">Services</a>
          <a href="#evidence">Evidence</a>
          <Link
            className="gcc-nav-cta"
            href="/?challenge=Not%20sure%20yet#brand-audit"
          >
            Discuss your challenge <span aria-hidden="true">↗</span>
          </Link>
          <MarketSelector />
        </nav>
      </header>

      <main id="jaipur-content">
        <section className="gcc-hero jaipur-hero" aria-labelledby="jaipur-title">
          <div className="gcc-hero-copy">
            <p className="gcc-eyebrow">Independent marketing agency · Jaipur</p>
            <h1 id="jaipur-title">
              Jaipur roots.
              <br />
              <em>Connected growth.</em>
            </h1>
            <p className="gcc-hero-lede">
              Fernesta is a marketing agency based in Jaipur, connecting
              strategy, branding, creative, content, performance, and launch
              planning so every market move follows one direction.
            </p>
            <div className="gcc-hero-actions">
              <Link href="/?challenge=Not%20sure%20yet#brand-audit">
                Start with a free brand audit <span aria-hidden="true">↗</span>
              </Link>
              <a href="#how-to-choose">How to compare agencies ↓</a>
            </div>
          </div>
          <figure className="gcc-hero-visual">
            <Image
              src="/prototype/assets/strategy-meeting.jpg"
              alt="A collaborative brand and marketing strategy working session"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 45vw"
              unoptimized
            />
            <figcaption>
              Senior direction stays close to the work—from the first signal
              through the next market decision.
            </figcaption>
          </figure>
        </section>

        <section className="jaipur-answer" aria-labelledby="direct-answer-title">
          <span>Direct answer</span>
          <div>
            <h2 id="direct-answer-title">
              What does a connected marketing agency in Jaipur do?
            </h2>
            <p>
              It finds the commercial and customer decision first, then carries
              that decision through positioning, identity, campaigns, content,
              acquisition, conversion, and measurement. Fernesta is structured
              for that connected work. Clients can still begin with one
              focused need; the scope expands only when the problem crosses
              disciplines.
            </p>
          </div>
        </section>

        <section
          className="gcc-engagements jaipur-services"
          id="services"
          aria-labelledby="jaipur-services-title"
        >
          <div className="gcc-section-heading">
            <span>Services from Jaipur</span>
            <h2 id="jaipur-services-title">
              Four disciplines.
              <br />
              One direction.
            </h2>
            <p>
              Each discipline can solve a focused problem. Together, they keep
              strategy and execution from pulling in different directions.
            </p>
          </div>
          <div className="gcc-offer-list">
            {services.map((service) => (
              <article key={service.title}>
                <div className="gcc-offer-title">
                  <span>{service.number}</span>
                  <h3>{service.title}</h3>
                </div>
                <p>{service.copy}</p>
                <Link href={service.href}>
                  Explore the service <span aria-hidden="true">↗</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section
          className="jaipur-proof"
          id="evidence"
          aria-labelledby="jaipur-proof-title"
        >
          <div className="gcc-section-heading">
            <span>Selected evidence</span>
            <h2 id="jaipur-proof-title">
              Outcomes with
              <br />
              context attached.
            </h2>
            <p>
              These anonymized records show specific engagement outcomes. They
              are evidence of the work—not guarantees of future performance.
            </p>
          </div>
          <div className="jaipur-proof-grid">
            {evidence.map((item) => (
              <Link href={item.href} key={item.href}>
                <span>{item.context}</span>
                <strong>{item.metric}</strong>
                <h3>{item.result}</h3>
                <span aria-hidden="true">Read the case study ↗</span>
              </Link>
            ))}
          </div>
        </section>

        <section
          className="jaipur-criteria"
          id="how-to-choose"
          aria-labelledby="criteria-title"
        >
          <div>
            <span>How to choose well</span>
            <h2 id="criteria-title">
              Comparing the best marketing companies in Jaipur?
            </h2>
            <p>
              “Best” depends on the problem, team, category, and commercial
              stage. Use criteria you can examine before appointing an agency.
            </p>
            <Link
              className="jaipur-guide-link"
              href="/jaipur/how-to-choose-marketing-agency"
            >
              Use the complete agency selection guide{" "}
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <ol>
            {criteria.map((criterion, index) => (
              <li key={criterion.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{criterion.title}</h3>
                <p>{criterion.copy}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="jaipur-faq" aria-labelledby="jaipur-faq-title">
          <div>
            <span>Useful answers</span>
            <h2 id="jaipur-faq-title">Before the first conversation.</h2>
          </div>
          <div>
            {questions.map((item, index) => (
              <details key={item.question}>
                <summary>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item.question}</strong>
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="jaipur-office" aria-labelledby="office-title">
          <div>
            <span>Jaipur office</span>
            <h2 id="office-title">Based here. Built to work across markets.</h2>
          </div>
          <address>
            <strong>Fernesta Digital Private Limited</strong>
            <span>
              215, Padmavati B Colony, Padmavti Colony, Nirman Nagar,
              Brijlalpura, Jaipur, Rajasthan 302019, India
            </span>
            <a
              href="https://maps.app.goo.gl/ZatXGy9xwzVFQFwo9"
              target="_blank"
              rel="noreferrer"
            >
              Open in Google Maps ↗
            </a>
            <a href="tel:+918209458984">+91 820 945 8984</a>
            <a href="mailto:info@fernesta.com">info@fernesta.com</a>
          </address>
        </section>

        <section className="gcc-cta" aria-labelledby="jaipur-cta-title">
          <span>A useful starting point</span>
          <h2 id="jaipur-cta-title">
            Put the current
            <br />
            signals on the table.
          </h2>
          <p>
            Share your website, social presence, and business pressure point.
            A Fernesta team member will review what is visible before
            recommending the decision or discipline worth starting with.
          </p>
          <Link href="/?challenge=Not%20sure%20yet#brand-audit">
            Register for a free brand audit <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </main>

      <footer className="gcc-footer">
        <Link href="/">Fernesta Digital Private Limited</Link>
        <Link href="/services">All marketing services</Link>
        <a href="mailto:info@fernesta.com">info@fernesta.com</a>
        <Link href="/privacy">Privacy notice</Link>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </div>
  );
}
