import React, { useRef, useSyncExternalStore } from "react";
import { backOut, motion, useScroll, useTransform } from "framer-motion";
import { useStaticLayout } from "../hooks/useStaticLayout";
import { SiTypescript } from "react-icons/si";
import { FiCode, FiDatabase, FiLayout, FiServer, FiTool, FiZap } from "react-icons/fi";
import { TECHNOLOGIES } from "../data/technologies";
import { skills } from "../data/skills";
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
      style={{ borderColor: `${tile.color}99`, background: `linear-gradient(135deg, ${tile.color}38, rgba(255,255,255,0.05)), rgba(11, 11, 11,0.4)` }}
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
  const start = index * 0.003;
  const end = start + 0.035;
  const y = useTransform(progress, [start, end], ["4vh", "0vh"]);
  const rotateX = useTransform(progress, [start, end], [-55, 0]);
  const opacity = useTransform(progress, [start, start + 0.02], [0, 1]);
  return (
    <motion.span className="inline-block" style={{ y, rotateX, opacity, transformOrigin: "50% 100%" }}>
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

// The original Capabilities scene (phones, short screens and reduced motion)
function CapabilitiesScene() {
  const ref = useRef(null);
  const reduce = useStaticLayout();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const heading = (
    <h2
      className="relative z-10 m-0 mb-8 text-center text-[clamp(2.2rem,6.4vw,5.4rem)] font-black uppercase leading-none tracking-[-0.03em]"
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
    <div ref={ref} aria-label="Capabilities" className="relative h-[210vh] md:h-[320vh]">
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

// ====================================================================================================
// The toolkit, for wide screens: it takes over the same pinned space once the Capabilities animation has finished.
// ====================================================================================================
const ACCENT = "#7DD3FC";
const MAX_CHIPS = 9;
const GROUP_ICONS = { Languages: FiCode, Frontend: FiLayout, Backend: FiServer, Databases: FiDatabase, Tools: FiTool };
// The long "Other / Niche" list is split over two cards, so there are seven cards in all
const SPLIT_AT = 14;
const GROUPS = skills.flatMap((g) => {
  const make = (title, items, Icon) => ({ title, Icon, total: items.length, chips: items });
  if (g.category.startsWith("Other") && g.items.length > SPLIT_AT) {
    return [make("Systems & integrations", g.items.slice(0, SPLIT_AT), FiZap), make("Design & patterns", g.items.slice(SPLIT_AT), FiLayout)];
  }
  return [make(g.category, g.items, GROUP_ICONS[g.category] ?? FiZap)];
});
const chipClass = "cursor-default rounded-full border border-white/25 bg-white/[0.1] px-3 py-1 text-[13px] font-medium leading-tight text-white transition-[background-color,border-color,transform] duration-200 hover:-translate-y-px hover:border-[#7DD3FC]/70 hover:bg-[#7DD3FC]/15";
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const seg = (v, a, b) => clamp01((v - a) / (b - a));
const easeIn = (t) => t * t;

// A skill card: an icon tile, the title with a count, the chips, a faint big number behind, a light-blue spotlight that follows the
// pointer, and a thin light-blue line along the bottom edge
function CardShell({ number, title, Icon, total, children, className = "", style }) {
  const move = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
    el.style.setProperty("--spot", "1");
  };
  return (
    <motion.article
      onPointerMove={move}
      onPointerLeave={(e) => e.currentTarget.style.setProperty("--spot", "0")}
      className={`group/card relative flex flex-col overflow-hidden rounded-[1.5rem] border border-white/15 p-5 transition-[border-color,box-shadow] duration-300 hover:border-[#7DD3FC]/45 hover:shadow-[0_18px_50px_-18px_rgba(125,211,252,0.35)] ${className}`}
      style={{ background: "linear-gradient(165deg, rgba(46,46,50,0.97), rgba(16,16,18,0.99) 70%)", boxShadow: "inset 0 1px 1px rgba(255,255,255,0.12)", ...style }}
    >
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[var(--spot,0)] transition-opacity duration-300" style={{ background: "radial-gradient(260px circle at var(--mx, 50%) var(--my, 0%), rgba(125,211,252,0.2), transparent 70%)" }} />
      <span aria-hidden="true" className="pointer-events-none absolute -right-1 -top-3 select-none text-[5.5rem] font-black leading-none text-white/[0.035]" style={{ fontFamily: "'Inter', sans-serif" }}>
        {String(number).padStart(2, "0")}
      </span>

      <header className="relative flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#7DD3FC]/30 bg-[#7DD3FC]/10 text-lg text-[#7DD3FC] transition-colors duration-300 group-hover/card:bg-[#7DD3FC] group-hover/card:text-black">
          {Icon && <Icon aria-hidden="true" />}
        </span>
        <div className="min-w-0">
          <h3 className="m-0 truncate text-base font-semibold leading-tight text-white md:text-lg" style={{ fontFamily: "'Inter', sans-serif", textTransform: "none", letterSpacing: "-0.015em" }}>
            {title}
          </h3>
          <p className="m-0 font-mono text-[11px] uppercase tracking-[0.18em] text-white/65">
            {String(number).padStart(2, "0")} · {total} skills
          </p>
        </div>
      </header>

      <ul className="relative m-0 mt-4 flex list-none flex-wrap content-start gap-2 p-0">{children}</ul>
      <span aria-hidden="true" className="absolute inset-x-5 bottom-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(125,211,252,0.55), transparent)" }} />
    </motion.article>
  );
}

// Where each card sits on a 12-column grid: the middle of the columns it covers, its row, and how many columns wide it is.
// Four cards fill the top row (three columns each); three fill the bottom row (four columns each).
const POS = [[1.5, 0, 3], [4.5, 0, 3], [7.5, 0, 3], [10.5, 0, 3], [2, 1, 4], [6, 1, 4], [10, 1, 4]];

function Chip({ label, progress, at }) {
  const opacity = useTransform(progress, (p) => seg(p, at, at + 0.03));
  const transform = useTransform(progress, (p) => {
    const t = seg(p, at, at + 0.03);
    return `translateY(${(1 - t) * 14}px) scale(${0.7 + 0.3 * t})`;
  });
  return (
    <motion.li className={chipClass} style={{ opacity, transform }}>
      {label}
    </motion.li>
  );
}

function DealtCard({ group, i, progress, from }) {
  const [col, row, span] = POS[i];
  const start = from + 0.02 + i * 0.032;
  const end = start + 0.08;
  // leaving: after a hold, the cards go back the way they came, the last one first
  const exitStart = 0.88 + (GROUPS.length - 1 - i) * 0.01;
  const step = Math.min(0.003, 0.04 / group.chips.length); // a long list pops in faster, so all of it is done before the end
  const transform = useTransform(progress, (p) => {
    const t = backOut(seg(p, start, end)) * (1 - easeIn(seg(p, exitStart, exitStart + 0.06)));
    return `translate(${((6 - col) * 104 * (1 - t)) / span}%, ${(0.5 - row) * 104 * (1 - t)}%) rotate(${(i - 3) * 7 * (1 - t)}deg) rotateY(${110 * (1 - t)}deg) scale(${0.55 + 0.45 * t})`;
  });
  const opacity = useTransform(progress, (p) => seg(p, start, start + 0.03) * (1 - seg(p, exitStart + 0.03, exitStart + 0.06)));
  return (
    <CardShell number={i + 1} title={group.title} Icon={group.Icon} total={group.total} className={`h-full ${i < 4 ? "col-span-3" : "col-span-4"}`} style={{ transform, opacity, zIndex: i + 1, transformOrigin: "50% 50%", backfaceVisibility: "hidden" }}>
      {group.chips.map((c, j) => (
        <Chip key={c} label={c} progress={progress} at={end - 0.01 + j * step} />
      ))}
    </CardShell>
  );
}

function ToolkitStage({ progress, from }) {
  const headOpacity = useTransform(progress, (p) => seg(p, from, from + 0.06));
  const headY = useTransform(progress, (p) => (1 - seg(p, from, from + 0.06)) * 28);
  const draw = useTransform(progress, (p) => seg(p, from + 0.03, from + 0.1));
  // on the way out the heading fades up and away with the cards (no blur anywhere)
  const outFade = useTransform(progress, (p) => 1 - seg(p, 0.9, 0.96));
  const headShown = useTransform([headOpacity, outFade], ([a, b]) => a * b);
  return (
    <div className="absolute inset-x-0 bottom-0 top-[104px] flex flex-col px-6 pb-6 lg:px-12">
      <motion.div className="mx-auto w-full max-w-[1400px] shrink-0 text-center" style={{ opacity: headShown, y: headY }}>
        <h2 className="m-0 text-[clamp(1.5rem,3.4vw,3rem)] font-black leading-[1.05] tracking-[-0.03em] text-white" style={{ fontFamily: "'Inter', sans-serif", textTransform: "none" }}>
          A toolkit that covers every layer of the <span className="serif-accent" style={{ color: ACCENT }}>stack</span>.
        </h2>
        <span aria-hidden="true" className="mx-auto mt-3 block h-[3px] w-24 overflow-hidden rounded-full">
          <motion.span className="block h-full origin-left rounded-full" style={{ backgroundColor: ACCENT, scaleX: draw }} />
        </span>
        <p className="mb-0 mt-2 font-mono text-[11px] uppercase tracking-[0.3em] text-white/65">Seven areas · one stack</p>
      </motion.div>
      <div className="relative mx-auto mt-4 min-h-0 w-full max-w-[1400px] flex-1">
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-[auto_auto] content-center gap-4 [perspective:1400px]">
          {GROUPS.map((g, i) => (
            <DealtCard key={g.title} group={g} i={i} progress={progress} from={from} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Wide screens: the Capabilities scene exactly as before, then the toolkit takes its place. The first 55% of the scroll
// plays the original animation (it is handed a progress that runs 0 to 1 over that part); the rest is the toolkit.
const CAP_END = 0.42;
const TOOLKIT_FROM = 0.5; // the toolkit only starts after the Capabilities layer has completely gone

function CapabilitiesAndToolkit() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const cap = useTransform(scrollYProgress, [0, CAP_END], [0, 1], { clamp: true });
  const outOpacity = useTransform(scrollYProgress, [CAP_END + 0.01, CAP_END + 0.07], [1, 0]);
  const outY = useTransform(scrollYProgress, [CAP_END + 0.01, CAP_END + 0.07], ["0vh", "-30vh"]);
  // once it has faded out it is also hidden, so nothing of it can show through behind the cards
  const outVisibility = useTransform(outOpacity, (v) => (v <= 0.002 ? "hidden" : "visible"));

  return (
    <div ref={ref} aria-label="Capabilities and toolkit" className="relative h-[600vh]">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <motion.div className="flex h-full w-full flex-col items-center justify-center px-4 sm:px-8" style={{ opacity: outOpacity, y: outY, visibility: outVisibility }}>
          <h2 className="relative z-10 m-0 mb-8 text-center text-[clamp(2.2rem,6.4vw,5.4rem)] font-black uppercase leading-none tracking-[-0.03em]" style={{ ...GLOW, perspective: "1000px", fontFamily: "'Inter', sans-serif" }}>
            <span className="sr-only">{WORD}</span>
            <span aria-hidden="true" className="block py-1">
              {WORD.split("").map((ch, i) => (
                <Letter key={i} ch={ch} index={i} progress={cap} />
              ))}
            </span>
          </h2>
          <ul className={GRID} style={{ perspective: "1000px" }}>
            {TILES.map((t, i) => (
              <FlyTile key={t.id} tile={t} index={i} progress={cap} />
            ))}
          </ul>
        </motion.div>
        <ToolkitStage progress={scrollYProgress} from={TOOLKIT_FROM} />
      </div>
    </div>
  );
}

// Phones and short screens: the original scene, with the toolkit as stacked cards right after it
const QUERY = "(max-width: 767px), (max-height: 620px)";
const subscribe = (cb) => {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const useCompact = () =>
  useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );

function CompactToolkit() {
  const view = { once: false, margin: "-8% 0px" };
  return (
    <div aria-label="Toolkit" className="mx-auto w-full max-w-3xl px-4 pb-14 pt-4 sm:px-8">
      <motion.h2
        className="m-0 text-center text-[1.7rem] font-black leading-[1.08] tracking-[-0.03em] text-white"
        style={{ fontFamily: "'Inter', sans-serif", textTransform: "none" }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={view}
        transition={{ duration: 0.6 }}
      >
        A toolkit that covers every layer of the <span className="serif-accent" style={{ color: ACCENT }}>stack</span>.
      </motion.h2>
      <div className="mt-6 space-y-3">
        {GROUPS.map((g, gi) => (
          <motion.div key={g.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={view} transition={{ duration: 0.6 }}>
            <CardShell number={gi + 1} title={g.title} Icon={g.Icon} total={g.total}>
              {g.chips.map((c, j) => (
                <motion.li
                  key={c}
                  className={chipClass}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={view}
                  transition={{ type: "spring", stiffness: 420, damping: 20, delay: 0.2 + j * 0.02 }}
                >
                  {c}
                </motion.li>
              ))}
            </CardShell>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const compact = useCompact();
  const plain = useStaticLayout();
  if (compact || plain) {
    return (
      <>
        <CapabilitiesScene />
        <CompactToolkit />
      </>
    );
  }
  return <CapabilitiesAndToolkit />;
}
