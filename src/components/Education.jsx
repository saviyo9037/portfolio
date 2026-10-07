import React from "react";
import { FaGraduationCap, FaUniversity } from "react-icons/fa";
import { FiCalendar, FiMapPin, FiAward } from "react-icons/fi";

export default function Education() {
  return (
    <section id="education" className="relative w-full max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16 text-[var(--text-main)] transition-colors duration-300">

      {/* ================= SECTION HEADER ================= */}
      <div className="flex items-baseline gap-4 mb-8 md:mb-10 border-b border-[var(--border-subtle)] pb-4">
        <span className="section-label">[04]</span>
        <h2 className="font-['Anton'] text-5xl md:text-6xl uppercase tracking-tight">
          <span className="text-amber-500" style={{ textShadow: "0 0 20px rgba(245,158,11,0.4)" }}>ACADEMIC</span>{" "}
          <span className="text-[var(--text-main)]">BACKGROUND</span>
        </h2>
      </div>

      {/* ================= COMPACT CONTENT ================= */}
      <div className="max-w-4xl mx-auto rounded-3xl bg-[var(--card-bg)] border border-[var(--card-border)] shadow-xl p-6 md:p-8 backdrop-blur-xl hover:border-amber-500/30 transition-all duration-300 group">

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">

          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-mono text-amber-500 uppercase tracking-wider mb-5 font-bold shadow-sm">
              <FaGraduationCap className="text-sm" />
              <span>Undergraduate Degree</span>
            </div>

            <h3 className="font-['Anton'] text-3xl sm:text-4xl text-[var(--text-main)] tracking-tight leading-tight mb-3">
              Bachelor of Computer Applications (BCA)
            </h3>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 font-mono text-[11px] md:text-xs text-[var(--text-muted)] mb-6">
              <div className="flex items-center gap-1.5">
                <FaUniversity className="text-amber-500 text-sm" />
                <span>Sree Sabareesa College</span>
              </div>
              <span className="hidden sm:inline opacity-30">|</span>
              <div className="flex items-center gap-1.5">
                <FiMapPin className="text-amber-500 text-sm" />
                <span>MG University, Kerala</span>
              </div>
            </div>

            <p className="text-sm text-[var(--text-muted)] font-sans leading-relaxed max-w-2xl border-l-2 border-amber-500 pl-4 py-1.5 italic bg-[var(--badge-bg)] rounded-r-lg shadow-sm">
              "Graduated with First Class Distinction. Intensive program covering software engineering, object-oriented programming, data structures, and database management systems."
            </p>
          </div>

          <div className="flex flex-row md:flex-col gap-3 shrink-0 border-t md:border-t-0 md:border-l border-[var(--border-subtle)] pt-5 md:pt-0 md:pl-6">
            <div className="flex items-center gap-3 font-mono text-xs text-[var(--text-main)]">
              <div className="w-8 h-8 rounded-lg bg-[var(--badge-bg)] border border-[var(--badge-border)] flex items-center justify-center shadow-sm">
                <FiCalendar className="text-amber-500 text-sm" />
              </div>
              <span className="font-semibold tracking-wide">2021 — 2024</span>
            </div>
            <div className="flex items-center gap-3 font-mono text-[10px] text-emerald-500">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-sm">
                <FiAward className="text-emerald-500 text-sm" />
              </div>
              <span className="font-bold tracking-widest uppercase">Verified</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
