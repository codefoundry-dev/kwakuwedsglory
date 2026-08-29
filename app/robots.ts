import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// The /t/<secret> traditional-ceremony page is intentionally left out of
// both the allow and disallow rules below — listing it in a disallow rule
// would itself leak the unguessable path to anyone reading robots.txt. It
// stays out purely by never being linked, plus a noindex tag on the page.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
