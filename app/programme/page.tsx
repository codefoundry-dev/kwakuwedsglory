import type { Metadata } from "next";
import { ChapterBottomNav } from "@/components/ChapterNav";
import PageTransition from "@/components/PageTransition";
import PageFooter from "@/components/PageFooter";
import Reveal from "@/components/Reveal";
import ProgrammeTimeline, { type ProgrammeItem } from "@/components/ProgrammeTimeline";
import { getChapter } from "@/lib/chapters";
import { WHITE_WEDDING, WEDDING_DATE_LABEL } from "@/lib/site";

const SLUG = "/programme";
const chapter = getChapter(SLUG);

export const metadata: Metadata = {
  title: chapter.label,
  alternates: { canonical: SLUG },
};

// Placeholder brackets ([officiant], [hymn no.], etc.) are rendered as-is —
// swap them for the couple's real names/hymns/choirs when they send them.
// Do not invent content for any bracketed field.
const PROGRAMME: ProgrammeItem[] = [
  {
    eyebrow: "Arrival",
    title: "Arrival of Guests",
    secondary: "Musical prelude by the Organist & [choir/group]",
  },
  { eyebrow: "Procession", title: "Procession of Officiating Ministers" },
  { eyebrow: "Procession", title: "Bridal Procession" },
  { eyebrow: "Welcome", title: "Welcome & Introduction", secondary: "[officiant]" },
  { eyebrow: "Coordinator", title: "Coordinator", secondary: "[officiant]" },
  {
    eyebrow: "Worship",
    title: "Opening Hymn — SDAH [hymn no.]",
    secondary: "Opening Prayer — [officiant]",
  },
  { eyebrow: "Scripture", title: "Scripture Reading", secondary: "[officiant]" },
  { eyebrow: "Special Song", title: "[choir/group]" },
  { eyebrow: "Sermonette", title: "Message", secondary: "[officiant]" },
  { eyebrow: "Special Song", title: "[choir/group]" },
  { title: "Affirmation of Vows", secondary: "[officiant]" },
  {
    eyebrow: "Prayer Song",
    title: "[song / performer]",
    secondary: "Followed by Signing of the Certificate",
  },
  {
    eyebrow: "Offering",
    title: "Love Offering",
    secondary: "[officiant] · Song: [choir/group] · Offering Prayer: [officiant]",
  },
  {
    eyebrow: "Introduction",
    title: "Introduction of Couple & Presentation of Certificates",
    secondary: "[officiant] — [officiant]",
  },
  { eyebrow: "Closing", title: "Closing Hymn — SDAH [hymn no.]" },
  { eyebrow: "Closing", title: "Benediction", secondary: "[officiant]" },
  { eyebrow: "March", title: "Wedding March" },
  { eyebrow: "Recession", title: "Recession & Photography" },
];

// Reception order — placeholder brackets ([name], [officiant]) are rendered
// as-is. No names, caterers, or details invented beyond what was supplied.
const RECEPTION: ProgrammeItem[] = [
  { title: "MC", secondary: "[name]", marker: "star" },
  { title: "Opening Prayer", secondary: "[officiant]", marker: "star" },
  { title: "Arrival of the Couple", secondary: "Grand entrance", marker: "diamond" },
  { title: "Cake Cutting", marker: "diamond" },
  { title: "Proposal for Toast", secondary: "[name]", marker: "star" },
  { title: "Popping of Champagne", secondary: "Celebration begins", marker: "diamond" },
  { title: "Cocktails & Couple Dance", secondary: "Music & celebration", marker: "diamond" },
  { title: "Vote of Thanks", secondary: "[name]", marker: "star" },
  { title: "Closing Prayer", secondary: "[officiant]", marker: "star" },
];

export default function ProgrammePage() {
  return (
    <div className="flex min-h-svh flex-col">
      <PageTransition className="flex-1">
        <div className="mx-auto max-w-content px-5 pb-14 pt-16 text-center sm:px-8 sm:pb-20 sm:pt-24">
          <Reveal>
            <p className="eyebrow text-accent">Order of Service</p>
            <h1 className="mt-4 text-display-hero text-ink">The Wedding Programme</h1>
          </Reveal>
        </div>

        <div className="mx-auto max-w-content px-5 pb-16 sm:px-8">
          <ProgrammeTimeline items={PROGRAMME} />
        </div>

        {/* The reception, right after the church programme — it's the same
            day's timeline continuing, not a separate thing to explain twice. */}
        <div className="mx-auto max-w-content px-5 pb-16 sm:px-8">
          <Reveal className="border-t border-ink/10 pt-14 sm:pt-20">
            <p className="eyebrow text-accent">The Reception</p>
            <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
              The Cocktail Hour
            </h2>
            <p className="mt-2 text-sm text-secondary">
              {WEDDING_DATE_LABEL} &middot; Immediately after the ceremony
              &middot; {WHITE_WEDDING.venueName}, {WHITE_WEDDING.venueArea}{" "}
              (church premises)
            </p>
          </Reveal>
          <div className="mt-10">
            <ProgrammeTimeline items={RECEPTION} />
          </div>
        </div>

        <div className="mx-auto max-w-content px-5 pb-24 sm:px-8">
          <Reveal>
            <div className="flex flex-col items-start gap-5 border-t border-ink/10 pt-10">
              <span className="eyebrow text-secondary/70">Printable copy coming soon</span>
              <p className="max-w-[50ch] text-body leading-relaxed text-ink/70">
                A downloadable programme will be posted here closer to the
                date.
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
      </PageTransition>

      <ChapterBottomNav slug={SLUG} />
      <PageFooter />
    </div>
  );
}
