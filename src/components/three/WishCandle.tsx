import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Flame } from "./Cake";

/** Single tall wish candle + a rising burst of glowing stars once blown out. */
export function WishCandle({ blown, drift }: { blown: boolean; drift: boolean }) {
  const stars = useRef<THREE.Points>(null);
  const count = 200;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = Math.random() * 0.25;
      arr[i * 3] = Math.cos(a) * r;
      arr[i * 3 + 1] = 1.1 + Math.random() * 0.2;
      arr[i * 3 + 2] = Math.sin(a) * r;
    }
    return arr;
  }, []);
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 1.6,
        y: 0.6 + Math.random() * 1.4,
        z: (Math.random() - 0.5) * 1.6,
      })),
    [],
  );

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    if (!stars.current) return;
    stars.current.visible = blown;
    if (!blown) return;
    const pos = stars.current.geometry.attributes['position'] as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      const s = seeds[i]!;
      pos.array[i * 3] = pos.array[i * 3]! + s.x * delta * 0.6;
      pos.array[i * 3 + 1] = pos.array[i * 3 + 1]! + s.y * delta * 0.5;
      pos.array[i * 3 + 2] = pos.array[i * 3 + 2]! + s.z * delta * 0.6;
    }
    pos.needsUpdate = true;
    if (drift) stars.current.rotation.y = state.clock.elapsedTime * 0.15;
  });

  return (
    <group position={[0, -0.8, 0]}>
      <mesh>
        <cylinderGeometry args={[0.14, 0.16, 2, 12]} />
        <meshStandardMaterial color="#f6e5d0" roughness={0.7} />
      </mesh>
      <mesh position={[0, 1.02, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.12, 4]} />
        <meshStandardMaterial color="#3b3b3b" />
      </mesh>
      <Flame lit={!blown} position={[0, 1.2, 0]} />
      <mesh position={[0, -1.05, 0]}>
        <cylinderGeometry args={[0.7, 0.65, 0.12, 24]} />
        <meshStandardMaterial color="#2a2350" metalness={0.4} roughness={0.5} />
      </mesh>
      <points ref={stars} visible={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.09} color="#ffd98a" transparent depthWrite={false} />
      </points>
    </group>
  );
}
