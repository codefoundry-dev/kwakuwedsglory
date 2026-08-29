import type { Metadata } from "next";
import { ChapterTopNav, ChapterBottomNav } from "@/components/ChapterNav";
import ChapterHeader from "@/components/ChapterHeader";
import PageFooter from "@/components/PageFooter";
import Reveal from "@/components/Reveal";
import Portrait from "@/components/Portrait";
import { getChapter } from "@/lib/chapters";
import { getBridalPartyMembers } from "@/lib/bridalParty";

const SLUG = "/bridal-party";
const chapter = getChapter(SLUG);

export const metadata: Metadata = {
  title: chapter.label,
  alternates: { canonical: SLUG },
};

export default function BridalPartyPage() {
  const members = getBridalPartyMembers();

  return (
    <div className="flex min-h-svh flex-col">
      <ChapterTopNav slug={SLUG} />

      <main className="flex-1">
        <ChapterHeader
          eyebrow={chapter.eyebrow}
          title="Bridal Party"
          subtitle="The friends and family standing beside Kwaku &amp; Glory on the day."
        />

        <div className="mx-auto max-w-content px-5 pb-24 pt-4 sm:px-8">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-14">
            {members.map((member, i) => (
              <Reveal key={member.name} delay={i * 60}>
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
                  <Portrait
                    src={member.src}
                    alt={member.name}
                    sizes="(min-width: 640px) 30vw, 90vw"
                    objectPosition={member.focus}
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
                <div className="mt-4">
                  <p className="eyebrow text-accent">
                    {String(i + 1).padStart(2, "0")}
                    {member.role ? ` · ${member.role}` : ""}
                  </p>
                  <h2 className="mt-2 font-display text-2xl text-ink sm:text-3xl">
                    {member.name}
                  </h2>
                  <p className="mt-2 text-xs italic text-secondary/70">
                    Fun fact — to be added
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {members.length === 0 && (
            <Reveal>
              <p className="text-body text-secondary">
                Photos coming soon — check back closer to the big day.
              </p>
            </Reveal>
          )}
        </div>
      </main>

      <ChapterBottomNav slug={SLUG} />
      <PageFooter />
    </div>
  );
}
