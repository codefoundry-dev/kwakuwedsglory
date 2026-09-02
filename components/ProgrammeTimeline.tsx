"use client";

import { useEffect, useRef, useState } from "react";

export type TimelineMarker = "ring" | "diamond" | "star";

export type ProgrammeItem = {
  /** Small tracked-out uppercase category label — optional; omit for items
   * with no natural category (see the data in each chapter using this). */
  eyebrow?: string;
  title: string;
  /** Officiant / hymn / choir / person line(s) — rendered exactly as given. */
  secondary?: string;
  /** Marker shape on the line — "ring" (hollow ring, filled centre, the
   * default) or the alternating "diamond" (♦, moment) / "star" (✦, spoken)
   * pair used on the reception timeline. */
  marker?: TimelineMarker;
};

function TimelineNodeMarker({ marker = "ring" }: { marker?: TimelineMarker }) {
  if (marker === "diamond") {
    return (
      <span
        aria-hidden
        className="relative z-10 mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-bg"
      >
        <span
          className="timeline-marker-fill leading-none text-accent"
          style={{ fontSize: "13px" }}
        >
          &#9830;
        </span>
      </span>
    );
  }

  if (marker === "star") {
    return (
      <span
        aria-hidden
        className="relative z-10 mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-bg"
      >
        <span
          className="timeline-marker-fill leading-none text-accent"
          style={{ fontSize: "16px" }}
        >
          &#10022;
        </span>
      </span>
    );
  }

  return (
    <span
      aria-hidden
      className="relative z-10 mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-accent bg-bg"
    >
      <span className="timeline-marker-fill h-1.5 w-1.5 rounded-full bg-accent" />
    </span>
  );
}

// Vertical timeline: each <li> is its own IntersectionObserver target, so
// the fade/rise stagger comes for free from scroll position (no synthetic
// per-index delay). The same observer callback advances `revealed`, which
// drives the accent line's scaleY — a proportional, CSS-transform-only
// approximation of "the line draws as you scroll into view" without
// needing continuous scroll-position math. Reused by both the Order of
// Service and Reception (cocktail hour) timelines.
export default function ProgrammeTimeline({ items }: { items: ProgrammeItem[] }) {
  const [revealed, setRevealed] = useState(0);
  const nodeRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLLIElement;
          el.classList.add("timeline-node--visible");
          const index = Number(el.dataset.index);
          setRevealed((prev) => Math.max(prev, index + 1));
          observer.unobserve(el);
        });
      },
      { threshold: 0.4, rootMargin: "0px 0px -10% 0px" }
    );

    nodeRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const progress = items.length ? revealed / items.length : 0;

  return (
    <div className="relative">
      {/* Base track — always visible, faint. */}
      <div className="absolute left-2 top-2 bottom-2 w-px bg-ink/10" aria-hidden />
      {/* Accent progress line — "draws" downward as nodes reveal. */}
      <div
        className="timeline-line-progress absolute left-2 top-2 bottom-2 w-px bg-accent"
        style={{ transform: `scaleY(${progress})` }}
        aria-hidden
      />

      <ol className="relative flex flex-col gap-12 sm:gap-14">
        {items.map((item, i) => (
          <li
            key={i}
            ref={(el) => {
              nodeRefs.current[i] = el;
            }}
            data-index={i}
            className="timeline-node flex gap-5"
          >
            <TimelineNodeMarker marker={item.marker} />
            <div className="min-w-0 flex-1 pb-1">
              {item.eyebrow && <p className="eyebrow text-accent">{item.eyebrow}</p>}
              <h3
                className={`font-display text-2xl text-ink sm:text-3xl ${item.eyebrow ? "mt-2" : ""}`}
              >
                {item.title}
              </h3>
              {item.secondary && (
                <p className="mt-1.5 text-sm text-secondary">{item.secondary}</p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
