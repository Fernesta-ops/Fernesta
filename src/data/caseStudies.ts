export type CaseStudy = {
  slug: string;
  client: string;
  category: "SEO" | "Performance" | "Brand";
  metric: string;
  result: string;
  detail: string;
  timeline: string;
  services: string[];
  before: string[];
  after: string[];
  download: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "d2c-skincare-performance-turnaround",
    client: "D2C Skincare Brand",
    category: "Performance",
    metric: "3.2x",
    result: "ROAS in 120 days",
    detail:
      "Rebuilt ad structure, creative testing cadence, and landing page intent mapping.",
    timeline: "120 days",
    services: ["Paid Media", "Landing Page Strategy", "Analytics"],
    before: [
      "High ad spend leakage across overlapping audiences",
      "Inconsistent offer-message match on landing pages",
      "No weekly performance governance reviews",
    ],
    after: [
      "Channel budget allocation tied to conversion quality",
      "Creative testing framework with weekly decision cycles",
      "Clear ROAS reporting and scale thresholds by campaign set",
    ],
    download: "/downloads/d2c-skincare-performance-turnaround.pdf",
  },
  {
    slug: "education-seo-lead-engine",
    client: "Regional Education Business",
    category: "SEO",
    metric: "187%",
    result: "Growth in qualified organic leads",
    detail:
      "Implemented technical SEO baseline and content-to-conversion page clusters.",
    timeline: "6 months",
    services: ["Technical SEO", "Content Strategy", "Conversion Architecture"],
    before: [
      "Poor search visibility for intent-heavy keywords",
      "No content mapping to admissions funnel stages",
      "Lead pages lacked conversion structure and trust cues",
    ],
    after: [
      "High-intent keyword clusters ranked on page 1",
      "Editorial pipeline tied to funnel intent and conversion pages",
      "Sustained qualified lead growth via organic channel",
    ],
    download: "/downloads/education-seo-lead-engine.pdf",
  },
  {
    slug: "consumer-retail-brand-retention",
    client: "Consumer Retail SME",
    category: "Brand",
    metric: "42%",
    result: "Increase in returning customer rate",
    detail:
      "Positioning refresh plus CRM lifecycle communication across key customer segments.",
    timeline: "5 months",
    services: ["Brand Positioning", "Email and CRM", "Content"],
    before: [
      "Inconsistent brand voice across channels",
      "Weak post-purchase engagement and retention loops",
      "Campaign messaging optimized for one-time conversion only",
    ],
    after: [
      "Unified messaging framework across paid, organic, and CRM",
      "Lifecycle campaigns for repeat purchase windows",
      "Retention uplift and stronger customer LTV trajectory",
    ],
    download: "/downloads/consumer-retail-brand-retention.pdf",
  },
  {
    slug: "b2b-services-cpl-optimization",
    client: "B2B Services Company",
    category: "Performance",
    metric: "61%",
    result: "Lower blended cost per qualified lead",
    detail:
      "Shifted channel mix and rebuilt tracking to isolate profitable campaigns.",
    timeline: "14 weeks",
    services: ["Performance Marketing", "Attribution Setup", "Reporting Governance"],
    before: [
      "Lead quality mismatch across paid channels",
      "Attribution noise made budget decisions reactive",
      "No shared definition for qualified lead metrics",
    ],
    after: [
      "Qualified lead score integrated into campaign reporting",
      "Budget reallocation guided by attributable pipeline value",
      "CPL reduced while improving conversion-to-meeting rate",
    ],
    download: "/downloads/b2b-services-cpl-optimization.pdf",
  },
];
