import Reveal from "@/components/Reveal";
import Portrait, { type PortraitTone } from "@/components/Portrait";

export default function ChapterHeader({
  eyebrow,
  title,
  subtitle,
  meta,
  tone,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  meta?: string;
  /** Placeholder-photography tone for the image band under the heading. */
  tone?: PortraitTone;
}) {
  return (
    <header>
      <div className="mx-auto max-w-content px-5 pb-10 pt-16 sm:px-8 sm:pb-14 sm:pt-24">
        <Reveal>
          <p className="eyebrow text-accent">{eyebrow}</p>
          <h1 className="mt-4 text-display-hero text-ink">{title}</h1>
          {subtitle && (
            <p className="mt-6 max-w-[42ch] text-base leading-relaxed text-secondary sm:text-lg">
              {subtitle}
            </p>
          )}
          {meta && <p className="eyebrow mt-6 text-secondary/70">{meta}</p>}
        </Reveal>
      </div>

      {tone && (
        <Reveal className="mx-auto max-w-content px-5 sm:px-8">
          <Portrait
            tone={tone}
            alt=""
            className="aspect-[16/10] w-full rounded-sm sm:aspect-[21/9]"
          />
        </Reveal>
      )}
    </header>
  );
}
