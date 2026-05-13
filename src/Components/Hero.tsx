import { Button } from "./ui/button";

function Hero() {
  return (
    <section id="top" className="hero section">
      <div className="hero-backdrop" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="meta">Performance Marketing and Creative Growth Systems</p>
          <h1>
            Performance Marketing Infrastructure
            <br />
            Designed for Structured Growth.
          </h1>
          <p>
            Fernesta builds accountable acquisition infrastructure for Indian
            SMEs and D2C brands scaling beyond Rs. 3Cr revenue, integrating
            paid media control, performance creative, conversion architecture,
            and attribution discipline into one operating model.
          </p>
          <div className="button-row">
            <Button asChild variant="primary">
              <a href="#cta">Request Strategic Assessment</a>
            </Button>
            <Button asChild variant="secondary">
              <a href="#systems">View Framework</a>
            </Button>
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
