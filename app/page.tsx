import Link from "next/link";
import Reveal from "@/components/Reveal";
import Portrait from "@/components/Portrait";
import ScrollCue from "@/components/ScrollCue";
import PageFooter from "@/components/PageFooter";
import { CHAPTERS, type Chapter } from "@/lib/chapters";
import {
  MONOGRAM,
  COUPLE_NAMES,
  GROOM_FULL_NAME,
  BRIDE_FULL_NAME,
  HASHTAG,
  WEDDING_DATE_LABEL,
  ISSUE_LABEL,
  LOCATION_LABEL,
  TRADITIONAL_CEREMONY,
  WHITE_WEDDING,
  HERO_IMAGE_SRC,
  HERO_IMAGE_LEFT_SRC,
  HERO_IMAGE_RIGHT_SRC,
} from "@/lib/site";

function ChapterRow({ chapter, delay }: { chapter: Chapter; delay: number }) {
  return (
    <Reveal delay={delay}>
      <Link
        href={chapter.slug}
        className="group flex items-start gap-4 border-b border-ink/10 py-5 sm:items-center sm:gap-6 sm:py-6"
      >
        <span className="eyebrow shrink-0 pt-1 text-accent/70 sm:pt-0">{chapter.number}</span>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-2xl leading-tight text-ink transition-colors duration-300 group-hover:text-accent sm:text-3xl">
            {chapter.label}
          </h3>
          <p className="mt-1 text-sm text-secondary">{chapter.descriptor}</p>
        </div>
        <span
          aria-hidden
          className="mt-1 shrink-0 text-accent/60 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent sm:mt-0"
        >
          &rarr;
        </span>
      </Link>
    </Reveal>
  );
}

export default function LandingPage() {
  const firstGroup = CHAPTERS.slice(0, 3);
  const secondGroup = CHAPTERS.slice(3);

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(380px,640px)_minmax(0,1fr)]">
      {/* Left photo panel — desktop only. The grid item itself stretches to
          match the (tall) center column's height by default; the sticky
          h-screen element lives *inside* it, one level down, so it has a
          tall containing block to stay pinned within for the full scroll
          instead of only its own 100vh box. */}
      <div className="hidden lg:block">
        <div className="lg:sticky lg:top-0 lg:h-screen">
          <Portrait
            src={HERO_IMAGE_LEFT_SRC ?? HERO_IMAGE_SRC}
            tone="floral"
            alt="Kwaku & Glory"
            priority
            sizes="33vw"
            className="h-full w-full"
          />
        </div>
      </div>

      <div className="flex min-h-svh flex-col">
        {/* MOBILE hero — true full-bleed: 100svh (with a 100vh fallback for
            older browsers, see .hero-full) so it always fills the viewport
            edge-to-edge with no gap under it, accounting for mobile browser
            chrome instead of over/under-cropping like a bare 100vh would. */}
        <section className="hero-full relative flex flex-col overflow-hidden lg:hidden">
          <Portrait
            src={HERO_IMAGE_SRC}
            tone="floral"
            alt="Kwaku & Glory"
            priority
            className="absolute inset-0 h-full w-full"
          />
          <div className="portrait-scrim" aria-hidden />
          <ScrollCue />

          <div className="relative z-10 flex flex-1 flex-col justify-between px-6 pb-10 pt-8">
            <Reveal className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.25em] text-blush/85">
              <span>{ISSUE_LABEL}</span>
              <span>{LOCATION_LABEL}</span>
            </Reveal>

            <div className="flex flex-col items-center pt-24 text-center">
              <Reveal>
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-bg/50">
                  <span className="font-display text-xl italic text-bg">{MONOGRAM}</span>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-6 text-display-hero text-bg">{COUPLE_NAMES}</h1>
              </Reveal>
              <Reveal delay={140}>
                <p className="mt-4 font-display text-xl italic text-blush">{HASHTAG}</p>
              </Reveal>
              <Reveal delay={190}>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-bg/70">
                  {WEDDING_DATE_LABEL}
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* DESKTOP header — no image here; the flanking panels carry the photography */}
        <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:items-center lg:justify-center lg:px-10 lg:pb-16 lg:pt-20 lg:text-center">
          <Reveal className="flex items-center gap-4 text-[0.65rem] uppercase tracking-[0.25em] text-secondary/70">
            <span>{ISSUE_LABEL}</span>
            <span aria-hidden>&middot;</span>
            <span>{LOCATION_LABEL}</span>
          </Reveal>
          <Reveal delay={60}>
            <div className="mx-auto mt-8 flex h-16 w-16 items-center justify-center rounded-full border border-accent/50">
              <span className="font-display text-xl italic text-accent">{MONOGRAM}</span>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 text-display-hero-column text-ink">{COUPLE_NAMES}</h1>
          </Reveal>
          <Reveal delay={170}>
            <p className="mt-2 text-[0.7rem] uppercase tracking-[0.2em] text-secondary">
              {GROOM_FULL_NAME} &amp; {BRIDE_FULL_NAME}
            </p>
          </Reveal>
          <Reveal delay={210}>
            <p className="mt-5 font-display text-2xl italic text-accent">{HASHTAG}</p>
          </Reveal>
          <Reveal delay={250}>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-secondary/70">
              {WEDDING_DATE_LABEL}
            </p>
          </Reveal>
        </div>

        {/* Editorial contents index — numbered chapters, generous spacing,
            broken up by an anchoring image, never a stack of pill buttons */}
        <nav aria-label="Wedding chapters" className="mx-auto w-full max-w-content px-6 pt-14 sm:px-10 sm:pt-20 lg:px-12">
          <Reveal>
            <p className="eyebrow text-accent">Contents</p>
          </Reveal>

          <div className="mt-6 border-t border-ink/10">
            {firstGroup.map((chapter, i) => (
              <ChapterRow key={chapter.slug} chapter={chapter} delay={i * 40} />
            ))}
          </div>

          <Reveal delay={firstGroup.length * 40} className="my-10 sm:my-14">
            <Portrait
              tone="botanical"
              alt="A preview of the day, to come"
              className="aspect-[4/5] w-full rounded-sm sm:aspect-[16/9]"
            />
            <p className="mt-3 text-center text-[0.65rem] uppercase tracking-[0.2em] text-secondary/70">
              Photography to come
            </p>
          </Reveal>

          <div className="border-t border-ink/10">
            {secondGroup.map((chapter, i) => (
              <ChapterRow key={chapter.slug} chapter={chapter} delay={i * 40} />
            ))}
          </div>
        </nav>

        {/* Getting there */}
        <section className="mx-auto w-full max-w-content px-6 pb-16 pt-14 sm:px-10 sm:pt-20 lg:px-12">
          <Reveal>
            <div className="rounded-sm border border-ink/10 bg-blush/20 p-6 sm:p-8">
              <p className="eyebrow text-accent">Getting There</p>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 pb-6">
                <div className="min-w-0">
                  <p className="font-display text-xl text-ink">{TRADITIONAL_CEREMONY.label}</p>
                  <p className="text-xs text-secondary">{TRADITIONAL_CEREMONY.time}</p>
                </div>
                <span className="shrink-0 whitespace-nowrap rounded-full border border-secondary/40 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.1em] text-secondary">
                  By Invitation
                </span>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-display text-xl text-ink">{WHITE_WEDDING.label}</p>
                  <p className="text-xs text-secondary">{WHITE_WEDDING.time}</p>
                </div>
                <a
                  href={WHITE_WEDDING.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 whitespace-nowrap rounded-full bg-accent px-4 py-2.5 text-[0.65rem] uppercase tracking-[0.1em] text-bg transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80} className="mt-8 text-center">
            <p className="mx-auto max-w-[36ch] text-xs leading-relaxed text-secondary/80">
              Save this page or rescan the QR code on your invitation any
              time — everything you need lives right here.
            </p>
          </Reveal>
        </section>

        <PageFooter />
      </div>

      {/* Right photo panel — desktop only (same stretch + inner-sticky fix) */}
      <div className="hidden lg:block">
        <div className="lg:sticky lg:top-0 lg:h-screen">
          <Portrait
            src={HERO_IMAGE_RIGHT_SRC ?? HERO_IMAGE_SRC}
            tone="interior"
            alt="Kwaku & Glory"
            sizes="33vw"
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}
