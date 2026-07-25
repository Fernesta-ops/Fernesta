import type { Metadata } from "next";
import "../../fernesta.css";
import "../../gcc/gcc.css";
import "../work.css";
import WorkDetailPage from "../WorkDetailPage";
import { workStudies } from "../work-data";
import { twitterCard } from "../../seo";

const study = workStudies["distribution-workflow-automation-reset"];

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
  twitter: twitterCard(study.metaTitle, study.metaDescription),
};

export default function DistributionWorkflowCaseStudy() {
  return <WorkDetailPage study={study} />;
}
