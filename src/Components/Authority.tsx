const modules = [
  {
    title: "Governance",
    detail:
      "Decision rights, approval controls, and escalation discipline built into campaign operations.",
  },
  {
    title: "Performance Intelligence",
    detail:
      "Unified reporting and KPI hierarchies that convert marketing activity into executive clarity.",
  },
  {
    title: "Attribution Discipline",
    detail:
      "Channel-level attribution frameworks designed to reduce noise and defend media investments.",
  },
];

function Authority() {
  return (
    <section id="authority" className="section section-border">
      <div className="container">
        <div className="section-head">
          <p className="meta">Institutional Authority</p>
          <h2>Governed Execution. Measurable Outcomes.</h2>
        </div>
        <div className="authority-grid">
          {modules.map((item) => (
            <article key={item.title} className="panel authority-card">
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Authority;
