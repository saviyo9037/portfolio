import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experience } from "../data/experience";

function Experiences() {
  const workExperience = experience.filter((item) => item.type === "work");
  const [activeIdx, setActiveIdx] = useState(0);
  const activeExp = workExperience[activeIdx] || workExperience[0];
  const isCurrent = activeExp.current === true;

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Background ambient radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(ellipse at center, rgba(99,102,241,0.2) 0%, rgba(236,72,153,0.1) 50%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      <div className="container-custom relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="flex items-baseline gap-4 mb-8 md:mb-12 border-b border-[var(--border-subtle)] pb-4">
          <span className="section-label">[02]</span>
          <h2 className="font-['Anton'] text-5xl md:text-7xl lg:text-8xl uppercase tracking-tight">
            <span className="heading-gradient-violet">CHRONOLOGICAL</span>{" "}
            <span className="text-slate-800">DISPATCH</span>
          </h2>
        </div>

        {/* Desktop Split Dossier Layout / Mobile Adaptive */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Interactive Dispatch Index Tabs */}
          <div className="lg:col-span-4 flex flex-col gap-3.5">
            {workExperience.map((exp, idx) => {
              const selected = activeIdx === idx;
              const cur = exp.current === true;
              return (
                <button
                  key={exp.company}
                  onClick={() => setActiveIdx(idx)}
                  className={`text-left p-5 md:p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden group cursor-pointer backdrop-blur-md ${selected
                    ? "bg-white/10 border-emerald-500 shadow-[0_10px_30px_-5px_rgba(16,185,129,0.3),0_0_0_1px_rgba(16,185,129,0.4)]"
                    : "bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.06]"
                    }`}
                >
                  {/* Active Indicator Line on the bottom edge */}
                  {selected && (
                    <motion.div
                      layoutId="activeExperienceTab"
                      className="absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}

                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span
                      className={`font-['Anton'] text-3xl md:text-4xl transition-colors ${selected ? "text-emerald-400" : "text-slate-500 group-hover:text-white"
                        }`}
                    >
                      0{idx + 1}
                    </span>
                    {cur && (
                      <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-950/40 text-emerald-400 border border-emerald-500/30 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        CURRENT
                      </span>
                    )}
                  </div>

                  <h3 className="font-['Anton'] text-xl md:text-2xl text-white uppercase tracking-wide group-hover:text-emerald-400 transition-colors">
                    {exp.company}
                  </h3>

                  <p className="font-mono text-xs text-slate-400 mt-1 tracking-wider">
                    {exp.period}
                  </p>
                </button>
              );
            })}

            {/* Quick Summary Pill at bottom of tabs */}
            <div className="hidden lg:flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 font-mono text-xs text-slate-400 shadow-sm">
              <span>LEDGER REFS: 03 LOGS</span>
              <span className="text-emerald-400 font-bold">ALL VERIFIED</span>
            </div>
          </div>

          {/* Right Column: Detailed Dispatch Ledger Dossier */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeExp.company}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-3xl border border-white/10 bg-[#121216]/90 backdrop-blur-xl p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden"
              >
                {/* Background Giant Ghost Watermark Number */}
                <div
                  className="font-['Anton'] absolute top-4 right-6 text-[140px] md:text-[200px] leading-none select-none pointer-events-none text-white opacity-[0.03]"
                  aria-hidden="true"
                >
                  0{activeIdx + 1}
                </div>

                {/* Corner Cyber HUD Accents */}
                <span className="absolute top-3 left-3 w-4 h-4 border-t border-l border-emerald-500/40 pointer-events-none" />
                <span className="absolute top-3 right-3 w-4 h-4 border-t border-r border-emerald-500/40 pointer-events-none" />
                <span className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-emerald-500/40 pointer-events-none" />
                <span className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-emerald-500/40 pointer-events-none" />

                {/* Sub-Header Metadata */}
                <div className="font-mono text-xs md:text-sm text-emerald-400 font-semibold tracking-widest mb-2 flex flex-wrap items-center gap-2">
                  <span>{activeExp.period}</span>
                  <span className="opacity-40">|</span>
                  <span className="text-slate-400">{activeExp.location}</span>
                </div>

                {/* Main Company Title */}
                <h3 className="font-['Anton'] text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white mb-2">
                  {activeExp.company}
                </h3>

                {/* Role Title */}
                <div className="font-mono text-sm md:text-base text-emerald-300 font-medium mb-6">
                  {activeExp.role} {activeExp.employmentType ? `(${activeExp.employmentType})` : ""}
                </div>

                {/* Description Quote */}
                {activeExp.description && (
                  <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-6 border-l-2 border-emerald-400 pl-4 py-1 italic bg-white/[0.03] rounded-r-lg">
                    "{activeExp.description}"
                  </p>
                )}

                {/* Engineering Highlights / Deliverables */}
                {activeExp.highlights && activeExp.highlights.length > 0 && (
                  <div className="mb-8 space-y-3">
                    {activeExp.highlights.map((item, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-3 text-sm md:text-base text-slate-200 leading-relaxed">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 mt-2 shrink-0 shadow-[0_0_8px_rgba(57,255,136,0.8)]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Chips */}
                {activeExp.skills && activeExp.skills.length > 0 && (
                  <div className="pt-6 border-t border-white/10 flex flex-wrap gap-2 items-center">
                    {activeExp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="font-mono text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:border-emerald-400 hover:text-emerald-300 transition-colors shadow-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experiences;

