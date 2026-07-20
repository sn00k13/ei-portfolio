import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Uzoukwu Eric Ikenna — Cybersecurity · Founder · Builder",
  description:
    "Uzoukwu Eric Ikenna — Nigerian cybersecurity professional, serial founder, QA engineer and builder creating Africa-first technology solutions.",
  authors: [{ name: "Uzoukwu Eric Ikenna" }],
  openGraph: {
    title: "Uzoukwu Eric Ikenna — Cybersecurity & Founder",
    description:
      "Nigerian cybersecurity practitioner, serial entrepreneur and educator. Founder of E World Fortress Ltd, 4First Technologies, Terbana and eWorld Technologies. Building the digital world from Owerri, Nigeria.",
    type: "website",
    url: "https://uzoukwuericikenna.com",
    siteName: "Uzoukwu Eric Ikenna",
    locale: "en_NG",
    images: [{ url: "https://uzoukwuericikenna.com/og-image.jpg", width: 1200, height: 1200, alt: "Uzoukwu Eric Ikenna — Cybersecurity · Founder · Builder" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@uzoukwuericiyke",
    creator: "@uzoukwuericiyke",
    title: "Uzoukwu Eric Ikenna — Cybersecurity & Founder",
    description: "Nigerian cybersecurity practitioner and serial entrepreneur building the digital world from Owerri, Nigeria.",
    images: ["https://uzoukwuericikenna.com/og-image.jpg"],
  },
  robots: "index, follow",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#080a0d" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
