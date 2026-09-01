import { SceneCanvas } from "@/components/three/SceneCanvas";
import { Vinyl } from "@/components/three/Vinyl";
import { useReducedMotion } from "@/lib/reduced-motion";
import { SectionHeading } from "./SectionHeading";

/* SWAP IN REAL SPOTIFY LINK: replace this embed URL with your track/playlist. */
const SPOTIFY_EMBED = "https://open.spotify.com/embed/track/1BxfuPKGuaTgP7aM0Bbdwr";

export function SongSection() {
  const reduced = useReducedMotion();
  return (
    <section className="relative overflow-hidden py-24">
      <SectionHeading
        kicker="press play"
        title="Our Song"
        subtitle="Turn the volume up. This one is yours."
      />
      <div className="relative mx-auto flex h-[420px] max-w-3xl items-center justify-center px-6">
        <SceneCanvas camera={{ position: [0, 1.4, 6], fov: 50 }}>
          <Vinyl drift={!reduced} />
        </SceneCanvas>
        <div className="relative z-10 w-full max-w-md rounded-2xl p-2 glass-panel shadow-[var(--shadow-portal)]">
          <iframe
            title="Birthday song"
            src={SPOTIFY_EMBED}
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-xl"
          />
          <p className="px-2 pb-1 pt-2 text-center font-body text-[11px] text-muted-foreground">
            (placeholder track — swap in the real Spotify link)
          </p>
        </div>
      </div>
    </section>
  );
}
