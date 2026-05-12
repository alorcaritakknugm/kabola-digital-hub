import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, ExternalLink } from "lucide-react";

const exploreLinks = [
  { label: "Wisata Kabola", href: "/wisata" },
  { label: "Cerita & Budaya", href: "/storynomics" },
  { label: "Peta Wilayah", href: "/peta" },
  { label: "Produk Lokal UMKM", href: "/pante-deere/umkm" },
];

const aboutLinks = [
  { label: "Tentang Kecamatan Kabola", href: "/#tentang" },
  { label: "Kelurahan Kabola", href: "/#tentang" },
  { label: "Desa Pante Deere", href: "/pante-deere" },
  { label: "Hubungi Kami", href: "/#kontak" },
];

export default function Footer() {
  return (
    <footer className="bg-forest text-white pt-14 pb-8 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
        backgroundSize: "28px 28px"
      }} />
      {/* Ornament */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.05] pointer-events-none">
        <Image src="/ornaments/ornament-white.svg" alt="" fill className="object-contain" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10 border-b border-white/10 pb-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <div className="relative h-12 w-48">
                <Image src="/logos/logo-text.svg" alt="Kabola Digital Hub" fill className="object-contain object-left brightness-0 invert opacity-90" />
              </div>
            </Link>
            <p className="text-white/55 text-sm leading-relaxed max-w-xs mb-4">
              Portal informasi digital Kecamatan Kabola, Kabupaten Alor —
              wisata, budaya, peta, dan produk lokal dalam satu platform.
            </p>
            <p className="text-white/35 text-xs flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-kabola-teal-light flex-shrink-0" />
              Kec. Kabola, Kab. Alor, Nusa Tenggara Timur
            </p>
          </div>

          {/* Explore links */}
          <div>
            <h4 className="text-[10px] font-bold tracking-widest text-white/35 uppercase mb-5">
              Jelajahi Kabola
            </h4>
            <ul className="space-y-2.5">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="text-sm text-white/60 hover:text-white hover:translate-x-0.5 inline-block transition-all duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-[10px] font-bold tracking-widest text-white/35 uppercase mt-7 mb-4">
              Tentang
            </h4>
            <ul className="space-y-2">
              {aboutLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}
                    className="text-sm text-white/60 hover:text-white hover:translate-x-0.5 inline-block transition-all duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & socials */}
          <div>
            <h4 className="text-[10px] font-bold tracking-widest text-white/35 uppercase mb-5">
              Kontak
            </h4>
            <div className="space-y-3 mb-6">
              <a href="mailto:alorcarita.kknugm@gmail.com"
                className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group text-sm">
                <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center group-hover:bg-kabola-teal/30 group-hover:border-kabola-teal/40 transition-all flex-shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span>alorcarita.kknugm@gmail.com</span>
              </a>

              <a href="https://wa.me/6283117149096" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group text-sm">
                <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center group-hover:bg-kabola-teal/30 group-hover:border-kabola-teal/40 transition-all flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" /><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" /></svg>
                </div>
                <span>+62 831-1714-9096</span>
              </a>

              <a href="https://alorcarita.vercel.app" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group text-sm">
                <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center group-hover:bg-kabola-teal/30 group-hover:border-kabola-teal/40 transition-all flex-shrink-0">
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
                <span>alorcarita.vercel.app</span>
              </a>
            </div>

            <h5 className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-3">Sosial Media</h5>
            <div className="flex gap-2.5">
              <a href="https://instagram.com/alorcarita" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center hover:bg-kabola-teal hover:border-kabola-teal hover:-translate-y-0.5 transition-all text-white">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="https://tiktok.com/@alor.carita" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center hover:bg-kabola-teal hover:border-kabola-teal hover:-translate-y-0.5 transition-all text-white">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between text-white/25 text-xs gap-2">
          <p>© {new Date().getFullYear()} Kabola Digital Hub · Kecamatan Kabola, Kabupaten Alor, NTT</p>
          <p>
            Bagian dari{" "}
            <a href="https://alorcarita.vercel.app" target="_blank" rel="noopener noreferrer"
              className="text-kabola-teal-light hover:text-white transition-colors">
              Alor Carita
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
