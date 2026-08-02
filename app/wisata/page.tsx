import Navbar from "@/components/layout/Navbar";
import Tourism from "@/components/pages/Tourism";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { wisataQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Kegiatan Wisata Kabola | Ekowisata & Budaya Alor NTT · KKN-PPM UGM 2026",
  description:
    "Kegiatan wisata resmi Kecamatan Kabola, Alor NTT yang mencakup Ekowisata Bahari Jejak Laut Kabola (Dugong, Sika, Mangrove) dan Wisata Budaya Jejak Warisan Kabola (Monbang, Pakaian Kulit Kayu, Lego-Lego). Reservasi via Pengelola.",
  keywords: [
    "kegiatan wisata Alor NTT", "Jejak Laut Kabola", "Jejak Warisan Kabola",
    "konservasi dugong Alor", "wisata budaya Monbang", "Pokdarwis Alor",
    "KKN UGM wisata Alor", "wisata alam Kabola",
  ],
  alternates: { canonical: "https://kaboladigitalhub.alorcarita.com/wisata" },
  openGraph: {
    title: "Kegiatan Wisata Kabola | Ekowisata & Budaya Alor NTT",
    description:
      "Jelajahi kegiatan wisata pilihan Kecamatan Kabola seperti Jejak Laut Kabola & Jejak Warisan Kabola Alor NTT.",
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

