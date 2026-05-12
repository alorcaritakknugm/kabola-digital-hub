import Navbar from "@/components/Navbar";
import Tourism from "@/components/Tourism";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Katalog Wisata | Kabola Digital Hub",
  description: "Katalog wisata tematik Kabola dan sistem reservasi via Pokdarwis.",
};

export default function WisataPage() {
  return (
    <main className="min-h-screen bg-sand pt-28">
      <Navbar />
      <Tourism />
      <Footer />
    </main>
  );
}

