import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Reveal from "../Components/Reveal";
import SeoMeta from "../Components/SeoMeta";
import { sendLeadEmail, trackLeadEvent } from "../lib/leadMailer";

const WHATSAPP_NUMBER = "918209458984";
const WHATSAPP_TEXT = encodeURIComponent(
  "Hi Fernesta Events, I want to plan an event. Here are my details: Event type - , Date - , City - , Guests - , Budget - "
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_TEXT}`;

const eventSegments = [
  {
    title: "Private Celebrations",
    detail: "Birthdays, anniversaries, intimate dinners, house parties, and milestone celebrations with clear vendor and guest coordination.",
  },
  {
    title: "Corporate and Founder Events",
    detail: "Launches, team gatherings, networking evenings, workshops, and founder-led community formats.",
  },
  {
    title: "Brand Activations",
    detail: "Small-format pop-ups, creator meets, product showcases, and offline experiences built to create social proof.",
  },
  {
    title: "College and Youth Formats",
    detail: "Fests, mixers, community nights, creator-led formats, and high-energy event concepts with controlled execution.",
  },
];

const leadSystem = [
  {
    title: "Instagram Capture",
    detail: "Bio links, story CTAs, saved replies, and campaign tags route interested people to WhatsApp or the events intake page.",
  },
  {
    title: "Website Intake",
    detail: "The events form captures event type, date, city, guest count, budget band, and requirements with pipeline tagging.",
  },
  {
    title: "WhatsApp Qualification",
    detail: "Qualified leads receive a fast WhatsApp reply path for missing details, consultation scheduling, and proposal movement.",
  },
  {
    title: "Proposal Handoff",
    detail: "Every inquiry gets a source, stage, owner, next action, and follow-up date so no social lead stays buried in DMs.",
  },
];

const packages = [
  {
    title: "Event Planning Sprint",
    detail: "Concept, budget range, venue shortlisting, vendor brief, and day-flow plan for smaller events that need structure fast.",
  },
  {
    title: "End-to-End Celebration Management",
    detail: "Planning, vendor coordination, guest communication, production checklist, and on-ground execution support.",
  },
  {
    title: "Brand Activation Buildout",
    detail: "Offline event concept, creator/social angle, invite flow, RSVP tracking, and post-event content handoff.",
  },
];

const inquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name."),
  email: z.string().trim().email("Please enter a valid email."),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9()\-.\s]{8,20}$/, "Please enter a valid phone number."),
  eventType: z.string().trim().min(1, "Please select an event type."),
  eventDate: z.string().trim().min(2, "Please share the date or tentative month."),
  eventCity: z.string().trim().min(2, "Please enter the event city."),
  guestCount: z.string().trim().min(1, "Please select the guest range."),
  budgetRange: z.string().trim().min(1, "Please select a budget range."),
  message: z.string().trim().min(20, "Please share at least 20 characters about the event."),
});

type InquiryFormValues = z.infer<typeof inquirySchema>;

const initialForm: InquiryFormValues = {
  name: "",
  email: "",
  phone: "",
  eventType: "",
  eventDate: "",
  eventCity: "",
  guestCount: "",
  budgetRange: "",
  message: "",
};

const formatIndex = (index: number) => String(index + 1).padStart(2, "0");

function EventsPage() {
  const [websiteTrap, setWebsiteTrap] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: initialForm,
  });

  const onSubmit = async (values: InquiryFormValues) => {
    const loadingToast = toast.loading("Submitting events inquiry...");
    const source =
      typeof window === "undefined"
        ? "fernesta.com/events"
        : `fernesta.com/events${window.location.search}`;

    try {
      await sendLeadEmail({
        subject: `Fernesta Events Inquiry - ${values.eventType} - ${values.eventCity}`,
        formName: "Fernesta Events Inquiry",
        fields: {
          pipeline: "fernesta_events",
          name: values.name,
          email: values.email,
          phone: values.phone,
          event_type: values.eventType,
          event_date: values.eventDate,
          event_city: values.eventCity,
          guest_count: values.guestCount,
          budget_range: values.budgetRange,
          event_requirements: values.message,
          website: websiteTrap.trim(),
          source,
        },
      });
      toast.success("Events inquiry submitted. We will follow up with next steps shortly.", {
        id: loadingToast,
      });
      reset(initialForm);
      setWebsiteTrap("");
    } catch (error) {
      const reason = error instanceof Error ? error.message : "Please try again.";
      toast.error(`Submission failed. ${reason} If this continues, WhatsApp us directly.`, {
        id: loadingToast,
      });
    }
  };

  const handleWhatsAppClick = () => {
    const source =
      typeof window === "undefined"
        ? "fernesta.com/events"
        : `fernesta.com/events${window.location.search}`;

    trackLeadEvent({
      eventName: "whatsapp_click",
      fields: {
        pipeline: "fernesta_events",
        source,
        lead_source: "events_website_whatsapp_cta",
        whatsapp_number: WHATSAPP_NUMBER,
        stage: "WhatsApp Started",
      },
    });
  };

  return (
    <>
      <SeoMeta
        title="Fernesta Events | Event Planning, Brand Activations, and WhatsApp Lead Capture"
        description="Plan private celebrations, corporate events, brand activations, and youth formats with Fernesta Events through a structured website, social media, and WhatsApp inquiry system."
        keywords="Fernesta Events, event planner Jaipur, brand activation Jaipur, private event planning, corporate event planning India"
      />

      <section className="page-hero hero-events">
        <div className="hero-overlay" />
        <div className="container hero-grid">
          <Reveal className="hero-copy" delayMs={80}>
            <p className="meta">Fernesta Events</p>
            <h1>Event Planning and Experience Operations Inside the Fernesta System.</h1>
            <p>
              Fernesta Events handles private celebrations, corporate gatherings, brand activations, and youth-led formats with the same structured execution discipline Fernesta brings to digital growth.
            </p>
            <div className="button-row">
              <a className="button button-primary" href={WHATSAPP_URL} target="_blank" rel="noreferrer" onClick={handleWhatsAppClick}>
                Start on WhatsApp
              </a>
              <a className="button button-secondary" href="#events-inquiry">
                Send Event Brief
              </a>
            </div>
            <div className="hero-signal-row" aria-label="Fernesta Events lead system">
              <div className="hero-signal">
                <strong>Social</strong>
                <span>Instagram to WhatsApp</span>
              </div>
              <div className="hero-signal">
                <strong>Website</strong>
                <span>Tagged event inquiries</span>
              </div>
              <div className="hero-signal">
                <strong>Follow-up</strong>
                <span>Qualified handoff flow</span>
              </div>
            </div>
          </Reveal>
          <Reveal delayMs={180}>
            <figure className="media-card interactive-card">
              <img
                src="/images/pages/home/services/social-media.jpg"
                alt="Event planning discussion for Fernesta Events"
              />
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="section section-border">
        <div className="container">
          <Reveal className="section-head">
            <p className="meta">Event Formats</p>
            <h2>Start with Focused Event Categories Before Expanding the Portfolio</h2>
            <p>
              The first public event line can stay sharp: visible, easy to sell through Instagram, and operationally simple enough to qualify quickly on WhatsApp.
            </p>
          </Reveal>
          <div className="card-grid card-grid-four card-numbered">
            {eventSegments.map((segment, index) => (
              <Reveal key={segment.title} delayMs={70 * (index + 1)}>
                <article className="panel interactive-card">
                  <span className="panel-index" aria-hidden="true">
                    {formatIndex(index)}
                  </span>
                  <h3>{segment.title}</h3>
                  <p>{segment.detail}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-border">
        <div className="container split-layout">
          <Reveal className="section-head split-head">
            <p className="meta">Lead Engine</p>
            <h2>One Inquiry Path Across Instagram, Website, and WhatsApp</h2>
            <p>
              Every channel should push the lead toward a clean event brief: what type of event, when, where, how many people, what budget band, and how soon a call is needed.
            </p>
          </Reveal>
          <div className="stack-list compact-stack">
            {leadSystem.map((item, index) => (
              <Reveal key={item.title} delayMs={70 * (index + 1)}>
                <article className="panel interactive-card service-scope-card">
                  <span className="panel-index" aria-hidden="true">
                    {formatIndex(index)}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-border">
        <div className="container">
          <Reveal className="section-head">
            <p className="meta">Starter Offers</p>
            <h2>Package the Work So Leads Can Choose a Clear Starting Point</h2>
          </Reveal>
          <div className="card-grid card-grid-three">
            {packages.map((item) => (
              <Reveal key={item.title}>
                <article className="panel interactive-card onboarding-card">
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-border" id="events-inquiry">
        <div className="container split-layout">
          <Reveal delayMs={80}>
            <article className="panel contact-card interactive-card">
              <p className="meta">Events Intake</p>
              <h2>Send a Short Event Brief</h2>
              <form className="contact-form" noValidate onSubmit={handleSubmit(onSubmit)}>
                <label className="honeypot-field" aria-hidden="true">
                  Website
                  <input
                    type="text"
                    aria-hidden="true"
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
                    aria-describedby={errors.name ? "events-name-error" : undefined}
                    {...register("name")}
                  />
                  {errors.name && (
                    <span id="events-name-error" className="field-error" role="alert">
                      {errors.name.message}
                    </span>
                  )}
                </label>
                <label>
                  Email
                  <input
                    type="email"
                    placeholder="name@example.com"
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "events-email-error" : undefined}
                    {...register("email")}
                  />
                  {errors.email && (
                    <span id="events-email-error" className="field-error" role="alert">
                      {errors.email.message}
                    </span>
                  )}
                </label>
                <label>
                  WhatsApp Number
                  <input
                    type="tel"
                    placeholder="99999 99999"
                    autoComplete="tel"
                    inputMode="tel"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "events-phone-error" : undefined}
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <span id="events-phone-error" className="field-error" role="alert">
                      {errors.phone.message}
                    </span>
                  )}
                </label>
                <label>
                  Event Type
                  <select
                    aria-invalid={Boolean(errors.eventType)}
                    aria-describedby={errors.eventType ? "events-type-error" : undefined}
                    {...register("eventType")}
                  >
                    <option value="" disabled>
                      Select event type
                    </option>
                    <option>Private Celebration</option>
                    <option>Corporate Event</option>
                    <option>Brand Activation</option>
                    <option>College or Youth Event</option>
                    <option>Other Event</option>
                  </select>
                  {errors.eventType && (
                    <span id="events-type-error" className="field-error" role="alert">
                      {errors.eventType.message}
                    </span>
                  )}
                </label>
                <label>
                  Event Date or Month
                  <input
                    type="text"
                    placeholder="Exact date or tentative month"
                    aria-invalid={Boolean(errors.eventDate)}
                    aria-describedby={errors.eventDate ? "events-date-error" : undefined}
                    {...register("eventDate")}
                  />
                  {errors.eventDate && (
                    <span id="events-date-error" className="field-error" role="alert">
                      {errors.eventDate.message}
                    </span>
                  )}
                </label>
                <label>
                  Event City
                  <input
                    type="text"
                    placeholder="Jaipur, Delhi NCR, etc."
                    autoComplete="address-level2"
                    aria-invalid={Boolean(errors.eventCity)}
                    aria-describedby={errors.eventCity ? "events-city-error" : undefined}
                    {...register("eventCity")}
                  />
                  {errors.eventCity && (
                    <span id="events-city-error" className="field-error" role="alert">
                      {errors.eventCity.message}
                    </span>
                  )}
                </label>
                <label>
                  Guest Count
                  <select
                    aria-invalid={Boolean(errors.guestCount)}
                    aria-describedby={errors.guestCount ? "events-guests-error" : undefined}
                    {...register("guestCount")}
                  >
                    <option value="" disabled>
                      Select guest range
                    </option>
                    <option>Under 50</option>
                    <option>50-100</option>
                    <option>100-250</option>
                    <option>250+</option>
                  </select>
                  {errors.guestCount && (
                    <span id="events-guests-error" className="field-error" role="alert">
                      {errors.guestCount.message}
                    </span>
                  )}
                </label>
                <label>
                  Budget Range
                  <select
                    aria-invalid={Boolean(errors.budgetRange)}
                    aria-describedby={errors.budgetRange ? "events-budget-error" : undefined}
                    {...register("budgetRange")}
                  >
                    <option value="" disabled>
                      Select budget range
                    </option>
                    <option>Below Rs. 1 lakh</option>
                    <option>Rs. 1-3 lakh</option>
                    <option>Rs. 3-7 lakh</option>
                    <option>Rs. 7 lakh+</option>
                    <option>Need help estimating</option>
                  </select>
                  {errors.budgetRange && (
                    <span id="events-budget-error" className="field-error" role="alert">
                      {errors.budgetRange.message}
                    </span>
                  )}
                </label>
                <label>
                  Event Brief
                  <textarea
                    rows={4}
                    placeholder="Share the occasion, venue status, guest profile, and any must-have ideas."
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "events-message-error" : undefined}
                    {...register("message")}
                  />
                  {errors.message && (
                    <span id="events-message-error" className="field-error" role="alert">
                      {errors.message.message}
                    </span>
                  )}
                </label>
                <button className="button button-primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Event Inquiry"}
                </button>
                <p className="contact-form-note">
                  By submitting, you agree to be contacted by email, phone, or WhatsApp about this event inquiry.
                </p>
              </form>
            </article>
          </Reveal>
          <Reveal delayMs={180}>
            <article className="panel contact-card interactive-card events-whatsapp-card">
              <div className="workflow-callout-copy">
                <p className="meta">Fast Path</p>
                <h3>WhatsApp is the first response channel for events.</h3>
                <p>
                  For event inquiries, the quickest path is a tagged WhatsApp conversation with date, city, guest count, budget band, and venue status already captured.
                </p>
                <a className="button button-primary" href={WHATSAPP_URL} target="_blank" rel="noreferrer" onClick={handleWhatsAppClick}>
                  Open WhatsApp
                </a>
              </div>
            </article>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export default EventsPage;
