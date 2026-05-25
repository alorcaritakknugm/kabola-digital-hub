import Navbar from "@/components/layout/Navbar";
import Storynomics from "@/components/pages/Storynomics";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

import { client } from "@/sanity/lib/client";
import { storynomicsQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Storynomics Digital | Kabola Digital Hub",
  description: "Digitalisasi budaya, gastronomi, dan etnofarmakologi Kabola — warisan lokal di era digital.",
};

export const revalidate = 0;

export default async function StorynomicsPage() {
  const storynomicsList = await client.fetch(storynomicsQuery);

  return (
    <main className="min-h-screen bg-sand">
      <Navbar />
      <Storynomics storynomicsList={storynomicsList} />
      <Footer />
    </main>
  );
}

