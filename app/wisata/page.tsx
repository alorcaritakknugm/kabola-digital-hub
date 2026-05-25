import Navbar from "@/components/layout/Navbar";
import Tourism from "@/components/pages/Tourism";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { wisataQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Katalog Wisata | Kabola Digital Hub",
  description: "Katalog wisata tematik Kabola dan sistem reservasi via Pokdarwis.",
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

