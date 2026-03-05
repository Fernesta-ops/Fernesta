import { Link } from "react-router-dom";
import { Button } from "./ui/button";

function CTA() {
  return (
    <section id="cta" className="section cta section-border">
      <div className="container cta-wrap">
        <div>
          <p className="meta">Strategic Engagement</p>
          <h2>Structured Growth Begins with Strategic Clarity.</h2>
        </div>
        <Button asChild variant="primary">
          <Link to="/contact-us">Request Strategic Assessment</Link>
        </Button>
      </div>
    </section>
  );
}

export default CTA;
