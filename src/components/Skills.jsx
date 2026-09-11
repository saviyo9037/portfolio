import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills } from "../data/skills";
import { 
  FiTerminal, 
  FiLayout, 
  FiServer, 
  FiDatabase, 
  FiCpu, 
  FiTool, 
  FiCheckCircle, 
  FiArrowUpRight,
  FiFileText
} from "react-icons/fi";

const EDITIONS = [
  { key: "all", label: "Full Gazette" },
  { key: "frontend", label: "Frontend Wire" },
  { key: "backend", label: "Backend Desk" },
  { key: "enterprise", label: "Enterprise & Niche" },
  { key: "tools", label: "Toolbox Classifieds" },
];

function Skills() {
  const [activeEdition, setActiveEdition] = useState("all");
  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Grouped skills for the newspaper columns
  const frontendSkills = skills.find((s) => s.category === "Frontend")?.items || [];
  const backendSkills = skills.find((s) => s.category === "Backend")?.items || [];
  const dbSkills = skills.find((s) => s.category === "Databases")?.items || [];
  const languageSkills = skills.find((s) => s.category === "Languages")?.items || [];
  const toolSkills = skills.find((s) => s.category === "Tools")?.items || [];
  const nicheSkills = skills.find((s) => s.category.includes("Other") || s.category.includes("Niche"))?.items || [];

  return (
    <section className="relative overflow-hidden bg-[var(--bg-base)] text-[var(--text-main)] py-20 md:py-28 border-t border-[var(--border-subtle)]">
      <div className="container-custom">

        {/* ================= NEWSPAPER TOP HEADER / FOLIO BAR ================= */}
        <div className="border-b border-t border-[var(--border-subtle)] py-2 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] md:text-xs font-mono uppercase tracking-widest text-[var(--text-dim)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>VOL. XXIV · NO. 04</span>
            </div>
            <div className="hidden sm:block text-center text-[var(--text-muted)] font-serif italic">
              "All the code, frameworks, and architecture fit to ship"
            </div>
            <div className="flex items-center gap-3">
              <span>SPECIAL DISPATCH</span>
              <span>•</span>
              <span className="text-[var(--text-main)] font-semibold">EST. 2021</span>
            </div>
          </div>
        </div>

        {/* ================= NEWSPAPER MASTHEAD ================= */}
        <div className="text-center mb-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-400/30 bg-amber-400/5 text-amber-400 text-[10px] tracking-[0.25em] uppercase font-mono mb-4"
          >
            <FiFileText className="text-xs" />
            <span>THE DEVELOPER GAZETTE · SPECIAL EDITION</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-8xl lg:text-9xl font-['Anton'] uppercase tracking-tight leading-[0.85] text-[var(--text-main)] mb-3 select-none"
          >
            TECHNICAL <span className="text-transparent text-stroke hover:text-amber-400/20 transition-colors">STACK</span>
          </motion.h2>

          <p className="max-w-2xl mx-auto text-xs md:text-sm text-[var(--text-muted)] font-serif italic leading-relaxed">
            A comprehensive editorial index of core languages, modern client-side engines, server-side infrastructure, and specialized enterprise tooling.
          </p>

          {/* Newspaper Double Hairline Separator */}
          <div className="mt-8 border-t-2 border-b border-[var(--text-dim)]/40 h-1.5" />
        </div>

        {/* ================= EDITION FILTER TABS ================= */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-4 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            <span className="text-[10px] uppercase font-mono text-[var(--text-dim)] mr-2 hidden md:inline">
              SELECT SECTION:
            </span>
            {EDITIONS.map((ed) => {
              const isActive = activeEdition === ed.key;
              return (
                <button
                  key={ed.key}
                  onClick={() => setActiveEdition(ed.key)}
                  className={`px-3.5 py-1.5 rounded-sm text-xs font-mono tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[var(--text-main)] text-[var(--bg-base)] font-bold shadow-md"
                      : "bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-subtle)]"
                  }`}
                >
                  {ed.label}
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-3 text-xs font-mono text-[var(--text-dim)]">
            <FiCheckCircle className="text-amber-400" />
            <span>MERN & NEXT.JS ECOSYSTEM CERTIFIED</span>
          </div>
        </div>

        {/* ================= NEWSPAPER BROADSHEET COLUMNS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-[var(--border-subtle)] bg-[var(--bg-surface)] divide-y md:divide-y-0 md:divide-x divide-[var(--border-subtle)]">

          {/* COLUMN 1: FRONTEND & LANGUAGES (LEAD STORY) */}
          {(activeEdition === "all" || activeEdition === "frontend") && (
            <div className="p-6 md:p-8 flex flex-col justify-between group hover:bg-[var(--bg-elevated)]/40 transition-colors duration-300">
              <div>
                {/* Column Headline Badge */}
                <div className="flex items-center justify-between mb-4 border-b border-[var(--border-subtle)] pb-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
                    <FiLayout />
                    <span>FRONT PAGE · LEAD DISPATCH</span>
                  </span>
                  <span className="text-[10px] font-mono text-[var(--text-dim)]">COL. 01</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-['Anton'] uppercase text-[var(--text-main)] mb-2 leading-tight group-hover:text-amber-400 transition-colors">
                  MODERN CLIENT ENGINES & REACT ECOSYSTEM
                </h3>

                <p className="text-xs text-[var(--text-muted)] font-serif italic mb-6 leading-normal border-b border-[var(--border-subtle)] pb-4">
                  “Architecting lightning-fast user experiences with server-side rendering, declarative state machines, and micro-animations.”
                </p>

                {/* Core Languages Stamp */}
                <div className="mb-6 p-3 rounded bg-[var(--bg-base)] border border-[var(--border-subtle)]">
                  <div className="text-[9px] font-mono uppercase text-[var(--text-dim)] tracking-wider mb-2">
                    PRIMARY SYNTAX & RUNTIMES:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {languageSkills.map((lang, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--bg-elevated)] text-[var(--text-main)] border border-[var(--border-subtle)]"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Frontend Skills Table List */}
                <div className="space-y-2">
                  <div className="text-[10px] font-mono uppercase text-[var(--text-dim)] tracking-widest mb-3">
                    CLIENT-SIDE ARSENAL:
                  </div>
                  {frontendSkills.map((item, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: 4 }}
                      className="flex items-center justify-between py-1.5 px-2 rounded border-b border-[var(--border-subtle)]/50 hover:bg-[var(--bg-base)] transition-all cursor-default"
                      onMouseEnter={() => setHoveredSkill(item)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <span className="text-xs font-sans font-medium text-[var(--text-main)] flex items-center gap-2">
                        <span className="text-[10px] font-mono text-[var(--text-dim)]">{String(i + 1).padStart(2, "0")}.</span>
                        {item}
                      </span>
                      <span className="text-[9px] font-mono uppercase text-emerald-400/80 bg-emerald-400/10 px-1.5 py-0.5 rounded">
                        PROD
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Column Footer Stamp */}
              <div className="mt-8 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-[10px] font-mono text-[var(--text-dim)]">
                <span>SECTION: CLIENT DEV</span>
                <span className="text-amber-400 font-bold">100% RESPONSIVE</span>
              </div>
            </div>
          )}

          {/* COLUMN 2: BACKEND & DATA ARCHITECTURE (THE SERVER WIRE) */}
          {(activeEdition === "all" || activeEdition === "backend") && (
            <div className="p-6 md:p-8 flex flex-col justify-between group hover:bg-[var(--bg-elevated)]/40 transition-colors duration-300">
              <div>
                {/* Column Headline Badge */}
                <div className="flex items-center justify-between mb-4 border-b border-[var(--border-subtle)] pb-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-1.5">
                    <FiServer />
                    <span>SYSTEMS WIRE · ARCHITECTURE</span>
                  </span>
                  <span className="text-[10px] font-mono text-[var(--text-dim)]">COL. 02</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-['Anton'] uppercase text-[var(--text-main)] mb-2 leading-tight group-hover:text-cyan-400 transition-colors">
                  SCALABLE SERVER RUNTIMES & DATABASE PIPELINES
                </h3>

                <p className="text-xs text-[var(--text-muted)] font-serif italic mb-6 leading-normal border-b border-[var(--border-subtle)] pb-4">
                  “RESTful APIs, session/JWT authentication layers, transaction schemas, and high-concurrency microservices.”
                </p>

                {/* Databases Box */}
                <div className="mb-6 p-3 rounded bg-[var(--bg-base)] border border-[var(--border-subtle)]">
                  <div className="text-[9px] font-mono uppercase text-[var(--text-dim)] tracking-wider mb-2 flex items-center gap-1.5">
                    <FiDatabase className="text-xs text-cyan-400" />
                    <span>DATABASE PERSISTENCE:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {dbSkills.map((db, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--bg-elevated)] text-[var(--text-main)] border border-[var(--border-subtle)]"
                      >
                        {db}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Backend Skills List */}
                <div className="space-y-2">
                  <div className="text-[10px] font-mono uppercase text-[var(--text-dim)] tracking-widest mb-3">
                    SERVER CAPABILITIES:
                  </div>
                  {backendSkills.map((item, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: 4 }}
                      className="flex items-center justify-between py-1.5 px-2 rounded border-b border-[var(--border-subtle)]/50 hover:bg-[var(--bg-base)] transition-all cursor-default"
                      onMouseEnter={() => setHoveredSkill(item)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <span className="text-xs font-sans font-medium text-[var(--text-main)] flex items-center gap-2">
                        <span className="text-[10px] font-mono text-[var(--text-dim)]">{String(i + 1).padStart(2, "0")}.</span>
                        {item}
                      </span>
                      <span className="text-[9px] font-mono uppercase text-cyan-400/80 bg-cyan-400/10 px-1.5 py-0.5 rounded">
                        ACTIVE
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Architecture Highlights */}
                <div className="mt-6 p-3 rounded border border-dashed border-[var(--border-subtle)] bg-[var(--bg-elevated)]/30">
                  <span className="text-[10px] font-mono uppercase text-[var(--text-dim)] block mb-1">
                    BULLETPROOF PROTOCOLS:
                  </span>
                  <div className="text-xs text-[var(--text-muted)] space-y-1">
                    <div>✦ MVC Pattern & Clean Code Separation</div>
                    <div>✦ JWT Tokens & Cookie-Based Sessions</div>
                    <div>✦ Real-time WebSockets & Event Emitters</div>
                  </div>
                </div>
              </div>

              {/* Column Footer */}
              <div className="mt-8 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-[10px] font-mono text-[var(--text-dim)]">
                <span>SECTION: BACKEND</span>
                <span className="text-cyan-400 font-bold">REST API & DB</span>
              </div>
            </div>
          )}

          {/* COLUMN 3: ENTERPRISE & SPECIALIZED NICHE (SPECIAL INVESTIGATION) */}
          {(activeEdition === "all" || activeEdition === "enterprise") && (
            <div className="p-6 md:p-8 flex flex-col justify-between group hover:bg-[var(--bg-elevated)]/40 transition-colors duration-300">
              <div>
                {/* Column Headline Badge */}
                <div className="flex items-center justify-between mb-4 border-b border-[var(--border-subtle)] pb-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold flex items-center gap-1.5">
                    <FiCpu />
                    <span>SPECIAL REPORT · NICHE ENGINEERING</span>
                  </span>
                  <span className="text-[10px] font-mono text-[var(--text-dim)]">COL. 03</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-['Anton'] uppercase text-[var(--text-main)] mb-2 leading-tight group-hover:text-purple-400 transition-colors">
                  ERP, POS, HARDWARE & VOICE AI ORCHESTRATION
                </h3>

                <p className="text-xs text-[var(--text-muted)] font-serif italic mb-6 leading-normal border-b border-[var(--border-subtle)] pb-4">
                  “Production enterprise modules, barcode pipelines, physical receipt printing, and modular speech agents.”
                </p>

                {/* Editorial Bulletin Feature Cards */}
                <div className="space-y-3 mb-6">
                  <div className="p-3 rounded bg-[var(--bg-base)] border border-[var(--border-subtle)]">
                    <div className="text-[11px] font-bold text-amber-400 uppercase font-mono flex items-center justify-between">
                      <span>ERP & POS EXPERTISE</span>
                      <span className="text-[9px] bg-amber-400/10 px-1.5 py-0.5 rounded">COMMERCIAL</span>
                    </div>
                    <p className="text-[11px] text-[var(--text-muted)] mt-1">
                      Inventory, Billing, Thermal Printing, Product Catalogs & Barcode scanning integration.
                    </p>
                  </div>

                  <div className="p-3 rounded bg-[var(--bg-base)] border border-[var(--border-subtle)]">
                    <div className="text-[11px] font-bold text-cyan-400 uppercase font-mono flex items-center justify-between">
                      <span>VOICE AI & NLP PIPELINES</span>
                      <span className="text-[9px] bg-cyan-400/10 px-1.5 py-0.5 rounded">NEXT-GEN</span>
                    </div>
                    <p className="text-[11px] text-[var(--text-muted)] mt-1">
                      Sarvam AI, OpenAI LLM routing, multilingual TTS/STT, and offline voice plugin architecture.
                    </p>
                  </div>

                  <div className="p-3 rounded bg-[var(--bg-base)] border border-[var(--border-subtle)]">
                    <div className="text-[11px] font-bold text-purple-400 uppercase font-mono flex items-center justify-between">
                      <span>DESKTOP UTILITY PACKAGING</span>
                      <span className="text-[9px] bg-purple-400/10 px-1.5 py-0.5 rounded">WINDOWS</span>
                    </div>
                    <p className="text-[11px] text-[var(--text-muted)] mt-1">
                      Standalone Windows .exe desktop bridges packaged with PyInstaller and WebSockets.
                    </p>
                  </div>
                </div>

                {/* Additional Niche Tag Cloud */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {nicheSkills.slice(0, 10).map((skill, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg-base)] text-[var(--text-dim)] hover:text-[var(--text-main)] hover:border-amber-400/50 border border-[var(--border-subtle)] transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Column Footer */}
              <div className="mt-8 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-[10px] font-mono text-[var(--text-dim)]">
                <span>SECTION: ENTERPRISE</span>
                <span className="text-purple-400 font-bold">FULL-STACK SOLUTIONS</span>
              </div>
            </div>
          )}
        </div>

        {/* ================= NEWSPAPER CLASSIFIEDS SECTION (DEV TOOLS & WORKFLOW) ================= */}
        {(activeEdition === "all" || activeEdition === "tools") && (
          <div className="mt-8 border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 border-b border-[var(--border-subtle)] pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
                  <FiTool />
                  <span>THE CLASSIFIEDS · DAILY DEV TOOLS & WORKFLOW DIRECTORY</span>
                </span>
                <h4 className="text-xl md:text-2xl font-['Anton'] uppercase text-[var(--text-main)] mt-1">
                  DEV TOOLBOX & PRODUCTION UTILITIES
                </h4>
              </div>

              {/* Authentic Newspaper Barcode Graphic */}
              <div className="flex items-center gap-2 bg-[var(--bg-base)] px-3 py-1.5 rounded border border-[var(--border-subtle)]">
                <div className="font-mono text-[9px] tracking-tighter text-[var(--text-dim)] flex gap-0.5">
                  <span className="w-0.5 h-6 bg-[var(--text-main)]" />
                  <span className="w-1 h-6 bg-[var(--text-main)]" />
                  <span className="w-0.5 h-6 bg-[var(--text-main)]" />
                  <span className="w-1.5 h-6 bg-[var(--text-main)]" />
                  <span className="w-0.5 h-6 bg-[var(--text-main)]" />
                  <span className="w-1 h-6 bg-[var(--text-main)]" />
                  <span className="w-0.5 h-6 bg-[var(--text-main)]" />
                  <span className="w-1.5 h-6 bg-[var(--text-main)]" />
                </div>
                <span className="text-[9px] font-mono text-[var(--text-muted)]">SAVIYO-DEV-2026</span>
              </div>
            </div>

            {/* Classified Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3">
              {toolSkills.map((tool, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -3, borderColor: "#f59e0b" }}
                  className="p-3 rounded bg-[var(--bg-base)] border border-[var(--border-subtle)] text-center flex flex-col items-center justify-center gap-1.5 transition-colors cursor-default"
                >
                  <span className="text-[9px] font-mono text-[var(--text-dim)]">#0{idx + 1}</span>
                  <span className="text-xs font-mono font-bold text-[var(--text-main)] uppercase tracking-tight">
                    {tool}
                  </span>
                  <span className="text-[8px] font-mono text-emerald-400">READY</span>
                </motion.div>
              ))}
            </div>

            {/* Editorial Bottom Quote & Weather Box */}
            <div className="mt-8 pt-4 border-t border-dashed border-[var(--border-subtle)] flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-serif italic text-[var(--text-muted)]">
              <div>
                “Premature optimization is the root of all evil — but solid architecture makes shipping feel effortless.”
              </div>
              <div className="font-mono text-[10px] text-[var(--text-dim)] not-italic uppercase flex items-center gap-2">
                <span>WEATHER: HIGH VELOCITY DEPLOYMENTS</span>
                <span>•</span>
                <span className="text-amber-400 font-bold">100% TESTS PASSING</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

export default Skills;
