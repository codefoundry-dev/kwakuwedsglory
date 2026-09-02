export type VendorIconKey = "camera" | "gown" | "suit" | "makeup" | "cake";

export type Vendor = {
  role: string;
  name: string;
  /** Undefined renders a "[number to be added]" placeholder — never guess one. */
  phone?: string;
  icon: VendorIconKey;
};

// Exactly as supplied by the couple — no vendor, phone number, or role
// carried over from any reference site.
export const VENDORS: Vendor[] = [
  {
    role: "Photography & Videography",
    name: "Hyperview Studios",
    phone: "+233 27 087 3170",
    icon: "camera",
  },
  {
    role: "Bride's Kente Gown",
    name: "Newmanova",
    phone: "+233 20 911 8043",
    icon: "gown",
  },
  {
    role: "Bride's White Gown",
    name: "Nikita Forson",
    phone: "+233 55 393 1605",
    icon: "gown",
  },
  {
    role: "Groom's Trad Outfit & Suit",
    name: "Samrich Klassics",
    phone: "+233 55 540 6494",
    icon: "suit",
  },
  {
    role: "Make Up & Hairstyling",
    name: "Sassy Looks Gallery",
    phone: "+233 55 275 2706",
    icon: "makeup",
  },
  {
    role: "Wedding Cake",
    name: "Cocogelatogh",
    icon: "cake",
  },
];

export function telHref(phone: string) {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}
