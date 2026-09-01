import { useEffect, useState } from "react";

/** True when the user prefers reduced motion — disable continuous 3D drift. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export const WORLDS = [
  { key: "football", label: "Football", emoji: "⚽", color: "#7CE7C4" },
  { key: "f1", label: "Formula 1", emoji: "🏎️", color: "#FF6B5E" },
  { key: "anime", label: "Anime", emoji: "⚔️", color: "#8FB8FF" },
  { key: "kpop", label: "K-pop", emoji: "🎙️", color: "#F58BD8" },
  { key: "kdrama", label: "K-drama", emoji: "🎬", color: "#FFC46B" },
  { key: "mixed", label: "Hindi Songs", emoji: "🎵", color: "#C79BFF" },
] as const;

export type WorldKey = (typeof WORLDS)[number]["key"];
