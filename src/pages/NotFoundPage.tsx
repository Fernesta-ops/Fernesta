import { Link } from "react-router-dom";
import SeoMeta from "../Components/SeoMeta";

function NotFoundPage() {
  return (
    <>
      <SeoMeta
        title="Page Not Found | Fernesta"
        description="The page you are looking for could not be found. Explore Fernesta's digital marketing and workflow automation services."
        keywords="page not found, fernesta"
      />
      <section className="section section-border">
        <div className="container">
          <article className="panel interactive-card">
            <p className="meta">404</p>
            <h1>Page Not Found</h1>
            <p>
              This URL does not exist. Visit our homepage or services page to continue.
            </p>
            <div className="button-row">
              <Link className="button button-primary" to="/">
                Go to Homepage
              </Link>
              <Link className="button button-secondary" to="/services">
                View Services
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

export default NotFoundPage;
