import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MarketSelector from "../MarketSelector";
import "../fernesta.css";
import "../gcc/gcc.css";
import "./work.css";
import { workOrder } from "./work-data";
import { twitterCard } from "../seo";

const socialTitle = "Selected connected marketing work | Fernesta";
const socialDescription =
  "Anonymized engagement records showing the decisions, operating changes, and outcomes behind connected marketing work.";

export const metadata: Metadata = {
  title: "Selected Marketing Case Studies & Outcomes | Fernesta",
  description:
    "Explore anonymized Fernesta case studies across performance, branding and retention, hospitality launch communications, and marketing operations.",
  keywords: [
    "marketing agency case studies",
    "performance marketing case study",
    "branding case study",
    "social media launch case study",
    "marketing operations case study",
  ],
  alternates: { canonical: "/work" },
  openGraph: {
    type: "website",
    url: "https://www.fernesta.com/work",
    title: socialTitle,
    description: socialDescription,
    images: ["/og.jpg"],
  },
  twitter: twitterCard(socialTitle, socialDescription),
};

export default function WorkPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Fernesta selected marketing case studies",
    itemListElement: workOrder.map((study, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: study.result,
      url: `https://www.fernesta.com/work/${study.slug}`,
    })),
  };

  return (
    <div className="gcc-page work-hub-page">
      <a className="skip-link" href="#work-hub-content">
        Skip to selected work
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
        <nav aria-label="Selected work page navigation">
          <a href="#case-studies">Case studies</a>
          <Link href="/services">Services</Link>
          <Link
            className="gcc-nav-cta"
            href="/?challenge=Not%20sure%20yet#brand-audit"
          >
            Discuss your challenge <span aria-hidden="true">↗</span>
          </Link>
          <MarketSelector />
        </nav>
      </header>

      <main id="work-hub-content">
        <section className="work-hub-hero" aria-labelledby="work-hub-title">
          <span>Selected anonymised work</span>
          <h1 id="work-hub-title">
            Decisions made
            <br />
            <em>visible.</em>
          </h1>
          <p>
            These case studies reproduce outcome records already maintained by
            Fernesta. Client identities remain withheld, while the challenge,
            intervention, timeline, operating change, and recorded evidence are
            made clear.
          </p>
        </section>

        <section
          className="work-grid-section"
          id="case-studies"
          aria-labelledby="case-studies-title"
        >
          <div className="gcc-section-heading">
            <span>The evidence layer</span>
            <h2 id="case-studies-title">
              Outcomes with
              <br />
              the work attached.
            </h2>
            <p>
              A metric is useful only when the decisions and operating changes
              behind it can be examined.
            </p>
          </div>
          <div className="work-grid">
            {workOrder.map((study) => (
              <article className="work-card" key={study.slug}>
                <div>
                  <span>{study.number}</span>
                  <span>{study.context}</span>
                </div>
                <div>
                  <strong>{study.metric}</strong>
                  <h2>{study.result}</h2>
                  <p>{study.headline}</p>
                </div>
                <Link href={`/work/${study.slug}`}>
                  Read the case study <span aria-hidden="true">↗</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <aside className="work-disclosure" aria-label="Case study disclosure">
          <span>Evidence standard</span>
          <p>
            Every study is anonymised to protect client confidentiality.
            Figures reflect a specific engagement period and operating context.
            They illustrate the work and recorded outcome; they do not promise
            equivalent results for another organisation.
          </p>
        </aside>

        <section className="gcc-cta" aria-labelledby="work-hub-cta">
          <span>Have a live brief?</span>
          <h2 id="work-hub-cta">
            Put the current
            <br />
            evidence on the table.
          </h2>
          <p>
            Fernesta will review the visible brand, channel, and conversion
            signals before recommending the first decision or engagement.
          </p>
          <Link href="/?challenge=Not%20sure%20yet#brand-audit">
            Register for a free brand audit <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </main>

      <footer className="gcc-footer">
        <Link href="/">Fernesta Digital Private Limited</Link>
        <Link href="/jaipur">Marketing agency in Jaipur</Link>
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
