import { useState } from "react";
import { motion } from "framer-motion";
import { SceneCanvas } from "@/components/three/SceneCanvas";
import { WorldObject } from "@/components/three/WorldObject";
import { WORLDS, useReducedMotion } from "@/lib/reduced-motion";
import { SectionHeading } from "./SectionHeading";

/* EDITABLE COPY: front/back text per world. */
const COPY: Record<string, { front: string; back: string }> = {
  football: { front: "90 minutes + whatever you decide is fair", back: "You yell at the ref like you're on the payroll. I'd watch every match just for that." },
  f1: { front: "Lights out and away we go", back: "You called that overtake three laps early. Terrifying. Correct." },
  anime: { front: "One more episode (a lie)", back: "You cry at openings. I pretend I don't. We both know." },
  kpop: { front: "Comeback season is a lifestyle", back: "Your playlist has ruined my algorithm and I don't want it back." },
  kdrama: { front: "16 episodes, zero regrets", back: "You narrate the plot twists before they happen. Still magic." },
  mixed: { front: "Hindi songs at 2am", back: "Those voice notes of you singing? Kept. All of them." },
};

function Card({ index }: { index: number }) {
  const world = WORLDS[index]!;
  const reduced = useReducedMotion();
  const [flipped, setFlipped] = useState(false);
  const copy = COPY[world.key]!;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: (index % 3) * 0.08 }}
      className="h-[340px]"
      style={{ perspective: 1200 }}
    >
      <motion.button
        onClick={() => setFlipped((f) => !f)}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-full w-full rounded-2xl text-left"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0 overflow-hidden rounded-2xl border border-border glass-panel"
          style={{ backfaceVisibility: "hidden", boxShadow: `0 0 60px -30px ${world.color}` }}
        >
          <div className="absolute inset-0">
            <SceneCanvas camera={{ position: [0, 0, 5.4], fov: 50 }}>
              <WorldObject world={world.key} color={world.color} drift={!reduced} />
            </SceneCanvas>
          </div>
          <div className="relative flex h-full flex-col justify-end p-5">
            <span className="font-body text-xs" style={{ color: world.color }}>
              {world.emoji} world {index + 1}
            </span>
            <h3 className="font-display text-3xl leading-none">{world.label}</h3>
            <p className="mt-1 font-body text-xs text-muted-foreground">{copy.front}</p>
            <p className="mt-3 font-body text-[10px] tracking-[0.25em] text-muted-foreground">
              TAP TO FLIP
            </p>
          </div>
        </div>
        <div
          className="absolute inset-0 flex flex-col justify-center rounded-2xl border p-6 glass-panel"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderColor: `${world.color}66`,
          }}
        >
          <p className="font-script text-3xl leading-snug">{copy.back}</p>
          <p className="mt-4 font-body text-xs" style={{ color: world.color }}>
            {world.emoji} {world.label}
          </p>
        </div>
      </motion.button>
    </motion.div>
  );
}

export function WorldCards() {
  return (
    <section className="relative px-6 py-24">
      <SectionHeading
        kicker="your access pass"
        title="Six Worlds"
        subtitle="One card per world. Flip them all."
      />
      <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {WORLDS.map((_, i) => (
          <Card key={WORLDS[i]!.key} index={i} />
        ))}
      </div>
    </section>
  );
}
