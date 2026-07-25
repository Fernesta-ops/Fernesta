import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://www.fernesta.com";
const title = "Creative Marketing Agency: Strategy to Growth | Fernesta";
const description =
  "Fernesta is an independent creative marketing agency connecting strategy, branding, launch planning, content, and performance to move brands forward.";
const socialImage = `${siteUrl}/og.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "Fernesta",
  category: "Creative marketing agency",
  creator: "Fernesta Digital Private Limited",
  publisher: "Fernesta Digital Private Limited",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Fernesta",
    locale: "en_IN",
    title,
    description,
    images: [
      {
        url: socialImage,
        width: 1733,
        height: 907,
        alt: "Fernesta, an independent creative marketing agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [socialImage],
  },
  appleWebApp: {
    capable: true,
    title: "Fernesta",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f5e9db",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <head>
        <link
          rel="icon"
          href="/fernesta-fe-favicon.ico"
          sizes="any"
        />
        <link
          rel="icon"
          href="/fernesta-fe-favicon.png"
          type="image/png"
          sizes="64x64"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
          sizes="180x180"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>{children}</body>
    </html>
  );
}
