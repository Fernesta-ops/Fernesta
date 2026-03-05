import { Link } from "react-router-dom";
import { Button } from "./ui/button";

function ConversionDock() {
  return (
    <aside className="conversion-dock" aria-label="Quick conversion actions">
      <Button asChild variant="primary">
        <Link to="/contact-us">Book 20-min Call</Link>
      </Button>
      <Button
        type="button"
        variant="secondary"
        onClick={() => window.dispatchEvent(new CustomEvent("open-audit"))}
      >
        Request Free Audit
      </Button>
      <Button asChild variant="secondary">
        <a href="/downloads/fernesta-capabilities-deck.pdf" download>
          Get Capabilities Deck
        </a>
      </Button>
    </aside>
  );
}

export default ConversionDock;
