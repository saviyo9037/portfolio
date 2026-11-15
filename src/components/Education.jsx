import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

const ACCENT = "#7DD3FC";
const EASE = [0.16, 1, 0.3, 1];

// The rows of the card on the right: label on the left, value on the right, a hairline between them
const FACTS = [
  { k: "Degree", v: "Bachelor of Computer Applications" },
  { k: "College", v: "Sree Sabareesa College" },
  { k: "University", v: "MG University, Kerala" },
];

// The degree on one compact plate: a big BCA on the left, and on the right the years with a line that draws between them as you
// scroll (and undraws when you scroll back), then the facts in tight rows that slide in one after another.
export default function Education() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "center 55%"] });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.5 });
  const line = useTransform(p, (v) => (reduce ? 1 : v));

  return (
    <section ref={ref} id="education" className="mx-auto w-full max-w-5xl px-5 py-12 md:px-8 md:py-20">
      <p className="m-0 text-sm font-semibold uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
        Education <span className="text-[var(--text-dim)]">·</span> <span className="text-[var(--text-muted)]">Academic Background</span>
      </p>

      <div className="mt-5 grid items-center gap-5 md:mt-7 md:grid-cols-[auto_minmax(0,1fr)] md:gap-12">
        {/* BCA, letter by letter */}
        <h2 className="m-0 flex font-black leading-[0.82] text-[var(--text-main)]" style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(5.5rem, 26vw, 12rem)", letterSpacing: "-0.07em" }} aria-label="BCA">
          {"BCA".split("").map((ch, i) => (
            <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.05em]">
              <motion.span
                className={`inline-block ${i === 2 ? "serif-accent" : ""}`}
                initial={reduce ? false : { y: "110%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: false, margin: "-10% 0px" }}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease: EASE }}
              >
                {ch}
              </motion.span>
            </span>
          ))}
        </h2>

        <div className="md:border-l md:border-white/15 md:pl-10">
          {/* 2021 ——— 2024 */}
          <div className="flex items-center gap-3" role="img" aria-label="2021 to 2024">
            <span aria-hidden="true" className="text-3xl font-bold tabular-nums md:text-5xl" style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "-0.04em", color: ACCENT }}>
              2021
            </span>
            <span aria-hidden="true" className="relative h-px flex-1 bg-white/20">
              <motion.span className="absolute inset-y-0 left-0 block h-px w-full origin-left" style={{ backgroundColor: ACCENT, scaleX: line }} />
            </span>
            <span aria-hidden="true" className="text-3xl font-bold tabular-nums text-[var(--text-main)] md:text-5xl" style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "-0.04em" }}>
              2024
            </span>
          </div>

          {/* The facts, in tight rows */}
          <dl className="m-0 mt-5">
            {FACTS.map((f, i) => (
              <motion.div
                key={f.k}
                className="group relative flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-white/10 py-3.5 transition-colors duration-300 md:hover:bg-white/[0.03]"
                initial={reduce ? false : { opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-5% 0px" }}
                transition={{ duration: 0.55, delay: 0.3 + i * 0.1, ease: EASE }}
              >
                {/* A light-blue bar that grows in on the left when you point at a row */}
                <span aria-hidden="true" className="absolute inset-y-2 left-0 w-0.5 origin-center scale-y-0 rounded-full transition-transform duration-300 group-hover:scale-y-100" style={{ backgroundColor: ACCENT }} />
                <dt className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--text-dim)] transition-colors duration-300 group-hover:text-[var(--text-muted)] md:pl-2">{f.k}</dt>
                <dd className="m-0 text-right text-lg font-semibold transition-transform duration-300 md:text-2xl md:group-hover:-translate-x-1" style={{ color: "var(--text-main)", fontFamily: "'Inter', sans-serif", letterSpacing: "-0.02em" }}>
                  {f.v}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
