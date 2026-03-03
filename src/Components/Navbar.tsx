import { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about-us" },
  { label: "Services", to: "/services" },
  { label: "Clientele", to: "/clientele" },
  { label: "Case Studies", to: "/case-studies" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="nav">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <div className="container nav-container">
        <NavLink className="logo" to="/" onClick={() => setMenuOpen(false)}>
          FERNESTA
        </NavLink>

        <button
          type="button"
          className="nav-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          Menu
        </button>

        <nav
          className={menuOpen ? "nav-links nav-links-open" : "nav-links"}
          aria-label="Primary"
        >
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive ? "nav-link nav-link-active" : "nav-link"
              }
              end={link.to === "/"}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            className="button button-primary nav-mobile-cta"
            to="/contact-us"
            onClick={() => setMenuOpen(false)}
          >
            Request Assessment
          </NavLink>
        </nav>
        <NavLink className="button button-primary nav-button" to="/contact-us">
          Request Assessment
        </NavLink>
      </div>
    </header>
  );
}
