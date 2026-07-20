import Navbar from "@/components/layout/Navbar";
import Tourism from "@/components/pages/Tourism";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { wisataQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Wisata Alam Kabola | Destinasi Terbaik Alor NTT · KKN-PPM UGM 2026",
  description:
    "Katalog wisata tematik Kecamatan Kabola, Alor NTT — konservasi dugong, pantai eksotis, desa tradisional, dan alam perbukitan. Reservasi via Pokdarwis. Program KKN-PPM UGM 2026.",
  keywords: [
    "wisata Alor NTT", "destinasi wisata Alor", "konservasi dugong Alor",
    "pantai Alor", "wisata kabola", "Pokdarwis Alor", "KKN UGM wisata Alor",
    "wisata alam NTT",
  ],
  alternates: { canonical: "https://kaboladigitalhub.alorcarita.com/wisata" },
  openGraph: {
    title: "Wisata Alam Kabola | Destinasi Terbaik Alor NTT",
    description:
      "Jelajahi destinasi wisata eksotis Kecamatan Kabola — dugong, pantai, dan desa tradisional Alor NTT.",
    url: "https://kaboladigitalhub.alorcarita.com/wisata",
  },
};

export const revalidate = 0;

export default async function WisataPage() {
  const wisataList = await client.fetch(wisataQuery);

  return (
    <main className="min-h-screen bg-sand">
      <Navbar />
      <Tourism wisataList={wisataList} />
      <Footer />
    </main>
  );
}

