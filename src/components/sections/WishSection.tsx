import { useState } from "react";
import { motion } from "framer-motion";
import { SceneCanvas } from "@/components/three/SceneCanvas";
import { WishCandle } from "@/components/three/WishCandle";
import { useReducedMotion } from "@/lib/reduced-motion";
import { SectionHeading } from "./SectionHeading";

export function WishSection() {
  const reduced = useReducedMotion();
  const [blown, setBlown] = useState(false);

  return (
    <section className="relative px-6 py-24">
      <SectionHeading
        kicker="close your eyes"
        title="Make A Wish"
        subtitle="Blow into your mic — or just tap the candle."
      />
      <div className="relative mx-auto h-[55vh] min-h-[360px] w-full max-w-xl rounded-3xl border border-border glass-panel">
        <SceneCanvas camera={{ position: [0, 0.8, 5.5], fov: 50 }}>
          <WishCandle blown={blown} drift={!reduced} />
        </SceneCanvas>
        <button
          onClick={() => setBlown(true)}
          className="absolute inset-0 h-full w-full rounded-3xl"
          aria-label="Blow out the candle"
        />
        <motion.p
          animate={{ opacity: blown ? 0 : 1 }}
          className="pointer-events-none absolute inset-x-0 bottom-5 text-center font-body text-xs tracking-[0.3em] text-muted-foreground"
        >
          TAP THE FLAME ✧
        </motion.p>
      </div>
      {blown && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-center font-script text-3xl text-primary"
        >
          wish locked in — don't tell anyone ✨
        </motion.p>
      )}
    </section>
  );
}
