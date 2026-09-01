import { useState } from "react";
import { motion } from "framer-motion";
import { SceneCanvas } from "@/components/three/SceneCanvas";
import { PortalGate } from "@/components/three/PortalGate";
import { useReducedMotion } from "@/lib/reduced-motion";

/** EDITABLE: the unlock PIN. */
const PIN = "0704";

export function PinGate({ onUnlock }: { onUnlock: () => void }) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [opening, setOpening] = useState(false);

  const submit = (pin: string) => {
    if (pin === PIN) {
      setError("");
      setOpening(true);
      setTimeout(onUnlock, 1400);
    } else {
      setError("That's not it — try once more 🌷");
      setValue("");
    }
  };

  const onChange = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 4);
    setValue(digits);
    setError("");
    if (digits.length === 4) submit(digits);
  };

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden nebula-bg">
      <SceneCanvas camera={{ position: [0, 0, 7.5], fov: 55 }}>
        <PortalGate open={opening} drift={!reduced} />
      </SceneCanvas>

      <motion.div
        animate={opening ? { opacity: 0, scale: 1.15 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 text-center"
      >
        <p className="font-body text-sm tracking-[0.35em] text-muted-foreground">
          a little surprise awaits
        </p>
        <h1 className="mt-3 font-display text-6xl leading-none tracking-tight text-glow sm:text-8xl">
          For Aishu
        </h1>

        <div className="mt-10 flex flex-col items-center gap-3">
          <div className="relative">
            <input
              inputMode="numeric"
              autoComplete="off"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              aria-label="Enter 4 digit PIN"
              className="w-[13rem] rounded-xl border border-border bg-card px-4 py-4 text-center font-display text-4xl tracking-[0.6em] text-foreground caret-primary outline-none backdrop-blur-md focus:border-primary"
              placeholder="••••"
            />
          </div>
          <button
            onClick={() => submit(value)}
            className="rounded-full bg-primary px-7 py-2.5 font-body text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-105"
          >
            Open the gate
          </button>
          <p className="mt-1 max-w-xs font-script text-xl text-muted-foreground">
            hint: the day this story secretly started ❤️
          </p>
          {error && (
            <motion.p
              key={error}
              initial={{ x: -8 }}
              animate={{ x: [8, -6, 4, 0] }}
              className="font-body text-sm text-destructive"
            >
              {error}
            </motion.p>
          )}
        </div>
      </motion.div>
    </section>
  );
}
