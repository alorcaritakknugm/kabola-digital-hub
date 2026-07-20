import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio/", "/api/"],
      },
    ],
    sitemap: "https://kaboladigitalhub.alorcarita.com/sitemap.xml",
    host: "https://kaboladigitalhub.alorcarita.com",
  };
}
