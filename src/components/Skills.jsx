import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useStaticLayout } from "../hooks/useStaticLayout";
import { SiTypescript } from "react-icons/si";
import { TECHNOLOGIES } from "../data/technologies";
import { FALLBACK_ICON, TECH_ICONS } from "./tech/techIcons";

const WORD = "CAPABILITIES";
const GLOW = { color: "#ffffff" };
//...................................
// Tools shown as glass tiles, three rows of eight on a wide screen
const TILE_IDS = [
  "react", "nextjs", "typescript", "javascript", "redux", "tailwind", "nodejs", "express",
  "mongodb", "mysql", "postgresql", "php", "python", "flutter", "docker", "git",
  "github", "vercel", "postman", "vscode", "html", "css", "bootstrap", "tanstack",
];

const TILES = TILE_IDS.map((id) => {
  if (id === "typescript") return { id, name: "TypeScript", Icon: SiTypescript, color: "#3178C6" };
  const tech = TECHNOLOGIES[id];
  const { Icon, color } = TECH_ICONS[tech?.icon] ?? FALLBACK_ICON;
  return { id, name: tech?.name ?? id, Icon, color: color ?? "#f8f8f8" };
});

function TileBody({ tile }) {
  return (
    <div
      className="flex aspect-square w-full flex-col items-center justify-center rounded-xl border p-2"
      style={{ borderColor: `${tile.color}99`, background: `linear-gradient(135deg, ${tile.color}38, rgba(255,255,255,0.06)), #14121d` }}
    >
      <span className="text-[1.7rem] sm:text-[2.1rem]" style={{ color: tile.color }}>
        <tile.Icon aria-hidden="true" />
      </span>
      <span className="mt-1.5 max-w-full truncate font-mono text-[8px] font-medium text-white sm:text-[10px]">{tile.name}</span>
    </div>
  );
}

// One heading letter: rises from below and rotates flat as the scroll moves through its range
function Letter({ ch, index, progress }) {
  const start = 0.01 + index * 0.014;
  const end = start + 0.12;
  const y = useTransform(progress, [start, end], ["40vh", "0vh"]);
  const rotateX = useTransform(progress, [start, end], [-90, 0]);
  return (
    <motion.span className="inline-block" style={{ y, rotateX, transformOrigin: "50% 100%" }}>
      {ch}
    </motion.span>
  );
}

// A tile flies in along a curve, tilting upright, and settles into its place in the grid
function FlyTile({ tile, index, progress }) {
  const n = TILES.length;
  const start = 0.08 + (index / n) * 0.34;
  const end = start + 0.3;
  const dir = index % 2 ? 1 : -1;
  const x = useTransform(progress, [start, end], [`${dir * (46 - (index / n) * 22)}vw`, "0vw"]);
  const y = useTransform(progress, [start, end], [`${-34 + (index / n) * 76}vh`, "0vh"]);
  const rotate = useTransform(progress, [start, end], [dir * 22, 0]);
  const scale = useTransform(progress, [start, end], [0.7, 1]);
  return (
    <motion.li style={{ x, y, rotate, scale }} className="will-change-transform">
      <TileBody tile={tile} />
    </motion.li>
  );
}

const GRID = "m-0 grid w-full max-w-4xl list-none grid-cols-4 gap-2 p-0 sm:grid-cols-6 sm:gap-2.5 md:grid-cols-8";

export default function Skills() {
  const ref = useRef(null);
  const reduce = useStaticLayout();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const heading = (
    <h2
      className="m-0 mb-8 text-center text-[clamp(2.2rem,6.4vw,5.4rem)] font-black uppercase leading-none tracking-[-0.03em]"
      style={{ ...GLOW, perspective: "1000px", fontFamily: "'Inter', sans-serif" }}
    >
      {reduce ? (
        WORD
      ) : (
        <>
          <span className="sr-only">{WORD}</span>
          <span aria-hidden="true" className="block py-1">
            {WORD.split("").map((ch, i) => (
              <Letter key={i} ch={ch} index={i} progress={scrollYProgress} />
            ))}
          </span>
        </>
      )}
    </h2>
  );

  // Reduced motion: the same tiles, laid out plainly with no pinned scroll
  if (reduce) {
    return (
      <div aria-label="Capabilities" className="flex flex-col items-center px-4 py-24 sm:px-8">
        {heading}
        <ul className={GRID}>
          {TILES.map((t) => (
            <li key={t.id}>
              <TileBody tile={t} />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div ref={ref} aria-label="Capabilities" className="relative h-[250vh] md:h-[320vh]">
      <div className="sticky top-0 flex h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-4 sm:px-8">
        {heading}
        <ul className={GRID} style={{ perspective: "1000px" }}>
          {TILES.map((t, i) => (
            <FlyTile key={t.id} tile={t} index={i} progress={scrollYProgress} />
          ))}
        </ul>
      </div>
    </div>
  );
}
