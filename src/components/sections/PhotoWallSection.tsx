import { SceneCanvas } from "@/components/three/SceneCanvas";
import { PhotoWall3D, type Polaroid } from "@/components/three/PhotoWall3D";
import { useReducedMotion } from "@/lib/reduced-motion";
import { SectionHeading } from "./SectionHeading";

import messi from "@/assets/messi.jpg.asset.json";
import lewis from "@/assets/lewis.jpg.asset.json";
import levi from "@/assets/levi.jpg.asset.json";
import jimin from "@/assets/jimin.jpg.asset.json";
import bmwCouple from "@/assets/bmw_couples.jpg.asset.json";

/* SWAP IN REAL PHOTOS: change `src` on each item below. */
const PHOTOS: Polaroid[] = [
  { caption: "our first match night", src: messi.url, position: [-3.4, 0.6, -1], rotation: [0, 0.35, -0.08], tint: "#7CE7C4" },
  { caption: "race day chaos", src: lewis.url, position: [-1.2, -0.6, 0.4], rotation: [0, 0.15, 0.06], tint: "#FF6B5E" },
  { caption: "the episode we cried at", src: levi.url, position: [1.2, 0.7, 0], rotation: [0, -0.18, -0.05], tint: "#FFC46B" },
  { caption: "comeback stage on loop", src: jimin.url, position: [3.4, -0.4, -0.8], rotation: [0, -0.4, 0.07], tint: "#F58BD8" },
  { caption: "that one song at 2am", src: bmwCouple.url, position: [0, 1.9, -1.6], rotation: [0, 0, 0.03], tint: "#C79BFF" },
];


export function PhotoWallSection() {
  const reduced = useReducedMotion();
  return (
    <section className="relative py-24">
      <SectionHeading
        kicker="floating memories"
        title="The Photo Wall"
        subtitle="Little polaroids drifting in space. Drag your eyes across them."
      />
      <div className="relative mx-auto h-[62vh] min-h-[380px] w-full max-w-5xl">
        <SceneCanvas camera={{ position: [0, 0.4, 6.6], fov: 55 }}>
          <PhotoWall3D items={PHOTOS} drift={!reduced} />
        </SceneCanvas>
      </div>
    </section>
  );
}
