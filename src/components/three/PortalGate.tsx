import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Starfield } from "./Starfield";

/** Glowing wireframe gate: two counter-rotating rings + a shimmering core. */
export function PortalGate({ open = false, drift = true }: { open?: boolean; drift?: boolean }) {
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);
  const group = useRef<THREE.Group>(null);
  const dust = useRef<THREE.Points>(null);

  const dustPositions = useMemo(() => {
    const arr = new Float32Array(220 * 3);
    for (let i = 0; i < 220; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 2.1 + Math.random() * 0.9;
      arr[i * 3] = Math.cos(a) * r;
      arr[i * 3 + 1] = Math.sin(a) * r;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 1.4;
    }
    return arr;
  }, []);

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const t = state.clock.elapsedTime;
    if (drift) {
      if (outer.current) outer.current.rotation.z += delta * 0.25;
      if (inner.current) inner.current.rotation.z -= delta * 0.4;
      if (dust.current) dust.current.rotation.z += delta * 0.12;
      if (group.current) group.current.rotation.y = Math.sin(t * 0.3) * 0.15;
    }
    if (core.current) {
      const target = open ? 2.6 : 1.15 + Math.sin(t * 1.4) * 0.04;
      core.current.scale.setScalar(
        THREE.MathUtils.damp(core.current.scale.x, target, 3, delta),
      );
      const mat = core.current.material as THREE.MeshBasicMaterial;
      mat.opacity = THREE.MathUtils.damp(mat.opacity, open ? 0 : 0.35, 2.5, delta);
    }
  });

  return (
    <group ref={group}>
      <Starfield count={300} radius={16} drift={drift} />
      <mesh ref={outer}>
        <torusGeometry args={[2.6, 0.06, 8, 64]} />
        <meshStandardMaterial
          color="#f2c66b"
          emissive="#f2c66b"
          emissiveIntensity={1.4}
          roughness={0.3}
        />
      </mesh>
      <mesh ref={inner} scale={0.78}>
        <torusGeometry args={[2.6, 0.03, 6, 48]} />
        <meshStandardMaterial
          color="#c79bff"
          emissive="#c79bff"
          emissiveIntensity={1.6}
          wireframe
        />
      </mesh>
      <mesh ref={core}>
        <circleGeometry args={[2, 48]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>
      <points ref={dust}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dustPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.06} color="#ffd9a0" transparent opacity={0.9} depthWrite={false} />
      </points>
    </group>
  );
}
