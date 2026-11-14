import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { FiAward, FiMapPin } from "react-icons/fi";
import { experience } from "../data/experience";

const ACCENT = "#ff4d00";
const EASE = [0.16, 1, 0.3, 1];
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+<>";

const study = experience.find((e) => e.type === "education");

// Text that decodes: every letter flickers through random characters, then settles on the real one
function Decode({ text, run, reduce, className = "", style }) {
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (!run || reduce) return undefined;
    let frame = 0;
    const total = 34;
    const id = window.setInterval(() => {
      frame += 1;
      const settled = Math.floor((frame / total) * text.length * 1.4);
      setOut(
        text
          .split("")
          .map((ch, i) => (ch === " " || i < settled ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join("")
      );
      if (frame >= total) {
        window.clearInterval(id);
        setOut(text);
      }
    }, 38);
    return () => window.clearInterval(id);
  }, [run, reduce, text]);

  return (
    <span className={className} style={style} aria-label={text}>
      <span aria-hidden="true">{run && !reduce ? out : text}</span>
    </span>
  );
}

// One digit of the year counter: a column of 0-9 that rolls to its number like an odometer
function Digit({ target, run, delay, reduce }) {
  const n = Number(target);
  return (
    <span className="relative inline-block h-[1em] w-[0.62em] overflow-hidden align-bottom">
      <motion.span
        className="absolute left-0 top-0 flex flex-col"
        initial={reduce ? { y: `${-n}em` } : { y: "0em" }}
        animate={run || reduce ? { y: `${-n}em` } : { y: "0em" }}
        transition={{ duration: 1.6, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {Array.from({ length: 10 }, (_, d) => (
          <span key={d} className="block h-[1em] leading-none">
            {d}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

// A graduation cap drawn line by line, which then tosses up, spins and lands again
function Cap({ run, reduce }) {
  const draw = (delay) => ({
    initial: reduce ? false : { pathLength: 0, opacity: 0 },
    animate: run || reduce ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 },
    transition: { duration: 1.2, delay, ease: "easeInOut" },
  });
  return (
    <motion.svg
      viewBox="0 0 200 160"
      aria-hidden="true"
      className="h-auto w-full max-w-[22rem]"
      animate={run && !reduce ? { y: [0, -34, 0], rotate: [0, -10, 0] } : undefined}
      transition={run && !reduce ? { duration: 2.4, delay: 3.2, repeat: Infinity, repeatDelay: 2.4, ease: "easeInOut" } : undefined}
    >
      <g fill="none" stroke={ACCENT} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <motion.path d="M100 28 L188 68 L100 108 L12 68 Z" {...draw(0.1)} />
        <motion.path d="M50 90 V122 C50 134 150 134 150 122 V90" {...draw(0.8)} />
        <motion.path d="M188 68 V118" {...draw(1.3)} />
      </g>
      <motion.circle cx="188" cy="124" r="6" fill={ACCENT} initial={reduce ? false : { scale: 0 }} animate={run || reduce ? { scale: 1 } : { scale: 0 }} transition={{ type: "spring", stiffness: 400, damping: 12, delay: 2.2 }} />
    </motion.svg>
  );
}

export default function Education() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const run = useInView(ref, { once: true, margin: "-20% 0px" });

  return (
    <section ref={ref} id="education" className="mx-auto w-full max-w-[1680px] px-5 py-14 md:px-8 md:py-24">
      <div className="mb-10">
        <p className="m-0 text-xs font-semibold uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
          Education
        </p>
        <h2 className="mb-0 mt-3 text-3xl font-extrabold tracking-tight text-[var(--text-main)] md:text-4xl" style={{ fontFamily: "'Inter', sans-serif", textTransform: "none" }}>
          Academic <span className="serif-accent">Background</span>
        </h2>
      </div>

      <div className="grid items-center gap-10 overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 md:p-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div>
          <motion.span
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={run || reduce ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-black"
            style={{ backgroundColor: ACCENT }}
          >
            Undergraduate Degree
          </motion.span>

          <h3 className="m-0 mt-5 text-2xl font-extrabold leading-snug text-[var(--text-main)] md:text-4xl" style={{ fontFamily: "'Inter', sans-serif", textTransform: "none" }}>
            <Decode text="Bachelor of Computer Applications (BCA)" run={run} reduce={reduce} />
          </h3>

          <ul className="m-0 mt-4 flex list-none flex-col gap-2 p-0 text-sm text-[var(--text-muted)]">
            <li className="flex items-center gap-2">
              <FiAward aria-hidden="true" style={{ color: ACCENT }} /> Sree Sabareesa College
            </li>
            <li className="flex items-center gap-2">
              <FiMapPin aria-hidden="true" style={{ color: ACCENT }} /> MG University, Kerala
            </li>
          </ul>

          {/* Years roll like an odometer: 2021 to 2024 */}
          <div className="mt-8 flex items-center gap-4 font-mono text-3xl font-bold text-[var(--text-main)] sm:text-5xl" aria-label="2021 to 2024">
            <span aria-hidden="true" className="inline-flex">
              {"2021".split("").map((d, i) => (
                <Digit key={`a${i}`} target={d} run={run} delay={0.2 + i * 0.15} reduce={reduce} />
              ))}
            </span>
            <span aria-hidden="true" className="text-[var(--text-dim)]">—</span>
            <span aria-hidden="true" className="inline-flex" style={{ color: ACCENT }}>
              {"2024".split("").map((d, i) => (
                <Digit key={`b${i}`} target={d} run={run} delay={0.6 + i * 0.15} reduce={reduce} />
              ))}
            </span>
          </div>

          {/* The distinction, with a light sweeping across it */}
          <div className="relative mt-6 inline-block overflow-hidden rounded-xl border border-[var(--border-subtle)] px-5 py-3">
            <p className="m-0 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--text-dim)]">Graduated with</p>
            <p className="m-0 mt-1 text-xl font-black text-[var(--text-main)]" style={{ fontFamily: "'Inter', sans-serif" }}>
              First Class Distinction
            </p>
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
              initial={{ x: "-120%" }}
              animate={run && !reduce ? { x: ["-120%", "420%"] } : undefined}
              transition={{ duration: 1.4, delay: 2.3, repeat: Infinity, repeatDelay: 3.5, ease: "easeInOut" }}
            />
          </div>

          {study?.coursework && (
            <ul className="m-0 mt-6 flex list-none flex-wrap gap-2 p-0">
              {study.coursework.map((c, i) => (
                <motion.li
                  key={c}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={run || reduce ? { opacity: 1, y: 0 } : undefined}
                  transition={{ duration: 0.4, delay: 1.2 + i * 0.06 }}
                  className="rounded-full border border-[var(--border-subtle)] px-3 py-1.5 text-xs text-[var(--text-muted)]"
                >
                  {c}
                </motion.li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex justify-center lg:justify-end">
          <Cap run={run} reduce={reduce} />
        </div>
      </div>
    </section>
  );
}
