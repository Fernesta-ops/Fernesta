import { Link } from "react-router-dom";
import CountUp from "../Components/CountUp";
import Reveal from "../Components/Reveal";
import SeoMeta from "../Components/SeoMeta";

const clienteleStats = [
  {
    end: 63,
    suffix: "M+",
    label: "MSMEs in India indicating long-term market demand",
  },
  {
    prefix: "Rs. ",
    end: 50,
    suffix: "Cr",
    label: "Primary target annual revenue band for SME clients",
  },
  {
    end: 60,
    suffix: "%+",
    label: "Women-majority hiring commitment in the operating model",
  },
];

const segments = [
  "Founder-led SMEs scaling digitally",
  "Early to growth-stage D2C brands",
  "Regional businesses expanding online",
  "Businesses needing one accountable marketing partner",
];

function ClientelePage() {
  return (
    <>
      <SeoMeta
        title="Industries We Serve in Jaipur | Fernesta Digital Marketing Agency"
        description="Fernesta works with Jaipur SMEs, D2C brands, and growth-stage businesses seeking structured digital marketing systems and accountable execution."
        keywords="digital marketing agency Jaipur industries, SME marketing Jaipur, D2C marketing Jaipur"
      />

      <section className="page-hero hero-clientele">
        <div className="hero-overlay" />
        <div className="container hero-grid hero-grid-single">
          <Reveal className="hero-copy" delayMs={80}>
            <p className="meta">Clientele</p>
            <h1>Digital Marketing Partner for Jaipur SMEs, D2C Brands, and Growth Teams.</h1>
            <p>
              We work best with businesses that value transparency, structured execution, and direct founder-led accountability.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section-border">
        <div className="container split-layout">
          <div className="card-grid card-grid-three">
            {clienteleStats.map((stat, index) => (
              <Reveal key={stat.label} delayMs={90 * (index + 1)}>
                <article className="panel stat-card interactive-card">
                  <h2>
                    <CountUp
                      end={stat.end}
                      prefix={stat.prefix ?? ""}
                      suffix={stat.suffix}
                    />
                  </h2>
                  <p>{stat.label}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delayMs={190}>
            <figure className="media-card interactive-card">
              <img
                src="/images/pages/clientele/section/reporting-dashboard-opt.jpg"
                alt="Performance dashboard used for transparent client reporting"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="section section-border">
        <div className="container">
          <Reveal className="section-head">
            <p className="meta">Ideal Client Profile</p>
            <h2>Industries and Business Types We Serve</h2>
          </Reveal>
          <div className="tag-list">
            {segments.map((segment, index) => (
              <Reveal key={segment} delayMs={70 * (index + 1)}>
                <span className="tag-chip">{segment}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-border">
        <div className="container">
          <div className="button-row">
            <Link className="button button-secondary" to="/services">
              Explore Service Packages
            </Link>
            <Link className="button button-secondary" to="/case-studies">
              Review Client Results
            </Link>
            <Link className="button button-primary" to="/contact-us">
              Discuss Your Business
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default ClientelePage;
