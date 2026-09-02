import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
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

export const Route = createFileRoute("/card")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Happy Birthday Aishu — Inside the Gate" },
      {
        name: "description",
        content:
          "Six glowing fandom worlds, a cake to cut, a candle to blow out, and a handwritten letter for Aishu.",
      },
      { property: "og:title", content: "Happy Birthday Aishu — Inside the Gate" },
      {
        property: "og:description",
        content: "Photos, a song, a cake, a wish and a letter — all for Aishu.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CardPage,
});

function CardPage() {
  return (
    <main id="top" className="relative min-h-screen bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative"
      >
        <SideAlbums />
        <div className="relative z-10 md:px-[190px] lg:px-[220px] xl:px-[270px]">

          <Hero />
          <PhotoWallSection />
          <SongSection />
          <GallerySection />
          <CakeSection />
          <LetterSection />
          <WorldCards />
          <WishSection />
          <ClosingSection />
        </div>
      </motion.div>
    </main>
  );
}
