import Image from "next/image";
import Link from "next/link";
import MarketSelector from "../MarketSelector";
import type { ServiceDefinition } from "./service-data";
import { services } from "./service-data";
import { workByService, workStudies } from "../work/work-data";

export default function ServiceDetailPage({
  service,
}: {
  service: ServiceDefinition;
}) {
  const auditHref = `/?challenge=${encodeURIComponent(service.challenge)}#brand-audit`;
  const relevantWork = workByService[service.slug].map(
    (slug) => workStudies[slug],
  );
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.title,
        serviceType: service.title,
        description: service.metaDescription,
        provider: {
          "@type": "Organization",
          "@id": "https://www.fernesta.com/#organization",
          name: "Fernesta Digital Private Limited",
          url: "https://www.fernesta.com/",
        },
        areaServed: [
          { "@type": "City", name: "Jaipur" },
          { "@type": "Country", name: "India" },
          { "@type": "Place", name: "Gulf Cooperation Council" },
          { "@type": "Place", name: "Europe" },
          { "@type": "Country", name: "United States" },
        ],
        url: `https://www.fernesta.com/services/${service.slug}`,
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
            name: "Services",
            item: "https://www.fernesta.com/services",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.title,
            item: `https://www.fernesta.com/services/${service.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="gcc-page service-detail-page">
      <a className="skip-link" href="#service-content">
        Skip to {service.title}
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
        <nav aria-label={`${service.title} page navigation`}>
          <Link href="/services">All services</Link>
          <a href="#engagements">Engagements</a>
          <Link className="gcc-nav-cta" href={auditHref}>
            Discuss this need <span aria-hidden="true">↗</span>
          </Link>
          <MarketSelector />
        </nav>
      </header>

      <main id="service-content">
        <section className="gcc-hero service-hero" aria-labelledby="service-title">
          <div className="gcc-hero-copy">
            <p className="gcc-eyebrow">
              {service.number} · {service.eyebrow}
            </p>
            <h1 id="service-title">
              {service.heroLead}
              <br />
              <em>{service.heroEmphasis}</em>
            </h1>
            <p className="gcc-hero-lede">{service.summary}</p>
            <div className="gcc-hero-actions">
              <Link href={auditHref}>
                Start with a brand audit <span aria-hidden="true">↗</span>
              </Link>
              <a href="#engagements">See possible engagements ↓</a>
            </div>
          </div>
          <figure className="gcc-hero-visual">
            <Image
              src={service.image}
              alt={service.imageAlt}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 45vw"
              unoptimized
            />
            <figcaption>
              {service.title} is carried into concrete decisions, outputs, and
              market learning.
            </figcaption>
          </figure>
        </section>

        <section className="gcc-principle">
          <span>Our position</span>
          <div>
            <h2>{service.thesis}</h2>
            <p>{service.thesisCopy}</p>
          </div>
        </section>

        <section className="service-signals" aria-labelledby="signals-title">
          <div className="gcc-section-heading">
            <span>When to engage</span>
            <h2 id="signals-title">
              Signals this work
              <br />
              should begin.
            </h2>
            <p>
              The starting point is the business and customer problem—not a
              pre-selected deliverable.
            </p>
          </div>
          <ol>
            {service.signals.map((signal, index) => (
              <li key={signal}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{signal}</p>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="gcc-engagements service-engagements"
          id="engagements"
          aria-labelledby="engagements-title"
        >
          <div className="gcc-section-heading">
            <span>Ways to work together</span>
            <h2 id="engagements-title">
              Focused scopes.
              <br />
              Connected outcomes.
            </h2>
            <p>
              Each engagement can stand alone or connect with another
              discipline when the problem crosses functional boundaries.
            </p>
          </div>
          <div className="gcc-offer-list">
            {service.engagements.map((engagement, index) => (
              <article key={engagement.title}>
                <div className="gcc-offer-title">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{engagement.title}</h3>
                </div>
                <p>{engagement.copy}</p>
                <ul aria-label={`${engagement.title} outputs`}>
                  {engagement.outputs.map((output) => (
                    <li key={output}>{output}</li>
                  ))}
                </ul>
                <Link href={auditHref}>Discuss this scope ↗</Link>
              </article>
            ))}
          </div>
        </section>

        <section className="service-process" aria-labelledby="process-title">
          <div className="gcc-section-heading">
            <span>How the work moves</span>
            <h2 id="process-title">
              Evidence to
              <br />
              action.
            </h2>
            <p>
              Senior direction remains close to the work from the first signal
              through the next market decision.
            </p>
          </div>
          <ol>
            {service.process.map((stage, index) => (
              <li key={stage.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{stage.title}</h3>
                <p>{stage.copy}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="service-evidence" aria-labelledby="service-evidence-title">
          <div className="gcc-section-heading">
            <span>Selected evidence</span>
            <h2 id="service-evidence-title">
              What connected
              <br />
              work can change.
            </h2>
            <p>
              These anonymized records show this discipline working alongside
              adjacent decisions. Results are context-specific and are not a
              guarantee of future performance.
            </p>
          </div>
          <div className="service-evidence-list">
            {relevantWork.map((study) => (
              <Link href={`/work/${study.slug}`} key={study.slug}>
                <span>{study.context}</span>
                <strong>{study.metric}</strong>
                <h3>{study.result}</h3>
                <p>{study.headline}</p>
                <span aria-hidden="true">Read the case study ↗</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="service-connections" aria-labelledby="connections-title">
          <div>
            <span>Connected disciplines</span>
            <h2 id="connections-title">The problem may not stop here.</h2>
            <p>
              Fernesta can keep one strategic thread across adjacent work
              without forcing the engagement into an oversized retainer.
            </p>
          </div>
          <div>
            {service.related.map((slug) => {
              const relatedService = services[slug];
              return (
                <Link href={`/services/${slug}`} key={slug}>
                  <span>{relatedService.number}</span>
                  <strong>{relatedService.title}</strong>
                  <span aria-hidden="true">↗</span>
                </Link>
              );
            })}
            <Link href="/gcc">
              <span>M</span>
              <strong>GCC market entry</strong>
              <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/international">
              <span>M</span>
              <strong>Europe & United States entry</strong>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>

        <section className="service-faq" aria-labelledby="service-faq-title">
          <div>
            <span>Before we begin</span>
            <h2 id="service-faq-title">Useful answers.</h2>
          </div>
          <div>
            {service.faq.map((item, index) => (
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

        <section className="gcc-cta" aria-labelledby="service-cta-title">
          <span>A useful first conversation</span>
          <h2 id="service-cta-title">
            Find the decision
            <br />
            worth making next.
          </h2>
          <p>
            Share the current brand, the pressure point, and any relevant
            website or social channels. Fernesta will review the signals before
            recommending a scope.
          </p>
          <Link href={auditHref}>
            Register for a free brand audit <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </main>

      <footer className="gcc-footer service-footer">
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
