import type { Metadata } from "next";
import { ChapterTopNav, ChapterBottomNav } from "@/components/ChapterNav";
import ChapterHeader from "@/components/ChapterHeader";
import PageFooter from "@/components/PageFooter";
import Reveal from "@/components/Reveal";
import Portrait, { type PortraitTone } from "@/components/Portrait";
import { getChapter } from "@/lib/chapters";

const SLUG = "/story";
const chapter = getChapter(SLUG);

export const metadata: Metadata = {
  title: chapter.label,
  alternates: { canonical: SLUG },
};

const MOMENTS: { title: string; caption: string; tone: PortraitTone }[] = [
  {
    title: "How It Began",
    caption: "The first hello",
    tone: "botanical",
  },
  {
    title: "Falling In",
    caption: "The chapter that changed everything",
    tone: "floral",
  },
  {
    title: "The Question",
    caption: "How he asked, how she answered",
    tone: "interior",
  },
];

export default function StoryPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <ChapterTopNav slug={SLUG} />

      <main className="flex-1">
        <ChapterHeader
          eyebrow={chapter.eyebrow}
          title="Our Story"
          subtitle="Every love story is beautiful, but this one is theirs. The full story is being written and will land here soon."
          tone={chapter.tone}
        />

        <div className="mx-auto max-w-content px-5 pb-24 pt-16 sm:px-8 sm:pt-24">
          <div className="flex flex-col gap-16 sm:gap-24">
            {MOMENTS.map((moment, i) => (
              <Reveal key={moment.title} delay={i * 60}>
                <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-[1fr_1.2fr] sm:gap-12">
                  <div
                    className={`relative aspect-[4/5] w-full overflow-hidden rounded-sm ${
                      i % 2 === 1 ? "sm:order-2" : ""
                    }`}
                  >
                    <Portrait tone={moment.tone} alt="" className="absolute inset-0 h-full w-full" />
                    <div className="portrait-scrim" aria-hidden />
                    <span className="absolute bottom-4 left-4 text-[0.6rem] uppercase tracking-[0.2em] text-bg/85">
                      Photo coming soon
                    </span>
                  </div>
                  <div>
                    <p className="text-[0.7rem] uppercase tracking-[0.25em] text-accent">
                      {String(i + 1).padStart(2, "0")} &middot; {moment.caption}
                    </p>
                    <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
                      {moment.title}
                    </h2>
                    <p className="mt-4 max-w-[48ch] text-body leading-relaxed text-ink/70">
                      This part of the story is on its way — Kwaku &amp; Glory
                      are still putting the words together. Check back closer
                      to the big day for the full telling.
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </main>

      <ChapterBottomNav slug={SLUG} />
      <PageFooter />
    </div>
  );
}
