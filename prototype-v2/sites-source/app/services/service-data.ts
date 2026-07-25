export type ServiceSlug =
  | "strategy-launch-planning"
  | "branding-creative"
  | "growth-performance"
  | "social-media-content";

type Engagement = {
  title: string;
  copy: string;
  outputs: readonly string[];
};

type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceDefinition = {
  number: string;
  slug: ServiceSlug;
  title: string;
  shortTitle: string;
  metaTitle: string;
  metaDescription: string;
  keywords: readonly string[];
  challenge: string;
  eyebrow: string;
  heroLead: string;
  heroEmphasis: string;
  summary: string;
  image: string;
  imageAlt: string;
  thesis: string;
  thesisCopy: string;
  signals: readonly string[];
  engagements: readonly Engagement[];
  process: readonly {
    title: string;
    copy: string;
  }[];
  faq: readonly ServiceFaq[];
  related: readonly ServiceSlug[];
};

export const services: Record<ServiceSlug, ServiceDefinition> = {
  "strategy-launch-planning": {
    number: "01",
    slug: "strategy-launch-planning",
    title: "Strategy & Launch Planning",
    shortTitle: "Strategy and launch",
    metaTitle: "Brand Strategy & Launch Planning Agency | Fernesta",
    metaDescription:
      "Fernesta turns customer, category, and commercial evidence into brand positioning, go-to-market strategy, launch plans, and actionable marketing roadmaps.",
    keywords: [
      "brand strategy agency",
      "launch planning agency",
      "go-to-market strategy",
      "brand positioning",
      "marketing roadmap",
    ],
    challenge: "Positioning and strategy",
    eyebrow: "Strategy and launch planning",
    heroLead: "Decide what the brand",
    heroEmphasis: "should do next.",
    summary:
      "Fernesta connects customer evidence, category reality, commercial priorities, and brand ambition into a decision system. The result is not a strategy presentation that sits beside the work. It is a position, launch sequence, and marketing roadmap that creative, growth, content, sales, and leadership can use.",
    image: "/prototype/assets/strategy-direction-editorial.webp",
    imageAlt:
      "Strategy lead arranging positioning and launch-planning evidence on a working table",
    thesis: "Clarity before activity.",
    thesisCopy:
      "Most marketing problems become expensive when activity begins before the audience, promise, proof, offer, and sequence are clear. We resolve those choices first, then translate them into work the market can see and the team can operate.",
    signals: [
      "The business has several growth priorities but no agreed marketing sequence.",
      "The position sounds interchangeable with competitors or changes by channel.",
      "A launch date exists, but the audience, offer, message, and channel roles are still moving.",
      "Leadership, sales, creative, and performance teams are working from different assumptions.",
    ],
    engagements: [
      {
        title: "Customer and category insight",
        copy:
          "A focused evidence review that separates useful signals from internal assumptions and category convention.",
        outputs: [
          "Customer and stakeholder themes",
          "Category and competitor signal map",
          "Opportunity and risk questions",
        ],
      },
      {
        title: "Brand positioning",
        copy:
          "A clear choice of audience, promise, frame of reference, differentiation, and reasons to believe.",
        outputs: [
          "Positioning platform",
          "Message hierarchy",
          "Decision and expression guardrails",
        ],
      },
      {
        title: "Go-to-market strategy",
        copy:
          "A practical route from proposition to priority audience, offer, channel role, and commercial learning.",
        outputs: [
          "Priority audience and use case",
          "Offer and channel architecture",
          "90-day market-entry roadmap",
        ],
      },
      {
        title: "Launch planning",
        copy:
          "A sequenced launch system connecting narrative, campaign, content, distribution, conversion, and measurement.",
        outputs: [
          "Launch architecture",
          "Integrated campaign brief",
          "Launch calendar and decision gates",
        ],
      },
      {
        title: "Marketing roadmap",
        copy:
          "A connected plan that turns strategy into owned workstreams, priorities, dependencies, and a learning cadence.",
        outputs: [
          "Objectives and priority initiatives",
          "Workstream ownership and dependencies",
          "Measurement and review rhythm",
        ],
      },
    ],
    process: [
      {
        title: "Read the evidence",
        copy: "Bring customer, category, business, channel, and team signals into one view.",
      },
      {
        title: "Make the choices",
        copy: "Resolve the few audience, position, offer, and sequence decisions that shape everything else.",
      },
      {
        title: "Build the operating brief",
        copy: "Translate strategy into clear requirements for brand, campaigns, content, channels, and conversion.",
      },
      {
        title: "Learn in market",
        copy: "Define the evidence that will confirm, sharpen, or challenge the plan after launch.",
      },
    ],
    faq: [
      {
        question: "Can Fernesta work with an existing research base?",
        answer:
          "Yes. We begin by auditing what already exists, identifying gaps that materially affect the decision, and avoiding research for its own sake.",
      },
      {
        question: "Does launch planning include execution?",
        answer:
          "It can. Fernesta can stop at a senior launch blueprint, lead the connected creative and content system, or coordinate specialist production and distribution within an agreed scope.",
      },
      {
        question: "Is this suitable before entering a new market?",
        answer:
          "Yes. Market-entry work adds location-specific evidence, adaptation requirements, operating constraints, and a staged launch decision before wider investment.",
      },
    ],
    related: ["branding-creative", "growth-performance"],
  },
  "branding-creative": {
    number: "02",
    slug: "branding-creative",
    title: "Branding & Creative",
    shortTitle: "Branding and creative",
    metaTitle: "Branding & Creative Agency: Identity to Campaigns | Fernesta",
    metaDescription:
      "Fernesta builds positioning-led brand identities, naming, messaging, voice, campaign platforms, and usable brand systems for ambitious businesses.",
    keywords: [
      "branding agency",
      "brand identity agency",
      "brand messaging",
      "campaign creative agency",
      "brand guidelines",
    ],
    challenge: "Brand identity and story",
    eyebrow: "Branding and creative",
    heroLead: "Make the strategy",
    heroEmphasis: "recognisable.",
    summary:
      "Fernesta turns a chosen position into a distinctive identity, voice, story, and creative system. We build brands to make decisions consistently across websites, campaigns, content, commerce, presentations, packaging, and the everyday materials teams actually use.",
    image: "/prototype/assets/brand-creative-editorial.webp",
    imageAlt:
      "Brand designer reviewing identity materials, typography, colour, and packaging",
    thesis: "Distinctive, then consistent.",
    thesisCopy:
      "A brand is more than a logo and more than a set of visual rules. It is the recognisable way a business makes its promise, proves it, and behaves across every relevant encounter. The system must create difference without making execution fragile.",
    signals: [
      "The brand looks or sounds different across teams, channels, and campaigns.",
      "A strong business proposition has not become a memorable customer-facing story.",
      "Creative work is attractive in isolation but does not compound recognition over time.",
      "The company has outgrown its current identity, name, message, or category framing.",
    ],
    engagements: [
      {
        title: "Brand identity",
        copy:
          "A visual and verbal identity built from the position rather than applied as surface decoration.",
        outputs: [
          "Identity concept and visual system",
          "Typography, colour, and image direction",
          "Priority touchpoint applications",
        ],
      },
      {
        title: "Naming and messaging",
        copy:
          "Names, descriptors, promises, message architecture, and proof designed to make the offer easier to understand and remember.",
        outputs: [
          "Naming or descriptor routes",
          "Core message architecture",
          "Audience and channel adaptations",
        ],
      },
      {
        title: "Brand story and voice",
        copy:
          "A narrative and writing system that gives the brand a consistent point of view without sounding scripted.",
        outputs: [
          "Brand narrative",
          "Voice principles and examples",
          "Core company and offer copy",
        ],
      },
      {
        title: "Campaign platforms",
        copy:
          "A durable creative idea that can generate multiple messages, formats, and executions without losing strategic focus.",
        outputs: [
          "Campaign proposition and idea",
          "Creative territories",
          "Channel expression framework",
        ],
      },
      {
        title: "Brand guidelines and rollout",
        copy:
          "A usable operating system, adoption plan, and core templates that help internal and external teams stay coherent.",
        outputs: [
          "Practical brand guidelines",
          "Core templates and examples",
          "Rollout priorities and governance",
        ],
      },
    ],
    process: [
      {
        title: "Anchor in position",
        copy: "Confirm the audience, promise, differentiation, personality, and proof the brand must carry.",
      },
      {
        title: "Create the territory",
        copy: "Develop and pressure-test visual, verbal, and narrative directions against real use cases.",
      },
      {
        title: "Build the system",
        copy: "Turn the chosen direction into repeatable rules, assets, templates, and examples.",
      },
      {
        title: "Move into market",
        copy: "Prioritise the touchpoints and launch work that will establish recognition fastest.",
      },
    ],
    faq: [
      {
        question: "Can Fernesta refresh an existing brand without replacing it?",
        answer:
          "Yes. We first identify what still carries equity and what is creating inconsistency or strategic drag. The right answer may be clarification, evolution, or a fuller rebrand.",
      },
      {
        question: "Do you create brand guidelines teams can actually use?",
        answer:
          "Yes. Guidelines are built around decisions, examples, templates, and priority touchpoints—not only logo spacing and colour specifications.",
      },
      {
        question: "Can branding connect directly to a launch campaign?",
        answer:
          "Yes. Positioning, identity, message, campaign platform, content, and launch planning can be scoped as one connected programme.",
      },
    ],
    related: ["strategy-launch-planning", "social-media-content"],
  },
  "growth-performance": {
    number: "03",
    slug: "growth-performance",
    title: "Growth & Performance",
    shortTitle: "Growth and performance",
    metaTitle: "Growth Marketing & Performance Strategy Agency | Fernesta",
    metaDescription:
      "Fernesta connects acquisition, paid media, conversion, commerce, lifecycle, and experimentation into a measurable growth system.",
    keywords: [
      "growth marketing agency",
      "performance marketing strategy",
      "conversion optimisation",
      "commerce growth",
      "paid media planning",
    ],
    challenge: "Conversion and growth",
    eyebrow: "Growth and performance",
    heroLead: "Turn attention into",
    heroEmphasis: "useful growth.",
    summary:
      "Fernesta connects acquisition, creative, landing experiences, commerce, lifecycle, and measurement around the decisions that create or lose demand. We treat performance as a learning system—not a media dashboard separated from brand and customer experience.",
    image: "/prototype/assets/growth-performance-editorial.webp",
    imageAlt:
      "Marketer comparing creative tests, conversion signals, and a measurement framework",
    thesis: "Measure the decision, not just the channel.",
    thesisCopy:
      "Efficiency rarely improves through media optimisation alone. The audience, promise, creative, offer, landing path, follow-up, and measurement design all influence the outcome. We identify the constraint, then connect the work required to move it.",
    signals: [
      "Traffic or reach is increasing but qualified demand and revenue are not moving with it.",
      "Paid media, creative, website, commerce, and lifecycle teams optimise different metrics.",
      "The business cannot explain which messages, audiences, or experiences create better customers.",
      "Reporting describes what happened but does not make the next decision clearer.",
    ],
    engagements: [
      {
        title: "Growth diagnostic",
        copy:
          "A focused review of acquisition, conversion, retention, economics, tracking, and the current decision cadence.",
        outputs: [
          "Growth constraint map",
          "Measurement and tracking gaps",
          "Prioritised testing roadmap",
        ],
      },
      {
        title: "Acquisition and paid media strategy",
        copy:
          "A role for paid acquisition grounded in audience, proposition, economics, creative requirements, and channel fit.",
        outputs: [
          "Audience and channel priorities",
          "Campaign and budget architecture",
          "Creative testing requirements",
        ],
      },
      {
        title: "Conversion optimisation",
        copy:
          "A structured programme for improving the moments between interest, comprehension, confidence, and action.",
        outputs: [
          "Journey and friction review",
          "Landing-page priorities",
          "Experiment backlog and hypotheses",
        ],
      },
      {
        title: "Commerce and lifecycle growth",
        copy:
          "Connected acquisition, merchandising, offers, repeat purchase, and customer communication.",
        outputs: [
          "Commerce growth priorities",
          "Offer and merchandising tests",
          "Lifecycle journey plan",
        ],
      },
      {
        title: "Measurement and experimentation",
        copy:
          "A practical operating cadence that links business outcomes to creative, channel, and experience decisions.",
        outputs: [
          "Decision-focused measurement plan",
          "Test design and learning agenda",
          "Reporting and review cadence",
        ],
      },
    ],
    process: [
      {
        title: "Find the constraint",
        copy: "Separate symptoms from the audience, message, offer, experience, channel, or operating problem underneath.",
      },
      {
        title: "Frame the hypothesis",
        copy: "Define the customer behaviour and business outcome each change is expected to influence.",
      },
      {
        title: "Run connected tests",
        copy: "Coordinate creative, media, landing, commerce, and lifecycle changes where the problem crosses them.",
      },
      {
        title: "Make the next decision",
        copy: "Turn performance evidence into a clear choice to scale, refine, replace, or stop.",
      },
    ],
    faq: [
      {
        question: "Does Fernesta buy media?",
        answer:
          "Paid-media planning and management can be included where the account, access, budget, measurement, and operating responsibilities are clearly scoped.",
      },
      {
        question: "Can you work with an existing performance team or agency?",
        answer:
          "Yes. Fernesta can diagnose the wider system, sharpen the creative and conversion agenda, or provide the strategic layer that connects existing specialists.",
      },
      {
        question: "How do brand and performance work together?",
        answer:
          "The position shapes the promise; creative expresses it; media reaches the audience; the experience proves it; and measurement shows which combination creates useful demand.",
      },
    ],
    related: ["strategy-launch-planning", "social-media-content"],
  },
  "social-media-content": {
    number: "04",
    slug: "social-media-content",
    title: "Social Media & Content",
    shortTitle: "Social media and content",
    metaTitle: "Social Media & Content Strategy Agency | Fernesta",
    metaDescription:
      "Fernesta builds social and content systems spanning strategy, channel roles, editorial formats, production, community, and creator programmes.",
    keywords: [
      "social media strategy agency",
      "content strategy agency",
      "content production",
      "creator marketing",
      "editorial content system",
    ],
    challenge: "Content and social presence",
    eyebrow: "Social media and content",
    heroLead: "Build a presence that",
    heroEmphasis: "keeps moving.",
    summary:
      "Fernesta builds content systems around a clear brand role, audience need, channel purpose, repeatable formats, production rhythm, and learning loop. The goal is not to fill a calendar. It is to create a recognisable presence that earns attention and supports the wider market plan.",
    image: "/prototype/assets/social-content-production.webp",
    imageAlt:
      "Content production table with a camera, phone rig, storyboard, and contact sheet",
    thesis: "A system, not a stream of posts.",
    thesisCopy:
      "Momentum comes from knowing what the brand should say, why each channel exists, which formats can repeat, how production will operate, and what audience behaviour should change. Individual posts become more effective when they strengthen that larger pattern.",
    signals: [
      "The content calendar is active, but the brand is not becoming easier to recognise or choose.",
      "Every month begins from a blank page and production depends on last-minute ideas.",
      "Channels repeat the same material without a clear audience or behavioural role.",
      "Community, creators, paid distribution, and performance learning sit outside the content plan.",
    ],
    engagements: [
      {
        title: "Content strategy",
        copy:
          "A clear role for content within the brand, customer journey, launch plan, and commercial priorities.",
        outputs: [
          "Audience and content objectives",
          "Narrative and pillar architecture",
          "Format and measurement priorities",
        ],
      },
      {
        title: "Social channel planning",
        copy:
          "Distinct channel roles, audience behaviours, formats, and publishing choices instead of automatic cross-posting.",
        outputs: [
          "Channel role and audience map",
          "Platform-specific format plan",
          "Publishing and distribution rhythm",
        ],
      },
      {
        title: "Editorial systems",
        copy:
          "Repeatable series, briefs, calendars, approvals, and learning loops that make quality sustainable.",
        outputs: [
          "Recurring editorial franchises",
          "Brief and calendar system",
          "Governance and review workflow",
        ],
      },
      {
        title: "Content production direction",
        copy:
          "Creative direction and production planning for the priority formats required by the system.",
        outputs: [
          "Production-ready creative briefs",
          "Visual and format direction",
          "Asset plan and adaptation matrix",
        ],
      },
      {
        title: "Community and creator programmes",
        copy:
          "A role for participation, credible voices, creator relationships, and audience response within the wider brand system.",
        outputs: [
          "Community participation model",
          "Creator brief and selection criteria",
          "Amplification and learning plan",
        ],
      },
    ],
    process: [
      {
        title: "Define the role",
        copy: "Clarify what content must make the audience understand, feel, remember, or do.",
      },
      {
        title: "Design the system",
        copy: "Choose channel roles, narratives, repeatable formats, production requirements, and distribution.",
      },
      {
        title: "Create the rhythm",
        copy: "Build briefs, calendars, workflows, and asset adaptation around a sustainable cadence.",
      },
      {
        title: "Learn from response",
        copy: "Use attention, participation, conversion, and qualitative signals to sharpen the next cycle.",
      },
    ],
    faq: [
      {
        question: "Can Fernesta manage ongoing social channels?",
        answer:
          "Yes, where strategy, production volume, community responsibilities, approval timelines, and any paid amplification are clearly scoped.",
      },
      {
        question: "Does content production require a separate partner?",
        answer:
          "Fernesta can direct and coordinate production. Specialist crews, creators, studios, or local-language talent are confirmed according to format, market, and scope.",
      },
      {
        question: "Can you create a content system before ongoing execution?",
        answer:
          "Yes. A strategy-and-system engagement can leave the internal team with channel roles, editorial franchises, briefs, workflows, templates, and a measurement cadence.",
      },
    ],
    related: ["branding-creative", "growth-performance"],
  },
};

export const serviceOrder = [
  services["strategy-launch-planning"],
  services["branding-creative"],
  services["growth-performance"],
  services["social-media-content"],
] as const;

