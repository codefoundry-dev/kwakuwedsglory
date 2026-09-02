import type { Metadata } from "next";
import { ChapterBottomNav } from "@/components/ChapterNav";
import PageTransition from "@/components/PageTransition";
import ChapterHeader from "@/components/ChapterHeader";
import PageFooter from "@/components/PageFooter";
import Reveal from "@/components/Reveal";
import Accordion from "@/components/Accordion";
import { getChapter } from "@/lib/chapters";

const SLUG = "/faq";
const chapter = getChapter(SLUG);

export const metadata: Metadata = {
  title: chapter.label,
  alternates: { canonical: SLUG },
};

// Placeholder copy — swap for the couple's real FAQ answers when they send them.
const FAQ_ITEMS = [
  {
    question: "What should I wear?",
    answer:
      "Elegant, colourful, and wedding-ready — see the Style Guide chapter for the full guidance.",
  },
  {
    question: "Can I bring a plus-one?",
    answer:
      "Please refer to your invitation for guest allowances, or reach out to Kwaku or Glory directly.",
  },
  {
    question: "Is there parking at the venues?",
    answer:
      "Parking is available at both venues, though space is limited — arriving a little early is recommended.",
  },
  {
    question: "Can I take photos during the ceremony?",
    answer:
      "Yes — feel free to capture the moment. We'll share where to send or tag your favourites in the Photos chapter.",
  },
  {
    question: "Where should I send a gift?",
    answer: "See the Gifts chapter for MoMo and bank details.",
  },
];

export default function FaqPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <PageTransition className="flex-1">
        <ChapterHeader
          eyebrow={chapter.eyebrow}
          title="FAQ"
          subtitle="Answers to the questions we hear most."
          tone={chapter.tone}
        />

        <div className="mx-auto max-w-content px-5 pb-24 pt-16 sm:px-8 sm:pt-24">
          <Reveal>
            <Accordion items={FAQ_ITEMS} />
          </Reveal>
        </div>
      </PageTransition>

      <ChapterBottomNav slug={SLUG} />
      <PageFooter />
    </div>
  );
}
