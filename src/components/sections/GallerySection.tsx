import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WORLDS } from "@/lib/reduced-motion";
import { SectionHeading } from "./SectionHeading";

/* SWAP IN REAL PHOTOS: add `src` to each tile. */
const TILES = [
  { world: 0, caption: "stoppage-time screaming" },
  { world: 1, caption: "lights out and away we go" },
  { world: 2, caption: "the arc that broke us" },
  { world: 3, caption: "front row energy" },
  { world: 4, caption: "one more episode, promise" },
  { world: 5, caption: "the 2am playlist" },
  { world: 0, caption: "jersey day" },
  { world: 3, caption: "the fancam we replay" },
].map((t, i) => ({ ...t, id: i, src: undefined as string | undefined }));

export function GallerySection() {
  const [open, setOpen] = useState<number | null>(null);
  const active = open !== null ? TILES[open] : null;

  return (
    <section className="relative px-6 py-24">
      <SectionHeading
        kicker="six worlds, one you"
        title="The Gallery"
        subtitle="Every tile is badged with the world it belongs to. Tap to open."
      />
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {TILES.map((tile, i) => {
          const w = WORLDS[tile.world]!;
          return (
            <motion.button
              key={tile.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: (i % 4) * 0.06 }}
              onClick={() => setOpen(i)}
              className="group relative aspect-square overflow-hidden rounded-xl border border-border"
              style={{ background: `linear-gradient(150deg, ${w.color}33, #1a1436)` }}
            >
              {tile.src ? (
                <img src={tile.src} alt={tile.caption} className="h-full w-full object-cover" />
              ) : (
                <span className="flex h-full w-full items-center justify-center font-body text-[10px] text-muted-foreground">
                  photo goes here
                </span>
              )}
              <span
                className="absolute left-2 top-2 rounded-full px-2 py-0.5 font-body text-[10px] backdrop-blur-md"
                style={{ background: `${w.color}22`, color: w.color }}
              >
                {w.emoji} {w.label}
              </span>
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-2 text-left font-script text-base opacity-0 transition-opacity group-hover:opacity-100">
                {tile.caption}
              </span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 p-6 backdrop-blur-lg"
          >
            <motion.figure
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95 }}
              className="w-full max-w-lg rounded-2xl border border-border p-4 glass-panel"
            >
              <div
                className="flex aspect-[4/3] w-full items-center justify-center rounded-xl font-body text-xs text-muted-foreground"
                style={{
                  background: `linear-gradient(150deg, ${WORLDS[active.world]!.color}33, #1a1436)`,
                }}
              >
                photo goes here
              </div>
              <figcaption className="mt-3 flex items-center justify-between">
                <span className="font-script text-2xl">{active.caption}</span>
                <span className="font-body text-xs text-muted-foreground">
                  {WORLDS[active.world]!.emoji} {WORLDS[active.world]!.label}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
