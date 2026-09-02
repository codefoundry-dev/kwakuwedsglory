// Central source of truth for couple details, dates, venues, and links.
// Edit here — every page reads from this file, nothing is hardcoded per-page.

export const SITE_URL = "https://kwakuwedsglory.com";
export const SITE_NAME = "Kwaku & Glory";

export const GROOM_FULL_NAME = "Kwaku Asare Okoampa Archer";
export const BRIDE_FULL_NAME = "Glory Nyantha Boahen";
export const GROOM_FIRST_NAME = "Kwaku";
export const BRIDE_FIRST_NAME = "Glory";
export const COUPLE_NAMES = "Kwaku & Glory";
export const MONOGRAM = "K & G";
export const HASHTAG = "#ThePerfectDuo26";

// Magazine cover framing on the landing hero (see akingforjuu.com's "THE
// WEDDING ISSUE" treatment).
export const ISSUE_LABEL = "Issue No. 01";
export const LOCATION_LABEL = "Accra, Ghana";

// PLACEHOLDER PHOTOGRAPHY — the couple's shoot isn't ready yet, so every
// <Portrait> on the site renders a moody CSS texture instead of a real
// photo unless a src is set below. Point these paths at a real photo and
// every component that takes a `src`/`image` prop switches to next/image
// automatically, no other code changes needed. Leave `undefined` to keep
// the CSS placeholder. See README → "Swapping placeholder photography".
//
// TEMPORARY: HERO_IMAGE_SRC currently points at a generic, illustrative
// florals-and-invitation-mockup stock/AI image (public/assets/hero) — a
// stand-in for the couple's real photography, not a couple photo. It also
// backs both desktop side panels as a fallback (see HERO_IMAGE_LEFT_SRC /
// HERO_IMAGE_RIGHT_SRC below). Swap it for the couple's real hero shot as
// soon as it's available.
export const HERO_IMAGE_SRC: string | undefined =
  "/assets/hero/Florals_and_greenery_still_life_202608292118.jpeg";
export const HERO_IMAGE_LEFT_SRC: string | undefined = undefined;
export const HERO_IMAGE_RIGHT_SRC: string | undefined = undefined;

// ISO date used by countdown + structured data. Times are in Africa/Accra (GMT, no DST).
export const WEDDING_DATE_LABEL = "Friday, 4th December 2026";
export const WEDDING_DATE_ISO = "2026-12-04";

// Used for <meta description>, Open Graph, and Twitter Card copy.
export const SITE_DESCRIPTION = `Join us as we say I do. ${WEDDING_DATE_LABEL}, Accra.`;

// Social share preview image — see README → "Open Graph share image".
export const OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
} as const;

export const TRADITIONAL_CEREMONY = {
  label: "Traditional Marriage",
  time: "8:00 AM",
  isoDateTime: "2026-12-04T08:00:00+00:00",
  invitationOnly: true,
  // Public copy — no venue/address, per the couple's privacy decision.
  publicNote: "Strictly by invitation only. Full details are on your invitation.",
  // Full details — only ever rendered on the unguessable /t/[secret] page.
  venueName: "Cosy Crest Apartments",
  venueArea: "Adenta (Unit)",
  mapUrl: "https://maps.app.goo.gl/zae65uJ2Pj1zM5Vx9",
};

export const WHITE_WEDDING = {
  label: "White Wedding",
  time: "1:00 PM",
  isoDateTime: "2026-12-04T13:00:00+00:00",
  invitationOnly: false,
  venueName: "All Nations SDA Church",
  venueArea: "Adenta Housing Down",
  mapUrl: "https://maps.app.goo.gl/JwkbetSbkCcwGZrYA",
};

// Unguessable, non-indexed path carrying the full traditional-ceremony details.
// Share this link directly with invited guests — it is never linked from the
// public site and is excluded from the sitemap.
export const TRADITIONAL_SECRET_TOKEN = "gbkLZ4nAGSv3";
export const TRADITIONAL_SECRET_PATH = `/t/${TRADITIONAL_SECRET_TOKEN}`;

export const GIFTS = {
  momo: [
    { number: "0553286000", name: "Glory Nyantha Boahen" },
    { number: "0243888935", name: "Kwaku Asare Okoampa Archer" },
  ],
  bank: {
    bankName: "GCB Bank",
    branch: "Legon Branch",
    accountNumber: "1031010100603",
    accountName: "Kwaku Asare Okoampa Archer / Glory Nyantha Boahen",
  },
};

export const CF_WEDDINGS_URL = "https://cfweddings.live";
export const CF_WEDDINGS_HANDLE = "@cfweddingslive";
export const CF_WEDDINGS_INSTAGRAM_URL = "https://www.instagram.com/cfweddingslive/";
