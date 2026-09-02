import type { Metadata } from "next";
import { ChapterBottomNav } from "@/components/ChapterNav";
import PageTransition from "@/components/PageTransition";
import PageFooter from "@/components/PageFooter";
import Reveal from "@/components/Reveal";
import { getChapter } from "@/lib/chapters";

const SLUG = "/order-of-photography";
const chapter = getChapter(SLUG);

export const metadata: Metadata = {
  title: chapter.label,
  alternates: { canonical: SLUG },
};

// Exactly as supplied — no groups, entries, or workplaces added or carried
// over from anywhere else.
const GROUPS: { roman: string; title: string; entries: string[] }[] = [
  {
    roman: "Group I",
    title: "Couple With",
    entries: [
      "Officiating Ministers",
      "Bride’s Parents",
      "Groom’s Parents",
      "Both Parents",
      "Bride’s Siblings",
      "Groom’s Siblings",
      "Bride’s Family",
      "Groom’s Family",
      "Both Families",
    ],
  },
  {
    roman: "Group II",
    title: "Colleagues & Friends",
    entries: [
      "Staff of Impact Life Insurance Company",
      "Staff of Presec Basic Schools",
      "Friends of the Groom",
      "Friends of the Bride",
    ],
  },
];

export default function OrderOfPhotographyPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <PageTransition className="flex-1">
        <div className="mx-auto max-w-content px-5 pb-14 pt-16 text-center sm:px-8 sm:pb-20 sm:pt-24">
          <Reveal>
            <p className="eyebrow text-accent">Say Cheese</p>
            <h1 className="mt-4 text-display-hero text-ink">Order of Photography</h1>
            <p className="mx-auto mt-6 max-w-[42ch] text-base leading-relaxed text-secondary sm:text-lg">
              A guide for our photography session — group by group, so
              everyone knows when to step in.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto max-w-content px-5 pb-24 sm:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-8">
            {GROUPS.map((group, i) => (
              <Reveal key={group.roman} delay={i * 80} className="sm:h-full">
                <div className="h-full rounded-lg border-l-[3px] border-accent bg-blush/20 p-6 sm:p-8">
                  <p className="eyebrow text-accent">{group.roman}</p>
                  <h2 className="mt-2 font-display text-2xl text-ink sm:text-3xl">
                    {group.title}
                  </h2>
                  <ul className="mt-5 space-y-2.5">
                    {group.entries.map((entry) => (
                      <li key={entry} className="flex items-start gap-3 text-ink/80">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        <span>{entry}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </PageTransition>

      <ChapterBottomNav slug={SLUG} />
      <PageFooter />
    </div>
  );
}
