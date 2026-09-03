import { motion } from "framer-motion";
/** EDITABLE: hero background photo. */
import heroImage from "@/assets/jimin.jpg.asset.json";
import { WORLDS } from "@/lib/reduced-motion";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden nebula-bg">
      <div className="absolute inset-0">
        <img
          src={heroImage.url}
          alt="Birthday hero portrait"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_45%,transparent,var(--background))]" />
      </div>


      <div className="relative z-10 px-6 text-center">
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
