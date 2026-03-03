import { Link, useLocation } from "react-router-dom";

const map: Record<string, string> = {
  "/": "Home",
  "/about-us": "About Us",
  "/services": "Services",
  "/clientele": "Clientele",
  "/case-studies": "Case Studies",
  "/contact-us": "Contact Us",
};

function BreadcrumbTrail() {
  const { pathname } = useLocation();
  if (pathname === "/") return null;

  const parts = pathname.split("/").filter(Boolean);
  const crumbs = parts.map((part, index) => {
    const href = `/${parts.slice(0, index + 1).join("/")}`;
    const label = map[href] ?? part.replace(/-/g, " ");
    return { href, label };
  });

  return (
    <div className="container breadcrumb-wrap" aria-label="Breadcrumb">
      <Link to="/">Home</Link>
      {crumbs.map((crumb) => (
        <span key={crumb.href}>
          <span className="crumb-sep">/</span>
          {crumb.label}
        </span>
      ))}
    </div>
  );
}

export default BreadcrumbTrail;
