import type { PortraitTone } from "@/components/Portrait";

// The chapter order for "The Wedding Issue". ChapterNav looks a slug up here
// to render its back/forward links and "PAGE 0X" marker — add a chapter here
// and every interior page's nav updates automatically.

export type Chapter = {
  slug: string;
  number: string; // "01".."09"
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
    slug: "/faq",
    number: "06",
    label: "FAQ",
    eyebrow: "Chapter 06",
    descriptor: "Answers to what you're wondering",
    tone: "fabric",
  },
  {
    slug: "/directions",
    number: "07",
    label: "Directions",
    eyebrow: "Chapter 07",
    descriptor: "Maps, and getting there",
    tone: "interior",
  },
  {
    slug: "/gifts",
    number: "08",
    label: "Gifts",
    eyebrow: "Chapter 08",
    descriptor: "For those who wish to bless us",
    tone: "fabric",
  },
  {
    slug: "/bridal-party",
    number: "09",
    label: "Bridal Party",
    eyebrow: "Chapter 09",
    descriptor: "The friends standing beside us",
    tone: "floral",
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
