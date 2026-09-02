import type { Metadata } from "next";
import { ChapterBottomNav } from "@/components/ChapterNav";
import PageTransition from "@/components/PageTransition";
import ChapterHeader from "@/components/ChapterHeader";
import PageFooter from "@/components/PageFooter";
import Reveal from "@/components/Reveal";
import Portrait, { type PortraitTone } from "@/components/Portrait";
import { getChapter } from "@/lib/chapters";

const SLUG = "/gallery";
const chapter = getChapter(SLUG);

export const metadata: Metadata = {
  title: chapter.label,
  alternates: { canonical: SLUG },
};

const TONES: PortraitTone[] = ["floral", "interior", "fabric", "botanical"];

export default function GalleryPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <PageTransition className="flex-1">
        <ChapterHeader
          eyebrow={chapter.eyebrow}
          title="Photos"
          subtitle="Moments from the day, captured and collected here after the shoot."
        />

        <div className="mx-auto max-w-content px-5 pb-24 pt-4 sm:px-8">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <Reveal key={i} delay={i * 30}>
                <Portrait
                  tone={TONES[i % TONES.length]}
                  alt=""
                  className="aspect-square w-full rounded-sm"
                />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 text-center">
            <p className="mx-auto max-w-[42ch] text-body leading-relaxed text-secondary">
              Photos will be added here after the wedding — check back to
              relive the day with us.
            </p>
          </Reveal>
        </div>
      </PageTransition>

      <ChapterBottomNav slug={SLUG} />
      <PageFooter />
    </div>
  );
}
