import { Canvas } from "@react-three/fiber";
import { Suspense, type ReactNode } from "react";

/** Shared lightweight Canvas wrapper: capped DPR, no heavy textures. */
export function SceneCanvas({
  children,
  camera = { position: [0, 0, 8] as [number, number, number], fov: 50 },
  className = "absolute inset-0",
}: {
  children: ReactNode;
  camera?: { position: [number, number, number]; fov?: number };
  className?: string;
}) {
  return (
    <div className={className}>
      <Canvas dpr={[1, 1.75]} camera={camera} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 6, 5]} intensity={1.1} color="#ffe6b0" />
        <pointLight position={[-5, -2, 3]} intensity={20} color="#8b5cf6" distance={20} />
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  );
}
