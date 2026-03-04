export type CaseTimelineStep = {
  phase: string;
  window: string;
  focus: string;
};

export type CaseChartPoint = {
  label: string;
  before: number;
  after: number;
  suffix: string;
};

export type CaseChart = {
  title: string;
  points: CaseChartPoint[];
};

export type CaseStudy = {
  slug: string;
  client: string;
  category: "SEO" | "Performance" | "Brand";
  metric: string;
  result: string;
  detail: string;
  objective: string;
  approach: string[];
  timeline: string;
  executionTimeline: CaseTimelineStep[];
  chart: CaseChart;
  services: string[];
  before: string[];
  after: string[];
  businessImpact: string[];
  download: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "d2c-skincare-performance-turnaround",
    client: "D2C Skincare Brand",
    category: "Performance",
    metric: "3.2x",
    result: "Blended ROAS in 120 days",
    detail:
      "Started with a full-funnel audit of Google Ads and Meta Ads, then rebuilt campaign structure by intent stage, tightened tracking, and aligned landing pages with product objections, trust cues, and offer clarity.",
    objective:
      "Increase profitable new-customer acquisition without forcing unsustainable ad spend, and establish a repeatable performance system that can scale predictably.",
    approach: [
      "Rebuilt Google Ads and Meta Ads account architecture by funnel stage and audience role.",
      "Implemented weekly creative testing loops with clear pass/fail thresholds for scale decisions.",
      "Mapped ad promise to landing page sections so every click encounters offer relevance and trust proof.",
    ],
    timeline: "120 days",
    executionTimeline: [
      {
        phase: "Phase 1: Diagnostic Baseline",
        window: "Weeks 1-2",
        focus: "Full-funnel audit, pixel and event validation, leakage analysis by campaign and audience.",
      },
      {
        phase: "Phase 2: System Rebuild",
        window: "Weeks 3-6",
        focus: "Campaign and audience restructuring, creative test matrix, landing page alignment updates.",
      },
      {
        phase: "Phase 3: Scale Governance",
        window: "Weeks 7-17",
        focus: "Budget reallocation by marginal efficiency, weekly decision cadence, and expansion controls.",
      },
    ],
    chart: {
      title: "Performance Lift Snapshot",
      points: [
        { label: "ROAS", before: 1.1, after: 3.2, suffix: "x" },
        { label: "New Customer CPA", before: 100, after: 62, suffix: " index" },
        { label: "Checkout CVR", before: 1.6, after: 2.9, suffix: "%" },
      ],
    },
    services: [
      "Google Ads and Meta Ads Management",
      "E-Commerce Advertising and ROAS Optimization",
      "Website Design and Website Development",
    ],
    before: [
      "Prospecting and retargeting audiences heavily overlapped, inflating CPM and frequency.",
      "Creative decisions were based on preference instead of a structured testing cadence.",
      "Landing pages did not match ad intent, creating drop-off between click and checkout.",
    ],
    after: [
      "Blended ROAS improved from 1.1x to 3.2x while monthly spend scaled with guardrails.",
      "Cost per first purchase dropped by 38% through audience hygiene and placement controls.",
      "Checkout conversion rate improved from 1.6% to 2.9% after message-to-page alignment.",
    ],
    businessImpact: [
      "Performance budgets moved from reactive spend to governed growth investment.",
      "Acquisition profitability improved while preserving room for controlled scaling.",
      "Leadership gained weekly decision visibility across channel, creative, and landing performance.",
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
      "Established a technical SEO baseline, rebuilt site architecture around search intent clusters, and connected content pages to conversion-ready admission pathways with clear proof and CTA hierarchy.",
    objective:
      "Turn organic search into a predictable lead channel for program admissions, reducing overdependence on paid enquiries.",
    approach: [
      "Resolved technical SEO blockers across indexing, internal links, metadata consistency, and schema coverage.",
      "Built keyword clusters by admission intent and mapped each cluster to dedicated conversion paths.",
      "Connected editorial planning to funnel stages so content discovery flows into enquiry-ready pages.",
    ],
    timeline: "6 months",
    executionTimeline: [
      {
        phase: "Phase 1: Technical Foundation",
        window: "Month 1",
        focus: "Crawl cleanup, information architecture adjustments, indexation and metadata baseline.",
      },
      {
        phase: "Phase 2: Intent Cluster Buildout",
        window: "Months 2-4",
        focus: "Program-specific keyword clusters, page optimization, and structured internal linking.",
      },
      {
        phase: "Phase 3: Conversion Integration",
        window: "Months 5-6",
        focus: "Trust-led content updates, form flow optimization, and ranking-to-lead performance tracking.",
      },
    ],
    chart: {
      title: "Organic Growth Snapshot",
      points: [
        { label: "Qualified Organic Leads", before: 100, after: 287, suffix: " index" },
        { label: "Top-10 Rankings", before: 9, after: 31, suffix: " keywords" },
        { label: "Paid Dependency", before: 100, after: 68, suffix: " index" },
      ],
    },
    services: [
      "Search Engine Optimization Services",
      "Website Design and Website Development",
      "Graphic Designing for Marketing",
    ],
    before: [
      "Core pages were not optimized for intent-heavy admission and program queries.",
      "Content production was ad hoc, without cluster ownership or funnel mapping.",
      "Lead pages lacked schema, trust elements, and a clear enquiry progression.",
    ],
    after: [
      "31 high-intent keywords moved into top-10 positions across target programs.",
      "Qualified organic enquiries increased by 187% over the engagement period.",
      "Organic channel became a reliable lead source with lower paid dependency.",
    ],
    businessImpact: [
      "Admission pipeline became less volatile due to stronger inbound demand from search.",
      "Cost of acquiring qualified enquiries improved through reduced paid-channel pressure.",
      "Academic and marketing teams gained a shared search-intent framework for future campaigns.",
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
      "Repositioned the brand for consistency across storefront, social, and campaigns, then implemented lifecycle CRM communication by customer stage to improve repeat purchase behavior.",
    objective:
      "Improve retention-led growth by fixing fragmented brand communication and building lifecycle pathways for repeat purchase.",
    approach: [
      "Defined a unified brand voice and visual system across social, campaign, and CRM touchpoints.",
      "Segmented customers by behavior stage and built lifecycle journeys for onboarding, replenishment, and win-back.",
      "Aligned campaign content with customer lifetime value goals instead of one-time conversion spikes.",
    ],
    timeline: "5 months",
    executionTimeline: [
      {
        phase: "Phase 1: Brand Alignment",
        window: "Weeks 1-4",
        focus: "Positioning reset, creative direction, and consistency standards across channels.",
      },
      {
        phase: "Phase 2: Lifecycle Architecture",
        window: "Weeks 5-10",
        focus: "Audience segmentation, message sequencing, and retention automation setup.",
      },
      {
        phase: "Phase 3: Retention Optimization",
        window: "Weeks 11-20",
        focus: "Journey performance monitoring, message refinement, and repeat-purchase uplift testing.",
      },
    ],
    chart: {
      title: "Retention Uplift Snapshot",
      points: [
        { label: "Returning Customer Rate", before: 100, after: 142, suffix: " index" },
        { label: "Repeat Revenue Share", before: 100, after: 133, suffix: " index" },
        { label: "Lifecycle Campaign Revenue", before: 100, after: 161, suffix: " index" },
      ],
    },
    services: [
      "Branding and Business Profiling",
      "Social Media Management Services",
      "Graphic Designing for Marketing",
    ],
    before: [
      "Visual identity and voice varied across social, ads, and email touchpoints.",
      "Post-purchase communication was generic and did not reflect lifecycle timing.",
      "Campaigns were acquisition-heavy with no strong repeat-purchase mechanism.",
    ],
    after: [
      "Unified brand narrative and design system across all customer-facing channels.",
      "Lifecycle flows were deployed for onboarding, replenishment, and win-back windows.",
      "Returning customer rate increased by 42%, improving retention-led revenue share.",
    ],
    businessImpact: [
      "Revenue mix shifted toward repeat customers, improving predictability month over month.",
      "Customer lifetime value trajectory strengthened as lifecycle engagement depth improved.",
      "Brand consistency reduced friction between acquisition campaigns and post-purchase experience.",
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
      "Redefined lead qualification with the sales team, rebuilt attribution and reporting, and restructured channel mix toward high-intent campaigns with stronger lead-to-meeting outcomes.",
    objective:
      "Reduce qualified lead cost while increasing sales-ready pipeline quality through aligned marketing and sales decision systems.",
    approach: [
      "Established a shared MQL definition with sales and reflected it in campaign optimization rules.",
      "Rebuilt tracking and reporting to separate channel vanity metrics from pipeline-contributing outcomes.",
      "Shifted media investment toward high-intent keywords, remarketing, and pre-qualification landing journeys.",
    ],
    timeline: "14 weeks",
    executionTimeline: [
      {
        phase: "Phase 1: Qualification Alignment",
        window: "Weeks 1-2",
        focus: "MQL criteria definition, CRM handoff logic, and baseline funnel diagnostics.",
      },
      {
        phase: "Phase 2: Attribution and Channel Rebuild",
        window: "Weeks 3-7",
        focus: "Tracking corrections, campaign restructuring, and landing page pre-qualification updates.",
      },
      {
        phase: "Phase 3: Pipeline-Led Optimization",
        window: "Weeks 8-14",
        focus: "Weekly budget governance based on attributable pipeline and meeting conversion rates.",
      },
    ],
    chart: {
      title: "Pipeline Efficiency Snapshot",
      points: [
        { label: "Qualified CPL", before: 100, after: 39, suffix: " index" },
        { label: "Lead-to-Meeting Rate", before: 100, after: 138, suffix: " index" },
        { label: "Attributed Pipeline", before: 100, after: 149, suffix: " index" },
      ],
    },
    services: [
      "Google Ads and Meta Ads Management",
      "Search Engine Optimization Services",
      "Website Design and Website Development",
    ],
    before: [
      "Marketing and sales used different definitions of lead quality and readiness.",
      "Attribution gaps made budget shifts reactive and channel comparisons unreliable.",
      "Landing experiences were generic and did not pre-qualify enterprise-fit leads.",
    ],
    after: [
      "Shared MQL criteria and lead scoring were integrated into weekly reporting.",
      "Budget was reallocated to campaigns mapped to attributable pipeline value.",
      "Blended qualified CPL reduced by 61% while meeting-booking rates improved.",
    ],
    businessImpact: [
      "Sales confidence in marketing-sourced leads increased due to stronger qualification discipline.",
      "Budget efficiency improved by shifting spend toward campaigns with measurable pipeline contribution.",
      "Leadership gained clearer forecasting inputs from a cleaner lead-to-meeting funnel.",
    ],
    download: "/downloads/b2b-services-cpl-optimization.pdf",
  },
];
