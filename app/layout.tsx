import type { Metadata } from "next";
import "./globals.css";
import { SITE, SKILLS } from "@/lib/data";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.role} | React, React Native & Next.js`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.seoDescription,
  keywords: [...SITE.seoKeywords],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.role}`,
    description: SITE.seoDescription,
    locale: "en_US",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${SITE.name} — ${SITE.role} portfolio` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.role}`,
    description: SITE.seoDescription,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Structured data: tells Google exactly who this site is about, so searches for
// "Anubha Jasoria" surface a rich person result linked to the right profiles.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  jobTitle: SITE.role,
  url: SITE.url,
  email: `mailto:${SITE.email}`,
  sameAs: [SITE.linkedin, SITE.github],
  knowsAbout: SKILLS.flatMap((g) => [...g.items]),
  address: { "@type": "PostalAddress", addressCountry: "IN" },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${SITE.name} — ${SITE.role}`,
  url: SITE.url,
  author: { "@type": "Person", name: SITE.name },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([personJsonLd, websiteJsonLd]) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
