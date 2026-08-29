import type { Metadata } from "next";
import { ChapterTopNav, ChapterBottomNav } from "@/components/ChapterNav";
import ChapterHeader from "@/components/ChapterHeader";
import PageFooter from "@/components/PageFooter";
import Reveal from "@/components/Reveal";
import Portrait from "@/components/Portrait";
import { getChapter } from "@/lib/chapters";

const SLUG = "/style-guide";
const chapter = getChapter(SLUG);

export const metadata: Metadata = {
  title: chapter.label,
  alternates: { canonical: SLUG },
};

// Illustrative reference photos in public/assets/style-guide/ — not the
// couple or the actual wedding party. Two of each were supplied; these are
// the ones used (the other "men" file is a byte-for-byte duplicate; the
// unused "women" file is an equally good alternate if this one is swapped).
const GUIDANCE = [
  {
    title: "Ladies",
    src: encodeURI("/assets/style-guide/Women_wearing_colourful_evening_…_202608291811.jpeg"),
    points: [
      "Elegant, colourful gowns — vibrant tones over black or white",
      "Accessorise with a fascinator",
      "Classy, vibrant, wedding-ready",
    ],
  },
  {
    title: "Gentlemen",
    src: "/assets/style-guide/Two_men_standing_at_celebration_202608291817.jpeg",
    points: [
      "Formal suits",
      "Elegant, well-coordinated colours",
      "Polished from head to toe",
    ],
  },
];

export default function StyleGuidePage() {
  return (
    <div className="flex min-h-svh flex-col">
      <ChapterTopNav slug={SLUG} />

      <main className="flex-1">
        <ChapterHeader
          eyebrow={chapter.eyebrow}
          title="Style Guide"
          subtitle="A note on style for the day — elegant, colourful, and wedding-ready."
        />

        <div className="mx-auto max-w-content px-5 pb-24 pt-4 sm:px-8">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8">
            {GUIDANCE.map((group, i) => (
              <Reveal key={group.title} delay={i * 80}>
                <h2 className="font-display text-3xl text-ink sm:text-4xl">{group.title}</h2>
                <div className="relative mt-4 aspect-[3/4] w-full overflow-hidden rounded-sm">
                  <Portrait
                    src={group.src}
                    alt={`${group.title} style inspiration`}
                    sizes="(min-width: 640px) 45vw, 90vw"
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
                <p className="mt-3 text-[0.65rem] uppercase tracking-[0.2em] text-secondary/70">
                  For inspiration — not a required outfit
                </p>
                <ul className="mt-4 space-y-3">
                  {group.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-ink/80">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <Reveal delay={160} className="mt-14 border-t border-ink/10 pt-8">
            <p className="max-w-[60ch] text-sm leading-relaxed text-secondary">
              No fixed colour palette — express yourselves. We simply ask
              guests to keep it elegant and celebratory, in the spirit of the
              day.
            </p>
          </Reveal>
        </div>
      </main>

      <ChapterBottomNav slug={SLUG} />
      <PageFooter />
    </div>
  );
}
