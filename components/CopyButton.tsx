"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export default function CopyButton({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable — fail silently, number is still visible to copy by hand.
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "shrink-0 rounded-full border border-accent/40 px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.15em] text-secondary transition-colors duration-200 hover:border-accent hover:text-accent cursor-pointer",
        copied && "border-accent text-accent bg-accent/10",
        className
      )}
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
