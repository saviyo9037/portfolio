import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiArrowRight, FiDownload, FiMapPin } from "react-icons/fi";
import { SiTypescript } from "react-icons/si";
import heroScene from "../assets/hero-scene.webp";
import { scrollToId } from "../lib/scroll";
import { TECHNOLOGIES } from "../data/technologies";
import { FALLBACK_ICON, TECH_ICONS } from "./tech/techIcons";
import { CountUp, Magnetic } from "./motion/effects";

const ACCENT = "#ffc933";
const EASE = [0.16, 1, 0.3, 1];

const STATS = [
  { value: "4+", label: "Projects" },
  { value: "1.5+ Years", label: "Experience" },
  { value: "MERN Stack", label: "Specialization" },
];

// The profile as code, typed out in the code tile
const CODE = [
  ["k", "const "], ["p", "saviyo"], ["d", " = {\n"],
  ["d", "  "], ["p", "role"], ["d", ": "], ["s", '"Full-Stack Developer"'], ["d", ",\n"],
  ["d", "  "], ["p", "stack"], ["d", ": ["], ["s", '"MongoDB"'], ["d", ", "], ["s", '"Express"'], ["d", ", "], ["s", '"React"'], ["d", ", "], ["s", '"Node"'], ["d", "],\n"],
  ["d", "  "], ["p", "builds"], ["d", ": ["], ["s", '"ERP"'], ["d", ", "], ["s", '"POS"'], ["d", ", "], ["s", '"CRM/LMS"'], ["d", "],\n"],
  ["d", "  "], ["p", "openToWork"], ["d", ": "], ["n", "true"], ["d", ",\n};"],
];
const CODE_COLORS = { k: ACCENT, p: "#c4c4c4", s: "#ffdf80", n: "#f5f5f5", d: "#8e8e8e" };
const CODE_LENGTH = CODE.reduce((n, [, t]) => n + t.length, 0);
// Where each piece starts in the full text, so we can reveal the first N characters
const CODE_STARTS = CODE.map((_, i) => CODE.slice(0, i).reduce((n, [, t]) => n + t.length, 0));

const MARQUEE_IDS = ["react", "nextjs", "typescript", "nodejs", "express", "mongodb", "mysql", "postgresql", "tailwind", "redux", "docker", "git", "vercel", "python", "flutter"];
const MARQUEE = MARQUEE_IDS.map((id) => {
  if (id === "typescript") return { id, name: "TypeScript", Icon: SiTypescript, color: "#3178C6" };
  const tech = TECHNOLOGIES[id];
  const { Icon, color } = TECH_ICONS[tech?.icon] ?? FALLBACK_ICON;
  return { id, name: tech?.name ?? id, Icon, color: color ?? "#f5f5f5" };
});

const STATUS_LINES = ["Open to new opportunities", "Building ERP & POS systems", "Shipping MERN apps"];
const ROLES = ["Full-Stack Developer", "ERP & POS Engineer", "API Designer", "MERN Specialist"];
const INTRO_TEXT =
  "I design and develop production-ready web applications, ERP & POS systems, CRM/LMS platforms and AI-powered tools that solve real business problems.";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffc933]";

// A tile that tilts a few degrees toward the pointer, with a soft light that follows it
function Tile({ className = "", children, delay = 0, depth = 4 }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);

  const move = (e) => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
    el.style.setProperty("--spot", "1");
    el.style.transform = `perspective(900px) rotateX(${((0.5 - y) * depth).toFixed(2)}deg) rotateY(${((x - 0.5) * depth).toFixed(2)}deg)`;
  };
  const leave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--spot", "0");
    el.style.transform = "";
  };

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 36, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.85, delay, ease: EASE }}
      className={className}
    >
      <div
        ref={ref}
        onPointerMove={move}
        onPointerLeave={leave}
        className="relative h-full overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] transition-[transform,border-color] duration-200 ease-out hover:border-white/25"
      >
        {children}
        {/* Light that follows the pointer */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[var(--spot,0)] transition-opacity duration-300"
          style={{ background: "radial-gradient(360px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.08), transparent 60%)" }}
        />
      </div>
    </motion.div>
  );
}

// Types the profile code a few characters at a time
function CodeTile() {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(reduce ? CODE_LENGTH : 0);

  useEffect(() => {
    if (reduce) return undefined;
    let timer = 0;
    const start = window.setTimeout(() => {
      timer = window.setInterval(() => {
        setCount((c) => {
          if (c >= CODE_LENGTH) {
            window.clearInterval(timer);
            return c;
          }
          return c + 2;
        });
      }, 28);
    }, 900);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(timer);
    };
  }, [reduce]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        </span>
        <span className="font-mono text-xs text-[var(--text-dim)]">saviyo.js</span>
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-[var(--text-dim)]">
          <span className={`h-1.5 w-1.5 rounded-full ${count < CODE_LENGTH ? "animate-pulse bg-[#ffbd2e]" : "bg-[#27c93f]"}`} />
          {count < CODE_LENGTH ? "typing" : "ready"}
        </span>
      </div>
      <pre className="m-0 flex-1 whitespace-pre-wrap p-4 font-mono text-[12px] leading-6 sm:text-[13px]" aria-label="Profile written as code">
        {CODE.map(([kind, text], i) => {
          const shown = text.slice(0, Math.max(0, count - CODE_STARTS[i]));
          return shown ? (
            <span key={i} style={{ color: CODE_COLORS[kind] }}>
              {shown}
            </span>
          ) : null;
        })}
        <span className="ml-0.5 inline-block h-4 w-[7px] translate-y-0.5 animate-pulse" style={{ backgroundColor: ACCENT }} />
      </pre>
    </div>
  );
}

// Local time in Kerala, updated every second
function useKeralaTime() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "Asia/Kolkata" }).format(now);
}

// Cycles through short lines, each sliding up as the last slides out
function RotatingStatus() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return undefined;
    const id = window.setInterval(() => setI((v) => (v + 1) % STATUS_LINES.length), 3200);
    return () => window.clearInterval(id);
  }, [reduce]);
  return (
    <span className="relative inline-flex h-5 items-center overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={i}
          className="block whitespace-nowrap"
          initial={reduce ? false : { y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          {STATUS_LINES[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// "I'm a ..." with the role typed out, deleted and typed again
function TypedRole() {
  const reduce = useReducedMotion();
  const [text, setText] = useState(reduce ? ROLES[0] : "");
  useEffect(() => {
    if (reduce) return undefined;
    let role = 0;
    let n = 0;
    let deleting = false;
    let timer = 0;
    const tick = () => {
      const word = ROLES[role];
      n += deleting ? -1 : 1;
      setText(word.slice(0, n));
      let wait = deleting ? 38 : 75;
      if (!deleting && n === word.length) {
        deleting = true;
        wait = 1500;
      } else if (deleting && n === 0) {
        deleting = false;
        role = (role + 1) % ROLES.length;
        wait = 350;
      }
      timer = window.setTimeout(tick, wait);
    };
    timer = window.setTimeout(tick, 1400);
    return () => window.clearTimeout(timer);
  }, [reduce]);
  return (
    <p className="m-0 mt-6 flex items-center gap-2 font-mono text-sm text-[var(--text-muted)]" aria-label={`I am a ${ROLES.join(", ")}`}>
      <span className="text-[var(--text-dim)]">I&apos;m a</span>
      <span className="inline-flex min-h-[1.25rem] items-center font-semibold text-[var(--text-main)]" aria-hidden="true">
        {text}
        <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse" style={{ backgroundColor: ACCENT }} />
      </span>
    </p>
  );
}

// A sentence whose words fade up one by one, out of a blur
function WordsFade({ text, delay = 0, className = "" }) {
  const reduce = useReducedMotion();
  return (
    <p className={className}>
      {text.split(" ").map((w, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={reduce ? false : { opacity: 0, y: 12, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: delay + i * 0.035, ease: EASE }}
        >
          {w}&nbsp;
        </motion.span>
      ))}
    </p>
  );
}

// One headline word that rises out of a mask
function Word({ children, i, reduce, className = "" }) {
  return (
    <span className={`inline-block overflow-hidden pb-[0.08em] align-bottom ${className}`}>
      <motion.span
        className="inline-block"
        initial={reduce ? false : { y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.8, delay: 0.15 + i * 0.07, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Introduction() {
  const reduce = useReducedMotion();
  const time = useKeralaTime();
  const goTo = (id) => (e) => {
    e.preventDefault();
    scrollToId(id);
  };

  const fade = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE },
  });

  const words = ["Building", "real-world", "solutions", "with"];

  return (
    <section
      className="relative w-full overflow-hidden px-5 pb-20 pt-28 sm:px-8 lg:pb-24 lg:pt-32"
      onPointerMove={(e) => {
        if (!window.matchMedia("(pointer: fine)").matches) return;
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--hx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--hy", `${e.clientY - r.top}px`);
      }}
    >
      {/* Background: a light that follows the mouse, two slow lights and a faint grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0" style={{ background: "radial-gradient(420px circle at var(--hx, 30%) var(--hy, 30%), rgba(255,201,51,0.10), transparent 65%)" }} />
        <div className="absolute -left-24 top-10 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(255,201,51,0.13),transparent_65%)] [animation:hero-drift-a_14s_ease-in-out_infinite]" />
        <div className="absolute -right-16 bottom-0 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.07),transparent_65%)] [animation:hero-drift-b_17s_ease-in-out_infinite]" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse at 50% 40%, #000 20%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at 50% 40%, #000 20%, transparent 75%)",
          }}
        />
      </div>

      <div className="relative mx-auto grid w-full max-w-[1500px] items-center gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left: the message */}
        <div className="lg:col-span-5">
          <motion.span {...fade(0.05)} className="inline-flex items-center gap-2.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] py-2 pl-3 pr-4 text-sm text-[var(--text-muted)]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <RotatingStatus />
          </motion.span>

          <h1
            className="m-0 mt-7 font-black leading-[1.04] text-[var(--text-main)]"
            style={{ fontFamily: "'Inter', sans-serif", textTransform: "none", letterSpacing: "-0.035em", fontSize: "clamp(2.6rem, 5.2vw, 5rem)" }}
          >
            {words.map((w, i) => (
              <React.Fragment key={w}>
                <Word i={i} reduce={reduce}>
                  {w}
                </Word>{" "}
              </React.Fragment>
            ))}
            {/* MERN: the yellow box wipes in from the left, then the word turns dark */}
            <span className="relative inline-block align-bottom">
              <motion.span
                aria-hidden="true"
                className="absolute inset-x-0 inset-y-[0.04em] origin-left -rotate-1 rounded-xl"
                style={{ backgroundColor: ACCENT }}
                initial={reduce ? false : { scaleX: 0 }}
                animate={reduce ? { scaleX: 1 } : { scaleX: 1, rotate: [-1, 0.6, -1] }}
                transition={{
                  scaleX: { duration: 0.7, delay: 0.75, ease: EASE },
                  rotate: { duration: 5, delay: 2, repeat: Infinity, ease: "easeInOut" },
                }}
              />
              <motion.span
                className="relative inline-block px-3"
                initial={reduce ? false : { color: "#f5f5f5" }}
                animate={{ color: "#000000" }}
                transition={{ duration: 0.3, delay: 0.95 }}
              >
                <Word i={4} reduce={reduce}>
                  MERN
                </Word>
              </motion.span>
            </span>{" "}
            <Word i={5} reduce={reduce}>
              stack.
            </Word>
          </h1>

          <WordsFade delay={0.6} text={INTRO_TEXT} className="m-0 mt-7 max-w-[46ch] text-lg leading-relaxed text-[var(--text-muted)]" />

          <motion.div {...fade(1.2)}>
            <TypedRole />
          </motion.div>

          <motion.div {...fade(1.3)} className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href="#projects"
                onClick={goTo("projects")}
                className={`hero-shine relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full px-7 text-base font-bold text-black transition-colors hover:bg-white ${focusRing}`}
                style={{ backgroundColor: ACCENT }}
              >
                View Projects <FiArrowRight aria-hidden="true" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="/Saviyo_George_Resume.pdf"
                download
                className={`inline-flex h-12 items-center gap-2 rounded-full border border-[var(--text-dim)] px-7 text-base font-semibold text-[var(--text-main)] transition-colors hover:border-[#ffc933] hover:text-[#ffc933] ${focusRing}`}
              >
                <FiDownload aria-hidden="true" /> Download Resume
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* Right: a bento of tiles */}
        <div className="grid grid-cols-6 gap-3 sm:gap-4 lg:col-span-7">
          <Tile delay={0.2} className="col-span-6 h-72 sm:h-80 xl:col-span-3 xl:row-span-2 xl:h-auto xl:min-h-[26rem]">
            <motion.img
              src={heroScene}
              alt="Saviyo George at a laptop, with a code card and tech logos"
              className="absolute inset-0 h-full w-full select-none object-cover object-[78%_20%] xl:object-[72%_20%]"
              loading="eager"
              animate={reduce ? undefined : { scale: [1, 1.06, 1] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <p className="m-0 text-sm font-semibold text-white">Saviyo George</p>
              <span className="rounded-full bg-black/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/80">MERN</span>
            </div>
          </Tile>

          <Tile delay={0.3} className="col-span-6 sm:col-span-3">
            <CodeTile />
          </Tile>

          <Tile delay={0.4} className="col-span-6 sm:col-span-3">
            <div className="flex h-full items-center justify-between gap-4 p-5">
              <div>
                <p className="m-0 flex items-center gap-1.5 text-sm text-[var(--text-muted)]">
                  <FiMapPin aria-hidden="true" style={{ color: ACCENT }} /> Kerala, India
                </p>
                <p className="m-0 mt-1 text-3xl font-extrabold tabular-nums text-[var(--text-main)]">{time}</p>
              </div>
              <span className="rounded-full border border-[var(--border-subtle)] px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-[var(--text-dim)]">IST</span>
            </div>
          </Tile>

          <Tile delay={0.5} className="col-span-6">
            <ul className="m-0 grid list-none grid-cols-3 gap-2 p-5 sm:p-6">
              {STATS.map((s, i) => (
                <li key={s.label} className={i > 0 ? "border-l border-[var(--border-subtle)] pl-4 sm:pl-6" : ""}>
                  <p className="m-0 text-xl font-extrabold text-[var(--text-main)] sm:text-3xl">
                    <CountUp value={s.value} delay={0.9 + i * 0.15} />
                  </p>
                  <p className="m-0 mt-1 text-xs text-[var(--text-dim)] sm:text-sm">{s.label}</p>
                </li>
              ))}
            </ul>
          </Tile>

          <Tile delay={0.6} className="col-span-6">
            <div
              className="overflow-hidden py-4"
              aria-label="Tech stack"
              style={{ maskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)" }}
            >
              <div className="hero-marquee flex w-max items-center gap-10 px-5">
                {[...MARQUEE, ...MARQUEE].map((t, i) => (
                  <span key={`${t.id}-${i}`} className="inline-flex shrink-0 items-center gap-2.5 text-[var(--text-muted)]" aria-hidden={i >= MARQUEE.length}>
                    <t.Icon className="text-2xl" style={{ color: t.color }} />
                    <span className="text-sm font-medium">{t.name}</span>
                  </span>
                ))}
              </div>
              <div className="hero-marquee-rev mt-3 flex w-max items-center gap-10 px-5" aria-hidden="true">
                {[...MARQUEE].reverse().concat([...MARQUEE].reverse()).map((t, i) => (
                  <span key={`r-${t.id}-${i}`} className="inline-flex shrink-0 items-center gap-2.5 text-[var(--text-dim)]">
                    <t.Icon className="text-xl" style={{ color: t.color, opacity: 0.8 }} />
                    <span className="text-xs font-medium">{t.name}</span>
                  </span>
                ))}
              </div>
            </div>
          </Tile>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div {...fade(1.6)} aria-hidden="true" className="relative mt-12 hidden justify-center lg:flex">
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/30 pt-1.5">
          <span className="h-1.5 w-1 rounded-full bg-white/70 [animation:hero-scroll-dot_1.8s_ease-in-out_infinite]" />
        </span>
      </motion.div>
    </section>
  );
}
