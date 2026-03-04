import { Link } from "react-router-dom";

function ConversionDock() {
  return (
    <aside className="conversion-dock" aria-label="Quick conversion actions">
      <Link className="button button-primary" to="/contact-us">
        Book 20-min Call
      </Link>
      <button
        type="button"
        className="button button-secondary"
        onClick={() => window.dispatchEvent(new CustomEvent("open-audit"))}
      >
        Request Free Audit
      </button>
      <a
        className="button button-secondary"
        href="/downloads/fernesta-capabilities-deck.pdf"
        download
      >
        Get Capabilities Deck
      </a>
    </aside>
  );
}

export default ConversionDock;
