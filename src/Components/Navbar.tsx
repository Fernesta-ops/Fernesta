import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";

const links = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about-us" },
  { label: "Services", to: "/services" },
  { label: "Clientele", to: "/clientele" },
  { label: "Case Studies", to: "/case-studies" },
  { label: "Prompt Library", to: "/prompt-library" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="nav">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <div className="container nav-container">
        <NavLink className="logo" to="/" onClick={() => setMenuOpen(false)} aria-label="Fernesta home">
          <img
            className="logo-wordmark"
            src="/images/site/branding/logo-wordmark-clean.png"
            alt="Fernesta"
          />
        </NavLink>

        <button
          type="button"
          className="nav-toggle"
          aria-controls="primary-nav"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <motion.span
            className="nav-toggle-icon"
            aria-hidden="true"
            animate={menuOpen ? "open" : "closed"}
          >
            <motion.span
              variants={{
                closed: { rotate: 0, y: 0, opacity: 1 },
                open: { rotate: 45, y: 7, opacity: 1 },
              }}
              transition={{ duration: 0.22 }}
            />
            <motion.span
              variants={{
                closed: { opacity: 1, scaleX: 1 },
                open: { opacity: 0, scaleX: 0 },
              }}
              transition={{ duration: 0.16 }}
            />
            <motion.span
              variants={{
                closed: { rotate: 0, y: 0, opacity: 1 },
                open: { rotate: -45, y: -7, opacity: 1 },
              }}
              transition={{ duration: 0.22 }}
            />
          </motion.span>
          <span className="nav-toggle-label">{menuOpen ? "Close" : "Menu"}</span>
        </button>

        <AnimatePresence>
          {menuOpen && (
            <motion.button
              type="button"
              className="nav-backdrop"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>

        <nav
          id="primary-nav"
          className={menuOpen ? "nav-links nav-links-open" : "nav-links"}
          aria-label="Primary"
        >
          {links.map((link, i) => (
            <motion.div
              key={link.to}
              initial={false}
              animate={menuOpen ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
            >
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  isActive ? "nav-link nav-link-active" : "nav-link"
                }
                end={link.to === "/"}
                onClick={() => setMenuOpen(false)}
                style={
                  menuOpen
                    ? { transitionDelay: `${i * 40}ms` }
                    : undefined
                }
              >
                {link.label}
              </NavLink>
            </motion.div>
          ))}
          <Button asChild className="nav-mobile-cta" variant="primary">
            <NavLink to="/contact-us" onClick={() => setMenuOpen(false)}>
              Request Assessment
            </NavLink>
          </Button>
        </nav>
        <Button asChild className="nav-button" variant="primary">
          <NavLink to="/contact-us">Request Assessment</NavLink>
        </Button>
      </div>
    </header>
  );
}
