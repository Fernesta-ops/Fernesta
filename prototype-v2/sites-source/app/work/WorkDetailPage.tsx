import Image from "next/image";
import Link from "next/link";
import MarketSelector from "../MarketSelector";
import { services } from "../services/service-data";
import type { WorkStudy } from "./work-data";

export default function WorkDetailPage({ study }: { study: WorkStudy }) {
  const auditHref = `/?challenge=${encodeURIComponent(study.auditChallenge)}#brand-audit`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: study.metaTitle,
    description: study.metaDescription,
    creator: {
      "@type": "Organization",
      "@id": "https://www.fernesta.com/#organization",
      name: "Fernesta Digital Private Limited",
      url: "https://www.fernesta.com/",
    },
    about: study.services.map((slug) => ({
      "@type": "Service",
      name: services[slug].title,
      url: `https://www.fernesta.com/services/${slug}`,
    })),
    isAccessibleForFree: true,
    url: `https://www.fernesta.com/work/${study.slug}`,
  };

  return (
    <div className="gcc-page work-detail-page">
      <a className="skip-link" href="#work-content">
        Skip to case study
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
        <nav aria-label="Case study navigation">
          <Link href="/work">Selected work</Link>
          <a href="#evidence">Evidence</a>
          <Link className="gcc-nav-cta" href={auditHref}>
            Discuss a similar problem <span aria-hidden="true">↗</span>
          </Link>
          <MarketSelector />
        </nav>
      </header>

      <main id="work-content">
        <section className="work-hero" aria-labelledby="work-title">
          <div className="work-hero-copy">
            <p>
              {study.number} · {study.context} · {study.timeline}
            </p>
            <h1 id="work-title">{study.headline}</h1>
            <div>
              <span>{study.category}</span>
              <p>{study.detail}</p>
            </div>
          </div>
          <aside className="work-hero-result" aria-label="Primary outcome">
            <span>Primary outcome</span>
            <strong>{study.metric}</strong>
            <p>{study.result}</p>
            <small>
              Anonymised engagement record. Results reflect this specific
              context, period, and operating environment; they are not a
              guarantee of future performance.
            </small>
          </aside>
        </section>

        <section className="work-objective" aria-labelledby="objective-title">
          <span>The objective</span>
          <h2 id="objective-title">{study.objective}</h2>
        </section>

        <section className="work-evidence" id="evidence" aria-labelledby="evidence-title">
          <div className="gcc-section-heading">
            <span>Recorded evidence</span>
            <h2 id="evidence-title">
              Before and
              <br />
              after.
            </h2>
            <p>
              The displayed values reproduce the maintained case-study record.
              “Index” indicates a relative baseline where commercially
              sensitive absolute values are withheld.
            </p>
          </div>
          <div className="work-evidence-grid">
            {study.evidence.map((point, index) => (
              <article key={point.label}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{point.label}</h3>
                <div>
                  <p>
                    <span>Before</span>
                    <strong>{point.before}</strong>
                  </p>
                  <span aria-hidden="true">→</span>
                  <p>
                    <span>After</span>
                    <strong>{point.after}</strong>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="work-approach" aria-labelledby="approach-title">
          <div className="gcc-section-heading">
            <span>The connected response</span>
            <h2 id="approach-title">
              What changed
              <br />
              in the work.
            </h2>
            <p>
              The intervention crossed functions where the problem required it,
              while retaining one decision thread.
            </p>
          </div>
          <ol>
            {study.approach.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="work-timeline" aria-labelledby="timeline-title">
          <div>
            <span>Engagement timeline</span>
            <h2 id="timeline-title">{study.timeline}</h2>
          </div>
          <ol>
            {study.stages.map((stage, index) => (
              <li key={stage.phase}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{stage.phase}</strong>
                  <small>{stage.window}</small>
                </div>
                <p>{stage.focus}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="work-change" aria-labelledby="change-title">
          <div className="gcc-section-heading">
            <span>The operating shift</span>
            <h2 id="change-title">
              The condition
              <br />
              changed.
            </h2>
            <p>
              Outcomes are more credible when the operating changes behind them
              remain visible.
            </p>
          </div>
          <div className="work-change-columns">
            <article>
              <span>Before</span>
              <ul>
                {study.before.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article>
              <span>After</span>
              <ul>
                {study.after.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="work-impact" aria-labelledby="impact-title">
          <div>
            <span>Business impact</span>
            <h2 id="impact-title">What became possible.</h2>
          </div>
          <ol>
            {study.impact.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="work-services" aria-labelledby="work-services-title">
          <div>
            <span>Disciplines in the work</span>
            <h2 id="work-services-title">Connected where required.</h2>
          </div>
          <div>
            {study.services.map((slug) => (
              <Link href={`/services/${slug}`} key={slug}>
                <span>{services[slug].number}</span>
                <strong>{services[slug].title}</strong>
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="gcc-cta" aria-labelledby="work-cta-title">
          <span>Have a related pressure point?</span>
          <h2 id="work-cta-title">
            Start with
            <br />
            the current evidence.
          </h2>
          <p>
            Share the website, social presence, and business context. Fernesta
            will review the visible signals before recommending what should
            change first.
          </p>
          <Link href={auditHref}>
            Register for a free brand audit <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </main>

      <footer className="gcc-footer">
        <Link href="/">Fernesta Digital Private Limited</Link>
        <Link href="/work">Selected work</Link>
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
