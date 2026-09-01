import { useState } from "react";
import { motion } from "framer-motion";
import { SceneCanvas } from "@/components/three/SceneCanvas";
import { WorldObject } from "@/components/three/WorldObject";
import { WORLDS, useReducedMotion } from "@/lib/reduced-motion";
import { SectionHeading } from "./SectionHeading";

/* EDITABLE COPY: front/back text per world. */
const COPY: Record<string, { front: string; back: string }> = {
  football: {
    front: "90 minutes + whatever you decide is fair",
    back: "You yell at the ref like you're on the payroll. I'd watch every match just for that.",
  },
  f1: {
    front: "Lights out and away we go",
    back: "You called that overtake three laps early. Terrifying. Correct.",
  },
  anime: {
    front: "One more episode (a lie)",
    back: "You cry at openings. I pretend I don't. We both know.",
  },
  kpop: {
    front: "Comeback season is a lifestyle",
    back: "Your playlist has ruined my algorithm and I don't want it back.",
  },
  kdrama: {
    front: "16 episodes, zero regrets",
    back: "You narrate the plot twists before they happen. Still magic.",
  },
  mixed: {
    front: "Hindi songs at 2am",
    back: "Those voice notes of you singing? Kept. All of them.",
  },
};

function Card({
  index,
  onFocusWorld,
}: {
  index: number;
  onFocusWorld: (i: number) => void;
}) {
  const world = WORLDS[index]!;
  const [flipped, setFlipped] = useState(false);
  const copy = COPY[world.key]!;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: (index % 3) * 0.08 }}
      className="h-[260px]"
      style={{ perspective: 1200 }}
    >
      <motion.button
        onClick={() => {
          setFlipped((f) => !f);
          onFocusWorld(index);
        }}
        onMouseEnter={() => onFocusWorld(index)}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-full w-full rounded-2xl text-left"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0 flex flex-col justify-end overflow-hidden rounded-2xl border border-border p-5 glass-panel"
          style={{
            backfaceVisibility: "hidden",
            boxShadow: `0 0 60px -30px ${world.color}`,
            background: `radial-gradient(120% 90% at 80% 0%, ${world.color}26, transparent 60%)`,
          }}
        >
          <span className="text-4xl">{world.emoji}</span>
          <h3 className="mt-3 font-display text-3xl leading-none">{world.label}</h3>
          <p className="mt-1 font-body text-xs text-muted-foreground">{copy.front}</p>
          <p className="mt-3 font-body text-[10px] tracking-[0.25em] text-muted-foreground">
            TAP TO FLIP
          </p>
        </div>
        <div
          className="absolute inset-0 flex flex-col justify-center rounded-2xl border p-6 glass-panel"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderColor: `${world.color}66`,
          }}
        >
          <p className="font-script text-2xl leading-snug sm:text-3xl">{copy.back}</p>
          <p className="mt-4 font-body text-xs" style={{ color: world.color }}>
            {world.emoji} {world.label}
          </p>
        </div>
      </motion.button>
    </motion.div>
  );
}

export function WorldCards() {
  const reduced = useReducedMotion();
  const [focus, setFocus] = useState(0);
  const world = WORLDS[focus]!;

  return (
    <section className="relative px-6 py-24">
      <SectionHeading
        kicker="your access pass"
        title="Six Worlds"
        subtitle="Hover or tap a card — its emblem forms above in 3D. Flip them all."
      />
      <div className="relative mx-auto mb-8 h-[280px] w-full max-w-3xl">
        <SceneCanvas camera={{ position: [0, 0, 5.6], fov: 50 }}>
          <WorldObject key={world.key} world={world.key} color={world.color} drift={!reduced} />
        </SceneCanvas>
        <p
          className="pointer-events-none absolute inset-x-0 bottom-0 text-center font-body text-xs tracking-[0.3em]"
          style={{ color: world.color }}
        >
          {world.label.toUpperCase()}
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {WORLDS.map((w, i) => (
          <Card key={w.key} index={i} onFocusWorld={setFocus} />
        ))}
      </div>
    </section>
  );
}
