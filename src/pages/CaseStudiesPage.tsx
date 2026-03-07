import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../Components/Reveal";
import SeoMeta from "../Components/SeoMeta";
import { caseStudies } from "../data/caseStudies";

const categories = ["All", ...Array.from(new Set(caseStudies.map((study) => study.category)))];

function CaseStudiesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return caseStudies.filter((study) => {
      const queryMatch =
        study.client.toLowerCase().includes(query.toLowerCase()) ||
        study.detail.toLowerCase().includes(query.toLowerCase()) ||
        study.objective.toLowerCase().includes(query.toLowerCase()) ||
        study.services.join(" ").toLowerCase().includes(query.toLowerCase());
      const categoryMatch = category === "All" || study.category === category;
      return queryMatch && categoryMatch;
    });
  }, [query, category]);

  return (
    <>
      <SeoMeta
        title="Growth, Workflow, and Marketing Case Studies | Fernesta"
        description="Explore in-depth Fernesta case studies covering SEO, paid media, social media, workflow automation, PR, and measurable commercial outcomes."
        keywords="digital marketing case studies, workflow automation case study, SEO case study, paid media results, PR case study"
      />

      <section className="page-hero hero-clientele">
        <div className="hero-overlay" />
        <div className="container hero-grid hero-grid-single">
          <Reveal className="hero-copy" delayMs={80}>
            <p className="meta">Case Studies</p>
            <h1>Documented Outcomes Across SEO, Performance, Social, Workflow, and PR Systems.</h1>
            <p>
              Each case study captures the client context, operating changes, execution systems, and measurable before-and-after outcomes from our engagement model.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section-border">
        <div className="container">
          <div className="case-toolbar">
            <div className="case-search-row">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by client or result"
                aria-label="Search case studies"
              />
              {query && (
                <button
                  type="button"
                  className="filter-pill case-clear"
                  onClick={() => setQuery("")}
                  aria-label="Clear case study search"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="filter-row">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={category === item ? "filter-pill filter-pill-active" : "filter-pill"}
                  onClick={() => setCategory(item)}
                  aria-pressed={category === item}
                >
                  {item}
                </button>
              ))}
            </div>
            <p className="case-result-count">
              {filtered.length} case {filtered.length === 1 ? "study" : "studies"} found
            </p>
          </div>

          <div className="card-grid card-grid-two">
            {filtered.map((study, index) => (
              <Reveal key={study.slug} delayMs={80 * (index + 1)}>
                <article className="panel interactive-card case-card">
                  <p className="meta">{study.category}</p>
                  <h3>{study.client}</h3>
                  <p className="case-metric">{study.metric}</p>
                  <p className="case-result">{study.result}</p>
                  <div className="case-story">
                    <p>
                      <strong>Context:</strong> {study.objective}
                    </p>
                    <p>
                      <strong>Intervention:</strong> {study.approach[0]}
                    </p>
                    <p>
                      <strong>Impact:</strong> {study.businessImpact[0]}
                    </p>
                  </div>
                  <div className="button-row case-actions">
                    <Link className="button button-secondary case-link" to={`/case-studies/${study.slug}`}>
                      View Full Breakdown
                    </Link>
                    <a className="button button-secondary case-link" href={study.download} download>
                      Download PDF
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          {filtered.length === 0 && <p className="empty-note">No case studies match your search.</p>}
        </div>
      </section>

      <section className="section section-border">
        <div className="container">
          <div className="button-row">
            <Link className="button button-secondary" to="/services">
              Explore Service Pages
            </Link>
            <Link className="button button-secondary" to="/clientele">
              Check Client Fit
            </Link>
            <Link className="button button-primary" to="/contact-us">
              Book Strategy Call
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default CaseStudiesPage;
