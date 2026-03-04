import { useEffect, useRef, useState, type FormEvent } from "react";
import { sendLeadEmail } from "../lib/leadMailer";

type AuditFormData = {
  name: string;
  email: string;
  stage: string;
  budget: string;
  website: string;
};

const initialForm: AuditFormData = {
  name: "",
  email: "",
  stage: "",
  budget: "",
  website: "",
};

function StrategyAuditWidget() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<AuditFormData>(initialForm);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    lastFocusedRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const frame = window.requestAnimationFrame(() => firstInputRef.current?.focus());
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      lastFocusedRef.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-audit", onOpen as EventListener);
    return () => window.removeEventListener("open-audit", onOpen as EventListener);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.stage || !formData.budget) {
      setStatus("error");
      setMessage("Please fill all required fields.");
      return;
    }

    try {
      setSubmitting(true);
      setStatus("idle");
      await sendLeadEmail({
        subject: `Strategy Audit Request - ${formData.name}`,
        formName: "Strategy Audit Widget",
        fields: {
          name: formData.name,
          email: formData.email,
          business_stage: formData.stage,
          monthly_marketing_budget: formData.budget,
          website: formData.website,
          source: "fernesta.com/audit-widget",
        },
      });
      setStatus("success");
      setMessage("Request submitted successfully. Our team will reach out shortly.");
      setFormData(initialForm);
    } catch {
      setStatus("error");
      setMessage("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="audit-fab"
        onClick={() => setOpen(true)}
        aria-label="Open strategy audit form"
      >
        Free Growth Audit
      </button>

      {open && (
        <div
          className="audit-overlay"
          onClick={(event) => {
            if (event.currentTarget === event.target) setOpen(false);
          }}
          role="presentation"
        >
          <div
            ref={dialogRef}
            className="audit-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="audit-title"
          >
            <div className="audit-head">
              <h3 id="audit-title">Request a Strategy Audit</h3>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close form">
                Close
              </button>
            </div>
            <form className="audit-form" onSubmit={handleSubmit}>
              <label className="honeypot-field" aria-hidden="true">
                Website
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={(event) => setFormData((prev) => ({ ...prev, website: event.target.value }))}
                />
              </label>
              <label>
                Name
                <input
                  ref={firstInputRef}
                  required
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                />
              </label>
              <label>
                Work Email
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                />
              </label>
              <label>
                Business Stage
                <select
                  required
                  name="stage"
                  value={formData.stage}
                  onChange={(event) => setFormData((prev) => ({ ...prev, stage: event.target.value }))}
                >
                  <option value="" disabled>
                    Select stage
                  </option>
                  <option>Early Stage</option>
                  <option>Growth Stage</option>
                  <option>Expansion Stage</option>
                </select>
              </label>
              <label>
                Monthly Marketing Budget
                <select
                  required
                  name="budget"
                  value={formData.budget}
                  onChange={(event) => setFormData((prev) => ({ ...prev, budget: event.target.value }))}
                >
                  <option value="" disabled>
                    Select budget
                  </option>
                  <option>Below Rs. 50,000</option>
                  <option>Rs. 50,000 - 1,00,000</option>
                  <option>Rs. 1,00,000+</option>
                </select>
              </label>
              <button type="submit" className="button button-primary" disabled={submitting}>
                {submitting ? "Submitting..." : "Submit Request"}
              </button>
            </form>
            {message && (
              <p
                aria-live="polite"
                className={status === "success" ? "audit-message audit-success" : "audit-message audit-error"}
              >
                {message}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default StrategyAuditWidget;
