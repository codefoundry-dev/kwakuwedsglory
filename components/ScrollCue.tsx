"use client";

import { useEffect, useState } from "react";

// Bottom-center scroll affordance for the mobile hero. Bounces gently via a
// CSS keyframe (disabled under prefers-reduced-motion — see globals.css)
// and fades out via opacity once the guest actually starts scrolling.
export default function ScrollCue() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 bottom-6 flex justify-center transition-opacity duration-500 ${
        scrolled ? "opacity-0" : "opacity-100"
      }`}
    >
      <svg
        className="scroll-cue-bounce h-6 w-6 text-bg/80"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
  );
}
