import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { SceneCanvas } from "@/components/three/SceneCanvas";
import { PhotoWall3D, type Polaroid } from "@/components/three/PhotoWall3D";
import { useReducedMotion } from "@/lib/reduced-motion";
import { SectionHeading } from "./SectionHeading";

/* ── CRT Photo Wall: Charles Leclerc & our moments ── */
const PHOTOS: Polaroid[] = [
  {
    caption: "crt — always iconic",
    src: "/crt_portrait.jpg",
    position: [-3.4, 0.6, -1],
    rotation: [0, 0.35, -0.08],
    tint: "#7CE7C4",
  },
  {
    caption: "crt in the cockpit",
    src: "/crt_ferrari.jpg",
    position: [-1.2, -0.6, 0.4],
    rotation: [0, 0.15, 0.06],
    tint: "#FF6B5E",
  },
  {
    caption: "crt — race day vibes",
    src: "/crt_ferrari2.jpg",
    position: [1.2, 0.7, 0],
    rotation: [0, -0.18, -0.05],
    tint: "#FFC46B",
  },
  {
    caption: "ride or die together",
    src: "/crt_bikes.jpg",
    position: [3.4, -0.4, -0.8],
    rotation: [0, -0.4, 0.07],
    tint: "#F58BD8",
  },
  {
    caption: "mountains & us",
    src: "/crt_bmw.jpg",
    position: [0, 1.9, -1.6],
    rotation: [0, 0, 0.03],
    tint: "#C79BFF",
  },
  {
    caption: "BTS — suited & stunning 🖤",
    src: "/bts_formal.jpg",
    position: [-5.2, 2.8, -1.5],
    rotation: [0, 0.45, -0.07],
    tint: "#A8D8FF",
  },
  {
    caption: "BTS — all black everything ✨",
    src: "/bts_dark.jpg",
    position: [5.2, 2.8, -1.5],
    rotation: [0, -0.45, 0.07],
    tint: "#9B8FFF",
  },
];

/* ── Full-screen lightbox rendered via portal into document.body ── */
function Lightbox({
  src,
  caption,
  onClose,
}: {
  src: string;
  caption: string;
  onClose: () => void;
}) {
  /* Close on Escape key */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "rgba(0,0,0,0.88)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "zoom-out",
        animation: "lbFadeIn 0.22s ease",
      }}
      onClick={onClose}
    >
      <style>{`
        @keyframes lbFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes lbPopIn {
          from { opacity: 0; transform: scale(0.88) translateY(24px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      {/* Polaroid card */}
      <div
        style={{
          background: "#f6f1e6",
          borderRadius: 4,
          padding: "12px 12px 28px",
          boxShadow: "0 40px 100px rgba(0,0,0,0.7)",
          maxWidth: "min(88vw, 600px)",
          width: "100%",
          animation: "lbPopIn 0.32s cubic-bezier(0.22,1,0.36,1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={caption}
          style={{
            width: "100%",
            maxHeight: "78vh",
            objectFit: "contain",
            borderRadius: 2,
            display: "block",
          }}
        />
        <p
          style={{
            marginTop: 14,
            textAlign: "center",
            fontFamily: "var(--font-script, cursive)",
            fontSize: 20,
            color: "#2a2350",
            lineHeight: 1.3,
          }}
        >
          {caption}
        </p>
      </div>

      <p
        style={{
          marginTop: 20,
          color: "rgba(255,255,255,0.45)",
          fontSize: 11,
          letterSpacing: "0.22em",
          fontFamily: "sans-serif",
          userSelect: "none",
        }}
      >
        CLICK ANYWHERE OR PRESS ESC TO CLOSE
      </p>
    </div>,
    document.body,
  );
}

export function PhotoWallSection() {
  const reduced = useReducedMotion();
  const [zoomed, setZoomed] = useState<Polaroid | null>(null);
  const handleZoom = useCallback((item: Polaroid) => setZoomed(item), []);
  const handleClose = useCallback(() => setZoomed(null), []);

  return (
    <section className="relative py-24">
      <SectionHeading
        kicker="floating memories"
        title="The Photo Wall"
        subtitle="Little polaroids drifting in space. Click any photo to zoom in ✨"
      />
      <div className="relative mx-auto h-[82vh] min-h-[480px] w-full max-w-6xl">
        <SceneCanvas camera={{ position: [0, 1.4, 9.5], fov: 72 }}>
          <PhotoWall3D items={PHOTOS} drift={!reduced} onZoom={handleZoom} />
        </SceneCanvas>
      </div>

      {/* Lightbox portal — renders directly into document.body, fully outside the canvas */}
      {zoomed?.src && (
        <Lightbox src={zoomed.src} caption={zoomed.caption} onClose={handleClose} />
      )}
    </section>
  );
}
