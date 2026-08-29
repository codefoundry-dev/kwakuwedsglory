import type { Metadata } from "next";
import { ChapterTopNav, ChapterBottomNav } from "@/components/ChapterNav";
import ChapterHeader from "@/components/ChapterHeader";
import PageFooter from "@/components/PageFooter";
import Reveal from "@/components/Reveal";
import CopyButton from "@/components/CopyButton";
import { getChapter } from "@/lib/chapters";
import { GIFTS } from "@/lib/site";

const SLUG = "/gifts";
const chapter = getChapter(SLUG);

export const metadata: Metadata = {
  title: chapter.label,
  alternates: { canonical: SLUG },
};

export default function GiftsPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <ChapterTopNav slug={SLUG} />

      <main className="flex-1">
        <ChapterHeader
          eyebrow={chapter.eyebrow}
          title="Gifts"
          subtitle="Your presence at our wedding is the greatest gift of all. For those who wish to bless us further, here's where."
          tone={chapter.tone}
        />

        <div className="mx-auto max-w-content px-5 pb-24 pt-16 sm:px-8 sm:pt-24">
          <Reveal>
            <div className="rounded-3xl border border-ink/10 bg-white/40 p-8 sm:p-10">
              <h2 className="font-display text-2xl text-ink">Mobile Money</h2>
              <div className="mt-6 space-y-4">
                {GIFTS.momo.map((account) => (
                  <div
                    key={account.number}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-ink/10 px-5 py-4"
                  >
                    <div>
                      <p className="font-display text-lg text-ink tracking-wide">
                        {account.number}
                      </p>
                      <p className="text-xs text-secondary">{account.name}</p>
                    </div>
                    <CopyButton value={account.number} />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={80} className="mt-8">
            <div className="rounded-3xl border border-ink/10 bg-white/40 p-8 sm:p-10">
              <h2 className="font-display text-2xl text-ink">Bank Transfer</h2>
              <div className="mt-6 space-y-3 text-sm text-ink/80">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-secondary">Bank</span>
                  <span>
                    {GIFTS.bank.bankName} &middot; {GIFTS.bank.branch}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4 border-t border-ink/10 pt-3">
                  <span className="text-secondary">Account Name</span>
                  <span className="text-right">{GIFTS.bank.accountName}</span>
                </div>
                <div className="flex items-center justify-between gap-4 border-t border-ink/10 pt-3">
                  <div>
                    <span className="text-secondary">Account Number</span>
                    <p className="font-display text-lg tracking-wide text-ink">
                      {GIFTS.bank.accountNumber}
                    </p>
                  </div>
                  <CopyButton value={GIFTS.bank.accountNumber} />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </main>

      <ChapterBottomNav slug={SLUG} />
      <PageFooter />
    </div>
  );
}
