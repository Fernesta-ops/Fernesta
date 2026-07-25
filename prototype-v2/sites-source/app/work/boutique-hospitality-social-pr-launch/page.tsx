import type { Metadata } from "next";
import "../../fernesta.css";
import "../../gcc/gcc.css";
import "../work.css";
import WorkDetailPage from "../WorkDetailPage";
import { workStudies } from "../work-data";

const study = workStudies["boutique-hospitality-social-pr-launch"];

export const metadata: Metadata = {
  title: study.metaTitle,
  description: study.metaDescription,
  alternates: { canonical: `/work/${study.slug}` },
  openGraph: {
    type: "article",
    url: `https://www.fernesta.com/work/${study.slug}`,
    title: study.metaTitle,
    description: study.metaDescription,
    images: ["/og.jpg"],
  },
};

export default function HospitalityLaunchCaseStudy() {
  return <WorkDetailPage study={study} />;
}

