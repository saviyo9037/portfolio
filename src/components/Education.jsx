import React, { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { FiAward, FiMapPin } from "react-icons/fi";
import { experience } from "../data/experience";

const ACCENT = "#7DD3FC";
const EASE = [0.16, 1, 0.3, 1];
const RADIUS = 84;
const CIRC = 2 * Math.PI * RADIUS;
const MONTHS = 30; // September 2021 to March 2024
const SWEEP_MS = 5200;

const study = experience.find((e) => e.type === "education");
const STAGES = study?.milestones ?? [];

// A point on the dial, for a share of the way round (0 is the top)
const onRing = (t, r = RADIUS) => {
  const a = t * 2 * Math.PI - Math.PI / 2;
  return { x: 100 + r * Math.cos(a), y: 100 + r * Math.sin(a) };
};

// Bits of paper that burst out of the dial when the degree is complete
const CONFETTI = Array.from({ length: 30 }, (_, i) => {
  const a = (i / 30) * Math.PI * 2 + (i % 3) * 0.2;
  const d = 130 + ((i * 37) % 90);
  return { x: Math.cos(a) * d, y: Math.sin(a) * d - 30, r: (i * 53) % 360, c: ["#7DD3FC", "#BAE6FD", "#FFFFFF", "#BAE6FD"][i % 4], w: 6 + (i % 3) * 3 };
});

function Confetti({ fire }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2">
      {CONFETTI.map((c, i) => (
        <motion.span
          key={i}
          className="absolute block rounded-[2px]"
          style={{ width: c.w, height: c.w * 1.6, backgroundColor: c.c, left: 0, top: 0 }}
          initial={{ x: 0, y: 0, opacity: 0, rotate: 0, scale: 0 }}
          animate={fire ? { x: c.x, y: [0, c.y, c.y + 90], opacity: [0, 1, 1, 0], rotate: c.r + 360, scale: 1 } : { x: 0, y: 0, opacity: 0, rotate: 0, scale: 0 }}
          transition={{ duration: 1.6, delay: (i % 5) * 0.03, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

export default function Education() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const [p, setP] = useState(reduce ? 1 : 0);

  // The scroll position drives everything: scrolling down runs the dial forward, scrolling up runs it back
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 92%", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.5 });
  useMotionValueEvent(smooth, "change", (v) => {
    if (reduce) return;
    // Complete once the whole section is on screen, and rounded so the page only re-renders when something visibly changes
    const raw = Math.min(1, Math.max(0, v / 0.93));
    const next = raw > 0.985 ? 1 : Math.round(raw * 100) / 100;
    setP((prev) => (prev === next ? prev : next));
  });

  const month = Math.round(p * MONTHS);
  const stageCount = Math.max(STAGES.length, 1);
  const active = Math.min(stageCount - 1, Math.floor(p * stageCount));
  const year = 2021 + Math.floor((8 + month) / 12); // month 0 is September 2021
  const done = p >= 1;

  return (
    <section ref={ref} id="education" className="mx-auto w-full max-w-[1680px] px-5 py-10 md:px-8 md:py-24">
      <div className="mb-7 md:mb-10">
        <p className="m-0 text-xs font-semibold uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
          Education
        </p>
        <h2 className="mb-0 mt-3 text-3xl text-[var(--text-main)] md:text-5xl" style={{ fontFamily: "'Inter', sans-serif" }}>
          Academic <span className="serif-accent">Background</span>
        </h2>
      </div>

      <>
      {/* Phones: minimal. One big year, a hairline that fills as you scroll, and three plain rows that light up in turn. */}
      <div className="md:hidden">
        <p className="m-0 font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--text-dim)]">{done ? "Graduated" : `Year ${Math.min(3, Math.floor(p * 3) + 1)} of 3`}</p>

        {/* The year, one digit at a time out of a mask, with a hairline under it */}
        <div className="relative mt-2 h-[6.2rem] overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.p
              key={year}
              className="m-0 tabular-nums text-[var(--text-main)]"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "6.2rem", letterSpacing: "-0.06em", lineHeight: 1 }}
              initial={reduce ? false : { y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {year}
            </motion.p>
          </AnimatePresence>
        </div>
        <div aria-hidden="true" className="relative mt-3 h-px w-full bg-white/15">
          <span className="absolute inset-y-0 left-0 block h-px origin-left" style={{ width: `${p * 100}%`, backgroundColor: ACCENT, transition: "width 0.12s linear" }} />
          <span className="absolute top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ left: `${p * 100}%`, backgroundColor: ACCENT }} />
        </div>
        <div className="mt-2 flex justify-between font-mono text-[10px] text-[var(--text-dim)]">
          <span>Sep 2021</span>
          <span>Mar 2024</span>
        </div>

        <p className="m-0 mt-8 text-xl text-[var(--text-main)]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, letterSpacing: "-0.02em" }}>
          Bachelor of Computer Applications
        </p>
        <p className="m-0 mt-1 text-sm text-[var(--text-muted)]">Sree Sabareesa College · MG University, Kerala</p>

        {/* Three plain rows */}
        <ol className="m-0 mt-8 list-none p-0">
          {STAGES.map((s, i) => {
            const lit = reduce || (i / stageCount <= p && p > 0);
            return (
              <motion.li
                key={s.label}
                className="border-t border-white/12 py-5"
                initial={reduce ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-8% 0px" }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <div className="flex gap-5">
                  <span className="w-7 shrink-0 pt-0.5 font-mono text-sm transition-colors duration-500" style={{ color: lit ? ACCENT : "var(--text-dim)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1" style={{ opacity: lit ? 1 : 0.4, transition: "opacity 0.5s" }}>
                    <p className="m-0 text-lg font-semibold text-[var(--text-main)]">{s.label}</p>
                    <p className="m-0 mt-1 text-sm leading-relaxed text-[var(--text-muted)]">{s.desc}</p>
                  </div>
                </div>
                {/* A short line that draws under the row once it is lit */}
                <span aria-hidden="true" className="mt-4 ml-12 block h-px origin-left transition-transform duration-700" style={{ width: "3rem", backgroundColor: ACCENT, transform: lit ? "scaleX(1)" : "scaleX(0)" }} />
              </motion.li>
            );
          })}
        </ol>

        <motion.p
          className="m-0 flex items-center gap-2 border-t border-white/12 pt-5 text-sm text-[var(--text-main)]"
          initial={false}
          animate={{ opacity: done || reduce ? 1 : 0.35 }}
          transition={{ duration: 0.5 }}
        >
          <span aria-hidden="true" className="h-2 w-2 rounded-full transition-colors duration-500" style={{ backgroundColor: done || reduce ? ACCENT : "rgba(255,255,255,0.3)" }} />
          First Class Distinction · 2021 — 2024
        </motion.p>

        {study?.coursework && <p className="m-0 mt-4 font-mono text-[11px] leading-loose text-[var(--text-dim)]">{study.coursework.join("  /  ")}</p>}
      </div>

      <div className="hidden items-center gap-12 md:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        {/* The dial */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, margin: "-10% 0px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative mx-auto aspect-square w-full max-w-[26rem]"
          role="img"
          aria-label="Dial showing three years of study, 2021 to 2024"
        >
          <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible" aria-hidden="true">
            {/* Ticks around the edge, one for each month */}
            {Array.from({ length: MONTHS }, (_, m) => {
              const a = onRing(m / MONTHS, RADIUS + 14);
              const b = onRing(m / MONTHS, RADIUS + (m % 12 === 4 || m % 12 === 4 ? 22 : 18));
              const lit = m / MONTHS <= p;
              return <line key={m} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={lit ? ACCENT : "rgba(255,255,255,0.22)"} strokeWidth="1" style={{ transition: "stroke 0.2s" }} />;
            })}

            {/* A slow dashed ring turning inside the dial once it is running */}
            <circle cx="100" cy="100" r="62" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="2 7" className={p > 0 && !reduce ? "edu-spin" : ""} />

            {/* The track and the glowing progress ring */}
            <circle cx="100" cy="100" r={RADIUS} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
            <circle
              cx="100"
              cy="100"
              r={RADIUS}
              fill="none"
              stroke="rgba(125, 211, 252,0.28)"
              strokeWidth="16"
              strokeLinecap="round"
              strokeDasharray={CIRC}
              strokeDashoffset={CIRC * (1 - p)}
              transform="rotate(-90 100 100)"
              style={{ transition: "stroke-dashoffset 0.08s linear" }}
            />
            <circle
              cx="100"
              cy="100"
              r={RADIUS}
              fill="none"
              stroke={ACCENT}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={CIRC}
              strokeDashoffset={CIRC * (1 - p)}
              transform="rotate(-90 100 100)"
              style={{ transition: "stroke-dashoffset 0.08s linear" }}
            />

            {/* A stop for each stage, lit once the ring has passed it */}
            {STAGES.map((s, i) => {
              const t = i / stageCount;
              const pt = onRing(t);
              const lit = p >= t && (p > 0 || reduce);
              return (
                <g key={s.label}>
                  <circle cx={pt.x} cy={pt.y} r="7" fill="#0B0B0B" stroke={lit ? ACCENT : "rgba(255,255,255,0.3)"} strokeWidth="2" style={{ transition: "stroke 0.2s" }} />
                  <text x={pt.x} y={pt.y + 2.6} textAnchor="middle" fontSize="7" fontWeight="700" fill={lit ? ACCENT : "rgba(255,255,255,0.5)"} style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {i + 1}
                  </text>
                </g>
              );
            })}

            {/* The head of the ring */}
            {p > 0 && p < 1 && <circle cx={onRing(p).x} cy={onRing(p).y} r="5" fill="#fff" style={{ filter: "drop-shadow(0 0 6px rgba(125, 211, 252,1))" }} />}
          </svg>

          {/* In the middle: the year and the stage */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <p className="m-0 font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--text-dim)]">{done ? "Graduated" : `Year ${Math.min(3, Math.floor(p * 3) + 1)} of 3`}</p>
            <div className="relative mt-1 h-[4.2rem] overflow-hidden sm:h-[5.2rem]">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.p
                  key={year}
                  className="m-0 text-6xl tabular-nums text-[var(--text-main)] sm:text-7xl"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, letterSpacing: "-0.05em", lineHeight: 1.1 }}
                  initial={reduce ? false : { y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  {year}
                </motion.p>
              </AnimatePresence>
            </div>
            <p className="m-0 mt-1 font-mono text-xs text-[var(--text-muted)]">
              Month {String(month).padStart(2, "0")} / {MONTHS}
            </p>
          </div>
          {!reduce && <Confetti fire={done} />}
          {done && !reduce && <span aria-hidden="true" className="edu-pulse pointer-events-none absolute inset-[6%] rounded-full border-2" style={{ borderColor: ACCENT }} />}
        </motion.div>

        {/* The facts and the three stages, lit as the ring reaches them */}
        <div>
          <p className="m-0 text-2xl text-[var(--text-main)] md:text-3xl" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
            Bachelor of Computer Applications (BCA)
          </p>
          <ul className="m-0 mt-3 flex list-none flex-wrap gap-x-6 gap-y-2 p-0 text-sm text-[var(--text-muted)]">
            <li className="flex items-center gap-2">
              <FiAward aria-hidden="true" style={{ color: ACCENT }} /> Sree Sabareesa College
            </li>
            <li className="flex items-center gap-2">
              <FiMapPin aria-hidden="true" style={{ color: ACCENT }} /> MG University, Kerala
            </li>
          </ul>

          <ol className="m-0 mt-8 list-none space-y-3 p-0">
            {STAGES.map((s, i) => {
              const lit = reduce || (i <= active && p > 0);
              const current = !reduce && !done && i === active && p > 0;
              return (
                <li
                  key={s.label}
                  className="glass relative overflow-hidden rounded-2xl border p-4 transition-[opacity,border-color,background-color,transform] duration-500 sm:p-5"
                  style={{ opacity: lit ? 1 : 0.35, borderColor: current ? ACCENT : "var(--border-subtle)", backgroundColor: current ? "rgba(125, 211, 252,0.12)" : undefined, transform: current ? "translateX(10px)" : "none" }}
                >
                  <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 transition-opacity duration-500" style={{ backgroundColor: ACCENT, opacity: lit ? 1 : 0 }} />
                  <p className="m-0 font-mono text-xs" style={{ color: lit ? ACCENT : "var(--text-dim)" }}>
                    {String(i + 1).padStart(2, "0")} · Year {i + 1}
                  </p>
                  <p className="m-0 mt-1 text-lg font-semibold text-[var(--text-main)]">{s.label}</p>
                  <p className="m-0 mt-1 text-sm leading-relaxed text-[var(--text-muted)]">{s.desc}</p>
                </li>
              );
            })}
          </ol>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <motion.span
              initial={reduce ? false : { opacity: 0, scale: 0.7 }}
              animate={done || reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
              transition={{ type: "spring", stiffness: 300, damping: 14 }}
              className="rounded-full px-5 py-2 text-sm font-semibold text-black"
              style={{ backgroundColor: ACCENT, boxShadow: "0 0 30px rgba(125, 211, 252,0.45)" }}
            >
              First Class Distinction · 2021 — 2024
            </motion.span>
          </div>

          {study?.coursework && (
            <ul className="m-0 mt-5 flex list-none flex-wrap gap-2 p-0">
              {study.coursework.map((c, i) => (
                <motion.li
                  key={c}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="chip-lilac rounded-full px-3.5 py-1.5 text-xs font-medium"
                >
                  {c}
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </div>
      </>
    </section>
  );
}
