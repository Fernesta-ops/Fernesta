export default function Performance() {
  return (
    <section className="performance-section">
      <div className="performance-container">

        {/* TOP GRID */}
        <div className="performance-hero-grid">

          <div className="performance-text">
            <h1>Performance Marketing Intelligence</h1>
            <p>
              Multi-channel acquisition systems powered by structured funnels,
              predictive modeling, and ROI-governed analytics.
            </p>
          </div>

          <div className="performance-image">
            <img src="/images/growth.jpg" alt="Performance Dashboard" />
          </div>

        </div>

        {/* DIVIDER */}
        <div className="performance-divider" />

        {/* STRATEGIC SYSTEM BLOCK */}
        <div className="performance-system-grid">

          <div className="system-block">
            <h3>Paid Media Governance</h3>
            <p>
              Structured ad spend allocation, controlled testing cycles,
              institutional reporting architecture.
            </p>
          </div>

          <div className="system-block">
            <h3>Conversion Architecture</h3>
            <p>
              Funnel diagnostics, CRO experimentation frameworks,
              systematic growth modeling.
            </p>
          </div>

          <div className="system-block">
            <h3>Attribution Intelligence</h3>
            <p>
              Data-backed attribution systems calibrated for measurable
              profitability — not vanity metrics.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}