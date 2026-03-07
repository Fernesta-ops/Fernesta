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
  category: "SEO" | "Performance" | "Brand" | "Social" | "Operations" | "PR";
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
      "Introduced dashboard-led budget reviews so scale decisions were based on marginal efficiency instead of headline ROAS alone.",
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
      "Leadership could not see which campaigns were truly creating profitable first-purchase volume.",
    ],
    after: [
      "Blended ROAS improved from 1.1x to 3.2x while monthly spend scaled with guardrails.",
      "Cost per first purchase dropped by 38% through audience hygiene and placement controls.",
      "Checkout conversion rate improved from 1.6% to 2.9% after message-to-page alignment.",
      "Weekly decision reviews linked creative, landing, and spend changes to margin-aware growth outcomes.",
    ],
    businessImpact: [
      "Performance budgets moved from reactive spend to governed growth investment.",
      "Acquisition profitability improved while preserving room for controlled scaling.",
      "Leadership gained weekly decision visibility across channel, creative, and landing performance.",
      "The account moved from campaign firefighting to a controlled scale system with clearer unit economics.",
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
      "Refined page layouts and proof sections so ranking gains translated into stronger enquiry conversion quality.",
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
      "Organic reporting focused on sessions, not whether rankings were contributing to qualified enquiries.",
    ],
    after: [
      "31 high-intent keywords moved into top-10 positions across target programs.",
      "Qualified organic enquiries increased by 187% over the engagement period.",
      "Organic channel became a reliable lead source with lower paid dependency.",
      "SEO reporting connected ranking movement to page-level enquiry contribution and admission funnel health.",
    ],
    businessImpact: [
      "Admission pipeline became less volatile due to stronger inbound demand from search.",
      "Cost of acquiring qualified enquiries improved through reduced paid-channel pressure.",
      "Academic and marketing teams gained a shared search-intent framework for future campaigns.",
      "The business gained a repeatable SEO system instead of one-off optimization bursts.",
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
      "Introduced workflow automation for retention reporting so repeat-purchase performance stayed visible every week.",
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
      "Workflow Automation and Reporting Systems",
      "Graphic Designing for Marketing",
    ],
    before: [
      "Visual identity and voice varied across social, ads, and email touchpoints.",
      "Post-purchase communication was generic and did not reflect lifecycle timing.",
      "Campaigns were acquisition-heavy with no strong repeat-purchase mechanism.",
      "Retention reporting was too manual to support fast iteration across journeys.",
    ],
    after: [
      "Unified brand narrative and design system across all customer-facing channels.",
      "Lifecycle flows were deployed for onboarding, replenishment, and win-back windows.",
      "Returning customer rate increased by 42%, improving retention-led revenue share.",
      "Retention decisions became easier because journey performance and drop-offs were visible in one reporting rhythm.",
    ],
    businessImpact: [
      "Revenue mix shifted toward repeat customers, improving predictability month over month.",
      "Customer lifetime value trajectory strengthened as lifecycle engagement depth improved.",
      "Brand consistency reduced friction between acquisition campaigns and post-purchase experience.",
      "Leadership gained better visibility into how lifecycle automation affected repeat revenue performance.",
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
      "Added workflow automation for lead routing and follow-up visibility so qualified enquiries reached sales faster.",
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
      "Workflow Automation and Reporting Systems",
      "Website Design and Website Development",
    ],
    before: [
      "Marketing and sales used different definitions of lead quality and readiness.",
      "Attribution gaps made budget shifts reactive and channel comparisons unreliable.",
      "Landing experiences were generic and did not pre-qualify enterprise-fit leads.",
      "Lead handoff delays created avoidable leakage between form fill and first sales contact.",
    ],
    after: [
      "Shared MQL criteria and lead scoring were integrated into weekly reporting.",
      "Budget was reallocated to campaigns mapped to attributable pipeline value.",
      "Blended qualified CPL reduced by 61% while meeting-booking rates improved.",
      "Lead routing and follow-up visibility improved the speed and consistency of sales response.",
    ],
    businessImpact: [
      "Sales confidence in marketing-sourced leads increased due to stronger qualification discipline.",
      "Budget efficiency improved by shifting spend toward campaigns with measurable pipeline contribution.",
      "Leadership gained clearer forecasting inputs from a cleaner lead-to-meeting funnel.",
      "The commercial team gained one operating view across demand generation, lead qualification, and first-response execution.",
    ],
    download: "/downloads/b2b-services-cpl-optimization.pdf",
  },
  {
    slug: "boutique-hospitality-social-pr-launch",
    client: "Boutique Hospitality Group",
    category: "PR",
    metric: "3.6x",
    result: "Increase in qualified event enquiries",
    detail:
      "Fernesta rebuilt the group's launch communications around a tighter social content calendar, creator seeding plan, landing page refinements, and PR outreach sequence so awareness translated into measurable enquiry growth.",
    objective:
      "Increase event and staycation enquiries by coordinating social media, influencer activity, PR timing, and conversion-ready landing experiences under one launch playbook.",
    approach: [
      "Built a weekly social content and distribution calendar tied to launch milestones, offer windows, and enquiry targets.",
      "Created creator shortlists, briefing templates, and posting windows so influencer output landed around booking-intent peaks.",
      "Reworked landing page sections, proof blocks, and response flows so campaign traffic encountered clearer conversion pathways.",
      "Introduced performance reporting that separated vanity reach from creator-assisted enquiries and assisted booking signals.",
    ],
    timeline: "16 weeks",
    executionTimeline: [
      {
        phase: "Phase 1: Narrative and Offer Structuring",
        window: "Weeks 1-3",
        focus: "Offer framing, message hierarchy, content pillars, and creator brief design.",
      },
      {
        phase: "Phase 2: Social and Creator Rollout",
        window: "Weeks 4-8",
        focus: "Content deployment, creator posts, PR outreach, and landing page response alignment.",
      },
      {
        phase: "Phase 3: Signal Optimization",
        window: "Weeks 9-12",
        focus: "Audience response review, content iteration, and enquiry source-quality filtering.",
      },
      {
        phase: "Phase 4: Scale and Reputation Reinforcement",
        window: "Weeks 13-16",
        focus: "High-performing format expansion, creator relationship retention, and press-proof amplification.",
      },
    ],
    chart: {
      title: "Launch Visibility Snapshot",
      points: [
        { label: "Qualified Event Enquiries", before: 100, after: 360, suffix: " index" },
        { label: "Social Engagement Rate", before: 2.1, after: 5.4, suffix: "%" },
        { label: "Influencer-Assisted Visits", before: 100, after: 248, suffix: " index" },
      ],
    },
    services: [
      "Social Media Management Services",
      "PR and Influencer Management",
      "Graphic Designing for Marketing",
      "Website Design and Website Development",
    ],
    before: [
      "Social posting was inconsistent and not sequenced against offer windows or launch milestones.",
      "Creator partnerships were ad hoc, with limited briefing rigor and unclear expectations on output.",
      "Press mentions and influencer activity were not tied back to enquiry generation or landing performance.",
      "Landing pages did not convert launch traffic efficiently because proof and next-step structure were too weak.",
    ],
    after: [
      "The launch calendar aligned social, PR, and influencer activity to commercially important booking moments.",
      "Creator posts were briefed and timed against clear enquiry goals instead of generic visibility output.",
      "Landing page refinements improved traffic-to-enquiry conversion across launch periods.",
      "Qualified event enquiries grew 3.6x while brand visibility became easier to attribute and govern.",
    ],
    businessImpact: [
      "The business gained a reusable launch playbook spanning content, creators, PR, and conversion surfaces.",
      "Management could see which awareness efforts were assisting qualified booking demand instead of only reach.",
      "Social and PR work shifted from isolated tactics to a governed commercial communications system.",
      "The team retained a stronger creator and PR operating base for future seasonal campaigns.",
    ],
    download: "/downloads/boutique-hospitality-social-pr-launch.pdf",
  },
  {
    slug: "distribution-workflow-automation-reset",
    client: "B2B Distribution Network",
    category: "Operations",
    metric: "72%",
    result: "Faster lead-to-quote turnaround",
    detail:
      "Fernesta redesigned the network's lead intake, approval routing, reporting dashboards, and sales handoff rules so inbound demand no longer stalled inside manual spreadsheet chasing and fragmented follow-up.",
    objective:
      "Reduce operational leakage between lead capture and quotation by building one visible workflow system for intake, approvals, ownership, and weekly reporting.",
    approach: [
      "Mapped the full lead-to-quote workflow to identify approval bottlenecks, duplicated data entry, and missing ownership points.",
      "Built standardized intake structure, routing logic, and status dashboards so each enquiry had a visible next action.",
      "Connected landing forms, tracker updates, and follow-up triggers to reduce manual handoffs across marketing and sales.",
      "Introduced weekly governance reviews using workflow data instead of anecdotal status updates.",
    ],
    timeline: "12 weeks",
    executionTimeline: [
      {
        phase: "Phase 1: Workflow Mapping",
        window: "Weeks 1-2",
        focus: "Current-state mapping, bottleneck discovery, and ownership gap identification.",
      },
      {
        phase: "Phase 2: System Buildout",
        window: "Weeks 3-6",
        focus: "Intake standardization, status logic, approval routing, and dashboard implementation.",
      },
      {
        phase: "Phase 3: Team Adoption",
        window: "Weeks 7-9",
        focus: "Usage training, exception handling, and accountability cadence rollout.",
      },
      {
        phase: "Phase 4: Optimization",
        window: "Weeks 10-12",
        focus: "Workflow tuning, response-time governance, and reporting refinement.",
      },
    ],
    chart: {
      title: "Workflow Control Snapshot",
      points: [
        { label: "Lead-to-Quote Speed", before: 100, after: 172, suffix: " index" },
        { label: "On-Time Follow-Up", before: 58, after: 91, suffix: "%" },
        { label: "Status Visibility", before: 100, after: 214, suffix: " index" },
      ],
    },
    services: [
      "Workflow Automation and Reporting Systems",
      "Website Design and Website Development",
      "Google Ads and Meta Ads Management",
    ],
    before: [
      "Lead capture and quoting depended on fragmented spreadsheets with inconsistent field quality.",
      "Approvals and task ownership lived in chat threads, creating delay and accountability gaps.",
      "Sales and marketing could not see where active enquiries were stuck without manual follow-up.",
      "Reporting focused on total leads rather than response discipline and operational throughput.",
    ],
    after: [
      "Inbound enquiries moved through one intake and routing structure with clearer ownership by stage.",
      "Approval status and next actions became visible through a shared reporting dashboard.",
      "Follow-up discipline improved because reminder logic and exception flags reduced manual chasing.",
      "Lead-to-quote turnaround improved by 72% while the handoff between teams became easier to govern.",
    ],
    businessImpact: [
      "Commercial response became faster without increasing management overhead.",
      "Leadership gained a clearer operating view of lead volume, delay points, and conversion friction.",
      "Workflow automation reduced avoidable leakage between marketing demand and quoted opportunities.",
      "The business retained a reusable operating model for future campaign scale and multi-owner coordination.",
    ],
    download: "/downloads/distribution-workflow-automation-reset.pdf",
  },
];
