import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { caseStudies } from "../data/caseStudies";

type JsonLd = Record<string, unknown>;

const SITE_NAME = "Fernesta";
const LEGAL_NAME = "Fernesta Digital Private Limited";
const PHONE = "+91-820-945-8984";
const EMAIL = "info@fernesta.com";
const SOCIAL_LINKS = ["https://www.linkedin.com/company/fernesta/", "https://www.instagram.com/fernesta.co/"];
const COUNTRY_NAME = "India";
const CITY = "Jaipur";
const STATE = "Rajasthan";
const COUNTRY = "IN";

const SERVICE_TYPES = [
  "SEO Services",
  "Performance Marketing",
  "Social Media Marketing",
  "Google Ads Management",
  "Meta Ads Management",
  "Creative Design for Performance Marketing",
  "Website Design and Development",
  "Workflow Automation and Reporting Systems",
  "Content Marketing",
  "Branding and Profiling",
  "PR and Influencer Management",
];

const EVENT_SERVICE_TYPES = [
  "Event Planning",
  "Corporate Events",
  "Private Celebrations",
  "Brand Activations",
  "Guest RSVP and WhatsApp Lead Capture",
];

function labelFromPath(pathname: string) {
  switch (pathname) {
    case "/":
      return "Home";
    case "/about-us":
      return "About Us";
    case "/services":
      return "Services";
    case "/events":
      return "Fernesta Events";
    case "/clientele":
      return "Clientele";
    case "/case-studies":
      return "Case Studies";
    case "/contact-us":
      return "Contact Us";
    default:
      if (pathname.startsWith("/case-studies/")) return "Case Study";
      return "Page";
  }
}

function buildBreadcrumb(pathname: string, origin: string): JsonLd {
  const segments = pathname.split("/").filter(Boolean);
  const items: JsonLd[] = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: `${origin}/`,
    },
  ];

  if (segments.length === 0) {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items,
    };
  }

  let currentPath = "";
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    items.push({
      "@type": "ListItem",
      position: index + 2,
      name: labelFromPath(currentPath),
      item: `${origin}${currentPath}`,
    });
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

function buildFaq(pathname: string, origin: string): JsonLd | null {
  if (pathname !== "/services" && pathname !== "/contact-us") return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What digital marketing services does Fernesta provide?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Fernesta provides performance marketing, creative design for campaigns, SEO services, social media management, Google and Meta ads management, website development, workflow automation and reporting systems, e-commerce advertising, branding support, and PR or influencer management.",
        },
      },
      {
        "@type": "Question",
        name: "How can I start with Fernesta?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Book a consultation from the contact page or request a growth audit at ${origin}/contact-us.`,
        },
      },
    ],
  };
}

function buildService(pathname: string, origin: string): JsonLd | null {
  if (pathname !== "/services") return null;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Performance Marketing, Creative Design, and Workflow Automation Services",
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: origin,
    },
    areaServed: {
      "@type": "Country",
      name: COUNTRY_NAME,
    },
    serviceType: SERVICE_TYPES,
    url: `${origin}/services`,
  };
}

function buildEventService(pathname: string, origin: string): JsonLd | null {
  if (pathname !== "/events") return null;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Fernesta Events Planning and Experience Operations",
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      legalName: LEGAL_NAME,
      url: origin,
    },
    areaServed: {
      "@type": "Country",
      name: COUNTRY_NAME,
    },
    serviceType: EVENT_SERVICE_TYPES,
    url: `${origin}/events`,
  };
}

function buildOrganization(origin: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    legalName: LEGAL_NAME,
    url: origin,
    sameAs: SOCIAL_LINKS,
    logo: `${origin}/images/site/seo/default-share.jpg`,
    areaServed: {
      "@type": "Country",
      name: COUNTRY_NAME,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: EMAIL,
      telephone: PHONE,
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
  };
}

function buildLocalBusiness(origin: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${origin}/#localbusiness`,
    name: LEGAL_NAME,
    url: origin,
    sameAs: SOCIAL_LINKS,
    image: `${origin}/images/site/seo/default-share.jpg`,
    telephone: PHONE,
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: CITY,
      addressRegion: STATE,
      addressCountry: COUNTRY,
    },
    areaServed: [
      {
        "@type": "City",
        name: CITY,
      },
      {
        "@type": "State",
        name: STATE,
      },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    priceRange: "INR",
    makesOffer: SERVICE_TYPES.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service,
      },
    })),
  };
}

function buildWebSite(origin: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: origin,
    inLanguage: "en-IN",
  };
}

function buildCaseStudy(pathname: string, origin: string): JsonLd | null {
  if (!pathname.startsWith("/case-studies/")) return null;
  const slug = pathname.replace("/case-studies/", "");
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${study.client} Case Study`,
    description: `${study.metric} ${study.result}`,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    mainEntityOfPage: `${origin}${pathname}`,
  };
}

function StructuredData() {
  const location = useLocation();

  useEffect(() => {
    const origin = window.location.origin;
    const pathname = location.pathname;

    const payloads: JsonLd[] = [
      buildWebSite(origin),
      buildOrganization(origin),
      buildLocalBusiness(origin),
      buildBreadcrumb(pathname, origin),
    ];

    const serviceSchema = buildService(pathname, origin);
    if (serviceSchema) payloads.push(serviceSchema);

    const eventServiceSchema = buildEventService(pathname, origin);
    if (eventServiceSchema) payloads.push(eventServiceSchema);

    const faqSchema = buildFaq(pathname, origin);
    if (faqSchema) payloads.push(faqSchema);

    const caseStudySchema = buildCaseStudy(pathname, origin);
    if (caseStudySchema) payloads.push(caseStudySchema);

    const existing = document.querySelectorAll(
      'script[data-fernesta-schema="true"]'
    );
    existing.forEach((node) => node.remove());

    payloads.forEach((payload, index) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-fernesta-schema", "true");
      script.setAttribute("data-schema-index", String(index));
      script.text = JSON.stringify(payload);
      document.head.appendChild(script);
    });
  }, [location.pathname]);

  return null;
}

export default StructuredData;
