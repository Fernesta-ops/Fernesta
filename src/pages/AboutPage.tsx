import { Link } from "react-router-dom";
import Reveal from "../Components/Reveal";
import SeoMeta from "../Components/SeoMeta";

const strengths = [
  "Modular fixed-scope service architecture",
  "Creative systems built for performance marketing response",
  "Workflow automation and reporting systems for execution visibility",
  "Standardized reporting for enterprise-like visibility",
  "SME-first pricing with full-service accountability",
];

function AboutPage() {
  return (
    <>
      <SeoMeta
        title="About Fernesta | Performance Marketing and Creative Growth Partner"
        description="Learn about Fernesta, a growth partner focused on performance marketing, creative design, workflow automation, accountability, and measurable business outcomes for Indian SMEs and D2C brands."
        keywords="about fernesta, digital marketing agency India, workflow automation partner India, performance marketing agency India"
      />

      <section className="page-hero hero-about">
        <div className="hero-overlay" />
        <div className="container hero-grid hero-grid-single">
          <Reveal className="hero-copy" delayMs={80}>
            <p className="meta">About Us</p>
            <h1>About Fernesta: A Results-Driven Growth Systems Partner for Indian SMEs.</h1>
            <p>
              Fernesta was founded to solve one persistent market gap: Indian SMEs need reliable performance marketing, creative execution, and workflow systems, but most can only choose between expensive agencies and inconsistent freelancers.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section-border">
        <div className="container split-layout">
          <Reveal delayMs={80}>
            <figure className="media-card interactive-card">
              <img
                src="/images/pages/about/section/team-visual-opt.jpg"
                alt="Leadership team aligned on strategy and delivery systems"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </Reveal>
          <Reveal className="section-head split-head" delayMs={170}>
            <p className="meta">Mission and Vision</p>
            <h2>Trusted Growth and Workflow Partner for Measurable Outcomes</h2>
            <p>
              Our mission is to deliver consistent, data-led, accountable performance marketing, creative design, and workflow automation that creates real business outcomes. Our vision is to become the most trusted growth partner for Indian businesses scaling online.
            </p>
            <div className="tag-list">
              {strengths.map((item) => (
                <span key={item} className="tag-chip">
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-border">
        <div className="container">
          <div className="button-row">
            <Link className="button button-secondary" to="/services">
              View Our Services
            </Link>
            <Link className="button button-secondary" to="/case-studies">
              Read Case Studies
            </Link>
            <Link className="button button-primary" to="/contact-us">
              Contact Fernesta
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutPage;
