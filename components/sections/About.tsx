import { Mountain, Waves, Users, Globe, Leaf, BookOpen } from "lucide-react";
import Image from "next/image";
import { SlideUp } from "@/components/ui/animations/SlideUp";
import { FadeIn } from "@/components/ui/animations/FadeIn";

const stats = [
  { value: "±4", label: "Desa / Kelurahan", icon: Globe },
  { value: "±15k", label: "Penduduk", icon: Users },
  { value: "~200m", label: "Rata-rata DPL", icon: Mountain },
  { value: "Alor", label: "Kabupaten", icon: Waves },
];

const highlights = [
  {
    icon: Mountain,
    title: "Alam & Geografi",
    desc: "Kecamatan Kabola berdiri di atas bukit-bukit hijau Pulau Alor dengan panorama laut yang menakjubkan, menyajikan perpaduan pegunungan, lembah, dan pesisir yang masih alami.",
    color: "from-kabola-teal/10 to-kabola-teal/5",
  },
  {
    icon: Leaf,
    title: "Ekonomi Lokal",
    desc: "Pertanian dan perkebunan menjadi tulang punggung ekonomi dengan hasil seperti kemiri, pinang, dan komoditas pangan lokal yang diproduksi oleh petani serta pelaku UMKM di seluruh kecamatan.",
    color: "from-kabola-teal/8 to-kabola-teal/3",
  },
  {
    icon: BookOpen,
    title: "Budaya & Tradisi",
    desc: "Kecamatan Kabola menyimpan kekayaan budaya Alor yang autentik, meliputi tenun ikat, tradisi lisan, ritual adat, dan gastronomi unik yang diwariskan lintas generasi.",
    color: "from-forest/8 to-forest/3",
  },
];

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  return (
    <SlideUp
      inView
      delay={0.4 + index * 0.1}
      className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-kabola-teal/10 shadow-[0_2px_16px_rgba(25,141,141,0.06)] hover:shadow-[0_8px_28px_rgba(25,141,141,0.12)] hover:-translate-y-1 transition-all duration-300 group"
    >
      <div className="w-12 h-12 rounded-xl bg-kabola-teal/10 flex items-center justify-center mb-3 group-hover:bg-kabola-teal/20 transition-colors">
        <stat.icon className="w-6 h-6 text-kabola-teal" />
      </div>
      <span className="font-title text-3xl md:text-4xl text-kabola-teal font-bold">{stat.value}</span>
      <span className="text-earth/60 text-xs md:text-sm font-medium mt-1">{stat.label}</span>
    </SlideUp>
  );
}

export default function About() {
  return (
    <section id="tentang" className="relative section-padding overflow-hidden bg-cream dot-pattern">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">

        {/* Section header */}
        <SlideUp inView yOffset={30} duration={0.7} className="text-center mb-16">
          <span className="inline-block bg-kabola-teal/10 text-kabola-teal text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            Tentang Kabola
          </span>
          <h2 className="font-title text-4xl md:text-5xl text-forest mb-4">
            Mengenal <span className="text-gradient-teal">Kecamatan Kabola</span>
          </h2>
          <p className="text-earth/60 max-w-2xl mx-auto text-base leading-relaxed">
            Kecamatan Kabola terletak di Kabupaten Alor, Nusa Tenggara Timur, sebuah wilayah yang kaya akan keindahan alam, keragaman budaya, dan potensi ekonomi lokal yang terus berkembang.
          </p>
        </SlideUp>

        {/* Main content: image + text */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Image */}
          <FadeIn inView duration={0.8} delay={0.2} className="relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-[0_20px_60px_rgba(10,61,98,0.15)]">
              <Image
                src="/images/view-4.jpg"
                alt="Kecamatan Kabola, Alor"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/40 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-lg">
                  <p className="text-xs text-earth/55 font-medium">Lokasi</p>
                  <p className="text-sm font-bold text-kabola-teal">Kec. Kabola, Kab. Alor, NTT</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-kabola-teal/10 border border-kabola-teal/20 -z-10" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-kabola-teal/8 border border-kabola-teal/15 -z-10" />
          </FadeIn>

          {/* Text */}
          <SlideUp inView duration={0.8} delay={0.3} className="space-y-6">
            <div>
              <h3 className="font-title text-2xl text-forest mb-3">
                Sepotong Surga di Timur Indonesia
              </h3>
              <p className="text-earth/65 leading-relaxed text-sm md:text-base">
                Kecamatan Kabola adalah salah satu kecamatan di Kabupaten Alor, 
                Provinsi Nusa Tenggara Timur. Berada di ketinggian dengan panorama 
                alam yang dramatis, kecamatan ini mencakup wilayah daratan dan 
                pesisir yang kaya akan keanekaragaman hayati dan budaya.
              </p>
            </div>

            <div>
              <p className="text-earth/65 leading-relaxed text-sm md:text-base">
                Wilayah ini dihuni oleh masyarakat yang menjaga tradisi leluhur sambil terus beradaptasi, mulai dari petani lokal hingga pengrajin tenun ikat, dari nelayan tradisional hingga pemandu wisata yang mulai mengenalkan keindahan Kabola ke dunia.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {stats.map((stat, i) => (
                <StatCard key={i} stat={stat} index={i} />
              ))}
            </div>
          </SlideUp>
        </div>

        {/* Highlight cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {highlights.map((item, i) => (
            <SlideUp
              key={i}
              inView
              yOffset={30}
              duration={0.6}
              delay={0.5 + i * 0.15}
              className="p-7 md:p-8 rounded-3xl bg-white border border-kabola-teal/10 shadow-[0_4px_24px_rgba(25,141,141,0.05)] hover:shadow-[0_12px_36px_rgba(25,141,141,0.12)] hover:border-kabola-teal/25 hover:-translate-y-1.5 transition-all duration-300 group flex flex-col h-full"
            >
              <div className="w-14 h-14 rounded-2xl bg-kabola-teal/10 flex items-center justify-center mb-5 group-hover:bg-kabola-teal/20 group-hover:scale-105 transition-all flex-shrink-0">
                <item.icon className="w-7 h-7 text-kabola-teal" />
              </div>
              <h4 className="font-title text-xl md:text-2xl text-forest mb-3">{item.title}</h4>
              <p className="text-earth/65 text-sm md:text-[15px] leading-relaxed flex-1">{item.desc}</p>
            </SlideUp>
          ))}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="wave-bottom pointer-events-none">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20">
          <path d="M0,40 C300,80 600,10 900,50 C1100,75 1300,30 1440,45 L1440,80 L0,80 Z" fill="#F0F7F7" />
        </svg>
      </div>
    </section>
  );
}
