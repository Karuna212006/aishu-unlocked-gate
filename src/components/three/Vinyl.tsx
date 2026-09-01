import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/** Spinning glowing record with a soundwave ring of bars behind it. */
export function Vinyl({ drift = true }: { drift?: boolean }) {
  const disc = useRef<THREE.Group>(null);
  const bars = useRef<THREE.Group>(null);
  const seeds = useMemo(() => Array.from({ length: 36 }, () => Math.random() * Math.PI * 2), []);

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    if (drift && disc.current) disc.current.rotation.z -= delta * 1.1;
    if (bars.current) {
      bars.current.children.forEach((child, i) => {
        const s = drift ? 0.5 + Math.abs(Math.sin(state.clock.elapsedTime * 2 + seeds[i])) * 1.4 : 1;
        child.scale.y = THREE.MathUtils.damp(child.scale.y, s, 6, delta);
      });
    }
  });

  return (
    <group rotation={[0.35, 0, 0]}>
      <group ref={disc}>
        <mesh>
          <cylinderGeometry args={[2, 2, 0.07, 48]} />
          <meshStandardMaterial color="#14101f" roughness={0.35} metalness={0.5} />
        </mesh>
        {[0.8, 1.2, 1.6].map((r) => (
          <mesh key={r} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
            <torusGeometry args={[r, 0.006, 4, 64]} />
            <meshStandardMaterial color="#c79bff" emissive="#c79bff" emissiveIntensity={1.2} />
          </mesh>
        ))}
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.55, 0.55, 0.02, 32]} />
          <meshStandardMaterial color="#f2c66b" emissive="#f2c66b" emissiveIntensity={0.6} />
        </mesh>
      </group>
      <group ref={bars} position={[0, 0, -1.2]}>
        {seeds.map((_, i) => {
          const a = (i / seeds.length) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 2.9, 0, Math.sin(a) * 2.9]}>
              <boxGeometry args={[0.06, 0.5, 0.06]} />
              <meshStandardMaterial color="#7ce7c4" emissive="#7ce7c4" emissiveIntensity={1} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}
