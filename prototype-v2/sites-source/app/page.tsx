import FernestaExperience from "./FernestaExperience";

const siteUrl = "https://www.fernesta.com";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: "Fernesta",
      alternateName: "Fernesta Digital Private Limited",
      description:
        "An independent creative marketing agency connecting strategy, branding, launch planning, content, and performance.",
      inLanguage: "en",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    },
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${siteUrl}/#organization`,
      name: "Fernesta",
      legalName: "Fernesta Digital Private Limited",
      url: `${siteUrl}/`,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/prototype/assets/fernesta-monogram.png`,
      },
      image: `${siteUrl}/og.jpg`,
      description:
        "Fernesta is an independent creative marketing agency bringing strategy, launch planning, branding, content, and performance into one connected system.",
      email: "info@fernesta.com",
      telephone: "+91 820 945 8984",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "215, Padmavati B Colony, Padmavti Colony, Nirman Nagar, Brijlalpura",
        addressLocality: "Jaipur",
        addressRegion: "Rajasthan",
        postalCode: "302019",
        addressCountry: "IN",
      },
      hasMap: "https://maps.app.goo.gl/ZatXGy9xwzVFQFwo9",
      areaServed: [
        { "@type": "City", name: "Jaipur" },
        { "@type": "State", name: "Rajasthan" },
        { "@type": "Country", name: "India" },
        { "@type": "Place", name: "Gulf Cooperation Council" },
        { "@type": "Place", name: "Europe" },
        { "@type": "Country", name: "United States" },
      ],
      sameAs: [
        "https://www.linkedin.com/company/fernesta/",
        "https://www.instagram.com/fernesta.co/",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: "+91 820 945 8984",
        email: "info@fernesta.com",
        url: `${siteUrl}/go/whatsapp?pipeline=fernesta&utm_source=website&utm_medium=schema&utm_campaign=main_lead_funnel`,
        availableLanguage: ["English", "Hindi"],
      },
      knowsAbout: [
        "Brand strategy",
        "Brand positioning",
        "Launch planning",
        "Brand identity",
        "Creative campaigns",
        "Growth marketing",
        "Performance marketing",
        "Social media strategy",
        "Content marketing",
      ],
    },
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/#services`,
      name: "Fernesta creative marketing services",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "Service",
            name: "Strategy and Launch Planning",
            description:
              "Positioning, go-to-market planning, and launch sequencing built from customer, category, and commercial evidence.",
            provider: {
              "@id": `${siteUrl}/#organization`,
            },
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "Service",
            name: "Branding and Creative",
            description:
              "Brand identity, voice, story, and creative systems that make strategy distinctive.",
            provider: {
              "@id": `${siteUrl}/#organization`,
            },
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@type": "Service",
            name: "Growth and Performance Marketing",
            description:
              "Acquisition, conversion, commerce, and measurement connected to creative thinking.",
            provider: {
              "@id": `${siteUrl}/#organization`,
            },
          },
        },
        {
          "@type": "ListItem",
          position: 4,
          item: {
            "@type": "Service",
            name: "Social Media and Content",
            description:
              "Content formats, production rhythms, stories, and communities designed for attention.",
            provider: {
              "@id": `${siteUrl}/#organization`,
            },
          },
        },
      ],
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <FernestaExperience />
    </>
  );
}
