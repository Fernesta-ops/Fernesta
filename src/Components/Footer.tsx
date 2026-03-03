import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>© 2026 Fernesta</p>
        <p>Digital Marketing Agency in Jaipur for SEO, PPC, and Social Media</p>
        <div className="footer-nap">
          <p>Jaipur, Rajasthan, India</p>
          <p>+91 701 412 7724 | info@fernesta.com</p>
        </div>
        <div className="footer-links">
          <Link to="/services">Services</Link>
          <Link to="/case-studies">Case Studies</Link>
          <Link to="/contact-us">Contact</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
