import { Link } from "react-router-dom";

const LINKEDIN_URL = "https://www.linkedin.com/company/fernesta/";
const INSTAGRAM_URL = "https://www.instagram.com/fernesta.co/";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="footer-logo" aria-label="Fernesta">
            <img
              className="footer-wordmark"
              src="/images/site/branding/logo-wordmark-clean.png"
              alt="Fernesta"
            />
          </div>
          <p className="footer-tagline">Performance Marketing and Creative Growth Systems</p>
          <p>Performance marketing, creative design, workflow automation, and reporting systems for Indian SMEs and D2C brands.</p>
          <p className="footer-copy">© 2026 Fernesta Digital Private Limited. All rights reserved.</p>
        </div>

        <div className="footer-col">
          <h4>Services</h4>
          <nav aria-label="Footer services navigation">
            <Link to="/services">Search Engine Optimization</Link>
            <Link to="/services">Performance Marketing</Link>
            <Link to="/services">Social Media Management</Link>
            <Link to="/services">Creative Design for Performance Marketing</Link>
            <Link to="/services">Website Design and Development</Link>
            <Link to="/services">Workflow Automation and Reporting Systems</Link>
            <Link to="/events">Fernesta Events</Link>
            <Link to="/services">E-Commerce Advertising</Link>
            <Link to="/services">PR and Influencer Management</Link>
          </nav>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <address>
            <p>Jaipur, Rajasthan, India</p>
            <p>
              <a href="tel:+918209458984">+91 820 945 8984</a>
            </p>
            <p>
              <a href="mailto:info@fernesta.com">info@fernesta.com</a>
            </p>
            <p>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
                LinkedIn: @fernesta
              </a>
            </p>
            <p>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
                Instagram: @fernesta.co
              </a>
            </p>
            <p>Mon–Sat, 9:00 AM – 7:00 PM IST</p>
          </address>
          <div className="footer-nav-links">
            <Link to="/case-studies">Case Studies</Link>
            <Link to="/events">Events</Link>
            <Link to="/clientele">Clientele</Link>
            <Link to="/contact-us">Book Consultation</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
