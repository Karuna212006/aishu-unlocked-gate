import { motion } from "framer-motion";
import { SceneCanvas } from "@/components/three/SceneCanvas";
import { PortalGate } from "@/components/three/PortalGate";
import { WORLDS, useReducedMotion } from "@/lib/reduced-motion";

export function Hero() {
  const reduced = useReducedMotion();
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden nebula-bg">
      <SceneCanvas camera={{ position: [0, 0, 9], fov: 55 }}>
        <PortalGate open drift={!reduced} />
      </SceneCanvas>

      <div className="relative z-10 px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-script text-2xl text-primary"
        >
          the gate is open…
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="mt-2 font-display text-[3.5rem] leading-[0.9] tracking-tight text-glow sm:text-[7rem]"
        >
          Happy Birthday
          <br />
          Aishu
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mx-auto mt-6 max-w-md font-body text-sm text-muted-foreground sm:text-base"
        >
          {"\n"}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 flex flex-wrap justify-center gap-2"
        >
          {WORLDS.map((w) => (
            <span
              key={w.key}
              className="rounded-full border border-border px-3 py-1 font-body text-xs text-foreground/80 backdrop-blur-sm"
              style={{ boxShadow: `0 0 18px -8px ${w.color}` }}
            >
              {"\n"}
            </span>
          ))}
        </motion.div>
        <p className="mt-10 animate-bounce font-body text-xs tracking-[0.3em] text-muted-foreground">
          SCROLL
        </p>
      </div>
    </section>
  );
}
