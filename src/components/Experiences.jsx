import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { experience } from "../data/experience";

const ACCENT = "#7DD3FC";

const jobs = experience.filter((item) => item.type === "work");

const E = [0.16, 1, 0.3, 1];

// Phones: only the basics (when, what and where), as a deck of cards. The stage stays pinned; scrolling slides the next
// role up over the last, and the ones underneath shrink and sink back. Scrolling up peels them off again.
const CARD_TONES = [
  { bg: "linear-gradient(150deg, #0B1220, #000000)", ink: "#FFFFFF", soft: "rgba(255,255,255,0.7)" },
  { bg: "linear-gradient(150deg, #BAE6FD, #7DD3FC)", ink: "#000000", soft: "rgba(0,0,0,0.65)" },
  { bg: "linear-gradient(150deg, #FFFFFF, #BAE6FD)", ink: "#000000", soft: "rgba(0,0,0,0.65)" },
  { bg: "linear-gradient(150deg, #7DD3FC, #38BDF8)", ink: "#000000", soft: "rgba(0,0,0,0.65)" },
];
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const arrival = (i, n) => {
  const span = 0.9 / Math.max(1, n - 1);
  const start = (i - 1) * span;
  return [start, start + span * 0.85];
};

function DeckCard({ job, index, count, progress }) {
  const tone = CARD_TONES[index % CARD_TONES.length];
  // Card 1 is already there; each later card slides up from below the stage
  const [s0, e0] = index > 0 ? arrival(index, count) : [0, 1];
  const y = useTransform(progress, [s0, e0], [index > 0 ? "115%" : "0%", "0%"], { clamp: true });
  // As later cards arrive on top, this one shrinks and dims
  const covered = useTransform(progress, (v) => {
    let sum = 0;
    for (let j = index + 1; j < count; j += 1) {
      const [s, e] = arrival(j, count);
      sum += clamp01((v - s) / (e - s));
    }
    return sum;
  });
  const scale = useTransform(covered, (c) => 1 - c * 0.05);
  const shade = useTransform(covered, (c) => Math.min(0.45, c * 0.2));

  return (
    <motion.article
      className="absolute inset-x-0 overflow-hidden rounded-[1.75rem] shadow-[0_-18px_40px_-20px_rgba(0,0,0,0.7)]"
      style={{ y, scale, background: tone.bg, color: tone.ink, top: `${index * 0.9}rem`, height: "var(--deck-card)", zIndex: index + 1, transformOrigin: "50% 0%" }}
    >
      <span aria-hidden="true" className="pointer-events-none absolute -bottom-10 -right-6 select-none text-[11rem] font-black leading-none opacity-[0.12]" style={{ fontFamily: "'Inter', sans-serif" }}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="relative flex h-full flex-col justify-between p-6">
        <p className="m-0 flex items-center justify-between font-mono text-xs" style={{ color: tone.soft }}>
          <span>{job.period}</span>
          {job.current && <span className="rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-wider" style={{ borderColor: tone.soft }}>Now</span>}
        </p>
        <div>
          <h3 className="m-0 text-[1.75rem] font-extrabold leading-[1.08]" style={{ fontFamily: "'Inter', sans-serif", textTransform: "none", letterSpacing: "-0.03em" }}>
            {job.role}
          </h3>
          <p className="m-0 mt-2 text-base font-semibold" style={{ color: tone.soft }}>
            {job.company}
          </p>
        </div>
      </div>
      <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black" style={{ opacity: shade }} />
    </motion.article>
  );
}

function PhoneDeck({ jobs: list }) {
  const ref = useRef(null);
  const n = list.length;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const dots = useTransform(smooth, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="relative mt-8" style={{ height: `${(n - 1) * 38 + 100}svh`, "--deck-card": "min(22rem, 58svh)" }}>
      <div className="sticky top-24" style={{ height: `calc(var(--deck-card) + ${(n - 1) * 0.9}rem)` }}>
        {list.map((job, i) => (
          <DeckCard key={`${job.company}-${job.period}`} job={job} index={i} count={n} progress={smooth} />
        ))}
        {/* How far through the roles you are */}
        <div aria-hidden="true" className="absolute inset-x-0 -bottom-8 mx-auto h-[3px] w-[55%] overflow-hidden rounded-full bg-white/15">
          <motion.span className="block h-full origin-left rounded-full" style={{ scaleX: dots, backgroundColor: ACCENT }} />
        </div>
      </div>
    </div>
  );
}

export default function Experiences() {
  const reduce = useReducedMotion();

  return (
    <section className="mx-auto w-full max-w-[1680px] px-5 py-12 md:px-8 md:py-32">
      <div className="md:hidden">
        <p className="m-0 text-xs font-semibold uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
          Experience
        </p>
        <h2 className="mb-0 mt-3 text-4xl font-black leading-[1.05] tracking-tight text-[var(--text-main)]" style={{ fontFamily: "'Inter', sans-serif", textTransform: "none" }}>
          Where I have <span className="serif-accent">worked</span>.
        </h2>

        <PhoneDeck jobs={jobs} />
      </div>

      <div className="hidden gap-12 md:grid lg:grid-cols-12 lg:gap-16">
        {/* Sticky intro */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="m-0 text-xs font-semibold uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
              Experience
            </p>
            <h2
              className="mb-0 mt-4 text-4xl font-black leading-[1.05] tracking-tight text-[var(--text-main)] md:text-5xl"
              style={{ fontFamily: "'Inter', sans-serif", textTransform: "none" }}
            >
              Where I
              <br />
              have <span className="serif-accent">worked</span>.
            </h2>
            <p className="mb-0 mt-6 max-w-[34ch] text-[var(--text-muted)]">
              {jobs.length} roles building enterprise software, from internships to a full-time role.
            </p>
          </div>
        </aside>

        {/* Roles */}
        <ol className="m-0 list-none p-0 lg:col-span-8">
          {jobs.map((job) => (
            <motion.li
              key={`${job.company}-${job.period}`}
              initial={reduce ? false : { opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-6 border-t border-[var(--border-subtle)] py-12 first:border-t-0 first:pt-0 md:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] md:gap-10"
            >
              <div className="text-sm text-[var(--text-dim)]">
                <p className="m-0 font-mono">{job.period}</p>
                <p className="m-0 mt-1">{job.location}</p>
                {job.current && (
                  <p className="m-0 mt-3 inline-flex items-center gap-2 font-semibold text-[var(--text-main)]">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ACCENT }} aria-hidden="true" />
                    Current role
                  </p>
                )}
              </div>

              <div>
                <h3
                  className="m-0 text-2xl font-bold leading-snug text-[var(--text-main)] md:text-3xl"
                  style={{ fontFamily: "'Inter', sans-serif", textTransform: "none" }}
                >
                  {job.role}
                </h3>
                <p className="m-0 mt-1 font-semibold" style={{ color: ACCENT }}>
                  {job.company}
                  {job.employmentType ? ` · ${job.employmentType}` : ""}
                </p>

                {job.description && (
                  <p className="mb-0 mt-5 max-w-[66ch] leading-relaxed text-[var(--text-muted)]">{job.description}</p>
                )}

                {job.highlights?.length > 0 && (
                  <ul className="m-0 mt-5 list-none space-y-2.5 p-0">
                    {job.highlights.map((item) => (
                      <li key={item} className="flex gap-3 text-[var(--text-main)]">
                        <span className="mt-2.5 h-px w-4 shrink-0 bg-[var(--text-dim)]" aria-hidden="true" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {job.skills?.length > 0 && (
                  <p className="mb-0 mt-6 font-mono text-xs leading-loose text-[var(--text-dim)]">
                    {job.skills.join("  /  ")}
                  </p>
                )}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
