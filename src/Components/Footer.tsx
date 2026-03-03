import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>© 2026 Fernesta</p>
        <p>Full-Service Marketing Agency for Indian SMEs and D2C Brands</p>
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
