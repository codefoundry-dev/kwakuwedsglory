import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Countdown from "@/components/Countdown";
import PageFooter from "@/components/PageFooter";
import { TRADITIONAL_CEREMONY, TRADITIONAL_SECRET_TOKEN, MONOGRAM } from "@/lib/site";
import Link from "next/link";

// Unguessable, non-indexed page — the only place the traditional ceremony's
// venue and map link are ever shown. Never linked from anywhere on the
// public site; reachable only by whoever has this exact URL.
export const metadata: Metadata = {
  title: "Traditional Marriage — Private",
  robots: { index: false, follow: false },
};

export default async function PrivateTraditionalPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  if (token !== TRADITIONAL_SECRET_TOKEN) {
    notFound();
  }

  return (
    <div className="flex min-h-svh flex-col">
      <main className="mx-auto flex w-full max-w-content flex-1 flex-col px-5 pb-24 pt-16 sm:px-8 sm:pt-24">
        <Link
          href="/"
          className="font-display text-lg italic text-ink transition-colors hover:text-accent"
        >
          {MONOGRAM}
        </Link>

        <p className="mt-12 text-[0.7rem] uppercase tracking-[0.25em] text-accent">
          Private &middot; Invited Guests Only
        </p>
        <h1 className="mt-4 font-display text-5xl text-ink sm:text-6xl">
          {TRADITIONAL_CEREMONY.label}
        </h1>
        <p className="mt-4 max-w-[46ch] text-body leading-relaxed text-secondary">
          You&rsquo;re receiving these details because you&rsquo;ve been
          personally invited to the traditional marriage ceremony. Please
          keep this link private.
        </p>

        <div className="mt-10 rounded-3xl border border-ink/10 bg-white/40 p-8 sm:p-10">
          <p className="text-[0.7rem] uppercase tracking-[0.25em] text-accent">
            {TRADITIONAL_CEREMONY.time}
          </p>
          <p className="mt-3 text-lg text-ink">
            {TRADITIONAL_CEREMONY.venueName}, {TRADITIONAL_CEREMONY.venueArea}
          </p>

          <div className="mt-8">
            <Countdown targetIso={TRADITIONAL_CEREMONY.isoDateTime} />
          </div>

          <a
            href={TRADITIONAL_CEREMONY.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-[0.7rem] uppercase tracking-[0.1em] text-bg transition-transform duration-300 hover:-translate-y-0.5"
          >
            Get Directions &rarr;
          </a>
        </div>
      </main>

      <PageFooter />
    </div>
  );
}
