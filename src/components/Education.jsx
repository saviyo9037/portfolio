import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import collegeImg from "../assets/college.png";
import {
  FiBookOpen,
  FiCode,
  FiCpu,
  FiAward,
  FiDatabase,
  FiShield,
  FiGlobe,
  FiBarChart2,
  FiMonitor,
  FiSettings,
  FiCalendar,
  FiMapPin,
  FiClock,
  FiCheckCircle,
  FiMaximize2,
  FiExternalLink,
  FiStar,
  FiTarget,
  FiLayers,
  FiX
} from "react-icons/fi";
import { FaGraduationCap, FaUniversity, FaQuoteRight } from "react-icons/fa";

export default function Education() {
  const [selectedPhoto, setSelectedPhoto] = useState(false);

  // Handle ESC key and prevent body scroll when photo modal is open
  useEffect(() => {
    if (!selectedPhoto) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setSelectedPhoto(false);
    };
    window.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [selectedPhoto]);

  const timelineSteps = [
    {
      year: "2021",
      title: "Started BCA",
      desc: "Joined Sree Sabareesa College Murikkumvayal",
      icon: FiBookOpen,
      accentText: "#8b7bff",
      borderGlow: "rgba(139,123,255,0.5)"
    },
    {
      year: "2022",
      title: "Core Learning",
      desc: "Data Structures, DBMS, OOP, Computer Networks",
      icon: FiSettings,
      accentText: "#22d3ee",
      borderGlow: "rgba(34,211,238,0.5)"
    },
    {
      year: "2023",
      title: "Practical Exposure",
      desc: "Web Technologies, Software Engineering, System Design",
      icon: FiCode,
      accentText: "#ff6ad5",
      borderGlow: "rgba(255,106,213,0.5)"
    },
    {
      year: "2024",
      title: "Graduated",
      desc: "Bachelor of Computer Applications",
      icon: FaGraduationCap,
      accentText: "#39ff88",
      borderGlow: "rgba(57,255,136,0.5)"
    }
  ];

  const keySubjects = [
    { title: "Data Structures & Algorithms", icon: FiDatabase },
    { title: "Computer Networks & Security", icon: FiShield },
    { title: "Object-Oriented Programming", icon: FiCode },
    { title: "Operating Systems", icon: FiMonitor },
    { title: "Database Management Systems", icon: FiLayers },
    { title: "Software Engineering", icon: FiSettings },
    { title: "Web Technologies", icon: FiGlobe },
    { title: "System Analysis & Design", icon: FiBarChart2 }
  ];

  return (
    <section id="education" className="relative w-full max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 text-[var(--text-main)] transition-colors duration-300">
      {/* Ambient background glow accents */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-violet-500/5 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* ================= SECTION HEADER ================= */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-6 border-b border-[var(--border-subtle)]">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 tracking-widest uppercase mb-3">
            <span className="w-4 h-[2px] bg-cyan-400" />
            <span>03 / EDUCATION</span>
          </div>
          <h2 className="font-['Anton'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight text-[var(--text-main)] leading-[0.95]">
            ACADEMIC{" "}
            <span
              className="text-transparent"
              style={{
                WebkitTextStroke: "1.5px var(--hero-title-stroke)",
              }}
            >
              BACKGROUND
            </span>
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-muted)] font-sans max-w-2xl mt-4 leading-relaxed">
            Formal undergraduate education in computer applications, systems analysis, algorithmic engineering, and software development methodologies.
          </p>
        </div>

        {/* Right Quote Block */}
        <div className="lg:max-w-xs p-4 rounded-xl bg-cyan-950/30 border-l-2 border-cyan-400 flex gap-3 items-start shrink-0 border border-cyan-500/20 shadow-sm">
          <FaQuoteRight className="text-cyan-400 text-lg shrink-0 mt-0.5 opacity-80" />
          <div className="font-mono text-[11px] leading-relaxed text-cyan-200 uppercase tracking-wider font-semibold">
            A STRONG ACADEMIC FOUNDATION FOR A BETTER TOMORROW
          </div>
        </div>
      </div>

      {/* ================= ROW 1: ACADEMIC JOURNEY & KEY SUBJECTS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">

        {/* LEFT (7 COLS): ACADEMIC JOURNEY TIMELINE */}
        <div className="lg:col-span-7 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] shadow-xl p-6 md:p-7 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between group hover:border-violet-500/50 transition-all duration-300">
          <div>
            <div className="flex items-center justify-between pb-5 mb-8 border-b border-white/10">
              <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-cyan-400 font-semibold">
                <div className="w-6 h-6 rounded-lg bg-cyan-950/40 flex items-center justify-center text-cyan-400">
                  <FiTarget className="text-sm" />
                </div>
                <span>ACADEMIC JOURNEY</span>
              </div>
              <span className="font-mono text-xs text-slate-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                Sep 2021 — Mar 2024
              </span>
            </div>

            {/* Horizontal Connected Timeline */}
            <div className="relative pt-2 pb-2">
              {/* Horizontal Connecting Track Line */}
              <div className="hidden md:block absolute top-[28px] left-[8%] right-[8%] h-[2px] bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 opacity-40 pointer-events-none" />

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-4 relative z-10">
                {timelineSteps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.year} className="flex flex-col group/item">
                      {/* Timeline Node Circle with Year */}
                      <div className="flex items-center gap-2 mb-3.5">
                        <div
                          className="w-4 h-4 rounded-full border-2 bg-[#121216] flex items-center justify-center shrink-0"
                          style={{
                            borderColor: step.accentText,
                            boxShadow: `0 0 10px ${step.borderGlow}`,
                          }}
                        >
                          <div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: step.accentText }}
                          />
                        </div>
                        <span
                          className="font-mono text-xs font-bold"
                          style={{ color: step.accentText }}
                        >
                          {step.year}
                        </span>
                      </div>

                      {/* Icon Box + Text Container */}
                      <div className="flex items-start gap-3">
                        <div
                          className="w-11 h-11 rounded-xl bg-white/5 border flex items-center justify-center shrink-0 transition-colors group-hover/item:bg-white/10 shadow-sm"
                          style={{
                            borderColor: `${step.accentText}40`,
                            boxShadow: `0 0 10px ${step.borderGlow}`,
                          }}
                        >
                          <Icon className="text-lg" style={{ color: step.accentText }} />
                        </div>

                        {/* Title & Desc */}
                        <div className="min-w-0 flex-1">
                          <div
                            className="text-white font-bold text-[15px] leading-snug group-hover/item:text-cyan-400 transition-colors"
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              textTransform: "none",
                              letterSpacing: "-0.01em",
                            }}
                          >
                            {step.title}
                          </div>
                          <div
                            className="text-xs text-slate-400 leading-relaxed mt-1"
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              textTransform: "none",
                              letterSpacing: "normal",
                            }}
                          >
                            {step.desc}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT (5 COLS): KEY SUBJECTS & AREAS OF LEARNING */}
        <div className="lg:col-span-5 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] shadow-xl p-6 md:p-7 backdrop-blur-xl flex flex-col justify-between group hover:border-cyan-500/50 transition-all duration-300">
          <div>
            <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-[var(--border-subtle)] font-mono text-xs uppercase tracking-wider text-violet-400 font-semibold">
              <div className="w-6 h-6 rounded-lg bg-violet-950/40 flex items-center justify-center text-violet-400">
                <FiBookOpen className="text-sm" />
              </div>
              <span>KEY SUBJECTS &amp; AREAS OF LEARNING</span>
            </div>

            {/* 2-Column Subject Grid with Bold Crisp Text */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {keySubjects.map((sub) => {
                const Icon = sub.icon;
                return (
                  <div
                    key={sub.title}
                    className="p-3 rounded-xl bg-[var(--badge-bg)] border border-[var(--badge-border)] hover:border-cyan-400/60 hover:opacity-90 transition-all duration-200 flex items-center gap-3 group/sub shadow-sm"
                  >
                    <div className="w-8 h-8 rounded-lg bg-cyan-950/40 text-cyan-400 flex items-center justify-center shrink-0 group-hover/sub:bg-cyan-500 group-hover/sub:text-black transition-all">
                      <Icon className="text-sm" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-sans font-semibold text-xs sm:text-[13px] text-[var(--text-main)] group-hover/sub:text-cyan-400 transition-colors leading-snug">
                        {sub.title}
                      </div>
                      <div className="font-mono text-[10px] text-[var(--text-muted)] mt-0.5">
                        {sub.highlight}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      {/* ================= ROW 2: COLLEGE DETAILS & DEGREE VERIFICATION ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">

        {/* LEFT (7 COLS): COLLEGE PHOTO & DEGREE DETAILS */}
        <div className="lg:col-span-7 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] shadow-xl p-6 md:p-7 group hover:border-cyan-500/50 transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">

            {/* Campus Photo on the Left (5 Cols) */}
            <div className="md:col-span-5 relative rounded-xl overflow-hidden border border-white/10 group/img aspect-[4/3] bg-slate-900 shadow-md">
              <img
                src={collegeImg}
                alt="Sree Sabareesa College Campus"
                className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              {/* Bottom location pill */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 p-2 rounded-lg bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-between text-left">
                <div className="flex items-center gap-2 min-w-0">
                  <FiMapPin className="text-cyan-400 text-xs shrink-0" />
                  <div className="min-w-0">
                    <div className="font-sans font-semibold text-[11px] text-white truncate leading-none">
                      Sree Sabareesa College
                    </div>
                    <div className="font-mono text-[9px] text-slate-400 truncate mt-0.5">
                      Murikkumvayal, Kottayam, Kerala
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPhoto(true)}
                  aria-label="Expand photo"
                  className="w-6 h-6 rounded-md bg-white/20 hover:bg-cyan-400 hover:text-black flex items-center justify-center text-white transition-colors shrink-0 ml-1.5"
                >
                  <FiMaximize2 className="text-[10px]" />
                </button>
              </div>
            </div>

            {/* Details on the Right (7 Cols) */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-3.5">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-violet-950/40 border border-violet-500/30 text-[10px] font-mono text-violet-300 uppercase tracking-wider mb-2 font-semibold">
                  <FaGraduationCap className="text-xs" />
                  <span>UNDERGRADUATE DEGREE</span>
                </div>

                <h3 className="font-['Anton'] text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                  Bachelor of Computer Applications (BCA)
                </h3>

                <div className="flex items-start gap-2 mt-2 text-xs text-slate-300">
                  <FaUniversity className="text-cyan-400 text-sm shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">Sree Sabareesa College Murikkumvayal</span>
                    <span className="block font-mono text-[11px] text-slate-400 mt-0.5">
                      Affiliated with Mahatma Gandhi University, Kerala
                    </span>
                  </div>
                </div>
              </div>

              {/* 3 Meta Pills */}
              <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-[10px]">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-slate-400 flex items-center gap-1">
                    <FiCalendar className="text-violet-400" />
                    <span>Duration</span>
                  </div>
                  <div className="text-white font-semibold mt-1">2021 – 2024</div>
                </div>
                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-slate-400 flex items-center gap-1">
                    <FiMapPin className="text-cyan-400" />
                    <span>Location</span>
                  </div>
                  <div className="text-white font-semibold mt-1 truncate">Kottayam</div>
                </div>
                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-slate-400 flex items-center gap-1">
                    <FiClock className="text-emerald-400" />
                    <span>Type</span>
                  </div>
                  <div className="text-white font-semibold mt-1">Full-Time</div>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-sans pt-1">
                Three-year intensive undergraduate degree in Computer Applications providing strong theoretical foundations in computer science alongside practical application development, algorithm design, and database systems.
              </p>
            </div>

          </div>
        </div>

        {/* RIGHT (5 COLS): DEGREE VERIFICATION */}
        <div className="lg:col-span-5 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] shadow-xl p-6 md:p-7 backdrop-blur-xl flex flex-col justify-between group hover:border-emerald-500/50 transition-all duration-300">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-emerald-400 font-semibold">
                <FiShield className="text-sm" />
                <span>DEGREE VERIFICATION</span>
              </div>
              <span className="font-mono text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 font-bold">
                <FiCheckCircle className="text-xs" />
                Verified
              </span>
            </div>

            <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-6 font-sans">
              Bachelor of Computer Applications (BCA) awarded by Mahatma Gandhi University, Kerala with First Class Distinction.
            </p>

            {/* University Card Strip */}
            <div className="p-4 rounded-xl bg-[var(--badge-bg)] border border-[var(--badge-border)] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400 shadow-sm">
                  <FaUniversity className="text-xl" />
                </div>
                <div className="min-w-0">
                  <div className="font-sans font-bold text-sm text-[var(--text-main)] truncate">
                    Mahatma Gandhi University
                  </div>
                  <div className="font-mono text-xs text-[var(--text-muted)] truncate mt-0.5">
                    Kottayam, Kerala
                  </div>
                </div>
              </div>

              <a
                href="https://www.mgu.ac.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-lg bg-[var(--btn-cta-bg)] text-[var(--btn-cta-text)] border border-[var(--border-subtle)] hover:opacity-85 transition-all shrink-0 font-medium shadow-sm"
              >
                <span>View Details</span>
                <FiExternalLink className="text-xs" />
              </a>
            </div>
          </div>

          <div className="pt-4 mt-6 border-t border-[var(--border-subtle)] flex items-center justify-between font-mono text-[11px] text-[var(--text-muted)]">
            <span>ACADEMIC CREDENTIAL</span>
            <span className="text-emerald-400 font-bold">DISTINCTION CONFERRED</span>
          </div>
        </div>

      </div>

      {/* ================= ROW 3: BOTTOM 4 STATS BAR ================= */}
      <div className="rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] shadow-xl p-5 md:p-6 backdrop-blur-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-[var(--border-subtle)]">

          {/* Stat 1 */}
          <div className="flex items-center gap-3.5 pt-2 md:pt-0 md:px-4">
            <div className="w-10 h-10 rounded-xl bg-violet-950/40 text-violet-400 flex items-center justify-center shrink-0">
              <FaGraduationCap className="text-lg" />
            </div>
            <div>
              <div className="font-['Anton'] text-xl text-[var(--text-main)] tracking-wide leading-none">
                3 Years
              </div>
              <div className="font-mono text-[11px] text-[var(--text-muted)] mt-1">
                Full-Time Program
              </div>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="flex items-center gap-3.5 pt-4 md:pt-0 md:px-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/40 text-cyan-400 flex items-center justify-center shrink-0">
              <FiBookOpen className="text-lg" />
            </div>
            <div>
              <div className="font-['Anton'] text-xl text-[var(--text-main)] tracking-wide leading-none">
                8+
              </div>
              <div className="font-mono text-[11px] text-[var(--text-muted)] mt-1">
                Core Subjects
              </div>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="flex items-center gap-3.5 pt-4 md:pt-0 md:px-4">
            <div className="w-10 h-10 rounded-xl bg-pink-950/40 text-pink-400 flex items-center justify-center shrink-0">
              <FiStar className="text-lg" />
            </div>
            <div>
              <div className="font-['Anton'] text-xl text-white tracking-wide leading-none">
                Strong
              </div>
              <div className="font-mono text-[11px] text-slate-400 mt-1">
                Theoretical &amp; Practical Foundation
              </div>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="flex items-center gap-3.5 pt-4 md:pt-0 md:px-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/40 text-emerald-400 flex items-center justify-center shrink-0">
              <FiTarget className="text-lg" />
            </div>
            <div>
              <div className="font-['Anton'] text-xl text-white tracking-wide leading-none">
                Career Ready
              </div>
              <div className="font-mono text-[11px] text-slate-400 mt-1">
                For Tech Industry Roles
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Lightbox Modal for Campus Photo with Dedicated Floating Close Button */}
      {selectedPhoto &&
        typeof document !== "undefined" &&
        ReactDOM.createPortal(
          <div
            className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedPhoto(false)}
          >
            {/* Dedicated Big Floating Close Button on Top-Right */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPhoto(false);
              }}
              className="fixed top-5 right-5 sm:top-8 sm:right-8 z-[100000] w-12 h-12 rounded-full bg-black/70 hover:bg-rose-500 text-white border border-white/20 flex items-center justify-center transition-all shadow-[0_0_25px_rgba(0,0,0,0.8)] cursor-pointer group"
              aria-label="Close photo"
            >
              <FiX className="text-2xl group-hover:scale-110 transition-transform" />
            </button>

            {/* Modal Dialog Card */}
            <div
              className="relative max-w-4xl w-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-[#0e0e14] my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Header Bar */}
              <div className="p-4 bg-[#12121a] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0 pr-4">
                  <FiMapPin className="text-[#22d3ee] text-sm shrink-0" />
                  <span className="font-sans font-bold text-sm text-white truncate">
                    Sree Sabareesa College Murikkumvayal
                  </span>
                </div>
                <button
                  onClick={() => setSelectedPhoto(false)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-rose-500 text-white font-mono text-xs transition-colors shrink-0 cursor-pointer"
                >
                  <FiX className="text-sm" />
                  <span>CLOSE [ESC]</span>
                </button>
              </div>

              {/* Campus Image */}
              <div className="relative max-h-[72vh] overflow-hidden flex items-center justify-center bg-black">
                <img
                  src={collegeImg}
                  alt="Sree Sabareesa College Campus"
                  className="w-full h-auto max-h-[72vh] object-contain"
                />
              </div>

              {/* Bottom Footer Info Bar */}
              <div className="p-3.5 bg-[#0e0e14] border-t border-white/10 flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[#9a9a9a]">
                <span>Murikkumvayal, Kottayam, Kerala · Mahatma Gandhi University</span>
                <span className="text-[#22d3ee]">Bachelor of Computer Applications (BCA)</span>
              </div>
            </div>
          </div>,
          document.body
        )}

    </section>
  );
}
