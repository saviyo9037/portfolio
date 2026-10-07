import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, PROJECT_CATEGORIES } from "../data/projects";
import { FiArrowUpRight } from "react-icons/fi";

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState(PROJECT_CATEGORIES.COMPANY);

  // Filter projects based on selected category tab
  const filteredProjects = useMemo(() => {
    if (selectedCategory === PROJECT_CATEGORIES.ALL) {
      return projects;
    }
    return projects.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const companyCount = projects.filter((p) => p.category === PROJECT_CATEGORIES.COMPANY).length;
  const personalCount = projects.filter((p) => p.category === PROJECT_CATEGORIES.PERSONAL).length;

  return (
    <section id="work" className="relative w-full max-w-[1400px] mx-auto px-4 md:px-8 py-20 md:py-32">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 md:mb-24 border-b border-[var(--border-subtle)] pb-8">
        <div className="flex flex-col gap-3">
          <span className="font-mono text-sm tracking-[0.3em] uppercase text-[var(--accent)] font-bold flex items-center gap-3">
            [04] PORTFOLIO <span className="h-[1px] w-12 bg-[var(--accent)] opacity-40"></span>
          </span>
          <h2 className="font-['Anton'] text-6xl md:text-8xl uppercase tracking-tight leading-none">
            <span className="text-[var(--text-main)]">Selected</span>{" "}
            <span className="text-[var(--text-muted)] opacity-40">Works</span>
          </h2>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-3 bg-[var(--nav-pill-bg)] p-1.5 rounded-full border border-[var(--nav-pill-border)] shadow-sm">
          <button
            onClick={() => setSelectedCategory(PROJECT_CATEGORIES.COMPANY)}
            className={`font-mono text-xs uppercase px-5 py-2.5 rounded-full transition-all duration-300 outline-none ${selectedCategory === PROJECT_CATEGORIES.COMPANY
                ? "bg-[var(--accent)] text-black font-bold shadow-md scale-100"
                : "text-[var(--text-muted)] hover:text-[var(--text-main)] scale-95 hover:scale-100"
              }`}
          >
            Company [{String(companyCount).padStart(2, "0")}]
          </button>
          <button
            onClick={() => setSelectedCategory(PROJECT_CATEGORIES.PERSONAL)}
            className={`font-mono text-xs uppercase px-5 py-2.5 rounded-full transition-all duration-300 outline-none ${selectedCategory === PROJECT_CATEGORIES.PERSONAL
                ? "bg-[var(--accent)] text-black font-bold shadow-md scale-100"
                : "text-[var(--text-muted)] hover:text-[var(--text-main)] scale-95 hover:scale-100"
              }`}
          >
            Personal [{String(personalCount).padStart(2, "0")}]
          </button>
          <button
            onClick={() => setSelectedCategory(PROJECT_CATEGORIES.ALL)}
            className={`font-mono text-xs uppercase px-5 py-2.5 rounded-full transition-all duration-300 outline-none ${selectedCategory === PROJECT_CATEGORIES.ALL
                ? "bg-[var(--accent)] text-black font-bold shadow-md scale-100"
                : "text-[var(--text-muted)] hover:text-[var(--text-main)] scale-95 hover:scale-100"
              }`}
          >
            All [{String(projects.length).padStart(2, "0")}]
          </button>
        </div>
      </div>

      {/* Sticky Stacking Cards Layout */}
      <div className="relative flex flex-col gap-12 md:gap-24 w-full pb-32">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((proj, idx) => (
            <StackingCard key={proj.id} proj={proj} idx={idx} />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}

function StackingCard({ proj, idx }) {
  const isCompany = proj.category === "company";
  const targetUrl = proj.liveUrl || proj.githubUrl;
  const hasUrl = Boolean(targetUrl);

  const techChips = (proj.tags && proj.tags.length > 0)
    ? proj.tags
    : proj.tech.split(",").map((t) => t.trim());

  // Vibrant fallback gradients
  const fallbackGradients = [
    "from-indigo-900 to-purple-900",
    "from-blue-900 to-cyan-900",
    "from-emerald-900 to-teal-900",
    "from-rose-900 to-pink-900",
  ];
  const gradient = proj.gradient || fallbackGradients[idx % fallbackGradients.length];

  // Dynamic sticky top offset: 
  // Base offset is 100px. Each subsequent card gets +20px so they stack visibly.
  const stickyTop = `calc(80px + ${idx * 20}px)`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50, scale: 0.95 }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      className="sticky w-full rounded-[30px] md:rounded-[40px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)] shadow-2xl overflow-hidden flex flex-col md:flex-row h-auto md:h-[75vh] min-h-[500px] max-h-[800px] backdrop-blur-xl"
      style={{ top: stickyTop }}
    >
      {/* Content Side */}
      <div className="w-full md:w-5/12 p-8 md:p-14 lg:p-16 flex flex-col justify-between relative z-10 bg-[var(--bg-elevated)]">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-[var(--accent)] border border-[var(--accent)]/30 bg-[var(--accent)]/5 px-4 py-1.5 rounded-full">
              {proj.type || (isCompany ? "Company Work" : "Personal Project")}
            </span>
            <span className="font-mono text-sm text-[var(--text-dim)]">
              0{idx + 1}
            </span>
          </div>

          <h3 className="font-['Anton'] text-4xl md:text-5xl lg:text-7xl uppercase text-[var(--text-main)] leading-[1.05]">
            {proj.title}
          </h3>

          <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed mt-2 max-w-md">
            {proj.description}
          </p>
        </div>

        <div className="flex flex-col gap-8 mt-10 md:mt-0">
          <div className="flex flex-wrap gap-2">
            {techChips.slice(0, 6).map(t => (
              <span key={t} className="px-3 py-1.5 rounded-md border border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-main)] bg-[var(--nav-pill-bg)]">
                {t}
              </span>
            ))}
          </div>

          {hasUrl && (
            <a
              href={targetUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 group w-max mt-2"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[var(--accent)] flex items-center justify-center text-black group-hover:scale-110 transition-transform duration-500 shadow-md group-hover:shadow-lg">
                <FiArrowUpRight className="text-2xl md:text-3xl" />
              </div>
              <span className="font-mono uppercase font-bold text-[var(--text-main)] tracking-widest group-hover:text-[var(--accent)] transition-colors text-xs md:text-sm">
                View Project
              </span>
            </a>
          )}
        </div>
      </div>

      {/* Image Side */}
      <div className="w-full md:w-7/12 h-[300px] md:h-full relative bg-black/5">
        {proj.image ? (
          <img
            src={proj.image.startsWith("/") || proj.image.startsWith("http") ? proj.image : `/${proj.image}`}
            alt={proj.title}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradient} opacity-90`} />
        )}
        {/* Subtle inner shadow for depth */}
        <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.1)] pointer-events-none" />
      </div>
    </motion.div>
  );
}
