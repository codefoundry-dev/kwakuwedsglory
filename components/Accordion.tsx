"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export type AccordionItem = {
  question: string;
  answer: string;
};

function AccordionRow({
  item,
  open,
  onToggle,
}: {
  item: AccordionItem;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-ink/10">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-6 text-left cursor-pointer"
      >
        <span className="font-display text-xl sm:text-2xl text-ink">{item.question}</span>
        <span
          className={cn(
            "shrink-0 text-2xl text-accent transition-transform duration-300 ease-out",
            open && "rotate-45"
          )}
          aria-hidden
        >
          +
        </span>
      </button>
      <div
        className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="pb-6 max-w-[60ch] text-body leading-relaxed text-ink/80">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="border-t border-ink/10">
      {items.map((item, index) => (
        <AccordionRow
          key={item.question}
          item={item}
          open={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  );
}
