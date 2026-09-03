import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

const CONFETTI = ["🎉", "✨", "🎊", "🎈", "⭐", "🌟", "💫", "🎂"];

function ConfettiPiece({ emoji, index }: { emoji: string; index: number }) {
  const x = (Math.random() - 0.5) * 600;
  const y = -(200 + Math.random() * 300);
  const rotate = (Math.random() - 0.5) * 720;
  const delay = index * 0.04;
  return (
    <motion.span
      initial={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 0.5 }}
      animate={{ opacity: 0, x, y, rotate, scale: 1.4 }}
      transition={{ duration: 1.6, delay, ease: "easeOut" }}
      style={{
        position: "absolute",
        left: "50%",
        bottom: "38%",
        fontSize: 28,
        pointerEvents: "none",
        display: "inline-block",
      }}
    >
      {emoji}
    </motion.span>
  );
}

export function CakeSection() {
  const [cut, setCut] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [slicing, setSlicing] = useState(false);
  const start = useRef<{ x: number; y: number } | null>(null);

  const onDown = (e: React.PointerEvent) => {
    start.current = { x: e.clientX, y: e.clientY };
  };
  const onUp = (e: React.PointerEvent) => {
    if (!start.current || cut) return;
    const dx = e.clientX - start.current.x;
    const dy = e.clientY - start.current.y;
    if (Math.hypot(dx, dy) > 60) {
      setSlicing(true);
      setTimeout(() => {
        setCut(true);
        setShowConfetti(true);
        setSlicing(false);
        setTimeout(() => setShowConfetti(false), 2200);
      }, 400);
    }
    start.current = null;
  };

  const confettiItems = CONFETTI.flatMap((e) =>
    Array.from({ length: 4 }, (_, i) => ({ emoji: e, key: `${e}-${i}` }))
  );

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
        className="relative mx-auto h-[70vh] min-h-[420px] w-full max-w-2xl cursor-grab touch-none select-none overflow-hidden rounded-3xl border border-border glass-panel active:cursor-grabbing"
        style={{ background: "rgba(10,8,30,0.55)" }}
      >
        {/* Cake image */}
        <motion.img
          src="/cake_makewish.jpg"
          alt="Make a wish birthday cake"
          className="h-full w-full object-contain"
          animate={
            cut
              ? { scale: [1, 1.06, 1.02], filter: ["brightness(1)", "brightness(1.35)", "brightness(1.1)"] }
              : slicing
              ? { x: [0, -8, 8, -5, 0] }
              : {}
          }
          transition={{ duration: 0.5 }}
          draggable={false}
          style={{ userSelect: "none" }}
        />

        {/* Slice line flash */}
        <AnimatePresence>
          {slicing && (
            <motion.div
              key="slice"
              initial={{ scaleX: 0, opacity: 1 }}
              animate={{ scaleX: 1, opacity: 0 }}
              exit={{}}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                right: 0,
                height: 3,
                background: "linear-gradient(90deg, transparent, #fff 40%, #a8d8ff 60%, transparent)",
                transformOrigin: "left center",
                boxShadow: "0 0 18px 4px rgba(168,216,255,0.7)",
                pointerEvents: "none",
              }}
            />
          )}
        </AnimatePresence>

        {/* Confetti burst */}
        <AnimatePresence>
          {showConfetti &&
            confettiItems.map((c, i) => (
              <ConfettiPiece key={c.key} emoji={c.emoji} index={i} />
            ))}
        </AnimatePresence>

        {/* Swipe hint */}
        <motion.p
          animate={{ opacity: cut ? 0 : 1 }}
          className="pointer-events-none absolute inset-x-0 bottom-5 text-center font-body text-xs tracking-[0.3em] text-white/60"
        >
          SWIPE TO CUT ✧
        </motion.p>
      </div>

      {/* Post-cut message */}
      <AnimatePresence>
        {cut && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-center font-script text-3xl text-primary"
          >
            one slice for you, one for me 🎂
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  );
}

