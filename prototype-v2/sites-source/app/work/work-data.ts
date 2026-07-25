import type { ServiceSlug } from "../services/service-data";

export type WorkSlug =
  | "d2c-skincare-performance-turnaround"
  | "consumer-retail-brand-retention"
  | "boutique-hospitality-social-pr-launch"
  | "distribution-workflow-automation-reset";

type TimelineStage = {
  phase: string;
  window: string;
  focus: string;
};

type EvidencePoint = {
  label: string;
  before: string;
  after: string;
};

export type WorkStudy = {
  number: string;
  slug: WorkSlug;
  context: string;
  category: string;
  auditChallenge: string;
  metric: string;
  result: string;
  timeline: string;
  headline: string;
  metaTitle: string;
  metaDescription: string;
  detail: string;
  objective: string;
  approach: readonly string[];
  stages: readonly TimelineStage[];
  evidence: readonly EvidencePoint[];
  before: readonly string[];
  after: readonly string[];
  impact: readonly string[];
  services: readonly ServiceSlug[];
};

export const workStudies: Record<WorkSlug, WorkStudy> = {
  "d2c-skincare-performance-turnaround": {
    number: "01",
    slug: "d2c-skincare-performance-turnaround",
    context: "D2C skincare brand",
    category: "Performance and conversion",
    auditChallenge: "Conversion and growth",
    metric: "3.2x",
    result: "Blended ROAS in 120 days",
    timeline: "120 days",
    headline: "From campaign firefighting to governed growth.",
    metaTitle: "D2C Performance Marketing Case Study: 3.2x ROAS | Fernesta",
    metaDescription:
      "An anonymized Fernesta case study showing how campaign structure, creative testing, landing-page alignment, and decision governance improved blended ROAS from 1.1x to 3.2x in 120 days.",
    detail:
      "The engagement began with a full-funnel review of Google Ads, Meta Ads, tracking, creative decisions, and the landing experience. Campaigns were then rebuilt by intent stage, creative testing gained explicit thresholds, and spend decisions moved into a weekly, margin-aware review cadence.",
    objective:
      "Increase profitable new-customer acquisition without forcing unsustainable ad spend, while establishing a repeatable performance system that could scale with clearer control.",
    approach: [
      "Rebuilt Google Ads and Meta Ads account architecture by funnel stage and audience role.",
      "Introduced weekly creative testing loops with explicit pass, refine, and stop thresholds.",
      "Mapped each advertising promise to the relevant landing-page objection, trust cue, and offer explanation.",
      "Moved budget reviews from headline ROAS to marginal efficiency, first-purchase cost, and conversion evidence.",
    ],
    stages: [
      {
        phase: "Diagnostic baseline",
        window: "Weeks 1–2",
        focus:
          "Full-funnel audit, pixel and event validation, and leakage analysis by campaign and audience.",
      },
      {
        phase: "System rebuild",
        window: "Weeks 3–6",
        focus:
          "Campaign and audience restructuring, creative test matrix, and landing-page alignment.",
      },
      {
        phase: "Scale governance",
        window: "Weeks 7–17",
        focus:
          "Budget reallocation by marginal efficiency, weekly decisions, and controlled expansion.",
      },
    ],
    evidence: [
      { label: "Blended ROAS", before: "1.1x", after: "3.2x" },
      { label: "New-customer CPA", before: "100 index", after: "62 index" },
      { label: "Checkout conversion", before: "1.6%", after: "2.9%" },
    ],
    before: [
      "Prospecting and retargeting audiences heavily overlapped, inflating CPM and frequency.",
      "Creative decisions were based on preference rather than a structured testing cadence.",
      "Landing pages did not match advertising intent, creating drop-off between click and checkout.",
      "Leadership could not see which campaigns were creating profitable first-purchase volume.",
    ],
    after: [
      "Blended ROAS improved from 1.1x to 3.2x while monthly spend scaled with guardrails.",
      "Cost per first purchase dropped by 38% through audience hygiene and placement controls.",
      "Checkout conversion improved from 1.6% to 2.9% after message-to-page alignment.",
      "Weekly reviews connected creative, landing, and spend changes to margin-aware outcomes.",
    ],
    impact: [
      "Performance budgets moved from reactive spending to governed growth investment.",
      "Acquisition profitability improved while preserving room for controlled scaling.",
      "Leadership gained weekly visibility across channel, creative, and landing performance.",
      "The account moved from campaign firefighting to a clearer scale system.",
    ],
    services: ["growth-performance", "branding-creative"],
  },
  "consumer-retail-brand-retention": {
    number: "02",
    slug: "consumer-retail-brand-retention",
    context: "Consumer retail SME",
    category: "Brand and retention",
    auditChallenge: "Brand identity and story",
    metric: "42%",
    result: "Increase in returning-customer rate",
    timeline: "5 months",
    headline: "One brand system, carried beyond acquisition.",
    metaTitle: "Retail Brand & Retention Case Study: 42% Increase | Fernesta",
    metaDescription:
      "An anonymized Fernesta case study showing how brand consistency, lifecycle segmentation, CRM journeys, and reporting increased returning-customer rate by 42%.",
    detail:
      "The brand was repositioned for consistency across storefront, social, advertising, and CRM. Customers were segmented by behaviour stage, and onboarding, replenishment, and win-back communication were rebuilt to connect the acquisition promise with the post-purchase experience.",
    objective:
      "Improve retention-led growth by correcting fragmented brand communication and creating lifecycle pathways that made repeat purchase more deliberate and measurable.",
    approach: [
      "Defined a unified brand voice and visual system across social, campaigns, storefront, and CRM.",
      "Segmented customers by behaviour stage and built onboarding, replenishment, and win-back journeys.",
      "Aligned campaign content with customer-lifetime-value goals rather than one-time conversion spikes.",
      "Introduced automated retention reporting so repeat-purchase performance stayed visible each week.",
    ],
    stages: [
      {
        phase: "Brand alignment",
        window: "Weeks 1–4",
        focus:
          "Positioning reset, creative direction, and consistency standards across customer-facing channels.",
      },
      {
        phase: "Lifecycle architecture",
        window: "Weeks 5–10",
        focus:
          "Audience segmentation, message sequencing, and retention automation setup.",
      },
      {
        phase: "Retention optimisation",
        window: "Weeks 11–20",
        focus:
          "Journey monitoring, message refinement, and repeat-purchase uplift testing.",
      },
    ],
    evidence: [
      {
        label: "Returning-customer rate",
        before: "100 index",
        after: "142 index",
      },
      {
        label: "Repeat-revenue share",
        before: "100 index",
        after: "133 index",
      },
      {
        label: "Lifecycle campaign revenue",
        before: "100 index",
        after: "161 index",
      },
    ],
    before: [
      "Visual identity and voice varied across social, advertising, and email.",
      "Post-purchase communication was generic and did not reflect lifecycle timing.",
      "Campaigns were acquisition-heavy with no strong repeat-purchase mechanism.",
      "Retention reporting was too manual to support fast iteration across journeys.",
    ],
    after: [
      "One brand narrative and design system connected all customer-facing channels.",
      "Lifecycle flows were deployed for onboarding, replenishment, and win-back windows.",
      "Returning-customer rate increased by 42%, improving retention-led revenue share.",
      "Journey performance and drop-offs became visible within one reporting rhythm.",
    ],
    impact: [
      "Revenue mix shifted toward repeat customers, improving month-to-month predictability.",
      "Customer-lifetime-value trajectory strengthened as lifecycle engagement improved.",
      "Brand consistency reduced friction between acquisition and post-purchase experience.",
      "Leadership gained better visibility into how lifecycle automation affected repeat revenue.",
    ],
    services: ["branding-creative", "growth-performance"],
  },
  "boutique-hospitality-social-pr-launch": {
    number: "03",
    slug: "boutique-hospitality-social-pr-launch",
    context: "Boutique hospitality group",
    category: "Launch, social and influence",
    auditChallenge: "Content and social presence",
    metric: "3.6x",
    result: "Increase in qualified event enquiries",
    timeline: "16 weeks",
    headline: "Visibility sequenced around booking intent.",
    metaTitle: "Hospitality Launch Case Study: 3.6x Enquiries | Fernesta",
    metaDescription:
      "An anonymized Fernesta case study showing how coordinated social content, creator seeding, PR timing, landing-page refinement, and attribution increased qualified event enquiries 3.6x.",
    detail:
      "Launch communications were rebuilt around one social calendar, creator-seeding plan, PR sequence, landing-page response path, and reporting view. The work moved awareness activity closer to commercially important offer windows and made enquiry contribution easier to evaluate.",
    objective:
      "Increase event and staycation enquiries by coordinating social media, creator activity, PR timing, and conversion-ready landing experiences under one launch playbook.",
    approach: [
      "Built a weekly social and distribution calendar tied to launch milestones, offer windows, and enquiry goals.",
      "Created creator shortlists, briefing templates, and posting windows around booking-intent peaks.",
      "Reworked landing-page proof, offer explanation, and response flows for launch traffic.",
      "Separated vanity reach from creator-assisted enquiries and assisted booking signals in reporting.",
    ],
    stages: [
      {
        phase: "Narrative and offer",
        window: "Weeks 1–3",
        focus:
          "Offer framing, message hierarchy, content pillars, and creator-brief design.",
      },
      {
        phase: "Social and creator rollout",
        window: "Weeks 4–8",
        focus:
          "Content deployment, creator posts, PR outreach, and landing response alignment.",
      },
      {
        phase: "Signal optimisation",
        window: "Weeks 9–12",
        focus:
          "Audience response review, content iteration, and enquiry-source quality filtering.",
      },
      {
        phase: "Scale and reputation",
        window: "Weeks 13–16",
        focus:
          "High-performing format expansion, creator retention, and press-proof amplification.",
      },
    ],
    evidence: [
      {
        label: "Qualified event enquiries",
        before: "100 index",
        after: "360 index",
      },
      { label: "Social engagement rate", before: "2.1%", after: "5.4%" },
      {
        label: "Creator-assisted visits",
        before: "100 index",
        after: "248 index",
      },
    ],
    before: [
      "Social publishing was not sequenced against offers or launch milestones.",
      "Creator partnerships were ad hoc, with limited briefing rigour and unclear outputs.",
      "Press and creator activity were not connected to enquiry or landing performance.",
      "Landing pages lacked the proof and next-step structure required by launch traffic.",
    ],
    after: [
      "Social, PR, and creator activity aligned to commercially important booking moments.",
      "Creator posts were briefed and timed against enquiry goals rather than generic visibility.",
      "Landing-page refinements improved traffic-to-enquiry conversion during launch periods.",
      "Qualified event enquiries grew 3.6x while visibility became easier to attribute and govern.",
    ],
    impact: [
      "The business gained a reusable launch playbook spanning content, creators, PR, and conversion.",
      "Management could distinguish activity assisting qualified demand from activity generating reach alone.",
      "Social and PR shifted from isolated tactics to a governed communications system.",
      "The team retained a stronger creator and PR operating base for later seasonal campaigns.",
    ],
    services: ["social-media-content", "growth-performance"],
  },
  "distribution-workflow-automation-reset": {
    number: "04",
    slug: "distribution-workflow-automation-reset",
    context: "B2B distribution network",
    category: "Marketing operations",
    auditChallenge: "Positioning and strategy",
    metric: "72%",
    result: "Faster lead-to-quote turnaround",
    timeline: "12 weeks",
    headline: "Inbound demand stopped disappearing into handoffs.",
    metaTitle: "B2B Marketing Operations Case Study: 72% Faster | Fernesta",
    metaDescription:
      "An anonymized Fernesta case study showing how lead intake, routing, approvals, dashboards, and sales handoffs improved lead-to-quote turnaround by 72%.",
    detail:
      "The lead-to-quote workflow was redesigned across intake, field quality, ownership, approvals, reminders, status visibility, and weekly governance. The goal was not automation for its own sake; it was to prevent qualified demand from stalling between marketing response and a commercial quotation.",
    objective:
      "Reduce operational leakage between lead capture and quotation by creating one visible workflow for intake, approvals, ownership, follow-up, and reporting.",
    approach: [
      "Mapped the complete lead-to-quote workflow to expose bottlenecks, duplicate entry, and ownership gaps.",
      "Built a standard intake structure, routing logic, and shared status view with a visible next action.",
      "Connected landing forms, tracker updates, and follow-up triggers to reduce manual handoffs.",
      "Introduced weekly governance reviews using workflow evidence rather than anecdotal updates.",
    ],
    stages: [
      {
        phase: "Workflow mapping",
        window: "Weeks 1–2",
        focus:
          "Current-state mapping, bottleneck discovery, and ownership-gap identification.",
      },
      {
        phase: "System buildout",
        window: "Weeks 3–6",
        focus:
          "Intake standardisation, status logic, approval routing, and dashboard implementation.",
      },
      {
        phase: "Team adoption",
        window: "Weeks 7–9",
        focus:
          "Usage training, exception handling, and accountability cadence rollout.",
      },
      {
        phase: "Optimisation",
        window: "Weeks 10–12",
        focus:
          "Workflow tuning, response-time governance, and reporting refinement.",
      },
    ],
    evidence: [
      {
        label: "Lead-to-quote speed",
        before: "100 index",
        after: "172 index",
      },
      { label: "On-time follow-up", before: "58%", after: "91%" },
      {
        label: "Status visibility",
        before: "100 index",
        after: "214 index",
      },
    ],
    before: [
      "Lead capture and quoting depended on fragmented spreadsheets with inconsistent fields.",
      "Approvals and ownership lived in chat threads, creating delay and accountability gaps.",
      "Sales and marketing could not see where active enquiries were stuck without manual follow-up.",
      "Reporting focused on total leads rather than response discipline and throughput.",
    ],
    after: [
      "Inbound enquiries moved through one intake and routing structure with clearer ownership.",
      "Approval status and next actions became visible through a shared reporting dashboard.",
      "Reminder logic and exception flags reduced manual chasing and improved follow-up discipline.",
      "Lead-to-quote turnaround improved by 72% while team handoffs became easier to govern.",
    ],
    impact: [
      "Commercial response became faster without increasing management overhead.",
      "Leadership gained a clearer view of lead volume, delay points, and conversion friction.",
      "Workflow automation reduced leakage between marketing demand and quoted opportunities.",
      "The business retained a reusable operating model for future campaign scale.",
    ],
    services: ["strategy-launch-planning", "growth-performance"],
  },
};

export const workOrder = [
  workStudies["d2c-skincare-performance-turnaround"],
  workStudies["consumer-retail-brand-retention"],
  workStudies["boutique-hospitality-social-pr-launch"],
  workStudies["distribution-workflow-automation-reset"],
] as const;

export const workByService: Record<ServiceSlug, readonly WorkSlug[]> = {
  "strategy-launch-planning": [
    "distribution-workflow-automation-reset",
    "boutique-hospitality-social-pr-launch",
  ],
  "branding-creative": [
    "consumer-retail-brand-retention",
    "d2c-skincare-performance-turnaround",
  ],
  "growth-performance": [
    "d2c-skincare-performance-turnaround",
    "consumer-retail-brand-retention",
  ],
  "social-media-content": [
    "boutique-hospitality-social-pr-launch",
    "consumer-retail-brand-retention",
  ],
};
