"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import MarketSelector from "./MarketSelector";
import "./fernesta.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const disciplines = [
  {
    number: "01",
    title: "Strategy & Launch Planning",
    href: "/services/strategy-launch-planning",
    copy: "We turn customer, category, and commercial evidence into positioning, a go-to-market plan, and a launch sequence the whole team can act on.",
    image: "/prototype/assets/strategy-direction-editorial.webp",
    alt: "Strategy lead arranging positioning and launch-planning cards on a walnut table",
    engagements: [
      "Customer and category insight",
      "Brand positioning",
      "Go-to-market strategy",
      "Launch planning",
      "Marketing roadmaps",
    ],
  },
  {
    number: "02",
    title: "Branding & Creative",
    href: "/services/branding-creative",
    copy: "We shape the identity, voice, story, and creative system that make the strategy distinctive wherever the brand appears.",
    image: "/prototype/assets/brand-creative-editorial.webp",
    alt: "Brand designer reviewing tactile identity materials and packaging",
    engagements: [
      "Brand identity",
      "Naming and messaging",
      "Brand story and voice",
      "Campaign platforms",
      "Brand guidelines",
    ],
  },
  {
    number: "03",
    title: "Growth & Performance",
    href: "/services/growth-performance",
    copy: "We connect creative thinking to acquisition, conversion, commerce, and measurable learning.",
    image: "/prototype/assets/growth-performance-editorial.webp",
    alt: "Marketer comparing creative tests beside a measurement framework",
    engagements: [
      "Acquisition strategy",
      "Paid media planning",
      "Conversion optimisation",
      "Commerce growth",
      "Measurement and experimentation",
    ],
  },
  {
    number: "04",
    title: "Social Media & Content",
    href: "/services/social-media-content",
    copy: "We build a living presence with formats, stories, and communities designed for attention.",
    image: "/prototype/assets/social-content-production.webp",
    alt: "Content production table with camera, phone rig, contact sheet, and storyboard",
    engagements: [
      "Content strategy",
      "Social channel planning",
      "Editorial systems",
      "Content production",
      "Community and creator programmes",
    ],
  },
] as const;

const strategyStages = [
  {
    title: "Insight",
    promise: "Find the signal worth acting on.",
    copy: "Customer, category, and commercial evidence expose the real problem.",
  },
  {
    title: "Positioning",
    promise: "Choose the space the brand can own.",
    copy: "A sharp promise, audience, and reason to believe align every decision.",
  },
  {
    title: "Identity",
    promise: "Make the strategy recognisable.",
    copy: "Voice, design, and story turn the position into a distinctive brand.",
  },
  {
    title: "Launch",
    promise: "Sequence the move into market.",
    copy: "Campaign, channel, content, and conversion plans move together.",
  },
  {
    title: "Learning",
    promise: "Let the market sharpen the system.",
    copy: "Attention, behaviour, and revenue show what to scale, change, or stop.",
  },
] as const;

const credentials = [
  { name: "Neora", logo: "/prototype/assets/credentials/neora.png" },
  { name: "Mamaearth", logo: "/prototype/assets/credentials/mamaearth.png" },
  {
    name: "Avacara Jaipur",
    logo: "/prototype/assets/credentials/avacara-jaipur.png",
  },
  {
    name: "Cine Yatri",
    logo: "/prototype/assets/credentials/cine-yatri.png",
  },
  { name: "Unilever", logo: "/prototype/assets/credentials/unilever.png" },
  { name: "SOLA", logo: "/prototype/assets/credentials/sola.png" },
  { name: "Angel One", logo: "/prototype/assets/credentials/angel-one.png" },
  { name: "Colgate", logo: "/prototype/assets/credentials/colgate.png" },
  { name: "ToastD", logo: "/prototype/assets/credentials/toastd.png" },
] as const;

const linkedinUrl = "https://www.linkedin.com/company/fernesta/";
const instagramUrl = "https://www.instagram.com/fernesta.co/";
const officeMapUrl = "https://maps.app.goo.gl/ZatXGy9xwzVFQFwo9";
const whatsappUrl =
  "/go/whatsapp?pipeline=fernesta&utm_source=website&utm_medium=whatsapp_cta&utm_campaign=main_lead_funnel";
const web3FormsAccessKey = "83322097-71cb-4b31-ab65-847f25109591";
const officeAddress =
  "215, Padmavati B Colony, Padmavti Colony, Nirman Nagar, Brijlalpura, Jaipur, Rajasthan 302019";

const starterOptions = [
  {
    label: "Our position is unclear",
    title: "Start with strategy and positioning.",
    copy: "Clarify the audience, promise, proof, and market space before adding more creative or media.",
    challenge: "Positioning and strategy",
    systemIndex: 0,
  },
  {
    label: "The brand feels inconsistent",
    title: "Start with the brand system.",
    copy: "Align identity, voice, story, and campaign rules so every touchpoint reinforces the same position.",
    challenge: "Brand identity and story",
    systemIndex: 1,
  },
  {
    label: "Growth is not converting",
    title: "Start with the conversion path.",
    copy: "Connect creative, acquisition, commerce, and measurement around the moments where demand is being lost.",
    challenge: "Conversion and growth",
    systemIndex: 2,
  },
  {
    label: "Content lacks momentum",
    title: "Start with the content system.",
    copy: "Build repeatable formats, production rhythms, and community signals instead of isolated posts.",
    challenge: "Content and social presence",
    systemIndex: 3,
  },
  {
    label: "A launch needs direction",
    title: "Start with launch planning.",
    copy: "Align the offer, audience, message, channels, and sequence so launch activity builds toward one clear market move.",
    challenge: "Launch planning",
    systemIndex: 0,
  },
] as const;

const supportingCapabilities = [
  {
    number: "A",
    title: "Digital experiences",
    copy: "Websites and commerce journeys that turn the brand promise into useful, measurable customer action.",
  },
  {
    number: "B",
    title: "Campaign delivery",
    copy: "Campaign planning and production that move one strategic idea consistently across every required format.",
  },
  {
    number: "C",
    title: "Influence and distribution",
    copy: "PR and creator programmes that add credible voices, cultural relevance, and earned attention.",
  },
  {
    number: "D",
    title: "Intelligence and operations",
    copy: "Analytics and marketing operations that turn performance signals into better decisions and repeatable execution.",
  },
] as const;

const proofNotes = [
  {
    number: "01",
    slug: "d2c-skincare-performance-turnaround",
    metric: "3.2x",
    title: "Blended ROAS in 120 days",
    context: "D2C skincare / performance",
    copy: "Campaign structure, creative testing, tracking, and landing-page decisions were rebuilt as one acquisition system.",
  },
  {
    number: "02",
    slug: "consumer-retail-brand-retention",
    metric: "42%",
    title: "Increase in returning customer rate",
    context: "Consumer retail / brand and retention",
    copy: "A unified brand system and lifecycle journeys connected acquisition communication to repeat-purchase behaviour.",
  },
  {
    number: "03",
    slug: "boutique-hospitality-social-pr-launch",
    metric: "3.6x",
    title: "Increase in qualified event enquiries",
    context: "Boutique hospitality / launch",
    copy: "Social content, creator seeding, PR timing, and landing-page response were sequenced under one launch playbook.",
  },
  {
    number: "04",
    slug: "distribution-workflow-automation-reset",
    metric: "72%",
    title: "Faster lead-to-quote turnaround",
    context: "B2B distribution / operations",
    copy: "Lead intake, approval routing, ownership, and reporting were redesigned into one visible operating flow.",
  },
] as const;

const engagementQuestions = [
  {
    title: "What does independent mean at Fernesta?",
    answer:
      "Senior decisions stay close to the work. Our recommendations are shaped around the brand and business problem, not around a fixed media inventory, production vendor, or pre-built agency package.",
  },
  {
    title: "Can we begin with one discipline?",
    answer:
      "Yes. A focused engagement can address positioning, identity, launch planning, performance, or content on its own. When the problem crosses disciplines, we connect the work so one decision does not create friction somewhere else.",
  },
  {
    title: "Does Fernesta handle strategy and execution?",
    answer:
      "Yes. We can define the direction and carry it into identity, campaigns, content, digital experiences, measurement, and operating rhythms. The exact delivery team is shaped around the scope rather than inflated in advance.",
  },
  {
    title: "What can launch planning include?",
    answer:
      "Launch work can cover audience and category evidence, positioning, offer and message architecture, channel roles, campaign sequencing, content requirements, conversion surfaces, measurement, and the decisions required after launch.",
  },
  {
    title: "What happens in the free brand audit?",
    answer:
      "We review the website, social presence, and context you share. A senior team member identifies the clearest positioning, consistency, launch-readiness, or conversion issues and replies with the few decisions most worth making next.",
  },
] as const;

function StrategyJourney() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <figure className="strategy-journey">
      <ol className="journey-stages" aria-label="Fernesta strategy-to-market path">
        {strategyStages.map((stage, index) => (
          <li
            className={`journey-stage${activeStage === index ? " is-active" : ""}`}
            key={stage.title}
            onMouseEnter={() => setActiveStage(index)}
          >
            <button
              type="button"
              aria-expanded={activeStage === index}
              aria-controls={`journey-stage-${index}`}
              onClick={() => setActiveStage(index)}
              onFocus={() => setActiveStage(index)}
            >
              <span className="journey-stage-meta">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span aria-hidden="true">{activeStage === index ? "−" : "+"}</span>
              </span>
              <strong>{stage.title}</strong>
              <span className="journey-stage-promise">{stage.promise}</span>
              <span
                className="journey-stage-copy"
                id={`journey-stage-${index}`}
              >
                {stage.copy}
              </span>
            </button>
          </li>
        ))}
      </ol>
      <figcaption>
        Evidence in. Decisions out. One clear thread from insight to market
        learning.
      </figcaption>
    </figure>
  );
}

function SystemMap() {
  return (
    <div className="system-map" aria-hidden="true">
      <svg viewBox="0 0 420 118" role="presentation">
        <path className="system-map-base" d="M20 59 H400" />
        <path
          className="system-map-track"
          d="M20 59 H400"
        />
        {[20, 147, 273, 400].map((cx, index) => (
          <g key={cx}>
            <circle className="system-map-ring" cx={cx} cy="59" r="14" />
            <circle
              className="system-map-node"
              data-node={index}
              cx={cx}
              cy="59"
              r="4"
            />
          </g>
        ))}
      </svg>
      <span className="system-map-label">Direction</span>
      <span className="system-map-label">Creative</span>
      <span className="system-map-label">Growth</span>
      <span className="system-map-label">Content</span>
    </div>
  );
}

export default function FernestaExperience() {
  const scope = useRef<HTMLDivElement>(null);
  const [auditStatus, setAuditStatus] = useState("");
  const [auditChallenge, setAuditChallenge] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeNav, setActiveNav] = useState("");
  const [starterIndex, setStarterIndex] = useState<number | null>(null);
  const starterSelection =
    starterIndex === null ? null : starterOptions[starterIndex];

  useEffect(() => {
    const requestedChallenge = new URLSearchParams(window.location.search).get(
      "challenge",
    );
    if (requestedChallenge) {
      window.requestAnimationFrame(() => {
        setAuditChallenge(requestedChallenge);
        ScrollTrigger.refresh();
        document
          .getElementById("brand-audit")
          ?.scrollIntoView({ block: "start" });
      });
    }
  }, []);

  const chooseStarter = (index: number) => {
    setStarterIndex(index);
    setAuditChallenge(starterOptions[index].challenge);
  };

  const showStarterDiscipline = () => {
    if (!starterSelection) return;
    const step = scope.current?.querySelectorAll<HTMLElement>(".system-step")[
      starterSelection.systemIndex
    ];
    step?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleAuditSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    const fields = {
      name: String(values.get("name") ?? ""),
      email: String(values.get("email") ?? ""),
      business_website: String(values.get("website") ?? ""),
      instagram: String(values.get("instagram") ?? ""),
      challenge: String(values.get("challenge") ?? ""),
      details: String(values.get("details") ?? ""),
      company_fax: String(values.get("company_fax") ?? ""),
      pipeline: "fernesta",
      source:
        typeof window === "undefined"
          ? "https://www.fernesta.com/#brand-audit"
          : window.location.href,
      lead_source: "website_brand_audit",
      stage: "New Inquiry",
    };
    const subject = encodeURIComponent("Free brand audit registration");
    const body = encodeURIComponent(
      [
        "Free brand audit registration",
        "",
        `Name: ${fields.name}`,
        `Work email: ${fields.email}`,
        `Website: ${fields.business_website}`,
        `Instagram: ${fields.instagram}`,
        `Biggest challenge: ${fields.challenge}`,
        `Additional detail: ${fields.details}`,
      ].join("\n"),
    );

    setAuditStatus("Registering your audit request…");

    setIsSubmitting(true);

    try {
      if (fields.company_fax) {
        form.reset();
        setAuditStatus(
          "You are registered. A Fernesta team member will review the brand and reply.",
        );
        return;
      }

      const web3FormsData = new FormData(form);
      web3FormsData.set("access_key", web3FormsAccessKey);
      web3FormsData.set("subject", "Free brand audit registration");
      web3FormsData.set("from_name", "Fernesta Website");
      web3FormsData.set("business_website", fields.business_website);
      web3FormsData.set("pipeline", fields.pipeline);
      web3FormsData.set("source", fields.source);
      web3FormsData.set("lead_source", fields.lead_source);
      web3FormsData.set("stage", fields.stage);

      const web3FormsResponse = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          body: web3FormsData,
        },
      );
      const web3FormsResult = (await web3FormsResponse
        .json()
        .catch(() => null)) as { success?: boolean } | null;

      if (!web3FormsResponse.ok || web3FormsResult?.success !== true) {
        const fallbackResponse = await fetch("/api/lead", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subject: "Free brand audit registration",
            formName: "Fernesta Free Brand Audit",
            fields,
          }),
        });
        if (!fallbackResponse.ok) throw new Error("Lead endpoint unavailable");
      }

      form.reset();
      setAuditChallenge("");
      setAuditStatus(
        "You are registered. A Fernesta team member will review the brand and reply.",
      );
    } catch {
      window.location.href = `mailto:tarun@fernesta.com?subject=${subject}&body=${body}`;
      setAuditStatus(
        "Delivery is temporarily unavailable. Your request is ready in your email app for Tarun.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const targets = [
      ["start-here", "start-here"],
      ["approach", "start-here"],
      ["system", "system"],
      ["credentials", "credentials"],
      ["questions", "credentials"],
      ["contact", "contact"],
      ["brand-audit", "contact"],
    ] as const;
    let frame = 0;

    const updateActiveNav = () => {
      frame = 0;
      const marker = window.innerHeight * 0.42;
      let next = "";

      targets.forEach(([sectionId, navId]) => {
        const section = document.getElementById(sectionId);
        if (!section) return;
        const rect = section.getBoundingClientRect();
        if (rect.top <= marker && rect.bottom > marker) next = navId;
      });

      setActiveNav((current) => (current === next ? current : next));
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActiveNav);
    };

    updateActiveNav();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) {
        gsap.set(
          [
            ".hero-reveal",
            ".hero-meta",
            ".hero-copy",
            ".hero-footer",
            ".system-step",
          ],
          { clearProps: "all" },
        );
        return;
      }

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from(".site-header", { y: -24, autoAlpha: 0, duration: 0.8 })
        .from(".hero-meta", { y: 18, autoAlpha: 0, duration: 0.65 }, "-=0.35")
        .from(
          ".hero-reveal",
          { yPercent: 110, rotate: 1.5, duration: 1.05, stagger: 0.12 },
          "-=0.35",
        )
        .from(".hero-copy", { y: 28, autoAlpha: 0, duration: 0.75 }, "-=0.45")
        .from(".hero-footer", { y: 20, autoAlpha: 0, duration: 0.65 }, "-=0.45");

      gsap.from(".journey-stage", {
        y: 36,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 0.65,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".strategy-journey",
          start: "top 78%",
        },
      });

      const systemSteps = gsap.utils.toArray<HTMLElement>(".system-step");
      const activateSystemStep = (index: number) => {
        const mapProgress =
          systemSteps.length > 1 ? index / (systemSteps.length - 1) : 1;

        gsap.to(systemSteps, {
          opacity: (stepIndex) => (stepIndex === index ? 1 : 0.28),
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto",
        });
        gsap.to(".system-progress-fill", {
          scaleX: (index + 1) / systemSteps.length,
          duration: 0.5,
          ease: "power2.out",
          transformOrigin: "left center",
          overwrite: "auto",
        });
        gsap.to(".system-map-track", {
          scaleX: mapProgress,
          transformOrigin: "left center",
          duration: 0.45,
          ease: "power2.out",
          overwrite: "auto",
        });
        gsap.to(".system-map-node", {
          fill: (nodeIndex) =>
            nodeIndex <= index ? "#81191a" : "rgba(77, 61, 44, 0.28)",
          scale: (nodeIndex) => (nodeIndex === index ? 1.8 : 1),
          transformOrigin: "center",
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto",
        });
        gsap.to(".system-map-label", {
          color: (labelIndex) =>
            labelIndex === index
              ? "#81191a"
              : labelIndex < index
                ? "#4d3d2c"
                : "#7f6e5f",
          duration: 0.3,
          overwrite: "auto",
        });
        const currentCounter = scope.current?.querySelector(".system-current");
        if (currentCounter) {
          currentCounter.textContent = String(index + 1).padStart(2, "0");
        }
      };

      activateSystemStep(0);
      systemSteps.forEach((step, index) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top center",
          end: "bottom center",
          onEnter: () => activateSystemStep(index),
          onEnterBack: () => activateSystemStep(index),
        });
      });

    },
    { scope },
  );

  return (
    <div ref={scope} className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header">
        <a className="brand-link" href="#top" aria-label="Fernesta home">
          <Image
            src="/prototype/assets/fernesta-lockup-red-transparent.webp"
            alt="Fernesta"
            width={1024}
            height={1024}
            priority
            unoptimized
          />
        </a>
        <nav className="site-nav" aria-label="Primary navigation">
          <a
            href="#start-here"
            aria-current={activeNav === "start-here" ? "location" : undefined}
          >
            Start here
          </a>
          <a
            href="#system"
            aria-current={activeNav === "system" ? "location" : undefined}
          >
            What we do
          </a>
          <a
            href="#credentials"
            aria-current={activeNav === "credentials" ? "location" : undefined}
          >
            Client experience
          </a>
          <a
            href="#contact"
            aria-current={activeNav === "contact" ? "location" : undefined}
          >
            Contact
          </a>
        </nav>
        <div className="header-actions">
          <a className="nav-cta" href="#brand-audit">
            Free brand audit
            <span aria-hidden="true">↗</span>
          </a>
          <MarketSelector />
        </div>
      </header>

      <main id="main-content">
        <section id="top" className="hero-section">
          <div className="hero-background" aria-hidden="true">
            <Image
              src="/prototype/assets/hero-connected-editorial.webp"
              alt=""
              fill
              sizes="100vw"
              priority
              unoptimized
            />
          </div>
          <div className="hero-meta">
            <span>Independent creative marketing agency</span>
          </div>

          <h1 className="hero-title" aria-label="Creative marketing built to move business">
            <span className="hero-mask hero-title-sans">
              <span className="hero-reveal">Creative marketing</span>
            </span>
            <span className="hero-mask hero-title-serif">
              <span className="hero-reveal hero-title-accent">built to move</span>
            </span>
            <span className="hero-mask hero-title-sans hero-title-last">
              <span className="hero-reveal">
                business<span className="signal-dot">.</span>
              </span>
            </span>
          </h1>

          <div className="hero-copy">
            <p>
              Fernesta brings strategy, launch planning, branding, content,
              and performance into one considered system.
            </p>
            <span>Senior led thinking, carried through the work.</span>
          </div>

          <div className="hero-footer">
            <div className="hero-actions">
              <a href="#brand-audit" className="primary-cta">
                Register for a free brand audit
                <span aria-hidden="true">↘</span>
              </a>
              <a href="#start-here" className="text-link">
                Find your starting point
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </section>

        <section
          id="start-here"
          className="starter-section"
          aria-labelledby="starter-title"
        >
          <div className="starter-heading">
            <div className="section-label">
              <span>Start</span>
              <span>A useful first move</span>
            </div>
            <h2 id="starter-title">What needs to move first?</h2>
            <p>
              Choose the pressure point that feels most familiar. We will show
              you the most useful place to begin.
            </p>
          </div>

          <div className="starter-workspace">
            <div
              className="starter-options"
              role="group"
              aria-label="Choose your starting point"
            >
              {starterOptions.map((option, index) => (
                <button
                  type="button"
                  className={starterIndex === index ? "is-active" : ""}
                  aria-pressed={starterIndex === index}
                  onClick={() => chooseStarter(index)}
                  key={option.label}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{option.label}</strong>
                  <span aria-hidden="true">↗</span>
                </button>
              ))}
            </div>

            <div
              className={`starter-response${
                starterSelection ? " has-selection" : ""
              }`}
              aria-live="polite"
            >
              {starterSelection ? (
                <>
                  <span>Recommended starting point</span>
                  <h3>{starterSelection.title}</h3>
                  <p>{starterSelection.copy}</p>
                  <div className="starter-actions">
                    <button type="button" onClick={showStarterDiscipline}>
                      See the discipline
                      <span aria-hidden="true">↓</span>
                    </button>
                    <a href="#brand-audit">
                      Use this in my free audit
                      <span aria-hidden="true">↘</span>
                    </a>
                  </div>
                </>
              ) : (
                <>
                  <span>Your starting point</span>
                  <h3>Choose one pressure point.</h3>
                  <p>
                    The recommendation will update here and carry your answer
                    into the free brand audit.
                  </p>
                </>
              )}
            </div>
          </div>
        </section>

        <section id="approach" className="manifesto-section">
          <div className="section-label">
            <span>01</span>
            <span>The point of view</span>
          </div>
          <div className="manifesto-copy">
            <h2>
              From the first insight to launch day, every move should follow
              the same strategic thread.
            </h2>
            <p>
              We use evidence to choose the position, turn that position into
              a brand, plan the launch, and keep learning in market. The path
              below is the work, not decoration.
            </p>
          </div>
          <StrategyJourney />
        </section>

        <section id="system" className="system-section">
          <div className="system-intro">
            <div className="section-label">
              <span>02</span>
              <span>The Fernesta system</span>
            </div>
            <h2>Four disciplines. One connected way forward.</h2>
            <p>
              Each discipline can solve a focused need. Together, they create
              clearer decisions, stronger creative, and compounding growth.
            </p>
            <SystemMap />

            <div className="system-counter" aria-hidden="true">
              <span className="system-current">01</span>
              <span>/ 04</span>
            </div>
            <div className="system-progress" aria-hidden="true">
              <span className="system-progress-fill" />
            </div>

          </div>

          <div className="system-steps">
            {disciplines.map((discipline) => (
              <article className="system-step" key={discipline.number}>
                <div className="system-step-image">
                  <Image
                    src={discipline.image}
                    alt={discipline.alt}
                    fill
                    sizes="(max-width: 720px) 100vw, 55vw"
                    unoptimized
                  />
                </div>
                <div className="system-step-copy">
                  <span>{discipline.number}</span>
                  <h3>{discipline.title}</h3>
                  <p>{discipline.copy}</p>
                  <div className="system-step-engagements">
                    <span>Engagements</span>
                    <ul>
                      {discipline.engagements.map((engagement) => (
                        <li key={engagement}>{engagement}</li>
                      ))}
                    </ul>
                  </div>
                  <Link className="system-step-link" href={discipline.href}>
                    Explore this discipline <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <aside
            className="system-support"
            aria-labelledby="system-support-title"
          >
            <div className="system-support-heading">
              <span>Extending the system</span>
              <h3 id="system-support-title">
                Specialist capabilities that carry the core work into market.
              </h3>
              <p>
                These are not disconnected add-ons. Each one helps strategy,
                brand, growth, or content perform more completely.
              </p>
            </div>
            <div className="system-support-grid">
              {supportingCapabilities.map((capability) => (
                <article key={capability.number}>
                  <span>{capability.number}</span>
                  <h4>{capability.title}</h4>
                  <p>{capability.copy}</p>
                </article>
              ))}
            </div>
          </aside>
        </section>

        <section
          id="credentials"
          className="credentials-section"
          aria-labelledby="credentials-title"
        >
          <div className="section-label">
            <span>03</span>
            <span>Selected client and team experience</span>
          </div>
          <div className="credentials-intro">
            <h2 id="credentials-title">
              Experience earned across brands people choose.
            </h2>
            <p>
              A selection of brands supported directly by our team, alongside
              enterprises encountered through prior consulting and marketing
              roles.
            </p>
          </div>
          <div className="credentials-grid">
            {credentials.map((credential, index) => (
              <article
                className={`credential-tile${
                  credential.name === "Mamaearth"
                    ? " credential-tile--mamaearth"
                    : ""
                }`}
                key={credential.name}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div className="credential-logo-frame">
                  <Image
                    src={credential.logo}
                    alt={`${credential.name} logo`}
                    width={320}
                    height={160}
                    loading="lazy"
                    unoptimized
                  />
                </div>
                <strong>{credential.name}</strong>
              </article>
            ))}
          </div>
          <div className="proof-notes">
            <div className="proof-notes-heading">
              <span>Selected anonymized work notes</span>
              <h3>What connected work can change.</h3>
              <p>
                These outcomes come from anonymized engagement records already
                maintained by Fernesta. Named project references and deeper
                context are available on request.
              </p>
            </div>
            <div className="proof-notes-grid">
              {proofNotes.map((proof) => (
                <article key={proof.number}>
                  <div>
                    <span>{proof.number}</span>
                    <span>{proof.context}</span>
                  </div>
                  <strong>{proof.metric}</strong>
                  <h4>{proof.title}</h4>
                  <p>{proof.copy}</p>
                  <Link
                    className="proof-note-link"
                    href={`/work/${proof.slug}`}
                  >
                    Read the case study <span aria-hidden="true">↗</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="questions"
          className="questions-section"
          aria-labelledby="questions-title"
        >
          <div className="questions-intro">
            <div className="section-label">
              <span>04</span>
              <span>Before we begin</span>
            </div>
            <h2 id="questions-title">
              Useful answers before the first conversation.
            </h2>
            <p>
              A clear brief helps, but it is not required. These answers explain
              how Fernesta can enter the problem and what the work can cover.
            </p>
          </div>
          <div className="questions-list">
            {engagementQuestions.map((question, index) => (
              <details key={question.title}>
                <summary>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{question.title}</strong>
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{question.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="inbound-contact"
          aria-labelledby="contact-title"
        >
          <div>
            <span>Have a live brief?</span>
            <h2 id="contact-title">Start a direct conversation.</h2>
          </div>
          <p>
            If the need is already clear, call, WhatsApp, or email us. You will
            speak with the team responsible for shaping the work.
          </p>
          <div className="inbound-actions">
            <a href="tel:+918209458984">
              Call +91 820 945 8984
              <span aria-hidden="true">↗</span>
            </a>
            <a href={whatsappUrl}>
              Start on WhatsApp
              <span aria-hidden="true">↗</span>
            </a>
            <a href="mailto:tarun@fernesta.com">
              Email tarun@fernesta.com
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <section
          id="brand-audit"
          className="audit-section"
          aria-labelledby="audit-title"
        >
          <div className="audit-intro">
            <div className="section-label">
              <span>05</span>
              <span>A useful first conversation</span>
            </div>
            <p className="audit-kicker">Free / senior-reviewed / no template score</p>
            <h2 id="audit-title">
              Register for a free
              <br />
              brand audit.
            </h2>
            <p className="audit-lede">
              We will look at the signals your brand is sending today and
              identify the few decisions most likely to sharpen perception,
              launch readiness, and conversion.
            </p>
            <div className="audit-deliverables">
              <p>What you leave with</p>
              <ol aria-label="What the audit covers">
                {[
                  ["01", "A sharper position"],
                  ["02", "The consistency gaps"],
                  ["03", "The conversion friction"],
                  ["04", "Three decisions to make next"],
                ].map(([number, label]) => (
                  <li key={number}>
                    <b>{number}</b>
                    <span>{label}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <form
            className="audit-form"
            aria-busy={isSubmitting}
            onSubmit={handleAuditSubmit}
          >
            <input
              type="hidden"
              name="access_key"
              value={web3FormsAccessKey}
              readOnly
            />
            <input
              type="hidden"
              name="subject"
              value="Free brand audit registration"
              readOnly
            />
            <input
              type="hidden"
              name="from_name"
              value="Fernesta Website"
              readOnly
            />
            <input
              type="hidden"
              name="privacy_notice_version"
              value="2026-07-24"
              readOnly
            />
            <div className="audit-form-heading">
              <span>Tell us where to look</span>
              <span>About 60 seconds</span>
            </div>
            <label>
              <span>Your name</span>
              <input name="name" autoComplete="name" required />
            </label>
            <label>
              <span>Work email</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
              />
            </label>
            <label>
              <span>Website</span>
              <input
                name="website"
                type="url"
                inputMode="url"
                autoComplete="url"
                placeholder="https://"
                required
              />
            </label>
            <label>
              <span>Instagram handle</span>
              <input
                name="instagram"
                type="text"
                autoComplete="off"
                placeholder="@yourbrand"
              />
            </label>
            <label>
              <span>What needs the most clarity? (Optional)</span>
              <select
                name="challenge"
                value={auditChallenge}
                onChange={(event) => setAuditChallenge(event.target.value)}
              >
                <option value="" disabled>
                  Select one
                </option>
                <option>Positioning and strategy</option>
                <option>Brand identity and story</option>
                <option>Launch planning</option>
                <option>Market entry and GCC launch</option>
                <option>International market entry</option>
                <option>Content and social presence</option>
                <option>Conversion and growth</option>
                <option>Not sure yet</option>
              </select>
            </label>
            <label>
              <span>Anything else we should know?</span>
              <textarea
                name="details"
                rows={4}
                placeholder="Share the context, launch timing, or problem you want us to examine."
              />
            </label>
            <label className="audit-consent">
              <input
                name="privacy_acknowledgement"
                type="checkbox"
                value="Acknowledged"
                required
              />
              <span>
                I understand that Fernesta Digital Private Limited will use
                these details to review this request and contact me about it.{" "}
                <Link href="/privacy" target="_blank">
                  Read the privacy notice
                </Link>
                .
              </span>
            </label>
            <div className="form-honeypot" aria-hidden="true">
              <label htmlFor="company-fax">Company fax</label>
              <input
                id="company-fax"
                name="company_fax"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <button
              type="submit"
              aria-describedby="audit-review-note"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Registering your audit"
                : "Register for my free audit"}
              <span aria-hidden="true">↗</span>
            </button>
            <p className="audit-privacy" id="audit-review-note">
              No automated scorecard. A Fernesta team member reviews the brand
              before replying.
            </p>
            <p className="audit-status" role="status" aria-live="polite">
              {auditStatus}
            </p>
          </form>
        </section>

      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <div className="footer-logo">
            <Image
              src="/prototype/assets/fernesta-lockup-red-transparent.webp"
              alt="Fernesta"
              width={1024}
              height={1024}
              unoptimized
            />
          </div>
          <p>Creative marketing, connected from strategy to market.</p>
        </div>
        <div className="footer-column">
          <span>Contact</span>
          <a href="tel:+918209458984">+91 820 945 8984</a>
          <a href="mailto:info@fernesta.com">info@fernesta.com</a>
          <a href={whatsappUrl}>WhatsApp Business</a>
        </div>
        <div className="footer-column">
          <span>Follow</span>
          <a href={linkedinUrl} target="_blank" rel="noreferrer">
            LinkedIn <i aria-hidden="true">↗</i>
          </a>
          <a href={instagramUrl} target="_blank" rel="noreferrer">
            Instagram <i aria-hidden="true">↗</i>
          </a>
        </div>
        <address className="footer-column footer-location">
          <span>Jaipur office</span>
          <a href={officeMapUrl} target="_blank" rel="noreferrer">
            {officeAddress}
            <small>Open in Google Maps ↗</small>
          </a>
        </address>
        <div className="footer-legal">
          <span>Fernesta Digital Private Limited</span>
          <Link href="/gcc">GCC market entry</Link>
          <Link href="/privacy">Privacy notice</Link>
          <span>© 2026 Fernesta. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
