import { Link } from "react-router-dom";
import CaseStudyShowcase from "../Components/CaseStudyShowcase";
import Reveal from "../Components/Reveal";
import SeoMeta from "../Components/SeoMeta";
import SocialProofStrip from "../Components/SocialProofStrip";
import TestimonialsSlider from "../Components/TestimonialsSlider";
import TrustMetricsBar from "../Components/TrustMetricsBar";
import GrowthSimulator from "../Components/GrowthSimulator";

const principles = [
  {
    title: "Strategy Before Execution",
    detail: "No campaign launches without a clear strategic rationale and commercial objective.",
  },
  {
    title: "Data Before Opinion",
    detail: "Recommendations are grounded in measurable evidence, not channel bias or guesswork.",
  },
  {
    title: "Story Before Sale",
    detail: "Brand and content systems are built to create trust before conversion pressure.",
  },
  {
    title: "Accountability Above All",
    detail: "Defined scope, reporting cadence, and outcome-linked delivery in every engagement.",
  },
];

const catalog = [
  {
    title: "Search Engine Optimization",
    detail: "On-page, off-page, and technical SEO for durable organic growth.",
    image: "/images/grain.jpg",
  },
  {
    title: "Performance Marketing",
    detail: "Google Ads and Meta Ads systems focused on quality leads and ROAS.",
    image: "/images/dashboard.jpg",
  },
  {
    title: "Social Media Management",
    detail: "Organic social strategy, community management, and paid social execution.",
    image: "/images/hero-bg.jpg",
  },
  {
    title: "Website and Conversion Systems",
    detail: "Website structure, landing page flow, and conversion architecture optimization.",
    image: "/images/ai.jpg",
  },
  {
    title: "Branding and Visual Identity",
    detail: "Brand profile, design language, and positioning clarity across channels.",
    image: "/images/boardroom.jpg",
  },
  {
    title: "E-Commerce Growth",
    detail: "Marketplace ads, listing optimization, and catalog-level profitability control.",
    image: "/images/growth.jpg",
  },
];

function HomePage() {
  return (
    <>
      <SeoMeta
        title="Digital Marketing Agency in Jaipur | Fernesta SEO, PPC and Social Media"
        description="Fernesta is a results-focused digital marketing agency in Jaipur helping businesses grow through SEO, Google Ads, social media marketing, and conversion-ready websites."
        keywords="digital marketing agency in Jaipur, SEO company in Jaipur, PPC agency Jaipur, social media marketing Jaipur, digital marketing services Jaipur"
      />

      <section className="page-hero hero-home">
        <div className="hero-overlay" />
        <div className="container hero-grid">
          <Reveal className="hero-copy" delayMs={80}>
            <p className="meta">Jaipur Digital Marketing Agency</p>
            <h1>Digital Marketing Agency in Jaipur for SEO, PPC, and Social Media Growth.</h1>
            <p>
              Fernesta helps Jaipur businesses generate measurable growth with data-led SEO, performance ads, social media management, and conversion-driven web strategy.
            </p>
            <div className="button-row">
              <Link className="button button-primary" to="/services">
                View Service Architecture
              </Link>
              <Link className="button button-secondary" to="/contact-us">
                Discuss Your Growth Plan
              </Link>
            </div>
          </Reveal>
          <Reveal delayMs={180}>
            <figure className="media-card interactive-card">
              <img
                src="/images/ai.jpg"
                alt="AI-powered marketing intelligence and reporting setup"
              />
            </figure>
          </Reveal>
        </div>
      </section>

      <TrustMetricsBar />
      <GrowthSimulator />

      <section className="section section-border">
        <div className="container">
          <Reveal className="section-head">
            <p className="meta">Service Catalog</p>
            <h2>Explore Fernesta&apos;s Portfolio of Growth Services</h2>
            <p>
              A structured catalog of digital growth capabilities, designed to be selected as integrated systems instead of isolated tasks.
            </p>
          </Reveal>
          <div className="service-portfolio-grid">
            {catalog.map((item, index) => (
              <Reveal key={item.title} delayMs={70 * (index + 1)}>
                <article className="service-portfolio-card interactive-card">
                  <img src={item.image} alt={item.title} />
                  <div className="service-portfolio-overlay">
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="button-row">
            <Link className="button button-primary" to="/services">
              View Detailed Services
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-border">
        <div className="container">
          <Reveal className="section-head">
            <p className="meta">Core Philosophy</p>
            <h2>SEO, Paid Ads, Social Media, and Growth Systems with Accountability</h2>
          </Reveal>
          <div className="card-grid card-grid-four">
            {principles.map((item, index) => (
              <Reveal key={item.title} delayMs={80 * (index + 1)}>
                <article className="panel interactive-card">
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-border">
        <div className="container">
          <Reveal className="section-head">
            <p className="meta">Explore More</p>
            <h2>Plan Your Growth with Service and Case Study Clarity</h2>
          </Reveal>
          <div className="button-row">
            <Link className="button button-secondary" to="/services">
              Digital Marketing Services
            </Link>
            <Link className="button button-secondary" to="/case-studies">
              SEO and Ads Case Studies
            </Link>
            <Link className="button button-primary" to="/contact-us">
              Book Consultation
            </Link>
          </div>
        </div>
      </section>

      <SocialProofStrip />
      <CaseStudyShowcase />
      <TestimonialsSlider />
    </>
  );
}

export default HomePage;
