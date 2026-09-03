import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

const SPARKLES = ["✨", "⭐", "🌟", "💫", "🕯️", "🌸", "💛", "🎀"];

function SparkleParticle({ emoji, index }: { emoji: string; index: number }) {
  const angle = (index / 16) * Math.PI * 2;
  const dist = 120 + Math.random() * 140;
  const x = Math.cos(angle) * dist;
  const y = Math.sin(angle) * dist - 60;
  return (
    <motion.span
      initial={{ opacity: 1, x: 0, y: 0, scale: 0.4 }}
      animate={{ opacity: 0, x, y, scale: 1.5 }}
      transition={{ duration: 1.4, delay: index * 0.035, ease: "easeOut" }}
      style={{
        position: "absolute",
        left: "50%",
        top: "55%",
        fontSize: 22,
        pointerEvents: "none",
        display: "inline-block",
      }}
    >
      {emoji}
    </motion.span>
  );
}

export function WishSection() {
  const [blown, setBlown] = useState(false);
  const [sparkling, setSparkling] = useState(false);

  const handleTap = () => {
    if (blown) return;
    setSparkling(true);
    setTimeout(() => {
      setBlown(true);
      setTimeout(() => setSparkling(false), 1600);
    }, 300);
  };

  const sparkleItems = SPARKLES.flatMap((e, ei) =>
    Array.from({ length: 2 }, (_, i) => ({ emoji: e, key: `${ei}-${i}` }))
  );

  return (
    <section className="relative px-6 py-24">
      <SectionHeading
        kicker="close your eyes"
        title="Make A Wish"
        subtitle="Blow into your mic — or just tap the candle."
      />

      <div className="relative mx-auto flex min-h-[420px] w-full max-w-xl flex-col items-center justify-center overflow-hidden rounded-3xl border border-border glass-panel py-8">

        {/* Floating bubbles behind */}
        {[...Array(6)].map((_, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -30, 0], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.6, ease: "easeInOut" }}
            style={{
              position: "absolute",
              left: `${18 + i * 13}%`,
              top: `${55 + (i % 3) * 10}%`,
              fontSize: 18,
              pointerEvents: "none",
            }}
          >
            ○
          </motion.span>
        ))}

        {/* Wish girl image */}
        <motion.div
          className="relative cursor-pointer"
          onClick={handleTap}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          animate={
            blown
              ? { filter: ["brightness(1)", "brightness(1.5) saturate(1.4)", "brightness(1.1) saturate(1.1)"] }
              : {}
          }
          transition={{ duration: 0.7 }}
        >
          <motion.img
            src="/wish_girl.jpg"
            alt="Make a wish"
            className="mx-auto max-h-[340px] w-auto select-none object-contain drop-shadow-2xl"
            animate={
              blown
                ? { scale: [1, 1.07, 1.03] }
                : { y: [0, -8, 0] }
            }
            transition={
              blown
                ? { duration: 0.6 }
                : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
            }
            draggable={false}
          />

          {/* Glow ring on blow */}
          <AnimatePresence>
            {blown && (
              <motion.div
                key="glow"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: [0, 0.55, 0] }}
                exit={{}}
                transition={{ duration: 1.2, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  inset: "-20px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(255,220,100,0.55) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />
            )}
          </AnimatePresence>

          {/* Sparkle burst */}
          <AnimatePresence>
            {sparkling &&
              sparkleItems.map((s, i) => (
                <SparkleParticle key={s.key} emoji={s.emoji} index={i} />
              ))}
          </AnimatePresence>
        </motion.div>

        {/* Tap hint */}
        <motion.p
          animate={{ opacity: blown ? 0 : 1 }}
          className="pointer-events-none mt-4 text-center font-body text-xs tracking-[0.3em] text-white/50"
        >
          TAP TO MAKE A WISH ✧
        </motion.p>
      </div>

      {/* Post-wish message */}
      <AnimatePresence>
        {blown && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-center font-script text-3xl text-primary"
          >
            wish locked in — don't tell anyone ✨
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  );
}

