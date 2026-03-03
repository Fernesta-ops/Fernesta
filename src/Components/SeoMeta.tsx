import { useEffect } from "react";

type SeoMetaProps = {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
};

function upsertMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let meta = document.querySelector(selector);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attr, key);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
}

function SeoMeta({ title, description, keywords, image = "/images/hero-bg.jpg" }: SeoMetaProps) {
  useEffect(() => {
    const url = `${window.location.origin}${window.location.pathname}`;
    const imageUrl = image.startsWith("http") ? image : `${window.location.origin}${image}`;

    document.title = title;
    upsertMeta('meta[name="description"]', "name", "description", description);
    if (keywords) upsertMeta('meta[name="keywords"]', "name", "keywords", keywords);

    upsertMeta('meta[name="robots"]', "name", "robots", "index,follow");
    upsertMeta('meta[name="author"]', "name", "author", "Fernesta");
    upsertMeta('meta[property="og:title"]', "property", "og:title", title);
    upsertMeta('meta[property="og:description"]', "property", "og:description", description);
    upsertMeta('meta[property="og:type"]', "property", "og:type", "website");
    upsertMeta('meta[property="og:url"]', "property", "og:url", url);
    upsertMeta('meta[property="og:image"]', "property", "og:image", imageUrl);
    upsertMeta('meta[property="og:site_name"]', "property", "og:site_name", "Fernesta");
    upsertMeta('meta[property="og:locale"]', "property", "og:locale", "en_IN");
    upsertMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    upsertMeta('meta[name="twitter:image"]', "name", "twitter:image", imageUrl);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);
  }, [title, description, keywords, image]);

  return null;
}

export default SeoMeta;
