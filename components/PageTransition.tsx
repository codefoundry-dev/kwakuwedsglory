"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePageReady } from "@/components/SiteNav";

// Wraps every chapter's <main> (and the landing page's own root). Three
// jobs, all about making a chapter change feel instant rather than like
// the tap did nothing:
//
// 1. Force an immediate, non-animated scroll to the top on every mount
//    (i.e. every chapter navigation). `behavior: "instant"` is required,
//    not optional — globals.css sets `scroll-behavior: smooth` on <html>
//    for in-page anchors, and that also hijacks plain `scrollTo(0, 0)` /
//    Next's own scroll restoration, turning "jump to top" into a slow
//    animated scroll that reads as exactly the lag this fixes.
// 2. Tell SiteNav's loading overlay (if one is up, waiting) that this page
//    has mounted and is already sitting at scrollY 0 — that's its cue to
//    lift, so the guest never sees the previous page or a mid-scroll jump
//    underneath. A no-op if no navigation is in flight.
// 3. A short opacity fade-in as the new content mounts, so the swap reads
//    as an intentional transition instead of a dead pause.
export default function PageTransition({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const [visible, setVisible] = useState(false);
  const notifyPageReady = usePageReady();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    notifyPageReady();
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className={`page-transition ${visible ? "page-transition--visible" : ""} ${className ?? ""}`}>
      {children}
    </main>
  );
}
