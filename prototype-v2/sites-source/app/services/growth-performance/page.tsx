import type { Metadata } from "next";
import "../../fernesta.css";
import "../../gcc/gcc.css";
import "../services.css";
import ServiceDetailPage from "../ServiceDetailPage";
import { services } from "../service-data";
import { twitterCard } from "../../seo";

const service = services["growth-performance"];

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
  keywords: [...service.keywords],
  alternates: { canonical: `/services/${service.slug}` },
  openGraph: {
    type: "website",
    url: `https://www.fernesta.com/services/${service.slug}`,
    title: service.metaTitle,
    description: service.metaDescription,
    images: ["/og.jpg"],
  },
  twitter: twitterCard(service.metaTitle, service.metaDescription),
};

export default function GrowthPerformancePage() {
  return <ServiceDetailPage service={service} />;
}
