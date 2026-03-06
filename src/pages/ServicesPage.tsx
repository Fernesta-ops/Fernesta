import { Link } from "react-router-dom";
import Reveal from "../Components/Reveal";
import ServiceFaq from "../Components/ServiceFaq";
import SeoMeta from "../Components/SeoMeta";

const serviceBlueprint = [
  {
    title: "Search Engine Optimization Services",
    summary:
      "On-page SEO, off-page SEO, and technical SEO to improve search visibility, keyword rankings, and qualified organic traffic.",
    tasks: [
      "Keyword research, title tags, and meta descriptions",
      "Internal linking and content optimization by intent",
      "Backlink and directory strategy with competitor audits",
      "Core Web Vitals, schema markup, sitemap, and Search Console",
    ],
  },
  {
    title: "Social Media Management Services",
    summary:
      "Organic social media marketing, community management, and paid social campaigns for Instagram and Facebook growth.",
    tasks: [
      "Monthly content calendar, Reels, and carousel creation",
      "Caption writing, hashtag research, and scheduling",
      "Comment and DM response management",
      "Meta audience targeting, retargeting, and reporting",
    ],
  },
  {
    title: "Google Ads and Meta Ads Management",
    summary:
      "Performance marketing campaigns across Google Search, Display, YouTube, and Meta to generate leads and sales.",
    tasks: [
      "Google Ads account setup and campaign architecture",
      "Negative keywords, ad extensions, and conversion tracking",
      "Display and YouTube remarketing campaign setup",
      "Meta pixel implementation and budget optimization",
    ],
  },
  {
    title: "Website Design and Website Development",
    summary:
      "Business website creation with mobile-first UI/UX, conversion-focused layouts, and launch-ready SEO setup.",
    tasks: [
      "Sitemap, wireframes, and page-level UI design",
      "CMS setup, page build, forms, and CTA integration",
      "Speed optimization, SSL, and responsive QA",
      "Analytics, Search Console, and launch checklist",
    ],
  },
  {
    title: "Graphic Designing for Marketing",
    summary:
      "Graphic design support for social media creatives, ad banners, business branding assets, and sales collateral.",
    tasks: [
      "Brand kit and reusable social media templates",
      "Ad creative design for Google and Meta campaigns",
      "Brochure, presentation, and business card design",
      "Email template and infographic design",
    ],
  },
  {
    title: "E-Commerce Advertising and ROAS Optimization",
    summary:
      "Marketplace and e-commerce ad management focused on listing optimization, sponsored ads, and profitable ROAS growth.",
    tasks: [
      "Product title and listing optimization by keyword",
      "Sponsored product, brand, and display campaigns",
      "Catalog retargeting and deal or coupon strategy",
      "ROAS, ACoS, and revenue reporting with bid controls",
    ],
  },
  {
    title: "Branding and Business Profiling",
    summary:
      "Brand identity development and digital profile setup for stronger trust, discoverability, and professional positioning.",
    tasks: [
      "Brand discovery, logo variants, color palette, and typography",
      "Brand guideline document and voice or tone framework",
      "Google Business Profile and social profile optimization",
      "Pitch deck, company profile, and proposal templates",
    ],
  },
  {
    title: "PR and Influencer Management",
    summary:
      "Strategic public relations and influencer partnership management to amplify brand reach, build media presence, and drive credibility.",
    tasks: [
      "PR strategy, press release writing, and media outreach",
      "Influencer identification, brief creation, and campaign coordination",
      "Campaign performance tracking and ROI measurement",
      "Reputation monitoring and brand sentiment analysis",
    ],
  },
];

function ServicesPage() {
  return (
    <>
      <SeoMeta
        title="Global Digital Marketing Services | SEO, PPC, Social Media and Web | Fernesta"
        description="Explore Fernesta's global digital marketing services including SEO, Google Ads, Meta Ads, social media marketing, website development, and branding."
        keywords="digital marketing services, SEO services, Google Ads agency, social media agency, website design services"
      />

      <section className="page-hero hero-services">
        <div className="hero-overlay" />
        <div className="container hero-grid hero-grid-single">
          <Reveal className="hero-copy" delayMs={80}>
            <p className="meta">Services</p>
            <h1>SEO, Paid Ads, Social Media, and Website Services for Global Business Growth</h1>
            <p>
              Based on our Digital Marketing Services Blueprint, Fernesta delivers eight core services through a structured, execution-ready system for startups, SMEs, and growth-stage teams across markets.
            </p>
            <div className="button-row">
              <Link className="button button-primary" to="/contact-us">
                Request Service Consultation
              </Link>
              <Link className="button button-secondary" to="/case-studies">
                Explore Results
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-border">
        <div className="container">
          <Reveal className="section-head">
            <p className="meta">Core Services</p>
            <h2>Complete Digital Marketing Services for Global Brands</h2>
            <p>
              Every service includes planning, execution, optimization, and reporting so growth decisions remain data-led and accountable.
            </p>
          </Reveal>

          <div className="card-grid card-grid-two card-numbered">
            {serviceBlueprint.map((service, index) => (
              <Reveal key={service.title} delayMs={70 * (index + 1)}>
                <article className="panel interactive-card service-blueprint-card">
                  <h3>{service.title}</h3>
                  <p>{service.summary}</p>
                  <ul className="service-list">
                    {service.tasks.map((task) => (
                      <li key={task}>{task}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq />

      <section className="section section-border">
        <div className="container">
          <Reveal className="section-head">
            <p className="meta">Next Step</p>
            <h2>Compare Service Fit with Real Outcomes</h2>
          </Reveal>
          <div className="button-row">
            <Link className="button button-secondary" to="/case-studies">
              See Marketing Case Studies
            </Link>
            <Link className="button button-secondary" to="/clientele">
              Check Ideal Client Fit
            </Link>
            <Link className="button button-primary" to="/contact-us">
              Request Strategy Call
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default ServicesPage;
