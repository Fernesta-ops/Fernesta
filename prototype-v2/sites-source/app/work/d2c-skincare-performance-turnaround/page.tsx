import type { Metadata } from "next";
import "../../fernesta.css";
import "../../gcc/gcc.css";
import "../work.css";
import WorkDetailPage from "../WorkDetailPage";
import { workStudies } from "../work-data";

const study = workStudies["d2c-skincare-performance-turnaround"];

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

export default function D2cSkincarePerformanceCaseStudy() {
  return <WorkDetailPage study={study} />;
}

