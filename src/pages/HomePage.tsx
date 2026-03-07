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

const heroSignals = [
  { label: "Avg. Response Time", value: "24 Hours" },
  { label: "Integrated Service Lines", value: "9 Core Services" },
  { label: "Workflow Systems", value: "Lead Routing + Reporting" },
  { label: "Decision Rhythm", value: "Weekly Review Cadence" },
];

const onboardingSteps = [
  {
    title: "Discovery and Baseline",
    detail: "We review channel performance, growth constraints, and current funnel leakage in one focused session.",
    output: "You get a clear baseline and priority gaps within 48 hours.",
  },
  {
    title: "Growth and Workflow Architecture",
    detail: "We map SEO, paid media, social, website conversion paths, lead routing, approval flows, and reporting automation into one accountable operating plan tied to business goals.",
    output: "You receive a channel, workflow, and KPI roadmap the team can act on immediately.",
  },
  {
    title: "Execution and Automation Sprint",
    detail: "Implementation starts with a structured 30-day sprint covering campaign delivery, tracking, and workflow handoffs with weekly decision checkpoints.",
    output: "You get visible execution momentum, cleaner internal coordination, and measurable early indicators.",
  },
];

const catalog = [
  {
    title: "Search Engine Optimization",
    detail: "On-page, off-page, and technical SEO for durable organic growth.",
    image: "/images/pages/home/services/seo-analytics-dark.jpg",
  },
  {
    title: "Performance Marketing",
    detail: "Google Ads and Meta Ads systems focused on quality leads and ROAS.",
    image: "/images/pages/home/services/performance-marketing-dark.jpg",
  },
  {
    title: "Social Media Management",
    detail: "Organic social strategy, community management, and paid social execution.",
    image: "/images/pages/home/services/social-media-strategy-dark.jpg",
  },
  {
    title: "Workflow Automation and Reporting Systems",
    detail: "Lead routing, approval flows, CRM sync, and reporting systems that remove manual bottlenecks.",
    image: "/images/pages/home/services/web-conversion-dark.jpg",
  },
  {
    title: "Website and Conversion Systems",
    detail: "Website structure, landing page flow, and conversion architecture optimization.",
    image: "/images/pages/home/services/web-conversion-dark.jpg",
  },
  {
    title: "Graphic Designing for Marketing",
    detail: "Ad creatives, sales collateral, social design systems, and campaign visuals built for reuse.",
    image: "/images/pages/home/services/branding-identity-dark.jpg",
  },
  {
    title: "Branding and Visual Identity",
    detail: "Brand profile, design language, and positioning clarity across channels.",
    image: "/images/pages/home/services/branding-identity-dark.jpg",
  },
  {
    title: "E-Commerce Growth",
    detail: "Marketplace ads, listing optimization, and catalog-level profitability control.",
    image: "/images/pages/home/services/ecommerce-growth-dark.jpg",
  },
  {
    title: "PR and Influencer Management",
    detail: "Strategic PR campaigns and influencer partnerships to amplify brand reach and credibility.",
    image: "/images/pages/home/services/pr-influencer-dark.jpg",
  },
];

const formatIndex = (index: number) => String(index + 1).padStart(2, "0");

function HomePage() {
  return (
    <>
      <SeoMeta
        title="AI-First Digital Marketing and Workflow Automation for Indian SMEs | Fernesta"
        description="Fernesta builds governance-led growth systems for Indian SMEs and D2C brands, integrating paid media, SEO, workflow automation, conversion architecture, and attribution into one accountable operating model."
        keywords="digital marketing agency India, workflow automation agency India, SEO agency India, performance marketing agency, D2C growth agency"
      />

      <section className="page-hero hero-home">
        <div className="hero-overlay" />
        <div className="container hero-grid">
          <Reveal className="hero-copy" delayMs={80}>
            <p className="meta">AI-First Growth Infrastructure Firm</p>
            <h1>AI-First Marketing and Workflow Automation Systems for Structured Growth.</h1>
            <p>
              Fernesta builds governance-led growth infrastructure for Indian SMEs and D2C brands scaling beyond Rs. 3Cr revenue, integrating paid media control, workflow automation, conversion architecture, and attribution discipline into one accountable operating model.
            </p>
            <div className="button-row">
              <Link className="button button-primary" to="/contact-us">
                Book Strategy Consultation
              </Link>
              <Link className="button button-primary" to="/services">
                View Service Architecture
              </Link>
            </div>
            <div className="hero-signal-row" aria-label="Key service signals">
              {heroSignals.map((signal) => (
                <div key={signal.label} className="hero-signal">
                  <strong>{signal.value}</strong>
                  <span>{signal.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delayMs={180}>
            <figure className="media-card interactive-card">
              <img
                src="/images/pages/home/hero/visual-opt.jpg"
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
            <p className="meta">Onboarding Clarity</p>
            <h2>Know Exactly What Happens in the First 30 Days</h2>
            <p>
              Our engagement starts with a low-friction process designed to reduce uncertainty and accelerate execution confidence.
            </p>
          </Reveal>
          <div className="card-grid card-grid-three card-numbered">
            {onboardingSteps.map((step, index) => (
              <Reveal key={step.title} delayMs={70 * (index + 1)}>
                <article className="panel interactive-card onboarding-card">
                  <span className="panel-index" aria-hidden="true">
                    {formatIndex(index)}
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.detail}</p>
                  <p className="onboarding-output">{step.output}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="button-row">
            <Link className="button button-secondary" to="/contact-us">
              Start With Discovery Call
            </Link>
            <Link className="button button-secondary" to="/case-studies">
              Review Comparable Outcomes
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-border">
        <div className="container">
          <Reveal className="section-head">
            <p className="meta">Service Catalog</p>
            <h2>Explore Fernesta&apos;s Portfolio of Growth Services</h2>
            <p>
              A structured catalog of digital growth and workflow capabilities, designed to be selected as integrated systems instead of isolated tasks.
            </p>
          </Reveal>
          <div className="service-portfolio-grid">
            {catalog.map((item, index) => (
              <Reveal key={item.title} delayMs={70 * (index + 1)}>
                <article className="service-portfolio-card interactive-card">
                  <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
                  <div className="service-portfolio-overlay">
                    <span className="service-card-index" aria-hidden="true">
                      {formatIndex(index)}
                    </span>
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
            <h2>SEO, Paid Ads, Workflow Automation, and Growth Systems with Accountability</h2>
          </Reveal>
          <div className="card-grid card-grid-four card-numbered">
            {principles.map((item, index) => (
              <Reveal key={item.title} delayMs={80 * (index + 1)}>
                <article className="panel interactive-card">
                  <span className="panel-index" aria-hidden="true">
                    {formatIndex(index)}
                  </span>
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
            <p className="meta">Decision Next Step</p>
            <h2>Choose the Next Action Based on Your Current Growth Stage</h2>
          </Reveal>
          <div className="button-row">
            <Link className="button button-primary" to="/contact-us">
              Book Consultation
            </Link>
            <Link className="button button-secondary" to="/case-studies">
              SEO and Ads Case Studies
            </Link>
            <Link className="button button-secondary" to="/services">
              Compare Service Fit
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
