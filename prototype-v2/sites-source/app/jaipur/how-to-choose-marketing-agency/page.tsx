import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MarketSelector from "../../MarketSelector";
import { twitterCard } from "../../seo";
import "../../fernesta.css";
import "../../gcc/gcc.css";
import "../jaipur.css";
import "./guide.css";

const pageTitle = "How to Choose a Marketing Agency in Jaipur | Fernesta";
const pageDescription =
  "A practical guide to comparing marketing agencies in Jaipur by strategy, evidence, senior access, connected execution, scope, and measurement.";
const pageUrl =
  "https://www.fernesta.com/jaipur/how-to-choose-marketing-agency";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "how to choose a marketing agency in Jaipur",
    "best marketing companies in Jaipur",
    "compare digital marketing agencies Jaipur",
    "marketing agency selection criteria",
    "branding agency Jaipur",
    "performance marketing agency Jaipur",
  ],
  alternates: {
    canonical: "/jaipur/how-to-choose-marketing-agency",
  },
  openGraph: {
    type: "article",
    url: pageUrl,
    title: pageTitle,
    description: pageDescription,
    publishedTime: "2026-07-26",
    modifiedTime: "2026-07-26",
    authors: ["Fernesta Strategy Team"],
    images: [
      {
        url: "/og.jpg",
        width: 1733,
        height: 907,
        alt: "Fernesta guide to choosing a marketing agency in Jaipur",
      },
    ],
  },
  twitter: twitterCard(pageTitle, pageDescription),
};

const evaluationCriteria = [
  {
    number: "01",
    title: "Strategic depth",
    answer:
      "A strong agency should be able to explain the customer, category, positioning, offer, and commercial priority before it recommends channels or deliverables.",
    inspect: [
      "The diagnosis is specific to your business rather than copied from a standard proposal.",
      "Recommendations distinguish the underlying decision from the output used to express it.",
      "The team can explain what it would not do yet, and why.",
    ],
  },
  {
    number: "02",
    title: "Relevant evidence",
    answer:
      "Look for evidence that shows the starting condition, intervention, timeframe, and operating change—not a result number detached from its context.",
    inspect: [
      "Case studies identify what changed in the work and how the result was measured.",
      "The agency separates context-specific outcomes from promises about your future performance.",
      "References are relevant to the problem, even when the category is different.",
    ],
  },
  {
    number: "03",
    title: "Senior access",
    answer:
      "The people diagnosing and selling the engagement should remain meaningfully involved after appointment, especially at decision points.",
    inspect: [
      "You know who owns strategy, creative direction, delivery, and reporting.",
      "Senior review is part of the operating rhythm rather than reserved for escalations.",
      "The proposal makes the working team visible instead of relying only on leadership biographies.",
    ],
  },
  {
    number: "04",
    title: "Connected execution",
    answer:
      "If the business problem crosses brand, creative, media, content, conversion, or operations, the agency should show how those decisions stay connected.",
    inspect: [
      "Messaging used in campaigns matches the positioning and landing experience.",
      "Creative testing and media learning inform one another.",
      "Ownership is clear when specialists or external partners are involved.",
    ],
  },
  {
    number: "05",
    title: "Useful measurement",
    answer:
      "Reporting should improve decisions. A dashboard alone is not a measurement strategy.",
    inspect: [
      "Success measures connect to the stated commercial objective.",
      "The review cadence leads to decisions about audience, offer, creative, journey, or investment.",
      "The agency explains attribution limits and what the available data can genuinely support.",
    ],
  },
] as const;

const scorecardRows = [
  {
    criterion: "Problem diagnosis",
    strongSignal:
      "The agency identifies the decision behind the requested deliverable.",
    weight: "20%",
  },
  {
    criterion: "Relevant evidence",
    strongSignal:
      "Cases include context, intervention, timeframe, and limitations.",
    weight: "20%",
  },
  {
    criterion: "Team and senior access",
    strongSignal:
      "Named decision-makers remain involved through delivery and review.",
    weight: "15%",
  },
  {
    criterion: "Scope clarity",
    strongSignal:
      "Outputs, dependencies, assumptions, exclusions, and approvals are explicit.",
    weight: "15%",
  },
  {
    criterion: "Connected execution",
    strongSignal:
      "Strategy, creative, content, media, conversion, and learning share one thread.",
    weight: "15%",
  },
  {
    criterion: "Measurement quality",
    strongSignal:
      "Measures lead to decisions and acknowledge attribution limits.",
    weight: "15%",
  },
] as const;

const questions = [
  {
    question: "What problem would you solve first, and why?",
    reason:
      "This reveals whether the agency can prioritise or is simply accepting the requested list of deliverables.",
  },
  {
    question: "Who will make the key decisions after we appoint you?",
    reason:
      "This distinguishes the proposal team from the team that will actually run the work.",
  },
  {
    question: "What evidence supports this recommendation?",
    reason:
      "A credible answer should combine your current signals, relevant experience, and testable assumptions.",
  },
  {
    question: "What is excluded, dependent, or still unknown?",
    reason:
      "Good scopes make uncertainty visible before it becomes a change request or delivery dispute.",
  },
  {
    question: "How will reporting change what we do next?",
    reason:
      "This tests whether measurement is designed for decisions rather than presentation.",
  },
  {
    question: "When would you recommend that we do less?",
    reason:
      "The answer shows whether the agency protects focus or defaults to a larger retainer.",
  },
] as const;

const faq = [
  {
    question: "Which is the best marketing agency in Jaipur?",
    answer:
      "There is no universally best agency. The right choice depends on the problem, category, commercial stage, internal team, budget, and kind of support required. Compare agencies using a written brief, evidence, senior access, scope clarity, connected execution, and measurement quality.",
  },
  {
    question: "Should I choose a specialist or a full-service agency?",
    answer:
      "Choose a specialist when the need is narrow and the surrounding decisions are already strong. Choose a connected agency when the problem crosses positioning, brand, creative, content, acquisition, conversion, or measurement. The label matters less than whether ownership and dependencies are clear.",
  },
  {
    question: "How many agencies should I compare?",
    answer:
      "A shortlist of three or four is usually enough to reveal meaningful differences without turning the process into a speculative pitch exercise. Give every shortlisted agency the same core brief and decision criteria.",
  },
  {
    question: "What should a marketing agency proposal include?",
    answer:
      "It should include the agency's understanding of the problem, recommended approach, scope and outputs, working team, timeline, client dependencies, approvals, exclusions, fees, measurement approach, and what happens when assumptions change.",
  },
  {
    question: "How should I compare agency fees?",
    answer:
      "Compare the problem covered, senior involvement, outputs, dependencies, media or production exclusions, review cadence, and measurement—not only the monthly number. Two proposals with similar totals may contain very different levels of responsibility.",
  },
  {
    question: "Does Fernesta work with businesses outside Jaipur?",
    answer:
      "Yes. Fernesta is headquartered in Jaipur and works with businesses across India. It also supports selective GCC, European, and United States market-entry work when appropriate in-market expertise can be confirmed.",
  },
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      "@id": `${pageUrl}#article`,
      headline: pageTitle,
      description: pageDescription,
      url: pageUrl,
      mainEntityOfPage: pageUrl,
      datePublished: "2026-07-26",
      dateModified: "2026-07-26",
      inLanguage: "en-IN",
      image: "https://www.fernesta.com/og.jpg",
      author: {
        "@type": "Organization",
        "@id": "https://www.fernesta.com/#organization",
        name: "Fernesta Strategy Team",
      },
      publisher: {
        "@type": "Organization",
        "@id": "https://www.fernesta.com/#organization",
        name: "Fernesta Digital Private Limited",
        logo: {
          "@type": "ImageObject",
          url: "https://www.fernesta.com/prototype/assets/fernesta-monogram.png",
        },
      },
      about: [
        { "@type": "Thing", name: "Marketing agency selection" },
        { "@type": "City", name: "Jaipur" },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.fernesta.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Marketing agency in Jaipur",
          item: "https://www.fernesta.com/jaipur",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "How to choose a marketing agency",
          item: pageUrl,
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
};

export default function JaipurAgencyGuidePage() {
  return (
    <div className="gcc-page agency-guide-page">
      <a className="skip-link" href="#guide-content">
        Skip to the agency selection guide
      </a>

      <header className="gcc-header">
        <Link className="gcc-logo" href="/" aria-label="Fernesta home">
          <Image
            src="/prototype/assets/fernesta-lockup-red-transparent.webp"
            alt="Fernesta"
            width={1024}
            height={1024}
            priority
            unoptimized
          />
        </Link>
        <nav aria-label="Agency guide navigation">
          <Link href="/jaipur">Jaipur agency</Link>
          <a href="#scorecard">Scorecard</a>
          <Link
            className="gcc-nav-cta"
            href="/?challenge=Not%20sure%20yet#brand-audit"
          >
            Discuss your challenge <span aria-hidden="true">↗</span>
          </Link>
          <MarketSelector />
        </nav>
      </header>

      <main id="guide-content">
        <article>
          <header className="guide-hero">
            <div className="guide-hero-copy">
              <p className="gcc-eyebrow">
                Jaipur agency selection guide · 2026
              </p>
              <h1>How to choose a marketing agency in Jaipur.</h1>
              <p className="guide-dek">
                Compare the thinking, evidence, people, scope, and measurement
                behind the proposal—not the volume of services or the confidence
                of a “best agency” claim.
              </p>
              <div className="guide-byline">
                <span>By Fernesta Strategy Team</span>
                <time dateTime="2026-07-26">Published 26 July 2026</time>
                <span>Practical buyer guide</span>
              </div>
            </div>
            <aside className="guide-answer" aria-labelledby="short-answer-title">
              <span>Short answer</span>
              <h2 id="short-answer-title">
                What should you look for in a marketing agency?
              </h2>
              <p>
                Look for a precise diagnosis, relevant evidence, access to the
                people making decisions, a scope that makes dependencies clear,
                connected execution, and measurement that changes what happens
                next. The best fit is the agency that can solve your specific
                problem responsibly—not the one with the longest service list.
              </p>
            </aside>
          </header>

          <nav className="guide-contents" aria-label="On this page">
            <span>On this page</span>
            <a href="#start-with-problem">Start with the problem</a>
            <a href="#criteria">Five evaluation criteria</a>
            <a href="#questions">Questions to ask</a>
            <a href="#scope-fees">Scope and fees</a>
            <a href="#scorecard">Decision scorecard</a>
            <a href="#brief">Brief template</a>
          </nav>

          <section
            className="guide-section guide-opening"
            id="start-with-problem"
            aria-labelledby="problem-title"
          >
            <div className="guide-section-label">
              <span>01</span>
              <span>Define the decision</span>
            </div>
            <div className="guide-prose">
              <h2 id="problem-title">
                Start with the business problem, not the agency category.
              </h2>
              <p>
                “We need digital marketing” is too broad to produce a useful
                comparison. One agency may interpret it as social content,
                another as paid acquisition, and another as SEO or website
                development. All could submit polished proposals while solving
                different problems.
              </p>
              <p>
                Before creating a shortlist, write down the change the business
                needs. Is the position unclear? Does the brand feel
                inconsistent? Is acquisition becoming expensive? Are visits
                failing to convert? Does content lack a repeatable point of
                view? Is a launch approaching without a market sequence?
              </p>
              <p>
                This first definition helps you decide whether you need a
                specialist, a connected agency, or an internal capability. It
                also gives every agency the same starting point, making their
                reasoning easier to compare.
              </p>
              <aside>
                <strong>A useful one-sentence brief</strong>
                <p>
                  “We need to change <em>[current condition]</em> for{" "}
                  <em>[specific audience]</em> so that{" "}
                  <em>[commercial outcome]</em> becomes possible within{" "}
                  <em>[timeframe]</em>.”
                </p>
              </aside>
            </div>
          </section>

          <section
            className="guide-section guide-criteria"
            id="criteria"
            aria-labelledby="criteria-title"
          >
            <div className="guide-section-label">
              <span>02</span>
              <span>Compare what matters</span>
            </div>
            <div>
              <div className="guide-prose">
                <h2 id="criteria-title">
                  Five criteria for comparing marketing companies in Jaipur.
                </h2>
                <p>
                  Use the same criteria for every shortlisted agency. You are
                  evaluating the quality of the proposed working relationship,
                  not trying to award points for the most capabilities.
                </p>
              </div>
              <div className="guide-criteria-list">
                {evaluationCriteria.map((criterion) => (
                  <section key={criterion.title}>
                    <span>{criterion.number}</span>
                    <div>
                      <h3>{criterion.title}</h3>
                      <p>{criterion.answer}</p>
                      <strong>What to inspect</strong>
                      <ul>
                        {criterion.inspect.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </section>

          <section
            className="guide-section guide-questions"
            id="questions"
            aria-labelledby="questions-title"
          >
            <div className="guide-section-label">
              <span>03</span>
              <span>Use the conversation</span>
            </div>
            <div>
              <div className="guide-prose">
                <h2 id="questions-title">
                  Six questions that reveal how an agency thinks.
                </h2>
                <p>
                  Ask every shortlisted team the same questions. The useful
                  difference is usually in the reasoning, trade-offs, and
                  willingness to make uncertainty visible.
                </p>
              </div>
              <ol>
                {questions.map((item, index) => (
                  <li key={item.question}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{item.question}</h3>
                    <p>{item.reason}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section
            className="guide-section guide-scope"
            id="scope-fees"
            aria-labelledby="scope-title"
          >
            <div className="guide-section-label">
              <span>04</span>
              <span>Read beyond the total</span>
            </div>
            <div className="guide-prose">
              <h2 id="scope-title">
                Compare responsibility before comparing fees.
              </h2>
              <p>
                A lower monthly fee is not automatically better value, and a
                larger retainer is not automatically more strategic. Compare
                what each agency is responsible for, which decisions remain
                with your team, what production or media costs sit outside the
                fee, and how often senior review occurs.
              </p>
              <p>
                Check whether the scope includes research, positioning,
                messaging, creative concepts, production, channel management,
                landing-page decisions, tracking, reporting, and optimisation—or
                assumes that some of these already exist. Hidden assumptions
                make apparently similar proposals difficult to compare.
              </p>
              <h3>Every scope should make these items explicit</h3>
              <ul className="guide-checklist">
                <li>The problem and objective being addressed</li>
                <li>Outputs, formats, quantities, and review rounds</li>
                <li>Named owners and senior decision points</li>
                <li>Inputs, access, approvals, and client dependencies</li>
                <li>Media, production, technology, and specialist exclusions</li>
                <li>Timeline, milestones, and consequences of delayed feedback</li>
                <li>Success measures, reporting rhythm, and decision cadence</li>
                <li>How additional work or changed assumptions will be handled</li>
              </ul>
            </div>
          </section>

          <section
            className="guide-section guide-evidence"
            aria-labelledby="evidence-title"
          >
            <div className="guide-section-label">
              <span>05</span>
              <span>Examine the proof</span>
            </div>
            <div className="guide-prose">
              <h2 id="evidence-title">
                A case study should make the work inspectable.
              </h2>
              <p>
                Treat a headline metric as the beginning of a question, not the
                end of one. Ask what the baseline was, what changed, over what
                period, which external conditions mattered, and how the result
                was measured. If client confidentiality limits what can be
                published, the agency should still be able to explain the
                decision sequence and operating shift.
              </p>
              <p>
                Fernesta’s{" "}
                <Link href="/work">selected anonymized work</Link> follows this
                standard by showing the challenge, intervention, timeframe,
                before-and-after evidence, and limitations. The outcomes are
                context-specific and are not presented as guarantees.
              </p>
              <div className="guide-evidence-links">
                <Link href="/work/d2c-skincare-performance-turnaround">
                  D2C acquisition system · 3.2x blended ROAS
                  <span aria-hidden="true">↗</span>
                </Link>
                <Link href="/work/consumer-retail-brand-retention">
                  Retail brand and retention · 42% returning-customer lift
                  <span aria-hidden="true">↗</span>
                </Link>
                <Link href="/work/boutique-hospitality-social-pr-launch">
                  Hospitality launch · 3.6x qualified event enquiries
                  <span aria-hidden="true">↗</span>
                </Link>
                <Link href="/work/distribution-workflow-automation-reset">
                  B2B operations · 72% faster lead-to-quote turnaround
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </section>

          <section
            className="guide-scorecard"
            id="scorecard"
            aria-labelledby="scorecard-title"
          >
            <div>
              <span>Decision tool</span>
              <h2 id="scorecard-title">A simple agency comparison scorecard.</h2>
              <p>
                Score each agency from one to five against the same evidence.
                Multiply the score by the suggested weight, then discuss the
                largest differences with the people who will work with the
                appointed team.
              </p>
            </div>
            <div className="guide-table-wrap">
              <table>
                <caption>
                  Suggested criteria and weights for comparing marketing
                  agencies
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Criterion</th>
                    <th scope="col">What strong looks like</th>
                    <th scope="col">Weight</th>
                  </tr>
                </thead>
                <tbody>
                  {scorecardRows.map((row) => (
                    <tr key={row.criterion}>
                      <th scope="row">{row.criterion}</th>
                      <td>{row.strongSignal}</td>
                      <td>{row.weight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section
            className="guide-section guide-red-flags"
            aria-labelledby="red-flags-title"
          >
            <div className="guide-section-label">
              <span>06</span>
              <span>Notice the warning signs</span>
            </div>
            <div className="guide-prose">
              <h2 id="red-flags-title">
                Red flags in an agency selection process.
              </h2>
              <ul>
                <li>
                  Guaranteed search rankings, revenue, reach, or return without
                  access to the conditions required to support that promise
                </li>
                <li>
                  A channel plan presented before the audience, offer, position,
                  journey, or commercial constraint has been understood
                </li>
                <li>
                  Case-study metrics with no baseline, timeframe, intervention,
                  measurement method, or context
                </li>
                <li>
                  A senior pitch team that disappears from the proposed
                  operating model
                </li>
                <li>
                  A scope that hides production, media, technology, approvals,
                  or client dependencies
                </li>
                <li>
                  Reporting designed around activity volume with no clear
                  connection to business decisions
                </li>
              </ul>
            </div>
          </section>

          <section
            className="guide-section guide-brief"
            id="brief"
            aria-labelledby="brief-title"
          >
            <div className="guide-section-label">
              <span>07</span>
              <span>Prepare a fair brief</span>
            </div>
            <div className="guide-prose">
              <h2 id="brief-title">
                What to include when briefing a Jaipur marketing agency.
              </h2>
              <p>
                A useful brief does not need to prescribe the solution. It
                should give the agency enough evidence to understand the
                condition, constraints, and decision.
              </p>
              <ol className="guide-brief-list">
                <li>
                  <strong>Business context:</strong> what the company sells, to
                  whom, where, and how the current model works
                </li>
                <li>
                  <strong>Current condition:</strong> the visible brand,
                  channel, customer, conversion, or operating issue
                </li>
                <li>
                  <strong>Desired change:</strong> what should become possible,
                  not only what should be produced
                </li>
                <li>
                  <strong>Evidence:</strong> relevant customer research,
                  channel data, sales patterns, prior work, and known limits
                </li>
                <li>
                  <strong>Internal capability:</strong> who owns decisions,
                  content, sales, product, technology, and approvals
                </li>
                <li>
                  <strong>Constraints:</strong> timing, budget range, regulated
                  claims, technology, geography, production, or distribution
                </li>
                <li>
                  <strong>Selection process:</strong> decision criteria,
                  stakeholders, required proposal content, and appointment date
                </li>
              </ol>
              <p>
                Share the same core information with every shortlisted agency.
                A fair process produces more comparable thinking and reduces the
                incentive for speculative creative work.
              </p>
            </div>
          </section>

          <section className="guide-faq" aria-labelledby="guide-faq-title">
            <div>
              <span>Related questions</span>
              <h2 id="guide-faq-title">Clear answers before you shortlist.</h2>
            </div>
            <div>
              {faq.map((item, index) => (
                <details key={item.question}>
                  <summary>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{item.question}</strong>
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="guide-related" aria-labelledby="related-title">
            <div>
              <span>Continue the evaluation</span>
              <h2 id="related-title">See how Fernesta approaches the work.</h2>
            </div>
            <div>
              <Link href="/jaipur">
                Fernesta as a Jaipur marketing agency{" "}
                <span aria-hidden="true">↗</span>
              </Link>
              <Link href="/services">
                Connected marketing services <span aria-hidden="true">↗</span>
              </Link>
              <Link href="/work">
                Selected anonymized evidence <span aria-hidden="true">↗</span>
              </Link>
              <Link href="/?challenge=Not%20sure%20yet#brand-audit">
                Start with a free brand audit{" "}
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </section>
        </article>
      </main>

      <footer className="gcc-footer">
        <Link href="/">Fernesta Digital Private Limited</Link>
        <Link href="/jaipur">Marketing agency in Jaipur</Link>
        <a href="mailto:info@fernesta.com">info@fernesta.com</a>
        <Link href="/privacy">Privacy notice</Link>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </div>
  );
}
