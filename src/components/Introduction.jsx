import React from "react";
import { motion } from "framer-motion";
import saviyoCutout from "../assets/saviyo-cutout.png";
import { FiArrowRight, FiArrowUpRight, FiDownload, FiMapPin } from "react-icons/fi";
import { SiReact, SiNodedotjs, SiTypescript, SiMongodb, SiNextdotjs, SiTailwindcss } from "react-icons/si";
import { scrollToId } from "../lib/scroll";

const ACCENT = "#ff8a1f";

const STATS = [
  { value: "1+", label: "Years experience" },
  { value: "4+", label: "Projects shipped" },
  { value: "MERN", label: "Core stack" },
];

const STACK = [
  { Icon: SiReact, name: "React", color: "#61dafb" },
  { Icon: SiNodedotjs, name: "Node.js", color: "#84cc16" },
  { Icon: SiTypescript, name: "TypeScript", color: "#3b82f6" },
  { Icon: SiMongodb, name: "MongoDB", color: "#22c55e" },
  { Icon: SiNextdotjs, name: "Next.js", color: "#e5e7eb" },
  { Icon: SiTailwindcss, name: "Tailwind", color: "#06b6d4" },
];

export default function Introduction() {
  const goTo = (id) => (e) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <section className="relative mx-auto w-full max-w-[1680px] px-5 pb-20 pt-28 md:px-8 md:pb-28 md:pt-36">
      <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3.5 py-1.5 text-sm text-[var(--text-muted)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Available for work
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-[var(--text-dim)]">
              <FiMapPin aria-hidden="true" /> Kerala, India
            </span>
          </div>

          <p className="mb-0 mt-8 text-lg font-medium text-[var(--text-muted)]">Hello, I'm</p>
          <h1
            className="mb-0 mt-1 text-[clamp(3.5rem,9vw,8.5rem)] font-black leading-[0.9] tracking-tighter text-[var(--text-main)]"
            style={{ fontFamily: "'Inter', sans-serif", textTransform: "none" }}
          >
            Saviyo
            <br />
            George<span style={{ color: ACCENT }}>.</span>
          </h1>

          <p className="mb-0 mt-8 text-2xl font-bold tracking-tight text-[var(--text-main)] md:text-3xl">
            Full-stack developer &amp; <span style={{ color: ACCENT }}>software builder</span>
          </p>

          <p className="mb-0 mt-5 max-w-[52ch] text-lg leading-relaxed text-[var(--text-muted)]">
            I build production-ready web applications, ERP/POS systems, CRM &amp; LMS platforms, AI-powered
            tools and custom business software that solve real problems.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              onClick={goTo("projects")}
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-black transition-opacity hover:opacity-90"
              style={{ backgroundColor: ACCENT }}
            >
              View my work <FiArrowRight aria-hidden="true" />
            </a>
            <a
              href="/Saviyo_George_Resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] px-7 py-3.5 font-bold text-[var(--text-main)] transition-colors hover:border-[var(--text-main)]"
            >
              <FiDownload aria-hidden="true" /> Download resume
            </a>
          </div>

          <dl className="m-0 mt-12 grid max-w-xl grid-cols-3 divide-x divide-[var(--border-subtle)]">
            {STATS.map((s) => (
              <div key={s.label} className="px-5 first:pl-0">
                <dt className="order-2 text-xs uppercase tracking-[0.14em] text-[var(--text-dim)]">{s.label}</dt>
                <dd className="m-0 text-3xl font-black text-[var(--text-main)]">{s.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-[560px] lg:col-span-5"
        >
          <div
            aria-hidden="true"
            className="absolute inset-x-[8%] top-[10%] bottom-[8%] rounded-[2.5rem] blur-3xl"
            style={{ background: `radial-gradient(closest-side, ${ACCENT}66, transparent)` }}
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{ background: `linear-gradient(160deg, ${ACCENT} 0%, #c2410c 70%, #7c2d12 100%)` }}
            />
            <img
              src={saviyoCutout}
              alt="Portrait of Saviyo George"
              className="absolute bottom-0 left-1/2 h-[96%] -translate-x-1/2 select-none object-contain object-bottom"
            />
          </div>

          <div className="absolute -bottom-5 left-4 right-4 flex items-center gap-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-base)]/90 p-4 shadow-2xl backdrop-blur md:left-auto md:right-6 md:w-72">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-black"
              style={{ backgroundColor: ACCENT }}
              aria-hidden="true"
            >
              <FiArrowUpRight />
            </span>
            <div className="min-w-0">
              <p className="m-0 text-xs text-[var(--text-dim)]">Currently at</p>
              <p className="m-0 truncate font-bold text-[var(--text-main)]">D3innovatives</p>
              <p className="m-0 truncate text-xs text-[var(--text-muted)]">MERN stack developer</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tech stack */}
      <div className="mt-24 flex flex-col gap-6 border-t border-[var(--border-subtle)] pt-8 md:flex-row md:items-center md:justify-between">
        <p className="m-0 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-dim)]">
          Tech I work with
        </p>
        <ul className="m-0 flex list-none flex-wrap gap-x-7 gap-y-3 p-0">
          {STACK.map((t) => (
            <li key={t.name} className="flex items-center gap-2 text-sm font-medium text-[var(--text-muted)]">
              <t.Icon aria-hidden="true" className="text-lg" style={{ color: t.color }} />
              {t.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
