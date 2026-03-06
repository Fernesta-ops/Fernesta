import { useState } from "react";
import Reveal from "./Reveal";

const faqs = [
  {
    q: "How soon can Fernesta start service delivery?",
    a: "After a strategy intake and scope finalization, onboarding usually starts within 5-7 business days.",
  },
  {
    q: "Do you provide SEO and paid ads together?",
    a: "Yes. We build integrated plans where SEO, Google Ads, and Meta Ads support the same business goals for Jaipur businesses.",
  },
  {
    q: "How is reporting handled across channels?",
    a: "You receive a standardized reporting cadence with channel performance, lead quality, and next actions.",
  },
  {
    q: "Is website optimization included in marketing engagements?",
    a: "Yes. Landing page optimization and conversion-focused UX improvements are part of growth delivery.",
  },
  {
    q: "Does Fernesta offer PR and influencer marketing services?",
    a: "Yes. We manage end-to-end PR campaigns and influencer partnerships — from media outreach and press release writing to influencer brief creation, campaign execution, and ROI tracking.",
  },
];

function ServiceFaq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="section section-border">
      <div className="container">
        <Reveal className="section-head">
          <p className="meta">Service FAQ</p>
          <h2>Common Questions Before You Start</h2>
        </Reveal>
        <div className="faq-list">
          {faqs.map((item, index) => {
            const isOpen = open === index;
            return (
              <Reveal key={item.q} delayMs={70 * (index + 1)}>
                <article className={isOpen ? "panel faq-item faq-item-open" : "panel faq-item interactive-card"}>
                  <button
                    type="button"
                    className="faq-q"
                    onClick={() => setOpen((prev) => (prev === index ? -1 : index))}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-q-text">{item.q}</span>
                    <span className="faq-icon" aria-hidden="true">
                      {isOpen ? "-" : "+"}
                    </span>
                  </button>
                  {isOpen && <p className="faq-a">{item.a}</p>}
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ServiceFaq;
