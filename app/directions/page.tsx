import type { Metadata } from "next";
import { ChapterBottomNav } from "@/components/ChapterNav";
import PageTransition from "@/components/PageTransition";
import ChapterHeader from "@/components/ChapterHeader";
import PageFooter from "@/components/PageFooter";
import Reveal from "@/components/Reveal";
import { getChapter } from "@/lib/chapters";
import { TRADITIONAL_CEREMONY, WHITE_WEDDING } from "@/lib/site";

const SLUG = "/directions";
const chapter = getChapter(SLUG);

export const metadata: Metadata = {
  title: chapter.label,
  alternates: { canonical: SLUG },
};

export default function DirectionsPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <PageTransition className="flex-1">
        <ChapterHeader
          eyebrow={chapter.eyebrow}
          title="Directions"
          subtitle="Both ceremonies take place in the Adenta area of Accra."
          tone={chapter.tone}
        />

        <div className="mx-auto max-w-content px-5 pb-24 pt-16 sm:px-8 sm:pt-24">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
            <Reveal>
              <div className="rounded-3xl border border-ink/10 bg-white/40 p-8">
                <p className="text-[0.7rem] uppercase tracking-[0.25em] text-accent">
                  {TRADITIONAL_CEREMONY.time}
                </p>
                <h2 className="mt-3 font-display text-2xl text-ink">
                  {TRADITIONAL_CEREMONY.label}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-ink/70">
                  Strictly by invitation only. Venue details are shared
                  directly with invited guests — please check your invitation.
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="rounded-3xl border border-ink/10 bg-white/40 p-8">
                <p className="text-[0.7rem] uppercase tracking-[0.25em] text-accent">
                  {WHITE_WEDDING.time}
                </p>
                <h2 className="mt-3 font-display text-2xl text-ink">
                  {WHITE_WEDDING.label}
                </h2>
                <p className="mt-4 text-sm text-ink/70">
                  {WHITE_WEDDING.venueName}, {WHITE_WEDDING.venueArea}
                </p>
                <a
                  href={WHITE_WEDDING.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-[0.7rem] uppercase tracking-[0.1em] text-bg transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Open in Google Maps &rarr;
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </PageTransition>

      <ChapterBottomNav slug={SLUG} />
      <PageFooter />
    </div>
  );
}
