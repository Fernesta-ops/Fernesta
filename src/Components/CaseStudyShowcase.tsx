import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import Reveal from "./Reveal";
import { caseStudies } from "../data/caseStudies";

const filters = ["All", "SEO", "Performance", "Brand"];

function CaseStudyShowcase() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredStudies = useMemo(() => {
    if (activeFilter === "All") return caseStudies;
    return caseStudies.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <section className="section section-border">
      <div className="container">
        <Reveal className="section-head">
          <p className="meta">Case Study Highlights</p>
          <h2>Proof-Driven Outcomes Across Service Lines</h2>
        </Reveal>

        <div className="filter-row" role="tablist" aria-label="Case study filters">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={activeFilter === filter ? "filter-pill filter-pill-active" : "filter-pill"}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="card-grid card-grid-two">
          {filteredStudies.map((study, index) => (
            <Reveal key={`${study.client}-${study.metric}`} delayMs={80 * (index + 1)}>
              <article className="panel interactive-card case-card">
                <p className="meta">{study.category}</p>
                <h3>{study.client}</h3>
                <p className="case-metric">{study.metric}</p>
                <p className="case-result">{study.result}</p>
                <p>{study.detail}</p>
                <div className="button-row case-actions">
                  <Link className="button button-secondary case-link" to={`/case-studies/${study.slug}`}>
                    View Full Case
                  </Link>
                  <a className="button button-secondary case-link" href={study.download} download>
                    Download PDF
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={120}>
          <div className="section-actions">
            <Link className="button button-primary" to="/case-studies">
              View All Case Studies
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default CaseStudyShowcase;
