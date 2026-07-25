import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MarketSelector from "../MarketSelector";
import { twitterCard } from "../seo";
import "../fernesta.css";
import "../gcc/gcc.css";
import "./international.css";

const auditHref =
  "/?challenge=International%20market%20entry#brand-audit";

export const metadata: Metadata = {
  title: "International Brand Strategy & Market Entry | Fernesta",
  description:
    "Fernesta helps ambitious brands assess and prepare for selective European and United States market entry through positioning, brand adaptation, launch planning, and performance learning.",
  keywords: [
    "international market entry strategy",
    "Europe brand launch strategy",
    "United States market entry planning",
    "brand adaptation for international markets",
    "India to Europe market entry",
    "India to US market entry",
  ],
  alternates: {
    canonical: "/international",
  },
  openGraph: {
    type: "website",
    url: "https://www.fernesta.com/international",
    title: "Selective international market entry | Fernesta",
    description:
      "Market evidence, brand decisions, launch planning, and growth learning for brands assessing Europe or the United States.",
    images: [
      {
        url: "/og.jpg",
        width: 1733,
        height: 907,
        alt: "Fernesta connected strategy, brand, launch, and growth system",
      },
    ],
  },
  twitter: twitterCard(
    "Selective international market entry | Fernesta",
    "Market evidence, brand decisions, launch planning, and growth learning for brands assessing Europe or the United States.",
  ),
};

const markets = [
  {
    code: "eu",
    number: "01",
    name: "Europe",
    role: "Country-specific, never one-size-fits-all",
    detail:
      "For brands prepared to choose a priority country, adapt language and proposition carefully, meet privacy requirements, and build distribution before treating Europe as one market.",
  },
  {
    code: "us",
    number: "02",
    name: "United States",
    role: "Focused category entry",
    detail:
      "For brands with a defensible audience, sharper proof, operational readiness, and enough commercial focus to compete in a high-cost, high-choice market.",
  },
] as const;

const readinessQuestions = [
  "Which country, state, or audience should be entered first?",
  "What advantage remains meaningful when the current market context changes?",
  "What must adapt in the offer, message, identity, proof, and channel plan?",
  "Which legal, privacy, distribution, and operating dependencies must be solved first?",
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "International Brand Strategy and Market Entry",
  serviceType:
    "Market prioritisation, brand adaptation, launch planning, and creative performance learning",
  description:
    "Fernesta helps brands assess selective entry into European countries or the United States through market evidence, positioning, brand adaptation, launch planning, and performance learning.",
  provider: {
    "@type": "Organization",
    "@id": "https://www.fernesta.com/#organization",
    name: "Fernesta Digital Private Limited",
    url: "https://www.fernesta.com/",
  },
  areaServed: [
    { "@type": "Place", name: "Europe" },
    { "@type": "Country", name: "United States" },
  ],
  url: "https://www.fernesta.com/international",
};

export default function InternationalPage() {
  return (
    <div className="gcc-page international-page">
      <a className="skip-link" href="#international-content">
        Skip to international market entry
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
        <nav aria-label="International page navigation">
          <a href="#markets">Markets</a>
          <a href="#readiness">Readiness</a>
          <Link className="gcc-nav-cta" href={auditHref}>
            Discuss market entry <span aria-hidden="true">↗</span>
          </Link>
          <MarketSelector />
        </nav>
      </header>

      <main id="international-content">
        <section className="gcc-hero" aria-labelledby="international-title">
          <div className="gcc-hero-copy">
            <p className="gcc-eyebrow">
              India ↔ Europe or the United States, selectively
            </p>
            <h1 id="international-title">
              Build where the
              <br />
              market <em>earns it.</em>
            </h1>
            <p className="gcc-hero-lede">
              Fernesta helps brands test whether an international move has a
              strong enough audience, proposition, operating model, and launch
              logic before the cost of entry compounds.
            </p>
            <div className="gcc-hero-actions">
              <Link href={auditHref}>
                Test market readiness <span aria-hidden="true">↗</span>
              </Link>
              <a href="#markets">Compare the market paths ↓</a>
            </div>
          </div>
          <figure className="gcc-hero-visual">
            <Image
              src="/prototype/assets/strategy-direction-editorial.webp"
              alt="A strategic working surface used to compare market evidence, positioning decisions, and launch priorities"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 45vw"
              unoptimized
            />
            <figcaption>
              The first decision is not how to launch. It is where the brand has
              earned the right to enter.
            </figcaption>
          </figure>
        </section>

        <section className="gcc-principle" id="approach">
          <span>Our position</span>
          <div>
            <h2>
              International is
              <br />
              not a market.
            </h2>
            <p>
              Europe contains distinct languages, regulations, category
              structures, and buyer behaviour. The United States contains
              different states, segments, costs, and competitive conditions.
              Fernesta begins by narrowing the choice—not by distributing the
              same campaign more widely.
            </p>
          </div>
        </section>

        <section className="gcc-markets" id="markets" aria-labelledby="markets-title">
          <div className="gcc-section-heading">
            <span>Selective expansion</span>
            <h2 id="markets-title">
              Europe or the US,
              <br />
              with a reason.
            </h2>
            <p>
              Both paths begin with evidence. Neither is presented as a market
              where Fernesta has local legal, cultural, or media expertise
              without the right specialists in the scope.
            </p>
          </div>
          <div className="gcc-market-grid international-market-grid">
            {markets.map((market) => (
              <article key={market.code} data-market={market.code}>
                <span>{market.number}</span>
                <h3>{market.name}</h3>
                <b>{market.role}</b>
                <p>{market.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="international-readiness"
          id="readiness"
          aria-labelledby="readiness-title"
        >
          <div className="gcc-section-heading">
            <span>The first engagement</span>
            <h2 id="readiness-title">
              Questions before
              <br />
              campaigns.
            </h2>
            <p>
              A readiness sprint resolves the entry decision, the adaptation
              brief, and the first operating sequence.
            </p>
          </div>
          <ol>
            {readinessQuestions.map((question, index) => (
              <li key={question}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{question}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="gcc-operating" aria-labelledby="operating-title">
          <div>
            <span>How the work is carried</span>
            <h2 id="operating-title">
              One strategic owner.
              <br />
              Specialist depth by market.
            </h2>
          </div>
          <div className="gcc-operating-copy">
            <p>
              Fernesta owns the connection between evidence, positioning,
              brand, launch, creative testing, and performance learning.
            </p>
            <p>
              Local-language work, jurisdiction-specific privacy or advertising
              review, media access, production, and distribution are scoped
              only after qualified market specialists are confirmed. This page
              is an entry proposition, not a claim of a local office.
            </p>
            <p className="gcc-proof-link">
              <Link href="/work">Review selected anonymized work ↗</Link>
              <span>
                These records demonstrate connected delivery; they are not
                presented as local Europe or United States proof.
              </span>
            </p>
          </div>
        </section>

        <section className="gcc-cta" aria-labelledby="international-cta-title">
          <span>A decision before a destination</span>
          <h2 id="international-cta-title">
            Find the market
            <br />
            worth entering.
          </h2>
          <p>
            Share the current brand, candidate markets, business model,
            operational constraints, and what success would need to mean. We
            will identify the questions that must be answered before entry.
          </p>
          <Link href={auditHref}>
            Register for an international readiness audit{" "}
            <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </main>

      <footer className="gcc-footer">
        <Link href="/">Fernesta Digital Private Limited</Link>
        <span>Jaipur, India · Working selectively across international markets</span>
        <Link href="/gcc">GCC market entry</Link>
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
