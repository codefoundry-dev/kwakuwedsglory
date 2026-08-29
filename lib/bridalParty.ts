import fs from "node:fs";
import path from "node:path";

const DIR_NAME = "bridal-party";
const DIR = path.join(process.cwd(), "public", "assets", DIR_NAME);
const IMAGE_EXT = /\.(jpe?g|png|webp)$/i;

// object-position overrides, keyed by the parsed display name, for photos
// where a centered crop cuts off a head or key detail — add an entry here
// if a future photo needs the same treatment.
const FOCUS_OVERRIDES: Record<string, string> = {
  Frimpomaa: "center 5%",
};

export type BridalPartyMember = {
  /** Display name, derived from the filename. */
  name: string;
  /** Optional role, derived from a "(Role)" suffix in the filename — e.g. "Gloria (Lady of Honour).jpeg". */
  role?: string;
  src: string;
  /** object-position for the photo crop — see FOCUS_OVERRIDES above. */
  focus: string;
};

// Reads every image in public/assets/bridal-party at build/request time, so
// dropping in (or removing) a photo is the only step needed to update the
// chapter — no code change. The filename IS the display name; a trailing
// "(Role)" is pulled out as a separate role label rather than shown raw.
// Anyone with a role (e.g. "Lady of Honour") sorts first — alphabetically
// among themselves — followed by everyone else, alphabetically.
export function getBridalPartyMembers(): BridalPartyMember[] {
  let files: string[] = [];
  try {
    files = fs.readdirSync(DIR).filter((f) => IMAGE_EXT.test(f));
  } catch {
    return [];
  }

  return files
    .map((file) => {
      const base = file.replace(IMAGE_EXT, "");
      const match = base.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
      const name = (match ? match[1] : base).trim();
      const role = match ? match[2].trim() : undefined;
      return {
        name,
        role,
        src: encodeURI(`/assets/${DIR_NAME}/${file}`),
        focus: FOCUS_OVERRIDES[name] ?? "center",
      };
    })
    .sort((a, b) => {
      if (!!a.role !== !!b.role) return a.role ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
}
