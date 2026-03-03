import CountUp from "./CountUp";
import Reveal from "./Reveal";

const metrics = [
  { end: 7, suffix: "", label: "Integrated service lines under one partner" },
  { end: 24, suffix: "h", label: "Response SLA for new client inquiries" },
  { end: 90, suffix: "d", label: "Execution roadmap for early growth traction" },
  { end: 100, suffix: "%", label: "Transparent reporting with measurable KPIs" },
];

function TrustMetricsBar() {
  return (
    <section className="section section-border trust-bar">
      <div className="container">
        <div className="card-grid card-grid-four">
          {metrics.map((item, index) => (
            <Reveal key={item.label} delayMs={50 * (index + 1)}>
              <article className="panel trust-card interactive-card">
                <h3>
                  <CountUp
                    end={item.end}
                    suffix={item.suffix}
                    durationMs={1200 + index * 180}
                  />
                </h3>
                <p>{item.label}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustMetricsBar;
