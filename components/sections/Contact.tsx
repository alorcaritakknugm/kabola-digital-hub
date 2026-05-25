"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Mail, Phone, ExternalLink, Globe } from "lucide-react";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="kontak" className="relative section-padding overflow-hidden bg-cream dot-pattern">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-kabola-teal/10 text-kabola-teal text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            Hubungi Kami
          </span>
          <h2 className="font-title text-4xl md:text-5xl text-forest mb-4">
            Mari <span className="text-gradient-teal">Terhubung</span>
          </h2>
          <p className="text-earth/60 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Punya pertanyaan, ingin berkolaborasi, atau sekedar ingin tahu lebih tentang
            program KKN di Kabola? Kami senang mendengar dari Anda.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-5"
          >
            {[
              {
                icon: MapPin,
                label: "Lokasi",
                value: "Kecamatan Kabola, Kabupaten Alor, NTT",
                href: "https://maps.google.com/?q=Kabola,Alor",
              },
              {
                icon: Mail,
                label: "Email",
                value: "alorcarita.kknugm@gmail.com",
                href: "mailto:alorcarita.kknugm@gmail.com",
              },
              {
                icon: Phone,
                label: "WhatsApp",
                value: "+62 831-1714-9096",
                href: "https://wa.me/6283117149096",
              },
              {
                icon: Globe,
                label: "Website Tim KKN",
                value: "alorcarita.vercel.app",
                href: "https://alorcarita.vercel.app",
              },
            ].map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-xl bg-white border border-kabola-teal/10 shadow-[0_2px_12px_rgba(26,122,94,0.05)] hover:shadow-[0_6px_24px_rgba(26,122,94,0.1)] hover:border-kabola-teal/25 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-kabola-teal/10 flex items-center justify-center flex-shrink-0 group-hover:bg-kabola-teal/20 transition-colors">
                  <item.icon className="w-5 h-5 text-kabola-teal" />
                </div>
                <div>
                  <p className="text-xs text-earth/50 font-medium uppercase tracking-wider mb-0.5">{item.label}</p>
                  <p className="text-earth/80 text-sm font-medium group-hover:text-kabola-teal transition-colors">
                    {item.value}
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-earth/30 group-hover:text-kabola-teal transition-colors ml-auto flex-shrink-0 mt-1" />
              </motion.a>
            ))}
          </motion.div>

          {/* Map embed placeholder + KKN info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-4"
          >
            {/* Map placeholder */}
            <div className="relative rounded-2xl overflow-hidden bg-forest/5 border border-kabola-teal/15 h-48 flex items-center justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30814.37!2d124.5!3d-8.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d00a5f1a2b3c4d5%3A0x123456789!2sKabola%2C%20Alor!5e0!3m2!1sid!2sid!4v1000000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
                title="Peta Kabola, Alor"
              />
              {/* Fallback overlay if map doesn't load */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-forest/80 text-white pointer-events-none">
                <MapPin className="w-8 h-8 mb-2 text-kabola-teal-light" />
                <p className="text-sm font-medium">Kabola, Alor</p>
                <p className="text-xs text-white/60">Kecamatan Kabola, NTT</p>
              </div>
            </div>

            {/* KKN info card */}
            <div className="rounded-xl bg-white border border-kabola-teal/10 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-kabola-teal/10 flex items-center justify-center">
                  <Globe className="w-4 h-4 text-kabola-teal" />
                </div>
                <h4 className="font-title text-base text-forest">Tim KKN-PPM UGM</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-earth/60">
                  <span>Program</span>
                  <span className="text-earth font-medium">KKN-PPM UGM 2026</span>
                </div>
                <div className="flex justify-between text-earth/60">
                  <span>Periode</span>
                  <span className="text-earth font-medium">Periode II · 2026</span>
                </div>
                <div className="flex justify-between text-earth/60">
                  <span>Lokasi</span>
                  <span className="text-earth font-medium text-right">Kec. Kabola, Kab. Alor</span>
                </div>
                <div className="flex justify-between text-earth/60 pt-1 border-t border-earth/10">
                  <span>Website Tim</span>
                  <a
                    href="https://alorcarita.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-kabola-teal font-medium hover:underline"
                  >
                    Alor Carita →
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}

