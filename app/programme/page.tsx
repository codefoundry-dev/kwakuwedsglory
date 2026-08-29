import type { Metadata } from "next";
import { ChapterTopNav, ChapterBottomNav } from "@/components/ChapterNav";
import ChapterHeader from "@/components/ChapterHeader";
import PageFooter from "@/components/PageFooter";
import Reveal from "@/components/Reveal";
import { getChapter } from "@/lib/chapters";

const SLUG = "/programme";
const chapter = getChapter(SLUG);

export const metadata: Metadata = {
  title: chapter.label,
  alternates: { canonical: SLUG },
};

export default function ProgrammePage() {
  return (
    <div className="flex min-h-svh flex-col">
      <ChapterTopNav slug={SLUG} />

      <main className="flex-1">
        <ChapterHeader
          eyebrow={chapter.eyebrow}
          title="Order of Service"
          subtitle="The full run of the day — hymns, readings, and every moment in between — will be posted here closer to the date."
          tone={chapter.tone}
        />

        <div className="mx-auto max-w-content px-5 pb-24 pt-16 sm:px-8 sm:pt-24">
          <Reveal>
            <div className="flex flex-col items-start gap-5 border-t border-ink/10 pt-10">
              <span className="eyebrow text-secondary/70">Programme coming soon</span>
              <p className="max-w-[50ch] text-body leading-relaxed text-ink/70">
                Kwaku &amp; Glory are finalising the order of service. Once it&rsquo;s
                ready, guests will be able to view it here or download a
                printable copy.
              </p>
              <button
                type="button"
                disabled
                className="w-full max-w-full cursor-not-allowed whitespace-normal rounded-full border border-ink/20 px-6 py-3 text-center text-[0.7rem] uppercase tracking-[0.1em] text-ink/40 sm:w-auto"
              >
                View / Download Programme (PDF)
              </button>
            </div>
          </Reveal>
        </div>
      </main>

      <ChapterBottomNav slug={SLUG} />
      <PageFooter />
    </div>
  );
}
