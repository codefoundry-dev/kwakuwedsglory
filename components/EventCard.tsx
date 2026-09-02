import Countdown from "@/components/Countdown";
import Reveal from "@/components/Reveal";

type EventCardProps = {
  index: string;
  label: string;
  time: string;
  isoDateTime: string;
  dressCode?: string;
  invitationOnly?: boolean;
  publicNote?: string;
  venueName?: string;
  venueArea?: string;
  mapUrl?: string;
};

export default function EventCard({
  index,
  label,
  time,
  isoDateTime,
  dressCode,
  invitationOnly,
  publicNote,
  venueName,
  venueArea,
  mapUrl,
}: EventCardProps) {
  return (
    <Reveal className="h-full">
      <article className="flex h-full flex-col rounded-3xl border border-ink/10 bg-white/40 p-6 sm:p-10">
        <p className="text-[0.7rem] uppercase tracking-[0.25em] text-accent">
          {index} &middot; {time}
        </p>
        <h3 className="mt-3 font-display text-3xl text-ink sm:text-4xl">{label}</h3>

        {invitationOnly ? (
          <div className="mt-6 rounded-2xl border border-secondary/30 bg-blush/20 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.15em] text-secondary">
              Strictly by invitation only
            </p>
            {publicNote && (
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{publicNote}</p>
            )}
          </div>
        ) : (
          venueName && (
            <div className="mt-6 space-y-2 text-sm text-ink/80">
              <p>
                <span className="text-secondary">Venue &middot; </span>
                {venueName}
                {venueArea ? `, ${venueArea}` : ""}
              </p>
              {dressCode && (
                <p>
                  <span className="text-secondary">Dress code &middot; </span>
                  {dressCode}
                </p>
              )}
            </div>
          )
        )}

        <div className="mt-8">
          <Countdown targetIso={isoDateTime} />
        </div>

        {mapUrl && (
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-[0.7rem] uppercase tracking-[0.1em] text-bg transition-transform duration-300 hover:-translate-y-0.5"
          >
            Get Directions &rarr;
          </a>
        )}
      </article>
    </Reveal>
  );
}
