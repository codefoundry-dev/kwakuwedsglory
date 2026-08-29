"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// Fade-up on scroll via IntersectionObserver — CSS transform/opacity only,
// no animation library. Respects prefers-reduced-motion (see globals.css,
// which forces .reveal elements to their visible state when that's set).
export default function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", visible && "reveal-visible", className)}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
