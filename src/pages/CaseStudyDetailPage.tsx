import { Link, Navigate, useParams } from "react-router-dom";
import Reveal from "../Components/Reveal";
import SeoMeta from "../Components/SeoMeta";
import { caseStudies } from "../data/caseStudies";

function CaseStudyDetailPage() {
  const { slug } = useParams();
  const study = caseStudies.find((item) => item.slug === slug);

  if (!study) {
    return <Navigate to="/case-studies" replace />;
  }

  return (
    <>
      <SeoMeta
        title={`${study.client} Case Study | Fernesta`}
        description={`${study.client}: ${study.metric} ${study.result} through structured SEO, paid ads, and conversion optimization systems by Fernesta.`}
        keywords="case study, digital marketing results, SEO and paid ads success"
      />

      <section className="page-hero hero-services">
        <div className="hero-overlay" />
        <div className="container hero-grid hero-grid-single">
          <Reveal className="hero-copy" delayMs={80}>
            <p className="meta">Case Study</p>
            <h1>{study.client}</h1>
            <p>
              {study.metric} {study.result} in {study.timeline}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section-border">
        <div className="container split-layout">
          <Reveal className="panel interactive-card" delayMs={90}>
            <h3>Engagement Scope</h3>
            <div className="tag-list">
              {study.services.map((service) => (
                <span key={service} className="tag-chip">
                  {service}
                </span>
              ))}
            </div>
            <p>{study.detail}</p>
          </Reveal>

          <Reveal className="panel interactive-card" delayMs={170}>
            <h3>Before</h3>
            <ul className="case-points">
              {study.before.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section section-border">
        <div className="container">
          <Reveal className="panel interactive-card">
            <h3>After</h3>
            <ul className="case-points">
              {study.after.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <div className="button-row">
              <a className="button button-primary case-link" href={study.download} download>
                Download Case Study PDF
              </a>
              <Link className="button button-secondary case-link" to="/case-studies">
                Back to All Case Studies
              </Link>
            </div>
            <div className="button-row">
              <Link className="button button-secondary" to="/services">
                View Services
              </Link>
              <Link className="button button-secondary" to="/contact-us">
                Contact Fernesta
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export default CaseStudyDetailPage;
