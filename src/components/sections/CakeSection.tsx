import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { SceneCanvas } from "@/components/three/SceneCanvas";
import { Cake, Confetti } from "@/components/three/Cake";
import { useReducedMotion } from "@/lib/reduced-motion";
import { SectionHeading } from "./SectionHeading";

export function CakeSection() {
  const reduced = useReducedMotion();
  const [cut, setCut] = useState(false);
  const start = useRef<{ x: number; y: number } | null>(null);

  const onDown = (e: React.PointerEvent) => {
    start.current = { x: e.clientX, y: e.clientY };
  };
  const onUp = (e: React.PointerEvent) => {
    if (!start.current || cut) return;
    const dx = e.clientX - start.current.x;
    const dy = e.clientY - start.current.y;
    if (Math.hypot(dx, dy) > 60) setCut(true);
    start.current = null;
  };

  return (
    <section className="relative px-6 py-24">
      <SectionHeading
        kicker="make it official"
        title="Cut The Cake"
        subtitle="Drag or swipe across the cake to slice it."
      />
      <div
        onPointerDown={onDown}
        onPointerUp={onUp}
        className="relative mx-auto h-[60vh] min-h-[380px] w-full max-w-3xl cursor-grab touch-none select-none rounded-3xl border border-border glass-panel active:cursor-grabbing"
      >
        <SceneCanvas camera={{ position: [0, 1.8, 6.5], fov: 50 }}>
          <Cake cut={cut} drift={!reduced} />
          <Confetti active={cut} origin={[0, 0.6, 0]} />
        </SceneCanvas>
        <motion.p
          animate={{ opacity: cut ? 0 : 1 }}
          className="pointer-events-none absolute inset-x-0 bottom-5 text-center font-body text-xs tracking-[0.3em] text-muted-foreground"
        >
          SWIPE TO CUT ✧
        </motion.p>
      </div>
      {cut && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-center font-script text-3xl text-primary"
        >
          one slice for you, one for me 🎂
        </motion.p>
      )}
    </section>
  );
}
