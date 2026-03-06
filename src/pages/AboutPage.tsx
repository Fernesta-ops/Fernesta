import { Link } from "react-router-dom";
import Reveal from "../Components/Reveal";
import SeoMeta from "../Components/SeoMeta";

const strengths = [
  "Modular fixed-scope service architecture",
  "Proprietary delivery frameworks reused across accounts",
  "Standardized reporting for enterprise-like visibility",
  "SME-first pricing with full-service accountability",
];

function AboutPage() {
  return (
    <>
      <SeoMeta
        title="About Fernesta | Digital Marketing Agency in Jaipur"
        description="Learn about Fernesta, a Jaipur-based digital marketing agency focused on strategy, accountability, and measurable business outcomes."
        keywords="about fernesta, digital marketing agency in Jaipur, SEO and performance marketing Jaipur"
      />

      <section className="page-hero hero-about">
        <div className="hero-overlay" />
        <div className="container hero-grid hero-grid-single">
          <Reveal className="hero-copy" delayMs={80}>
            <p className="meta">About Us</p>
            <h1>About Fernesta: A Results-Driven Digital Marketing Agency in Jaipur.</h1>
            <p>
              Fernesta was founded to solve one persistent market gap: Jaipur businesses need reliable marketing execution, but most can only choose between expensive agencies and inconsistent freelancers.
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
            <h2>Trusted Jaipur Marketing Partner for Measurable Growth</h2>
            <p>
              Our mission is to deliver consistent, data-led, accountable marketing that creates real business outcomes. Our vision is to become the most trusted growth partner for Jaipur businesses scaling online.
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
