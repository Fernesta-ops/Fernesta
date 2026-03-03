import Reveal from "./Reveal";

const logos = [
  "D2C Retail",
  "HealthTech",
  "Education",
  "SaaS",
  "FMCG",
  "Hospitality",
  "B2B Services",
  "Consumer Tech",
];

function SocialProofStrip() {
  return (
    <section className="section section-border social-proof">
      <div className="container">
        <Reveal className="section-head">
          <p className="meta">Trusted Across Categories</p>
          <h2>Teams Similar to Yours Already Use Structured Growth Systems</h2>
        </Reveal>
      </div>
      <div className="marquee" aria-label="Industries we serve">
        <div className="marquee-track">
          {[...logos, ...logos].map((logo, index) => (
            <span key={`${logo}-${index}`} className="marquee-item">
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SocialProofStrip;
