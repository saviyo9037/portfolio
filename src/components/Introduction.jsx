import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { FiArrowRight, FiDownload, FiMapPin } from "react-icons/fi";
import heroPhoto from "../assets/saviyo-cutout.png";
import { scrollToId } from "../lib/scroll";
import { useStaticLayout } from "../hooks/useStaticLayout";
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

const sideFade = "linear-gradient(to right, transparent 0%, #000 18%, #000 82%, transparent 100%)";

function Glow() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute -left-32 top-10 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(98,64,181,0.32),transparent_65%)] [animation:hero-drift-a_14s_ease-in-out_infinite]" />
      <div className="absolute -right-24 bottom-0 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(124,92,214,0.24),transparent_65%)] [animation:hero-drift-b_17s_ease-in-out_infinite]" />
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
  );
}

function Buttons({ goTo }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
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
    </div>
  );
}

function Stats({ align = "left", delay = 0 }) {
  return (
    <ul className={`m-0 grid list-none gap-4 p-0 ${align === "right" ? "text-right" : "grid-cols-3 gap-2"}`}>
      {STATS.map((s, i) => (
        <li key={s.label} className={align === "right" ? (i > 0 ? "border-t border-[var(--border-subtle)] pt-4" : "") : i > 0 ? "border-l border-[var(--border-subtle)] pl-4 sm:pl-6" : ""}>
          <p className="m-0 text-xl font-extrabold text-[var(--text-main)] sm:text-3xl">
            <CountUp value={s.value} delay={delay + i * 0.15} />
          </p>
          <p className="m-0 mt-0.5 text-xs text-[var(--text-dim)] sm:text-sm">{s.label}</p>
        </li>
      ))}
    </ul>
  );
}

// Phones, reduced motion and short screens: everything stacked, no pinned scroll
function Stacked({ goTo, time, reduce }) {
  const fade = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE },
  });
  return (
    <section className="relative w-full overflow-hidden px-5 pb-12 pt-28 sm:px-8">
      <Glow />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <motion.span {...fade(0.05)} className="inline-flex items-center gap-2.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)]/80 py-2 pl-3 pr-4 text-sm text-[var(--text-muted)]">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          <RotatingStatus />
        </motion.span>
        <h1 className="m-0 mt-6 font-black uppercase leading-[0.9] text-[var(--text-main)]" style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "-0.05em", fontSize: "clamp(3.4rem, 17vw, 8rem)" }}>
          <span className="block">Saviyo</span>
          <span className="serif-accent block normal-case">George</span>
        </h1>
        <motion.img
          {...fade(0.3)}
          src={heroPhoto}
          alt="Saviyo George"
          width="768"
          height="1024"
          loading="eager"
          className="mt-4 block h-auto w-full max-w-[22rem] select-none"
          style={{ maskImage: sideFade, WebkitMaskImage: sideFade }}
        />
        <WordsFade delay={0.5} text={INTRO_TEXT} className="m-0 mt-6 max-w-[46ch] text-base leading-relaxed text-[var(--text-muted)] sm:text-lg" />
        <TypedRole />
        <motion.div {...fade(0.9)} className="mt-8">
          <Buttons goTo={goTo} />
        </motion.div>
        <motion.div {...fade(1)} className="mt-10 w-full max-w-md">
          <Stats />
        </motion.div>
        <p className="m-0 mt-8 flex items-center gap-1.5 text-sm text-[var(--text-muted)]">
          <FiMapPin aria-hidden="true" style={{ color: ACCENT }} /> Kerala · <span className="font-semibold tabular-nums text-[var(--text-main)]">{time}</span>
        </p>
      </div>
    </section>
  );
}

// Wide screens: the section is pinned. As you scroll, the two halves of the name slide apart,
// the portrait grows, and the intro and numbers move in where the name was.
function Pinned({ goTo, time }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  const leftX = useTransform(p, [0, 0.6], ["0vw", "-46vw"]);
  const rightX = useTransform(p, [0, 0.6], ["0vw", "46vw"]);
  const wordOpacity = useTransform(p, [0, 0.5], [1, 0]);
  const photoScale = useTransform(p, [0, 1], [1, 1.2]);
  const infoOpacity = useTransform(p, [0.35, 0.7], [0, 1]);
  const infoY = useTransform(p, [0.35, 0.7], [40, 0]);

  const nameStyle = { fontFamily: "'Inter', sans-serif", letterSpacing: "-0.055em", fontSize: "clamp(4rem, 10.5vw, 12rem)" };

  const rise = (delay) => ({
    initial: { y: "110%" },
    animate: { y: "0%" },
    transition: { duration: 0.9, delay, ease: EASE },
  });

  return (
    <div ref={ref} className="relative h-[230vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <Glow />

        {/* Status line at the top */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: EASE }} className="absolute inset-x-0 top-24 z-20 flex justify-center">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)]/80 py-2 pl-3 pr-4 text-sm text-[var(--text-muted)]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <RotatingStatus />
          </span>
        </motion.div>

        {/* The name, in two halves either side of the portrait */}
        <h1 className="m-0" aria-label="Saviyo George">
          <motion.span aria-hidden="true" className="absolute left-[3vw] top-[24%] z-0 block font-black uppercase leading-none text-[var(--text-main)]" style={{ ...nameStyle, x: leftX, opacity: wordOpacity }}>
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span className="block" {...rise(0.2)}>
                Saviyo
              </motion.span>
            </span>
          </motion.span>
          <motion.span aria-hidden="true" className="serif-accent absolute right-[3vw] top-[24%] z-0 block font-black leading-none" style={{ ...nameStyle, x: rightX, opacity: wordOpacity }}>
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span className="block" {...rise(0.35)}>
                George
              </motion.span>
            </span>
          </motion.span>
        </h1>

        {/* The portrait, anchored to the bottom and growing as you scroll */}
        <motion.div
          className="absolute bottom-0 left-1/2 z-10 w-[min(34vw,30rem)] -translate-x-1/2"
          style={{ scale: photoScale, transformOrigin: "50% 100%" }}
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: EASE }}
        >
          <img src={heroPhoto} alt="Saviyo George" width="768" height="1024" loading="eager" className="block h-auto w-full select-none" style={{ maskImage: sideFade, WebkitMaskImage: sideFade }} />
        </motion.div>

        {/* Intro and role move in on the left as the name leaves */}
        <motion.div className="absolute left-[4vw] top-[30%] z-20 max-w-[23rem]" style={{ opacity: infoOpacity, y: infoY }}>
          <WordsFade delay={0.5} text={INTRO_TEXT} className="m-0 text-lg leading-relaxed text-[var(--text-muted)]" />
          <TypedRole />
        </motion.div>

        {/* Numbers on the right */}
        <motion.div className="absolute right-[4vw] top-[30%] z-20 w-[16rem]" style={{ opacity: infoOpacity, y: infoY }}>
          <Stats align="right" delay={0.9} />
        </motion.div>

        {/* Always there: the two buttons and the place */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.1, ease: EASE }} className="absolute bottom-[7%] left-[4vw] z-20">
          <Buttons goTo={goTo} />
        </motion.div>
        <p className="absolute bottom-[7%] right-[4vw] z-20 m-0 flex items-center gap-1.5 text-sm text-[var(--text-muted)]">
          <FiMapPin aria-hidden="true" style={{ color: ACCENT }} /> Kerala · <span className="font-semibold tabular-nums text-[var(--text-main)]">{time}</span>
        </p>
      </div>
    </div>
  );
}

export default function Introduction() {
  const reduce = useReducedMotion();
  const plain = useStaticLayout();
  const time = useKeralaTime();
  const goTo = (id) => (e) => {
    e.preventDefault();
    scrollToId(id);
  };

  if (plain) return <Stacked goTo={goTo} time={time} reduce={reduce} />;
  return (
    <>
      <div className="lg:hidden">
        <Stacked goTo={goTo} time={time} reduce={reduce} />
      </div>
      <div className="hidden lg:block">
        <Pinned goTo={goTo} time={time} />
      </div>
    </>
  );
}
