"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CHAPTERS } from "@/lib/chapters";
import { MONOGRAM, WEDDING_DATE_ISO } from "@/lib/site";

type MenuItem = { slug: string; number: string; label: string };

const COVER: MenuItem = { slug: "/", number: "00", label: "Cover" };
const MENU_ITEMS: MenuItem[] = [
  COVER,
  ...CHAPTERS.map(({ slug, number, label }) => ({ slug, number, label })),
];

function formatDateDots(iso: string) {
  const [year, month, day] = iso.split("-");
  return `${day} . ${month} . ${year}`;
}

const SCROLL_THRESHOLD = 8;
const TOP_ZONE = 80;
// If the destination hasn't reported ready by this point (slow network,
// or a navigation that silently fails), lift the overlay anyway rather
// than risk it getting stuck open forever.
const SAFETY_TIMEOUT_MS = 2000;

// PageTransition (mounted fresh on every new page) calls this once it has
// scrolled to top — that's SiteNav's cue to lift the loading overlay. It's
// a context specifically because SiteNav now lives in the root layout and
// stays mounted across navigations, while the page underneath (and its
// PageTransition) unmounts and remounts on every route change — there's no
// direct parent/child relationship to pass a plain callback prop through.
const PageReadyContext = createContext<() => void>(() => {});
export function usePageReady() {
  return useContext(PageReadyContext);
}

// Root-layout nav: fixed three-zone bar (monogram | current chapter | menu)
// that hides on scroll-down/reveals on scroll-up, plus the full-screen
// chapter overlay it opens. Wraps `children` so it persists across client
// navigations instead of unmounting per page — required for the overlay's
// "stay open and locked until the destination is actually ready" behaviour
// below, which can't survive being torn down mid-navigation.
export default function SiteNav({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navigatingHref, setNavigatingHref] = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  // Mirrors `navigatingHref` for the click-guard, which needs a value that's
  // always current *inside the same tick* — state updates are batched/async,
  // so two rapid taps could both read a stale `null` from state before the
  // first re-render lands. The ref has no such lag.
  const navigatingHrefRef = useRef<string | null>(null);
  const safetyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const current = MENU_ITEMS.find((item) => item.slug === pathname);
  const centerLabel = current?.label ?? "";
  const showBar = pathname !== "/";

  const clearSafetyTimeout = useCallback(() => {
    if (safetyTimeoutRef.current) {
      clearTimeout(safetyTimeoutRef.current);
      safetyTimeoutRef.current = null;
    }
  }, []);

  const finishNavigating = useCallback(() => {
    clearSafetyTimeout();
    navigatingHrefRef.current = null;
    setNavigatingHref(null);
    setMenuOpen(false);
  }, [clearSafetyTimeout]);

  // The signal PageTransition calls once the destination has mounted and
  // scrolled to top. Only acts if we were actually waiting on a navigation
  // — a plain client-side re-render elsewhere shouldn't close the overlay.
  const notifyPageReady = useCallback(() => {
    if (navigatingHrefRef.current !== null) {
      finishNavigating();
    }
  }, [finishNavigating]);

  // Hide on scroll-down, reveal on scroll-up — rAF-throttled with a small
  // delta threshold so it doesn't flicker on sub-pixel/momentum scrolls,
  // and always visible near the top regardless of direction.
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      if (y < TOP_ZONE) {
        setHidden(false);
      } else if (delta > SCROLL_THRESHOLD) {
        setHidden(true);
      } else if (delta < -SCROLL_THRESHOLD) {
        setHidden(false);
      }
      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body scroll lock, initial focus, Escape-to-close, and a manual focus
  // trap while the overlay is open. Escape and the close button are no-ops
  // while a navigation is in flight — see handleRowClick.
  useEffect(() => {
    if (!menuOpen) return;

    const { style } = document.body;
    const previousOverflow = style.overflow;
    style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (navigatingHrefRef.current === null) setMenuOpen(false);
        return;
      }
      if (e.key !== "Tab" || !overlayRef.current) return;
      const focusables = overlayRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      menuButtonRef.current?.focus();
    };
  }, [menuOpen]);

  // Clean up a pending safety timeout if the component itself ever
  // unmounts mid-navigation (shouldn't happen now that SiteNav lives in
  // the root layout, but cheap insurance against a leaked timer).
  useEffect(() => clearSafetyTimeout, [clearSafetyTimeout]);

  const handleRowClick = (href: string) => (e: React.MouseEvent) => {
    // Locked mid-navigation — every row (including the one already
    // loading) ignores further taps until the destination is ready or the
    // safety timeout fires. This is the part that makes repeat-tapping
    // impossible to queue up.
    if (navigatingHrefRef.current !== null) {
      e.preventDefault();
      return;
    }
    // Already on this chapter — nothing to wait for, just close.
    if (href === pathname) {
      setMenuOpen(false);
      return;
    }

    navigatingHrefRef.current = href;
    setNavigatingHref(href);
    // Let the <Link> proceed with real navigation — no preventDefault here.
    safetyTimeoutRef.current = setTimeout(finishNavigating, SAFETY_TIMEOUT_MS);
  };

  return (
    <PageReadyContext.Provider value={notifyPageReady}>
      {showBar && (
        <nav
          aria-label="Primary"
          className={`site-nav sticky top-0 z-40 grid grid-cols-[1fr_auto_1fr] items-center border-b border-ink/10 bg-bg/90 px-5 py-4 backdrop-blur-sm sm:px-8 ${
            hidden ? "site-nav--hidden" : ""
          }`}
        >
          <div className="justify-self-start">
            <Link
              href="/"
              className="font-display text-lg italic text-ink transition-colors hover:text-accent"
            >
              {MONOGRAM}
            </Link>
          </div>

          <div className="min-w-0 justify-self-center px-4">
            <span className="block max-w-[50vw] truncate text-center text-[0.7rem] uppercase tracking-[0.15em] text-secondary sm:max-w-xs sm:text-xs">
              {centerLabel}
            </span>
          </div>

          <div className="justify-self-end">
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-haspopup="dialog"
              className="flex h-8 w-8 flex-col items-center justify-center gap-[5px]"
            >
              <span aria-hidden className="h-px w-5 bg-ink" />
              <span aria-hidden className="h-px w-5 bg-ink" />
              <span className="sr-only">Open chapter menu</span>
            </button>
          </div>
        </nav>
      )}

      {children}

      <div
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label="Chapter menu"
        aria-busy={navigatingHref !== null}
        // Removes the closed overlay from the focus/tab order entirely
        // (not just visually) — otherwise a keyboard user tabbing past the
        // menu button would land on invisible, off-screen chapter links.
        inert={!menuOpen}
        className={`site-menu fixed inset-0 z-50 flex flex-col bg-bg ${
          menuOpen ? "site-menu--open" : ""
        }`}
      >
        <div className="flex items-center justify-end px-5 py-4 sm:px-8">
          <button
            ref={closeButtonRef}
            type="button"
            disabled={navigatingHref !== null}
            onClick={() => setMenuOpen(false)}
            className="flex h-8 w-8 items-center justify-center text-2xl text-ink transition-colors hover:text-accent disabled:opacity-30"
          >
            <span aria-hidden>&times;</span>
            <span className="sr-only">Close menu</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 sm:px-8">
          <ul className="mx-auto max-w-content">
            {MENU_ITEMS.map((item) => {
              const isCurrent = item.slug === pathname;
              const isLoadingThis = item.slug === navigatingHref;
              const isLocked = navigatingHref !== null;
              return (
                <li key={item.slug} className="border-b border-ink/10">
                  <Link
                    href={item.slug}
                    aria-disabled={isLocked}
                    tabIndex={isLocked && !isLoadingThis ? -1 : undefined}
                    onClick={handleRowClick(item.slug)}
                    className={`flex items-center gap-5 py-4 transition-[color,transform,opacity] duration-150 sm:py-5 ${
                      isLocked && !isLoadingThis ? "pointer-events-none opacity-30" : ""
                    } ${
                      !isLocked ? "active:scale-[0.98] active:opacity-60" : ""
                    } ${
                      isCurrent || isLoadingThis
                        ? "text-accent"
                        : "text-ink hover:text-accent active:text-accent"
                    }`}
                  >
                    <span className="eyebrow shrink-0 self-start text-secondary/60">
                      {item.number}
                    </span>
                    <span className="font-display text-2xl sm:text-3xl">{item.label}</span>
                    {isLoadingThis && (
                      <span className="ml-auto flex shrink-0 items-center" role="status">
                        <span aria-hidden className="nav-loading-spinner" />
                        <span className="nav-loading-text eyebrow text-accent">
                          Loading&hellip;
                        </span>
                        <span className="sr-only">Loading {item.label}</span>
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex items-center justify-between border-t border-ink/10 px-5 py-5 sm:px-8">
          <span className="eyebrow text-secondary/70">The Wedding Issue</span>
          <span className="eyebrow text-secondary/70">{formatDateDots(WEDDING_DATE_ISO)}</span>
        </div>
      </div>
    </PageReadyContext.Provider>
  );
}
