import { CF_WEDDINGS_URL, CF_WEDDINGS_HANDLE } from "@/lib/site";

export default function PageFooter() {
  return (
    <footer className="border-t border-ink/10 px-5 py-8 text-center sm:px-8">
      <p className="text-[0.7rem] uppercase tracking-[0.15em] text-secondary/70">
        Built with{" "}
        <span aria-hidden className="text-accent">
          &hearts;
        </span>{" "}
        by{" "}
        <a
          href={CF_WEDDINGS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent"
        >
          CF Weddings
        </a>{" "}
        &middot; {CF_WEDDINGS_HANDLE}
      </p>
    </footer>
  );
}
