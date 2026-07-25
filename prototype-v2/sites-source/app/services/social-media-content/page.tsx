import type { Metadata } from "next";
import "../../fernesta.css";
import "../../gcc/gcc.css";
import "../services.css";
import ServiceDetailPage from "../ServiceDetailPage";
import { services } from "../service-data";

const service = services["social-media-content"];

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
};

export default function SocialMediaContentPage() {
  return <ServiceDetailPage service={service} />;
}

