import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Shared lightweight Canvas wrapper.
 * The WebGL context is only created while the section is near the viewport,
 * so a long scrolling page never exceeds the browser's context limit.
 */
export function SceneCanvas({
  children,
  camera = { position: [0, 0, 8] as [number, number, number], fov: 50 },
  className = "absolute inset-0",
}: {
  children: ReactNode;
  camera?: { position: [number, number, number]; fov?: number };
  className?: string;
}) {
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(Boolean(entry?.isIntersecting)),
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={host} className={className}>
      {visible && (
        <Canvas dpr={[1, 1.75]} camera={camera} gl={{ antialias: true, alpha: true }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[4, 6, 5]} intensity={1.1} color="#ffe6b0" />
          <pointLight position={[-5, -2, 3]} intensity={20} color="#8b5cf6" distance={20} />
          <Suspense fallback={null}>{children}</Suspense>
        </Canvas>
      )}
    </div>
  );
}
