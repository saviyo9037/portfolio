import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiArrowRight, FiDownload, FiMapPin } from "react-icons/fi";
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

const LINES = ["Full-stack", "developer", "& MERN."];

export default function Introduction() {
  const reduce = useReducedMotion();
  const time = useKeralaTime();
  const cardRef = useRef(null);
  const goTo = (id) => (e) => {
    e.preventDefault();
    scrollToId(id);
  };

  // A spotlight on the portrait follows the pointer; the rest of the picture stays dim.
  // Written straight to the element, so moving the mouse never re-renders anything.
  const spot = (e) => {
    const el = cardRef.current;
    if (!el || reduce || !window.matchMedia("(pointer: fine)").matches) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
    el.style.setProperty("--tx", (((e.clientX - r.left) / r.width - 0.5) * 2).toFixed(3));
    el.style.setProperty("--ty", (((e.clientY - r.top) / r.height - 0.5) * 2).toFixed(3));
  };
  const spotOff = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "42%");
    el.style.setProperty("--tx", "0");
    el.style.setProperty("--ty", "0");
  };

  const fade = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE },
  });

  const spotMask = "radial-gradient(circle 15rem at var(--mx, 50%) var(--my, 42%), #000 0%, #000 35%, transparent 100%)";

  return (
    <section className="relative flex min-h-[100svh] w-full flex-col overflow-hidden px-5 pb-12 pt-28 sm:px-8 lg:pt-24">
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

      <div className="relative mx-auto grid w-full max-w-[1400px] flex-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        {/* Left: the message, one line at a time out of a mask */}
        <div className="order-2 lg:order-1">
          <motion.p {...fade(0.05)} className="m-0 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-[var(--text-dim)]">
            <span className="h-px w-10 bg-[var(--text-dim)]" /> Portfolio · Kerala, India · {time}
          </motion.p>

          <h1
            className="m-0 mt-6 font-black uppercase leading-[0.92] text-[var(--text-main)]"
            style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "-0.045em", fontSize: "clamp(3.2rem, 8.4vw, 8rem)" }}
            aria-label="Full-stack developer and MERN"
          >
            {LINES.map((line, i) => (
              <span key={line} aria-hidden="true" className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className={`block ${i === 1 ? "text-transparent" : ""} ${i === 2 ? "serif-accent normal-case" : ""}`}
                  style={i === 1 ? { WebkitTextStroke: "2px #c4b5fd" } : undefined}
                  initial={reduce ? false : { y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: EASE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <WordsFade delay={0.8} text={INTRO_TEXT} className="m-0 mt-7 max-w-[48ch] text-lg leading-relaxed text-[var(--text-muted)]" />

          <motion.div {...fade(1.3)}>
            <TypedRole />
          </motion.div>

          <motion.div {...fade(1.4)} className="mt-8 flex flex-wrap items-center gap-3">
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

          <motion.ul {...fade(1.55)} className="m-0 mt-10 grid max-w-xl list-none grid-cols-3 gap-2 p-0">
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

        {/* Right: a portrait card lit by a spotlight that follows the pointer */}
        <motion.div
          className="order-1 mx-auto w-full max-w-[26rem] lg:order-2 lg:max-w-[32rem]"
          initial={reduce ? false : { opacity: 0, y: 60, rotate: 3 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
        >
          <div
            ref={cardRef}
            onPointerMove={spot}
            onPointerLeave={spotOff}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-white/15 bg-[#14121d] shadow-[0_30px_90px_rgba(40,24,90,0.55)]"
            style={{ "--mx": "50%", "--my": "42%", "--tx": 0, "--ty": 0 }}
          >
            {/* Violet backdrop with a faint grid */}
            <div aria-hidden="true" className="absolute inset-0" style={{ background: "radial-gradient(80% 60% at 50% 35%, rgba(124,92,214,0.55), transparent 70%), linear-gradient(to bottom, #1c1928, #0f0d17)" }} />
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.12]"
              style={{ backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }}
            />

            {/* The dim picture, then the same picture in full colour, only under the spotlight */}
            <img
              src={heroPhoto}
              alt="Saviyo George"
              width="768"
              height="1024"
              loading="eager"
              className="absolute inset-x-0 bottom-0 h-[92%] w-full select-none object-cover object-top"
              style={{ filter: reduce ? "none" : "grayscale(0.7) brightness(0.55)", transform: "translate(calc(var(--tx) * 6px), calc(var(--ty) * 4px))", transition: "transform 0.25s ease-out" }}
            />
            {!reduce && (
              <img
                src={heroPhoto}
                alt=""
                aria-hidden="true"
                width="768"
                height="1024"
                className="absolute inset-x-0 bottom-0 h-[92%] w-full select-none object-cover object-top"
                style={{ maskImage: spotMask, WebkitMaskImage: spotMask, transform: "translate(calc(var(--tx) * 6px), calc(var(--ty) * 4px))", transition: "transform 0.25s ease-out" }}
              />
            )}

            {/* A soft ring of light at the spotlight */}
            {!reduce && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
                style={{ left: "var(--mx, 50%)", top: "var(--my, 42%)" }}
              />
            )}

            {/* Card details */}
            <p className="absolute left-5 top-4 m-0 font-mono text-[11px] uppercase tracking-[0.25em] text-white/60">01 / Portrait</p>
            <span className="absolute right-5 top-4 inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 text-xs text-white/85">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <RotatingStatus />
            </span>
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/70 to-transparent p-5 pt-16">
              <div>
                <p className="m-0 text-xl font-extrabold text-white">Saviyo George</p>
                <p className="m-0 mt-0.5 flex items-center gap-1.5 text-sm text-white/70">
                  <FiMapPin aria-hidden="true" style={{ color: ACCENT }} /> Kerala, India
                </p>
              </div>
              <p className="m-0 font-mono text-xs uppercase tracking-[0.2em] text-white/60">Full-stack</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
