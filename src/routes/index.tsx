import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PinGate } from "@/components/sections/PinGate";
import { Hero } from "@/components/sections/Hero";
import { PhotoWallSection } from "@/components/sections/PhotoWallSection";
import { SongSection } from "@/components/sections/SongSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { CakeSection } from "@/components/sections/CakeSection";
import { LetterSection } from "@/components/sections/LetterSection";
import { WorldCards } from "@/components/sections/WorldCards";
import { WishSection } from "@/components/sections/WishSection";
import { ClosingSection } from "@/components/sections/ClosingSection";
import { SideAlbums } from "@/components/sections/SideAlbums";


export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "For Aishu — A Birthday Access Pass" },
      {
        name: "description",
        content:
          "A fantasy 3D birthday card for Aishu: six glowing fandom worlds, a cake to cut, a candle to blow out, and a letter.",
      },
      { property: "og:title", content: "For Aishu — A Birthday Access Pass" },
      {
        property: "og:description",
        content: "Enter the PIN and step through the gate into six little worlds.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BirthdayCard,
});

function BirthdayCard() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <main id="top" className="relative min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {!unlocked ? (
          <motion.div key="gate" exit={{ opacity: 0 }}>
            <PinGate onUnlock={() => setUnlocked(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="card"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <Hero />
            <PhotoWallSection />
            <SongSection />
            <GallerySection />
            <CakeSection />
            <LetterSection />
            <WorldCards />
            <WishSection />
            <ClosingSection />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
