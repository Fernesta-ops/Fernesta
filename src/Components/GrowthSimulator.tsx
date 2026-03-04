import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function formatINRShort(value: number) {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
  return `₹${Math.round(value)}`;
}

type TooltipPayload = {
  name: string;
  value: number;
  color: string;
};

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="simulator-tooltip">
      <p className="simulator-tooltip-label">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }}>
          {entry.name}: {formatINRShort(entry.value)}
        </p>
      ))}
    </div>
  );
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

  const chartData = useMemo(() => {
    const baseRevenue = projection.revenue * 0.52;
    const growthRate = Math.min(0.18, Math.max(0.04, (projection.roas - 1) * 0.06));

    return Array.from({ length: 12 }, (_, i) => ({
      month: `M${i + 1}`,
      Baseline: Math.round(baseRevenue * (1 + i * 0.01)),
      "With Fernesta": Math.round(projection.revenue * Math.pow(1 + growthRate, i)),
    }));
  }, [projection.revenue, projection.roas]);

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
                <motion.h3
                  key={Math.round(projection.leads)}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  {Math.round(projection.leads)}
                </motion.h3>
                <p>Qualified Leads</p>
              </div>
              <div>
                <motion.h3
                  key={Math.round(projection.customers)}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  {Math.round(projection.customers)}
                </motion.h3>
                <p>Estimated Customers</p>
              </div>
              <div>
                <motion.h3
                  key={Math.round(projection.revenue)}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  Rs. {formatINR(projection.revenue)}
                </motion.h3>
                <p>Potential Revenue</p>
              </div>
              <div>
                <motion.h3
                  key={projection.roas.toFixed(1)}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  {projection.roas.toFixed(1)}x
                </motion.h3>
                <p>Projected ROAS</p>
              </div>
            </div>

            <div className="efficiency-wrap" aria-label="Growth efficiency meter">
              <motion.span
                animate={{ width: `${projection.efficiency}%` }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            <div className="simulator-chart">
              <p className="simulator-chart-label">12-Month Revenue Trajectory</p>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={chartData} margin={{ top: 8, right: 4, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gradFernesta" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2d4430" stopOpacity={0.22} />
                      <stop offset="95%" stopColor="#2d4430" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradBaseline" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a3a58b" stopOpacity={0.18} />
                      <stop offset="95%" stopColor="#a3a58b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#d3d5cb" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 11, fill: "#6c6c6c" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tickFormatter={formatINRShort}
                    tick={{ fontSize: 11, fill: "#6c6c6c" }}
                    axisLine={false}
                    tickLine={false}
                    width={52}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="Baseline"
                    stroke="#a3a58b"
                    strokeWidth={1.5}
                    fill="url(#gradBaseline)"
                    dot={false}
                    isAnimationActive
                    animationDuration={600}
                    animationEasing="ease-out"
                  />
                  <Area
                    type="monotone"
                    dataKey="With Fernesta"
                    stroke="#2d4430"
                    strokeWidth={2}
                    fill="url(#gradFernesta)"
                    dot={false}
                    isAnimationActive
                    animationDuration={700}
                    animationEasing="ease-out"
                  />
                </AreaChart>
              </ResponsiveContainer>
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
