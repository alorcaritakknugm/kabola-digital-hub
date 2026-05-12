import Navbar from "@/components/Navbar";
import Storynomics from "@/components/Storynomics";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Storynomics Digital | Kabola Digital Hub",
  description: "Digitalisasi budaya, gastronomi, dan etnofarmakologi Kabola — warisan lokal di era digital.",
};

export default function StorynomicsPage() {
  return (
    <main className="min-h-screen bg-sand pt-28">
      <Navbar />
      <Storynomics />
      <Footer />
    </main>
  );
}

