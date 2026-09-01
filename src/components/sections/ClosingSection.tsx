import { useState } from "react";
import { motion } from "framer-motion";

export function ClosingSection() {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const data = { title: "For Aishu", text: "A little birthday universe 🌌", url };
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(data);
        return;
      } catch {
        /* dismissed */
      }
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative flex min-h-[80svh] flex-col items-center justify-center px-6 py-24 text-center nebula-bg">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-5xl leading-none tracking-tight text-glow sm:text-7xl"
      >
        That's the whole pass
      </motion.h2>
      <p className="mx-auto mt-5 max-w-md font-script text-3xl text-foreground/90">
        thank you for being every one of these worlds at once
      </p>
      <p className="mt-4 max-w-md font-body text-sm text-muted-foreground">
        Now text me back — I want to know which world was your favourite. 🌷
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={share}
          className="rounded-full bg-primary px-7 py-3 font-body text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-105"
        >
          {copied ? "Link copied ✧" : "Share this"}
        </button>
        <a
          href="#top"
          className="rounded-full border border-border px-7 py-3 font-body text-sm text-foreground/85 transition-colors hover:bg-secondary"
        >
          Back to the gate
        </a>
      </div>
      <p className="mt-16 font-body text-[11px] tracking-[0.3em] text-muted-foreground">
        MADE FOR ONE PERSON ONLY
      </p>
    </section>
  );
}
