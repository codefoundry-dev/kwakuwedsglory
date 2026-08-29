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
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-14">
            {members.map((member, i) => (
              <Reveal key={member.name} delay={i * 60}>
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
                  <Portrait
                    src={member.src}
                    alt={member.name}
                    sizes="(min-width: 640px) 30vw, 45vw"
                    className="absolute inset-0 h-full w-full"
                  />
                  <div className="portrait-scrim" aria-hidden />
                  <span className="absolute left-3 top-3 text-[0.65rem] uppercase tracking-[0.2em] text-bg/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-3">
                    {member.role && (
                      <p className="text-[0.6rem] uppercase tracking-[0.15em] text-blush/90">
                        {member.role}
                      </p>
                    )}
                    <h2 className="font-display text-2xl leading-tight text-bg">
                      {member.name}
                    </h2>
                  </div>
                </div>
                <p className="mt-3 text-xs italic text-secondary/70">
                  Fun fact — to be added
                </p>
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
