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

export const metadata: Metadata = {
  title: "Kabola Digital Hub",
  description:
    "Pusat layanan informasi digital Kelurahan Kabola, Kecamatan Kabola, Kabupaten Alor, Nusa Tenggara Timur. Program kerja KKN-PPM UGM 2026.",
  keywords: ["Kabola", "Alor", "KKN UGM", "Digital Hub", "Wisata Alor", "Cerita Kabola"],
  openGraph: {
    title: "Kabola Digital Hub",
    description: "Pusat layanan informasi digital Kelurahan Kabola",
    locale: "id_ID",
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
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
