import type { PortraitTone } from "@/components/Portrait";

// The chapter order for "The Wedding Issue". SiteNav's overlay and every
// interior page's PAGE 0X footer read this array — reorder or add a chapter
// here and both update automatically.

export type Chapter = {
  slug: string;
  number: string; // "01".."10"
  label: string;
  eyebrow: string;
  // One-line editorial descriptor for the contents index (akingforjuu-style).
  descriptor: string;
  // Placeholder-photography tone used for this chapter's image band.
  tone: PortraitTone;
};

export const CHAPTERS: Chapter[] = [
  {
    slug: "/story",
    number: "01",
    label: "Our Story",
    eyebrow: "Chapter 01",
    descriptor: "How it began, and where it's going",
    tone: "botanical",
  },
  {
    slug: "/details",
    number: "02",
    label: "The Details",
    eyebrow: "Chapter 02",
    descriptor: "Two ceremonies, one beautiful day",
    tone: "interior",
  },
  {
    slug: "/programme",
    number: "03",
    label: "Order of Service",
    eyebrow: "Chapter 03",
    descriptor: "The full run of the day",
    tone: "fabric",
  },
  {
    slug: "/style-guide",
    number: "04",
    label: "Style Guide",
    eyebrow: "Chapter 04",
    descriptor: "Elegant, colourful, wedding-ready",
    tone: "floral",
  },
  {
    slug: "/gallery",
    number: "05",
    label: "Photos",
    eyebrow: "Chapter 05",
    descriptor: "Moments, captured and collected",
    tone: "botanical",
  },
  {
    slug: "/order-of-photography",
    number: "06",
    label: "Order of Photography",
    eyebrow: "Chapter 06",
    descriptor: "Family & friends, group by group",
    tone: "botanical",
  },
  {
    slug: "/faq",
    number: "07",
    label: "FAQ",
    eyebrow: "Chapter 07",
    descriptor: "Answers to what you're wondering",
    tone: "fabric",
  },
  {
    slug: "/directions",
    number: "08",
    label: "Directions",
    eyebrow: "Chapter 08",
    descriptor: "Maps, and getting there",
    tone: "interior",
  },
  {
    slug: "/gifts",
    number: "09",
    label: "Gifts",
    eyebrow: "Chapter 09",
    descriptor: "For those who wish to bless us",
    tone: "fabric",
  },
  {
    slug: "/bridal-party",
    number: "10",
    label: "Bridal Party",
    eyebrow: "Chapter 10",
    descriptor: "The friends standing beside us",
    tone: "floral",
  },
  {
    slug: "/vendors",
    number: "11",
    label: "Vendors",
    eyebrow: "Chapter 11",
    descriptor: "The dream team who made it happen",
    tone: "fabric",
  },
];

export function getChapter(slug: string): Chapter {
  const chapter = CHAPTERS.find((c) => c.slug === slug);
  if (!chapter) throw new Error(`Unknown chapter slug: ${slug}`);
  return chapter;
}

export function getAdjacentChapters(slug: string) {
  const index = CHAPTERS.findIndex((c) => c.slug === slug);
  return {
    prev: index > 0 ? CHAPTERS[index - 1] : null,
    next: index >= 0 && index < CHAPTERS.length - 1 ? CHAPTERS[index + 1] : null,
  };
}
