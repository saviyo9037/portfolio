import React from "react";
import { motion } from "framer-motion";
import saviyoCutout from "../assets/saviyo-cutout.png";
import {
  FiPlay,
  FiDownload,
  FiArrowRight,
  FiCalendar,
  FiLayers,
  FiCode,
  FiStar,
  FiMonitor,
  FiUsers,
  FiBox,
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
  { Icon: SiExpress, name: "Express", color: "#e5e7eb" },
  { Icon: SiMongodb, name: "MongoDB", color: "#22c55e" },
  { Icon: SiTypescript, name: "TypeScript", color: "#3b82f6" },
  { Icon: SiTailwindcss, name: "Tailwind", color: "#06b6d4" },
  { Icon: SiGithub, name: "GitHub", color: "#ffffff" },
  { Icon: SiDocker, name: "Docker", color: "#2496ed" },
  { Icon: SiAmazonwebservices, name: "AWS", color: "#ff9900" },
];

const PANEL = "border border-[var(--border-subtle)] bg-[var(--bg-surface)]";

export default function Introduction() {
  const goTo = (id) => (e) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <section className="mx-auto w-full max-w-[1680px] px-5 pb-16 pt-28 md:px-8">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-6">
        {/* Left: copy */}
        <div>
          <span
            className="inline-flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-semibold text-[var(--text-main)]"
            style={{ borderColor: ACCENT, backgroundColor: "rgba(255,138,31,0.10)" }}
          >
            Hello, I'm <span aria-hidden="true">👋</span>
          </span>

          <h1
            className="mb-0 mt-6 text-[clamp(2.75rem,5.4vw,4.1rem)] font-extrabold leading-[1.05] tracking-tight text-[var(--text-main)]"
            style={{ fontFamily: "'Inter', sans-serif", textTransform: "none" }}
          >
            Saviyo George
          </h1>

          <p
            className="mb-0 mt-4 text-[clamp(1.1rem,1.95vw,1.7rem)] font-bold whitespace-nowrap text-[var(--text-main)]"
            style={{ fontFamily: "'Inter', sans-serif", textTransform: "none" }}
          >
            Full-Stack Developer &amp; <span style={{ color: ACCENT }}>Software Builder</span>
            <span aria-hidden="true" className="ml-1 font-light" style={{ color: ACCENT }}>|</span>
          </p>

          <p className="mb-0 mt-5 max-w-[46ch] text-[clamp(1rem,1.3vw,1.2rem)] leading-relaxed text-[var(--text-muted)]">
            I build production-ready web applications, ERP/POS systems, CRM &amp; LMS platforms,
            AI-powered tools and custom business software that{" "}
            <span className="relative font-semibold" style={{ color: ACCENT }}>
              solve real problems.
              <span className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full" style={{ backgroundColor: ACCENT }} />
            </span>
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              onClick={goTo("projects")}
              className="inline-flex items-center gap-2 rounded-xl px-7 py-4 font-bold text-black transition-opacity hover:opacity-90"
              style={{ backgroundColor: ACCENT }}
            >
              <FiPlay aria-hidden="true" /> View My Work <FiArrowRight aria-hidden="true" />
            </a>
            <a
              href="/Saviyo_George_Resume.pdf"
              download
              className={`inline-flex items-center gap-2 rounded-xl px-7 py-4 font-bold text-[var(--text-main)] transition-colors hover:border-[var(--text-main)] ${PANEL}`}
            >
              <FiDownload aria-hidden="true" /> Download Resume
            </a>
          </div>

          <ul className={`m-0 mt-8 grid max-w-[740px] list-none grid-cols-2 overflow-hidden rounded-2xl p-0 sm:grid-cols-4 ${PANEL}`}>
            {STATS.map((stat, i) => (
              <li
                key={stat.label}
                className={`flex items-center gap-3 px-5 py-4 ${i > 0 ? "border-l border-[var(--border-subtle)]" : ""} ${i > 1 ? "border-t border-[var(--border-subtle)] sm:border-t-0" : ""}`}
              >
                <stat.Icon aria-hidden="true" className="shrink-0 text-xl" style={{ color: ACCENT }} />
                <div>
                  <p className="m-0 text-lg font-bold text-[var(--text-main)]">{stat.value}</p>
                  <p className="m-0 whitespace-nowrap text-xs text-[var(--text-muted)]">{stat.label}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: layered portrait */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto aspect-[1.1/1] w-full max-w-[600px]"
        >
          {/* dark plate behind */}
          <div
            aria-hidden="true"
            className="absolute left-[4%] top-[6%] h-[70%] w-[62%] rotate-[-12deg] rounded-[2.2rem] bg-[#15171c]"
          />

          {/* orange plate */}
          <motion.div
            aria-hidden="true"
            initial={{ rotate: -18, opacity: 0 }}
            animate={{ rotate: -12, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-[22%] top-[10%] h-[74%] w-[62%] rounded-[2.2rem]"
            style={{ background: `linear-gradient(160deg, #ff9a3c 0%, ${ACCENT} 45%, #c2410c 100%)`, boxShadow: `0 30px 80px ${ACCENT}40` }}
          />

          {/* orbit ring */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[2%] top-[22%] h-[56%] w-[96%] rotate-[-14deg] rounded-[50%] border"
            style={{ borderColor: "rgba(255,138,31,0.6)" }}
          />

          {/* portrait with bottom fade */}
          <img
            src={saviyoCutout}
            alt="Portrait of Saviyo George"
            className="absolute bottom-0 left-[18%] h-[92%] w-[70%] select-none object-contain object-bottom"
            style={{
              maskImage: "linear-gradient(to bottom, #000 80%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, #000 80%, transparent 100%)",
            }}
          />

          {/* code badge */}
          <div
            aria-hidden="true"
            className="absolute right-[4%] top-[4%] flex h-14 w-14 items-center justify-center rounded-xl bg-[#101216] border border-[#2a2e36]"
            style={{ color: ACCENT }}
          >
            <FiCode className="text-xl" />
          </div>

          {/* currently working card */}
          <div className="absolute bottom-[6%] right-[2%] flex items-center gap-3 rounded-2xl border border-[#2a2e36] bg-[#0f1115]/95 px-4 py-3 shadow-2xl backdrop-blur">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            <FiBox aria-hidden="true" className="text-2xl" style={{ color: ACCENT }} />
            <div>
              <p className="m-0 text-xs text-[#9ca3af]">Currently working at</p>
              <p className="m-0 font-bold text-white">D3innovatives</p>
              <p className="m-0 text-xs text-[#9ca3af]">MERN Stack Developer</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* What I build */}
      <div className="mt-16">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2
            className="m-0 flex items-center gap-3 text-2xl font-bold text-[var(--text-main)]"
            style={{ fontFamily: "'Inter', sans-serif", textTransform: "none", letterSpacing: "normal" }}
          >
            <span aria-hidden="true" className="h-6 w-1 rounded-full" style={{ backgroundColor: ACCENT }} />
            What I Build
          </h2>
          <a href="#projects" onClick={goTo("projects")} className="inline-flex items-center gap-2 text-sm text-[var(--text-main)] hover:text-[var(--accent)]">
            Explore All Projects <FiArrowRight aria-hidden="true" />
          </a>
        </div>

        <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {BUILDS.map((item) => (
            <li
              key={item.title}
              className="flex items-center gap-3 rounded-2xl border-2 p-4"
              style={{
                borderColor: item.active ? ACCENT : "var(--border-subtle)",
                backgroundColor: "var(--bg-surface)",
              }}
            >
              <item.Icon aria-hidden="true" className="shrink-0 text-3xl" style={{ color: ACCENT }} />
              <div>
                <p className="m-0 font-bold text-[var(--text-main)]">{item.title}</p>
                <p className="m-0 mt-1 whitespace-nowrap text-[13px] text-[var(--text-muted)]">{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Tech stack */}
      <div className="mt-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-8">
        <p className="m-0 shrink-0 text-xl font-bold leading-tight text-[var(--text-main)]">
          Tech Stack
          <br />I Work With
        </p>
        <ul className="m-0 flex list-none flex-wrap gap-3 p-0">
          {STACK.map((tech) => (
            <li
              key={tech.name}
              title={tech.name}
              className={`flex h-[68px] w-[68px] items-center justify-center rounded-2xl text-3xl ${PANEL}`}
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
