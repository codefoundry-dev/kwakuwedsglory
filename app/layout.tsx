import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  COUPLE_NAMES,
  HASHTAG,
  WEDDING_DATE_ISO,
} from "@/lib/site";

const DEFAULT_TITLE = `${COUPLE_NAMES} — The Wedding Issue`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    hashtag: HASHTAG,
  },
};

export const viewport: Viewport = {
  themeColor: "#F8F1EF",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: `${COUPLE_NAMES}'s Wedding`,
  startDate: WEDDING_DATE_ISO,
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  url: SITE_URL,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        <CustomCursor />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
