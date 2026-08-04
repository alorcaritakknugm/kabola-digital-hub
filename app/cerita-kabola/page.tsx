import Navbar from "@/components/layout/Navbar";
import CeritaKabola from "@/components/pages/CeritaKabola";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

import { client } from "@/sanity/lib/client";
import { ceritaKabolaQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Cerita Kabola | Budaya, Tradisi & Kearifan Lokal Alor NTT",
  description:
    "Dokumentasi budaya dan tradisi lisan Kecamatan Kabola, Alor NTT yang meliputi gastronomi otentik, tenun ikat, seni budaya, dan cerita rakyat. Program KKN-PPM UGM 2026 Alor Carita.",
  keywords: [
    "budaya Alor NTT", "tradisi Kabola", "cerita rakyat Alor", "tenun ikat Alor",
    "gastronomi NTT", "kearifan lokal Alor",
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

import { staticGastronomi } from "@/lib/data/staticGastronomi";

export default async function CeritaKabolaPage() {
  let sanityList: any[] = [];
  try {
    const res = await client.fetch(ceritaKabolaQuery);
    if (Array.isArray(res)) {
      sanityList = res;
    }
  } catch (e) {
    console.error("Sanity fetch error ceritaKabola:", e);
  }
  const ceritaKabolaList = [...sanityList, ...staticGastronomi];

  return (
    <main className="min-h-screen bg-sand">
      <Navbar />
      <CeritaKabola ceritaKabolaList={ceritaKabolaList} />
      <Footer />
    </main>
  );
}


