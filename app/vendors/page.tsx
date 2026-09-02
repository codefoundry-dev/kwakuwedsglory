import type { Metadata } from "next";
import { ChapterBottomNav } from "@/components/ChapterNav";
import PageTransition from "@/components/PageTransition";
import PageFooter from "@/components/PageFooter";
import Reveal from "@/components/Reveal";
import VendorIcon from "@/components/VendorIcon";
import { getChapter } from "@/lib/chapters";
import { VENDORS, telHref } from "@/lib/vendors";

const SLUG = "/vendors";
const chapter = getChapter(SLUG);

export const metadata: Metadata = {
  title: chapter.label,
  alternates: { canonical: SLUG },
};

export default function VendorsPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <PageTransition className="flex-1">
        <div className="mx-auto max-w-content px-5 pb-14 pt-16 text-center sm:px-8 sm:pb-20 sm:pt-24">
          <Reveal>
            <p className="eyebrow text-accent">With Thanks</p>
            <h1 className="mt-4 text-display-hero text-ink">Vendors</h1>
            <p className="mx-auto mt-6 max-w-[42ch] text-base leading-relaxed text-secondary sm:text-lg">
              The dream team who brought our day to life — with all our
              gratitude.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto max-w-content px-5 pb-24 sm:px-8">
          <div className="space-y-5 sm:space-y-6">
            {VENDORS.map((vendor, i) => (
              <Reveal key={vendor.name} delay={i * 80}>
                <div className="flex items-start gap-5 rounded-2xl border-l-[3px] border-accent bg-blush/20 p-6 sm:items-center sm:gap-6 sm:p-7">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent sm:h-14 sm:w-14">
                    <VendorIcon icon={vendor.icon} />
                  </div>

                  <div className="min-w-0">
                    <p className="eyebrow text-accent">{vendor.role}</p>
                    <h2 className="mt-1.5 font-display text-2xl text-ink sm:text-3xl">
                      {vendor.name}
                    </h2>
                    {vendor.phone ? (
                      <a
                        href={telHref(vendor.phone)}
                        className="mt-2 inline-flex items-center gap-2 text-sm font-medium tracking-wide text-accent transition-colors active:opacity-70 sm:text-base"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 shrink-0"
                          aria-hidden
                        >
                          <path d="M6.5 3.5c-.9 0-1.7.5-2.1 1.3-1 1.9-.2 5.7 3.4 9.3s7.4 4.4 9.3 3.4c.8-.4 1.3-1.2 1.3-2.1v-1.7a1 1 0 0 0-.8-1l-3-.7a1 1 0 0 0-1 .3l-1 1.1c-1.7-.9-3.1-2.3-4-4l1.1-1a1 1 0 0 0 .3-1l-.7-3a1 1 0 0 0-1-.8Z" />
                        </svg>
                        {vendor.phone}
                      </a>
                    ) : (
                      <p className="mt-2 text-sm italic text-secondary/60 sm:text-base">
                        [number to be added]
                      </p>
                    )}
                  </div>
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
