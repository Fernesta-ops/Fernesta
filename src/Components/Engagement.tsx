const phases = [
  {
    title: "Phase 1 - Diagnostic",
    detail:
      "Commercial model, data quality, and channel posture audit to define structural gaps.",
  },
  {
    title: "Phase 2 - Infrastructure Design",
    detail:
      "Governance architecture, KPI tree, and execution blueprint built for management control.",
  },
  {
    title: "Phase 3 - Deployment",
    detail:
      "Controlled rollout across paid media and conversion systems with strict operating cadence.",
  },
  {
    title: "Phase 4 - Reporting & Optimization",
    detail:
      "Executive reporting and continuous optimization cycles anchored to measurable business impact.",
  },
];

function Engagement() {
  return (
    <section id="engagement" className="section section-border">
      <div className="container split-layout">
        <div className="section-head split-head">
          <p className="meta">Engagement Architecture</p>
          <h2>A Structured and Repeatable Delivery Model</h2>
          <p>
            Every engagement follows a governed phase model so strategic
            decisions, execution quality, and reporting standards remain
            consistent at scale.
          </p>
        </div>
        <div className="engagement-grid">
          {phases.map((phase) => (
            <article key={phase.title} className="panel engagement-card">
              <h3>{phase.title}</h3>
              <p>{phase.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Engagement;
