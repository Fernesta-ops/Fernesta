import type { Metadata } from "next";

export function twitterCard(
  title: string,
  description: string,
): NonNullable<Metadata["twitter"]> {
  return {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.jpg"],
  };
}
