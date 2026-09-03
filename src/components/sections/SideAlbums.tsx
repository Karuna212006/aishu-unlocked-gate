import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/reduced-motion";

import bmwBike from "@/assets/bmw_s1000rr_couples.jpg.asset.json";
import bmwCouple from "@/assets/bmw_couples.jpg.asset.json";
import yamal1 from "@/assets/yamal_brother_1.jpg.asset.json";
import yamal from "@/assets/yamal_brother.jpg.asset.json";
import messi from "@/assets/messi.jpg.asset.json";
import levi from "@/assets/levi.jpg.asset.json";
import sasha1 from "@/assets/sasha1.jpg.asset.json";
import sasha from "@/assets/sasha.jpg.asset.json";
import lewisNeymar from "@/assets/lewis_x_neymar.jpg.asset.json";
import lewis from "@/assets/lewis.jpg.asset.json";

const LEFT = [
  { src: "/bts_formal.jpg", caption: "BTS — suited & stunning", tilt: -5 },
  { src: messi.url, caption: "the goat", tilt: -6 },
  { src: levi.url, caption: "clean freak", tilt: 5 },
  { src: bmwCouple.url, caption: "someday, this drive", tilt: -4 },
  { src: sasha.url, caption: "potato girl", tilt: 7 },
  { src: yamal.url, caption: "vamos", tilt: -5 },
];

const RIGHT = [
  { src: "/bts_dark.jpg", caption: "BTS — all black everything", tilt: 6 },
  { src: lewis.url, caption: "still him", tilt: 6 },
  { src: bmwBike.url, caption: "two helmets, one road", tilt: -5 },
  { src: lewisNeymar.url, caption: "two worlds, one frame", tilt: 4 },
  { src: sasha1.url, caption: "one more bite", tilt: -7 },
  { src: yamal1.url, caption: "¡vamos!", tilt: 5 },
];

function Column({
  items,
  side,
  drift,
}: {
  items: typeof LEFT;
  side: "left" | "right";
  drift: boolean;
}) {
  return (
    <div
      className={`pointer-events-none absolute top-0 hidden h-full w-[170px] flex-col items-center gap-20 pt-[24vh] md:flex lg:w-[200px] xl:w-[230px] ${
        side === "left" ? "left-1 xl:left-6" : "right-1 xl:right-6"
      }`}
    >
      {items.map((item, i) => (
        <motion.figure
          key={item.src}
          initial={{ opacity: 0, y: 40, rotate: item.tilt }}
          whileInView={{ opacity: 0.75, y: 0, rotate: item.tilt }}

          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="w-full rounded-[3px] bg-[#f6f1e6] p-2 pb-5 shadow-[0_18px_50px_-18px_rgba(0,0,0,0.9)]"
          style={
            drift
              ? { animation: `float-soft ${9 + (i % 3) * 2}s ease-in-out ${i * 0.7}s infinite` }
              : {}
          }

        >
          <img
            src={item.src}
            alt={item.caption}
            loading="lazy"
            className="h-[190px] w-full object-cover xl:h-[230px]"
          />
          <figcaption className="mt-2 text-center font-script text-base leading-none text-[#2a2350]">
            {item.caption}
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
}

/** Decorative side "photo albums" — purely background, never intercepts clicks. */
export function SideAlbums() {
  const reduced = useReducedMotion();
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <Column items={LEFT} side="left" drift={!reduced} />
      <Column items={RIGHT} side="right" drift={!reduced} />
    </div>
  );
}
