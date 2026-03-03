export default function Home() {
  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url("/images/dark data dashboard background.jpg")`,
      }}
    >
      <div className="hero-dark-overlay"></div>

      <div className="hero-container">
        <div className="hero-text">
          <h1>
            Structured Marketing Systems
            <br />
            for Scalable Growth
          </h1>

          <p>
            AI-first. Strategy-led. Framework-driven marketing
            infrastructure built for Indian SMEs and D2C brands
            seeking measurable outcomes.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">
              Request Assessment
            </button>

            <button className="secondary-btn">
              View Framework
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="image-frame">
            <img
              src="/images/ai.jpg"
              alt="AI Marketing Interface"
            />
          </div>
        </div>
      </div>
    </section>
  );
}