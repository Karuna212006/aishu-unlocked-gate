import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { WorldKey } from "@/lib/reduced-motion";

function GlowPoints({ color, count = 120, radius = 2 }: { color: string; count?: number; radius?: number }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = radius * (0.7 + Math.random() * 0.5);
      arr[i * 3] = Math.cos(a) * r;
      arr[i * 3 + 1] = (Math.random() - 0.5) * radius;
      arr[i * 3 + 2] = Math.sin(a) * r;
    }
    return arr;
  }, [count, radius]);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.055} color={color} transparent opacity={0.8} depthWrite={false} />
    </points>
  );
}

function Wire({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <>
      {children}
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.9}
        wireframe
        roughness={0.4}
      />
    </>
  );
}

/** Low-poly wireframe emblem per fandom world. */
export function WorldObject({
  world,
  color,
  drift = true,
  tilt = 0,
}: {
  world: WorldKey;
  color: string;
  drift?: boolean;
  tilt?: number;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    if (!group.current) return;
    if (drift) {
      group.current.rotation.y += delta * 0.35;
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.9) * 0.18;
    }
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      tilt * 0.6,
      3,
      delta,
    );
  });

  return (
    <group ref={group} scale={1.1}>
      <GlowPoints color={color} />
      {world === "football" && (
        <mesh>
          <icosahedronGeometry args={[1.3, 1]} />
          <Wire color={color}>{null}</Wire>
        </mesh>
      )}
      {world === "f1" && (
        <group rotation={[0, 0.3, 0]}>
          <mesh>
            <boxGeometry args={[2.4, 0.28, 0.7]} />
            <Wire color={color}>{null}</Wire>
          </mesh>
          <mesh position={[-0.5, 0.28, 0]}>
            <boxGeometry args={[0.7, 0.4, 0.55]} />
            <Wire color={color}>{null}</Wire>
          </mesh>
          <mesh position={[1.25, 0.18, 0]}>
            <boxGeometry args={[0.5, 0.06, 1.1]} />
            <Wire color={color}>{null}</Wire>
          </mesh>
          {[
            [-0.85, -0.2, 0.55],
            [-0.85, -0.2, -0.55],
            [0.9, -0.2, 0.55],
            [0.9, -0.2, -0.55],
          ].map((p, i) => (
            <mesh key={i} position={p as [number, number, number]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.3, 0.3, 0.22, 10]} />
              <Wire color={color}>{null}</Wire>
            </mesh>
          ))}
        </group>
      )}
      {world === "anime" && (
        <group rotation={[0, 0, Math.PI / 5]}>
          <mesh position={[0, 0.7, 0]}>
            <boxGeometry args={[0.12, 2.2, 0.03]} />
            <Wire color={color}>{null}</Wire>
          </mesh>
          <mesh position={[0, -0.5, 0]}>
            <boxGeometry args={[0.45, 0.07, 0.12]} />
            <Wire color={color}>{null}</Wire>
          </mesh>
          <mesh position={[0, -0.85, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.6, 8]} />
            <Wire color={color}>{null}</Wire>
          </mesh>
        </group>
      )}
      {world === "kpop" && (
        <group>
          <mesh position={[0, 0.85, 0]}>
            <sphereGeometry args={[0.42, 12, 10]} />
            <Wire color={color}>{null}</Wire>
          </mesh>
          <mesh position={[0, -0.1, 0]}>
            <cylinderGeometry args={[0.09, 0.09, 1.5, 8]} />
            <Wire color={color}>{null}</Wire>
          </mesh>
          <mesh position={[0, -0.95, 0]}>
            <coneGeometry args={[0.6, 0.3, 12]} />
            <Wire color={color}>{null}</Wire>
          </mesh>
        </group>
      )}
      {world === "kdrama" && (
        <group>
          {[0, 1, 2].map((i) => (
            <mesh key={i} position={[0, i * 0.22 - 0.2, 0]} rotation={[0, i * 1.1, 0]} scale={1 - i * 0.22}>
              <torusGeometry args={[0.55, 0.16, 6, 14, Math.PI * 1.6]} />
              <Wire color={color}>{null}</Wire>
            </mesh>
          ))}
          <mesh position={[0, -0.95, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 1.2, 6]} />
            <Wire color={color}>{null}</Wire>
          </mesh>
        </group>
      )}
      {world === "mixed" && (
        <group>
          <mesh rotation={[Math.PI / 2.4, 0, 0]}>
            <torusGeometry args={[1.2, 0.35, 8, 24]} />
            <Wire color={color}>{null}</Wire>
          </mesh>
          <mesh>
            <octahedronGeometry args={[0.5, 0]} />
            <Wire color={color}>{null}</Wire>
          </mesh>
        </group>
      )}
    </group>
  );
}
