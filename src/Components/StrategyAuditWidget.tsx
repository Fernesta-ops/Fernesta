import { useEffect, useState, type FormEvent } from "react";

type AuditFormData = {
  name: string;
  email: string;
  stage: string;
  budget: string;
};

const initialForm: AuditFormData = {
  name: "",
  email: "",
  stage: "",
  budget: "",
};

function StrategyAuditWidget() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<AuditFormData>(initialForm);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-audit", onOpen as EventListener);
    return () => window.removeEventListener("open-audit", onOpen as EventListener);
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.stage || !formData.budget) {
      setStatus("error");
      setMessage("Please fill all required fields.");
      return;
    }

    const subject = encodeURIComponent(`Strategy Audit Request - ${formData.name}`);
    const body = encodeURIComponent(
      [
        `Name: ${formData.name}`,
        `Email: ${formData.email}`,
        `Business Stage: ${formData.stage}`,
        `Monthly Marketing Budget: ${formData.budget}`,
        "",
        "Submitted from fernesta.com Strategy Audit form.",
      ].join("\n")
    );

    setStatus("success");
    setMessage("Opening your email app to send this request to info@fernesta.com.");
    window.location.href = `mailto:info@fernesta.com?subject=${subject}&body=${body}`;
    setFormData(initialForm);
  };

  return (
    <>
      <button
        type="button"
        className="audit-fab"
        onClick={() => setOpen(true)}
        aria-label="Open strategy audit form"
      >
        Free Growth Audit
      </button>

      {open && (
        <div className="audit-overlay" role="dialog" aria-modal="true" aria-label="Growth audit form">
          <div className="audit-modal">
            <div className="audit-head">
              <h3>Request a Strategy Audit</h3>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close form">
                Close
              </button>
            </div>
            <form className="audit-form" onSubmit={handleSubmit}>
              <label>
                Name
                <input
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
              <button type="submit" className="button button-primary">
                Submit Request
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
