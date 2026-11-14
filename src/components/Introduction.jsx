import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { FiArrowRight, FiDownload, FiMapPin } from "react-icons/fi";
import heroPhoto from "../assets/saviyo-cutout.webp";
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
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
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
    <section className="relative w-full overflow-hidden px-5 pb-8 pt-24 sm:px-8" style={{ maskImage: "linear-gradient(to bottom, #000 88%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, #000 88%, transparent 100%)" }}>
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
        <motion.div {...fade(1)} className="mt-8 w-full max-w-md">
          <Stats />
        </motion.div>
        <p className="m-0 mt-6 flex items-center gap-1.5 text-sm text-[var(--text-muted)]">
          <FiMapPin aria-hidden="true" style={{ color: ACCENT }} /> Kerala · <span className="font-semibold tabular-nums text-[var(--text-main)]">{time}</span>
        </p>
      </div>
    </section>
  );
}

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/{}#";
const KEYWORDS = ["production-ready", "ERP", "POS", "CRM/LMS", "AI-powered"];

// A label that decodes itself: random characters settle into the real letters, left to right
function Scramble({ text, run, className = "" }) {
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (!run) return undefined;
    let step = 0;
    const id = window.setInterval(() => {
      step += 1;
      const settled = step / 2;
      if (settled >= text.length) {
        window.clearInterval(id);
        setOut(text);
        return;
      }
      setOut(text.split("").map((ch, i) => (ch === " " || i < settled ? ch : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)])).join(""));
    }, 45);
    return () => window.clearInterval(id);
  }, [run, text]);
  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{out}</span>
    </span>
  );
}

// The intro sentence: words fade in, and the key terms get an orange line drawn under them
function Highlighted({ text, run, className = "" }) {
  return (
    <p className={className}>
      {text.split(" ").map((w, i) => {
        const key = KEYWORDS.some((k) => w.replace(/[,.]$/, "") === k);
        return (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ opacity: 0, y: 10 }}
            animate={run ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.03, ease: EASE }}
          >
            <span
              className={key ? "text-[var(--text-main)]" : ""}
              style={key ? { backgroundImage: "linear-gradient(#ff4d00, #ff4d00)", backgroundRepeat: "no-repeat", backgroundPosition: "0 100%", backgroundSize: run ? "100% 2px" : "0% 2px", transition: `background-size 0.7s ease ${0.6 + i * 0.03}s` } : undefined}
            >
              {w}
            </span>
            &nbsp;
          </motion.span>
        );
      })}
    </p>
  );
}

const SPARKS = [
  { left: "8%", size: 4, dur: 7, delay: 0 },
  { left: "20%", size: 3, dur: 9, delay: 2 },
  { left: "33%", size: 5, dur: 8, delay: 4 },
  { left: "47%", size: 3, dur: 10, delay: 1 },
  { left: "61%", size: 4, dur: 7.5, delay: 3 },
  { left: "74%", size: 5, dur: 9, delay: 5 },
  { left: "88%", size: 3, dur: 8, delay: 2.5 },
];

// One letter of the big name: rises in on load, then flies outward and tilts away as you scroll
function FlyLetter({ ch, i, count, dir, p, rise }) {
  const t = i / Math.max(1, count - 1);
  const x = useTransform(p, [0, 0.65], ["0vw", `${dir * (18 + t * 26)}vw`]);
  const rotate = useTransform(p, [0, 0.65], [0, dir * (6 + t * 14)]);
  const y = useTransform(p, [0, 0.65], ["0vh", `${-4 - t * 10}vh`]);
  const opacity = useTransform(p, [0, 0.3 + t * 0.2], [1, 0]);
  return (
    <motion.span className="inline-block" style={{ x, y, rotate, opacity }}>
      <span className="inline-block [animation:hero-bob_5s_ease-in-out_infinite]" style={{ animationDelay: `${1.6 + i * 0.28}s` }}>
      <span className="inline-block overflow-hidden pb-[0.06em] align-bottom">
        <motion.span
          className="inline-block cursor-default"
          initial={{ y: "110%" }}
          animate={{ y: "0%" }}
          whileHover={{ y: "-6%", scale: 1.08, color: "#ff4d00", transition: { type: "spring", stiffness: 400, damping: 14 } }}
          transition={{ duration: 0.9, delay: rise + i * 0.06, ease: EASE }}
        >
          {ch}
        </motion.span>
      </span>
      </span>
    </motion.span>
  );
}

// Wide screens: the section is pinned. As you scroll, the letters of the name fly apart,
// the portrait grows inside a turning ring, and the intro and numbers move in where the name was.
function Pinned({ goTo, time }) {
  const ref = useRef(null);
  const stageRef = useRef(null);
  const [ripples, setRipples] = useState([]);
  const nextRipple = useRef(0);
  // A ring spreads out from wherever you click
  const ripple = (e) => {
    const id = (nextRipple.current += 1);
    setRipples((r) => [...r.slice(-4), { id, x: e.clientX, y: e.clientY }]);
  };
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  const photoScale = useTransform(p, [0, 1], [1, 1.18]);
  const ringScale = useTransform(p, [0, 1], [0.82, 1.3]);
  const ringRotate = useTransform(p, [0, 1], [0, 140]);
  const ringRotateBack = useTransform(p, [0, 1], [0, -220]);
  const echoX = useTransform(p, [0, 1], ["6vw", "-30vw"]);
  const echoOpacity = useTransform(p, [0, 0.4, 1], [0.35, 1, 1]);
  const leftCardX = useTransform(p, [0.3, 0.7], [-60, 0]);
  const rightCardX = useTransform(p, [0.3, 0.7], [60, 0]);
  const cardOpacity = useTransform(p, [0.3, 0.65], [0, 1]);
  // The cards' text starts animating once they have appeared
  const [shown, setShown] = useState(false);
  useMotionValueEvent(p, "change", (v) => {
    if (v > 0.45) setShown((x) => x || true);
  });
  const hintOpacity = useTransform(p, [0, 0.2], [1, 0]);
  const railFill = useTransform(p, [0, 1], [0, 1]);
  // Near the end of the pin the whole scene melts into the page instead of ending on a hard edge
  const sceneOpacity = useTransform(p, [0.82, 1], [1, 0]);

  // The portrait and the ring lean toward the pointer (written straight to the DOM, no re-render)
  const lean = (e) => {
    const el = stageRef.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    el.style.setProperty("--tx", ((e.clientX / window.innerWidth - 0.5) * 2).toFixed(3));
    el.style.setProperty("--ty", ((e.clientY / window.innerHeight - 0.5) * 2).toFixed(3));
    el.style.setProperty("--mx", `${e.clientX}px`);
    el.style.setProperty("--my", `${e.clientY}px`);
  };

  const nameStyle = { fontFamily: "'Inter', sans-serif", letterSpacing: "-0.055em", fontSize: "clamp(4rem, 10.5vw, 12rem)" };
  const FIRST = "SAVIYO".split("");
  const LAST = "George".split("");

  return (
    <div ref={ref} className="relative -mb-[14vh] h-[240vh]">
      <motion.div ref={stageRef} onPointerMove={lean} onPointerDown={ripple} className="sticky top-0 h-screen overflow-hidden" style={{ "--tx": 0, "--ty": 0, opacity: sceneOpacity }}>
        <Glow />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0" style={{ background: "radial-gradient(420px circle at var(--mx, 50%) var(--my, 45%), rgba(196,181,253,0.16), transparent 65%)" }} />

        {/* An outlined copy of the full name that keeps drifting behind everything */}
        <motion.p
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-[16%] z-0 m-0 select-none whitespace-nowrap font-black uppercase leading-none"
          style={{ x: echoX, opacity: echoOpacity, fontFamily: "'Inter', sans-serif", fontSize: "clamp(8rem, 24vw, 26rem)", letterSpacing: "-0.06em", color: "transparent", WebkitTextStroke: "1.5px rgba(196,181,253,0.16)" }}
        >
          Saviyo George · Saviyo George
        </motion.p>

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

        {/* A dashed ring that turns as you scroll, with a dot riding on it */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[56%] z-0 aspect-square w-[44vw] max-w-[42rem] -translate-x-1/2 -translate-y-1/2"
          style={{ scale: ringScale, rotate: ringRotate }}
        >
          <div className="h-full w-full rounded-full border border-dashed border-white/20" />
          <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff4d00] shadow-[0_0_18px_#ff4d00]" />
        </motion.div>
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[58%] z-0 aspect-square w-[30vw] max-w-[30rem] -translate-x-1/2 -translate-y-1/2"
          style={{ scale: ringScale, rotate: ringRotateBack }}
        >
          <div className="h-full w-full rounded-full border border-white/10" />
          <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#c4b5fd] shadow-[0_0_14px_#c4b5fd]" />
        </motion.div>
        {SPARKS.map((sp) => (
          <span
            key={sp.left}
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 z-0 rounded-full bg-[#c4b5fd]"
            style={{ left: sp.left, width: sp.size, height: sp.size, opacity: 0, animation: `hero-rise ${sp.dur}s ease-in ${sp.delay}s infinite` }}
          />
        ))}
        <motion.div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[60%] z-0 h-[40vw] w-[40vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,92,214,0.4),transparent_65%)]" animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />

        {/* Click ripples */}
        {ripples.map((r) => (
          <span
            key={r.id}
            aria-hidden="true"
            className="pointer-events-none absolute z-30 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#c4b5fd] [animation:hero-ripple_0.9s_ease-out_forwards]"
            style={{ left: r.x, top: r.y }}
            onAnimationEnd={() => setRipples((list) => list.filter((x) => x.id !== r.id))}
          />
        ))}

        {/* The name, letter by letter, either side of the portrait */}
        <h1 className="m-0" aria-label="Saviyo George">
          <span aria-hidden="true" className="absolute left-[3vw] top-[24%] z-0 flex font-black uppercase leading-none text-[var(--text-main)]" style={nameStyle}>
            {FIRST.map((ch, i) => (
              <FlyLetter key={i} ch={ch} i={i} count={FIRST.length} dir={-1} p={p} rise={0.2} />
            ))}
          </span>
          <span aria-hidden="true" className="serif-accent absolute right-[3vw] top-[24%] z-0 flex font-black leading-none" style={nameStyle}>
            {LAST.map((ch, i) => (
              <FlyLetter key={i} ch={ch} i={LAST.length - 1 - i} count={LAST.length} dir={1} p={p} rise={0.35} />
            ))}
          </span>
        </h1>

        {/* The portrait, anchored to the bottom, growing as you scroll and leaning with the pointer */}
        <motion.div
          className="absolute bottom-0 left-1/2 z-10 w-[min(34vw,30rem)] -translate-x-1/2"
          style={{ scale: photoScale, transformOrigin: "50% 100%" }}
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.3, delay: 0.4, ease: EASE }}
        >
          <img
            src={heroPhoto}
            fetchPriority="high"
            decoding="async"
            alt="Saviyo George"
            width="768"
            height="1024"
            loading="eager"
            className="block h-auto w-full select-none"
            style={{ maskImage: sideFade, WebkitMaskImage: sideFade, transform: "translate(calc(var(--tx) * 12px), calc(var(--ty) * 6px))", transition: "transform 0.25s ease-out" }}
          />
        </motion.div>

        {/* Cards that slide in from the sides as the name leaves */}
        <motion.div className="absolute left-[4vw] top-[28%] z-20 w-[min(24rem,26vw)] overflow-hidden rounded-3xl border border-white/12 bg-[#14121d]/85 p-6 shadow-2xl" style={{ opacity: cardOpacity, x: leftCardX }}>
          <span aria-hidden="true" className="absolute inset-x-6 top-0 h-px overflow-hidden"><span className="block h-full w-1/3 [animation:hero-sweep_3.2s_ease-in-out_infinite]" style={{ background: "linear-gradient(to right, transparent, #c4b5fd, transparent)" }} /></span>
          <p className="m-0 font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--text-dim)]"><Scramble text="About me" run={shown} /></p>
          <Highlighted text={INTRO_TEXT} run={shown} className="m-0 mt-3 text-base leading-relaxed text-[var(--text-muted)]" />
          <TypedRole />
        </motion.div>

        <motion.div className="absolute right-[4vw] top-[28%] z-20 w-[min(16rem,20vw)] overflow-hidden rounded-3xl border border-white/12 bg-[#14121d]/85 p-6 shadow-2xl" style={{ opacity: cardOpacity, x: rightCardX }}>
          <span aria-hidden="true" className="absolute inset-x-6 top-0 h-px overflow-hidden"><span className="block h-full w-1/3 [animation:hero-sweep_3.2s_ease-in-out_infinite]" style={{ background: "linear-gradient(to right, transparent, #c4b5fd, transparent)" }} /></span>
          <p className="m-0 mb-4 text-right font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--text-dim)]"><Scramble text="In numbers" run={shown} /></p>
          <Stats align="right" delay={0.9} />
        </motion.div>

        {/* Always there: the two buttons and the place */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.1, ease: EASE }} className="absolute bottom-[7%] left-[4vw] z-20">
          <Buttons goTo={goTo} />
        </motion.div>
        <p className="absolute bottom-[7%] right-[5.5vw] z-20 m-0 flex items-center gap-1.5 text-sm text-[var(--text-muted)]">
          <FiMapPin aria-hidden="true" style={{ color: ACCENT }} /> Kerala · <span className="font-semibold tabular-nums text-[var(--text-main)]">{time}</span>
        </p>

        {/* A rail on the right edge that fills as you scroll through the hero */}
        <div aria-hidden="true" className="absolute right-4 top-1/2 z-20 flex -translate-y-1/2 flex-col items-center gap-3">
          <motion.span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--text-dim)] [writing-mode:vertical-rl]" style={{ opacity: hintOpacity }}>
            Scroll
          </motion.span>
          <span className="relative h-24 w-px bg-white/15">
            <motion.span className="absolute inset-x-0 top-0 h-full origin-top bg-[#c4b5fd]" style={{ scaleY: railFill }} />
          </span>
        </div>
      </motion.div>
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
