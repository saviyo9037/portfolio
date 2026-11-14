import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiArrowRight, FiDownload } from "react-icons/fi";
import heroPhoto from "../assets/saviyo-cutout.png";
import { scrollToId } from "../lib/scroll";
import { CountUp, Magnetic } from "./motion/effects";

const ACCENT = "#ff4d00";
const EASE = [0.16, 1, 0.3, 1];

const STATS = [
  { value: "4+", label: "Projects shipped" },
  { value: "1.5+ Years", label: "Experience" },
  { value: "MERN Stack", label: "Specialization" },
];

const STATUS_LINES = ["Open to new opportunities", "Building ERP & POS systems", "Shipping MERN apps"];
const ROLES = ["Full-Stack Developer", "ERP & POS Engineer", "API Designer", "MERN Specialist"];
const INTRO_TEXT =
  "I design and develop production-ready web applications, ERP & POS systems, CRM/LMS platforms and AI-powered tools that solve real business problems.";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff4d00]";

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

const NOTES = [
  { text: "MERN stack", bg: "#c4b5fd", fg: "#1a1030", rot: -7, pos: "left-[2%] top-[8%]" },
  { text: "ERP & POS", bg: "#f4f0ff", fg: "#1a1030", rot: 6, pos: "right-[2%] top-[22%]" },
  { text: "AI tools", bg: "#ff4d00", fg: "#ffffff", rot: -5, pos: "left-[6%] bottom-[10%]" },
  { text: "CRM / LMS", bg: "#8b78d8", fg: "#ffffff", rot: 8, pos: "right-[6%] bottom-[6%]" },
];

export default function Introduction() {
  const reduce = useReducedMotion();
  const time = useKeralaTime();
  const stageRef = useRef(null);
  const goTo = (id) => (e) => {
    e.preventDefault();
    scrollToId(id);
  };

  const fade = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE },
  });

  return (
    <section className="relative flex min-h-[100svh] w-full flex-col overflow-hidden px-5 pb-14 pt-28 sm:px-8 lg:pt-24">
      {/* Background: two slow violet lights and a faint grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-10 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(98,64,181,0.32),transparent_65%)] [animation:hero-drift-a_14s_ease-in-out_infinite]" />
        <div className="absolute -right-24 bottom-0 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(124,92,214,0.22),transparent_65%)] [animation:hero-drift-b_17s_ease-in-out_infinite]" />
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

      <div className="relative mx-auto grid w-full max-w-[1400px] flex-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        {/* Left: a friendly hello with a hand-drawn underline */}
        <div className="order-2 lg:order-1">
          <motion.p {...fade(0.05)} className="m-0 flex items-center gap-2.5 text-base text-[var(--text-muted)]">
            <motion.span
              className="inline-block origin-[70%_70%] text-2xl"
              aria-hidden="true"
              animate={reduce ? undefined : { rotate: [0, 16, -8, 16, 0] }}
              transition={{ duration: 1.6, delay: 0.8, repeat: Infinity, repeatDelay: 2.4 }}
            >
              👋
            </motion.span>
            Hi there, I&apos;m
          </motion.p>

          <h1
            className="m-0 mt-3 font-black leading-[0.95] text-[var(--text-main)]"
            style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "-0.045em", fontSize: "clamp(3.2rem, 8vw, 7.4rem)" }}
          >
            {["Saviyo", "George"].map((w, i) => (
              <span key={w} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className={`inline-block ${i === 1 ? "serif-accent pr-[0.06em]" : ""}`}
                  initial={reduce ? false : { y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: EASE }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Scribble that draws itself under the name */}
          <svg viewBox="0 0 320 18" className="mt-1 h-4 w-60 sm:w-72" fill="none" aria-hidden="true">
            <motion.path
              d="M3 12 C 50 3, 90 16, 140 8 S 240 4, 316 10"
              stroke="#c4b5fd"
              strokeWidth="4"
              strokeLinecap="round"
              initial={reduce ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
            />
          </svg>

          <motion.div {...fade(0.7)}>
            <TypedRole />
          </motion.div>

          <WordsFade delay={0.9} text={INTRO_TEXT} className="m-0 mt-5 max-w-[48ch] text-lg leading-relaxed text-[var(--text-muted)]" />

          <motion.div {...fade(1.3)} className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href="#projects"
                onClick={goTo("projects")}
                className={`hero-shine relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full px-7 text-base font-semibold text-[#0b0a12] transition-colors hover:bg-[#ff4d00] hover:text-white ${focusRing}`}
                style={{ backgroundColor: "#f4f0ff" }}
              >
                View Projects <FiArrowRight aria-hidden="true" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="/Saviyo_George_Resume.pdf"
                download
                className={`inline-flex h-12 items-center gap-2 rounded-full border border-[var(--text-dim)] px-7 text-base font-semibold text-[var(--text-main)] transition-colors hover:border-[#ff4d00] hover:text-[#ff4d00] ${focusRing}`}
              >
                <FiDownload aria-hidden="true" /> Download Resume
              </a>
            </Magnetic>
          </motion.div>

          <motion.ul {...fade(1.5)} className="m-0 mt-10 grid max-w-xl list-none grid-cols-3 gap-2 p-0">
            {STATS.map((s, i) => (
              <li key={s.label} className={i > 0 ? "border-l border-[var(--border-subtle)] pl-4 sm:pl-6" : ""}>
                <p className="m-0 text-xl font-extrabold text-[var(--text-main)] sm:text-2xl">
                  <CountUp value={s.value} delay={1.6 + i * 0.15} />
                </p>
                <p className="m-0 mt-0.5 text-xs text-[var(--text-dim)] sm:text-sm">{s.label}</p>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Right: a photo print on a table with notes you can drag around */}
        <div ref={stageRef} className="relative order-1 mx-auto h-[30rem] w-full max-w-[34rem] sm:h-[36rem] lg:order-2 lg:h-[40rem]">
          {/* A second print behind, for depth */}
          <motion.div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-[78%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-sm bg-[#8b78d8]/80 shadow-2xl"
            initial={reduce ? false : { opacity: 0, rotate: 0 }}
            animate={{ opacity: 1, rotate: 9 }}
            transition={{ duration: 1, delay: 0.5, ease: EASE }}
          />

          {/* The print: drag it and it springs back */}
          <motion.figure
            className="absolute left-1/2 top-1/2 m-0 w-[62%] -translate-x-1/2 -translate-y-1/2 cursor-grab"
            drag={!reduce}
            dragSnapToOrigin
            dragElastic={0.25}
            whileDrag={{ scale: 1.04, cursor: "grabbing" }}
            initial={reduce ? false : { opacity: 0, y: 70, rotate: 10 }}
            animate={{ opacity: 1, y: 0, rotate: -4 }}
            transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
          >
            <div className="rounded-sm bg-[#f4f0ff] p-3 pb-4 shadow-[0_30px_70px_rgba(0,0,0,0.55)]">
              {/* A piece of tape */}
              <span aria-hidden="true" className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-2 bg-[#c4b5fd]/80" />
              <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-[#7c5cd6] to-[#2a1d55]">
                <img
                  src={heroPhoto}
                  alt="Saviyo George"
                  width="768"
                  height="1024"
                  loading="eager"
                  draggable="false"
                  className="absolute inset-x-0 bottom-0 h-[94%] w-full select-none object-cover object-top"
                />
              </div>
              <figcaption className="mt-3 flex items-center justify-between px-1 text-[#1a1030]">
                <span className="serif-accent text-2xl leading-none" style={{ color: "#1a1030" }}>
                  Saviyo, Kerala
                </span>
                <span className="font-mono text-xs tabular-nums opacity-70">{time}</span>
              </figcaption>
            </div>
          </motion.figure>

          {/* Sticky notes: drag them anywhere on the table */}
          {NOTES.map((n, i) => (
            <motion.span
              key={n.text}
              className={`absolute z-10 cursor-grab select-none rounded-lg px-4 py-2 text-base font-bold shadow-xl ${n.pos}`}
              style={{ background: n.bg, color: n.fg }}
              drag={!reduce}
              dragConstraints={stageRef}
              dragElastic={0.2}
              dragMomentum={false}
              whileDrag={{ scale: 1.12, rotate: 0, cursor: "grabbing", zIndex: 30 }}
              initial={reduce ? false : { opacity: 0, scale: 0.4, rotate: n.rot * 3 }}
              animate={{ opacity: 1, scale: 1, rotate: n.rot }}
              transition={{ type: "spring", stiffness: 240, damping: 14, delay: 1 + i * 0.12 }}
            >
              {n.text}
            </motion.span>
          ))}

          <motion.p {...fade(1.8)} className="absolute -bottom-2 left-1/2 m-0 -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--text-dim)]">
            Drag the notes and the photo
          </motion.p>
        </div>
      </div>
    </section>
  );
}
