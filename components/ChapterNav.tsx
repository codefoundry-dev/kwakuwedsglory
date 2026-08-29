import Link from "next/link";
import { getAdjacentChapters, getChapter } from "@/lib/chapters";
import { MONOGRAM } from "@/lib/site";

const HOME = { slug: "/", label: "Home" };

export function ChapterTopNav({ slug }: { slug: string }) {
  const { prev, next } = getAdjacentChapters(slug);
  const back = prev ?? HOME;
  const forward = next ?? HOME;

  return (
    <nav
      aria-label="Chapter navigation"
      className="sticky top-0 z-30 border-b border-ink/10 bg-bg/90 backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-content items-center justify-between px-5 py-4 sm:px-8">
        <Link
          href={back.slug}
          className="text-[0.7rem] uppercase tracking-[0.15em] text-secondary transition-colors hover:text-accent"
        >
          &larr; {back.label}
        </Link>
        <Link
          href="/"
          className="font-display text-lg italic text-ink transition-colors hover:text-accent"
        >
          {MONOGRAM}
        </Link>
        <Link
          href={forward.slug}
          className="text-[0.7rem] uppercase tracking-[0.15em] text-secondary transition-colors hover:text-accent"
        >
          {forward.label} &rarr;
        </Link>
      </div>
    </nav>
  );
}

export function ChapterBottomNav({ slug }: { slug: string }) {
  const { prev, next } = getAdjacentChapters(slug);
  const chapter = getChapter(slug);
  const back = prev ?? HOME;
  const forward = next ?? HOME;

  return (
    <nav
      aria-label="Chapter pagination"
      className="border-t border-ink/10"
    >
      <div className="mx-auto flex max-w-content items-center justify-between px-5 py-6 sm:px-8">
        <Link
          href={back.slug}
          className="text-[0.7rem] uppercase tracking-[0.15em] text-secondary transition-colors hover:text-accent"
        >
          &larr; {back.label}
        </Link>
        <span className="text-[0.7rem] uppercase tracking-[0.2em] text-secondary/70">
          Page {chapter.number}
        </span>
        <Link
          href={forward.slug}
          className="text-[0.7rem] uppercase tracking-[0.15em] text-secondary transition-colors hover:text-accent"
        >
          {forward.label} &rarr;
        </Link>
      </div>
    </nav>
  );
}
