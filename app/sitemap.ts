import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { CHAPTERS } from "@/lib/chapters";

// The /t/<secret> traditional-ceremony page is deliberately excluded.
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", ...CHAPTERS.map((c) => c.slug)];
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));
}
