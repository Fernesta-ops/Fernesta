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
        title="About Fernesta | Growth-Focused Digital Marketing Partner"
        description="Learn about Fernesta, a systems-driven digital marketing partner for Indian SMEs and D2C brands focused on strategy, accountability, and measurable outcomes."
        keywords="about fernesta, digital marketing company India, performance marketing partner"
      />

      <section className="page-hero hero-about">
        <div className="hero-overlay" />
        <div className="container hero-grid hero-grid-single">
          <Reveal className="hero-copy" delayMs={80}>
            <p className="meta">About Us</p>
            <h1>About Fernesta: A Scalable Digital Marketing Agency in India.</h1>
            <p>
              Fernesta was founded to solve one persistent market gap: Indian businesses need reliable marketing execution, but most can only choose between expensive agencies and inconsistent freelancers.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section-border">
        <div className="container split-layout">
          <Reveal delayMs={80}>
            <figure className="media-card interactive-card">
              <img
                src="/images/boardroom.jpg"
                alt="Leadership team aligned on strategy and delivery systems"
              />
            </figure>
          </Reveal>
          <Reveal className="section-head split-head" delayMs={170}>
            <p className="meta">Mission and Vision</p>
            <h2>Trusted SME and D2C Marketing Partner for Measurable Growth</h2>
            <p>
              Our mission is to deliver consistent, data-led, accountable marketing that creates real business outcomes. Our vision is to build India&apos;s leading scalable marketing platform for SMEs and D2C brands.
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
