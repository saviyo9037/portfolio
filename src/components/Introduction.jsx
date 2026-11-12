import React from "react";
import { motion } from "framer-motion";
import saviyoCutout from "../assets/saviyo-cutout.png";
import {
  FiPlay,
  FiDownload,
  FiArrowRight,
  FiCalendar,
  FiLayers,
  FiUsers,
  FiStar,
  FiCode,
  FiBox,
  FiMonitor,
} from "react-icons/fi";
import {
  SiReact,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiTypescript,
  SiTailwindcss,
  SiGithub,
  SiDocker,
  SiAmazonwebservices,
} from "react-icons/si";
import { scrollToId } from "../lib/scroll";

const ACCENT = "#ff8a1f";

const STATS = [
  { Icon: FiCalendar, value: "1+", label: "Years Experience" },
  { Icon: FiLayers, value: "4+", label: "Projects" },
  { Icon: FiCode, value: "MERN", label: "Tech Stack" },
  { Icon: FiStar, value: "Open to", label: "New Opportunities" },
];

const BUILDS = [
  { Icon: FiMonitor, title: "Web Applications", desc: "Scalable & production ready apps", active: true },
  { Icon: FiLayers, title: "ERP / POS Systems", desc: "Business operation & sales solutions" },
  { Icon: FiUsers, title: "CRM & LMS", desc: "Manage customers, leads & learning" },
  { Icon: FiStar, title: "AI Tools", desc: "Practical AI powered solutions" },
];

const STACK = [
  { Icon: SiReact, name: "React", color: "#61dafb" },
  { Icon: SiJavascript, name: "JavaScript", color: "#f7df1e" },
  { Icon: SiNodedotjs, name: "Node.js", color: "#84cc16" },
  { Icon: SiExpress, name: "Express", color: "var(--text-main)" },
  { Icon: SiMongodb, name: "MongoDB", color: "#22c55e" },
  { Icon: SiTypescript, name: "TypeScript", color: "#3b82f6" },
  { Icon: SiTailwindcss, name: "Tailwind CSS", color: "#06b6d4" },
  { Icon: SiGithub, name: "GitHub", color: "var(--text-main)" },
  { Icon: SiDocker, name: "Docker", color: "#2496ed" },
  { Icon: SiAmazonwebservices, name: "AWS", color: "#ff9900" },
];

export default function Introduction() {
  const goTo = (id) => (e) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <section className="mx-auto w-full max-w-[1400px] px-4 pb-16 pt-28 md:px-8">

      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-6">
        {/* Left: copy */}
        <div>
          <span
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium text-[var(--text-main)]"
            style={{ borderColor: ACCENT, backgroundColor: "rgba(255,138,31,0.08)" }}
          >
            Hello, I'm
            <span aria-hidden="true">👋</span>
          </span>

          <h1 className="mb-0 mt-6 text-[clamp(3rem,8vw,5.75rem)] font-extrabold normal-case leading-[1.02] tracking-tight text-[var(--text-main)]" style={{ fontFamily: "'Inter', sans-serif", textTransform: "none" }}>
            Saviyo George
          </h1>

          <p className="mb-0 mt-4 text-[clamp(1.1rem,2.6vw,1.75rem)] font-semibold text-[var(--text-main)]">
            Full-Stack Developer &amp;{" "}
            <span style={{ color: ACCENT }}>Software Builder</span>
            <span aria-hidden="true" className="ml-1 font-light" style={{ color: ACCENT }}>
              |
            </span>
          </p>

          <p className="mb-0 mt-6 max-w-[48ch] text-lg leading-relaxed text-[var(--text-muted)]">
            I build production-ready web applications, ERP/POS systems, CRM &amp; LMS platforms,
            AI-powered tools and custom business software that{" "}
            <span className="relative whitespace-nowrap font-semibold" style={{ color: ACCENT }}>
              solve real problems.
            </span>
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              onClick={goTo("projects")}
              className="inline-flex items-center gap-2 rounded-lg px-6 py-3.5 font-semibold text-black transition-opacity hover:opacity-90"
              style={{ backgroundColor: ACCENT }}
            >
              <FiPlay aria-hidden="true" /> View My Work <FiArrowRight aria-hidden="true" />
            </a>
            <a
              href="/Saviyo_George_Resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-6 py-3.5 font-semibold text-[var(--text-main)] transition-colors hover:border-[var(--text-main)]"
            >
              <FiDownload aria-hidden="true" /> Download Resume
            </a>
          </div>

          <ul className="m-0 mt-8 grid list-none grid-cols-2 overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-0 sm:grid-cols-4">
            {STATS.map((stat, i) => (
              <li
                key={stat.label}
                className={`flex items-center gap-3 px-4 py-4 ${i > 0 ? "sm:border-l border-[var(--border-subtle)]" : ""} ${i % 2 === 1 ? "border-l border-[var(--border-subtle)] sm:border-l" : ""} ${i > 1 ? "border-t border-[var(--border-subtle)] sm:border-t-0" : ""}`}
              >
                <stat.Icon aria-hidden="true" className="shrink-0 text-xl" style={{ color: ACCENT }} />
                <div>
                  <p className="m-0 text-base font-bold text-[var(--text-main)]">{stat.value}</p>
                  <p className="m-0 text-xs text-[var(--text-muted)]">{stat.label}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: portrait on a tilted plate */}
        <div className="relative mx-auto aspect-[4/4.2] w-full max-w-[560px] overflow-hidden">
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, rotate: -10, scale: 0.94 }}
            animate={{ opacity: 1, rotate: -10, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-[12%] top-[14%] h-[72%] w-[66%] rounded-[2rem]"
            style={{ background: `linear-gradient(160deg, ${ACCENT} 0%, #c2410c 100%)` }}
          />

          <motion.img
            src={saviyoCutout}
            alt="Portrait of Saviyo George"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-0 left-1/2 h-[96%] -translate-x-1/2 object-contain object-bottom select-none"
          />

          {/* Orbit ring behind the portrait */}
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="pointer-events-none absolute -left-[4%] top-[18%] h-[48%] w-[108%] rotate-[-14deg] rounded-[50%] border"
            style={{ borderColor: "rgba(255,138,31,0.55)" }}
          />

          <div
            aria-hidden="true"
            className="absolute right-[6%] top-[6%] flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]"
            style={{ color: ACCENT }}
          >
            <FiCode className="text-xl" />
          </div>

          <div className="absolute bottom-[8%] right-[2%] flex items-center gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/95 px-4 py-3 shadow-2xl backdrop-blur">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            <FiBox aria-hidden="true" className="text-2xl" style={{ color: ACCENT }} />
            <div>
              <p className="m-0 text-xs text-[var(--text-muted)]">Currently working at</p>
              <p className="m-0 font-semibold text-[var(--text-main)]">D3innovatives</p>
              <p className="m-0 text-xs text-[var(--text-muted)]">MERN Stack Developer</p>
            </div>
          </div>
        </div>
      </div>

      {/* What I build */}
      <div className="mt-14">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="m-0 flex items-center gap-3 text-2xl font-bold normal-case text-[var(--text-main)]" style={{ fontFamily: "'Inter', sans-serif", textTransform: "none", letterSpacing: "normal" }}>
            <span aria-hidden="true" className="h-6 w-1 rounded-full" style={{ backgroundColor: ACCENT }} />
            What I Build
          </h2>
          <a
            href="#projects"
            onClick={goTo("projects")}
            className="inline-flex items-center gap-2 text-sm text-[var(--text-main)] hover:text-[var(--accent)]"
          >
            Explore All Projects <FiArrowRight aria-hidden="true" />
          </a>
        </div>

        <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {BUILDS.map((item) => (
            <li
              key={item.title}
              className="flex items-center gap-4 rounded-xl border p-5"
              style={{
                borderColor: item.active ? ACCENT : "var(--border-subtle)",
                backgroundColor: "var(--bg-surface)",
              }}
            >
              <item.Icon aria-hidden="true" className="shrink-0 text-2xl" style={{ color: ACCENT }} />
              <div>
                <p className="m-0 font-semibold text-[var(--text-main)]">{item.title}</p>
                <p className="m-0 mt-1 text-sm text-[var(--text-muted)]">{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Tech stack row */}
      <div className="mt-12 flex flex-col gap-5 lg:flex-row lg:items-center">
        <p className="m-0 shrink-0 text-lg font-semibold text-[var(--text-main)]">Tech Stack I Work With</p>
        <ul className="m-0 flex list-none flex-wrap gap-3 p-0">
          {STACK.map((tech) => (
            <li
              key={tech.name}
              title={tech.name}
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-2xl"
              style={{ color: tech.color }}
            >
              <tech.Icon aria-label={tech.name} role="img" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
