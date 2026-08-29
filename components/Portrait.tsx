import Image from "next/image";
import { cn } from "@/lib/utils";

export type PortraitTone = "floral" | "interior" | "fabric" | "botanical";

// PLACEHOLDER PHOTOGRAPHY — the couple's shoot isn't delivered yet.
// Every image slot on this site renders through this component. Pass no
// `src` and it renders a calm, dark-toned CSS texture (never a fake stock
// couple) so the layout reads as photography-led even before real photos
// exist. Once the shoot lands, pass `src` (a path under /public) and this
// component switches to next/image automatically — no layout changes
// needed anywhere else. See README → "Swapping placeholder photography".
export default function Portrait({
  src,
  alt,
  tone = "floral",
  priority = false,
  sizes = "100vw",
  className,
  objectPosition = "center",
}: {
  src?: string;
  alt: string;
  tone?: PortraitTone;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** object-position for the cropped image — e.g. "center", "top", "center 15%" — tune per-photo when a centered crop cuts off a head or key detail. */
  objectPosition?: string;
}) {
  if (src) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="object-cover"
          style={{ objectPosition }}
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "portrait-placeholder overflow-hidden",
        `portrait-placeholder--${tone}`,
        className
      )}
    />
  );
}
