import Navbar from "@/components/layout/Navbar";
import CeritaKabola from "@/components/pages/CeritaKabola";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

import { client } from "@/sanity/lib/client";
import { ceritaKabolaQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Cerita Kabola | Budaya, Tradisi & Kearifan Lokal Alor NTT",
  description:
    "Dokumentasi budaya dan tradisi lisan Kecamatan Kabola, Alor NTT yang meliputi gastronomi otentik, tanaman obat etnofarmakologi, tenun ikat, seni budaya, dan cerita rakyat. Program KKN-PPM UGM 2026 Alor Carita.",
  keywords: [
    "budaya Alor NTT", "tradisi Kabola", "cerita rakyat Alor", "tenun ikat Alor",
    "gastronomi NTT", "etnofarmakologi Alor", "kearifan lokal Alor",
    "KKN UGM budaya Alor", "Alor Carita budaya",
  ],
  alternates: { canonical: "https://kaboladigitalhub.alorcarita.com/cerita-kabola" },
  openGraph: {
    title: "Cerita Kabola | Budaya & Kearifan Lokal Alor NTT",
    description:
      "Jelajahi kekayaan budaya, gastronomi, dan tradisi lisan Kabola, Alor NTT dalam program KKN-PPM UGM 2026.",
    url: "https://kaboladigitalhub.alorcarita.com/cerita-kabola",
  },
};

export const revalidate = 0;

export default async function CeritaKabolaPage() {
  const ceritaKabolaList = await client.fetch(ceritaKabolaQuery);

  return (
    <main className="min-h-screen bg-sand">
      <Navbar />
      <CeritaKabola ceritaKabolaList={ceritaKabolaList} />
      <Footer />
    </main>
  );
}


