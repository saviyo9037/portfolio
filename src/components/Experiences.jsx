import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { experience } from "../data/experience";

function Experiences() {
  const workExperience = experience.filter((item) => item.type === "work");
  const timelineRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Scroll progress for timeline line
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 50%"],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const glowOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.2, 1, 0.4]);

  return (
    <section className="relative overflow-hidden bg-[var(--bg-base)]">
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(ellipse at center, var(--accent) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      <div className="container-custom section-padding relative z-10">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-10 md:mb-16"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-[var(--accent)] font-medium bg-[var(--glass-bg)] px-4 py-2 rounded-full border border-[var(--glass-border)] backdrop-blur-md">
            (03)
          </span>
          <motion.div
            className="divider flex-1"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "left" }}
          />
          <span className="text-xs tracking-[0.3em] uppercase text-[var(--text-muted)] font-mono font-medium">
            Career Track Record
          </span>
        </motion.div>

        {/* Heading */}
        <div className="mb-12 md:mb-16">
          <motion.h2
            className="text-5xl md:text-7xl lg:text-8xl font-['Anton'] uppercase leading-[0.9] tracking-tight mb-4"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-transparent text-stroke">Career</span>{" "}
            <span className="text-[var(--text-main)] drop-shadow-[0_0_30px_rgba(255,255,255,0.12)]">Experience</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-sm md:text-base text-[var(--text-muted)] font-mono max-w-2xl"
          >
            Production engineering history across enterprise ERP, POS systems, full-stack web platforms, and hardware integrations.
          </motion.p>
        </div>

        {/* Quick Highlights Summary Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-14 md:mb-20"
        >
          {[
            { label: "Current Focus", val: "Enterprise ERP & POS" },
            { label: "Core Stack", val: "MERN + TypeScript" },
            { label: "Architecture", val: "TanStack + WebSockets" },
            { label: "Production Modules", val: "10+ Shipped to Live" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[var(--bg-surface)]/60 border border-[var(--border-subtle)] backdrop-blur-sm hover:border-[var(--accent)]/30 transition-all"
            >
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--text-dim)] mb-1">
                {stat.label}
              </div>
              <div className="text-xs md:text-sm font-semibold text-[var(--text-main)] font-mono">
                {stat.val}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Timeline Container */}
        <div ref={timelineRef} className="relative">
          {/* Animated vertical spine on desktop */}
          <div className="absolute left-6 md:left-8 top-6 bottom-6 w-px bg-[var(--border-subtle)] hidden md:block">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-[var(--accent)] via-white to-transparent"
              style={{ height: lineHeight }}
            />
            {/* Glowing follower dot */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_15px_var(--accent)]"
              style={{ top: lineHeight, opacity: glowOpacity }}
            />
          </div>

          <div className="space-y-8 md:space-y-12">
            {workExperience.map((exp, index) => {
              const isCurrent = exp.current === true;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.7,
                      delay: index * 0.12,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  }}
                  viewport={{ once: true, margin: "-40px" }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group relative md:pl-20"
                >
                  {/* Timeline Node Icon (Desktop) */}
                  <div className="absolute left-0 md:left-8 -translate-x-1/2 top-8 hidden md:flex items-center justify-center z-20">
                    {isCurrent ? (
                      <div className="relative flex items-center justify-center">
                        <span className="absolute w-6 h-6 rounded-full bg-emerald-500/30 animate-ping" />
                        <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-[var(--bg-base)] shadow-[0_0_15px_rgba(16,185,129,0.8)]" />
                      </div>
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full bg-[var(--bg-surface)] border-2 border-[var(--border-hover)] group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:shadow-[0_0_12px_var(--accent)] transition-all duration-300" />
                    )}
                  </div>

                  {/* Dossier Card */}
                  <div className={`rounded-2xl border transition-all duration-500 p-6 md:p-8 backdrop-blur-md relative overflow-hidden ${
                    isCurrent
                      ? "bg-[var(--bg-surface)]/90 border-emerald-500/30 shadow-[0_10px_35px_rgba(16,185,129,0.06)] hover:border-emerald-500/60"
                      : "bg-[var(--bg-surface)]/70 border-[var(--border-subtle)] hover:border-[var(--accent)]/40 hover:bg-[var(--bg-elevated)] shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                  }`}>
                    {/* Top ambient highlight on card hover */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Card Header: Company, Role & Badges */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]/80">
                      <div>
                        {/* Company & Role */}
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h3 className="text-2xl md:text-3xl font-['Anton'] uppercase tracking-wide text-white group-hover:text-[var(--accent)] transition-colors">
                            {exp.company}
                          </h3>
                          <span className="text-[var(--text-dim)] font-mono text-xs">/</span>
                          <span className="text-xs md:text-sm font-mono text-[var(--text-dim)] flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5 text-[var(--accent)] opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {exp.location}
                          </span>
                        </div>

                        <div className="text-base md:text-lg font-semibold text-[var(--accent)] flex items-center gap-2">
                          <span>{exp.role}</span>
                        </div>
                      </div>

                      {/* Badges Cluster */}
                      <div className="flex flex-wrap items-center gap-2.5 self-start">
                        {isCurrent && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            Active Role
                          </span>
                        )}

                        {exp.employmentType && (
                          <span className="px-3 py-1.5 rounded-full text-[11px] font-mono font-medium uppercase tracking-wider bg-white/5 text-[var(--text-muted)] border border-white/10">
                            {exp.employmentType}
                          </span>
                        )}

                        <span className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold text-[var(--text-main)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] shadow-inner">
                          {exp.period}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    {exp.description && (
                      <p className="mt-5 text-sm md:text-base text-[var(--text-muted)] leading-relaxed group-hover:text-[var(--text-main)] transition-colors duration-500">
                        {exp.description}
                      </p>
                    )}

                    {/* Key Engineering Deliverables & Impact */}
                    {exp.highlights && exp.highlights.length > 0 && (
                      <div className="mt-6 pt-5 border-t border-[var(--border-subtle)]/60">
                        <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--text-dim)] font-semibold flex items-center gap-2 mb-3">
                          <span className="text-[var(--accent)] font-bold">◆</span>
                          Key Impact & Engineering Deliverables
                        </div>
                        <ul className="space-y-2.5">
                          {exp.highlights.map((highlight, hIdx) => (
                            <li key={hIdx} className="flex items-start gap-3 text-xs md:text-sm text-[var(--text-muted)] leading-relaxed group-hover:text-[var(--text-main)]/90 transition-colors">
                              <span className="inline-block mt-1 text-[var(--accent)] opacity-80 shrink-0 font-mono text-xs">
                                ➔
                              </span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tech Stack & Tooling Chips */}
                    {exp.skills && exp.skills.length > 0 && (
                      <div className="mt-6 pt-5 border-t border-[var(--border-subtle)]/60">
                        <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--text-dim)] font-semibold mb-3 flex items-center gap-2">
                          <svg className="w-3.5 h-3.5 text-[var(--accent)] opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          </svg>
                          Technologies & Frameworks
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-3 py-1 rounded-md text-xs font-mono text-[var(--text-muted)] bg-[var(--bg-base)] border border-[var(--border-subtle)] group-hover:border-[var(--accent)]/30 hover:border-[var(--accent)] hover:text-white hover:bg-[var(--accent)]/10 transition-all duration-300 cursor-default"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experiences;

