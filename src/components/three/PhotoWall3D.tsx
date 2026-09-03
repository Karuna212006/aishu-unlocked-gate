import { Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { Starfield } from "./Starfield";

export type Polaroid = {
  caption: string;
  src?: string;
  position: [number, number, number];
  rotation: [number, number, number];
  tint: string;
};

function Frame({
  item,
  drift,
  index,
  onZoom,
}: {
  item: Polaroid;
  drift: boolean;
  index: number;
  onZoom: (item: Polaroid) => void;
}) {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { gl } = useThree();

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime + index * 1.7;
    if (drift) {
      ref.current.position.y = item.position[1] + Math.sin(t * 0.6) * 0.18;
      ref.current.rotation.z = item.rotation[2] + Math.sin(t * 0.4) * 0.04;
      ref.current.rotation.y = item.rotation[1] + Math.sin(t * 0.3) * 0.12;
    }
    const target = hovered ? 1.08 : 1;
    ref.current.scale.setScalar(
      THREE.MathUtils.lerp(ref.current.scale.x, target, 0.1),
    );
  });

  const handleClick = useCallback(() => {
    if (item.src) onZoom(item);
  }, [item, onZoom]);

  return (
    <group ref={ref} position={item.position} rotation={item.rotation}>
      <mesh>
        <planeGeometry args={[2.2, 2.6]} />
        <meshStandardMaterial color="#f6f1e6" roughness={0.9} />
      </mesh>
      <Html
        transform
        distanceFactor={4.2}
        position={[0, 0, 0.02]}
        style={{ pointerEvents: "auto", width: 200 }}
      >
        <div
          className="w-[200px] select-none rounded-[2px] bg-[#f6f1e6] p-[8px] pb-5 text-center"
          style={{
            cursor: item.src ? "zoom-in" : "default",
            transition: "box-shadow 0.2s",
            boxShadow: hovered ? "0 8px 32px rgba(0,0,0,0.35)" : "none",
          }}
          onClick={handleClick}
          onMouseEnter={() => {
            setHovered(true);
            gl.domElement.style.cursor = "zoom-in";
          }}
          onMouseLeave={() => {
            setHovered(false);
            gl.domElement.style.cursor = "default";
          }}
        >
          {item.src ? (
            <img
              src={item.src}
              alt={item.caption}
              className="h-[148px] w-full object-cover"
              draggable={false}
            />
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
          {item.src && (
            <p
              style={{
                fontSize: 8,
                letterSpacing: "0.18em",
                color: "#2a235066",
                marginTop: 2,
              }}
            >
              TAP TO ZOOM
            </p>
          )}
        </div>
      </Html>
    </group>
  );
}

export function PhotoWall3D({
  items,
  drift,
  onZoom,
}: {
  items: Polaroid[];
  drift: boolean;
  onZoom: (item: Polaroid) => void;
}) {
  return (
    <>
      <Starfield count={220} radius={14} drift={drift} color="#f0d8ff" />
      {items.map((item, i) => (
        <Frame
          key={item.caption}
          item={item}
          drift={drift}
          index={i}
          onZoom={onZoom}
        />
      ))}
    </>
  );
}
