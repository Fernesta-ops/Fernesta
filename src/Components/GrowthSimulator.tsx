import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";

function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function GrowthSimulator() {
  const [budget, setBudget] = useState(120000);
  const [leadRate, setLeadRate] = useState(3.2);
  const [closeRate, setCloseRate] = useState(12);
  const [avgOrderValue, setAvgOrderValue] = useState(18000);

  const projection = useMemo(() => {
    const monthlyVisitors = budget / 35;
    const leads = monthlyVisitors * (leadRate / 100);
    const customers = leads * (closeRate / 100);
    const revenue = customers * avgOrderValue;
    const roas = budget > 0 ? revenue / budget : 0;
    const efficiency = Math.min(100, Math.max(10, roas * 18));

    return { leads, customers, revenue, roas, efficiency };
  }, [avgOrderValue, budget, closeRate, leadRate]);

  return (
    <section className="section section-border">
      <div className="container">
        <Reveal className="section-head">
          <p className="meta">Growth Opportunity Simulator</p>
          <h2>See Your Possible Monthly Outcome Before You Commit Budget</h2>
          <p>
            Adjust these inputs to estimate how structured SEO and paid media systems can shift your monthly lead and revenue potential.
          </p>
        </Reveal>

        <div className="simulator-grid">
          <article className="panel interactive-card simulator-controls">
            <label>
              Monthly Marketing Budget (Rs.)
              <input
                type="range"
                min={30000}
                max={500000}
                step={10000}
                value={budget}
                onChange={(event) => setBudget(Number(event.target.value))}
              />
              <strong>Rs. {formatINR(budget)}</strong>
            </label>

            <label>
              Lead Conversion Rate (%)
              <input
                type="range"
                min={1}
                max={8}
                step={0.1}
                value={leadRate}
                onChange={(event) => setLeadRate(Number(event.target.value))}
              />
              <strong>{leadRate.toFixed(1)}%</strong>
            </label>

            <label>
              Lead-to-Customer Rate (%)
              <input
                type="range"
                min={5}
                max={30}
                step={1}
                value={closeRate}
                onChange={(event) => setCloseRate(Number(event.target.value))}
              />
              <strong>{closeRate}%</strong>
            </label>

            <label>
              Average Order Value (Rs.)
              <input
                type="range"
                min={5000}
                max={80000}
                step={1000}
                value={avgOrderValue}
                onChange={(event) => setAvgOrderValue(Number(event.target.value))}
              />
              <strong>Rs. {formatINR(avgOrderValue)}</strong>
            </label>
          </article>

          <article className="panel interactive-card simulator-results">
            <p className="meta">Projected Monthly Outcome</p>
            <div className="simulator-stat-grid">
              <div>
                <h3>{Math.round(projection.leads)}</h3>
                <p>Qualified Leads</p>
              </div>
              <div>
                <h3>{Math.round(projection.customers)}</h3>
                <p>Estimated Customers</p>
              </div>
              <div>
                <h3>Rs. {formatINR(projection.revenue)}</h3>
                <p>Potential Revenue</p>
              </div>
              <div>
                <h3>{projection.roas.toFixed(1)}x</h3>
                <p>Projected ROAS</p>
              </div>
            </div>

            <div className="efficiency-wrap" aria-label="Growth efficiency meter">
              <span style={{ width: `${projection.efficiency}%` }} />
            </div>

            <div className="button-row">
              <Link className="button button-primary" to="/contact-us">
                Get a Custom Plan
              </Link>
              <button
                type="button"
                className="button button-secondary"
                onClick={() => window.dispatchEvent(new CustomEvent("open-audit"))}
              >
                Request Free Audit
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default GrowthSimulator;

