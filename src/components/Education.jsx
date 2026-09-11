import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { experience } from "../data/experience";
import { 
  FiAward, 
  FiBookOpen, 
  FiCalendar, 
  FiMapPin, 
  FiCheck, 
  FiCode, 
  FiLayers, 
  FiTerminal, 
  FiShield, 
  FiExternalLink 
} from "react-icons/fi";

function TiltDiploma({ children, className }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current || window.innerWidth < 768) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: (y - 0.5) * -10,
      y: (x - 0.5) * 10,
    });
    setGlare({ x: x * 100, y: y * 100, opacity: 0.15 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
      className={`relative ${className}`}
    >
      {children}
      {/* Glare gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none rounded-inherit transition-opacity duration-300"
        style={{
          opacity: glare.opacity,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(251, 191, 36, 0.25) 0%, transparent 60%)`,
        }}
      />
    </motion.div>
  );
}

function Education() {
  const edu = experience.find((item) => item.type === "education") || {};
  const [activeTab, setActiveTab] = useState("coursework");

  return (
    <section className="relative overflow-hidden bg-[var(--bg-base)] text-[var(--text-main)] py-20 md:py-28 border-t border-[var(--border-subtle)]">
      <div className="container-custom">

        {/* ================= SECTION HEADER ================= */}
        <div className="flex items-center gap-4 mb-10 md:mb-16">
          <span className="text-xs tracking-[0.3em] uppercase text-amber-400 font-mono font-medium bg-amber-400/10 px-3.5 py-1.5 rounded-full border border-amber-400/20">
            04 / ACADEMIC CREDENTIAL
          </span>
          <div className="divider flex-1 h-px bg-gradient-to-r from-[var(--border-subtle)] to-transparent" />
          <span className="text-xs tracking-[0.3em] uppercase text-[var(--text-muted)] font-mono hidden sm:inline">
            DEGREE ARCHIVE
          </span>
        </div>

        {/* Title Headline */}
        <div className="mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-7xl lg:text-8xl font-['Anton'] uppercase leading-[0.88] text-[var(--text-main)]"
          >
            ACADEMIC <span className="text-transparent text-stroke hover:text-amber-400/20 transition-colors">FOUNDATION</span>
          </motion.h2>
          <p className="text-xs md:text-sm text-[var(--text-muted)] font-mono uppercase tracking-wider mt-3 max-w-xl">
            Formal undergraduate education in computer applications, systems analysis, algorithmic engineering, and software development methodologies.
          </p>
        </div>

        {/* ================= BENTO GRID DOSSIER ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-stretch">

          {/* MAIN DIPLOMA / CREDENTIAL CARD (COL 1-8) */}
          <div className="lg:col-span-8 flex flex-col">
            <TiltDiploma className="h-full rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-6 md:p-10 flex flex-col justify-between relative overflow-hidden group hover:border-amber-400/60 transition-colors duration-500">
              
              {/* Corner Ornaments (Guilloche Aesthetic) */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-amber-400/40 pointer-events-none" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-amber-400/40 pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-amber-400/40 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-amber-400/40 pointer-events-none" />

              <div>
                {/* Header Strip with Institutional Metadata */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-6 border-b border-[var(--border-subtle)] text-xs font-mono">
                  <div className="flex items-center gap-2 text-amber-400">
                    <FiShield className="text-sm" />
                    <span className="tracking-widest uppercase font-bold text-[11px]">
                      {edu.status || "DEGREE CONFERRED"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-[var(--text-dim)]">
                    <span className="flex items-center gap-1.5">
                      <FiCalendar className="text-xs" />
                      {edu.period}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <FiMapPin className="text-xs text-amber-400/80" />
                      {edu.location}
                    </span>
                  </div>
                </div>

                {/* Degree & College Header */}
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[10px] font-mono uppercase text-[var(--text-dim)] mb-3">
                    <FiAward className="text-amber-400" />
                    <span>BACHELOR'S PROGRAM · 3 YEARS FULL-TIME</span>
                  </div>

                  <h3 className="text-3xl md:text-5xl font-['Anton'] uppercase text-[var(--text-main)] tracking-tight leading-tight mb-2 group-hover:text-amber-400 transition-colors">
                    {edu.degree}
                  </h3>

                  <div className="flex flex-wrap items-baseline gap-2 text-base md:text-lg font-sans text-[var(--text-muted)] font-medium">
                    <span className="text-[var(--text-main)] font-semibold">{edu.institution}</span>
                    {edu.university && (
                      <span className="text-xs font-mono text-amber-400/90 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                        {edu.university}
                      </span>
                    )}
                  </div>
                </div>

                {/* Degree Description */}
                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-8 max-w-2xl font-sans">
                  {edu.description}
                </p>

                {/* Curriculum & Key Coursework Interactive Section */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4 border-b border-[var(--border-subtle)] pb-2">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-dim)] flex items-center gap-1.5">
                      <FiBookOpen className="text-amber-400" />
                      <span>CORE CURRICULUM & SOFTWARE DISCIPLINES</span>
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                      {edu.grade || "PASSED"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {edu.coursework && edu.coursework.map((course, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[var(--bg-base)] border border-[var(--border-subtle)] hover:border-amber-400/50 hover:bg-[var(--bg-elevated)] transition-all"
                      >
                        <div className="w-5 h-5 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center flex-shrink-0">
                          <FiCheck className="text-[10px] text-amber-400" />
                        </div>
                        <span className="text-xs font-mono text-[var(--text-main)] truncate">
                          {course}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer: Seal of Accreditation */}
              <div className="pt-6 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-4 mt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-amber-400/40 bg-amber-400/10 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.2)]">
                    <FiAward className="text-xl" />
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold text-[var(--text-main)] uppercase">
                      OFFICIAL DEGREE VERIFICATION
                    </div>
                    <div className="text-[10px] font-mono text-[var(--text-dim)]">
                      SERIAL #BCA-2021-2024-MG-UNIVERSITY
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-mono text-[var(--text-dim)] uppercase tracking-wider bg-[var(--bg-elevated)] px-3 py-1.5 rounded border border-[var(--border-subtle)]">
                  COMPUTING SCIENCES
                </span>
              </div>
            </TiltDiploma>
          </div>

          {/* SIDEBAR BENTO CARDS (COL 9-12) */}
          <div className="lg:col-span-4 flex flex-col gap-6">

            {/* BENTO 1: ACADEMIC MILESTONES */}
            <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-amber-400/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-4 border-b border-[var(--border-subtle)] pb-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
                  <FiLayers />
                  <span>3-YEAR PROGRESSION</span>
                </span>
                <span className="text-[10px] font-mono text-[var(--text-dim)]">2021–2024</span>
              </div>

              <div className="space-y-4">
                {edu.milestones && edu.milestones.map((ms, idx) => (
                  <div key={idx} className="relative pl-5 border-l border-[var(--border-subtle)]">
                    <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-[var(--bg-base)] border-2 border-amber-400" />
                    <div className="text-xs font-mono font-bold text-[var(--text-main)] uppercase">
                      {ms.label}
                    </div>
                    <div className="text-xs text-[var(--text-muted)] mt-0.5 leading-relaxed font-sans">
                      {ms.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* BENTO 2: THEORY TO PRODUCTION BRIDGE */}
            <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-cyan-400/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-3 border-b border-[var(--border-subtle)] pb-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-1.5">
                  <FiCode />
                  <span>ENGINEERING BRIDGE</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400">APPLIED CS</span>
              </div>

              <p className="text-xs text-[var(--text-muted)] leading-relaxed font-sans mb-4">
                Academic coursework directly translates into enterprise code: applying relational normalization to MongoDB schemas, and algorithmic rigor to real-time ERP calculations.
              </p>

              <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
                <div className="p-2 rounded bg-[var(--bg-base)] border border-[var(--border-subtle)]">
                  <div className="text-[10px] text-[var(--text-dim)] uppercase">FOUNDATION</div>
                  <div className="font-bold text-[var(--text-main)] mt-0.5">RDBMS / OOP</div>
                </div>
                <div className="p-2 rounded bg-[var(--bg-base)] border border-[var(--border-subtle)]">
                  <div className="text-[10px] text-[var(--text-dim)] uppercase">PRODUCTION</div>
                  <div className="font-bold text-amber-400 mt-0.5">MERN / NEXT.JS</div>
                </div>
              </div>
            </div>

            {/* BENTO 3: CERTIFIED COMPETENCE STAMP */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-[var(--bg-surface)] to-[var(--bg-surface)] border border-amber-400/30 flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  VERIFIED DEGREE HOLDER
                </div>
                <div className="text-[11px] text-[var(--text-muted)] mt-0.5">
                  Full Stack Engineer with formal CS credentials
                </div>
              </div>
              <div className="w-9 h-9 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold text-sm shadow-[0_0_15px_rgba(251,191,36,0.4)] flex-shrink-0">
                ✓
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Education;
