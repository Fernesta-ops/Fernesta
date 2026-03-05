import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="footer-logo" aria-label="Fernesta">
            <span className="footer-mark-shell" aria-hidden="true">
              <img
                className="footer-monogram"
                src="/images/site/branding/monogram-clean.png"
                alt=""
                aria-hidden="true"
              />
            </span>
            <img
              className="footer-wordmark"
              src="/images/site/branding/logo-wordmark-clean.png"
              alt="Fernesta"
            />
          </div>
          <p className="footer-tagline">Digital Marketing Agency in Jaipur</p>
          <p>SEO, Performance Ads, Social Media, and Growth Systems for Jaipur Businesses.</p>
          <p className="footer-copy">© 2026 Fernesta. All rights reserved.</p>
        </div>

        <div className="footer-col">
          <h4>Services</h4>
          <nav aria-label="Footer services navigation">
            <Link to="/services">Search Engine Optimization</Link>
            <Link to="/services">Performance Marketing</Link>
            <Link to="/services">Social Media Management</Link>
            <Link to="/services">Website Design and Development</Link>
            <Link to="/services">E-Commerce Advertising</Link>
            <Link to="/services">PR and Influencer Management</Link>
          </nav>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <address>
            <p>Jaipur, Rajasthan, India</p>
            <p>
              <a href="tel:+917014127724">+91 701 412 7724</a>
            </p>
            <p>
              <a href="mailto:info@fernesta.com">info@fernesta.com</a>
            </p>
            <p>Mon–Sat, 9:00 AM – 7:00 PM IST</p>
          </address>
          <div className="footer-nav-links">
            <Link to="/case-studies">Case Studies</Link>
            <Link to="/clientele">Clientele</Link>
            <Link to="/contact-us">Book Consultation</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
