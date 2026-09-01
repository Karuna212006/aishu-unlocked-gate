import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const CONFETTI_COLORS = ["#7CE7C4", "#FF6B5E", "#8FB8FF", "#F58BD8", "#FFC46B", "#C79BFF"];

export function Confetti({ active, origin = [0, 0, 0] as [number, number, number] }) {
  const ref = useRef<THREE.Points>(null);
  const count = 260;
  const { positions, colors, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const c = new THREE.Color();
    for (let i = 0; i < count; i++) {
      c.set(CONFETTI_COLORS[i % CONFETTI_COLORS.length]!);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors, velocities };
  }, []);
  const started = useRef(false);

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    if (!ref.current) return;
    const geo = ref.current.geometry;
    const pos = geo.attributes.position as THREE.BufferAttribute;
    if (active && !started.current) {
      started.current = true;
      for (let i = 0; i < count; i++) {
        pos.array[i * 3] = origin[0];
        pos.array[i * 3 + 1] = origin[1];
        pos.array[i * 3 + 2] = origin[2];
        const a = Math.random() * Math.PI * 2;
        const up = 2 + Math.random() * 4;
        const r = 1 + Math.random() * 3.5;
        velocities[i * 3] = Math.cos(a) * r;
        velocities[i * 3 + 1] = up;
        velocities[i * 3 + 2] = Math.sin(a) * r;
      }
    }
    if (!started.current) return;
    for (let i = 0; i < count; i++) {
      velocities[i * 3 + 1]! -= 6 * delta;
      pos.array[i * 3] += velocities[i * 3]! * delta;
      pos.array[i * 3 + 1] += velocities[i * 3 + 1]! * delta;
      pos.array[i * 3 + 2] += velocities[i * 3 + 2]! * delta;
    }
    pos.needsUpdate = true;
    ref.current.visible = true;
  });

  return (
    <points ref={ref} visible={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.12} vertexColors transparent depthWrite={false} />
    </points>
  );
}

export function Flame({ lit, position }: { lit: boolean; position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    if (!ref.current) return;
    const target = lit ? 1 + Math.sin(state.clock.elapsedTime * 12) * 0.12 : 0;
    ref.current.scale.setScalar(THREE.MathUtils.damp(ref.current.scale.x, target, 6, delta));
  });
  return (
    <group position={position}>
      <mesh ref={ref}>
        <coneGeometry args={[0.07, 0.24, 8]} />
        <meshBasicMaterial color="#ffcf6b" />
      </mesh>
      {lit && <pointLight color="#ffb35c" intensity={6} distance={4} />}
    </group>
  );
}

/** Low-poly 3D cake. `cut` swings a slice out and reveals the cut face. */
export function Cake({ cut, drift }: { cut: boolean; drift: boolean }) {
  const group = useRef<THREE.Group>(null);
  const slice = useRef<THREE.Group>(null);

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    if (group.current && drift) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.35;
    }
    if (slice.current) {
      slice.current.position.x = THREE.MathUtils.damp(slice.current.position.x, cut ? 1.9 : 0, 3, delta);
      slice.current.position.y = THREE.MathUtils.damp(slice.current.position.y, cut ? 0.4 : 0, 3, delta);
      slice.current.rotation.z = THREE.MathUtils.damp(slice.current.rotation.z, cut ? -0.5 : 0, 3, delta);
    }
  });

  const body = (thetaStart: number, thetaLength: number) => (
    <>
      <mesh position={[0, -0.45, 0]} castShadow>
        <cylinderGeometry args={[1.5, 1.6, 0.7, 32, 1, false, thetaStart, thetaLength]} />
        <meshStandardMaterial color="#f4c9d7" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[1.42, 1.5, 0.28, 32, 1, false, thetaStart, thetaLength]} />
        <meshStandardMaterial color="#fff3e0" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[1.2, 1.42, 0.55, 32, 1, false, thetaStart, thetaLength]} />
        <meshStandardMaterial color="#c88a5e" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[1.24, 1.24, 0.12, 32, 1, false, thetaStart, thetaLength]} />
        <meshStandardMaterial color="#f7e6c8" emissive="#f2c66b" emissiveIntensity={0.15} />
      </mesh>
    </>
  );

  return (
    <group ref={group} position={[0, -0.4, 0]}>
      {body(Math.PI * 0.35, Math.PI * 1.65)}
      <group ref={slice}>{body(0, Math.PI * 0.35)}</group>

      {/* candles */}
      {[-0.55, 0, 0.55].map((x, i) => (
        <group key={i} position={[x, 1.0, i === 1 ? 0.35 : -0.2]}>
          <mesh>
            <cylinderGeometry args={[0.06, 0.06, 0.5, 8]} />
            <meshStandardMaterial color={["#7ce7c4", "#f58bd8", "#8fb8ff"][i]} />
          </mesh>
          <Flame lit={!cut} position={[0, 0.36, 0]} />
        </group>
      ))}

      {/* plate */}
      <mesh position={[0, -0.85, 0]}>
        <cylinderGeometry args={[2.2, 2.1, 0.1, 40]} />
        <meshStandardMaterial color="#2a2350" metalness={0.4} roughness={0.4} />
      </mesh>
    </group>
  );
}
