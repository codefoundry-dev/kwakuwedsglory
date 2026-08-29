"use client";

import { useCountdown } from "@/hooks/useCountdown";

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="font-display text-3xl sm:text-4xl tabular-nums text-ink leading-none">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[0.65rem] tracking-[0.2em] uppercase text-secondary">
        {label}
      </span>
    </div>
  );
}

export default function Countdown({ targetIso }: { targetIso: string }) {
  const parts = useCountdown(targetIso);

  if (!parts) {
    // Same shape as the ticking state, rendered identically on server and
    // client — avoids a hydration mismatch while the real value (which can
    // only be computed client-side) is still being calculated.
    return (
      <div className="flex items-start gap-4 sm:gap-6" aria-hidden>
        <Unit value={0} label="Days" />
        <Unit value={0} label="Hrs" />
        <Unit value={0} label="Min" />
        <Unit value={0} label="Sec" />
      </div>
    );
  }

  const { days, hours, minutes, seconds, isToday, isPast } = parts;

  if (isPast) {
    return (
      <p className="font-display italic text-xl text-accent">
        With gratitude — this celebration has taken place.
      </p>
    );
  }

  if (isToday) {
    return (
      <p className="font-display italic text-2xl sm:text-3xl text-accent">
        It&rsquo;s today!
      </p>
    );
  }

  return (
    <div className="flex items-start gap-4 sm:gap-6" role="timer" aria-live="polite">
      <Unit value={days} label="Days" />
      <Unit value={hours} label="Hrs" />
      <Unit value={minutes} label="Min" />
      <Unit value={seconds} label="Sec" />
    </div>
  );
}
