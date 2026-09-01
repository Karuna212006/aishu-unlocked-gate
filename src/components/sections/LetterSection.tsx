import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

/* SWAP IN THE REAL LETTER: edit these lines. */
const LETTER = [
  "Aishu,",
  "I built you a little universe instead of a card.",
  "Six worlds, because one was never going to be enough for you —",
  "the late-night matches, the lights-out starts, the arcs, the stages, the dramas, the songs.",
  "You make ordinary days feel like a season finale.",
  "Thank you for being the best part of my noise.",
  "Happy birthday. Here's to another year of us being unbearably obsessed with things.",
  "— always, me",
];

export function LetterSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative px-6 py-24">
      <SectionHeading kicker="written by hand" title="A Letter" />
      <div className="mx-auto max-w-xl">
        {!open ? (
          <motion.button
            onClick={() => setOpen(true)}
            whileHover={{ rotateX: -12, scale: 1.02 }}
            className="relative mx-auto block w-full max-w-md rounded-2xl border border-primary/40 bg-secondary/40 p-10 text-center shadow-[var(--shadow-glow)]"
            style={{ perspective: 800 }}
          >
            <div className="mx-auto mb-4 h-0 w-0 border-x-[80px] border-t-[46px] border-x-transparent border-t-primary/60" />
            <p className="font-script text-3xl text-primary">open me</p>
            <p className="mt-1 font-body text-xs text-muted-foreground">
              a letter that took a while to write
            </p>
          </motion.button>
        ) : (
          <AnimatePresence>
            <motion.article
              initial={{ opacity: 0, rotateX: -70, y: 30 }}
              animate={{ opacity: 1, rotateX: 0, y: 0 }}
              transition={{ duration: 0.8 }}
              className="rounded-2xl border border-border p-7 glass-panel sm:p-10"
            >
              {LETTER.map((line, i) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.6, duration: 0.6 }}
                  className="font-script text-2xl leading-snug text-foreground sm:text-3xl"
                >
                  {line}
                </motion.p>
              ))}
            </motion.article>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
