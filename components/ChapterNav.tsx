import Link from "next/link";
import { getAdjacentChapters, getChapter } from "@/lib/chapters";

const HOME = { slug: "/", label: "Home" };

// The "PAGE 0X" footer pagination — the top bar (monogram | chapter | menu)
// now lives in components/SiteNav.tsx, which every interior page renders
// once alongside this.
export function ChapterBottomNav({ slug }: { slug: string }) {
  const { prev, next } = getAdjacentChapters(slug);
  const chapter = getChapter(slug);
  const back = prev ?? HOME;
  const forward = next ?? HOME;

  return (
    <nav aria-label="Chapter pagination" className="border-t border-ink/10">
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
