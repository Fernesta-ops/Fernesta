import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MarketSelector from "../MarketSelector";
import "../fernesta.css";
import "../gcc/gcc.css";
import "./services.css";
import { serviceOrder } from "./service-data";

export const metadata: Metadata = {
  title: "Creative Marketing Services: Strategy to Growth | Fernesta",
  description:
    "Explore Fernesta's connected services across strategy and launch planning, branding and creative, growth and performance, and social media and content.",
  keywords: [
    "creative marketing services",
    "brand strategy agency",
    "branding and creative agency",
    "growth marketing agency",
    "social media content agency",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    type: "website",
    url: "https://www.fernesta.com/services",
    title: "Connected creative marketing services | Fernesta",
    description:
      "Four senior-led disciplines connected from evidence and positioning through brand, launch, content, conversion, and growth learning.",
    images: [
      {
        url: "/og.jpg",
        width: 1733,
        height: 907,
        alt: "Fernesta connected creative marketing system",
      },
    ],
  },
};

const systemStages = [
  {
    title: "Direction",
    copy: "Choose the audience, position, offer, and market sequence.",
  },
  {
    title: "Creative",
    copy: "Turn the decision into a recognisable identity, story, and campaign system.",
  },
  {
    title: "Growth",
    copy: "Connect acquisition, experience, conversion, and commercial learning.",
  },
  {
    title: "Content",
    copy: "Build the channel presence, formats, and participation that sustain momentum.",
  },
] as const;

export default function ServicesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Fernesta creative marketing services",
    itemListElement: serviceOrder.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://www.fernesta.com/services/${service.slug}`,
      name: service.title,
    })),
  };

  return (
    <div className="gcc-page services-hub-page">
      <a className="skip-link" href="#services-content">
        Skip to services
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
        <nav aria-label="Services page navigation">
          <a href="#disciplines">Disciplines</a>
          <Link href="/gcc">Markets</Link>
          <Link
            className="gcc-nav-cta"
            href="/?challenge=Not%20sure%20yet#brand-audit"
          >
            Find your starting point <span aria-hidden="true">↗</span>
          </Link>
          <MarketSelector />
        </nav>
      </header>

      <main id="services-content">
        <section className="services-hub-hero" aria-labelledby="services-title">
          <span>What Fernesta does</span>
          <h1 id="services-title">
            Four disciplines.
            <br />
            <em>One direction.</em>
          </h1>
          <p>
            Fernesta connects strategy and launch planning, branding and
            creative, growth and performance, and social media and content.
            Begin with one focused need or build the connected system required
            to move from evidence to market action.
          </p>
        </section>

        <section
          className="services-grid-section"
          id="disciplines"
          aria-labelledby="disciplines-title"
        >
          <div className="gcc-section-heading">
            <span>The core system</span>
            <h2 id="disciplines-title">
              Choose the problem.
              <br />
              Keep the connections.
            </h2>
            <p>
              Each page explains when the discipline is useful, the
              engagements Fernesta can take on, and what the work can produce.
            </p>
          </div>
          <div className="services-grid">
            {serviceOrder.map((service) => (
              <article key={service.slug}>
                <span>{service.number}</span>
                <div>
                  <h2>{service.title}</h2>
                  <p>{service.summary}</p>
                </div>
                <Link href={`/services/${service.slug}`}>
                  Explore {service.shortTitle}
                  <span aria-hidden="true">↗</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="services-system" aria-labelledby="system-title">
          <div>
            <span>How the disciplines connect</span>
            <h2 id="system-title">One strategic thread.</h2>
          </div>
          <ol>
            {systemStages.map((stage, index) => (
              <li key={stage.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{stage.title}</strong>
                <p>{stage.copy}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="gcc-cta" aria-labelledby="services-cta-title">
          <span>Unsure where the problem begins?</span>
          <h2 id="services-cta-title">
            Start with
            <br />
            the signals.
          </h2>
          <p>
            Share the current website, social presence, and business pressure
            point. Fernesta will review what is visible before recommending the
            most useful starting discipline.
          </p>
          <Link href="/?challenge=Not%20sure%20yet#brand-audit">
            Register for a free brand audit <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </main>

      <footer className="gcc-footer">
        <Link href="/">Fernesta Digital Private Limited</Link>
        <span>Strategy · Brand · Growth · Content</span>
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

