"use client";

import { useEffect, useRef } from "react";

const EASE = 0.15;
const HOVER_SELECTOR = "a, button, [role='button']";

// Trailing ring that eases toward the real cursor with linear interpolation.
// Runs on a plain requestAnimationFrame loop and mutates DOM style directly
// (no React state) so it never triggers a re-render on mousemove.
export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reducedMotion) return;

    const ring = ringRef.current;
    if (!ring) return;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { x: mouse.x, y: mouse.y };
    const scale = { current: 1, target: 1 };
    let primed = false;
    let rafId: number;

    const onPointerMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!primed) {
        // Snap on the very first move so the ring doesn't fly in from center.
        pos.x = mouse.x;
        pos.y = mouse.y;
        primed = true;
        ring.style.opacity = "1";
      }
    };

    const onPointerOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (target?.closest(HOVER_SELECTOR)) {
        scale.target = 1.6;
        ring.classList.add("cursor-ring--active");
      }
    };

    const onPointerOut = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (target?.closest(HOVER_SELECTOR)) {
        scale.target = 1;
        ring.classList.remove("cursor-ring--active");
      }
    };

    const onPointerLeaveWindow = () => {
      ring.style.opacity = "0";
    };

    const tick = () => {
      pos.x += (mouse.x - pos.x) * EASE;
      pos.y += (mouse.y - pos.y) * EASE;
      scale.current += (scale.target - scale.current) * EASE;
      ring.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${scale.current})`;
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver, { passive: true });
    document.addEventListener("pointerout", onPointerOut, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeaveWindow);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      document.documentElement.removeEventListener("pointerleave", onPointerLeaveWindow);
    };
  }, []);

  return <div ref={ringRef} className="cursor-ring" aria-hidden />;
}
