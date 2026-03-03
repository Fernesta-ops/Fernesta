const pillars = [
  {
    title: "Paid Media Governance",
    detail:
      "Budget architecture, account controls, and channel governance mapped to business outcomes.",
  },
  {
    title: "Conversion Architecture",
    detail:
      "Landing, funnel, and journey systems engineered to convert qualified demand with consistency.",
  },
  {
    title: "Attribution Intelligence",
    detail:
      "Cross-platform measurement architecture that isolates incrementality and protects ROI decisions.",
  },
];

function Systems() {
  return (
    <section id="systems" className="section section-border">
      <div className="container split-layout">
        <div className="section-head split-head">
          <p className="meta">Core Systems</p>
          <h2>Infrastructure Designed for Repeatable Performance</h2>
          <p>
            Each system is engineered as a management layer, not a campaign
            tactic, enabling clarity, control, and measurable operating
            discipline.
          </p>
        </div>
        <div className="systems-grid">
          {pillars.map((item, index) => (
            <article key={item.title} className="panel system-card">
              <p className="meta">0{index + 1}</p>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Systems;
