function Hero() {
  return (
    <section id="top" className="hero section">
      <div className="hero-backdrop" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="meta">AI-First Marketing Infrastructure Firm</p>
          <h1>
            AI-First Marketing Infrastructure
            <br />
            Designed for Structured Growth.
          </h1>
          <p>
            Fernesta builds governance-led acquisition infrastructure for
            Indian SMEs and D2C brands scaling beyond Rs. 3Cr revenue,
            integrating paid media control, conversion architecture, and
            attribution discipline into one accountable operating model.
          </p>
          <div className="button-row">
            <a href="#cta" className="button button-primary">
              Request Strategic Assessment
            </a>
            <a href="#systems" className="button button-secondary">
              View Framework
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="dashboard-frame">
            <p className="meta">Performance Dashboard</p>
            <img
              src="/images/components/hero/performance-dashboard.jpg"
              alt="Structured growth performance dashboard"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
