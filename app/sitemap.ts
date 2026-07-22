import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

const BASE_URL = "https://kaboladigitalhub.alorcarita.com";

// Sitemap di-regenerate otomatis setiap 1 jam (3600 detik)
// Setiap kali ada konten baru di Sanity, sitemap akan terupdate dalam max 1 jam
export const revalidate = 3600;

// Fetch all slugs for dynamic routes
async function getAllSlugs() {
  const [wisataList, umkmList, ceritaList] = await Promise.all([
    client.fetch(groq`*[_type == "wisata"]{ "slug": slug.current }`),
    client.fetch(groq`*[_type == "umkm"]{ "slug": slug.current }`),
    client.fetch(groq`*[_type == "ceritaKabola"]{ "slug": slug.current }`),
  ]);
  return { wisataList, umkmList, ceritaList };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { wisataList, umkmList, ceritaList } = await getAllSlugs();
  const now = new Date();

  // Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/wisata`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/umkm`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/umkm/ntt-mart`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/cerita-kabola`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/peta`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/kelurahan-kabola`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/pante-deere`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/statistik`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  // Dynamic wisata routes
  const wisataRoutes: MetadataRoute.Sitemap = wisataList
    .filter((w: { slug: string }) => w.slug)
    .map((w: { slug: string }) => ({
      url: `${BASE_URL}/wisata/${w.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  // Dynamic umkm routes
  const umkmRoutes: MetadataRoute.Sitemap = umkmList
    .filter((u: { slug: string }) => u.slug)
    .map((u: { slug: string }) => ({
      url: `${BASE_URL}/umkm/${u.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }));

  // Dynamic cerita routes
  const ceritaRoutes: MetadataRoute.Sitemap = ceritaList
    .filter((c: { slug: string }) => c.slug)
    .map((c: { slug: string }) => ({
      url: `${BASE_URL}/cerita-kabola/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }));

  return [...staticRoutes, ...wisataRoutes, ...umkmRoutes, ...ceritaRoutes];
}
