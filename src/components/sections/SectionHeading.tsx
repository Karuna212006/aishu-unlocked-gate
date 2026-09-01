import { motion } from "framer-motion";

export function SectionHeading({
  kicker,
  title,
  subtitle,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6 }}
      className="mx-auto mb-10 max-w-2xl text-center"
    >
      {kicker && <p className="font-script text-2xl text-primary">{kicker}</p>}
      <h2 className="font-display text-4xl leading-none tracking-tight sm:text-6xl">{title}</h2>
      {subtitle && (
        <p className="mt-3 font-body text-sm text-muted-foreground sm:text-base">{subtitle}</p>
      )}
    </motion.header>
  );
}
