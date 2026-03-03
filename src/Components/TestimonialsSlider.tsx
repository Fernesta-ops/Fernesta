import { useEffect, useState } from "react";
import Reveal from "./Reveal";

const testimonials = [
  {
    quote:
      "We moved from scattered freelancers to one accountable system. Reporting clarity improved in the first month.",
    person: "Founder, D2C Beauty Brand",
  },
  {
    quote:
      "The biggest shift was governance. Every campaign now has ownership, metrics, and next actions.",
    person: "Director, Education Business",
  },
  {
    quote:
      "Our CPL dropped while lead quality improved because tracking and creative decisions became data-led.",
    person: "Marketing Head, B2B Services Company",
  },
];

function TestimonialsSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="section section-border">
      <div className="container">
        <Reveal className="section-head">
          <p className="meta">Client Feedback</p>
          <h2>What Engagement Feels Like in Practice</h2>
        </Reveal>
        <Reveal>
          <article className="panel testimonial-card interactive-card">
            <p className="testimonial-quote">"{testimonials[active].quote}"</p>
            <p className="testimonial-person">{testimonials[active].person}</p>
            <div className="testimonial-controls">
              <button
                type="button"
                className="filter-pill"
                onClick={() => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              >
                Previous
              </button>
              <button
                type="button"
                className="filter-pill"
                onClick={() => setActive((prev) => (prev + 1) % testimonials.length)}
              >
                Next
              </button>
            </div>
            <div className="testimonial-dots" aria-hidden="true">
              {testimonials.map((_, index) => (
                <span key={index} className={index === active ? "dot dot-active" : "dot"} />
              ))}
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

export default TestimonialsSlider;
