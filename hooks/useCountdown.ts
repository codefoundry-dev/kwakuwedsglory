"use client";

import { useEffect, useState } from "react";

export type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isToday: boolean;
  isPast: boolean;
};

function diffToParts(diffMs: number): CountdownParts {
  if (diffMs <= 0) {
    // Still "today" for the first 24h after the target moment, so the copy
    // doesn't flip straight to "past" while the ceremony is happening.
    const isToday = diffMs > -24 * 60 * 60 * 1000;
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isToday, isPast: !isToday };
  }
  const totalSeconds = Math.floor(diffMs / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    isToday: totalSeconds < 86400,
    isPast: false,
  };
}

// Ticks down to `targetIso` every second. `cdInterval` is declared with `let`
// *before* tick() ever runs, and every reference to it is guarded — tick()
// fires once synchronously on mount (before the setInterval call below has a
// chance to assign its return value), so reaching into a `const` there would
// throw a temporal-dead-zone ReferenceError.
//
// `parts` starts as `null` on both server and client — computing it from
// `Date.now()` in the initializer would read a different instant during SSR
// than during client hydration and trigger a hydration mismatch. The first
// real value is only ever computed client-side, inside the effect below.
export function useCountdown(targetIso: string): CountdownParts | null {
  const [parts, setParts] = useState<CountdownParts | null>(null);

  useEffect(() => {
    const target = new Date(targetIso).getTime();
    let cdInterval: ReturnType<typeof setInterval> | undefined;

    const tick = () => {
      const next = diffToParts(target - Date.now());
      setParts(next);
      if (next.isPast && cdInterval) {
        clearInterval(cdInterval);
      }
    };

    tick();
    cdInterval = setInterval(tick, 1000);

    return () => {
      if (cdInterval) clearInterval(cdInterval);
    };
  }, [targetIso]);

  return parts;
}
