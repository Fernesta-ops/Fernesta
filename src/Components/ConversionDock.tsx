import { Link } from "react-router-dom";

function ConversionDock() {
  return (
    <aside className="conversion-dock" aria-label="Quick conversion actions">
      <Link className="button button-primary" to="/contact-us">
        Book Strategy Call
      </Link>
      <button
        type="button"
        className="button button-secondary"
        onClick={() => window.dispatchEvent(new CustomEvent("open-audit"))}
      >
        Free Growth Audit
      </button>
      <a
        className="button button-secondary"
        href="/downloads/fernesta-capabilities-deck.pdf"
        download
      >
        Download Service Deck
      </a>
    </aside>
  );
}

export default ConversionDock;
