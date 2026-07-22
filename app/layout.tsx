import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ScrollToTop from "@/components/layout/ScrollToTop";

const foremost = localFont({
  src: [
    {
      path: "../public/fonts/foremost-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/foremost-italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-title",
  display: "swap",
});

const satoshi = localFont({
  src: [
    { path: "../public/fonts/Satoshi-Light.woff2", weight: "300", style: "normal" },
    { path: "../public/fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
    { path: "../public/fonts/Satoshi-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
});

const SITE_URL = "https://kaboladigitalhub.alorcarita.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kabola Digital Hub | KKN-PPM UGM 2026 · Alor NTT",
    template: "%s | Kabola Digital Hub",
  },
  description:
    "Kabola Digital Hub, platform digital resmi program KKN-PPM UGM 2026 di Kecamatan Kabola, Kabupaten Alor, Nusa Tenggara Timur. Menyajikan data statistik demografi, potensi wisata alam, produk UMKM lokal, cerita budaya, dan peta GIS interaktif Kabola.",
  keywords: [
    "KKN PPM UGM 2026",
    "KKN UGM Alor",
    "KKN Kabola",
    "Alor Carita",
    "Kabola Digital Hub",
    "Statistik Kabola",
    "Data Demografi Kabola Alor",
    "Peta GIS Alor",
    "Wisata Alor NTT",
    "UMKM Alor",
    "NTT Mart",
    "Kecamatan Kabola",
    "Kelurahan Kabola",
    "Desa Pante Deere",
    "Kabupaten Alor",
    "Nusa Tenggara Timur",
    "wisata alam Alor",
    "budaya tradisi Alor",
    "produk lokal NTT",
    "Universitas Gadjah Mada",
    "UGM 2026",
    "digital hub desa",
    "pariwisata NTT",
    "cerita kabola",
  ],
  authors: [{ name: "Tim KKN-PPM UGM 2026 Kabola", url: SITE_URL }],
  creator: "Tim KKN-PPM UGM 2026 Kabola",
  publisher: "Universitas Gadjah Mada",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_URL,
    siteName: "Kabola Digital Hub",
    title: "Kabola Digital Hub | KKN-PPM UGM 2026 · Alor NTT",
    description:
      "Platform digital resmi KKN-PPM UGM 2026 di Kecamatan Kabola, Alor, NTT. Data statistik demografi, wisata alam, UMKM lokal, cerita budaya, dan peta interaktif.",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Kabola Digital Hub | KKN-PPM UGM 2026 Alor NTT",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kabola Digital Hub | KKN-PPM UGM 2026 · Alor NTT",
    description:
      "Platform digital resmi KKN-PPM UGM 2026 di Kecamatan Kabola, Alor, NTT.",
    images: ["/images/og-default.jpg"],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${foremost.variable} ${satoshi.variable}`}>
      <body className="font-body antialiased text-ocean-blue selection:bg-ocean-blue/20 bg-cream">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Kabola Digital Hub",
              alternateName: ["KKN-PPM UGM 2026 Kabola", "Alor Carita"],
              url: SITE_URL,
              description:
                "Platform digital resmi program KKN-PPM UGM 2026 di Kecamatan Kabola, Kabupaten Alor, Nusa Tenggara Timur.",
              foundingDate: "2026",
              parentOrganization: {
                "@type": "EducationalOrganization",
                name: "Universitas Gadjah Mada",
                alternateName: "UGM",
                url: "https://www.ugm.ac.id",
              },
              location: {
                "@type": "Place",
                name: "Kecamatan Kabola",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Kecamatan Kabola",
                  addressRegion: "Kabupaten Alor",
                  addressCountry: "ID",
                  addressRegionCode: "NTT",
                },
              },
              sameAs: ["https://alorcarita.vercel.app"],
            }),
          }}
        />
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
