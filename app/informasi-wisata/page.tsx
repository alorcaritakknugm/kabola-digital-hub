import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import InformasiWisataClient from "./InformasiWisataClient";
import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { informasiWisataQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Informasi Wisata Alor | Kabola Digital Hub",
  description:
    "Informasi umum, rute transportasi, dan ulasan destinasi wisata populer di Kecamatan Kabola, Alor NTT seperti Pantai Maimol, Pantai Deere, dan Desa Adat.",
  keywords: [
    "informasi wisata Alor",
    "Pantai Maimol Alor",
    "pantai Maimol Kalabahi",
    "akses pantai maimol",
    "wisata Kabola NTT",
    "KKN UGM Kabola",
  ],
  alternates: { canonical: "https://kaboladigitalhub.alorcarita.com/informasi-wisata" },
  openGraph: {
    title: "Informasi Wisata Alor | Kabola Digital Hub",
    description:
      "Informasi lengkap destinasi alami Kecamatan Kabola, Alor NTT. Temukan rute angkutan, spot snorkeling, dan ulasan menarik.",
    url: "https://kaboladigitalhub.alorcarita.com/informasi-wisata",
  },
};

export const revalidate = 0;

export default async function InformasiWisataPage() {
  let sanityArticles: any[] = [];
  try {
    sanityArticles = await client.fetch(informasiWisataQuery);
  } catch (err) {
    console.error("Sanity fetch error:", err);
  }

  return (
    <main className="min-h-screen bg-sand flex flex-col justify-between">
      <div>
        <Navbar />
        <InformasiWisataClient sanityArticles={sanityArticles} />
      </div>
      <Footer />
    </main>
  );
}
