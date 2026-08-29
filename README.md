# Kwaku & Glory — The Wedding Issue

Wedding website for Kwaku Asare Okoampa Archer & Glory Nyantha Boahen —
Friday, 4th December 2026. `#ThePerfectDuo26`

Next.js (App Router, TypeScript). Built on the CF Weddings component
library, skinned to this couple's assigned layout paradigm: an
**image-led, editorial launcher** landing page feeding into a **magazine
"Wedding Issue"** interior — numbered chapters, a back/forward chapter nav,
"PAGE 0X" footers, oversized Cormorant Garamond display type against small
tracked-out Jost eyebrows, and photography leading every major section.

- **Mobile** — full-bleed placeholder-photography hero (monogram, names,
  hashtag, issue/location metadata) over a dark scrim, then an editorial
  "contents" index below: numbered chapter rows broken up by an anchoring
  image, never a stack of outlined buttons.
- **Desktop** — a three-panel split (photo | cream content column | photo),
  the premium pattern from simonwedschinchi.com. The two photo panels are
  `position: sticky` and pinned for the full page scroll, so real
  photography (once dropped in) frames the entire launcher, not just the
  hero.

## Domain

**kwakuwedsglory.com**

## Structure

- `app/page.tsx` — landing (`/`): the simon-style launcher
- `app/story`, `/details`, `/programme`, `/style-guide`, `/gallery`, `/faq`,
  `/directions`, `/gifts`, `/bridal-party` — the nine numbered chapters
  (order + nav wiring lives in `lib/chapters.ts`)
- `app/t/[token]/page.tsx` — the private traditional-ceremony page (see
  below)
- `components/` — shared pieces: `ChapterNav` (top/bottom chapter
  pagination), `ChapterHeader` (eyebrow + display heading + optional photo
  band), `Portrait` (placeholder/real photography — see below), `Countdown`,
  `EventCard`, `Accordion`, `CopyButton`, `Reveal` (IntersectionObserver
  fade-up), `CustomCursor`, `PageFooter`
- `lib/site.ts` — every couple-specific fact (names, dates, venues, map
  links, gift accounts, hero image paths) in one place — edit here, not
  per-page
- `lib/chapters.ts` — chapter order/labels/descriptors/photo-tones driving
  both the magazine nav and the landing page's contents index

## Swapping placeholder photography

The couple's shoot isn't delivered yet, so every image slot on the site —
the launcher hero, the two desktop side panels, every chapter's header
band, the gallery grid, the bridal party avatars — renders through
`components/Portrait.tsx`. With no `src`, it paints a calm, dark-toned
CSS texture (never a fake stock-photo couple) so the layout still reads as
photography-led before real photos exist.

To swap in the couple's real photos once the shoot is delivered:

1. Drop the files under `public/photos/`.
2. Point the relevant constant in `lib/site.ts` at the file path:
   - `HERO_IMAGE_SRC` — used as the mobile hero and (as a fallback) both
     desktop side panels
   - `HERO_IMAGE_LEFT_SRC` / `HERO_IMAGE_RIGHT_SRC` — set these instead if
     the desktop panels should show two different photos
3. That's it — `Portrait` switches to `next/image` (lazy-loaded, except the
   hero which loads with `priority` since it's the LCP element) with no
   other code changes.

Individual chapter image bands (Details, Style Guide, FAQ, etc.) can be
swapped the same way by passing a `src` to the relevant `<Portrait>` call
in that page, once photos for those specific moments exist.

## Open Graph share image

`public/og-image.jpg` (1200×630) is what WhatsApp, iMessage, etc. show as
the link preview card — wired up in `app/layout.tsx`'s `metadata.openGraph`
/ `metadata.twitter`, with the path resolved to an absolute URL via
`metadataBase`. It's currently a branded card built from the same temporary
placeholder hero photo and type treatment as the live hero (not a real
couple photo — see "Swapping placeholder photography" above).

To regenerate it (e.g. once real photography lands, or after any copy
change to `SITE_DESCRIPTION`/`HASHTAG` in `lib/site.ts`): the card is a
plain HTML file rendered at exactly 1200×630 and screenshotted — there's no
build-time script for this since it only needs to run once per asset
update. Recreate the HTML (same fonts/colors as `app/globals.css`, a
`file://` path to whatever photo you're using as the background), render
it at 1200×630 with a headless browser, save as `public/og-image.jpg`, and
confirm `curl -sI http://localhost:3000/og-image.jpg` returns `200`.

## Traditional ceremony privacy

The couple wants to keep uninvited guests away from the traditional
marriage. On the public site it shows only as **"Strictly by invitation
only"** — no venue, no address, no map link, and no map button on the
launcher.

The full details (Cosy Crest Apartments, Adenta + Google Maps link) live at
an unguessable, non-indexed path:

```
/t/gbkLZ4nAGSv3
```

That page is `robots: { index: false, follow: false }`, is never linked
from anywhere on the public site, and is excluded from `sitemap.ts`. Share
it directly with invited guests (WhatsApp, printed invitation, etc.) —
don't post it anywhere public. Any other token 404s.

If the couple ever wants this open to everyone instead, delete the token
check in `app/t/[token]/page.tsx` and move the details into `/details` and
`/directions` directly.

## Placeholder content (real content to come)

These sections are structurally complete but carry placeholder copy —
swap in the real thing when the couple sends it:

- **Our Story** (`/story`) — chaptered timeline shell, image slots
- **Order of Service** (`/programme`) — "View / Download Programme (PDF)"
  button is disabled until a PDF is wired up (`app/programme/page.tsx`)
- **Photos** (`/gallery`) — empty-state grid
- **FAQ** (`/faq`) — generic placeholder Q&A in `FAQ_ITEMS` — replace with
  the couple's real copy
- **Bridal Party** (`/bridal-party`) — TBA placeholder cards

## Develop

```
npm install
npm run dev      # http://localhost:3000
```

`npm run build` / `npm run start` for a production build.

## Deploy to Vercel

1. Push to the `dabick14/kwakuwedsglory` GitHub repo (already the `origin`
   remote).
2. In Vercel: New Project → import the repo. Framework preset **Next.js**
   is auto-detected, no config needed.
3. Add the custom domain: Project → Settings → Domains → add
   `kwakuwedsglory.com`, then point its DNS as Vercel instructs.
4. Deploy.

Or via CLI: `npm i -g vercel && vercel`.

Vercel Analytics is already wired up (`@vercel/analytics`, `<Analytics />`
in `app/layout.tsx`) — no extra setup needed once deployed on Vercel.

## Notes for future edits

- **Countdown** (`hooks/useCountdown.ts`) computes its first real value
  client-side only (after mount) to avoid an SSR/hydration mismatch — the
  first render is a static placeholder on both server and client. The
  interval itself declares `cdInterval` with `let` before `tick()` ever
  runs and guards every `clearInterval` call, so there's no
  temporal-dead-zone crash from `tick()`'s synchronous first call.
- **Custom cursor** (`components/CustomCursor.tsx`) only runs behind
  `(hover: hover) and (pointer: fine)` and bails out entirely under
  `prefers-reduced-motion: reduce` — touch devices keep the native cursor.
- All motion is CSS transform/opacity + `IntersectionObserver`
  (`components/Reveal.tsx`) or a raw `requestAnimationFrame` loop (the
  cursor) — no animation library.
- **Don't add a hand-written `* { margin: 0 }` reset to `globals.css`.**
  Tailwind's Preflight (bundled with `@import "tailwindcss"`) already
  provides one, correctly scoped inside Tailwind's own `base` cascade
  layer so utility classes still win over it. A reset written directly in
  this file (not inside `@layer`) is *unlayered* CSS, and per the cascade
  layers spec, unlayered rules beat every layered rule regardless of
  specificity — it would silently zero out `mt-*`, `mx-auto`, `space-y-*`,
  every margin utility on the site. (This happened once already; see git
  history if you want the full story.)
- The desktop split-panel layout needs the sticky photo panel nested
  *inside* a plain (non-sticky, non-fixed-height) grid item — see the
  comment above the panels in `app/page.tsx`. Putting `sticky` and
  `h-screen` on the grid item itself caps its own box at one viewport
  height instead of letting it track the full page scroll.
