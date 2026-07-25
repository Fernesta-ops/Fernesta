import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MarketSelector from "../MarketSelector";
import { twitterCard } from "../seo";
import "../fernesta.css";
import "./gcc.css";

const auditHref =
  "/?challenge=Market%20entry%20and%20GCC%20launch#brand-audit";

export const metadata: Metadata = {
  title: "GCC Brand Strategy & Market Entry Partner | Fernesta",
  description:
    "Fernesta helps ambitious brands prepare for the UAE and wider GCC through market evidence, positioning, brand adaptation, launch planning, content, and performance learning.",
  keywords: [
    "GCC market entry strategy",
    "UAE brand launch agency",
    "Saudi Arabia brand strategy",
    "India to GCC market entry",
    "Middle East launch planning",
  ],
  alternates: {
    canonical: "/gcc",
  },
  openGraph: {
    type: "website",
    url: "https://www.fernesta.com/gcc",
    title: "Building between India and the Gulf | Fernesta",
    description:
      "A senior-led market-entry and creative-growth system for brands preparing to launch or grow across the GCC.",
    images: [
      {
        url: "/og.jpg",
        width: 1733,
        height: 907,
        alt: "Fernesta strategy, brand, launch, and growth system",
      },
    ],
  },
  twitter: twitterCard(
    "Building between India and the Gulf | Fernesta",
    "A senior-led market-entry and creative-growth system for brands preparing to launch or grow across the GCC.",
  ),
};

const markets = [
  {
    number: "01",
    name: "United Arab Emirates",
    role: "The first commercial beachhead",
    detail:
      "For founder-led companies, consumer and service brands, and Indian businesses preparing to enter a diverse, digitally mature market.",
  },
  {
    number: "02",
    name: "Saudi Arabia",
    role: "The larger second market",
    detail:
      "For brands ready to invest in native-language thinking, local cultural judgement, stronger operating proof, and a relationship-led market approach.",
  },
  {
    number: "03",
    name: "Qatar",
    role: "Selective opportunities",
    detail:
      "For well-matched work across technology, hospitality, sport, education, finance, and premium consumer categories.",
  },
  {
    number: "04",
    name: "Bahrain",
    role: "A focused test market",
    detail:
      "For startups, fintech, ecommerce, and businesses using a connected bilingual market as a route into the wider Gulf.",
  },
] as const;

const offers = [
  {
    number: "01",
    title: "Market-entry signal audit",
    duration: "2 weeks",
    copy:
      "A decision-focused review of the category, competitors, customer signals, current brand, channel assumptions, and the risks most likely to weaken entry.",
    outputs: [
      "Market and competitor signal map",
      "Positioning pressure test",
      "Cultural and communication risk flags",
      "The decisions to make before launch",
    ],
  },
  {
    number: "02",
    title: "GCC launch readiness sprint",
    duration: "3–4 weeks",
    copy:
      "A practical launch direction for brands that need to decide where to begin, what must change, and how the first 90 days should work.",
    outputs: [
      "Priority-market recommendation",
      "Audience and offer hypotheses",
      "Channel and content architecture",
      "90-day launch roadmap",
    ],
  },
  {
    number: "03",
    title: "Brand adaptation and launch system",
    duration: "Scoped programme",
    copy:
      "Regional positioning, messaging, brand adaptation, launch planning, and campaign systems built together so localisation does not fragment the brand.",
    outputs: [
      "Regional positioning and message system",
      "English and Arabic adaptation brief",
      "Launch platform and campaign direction",
      "Content and performance measurement plan",
    ],
  },
  {
    number: "04",
    title: "Creative testing and growth",
    duration: "Ongoing",
    copy:
      "A learning programme that connects creative hypotheses, landing experiences, paid acquisition, conversion evidence, and the next decision.",
    outputs: [
      "Creative testing roadmap",
      "Landing-page and conversion priorities",
      "Performance learning cadence",
      "Monthly decision report",
    ],
  },
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "GCC Brand Strategy and Market Entry",
  serviceType:
    "Market-entry strategy, brand adaptation, launch planning, and growth marketing",
  description:
    "Fernesta helps ambitious brands prepare to enter and grow across the UAE and wider GCC through evidence, positioning, brand adaptation, launch planning, content, and performance learning.",
  provider: {
    "@type": "Organization",
    "@id": "https://www.fernesta.com/#organization",
    name: "Fernesta Digital Private Limited",
    url: "https://www.fernesta.com/",
  },
  areaServed: [
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "Saudi Arabia" },
    { "@type": "Country", name: "Qatar" },
    { "@type": "Country", name: "Bahrain" },
  ],
  url: "https://www.fernesta.com/gcc",
};

export default function GccPage() {
  return (
    <div className="gcc-page">
      <a className="skip-link" href="#gcc-content">
        Skip to GCC market entry
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
        <nav aria-label="GCC page navigation">
          <a href="#markets">Markets</a>
          <a href="#engagements">Engagements</a>
          <Link className="gcc-nav-cta" href={auditHref}>
            Discuss market entry <span aria-hidden="true">↗</span>
          </Link>
          <MarketSelector />
        </nav>
      </header>

      <main id="gcc-content">
        <section className="gcc-hero" aria-labelledby="gcc-title">
          <div className="gcc-hero-copy">
            <p className="gcc-eyebrow">
              India ↔ UAE first ↔ wider GCC when ready
            </p>
            <h1 id="gcc-title">
              Building between
              <br />
              India and <em>the Gulf.</em>
            </h1>
            <p className="gcc-hero-lede">
              Fernesta helps ambitious brands decide what should travel, what
              must adapt, and how strategy, brand, launch, content, and
              performance should work as one system in a new market.
            </p>
            <div className="gcc-hero-actions">
              <Link href={auditHref}>
                Start with market readiness <span aria-hidden="true">↗</span>
              </Link>
              <a href="#approach">See how we enter a market ↓</a>
            </div>
          </div>
          <figure className="gcc-hero-visual">
            <Image
              src="/prototype/assets/hero-connected-editorial.webp"
              alt="A connected strategic working surface linking customer evidence, brand decisions, launch planning, and performance signals"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 45vw"
              unoptimized
            />
            <figcaption>
              One strategic thread, from first market evidence to launch
              learning.
            </figcaption>
          </figure>
        </section>

        <section className="gcc-principle" id="approach">
          <span>Our position</span>
          <div>
            <h2>
              Market entry is not
              <br />
              a translation exercise.
            </h2>
            <p>
              A brand can preserve its core and still make different decisions
              about audience, value, language, cultural codes, channel, timing,
              and execution. Fernesta connects those decisions before
              production and media make them expensive.
            </p>
          </div>
        </section>

        <section
          className="gcc-markets"
          id="markets"
          aria-labelledby="markets-title"
        >
          <div className="gcc-section-heading">
            <span>Where we begin</span>
            <h2 id="markets-title">
              UAE first.
              <br />
              Saudi next.
            </h2>
            <p>
              Qatar and Bahrain are pursued selectively. The sequence follows
              commercial accessibility, opportunity, localisation needs, and
              Fernesta&apos;s ability to deliver responsibly.
            </p>
          </div>
          <div className="gcc-market-grid">
            {markets.map((market) => (
              <article
                key={market.name}
                data-market={["ae", "sa", "qa", "bh"][Number(market.number) - 1]}
              >
                <span>{market.number}</span>
                <h3>{market.name}</h3>
                <b>{market.role}</b>
                <p>{market.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="gcc-engagements"
          id="engagements"
          aria-labelledby="engagements-title"
        >
          <div className="gcc-section-heading">
            <span>Ways to start</span>
            <h2 id="engagements-title">
              Build conviction
              <br />
              before scale.
            </h2>
            <p>
              Each engagement produces a real decision or operating system—not
              a market report that sits outside the work.
            </p>
          </div>
          <div className="gcc-offer-list">
            {offers.map((offer) => (
              <article key={offer.title}>
                <div className="gcc-offer-title">
                  <span>{offer.number}</span>
                  <h3>{offer.title}</h3>
                  <b>{offer.duration}</b>
                </div>
                <p>{offer.copy}</p>
                <ul>
                  {offer.outputs.map((output) => (
                    <li key={output}>{output}</li>
                  ))}
                </ul>
                <Link href={auditHref}>
                  Discuss this engagement <span aria-hidden="true">↗</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="gcc-operating" aria-labelledby="operating-title">
          <div>
            <span>How the work is carried</span>
            <h2 id="operating-title">
              Senior-led at the core.
              <br />
              Local where it matters.
            </h2>
          </div>
          <div className="gcc-operating-copy">
            <p>
              Fernesta leads the strategic thread: evidence, positioning,
              brand, launch direction, creative system, and performance
              learning.
            </p>
            <p>
              When Arabic, local production, creator work, media access, or
              regulated-category review is required, that scope begins only
              after the right native-language and in-market specialists are
              confirmed. We do not present translated playbooks as local
              expertise.
            </p>
            <p className="gcc-proof-link">
              <Link href="/work">Review selected anonymized work ↗</Link>
              <span>
                These records demonstrate Fernesta&apos;s cross-discipline
                approach; they are not presented as GCC-specific proof.
              </span>
            </p>
          </div>
        </section>

        <section className="gcc-cta" aria-labelledby="gcc-cta-title">
          <span>A practical first step</span>
          <h2 id="gcc-cta-title">
            Know what should move
            <br />
            before the brand does.
          </h2>
          <p>
            Share the current brand, intended market, launch timing, and the
            decision that feels least clear. We will review where the entry
            logic is strong and where it needs more evidence.
          </p>
          <Link href={auditHref}>
            Register for a market-entry audit <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </main>

      <footer className="gcc-footer">
        <Link href="/">Fernesta Digital Private Limited</Link>
        <span>Jaipur, India · Working across India and the GCC</span>
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
