import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist_Mono, Space_Grotesk } from "next/font/google";
import { artist } from "@/lib/content";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const title = "Aureliah Milagres — forró litorâneo, reggae e MPB";
const description =
  "Cantora e compositora. Forró litorâneo, reggae e MPB. Shows, discografia e contato para contratações.";

export const metadata: Metadata = {
  metadataBase: new URL("https://aureliahmilagres.com.br"),
  title,
  description,
  keywords: [
    "Aureliah Milagres",
    "forró",
    "reggae",
    "MPB",
    "forró litorâneo",
    "cantora",
    "São Paulo",
  ],
  openGraph: {
    title: artist.name,
    description,
    locale: "pt_BR",
    type: "website",
    url: "https://aureliahmilagres.com.br",
    images: [
      {
        url: "/images/aureliah-milagres.webp",
        width: 1200,
        height: 679,
        alt: "Aureliah Milagres",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: artist.name,
    description,
    images: ["/images/aureliah-milagres.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: artist.name,
    genre: ["Forró", "Reggae", "MPB"],
    url: "https://aureliahmilagres.com.br",
    email: artist.email,
    sameAs: artist.socials.map((s) => s.href),
  };

  return (
    <html
      lang="pt-BR"
      className={`${grotesk.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ink font-display text-fog">
        <div className="grain" aria-hidden />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
