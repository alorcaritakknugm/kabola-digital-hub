"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Child = { label: string; href: string };
type NavItem = { label: string; href?: string; children?: Child[] };

const navItems: NavItem[] = [
  { label: "Beranda", href: "/" },
  { label: "Wisata", href: "/wisata" },
  { label: "Storynomics", href: "/storynomics" },
  { label: "Peta GIS", href: "/peta" },
  { label: "UMKM", href: "/pante-deere/umkm" },
  {
    label: "Tentang",
    children: [
      { label: "Kelurahan Kabola", href: "/kelurahan-kabola" },
      { label: "Desa Pante Deere", href: "/pante-deere" },
    ],
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const pathname = usePathname();

  const isHomePage = pathname === "/";
  const useLight = isScrolled || !isHomePage;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setMobileSection(null);
  }, [pathname]);

  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.includes("#")) return;
    e.preventDefault();
    if (pathname !== "/") { window.location.href = href; return; }
    const id = href.split("#")[1];
    const el = document.getElementById(id);
    if (el) {
      // @ts-ignore
      window.lenis ? window.lenis.scrollTo(el) : el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  const isActive = (item: NavItem): boolean => {
    if (item.href === "/") return pathname === "/";
    if (item.href && !item.href.includes("#")) return pathname === item.href || pathname.startsWith(item.href + "/");
    if (item.children) return item.children.some(c => !c.href.includes("#") && pathname.startsWith(c.href));
    return false;
  };

  const linkBase = `font-medium text-[15px] tracking-wide transition-colors duration-200`;
  const linkLight = `text-slate-700 hover:text-kabola-teal`;
  const linkDark = `text-white/85 hover:text-white`;
  const linkActive = `text-kabola-teal`;

  return (
    <header
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-in-out ${
        useLight
          ? "top-6 py-4 w-[95%] max-w-6xl bg-white/85 backdrop-blur-md border border-slate-200/60 shadow-[0_4px_24px_rgba(0,0,0,0.05)] rounded-full"
          : "top-8 py-5 w-[80%] max-w-5xl bg-white/5 backdrop-blur-sm border border-white/10 rounded-full"
      }`}
    >
      <div className="px-5 md:px-8 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <div className="relative h-9 w-28 md:h-11 md:w-36">
            <Image
              src={useLight ? "/logos/logo-text-cyan.svg" : "/logos/logo-text.svg"}
              alt="Kabola Digital Hub"
              fill
              className={`object-contain object-left ${useLight ? "" : "brightness-0 invert"}`}
            />
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">

          {/* Nav links */}
          {navItems.map((item) =>
            item.children ? (
              /* Dropdown item */
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  className={`${linkBase} flex items-center gap-1.5 ${
                    isActive(item) ? linkActive : useLight ? linkLight : linkDark
                  }`}
                >
                  {item.label}
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      openDropdown === item.label ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 mt-3 w-52 bg-white border border-slate-100 rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.08)] py-2 overflow-hidden"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-5 py-2.5 text-[13.5px] font-medium text-slate-600 hover:text-kabola-teal hover:bg-kabola-teal/5 transition-colors"
                          onClick={(e) => {
                            handleHashClick(e as any, child.href);
                            setOpenDropdown(null);
                          }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* Direct link */
              <Link
                key={item.label}
                href={item.href!}
                onClick={(e) => handleHashClick(e, item.href!)}
                className={`${linkBase} ${isActive(item) ? linkActive : useLight ? linkLight : linkDark}`}
              >
                {item.label}
              </Link>
            )
          )}

          {/* Alor Carita button */}
          <a
            href="https://alorcarita.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 hover:-translate-y-0.5 flex-shrink-0 ${
              useLight
                ? "border-kabola-teal text-kabola-teal hover:bg-kabola-teal hover:text-white"
                : "border-white/25 text-white/80 hover:bg-white/10 hover:border-white/40"
            }`}
          >
            Alor Carita
            <ExternalLink className="w-3 h-3" />
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className={`md:hidden p-2 rounded-full transition-colors ${
            useLight ? "text-slate-700 hover:bg-slate-100" : "text-white hover:bg-white/10"
          }`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={`md:hidden absolute top-full left-0 right-0 overflow-hidden mt-2 rounded-3xl ${
              useLight
                ? "bg-white border border-slate-100 shadow-[0_16px_40px_rgba(0,0,0,0.06)]"
                : "bg-ocean-blue/97 border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.2)]"
            }`}
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) =>
                item.children ? (
                  <div key={item.label}>
                    <button
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${
                        useLight ? "text-slate-700 hover:bg-slate-50" : "text-white/80 hover:bg-white/5"
                      }`}
                      onClick={() => setMobileSection(mobileSection === item.label ? null : item.label)}
                    >
                      {item.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${mobileSection === item.label ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {mobileSection === item.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.18 }}
                          className="overflow-hidden pl-4"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`block px-4 py-2.5 rounded-2xl text-sm transition-colors ${
                                useLight ? "text-slate-600 hover:text-kabola-teal hover:bg-kabola-teal/5" : "text-white/65 hover:text-white hover:bg-white/5"
                              }`}
                              onClick={(e) => {
                                handleHashClick(e as any, child.href);
                                setMobileOpen(false);
                              }}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href!}
                    className={`flex px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${
                      isActive(item)
                        ? useLight ? "bg-kabola-teal/10 text-kabola-teal" : "bg-white/10 text-white"
                        : useLight ? "text-slate-700 hover:bg-slate-50" : "text-white/80 hover:bg-white/5"
                    }`}
                    onClick={(e) => { handleHashClick(e, item.href!); setMobileOpen(false); }}
                  >
                    {item.label}
                  </Link>
                )
              )}
              <div className="pt-2 border-t border-slate-100/50">
                <a
                  href="https://alorcarita.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold border transition-colors ${
                    useLight ? "text-kabola-teal border-kabola-teal/20 hover:bg-kabola-teal/5" : "text-white/70 border-white/15 hover:bg-white/5"
                  }`}
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Alor Carita
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
