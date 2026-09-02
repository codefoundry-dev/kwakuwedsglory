import { cn } from "@/lib/utils";
import type { VendorIconKey } from "@/lib/vendors";

// Simple line icons, one per vendor role — same stroke conventions as the
// rest of the site's hand-rolled SVGs (see ScrollCue.tsx): 24x24 viewBox,
// no fill, currentColor stroke, rounded caps/joins.
const PATHS: Record<VendorIconKey, React.ReactNode> = {
  camera: (
    <>
      <path d="M4 8.2a2 2 0 0 1 2-2h1.1a1 1 0 0 0 .87-.5l.6-1.04A1 1 0 0 1 9.44 4h5.12a1 1 0 0 1 .87.66l.6 1.04a1 1 0 0 0 .87.5H18a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
      <circle cx="12" cy="13" r="3.2" />
    </>
  ),
  gown: (
    <path d="M10 3.5h4l.4 3a1.6 1.6 0 0 0 .55.98L17 9l-1.9 1.15-.3 1.1L17.6 19a1 1 0 0 1-.95 1.3H7.35a1 1 0 0 1-.95-1.3l2.8-7.75-.3-1.1L7 9l2.05-2.52c.32-.26.5-.62.55-.98Z" />
  ),
  suit: (
    <>
      <path d="M7.5 4 11 6h2l3.5-2" />
      <path d="M11 6l-1.6 3 1 1-1.3 8.7a.7.7 0 0 0 .7.8h4.4a.7.7 0 0 0 .7-.8L13.6 10l1-1L13 6Z" />
    </>
  ),
  makeup: (
    <>
      <path d="M14.8 3.7 20 8.9" />
      <path d="M13.3 5.2 18.5 10.4 8.6 20.3a2.1 2.1 0 0 1-3-3Z" />
      <path d="M8.5 14.9l2.3 2.3" />
    </>
  ),
  cake: (
    <>
      <path d="M12 2.2c.55.62.9 1.16.9 1.7a.9.9 0 1 1-1.8 0c0-.54.35-1.08.9-1.7Z" />
      <path d="M12 4.6v2.4" />
      <rect x="8.7" y="7" width="6.6" height="3.3" rx=".6" />
      <path d="M6.5 11.7a1.7 1.7 0 0 1 1.7-1.7h7.6a1.7 1.7 0 0 1 1.7 1.7v3.3H6.5Z" />
      <path d="M4.5 20.3v-4.2a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1v4.2Z" />
      <path d="M4.5 20.3h15" />
    </>
  ),
};

export default function VendorIcon({
  icon,
  className,
}: {
  icon: VendorIconKey;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
      aria-hidden
    >
      {PATHS[icon]}
    </svg>
  );
}
