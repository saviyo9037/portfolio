import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiAward, FiDatabase, FiCpu, FiDownload, FiMapPin, FiLayers, FiArrowDown } from "react-icons/fi";
import { SiReact, SiJavascript, SiNodedotjs, SiMongodb, SiTypescript, SiTailwindcss, SiGithub, SiAmazonwebservices } from "react-icons/si";
import { scrollToId } from "../lib/scroll";
import aboutLaptop from "../assets/about-laptop.webp";

const ACCENT = "#ff8a1f";

const FACTS = [
  { Icon: FiLayers, value: "10+", label: "ERP modules", desc: "Billing, inventory, POS, customers and RBAC in live use." },
  { Icon: FiDatabase, value: "<1s", label: "Sub-second state", desc: "TanStack Query optimistic UI with multi-tier state sync." },
  { Icon: FiCpu, value: "ESC/POS", label: "Hardware bridges", desc: "WebSocket thermal receipts and barcode scanner automation." },
  { Icon: FiAward, value: "BCA", label: "With distinction", desc: "Honours graduate in Computer Applications, MG University." },
];

const STACK = [
  { Icon: SiReact, name: "React", color: "#61dafb" },
  { Icon: SiJavascript, name: "JavaScript", color: "#f7df1e" },
  { Icon: SiNodedotjs, name: "Node.js", color: "#84cc16" },
  { Icon: SiMongodb, name: "MongoDB", color: "#22c55e" },
  { Icon: SiTypescript, name: "TypeScript", color: "#3b82f6" },
  { Icon: SiTailwindcss, name: "Tailwind", color: "#06b6d4" },
  { Icon: SiGithub, name: "GitHub", color: "#ffffff" },
  { Icon: SiAmazonwebservices, name: "AWS", color: "#ff9900" },
];

export default function About() {
  return (
    <section id="about-details" className="relative mx-auto w-full max-w-[1680px] px-5 py-20 md:px-8 md:py-32">
      {/* Intro: label, heading, meta */}
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7"
        >
          <p className="m-0 text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>
            About
          </p>
          <h2
            className="mb-0 mt-4 text-[clamp(2.75rem,7vw,6rem)] font-black leading-[0.95] tracking-tighter text-[var(--text-main)]"
            style={{ fontFamily: "'Inter', sans-serif", textTransform: "none" }}
          >
            Engineering software
            <br />
            that <span style={{ color: ACCENT }}>holds up</span>.
          </h2>

          <p className="mb-0 mt-8 max-w-[56ch] text-lg leading-relaxed text-[var(--text-muted)]">
            I architect production-grade platforms where complex enterprise ERP rules, sub-second POS state and
            physical IoT daemons come together into software that businesses rely on every day.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[var(--text-muted)]">
            <span className="inline-flex items-center gap-2">
              <FiAward aria-hidden="true" style={{ color: ACCENT }} /> BCA with distinction, MG University
            </span>
            <span className="inline-flex items-center gap-2">
              <FiMapPin aria-hidden="true" style={{ color: ACCENT }} /> Kerala, India (UTC+5:30)
            </span>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => scrollToId("contact")}
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-black transition-opacity hover:opacity-90"
              style={{ backgroundColor: ACCENT }}
            >
              Let's collaborate <FiArrowRight aria-hidden="true" />
            </button>
            <a
              href="/Saviyo_George_Resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] px-7 py-3.5 font-bold text-[var(--text-main)] transition-colors hover:border-[var(--text-main)]"
            >
              <FiDownload aria-hidden="true" /> Download CV
            </a>
          </div>
        </motion.div>

        {/* Laptop */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 lg:self-center"
        >
          <img
            src={aboutLaptop}
            alt="Laptop showing a code editor with portfolio.jsx open"
            loading="lazy"
            className="mx-auto w-full max-w-[560px] select-none object-contain"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent), linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent)",
              maskComposite: "intersect",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent), linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent)",
              WebkitMaskComposite: "source-in",
            }}
          />
        </motion.div>
      </div>

      {/* Bento facts */}
      <ul className="m-0 mt-20 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
        {FACTS.map((f, i) => (
          <motion.li
            key={f.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="flex flex-col gap-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6"
          >
            <f.Icon aria-hidden="true" className="text-2xl" style={{ color: ACCENT }} />
            <div>
              <p className="m-0 text-4xl font-black tracking-tight text-[var(--text-main)]">{f.value}</p>
              <p className="m-0 mt-1 font-semibold text-[var(--text-main)]">{f.label}</p>
            </div>
            <p className="m-0 text-sm leading-relaxed text-[var(--text-muted)]">{f.desc}</p>
          </motion.li>
        ))}
      </ul>

      {/* Stack */}
      <div className="mt-6 flex flex-col gap-6 rounded-2xl border border-[var(--border-subtle)] p-6 md:flex-row md:items-center md:justify-between">
        <p className="m-0 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-dim)]">Tech stack</p>
        <ul className="m-0 flex list-none flex-wrap gap-x-7 gap-y-3 p-0">
          {STACK.map((t) => (
            <li key={t.name} className="flex items-center gap-2 text-sm font-medium text-[var(--text-muted)]">
              <t.Icon aria-hidden="true" className="text-lg" style={{ color: t.color }} />
              {t.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-[var(--border-subtle)] pt-6 text-sm text-[var(--text-dim)]">
        <span className="inline-flex items-center gap-2">
          <FiArrowDown aria-hidden="true" /> Scroll down
        </span>
        <span>
          Code <span style={{ color: ACCENT }}>·</span> Build <span style={{ color: ACCENT }}>·</span> Innovate
        </span>
      </div>
    </section>
  );
}
