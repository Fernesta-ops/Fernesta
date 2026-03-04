import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
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

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name."),
  email: z.string().trim().email("Please enter a valid work email."),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9()\-.\s]{8,20}$/, "Please enter a valid phone number."),
  company: z.string().trim().min(2, "Please enter your business name."),
  service: z.string().trim().min(1, "Please select a service."),
  message: z.string().trim().min(20, "Please share at least 20 characters about your goals."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const initialForm: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  message: "",
};

function ContactPage() {
  const [websiteTrap, setWebsiteTrap] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: initialForm,
  });

  const onSubmit = async (values: ContactFormValues) => {
    const loadingToast = toast.loading("Submitting inquiry...");
    try {
      await sendLeadEmail({
        subject: `Consultation Request - ${values.company}`,
        formName: "Contact Form",
        fields: {
          name: values.name,
          email: values.email,
          phone: values.phone,
          company: values.company,
          interested_service: values.service,
          business_goals: values.message,
          website: websiteTrap.trim(),
          source: "fernesta.com/contact-us",
        },
      });
      toast.success("Inquiry submitted successfully. Our team will contact you within 1 business day.", {
        id: loadingToast,
      });
      reset(initialForm);
    } catch (error) {
      const reason = error instanceof Error ? error.message : "Please try again.";
      toast.error(`Submission failed. ${reason} If this continues, email info@fernesta.com.`, {
        id: loadingToast,
      });
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
              <form className="contact-form" noValidate onSubmit={handleSubmit(onSubmit)}>
                <label className="honeypot-field" aria-hidden="true">
                  Website
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={websiteTrap}
                    onChange={(event) => setWebsiteTrap(event.target.value)}
                  />
                </label>
                <label>
                  Name
                  <input
                    type="text"
                    placeholder="Your full name"
                    autoComplete="name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    {...register("name")}
                  />
                  {errors.name && (
                    <span id="contact-name-error" className="field-error" role="alert">
                      {errors.name.message}
                    </span>
                  )}
                </label>
                <label>
                  Work Email
                  <input
                    type="email"
                    placeholder="name@company.com"
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    {...register("email")}
                  />
                  {errors.email && (
                    <span id="contact-email-error" className="field-error" role="alert">
                      {errors.email.message}
                    </span>
                  )}
                </label>
                <label>
                  Phone
                  <input
                    type="tel"
                    placeholder="99999 99999"
                    autoComplete="tel"
                    inputMode="tel"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "contact-phone-error" : undefined}
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <span id="contact-phone-error" className="field-error" role="alert">
                      {errors.phone.message}
                    </span>
                  )}
                </label>
                <label>
                  Company
                  <input
                    type="text"
                    placeholder="Your business name"
                    autoComplete="organization"
                    aria-invalid={Boolean(errors.company)}
                    aria-describedby={errors.company ? "contact-company-error" : undefined}
                    {...register("company")}
                  />
                  {errors.company && (
                    <span id="contact-company-error" className="field-error" role="alert">
                      {errors.company.message}
                    </span>
                  )}
                </label>
                <label>
                  Interested Service
                  <select
                    aria-invalid={Boolean(errors.service)}
                    aria-describedby={errors.service ? "contact-service-error" : undefined}
                    {...register("service")}
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
                    <option>PR and Influencer Management</option>
                  </select>
                  {errors.service && (
                    <span id="contact-service-error" className="field-error" role="alert">
                      {errors.service.message}
                    </span>
                  )}
                </label>
                <label>
                  Business Goals
                  <textarea
                    rows={4}
                    placeholder="Tell us your current challenge and growth target."
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                    {...register("message")}
                  />
                  {errors.message && (
                    <span id="contact-message-error" className="field-error" role="alert">
                      {errors.message.message}
                    </span>
                  )}
                </label>
                <button className="button button-primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                </button>
                <p className="contact-form-note">
                  By submitting, you agree to be contacted about your inquiry.
                </p>
              </form>
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
                src="/images/pages/contact/section/strategy-session-opt.jpg"
                alt="Client strategy planning session with the Fernesta team"
                loading="lazy"
                decoding="async"
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
