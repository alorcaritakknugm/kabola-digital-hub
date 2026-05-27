import Navbar from "@/components/layout/Navbar";
import CeritaKabola from "@/components/pages/CeritaKabola";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

import { client } from "@/sanity/lib/client";
import { ceritaKabolaQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Kabola dalam Cerita | Kabola Digital Hub",
  description: "Dokumentasi budaya, tradisi lisan, literasi seni, dan kehidupan warga Kabola dalam narasi, foto, dan artikel kearifan lokal.",
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


