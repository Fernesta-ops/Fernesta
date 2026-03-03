import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import Reveal from "../Components/Reveal";
import SeoMeta from "../Components/SeoMeta";
import { sendLeadEmail } from "../lib/leadMailer";

const phases = [
  {
    title: "Phase 1 - Foundation (Month 1-2)",
    detail: "Brand system, service tiers, first framework, and website readiness.",
  },
  {
    title: "Phase 2 - First Revenue (Month 2-4)",
    detail: "First retainer conversion, founder-led delivery, and framework refinement.",
  },
  {
    title: "Phase 3 - Early Scale (Month 4-8)",
    detail: "Standardized reporting, 3-4 active retainers, and specialist network curation.",
  },
  {
    title: "Phase 4 - Consolidation (Month 8-12)",
    detail: "Case studies, thought leadership, and operating readiness for Year 2 growth.",
  },
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  message: "",
};

function ContactPage() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState(initialForm);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.company || !formData.service || !formData.message) {
      setStatus("error");
      setMessage("Please fill all required fields.");
      return;
    }

    try {
      setSubmitting(true);
      setStatus("idle");
      await sendLeadEmail({
        subject: `Consultation Request - ${formData.company}`,
        formName: "Contact Form",
        fields: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          interested_service: formData.service,
          business_goals: formData.message,
          source: "fernesta.com/contact-us",
        },
      });
      setStatus("success");
      setMessage("Inquiry submitted successfully. Our team will contact you within 1 business day.");
      setFormData(initialForm);
    } catch {
      setStatus("error");
      setMessage("Submission failed. Please try again or email info@fernesta.com.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SeoMeta
        title="Contact Fernesta | Digital Marketing Agency in Jaipur"
        description="Contact Fernesta, a digital marketing agency in Jaipur, for SEO, Google Ads, social media marketing, and website growth consultation."
        keywords="contact digital marketing agency Jaipur, SEO consultation Jaipur, PPC agency Jaipur contact"
      />

      <section className="page-hero hero-contact">
        <div className="hero-overlay" />
        <div className="container hero-grid hero-grid-single">
          <Reveal className="hero-copy" delayMs={80}>
            <p className="meta">Contact Us</p>
            <h1>Contact Fernesta for SEO, Paid Ads, and Website Growth in Jaipur.</h1>
            <p>
              Share your current growth stage and channel challenges. We will map the right service mix and execution cadence for your Jaipur business.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section-border">
        <div className="container split-layout">
          <Reveal delayMs={80}>
            <article className="panel contact-card interactive-card">
              <p className="meta">Strategy Intake</p>
              <h2>Book a Digital Marketing Consultation Call</h2>
              <form className="contact-form" onSubmit={handleSubmit}>
                <label>
                  Name
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                    placeholder="Your full name"
                  />
                </label>
                <label>
                  Work Email
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                    placeholder="name@company.com"
                  />
                </label>
                <label>
                  Phone
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(event) => setFormData((prev) => ({ ...prev, phone: event.target.value }))}
                    placeholder="99999 99999"
                  />
                </label>
                <label>
                  Company
                  <input
                    required
                    type="text"
                    value={formData.company}
                    onChange={(event) => setFormData((prev) => ({ ...prev, company: event.target.value }))}
                    placeholder="Your business name"
                  />
                </label>
                <label>
                  Interested Service
                  <select
                    required
                    value={formData.service}
                    onChange={(event) => setFormData((prev) => ({ ...prev, service: event.target.value }))}
                  >
                    <option value="" disabled>
                      Select service
                    </option>
                    <option>Search Engine Optimization</option>
                    <option>Performance Marketing</option>
                    <option>Social Media Management</option>
                    <option>Website Design and Development</option>
                    <option>Branding and Visual Identity</option>
                    <option>E-Commerce Growth</option>
                  </select>
                </label>
                <label>
                  Business Goals
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
                    placeholder="Tell us your current challenge and growth target."
                  />
                </label>
                <button className="button button-primary" type="submit" disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit Inquiry"}
                </button>
              </form>
              {message && (
                <p
                  aria-live="polite"
                  className={status === "success" ? "contact-message contact-success" : "contact-message contact-error"}
                >
                  {message}
                </p>
              )}
              <div className="contact-details">
                <p><strong>Fernesta Digital Marketing Agency</strong></p>
                <p>Jaipur, Rajasthan, India</p>
                <p>Email: info@fernesta.com</p>
                <p>Phone: +91 701 412 7724</p>
                <p>Working Hours: Monday-Saturday, 9:00 AM to 7:00 PM IST</p>
                <p>Response time: within 1 business day</p>
              </div>
            </article>
          </Reveal>
          <Reveal delayMs={180}>
            <figure className="media-card interactive-card">
              <img
                src="/images/pages/contact/section/strategy-session.jpg"
                alt="Client strategy planning session with the Fernesta team"
              />
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="section section-border">
        <div className="container">
          <Reveal className="section-head">
            <p className="meta">Office Location</p>
            <h2>Find Us in Jaipur</h2>
          </Reveal>
          <Reveal>
            <div className="panel interactive-card map-embed">
              <iframe
                title="Fernesta location map - Jaipur"
                src="https://www.google.com/maps?q=Jaipur%2C%20Rajasthan&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-border">
        <div className="container">
          <Reveal className="section-head">
            <p className="meta">Operating Cadence</p>
            <h2>How We Deliver Digital Marketing Services with Structured Execution</h2>
          </Reveal>
          <div className="card-grid card-grid-two">
            {phases.map((phase, index) => (
              <Reveal key={phase.title} delayMs={90 * (index + 1)}>
                <article className="panel interactive-card">
                  <h3>{phase.title}</h3>
                  <p>{phase.detail}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-border">
        <div className="container">
          <div className="button-row">
            <Link className="button button-secondary" to="/services">
              See Service Details
            </Link>
            <Link className="button button-secondary" to="/case-studies">
              Read Success Stories
            </Link>
            <Link className="button button-primary" to="/">
              Back to Homepage
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactPage;
