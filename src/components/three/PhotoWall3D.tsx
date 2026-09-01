import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { Starfield } from "./Starfield";

export type Polaroid = {
  caption: string;
  /** SWAP IN REAL PHOTO: put the image URL here (e.g. /photos/aishu-1.jpg) */
  src?: string;
  position: [number, number, number];
  rotation: [number, number, number];
  tint: string;
};

function Frame({ item, drift, index }: { item: Polaroid; drift: boolean; index: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!drift || !ref.current) return;
    const t = state.clock.elapsedTime + index * 1.7;
    ref.current.position.y = item.position[1] + Math.sin(t * 0.6) * 0.18;
    ref.current.rotation.z = item.rotation[2] + Math.sin(t * 0.4) * 0.04;
    ref.current.rotation.y = item.rotation[1] + Math.sin(t * 0.3) * 0.12;
  });

  return (
    <group ref={ref} position={item.position} rotation={item.rotation}>
      <mesh>
        <planeGeometry args={[1.7, 2]} />
        <meshStandardMaterial color="#f6f1e6" roughness={0.9} />
      </mesh>
      <Html
        transform
        distanceFactor={4.2}
        position={[0, 0, 0.02]}
        style={{ pointerEvents: "none", width: 150 }}
      >
        <div className="w-[150px] select-none rounded-[2px] bg-[#f6f1e6] p-[6px] pb-4 text-center">
          {item.src ? (
            <img src={item.src} alt={item.caption} className="h-[110px] w-full object-cover" />
          ) : (
            <div
              className="flex h-[110px] w-full items-center justify-center text-[9px] tracking-wide text-black/45"
              style={{ background: `linear-gradient(140deg, ${item.tint}, #2a2350)` }}
            >
              photo goes here
            </div>
          )}
          <p className="mt-[6px] font-script text-[13px] leading-tight text-[#2a2350]">
            {item.caption}
          </p>
        </div>
      </Html>
    </group>
  );
}

export function PhotoWall3D({ items, drift }: { items: Polaroid[]; drift: boolean }) {
  return (
    <>
      <Starfield count={220} radius={14} drift={drift} color="#f0d8ff" />
      {items.map((item, i) => (
        <Frame key={item.caption} item={item} drift={drift} index={i} />
      ))}
    </>
  );
}
