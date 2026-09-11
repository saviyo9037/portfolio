import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { FiArrowUpRight, FiLayers, FiZap, FiCpu, FiTerminal, FiMapPin, FiCheckCircle, FiGithub, FiMail } from "react-icons/fi";
import saviyoImage from "../assets/saviyo.jpeg";

// Animated counter hook
function useCounter(target, duration = 1800, isVisible = true) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const numericTarget = parseInt(target, 10);
    if (isNaN(numericTarget)) return;

    const startTime = performance.now();
    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numericTarget));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [target, duration, isVisible]);

  return count;
}

function About() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  const imageRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: (y - 0.5) * -16,
      y: (x - 0.5) * 16,
    });
    setGlare({ x: x * 100, y: y * 100 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50 });
  };

  const engineeringPillars = [
    {
      icon: FiLayers,
      tag: "01 // ARCHITECTURE",
      title: "Enterprise Modularity",
      desc: "Architecting 40+ reusable, accessible UI components and modular ERP sub-systems that decouple business logic from presentation.",
    },
    {
      icon: FiZap,
      tag: "02 // PERFORMANCE",
      title: "Reactive State & Caching",
      desc: "Deploying TanStack React Query for aggressive multi-tier caching, optimistic mutations, and resilient real-time server synchronization.",
    },
    {
      icon: FiCpu,
      tag: "03 // IOT & HARDWARE",
      title: "Peripherals & WebSockets",
      desc: "Direct WebSocket hardware communication, custom receipt templates, ESC/POS thermal printing, and barcode automation in live retail environments.",
    },
    {
      icon: FiTerminal,
      tag: "04 // BACKEND CRAFT",
      title: "Full-Stack Security & APIs",
      desc: "Engineering scalable MongoDB schemas, JWT authentication, role-based access control (RBAC), and robust Express REST endpoints.",
    },
  ];

  const stats = [
    { number: 1, suffix: "+", label: "Years Enterprise Exp", sub: "Production Systems at D3innovatives" },
    { number: 10, suffix: "+", label: "Shipped Modules", sub: "ERP, POS, CRM, and Web Platforms" },
    { number: 40, suffix: "+", label: "Reusable Components", sub: "Accessible React & TypeScript UI" },
    { number: 100, suffix: "%", label: "Code Integrity", sub: "Strict TypeScript, Git & CI/CD Discipline" },
  ];

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section className="relative overflow-hidden bg-[var(--bg-base)]">
      {/* Ambient background glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[550px] pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255,255,255,0.08) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div className="container-custom section-padding relative z-10">
        {/* Section Label Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-10 md:mb-16"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-[var(--accent)] font-medium bg-[var(--glass-bg)] px-4 py-2 rounded-full border border-[var(--glass-border)] backdrop-blur-md">
            (02)
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
            Architectural Dossier
          </span>
        </motion.div>

        {/* Section Headline */}
        <div className="mb-12 md:mb-16">
          <motion.h2
            className="text-5xl md:text-7xl lg:text-8xl font-['Anton'] uppercase leading-[0.9] tracking-tight mb-4"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-transparent text-stroke">The Engineer</span>{" "}
            <span className="text-[var(--text-main)] drop-shadow-[0_0_30px_rgba(255,255,255,0.12)]">& The Craft</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-sm md:text-base text-[var(--text-muted)] font-mono max-w-2xl"
          >
            Bridging high-throughput web system architecture with modern product engineering, strict TypeScript contracts, and physical hardware integrations.
          </motion.p>
        </div>

        {/* TOP ROW: Bento Grid of Hero Bio + 3D Holographic Portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12 md:mb-16">
          {/* LEFT: Identity Dossier Card (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 p-6 md:p-10 rounded-2xl bg-[var(--bg-surface)]/80 border border-[var(--border-subtle)] backdrop-blur-md flex flex-col justify-between hover:border-[var(--accent)]/30 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden group"
          >
            {/* Top ambient highlight */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div>
              {/* Header Status Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[var(--border-subtle)]/70">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Active In Production @ D3innovatives
                </span>
                <span className="text-[11px] font-mono text-[var(--text-dim)] uppercase tracking-widest">
                  SYS_ID: SG-2026 // KERALA
                </span>
              </div>

              {/* Persona Header */}
              <div className="mb-6">
                <h3 className="text-3xl md:text-5xl font-['Anton'] uppercase text-white tracking-wide mb-2">
                  Saviyo George
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm font-mono text-[var(--text-muted)]">
                  <span className="text-[var(--accent)] font-semibold">Full Stack Developer</span>
                  <span className="text-[var(--text-dim)]">·</span>
                  <span className="flex items-center gap-1">
                    <FiMapPin className="text-[var(--accent)] text-xs" />
                    Kerala, India (IST • UTC+5:30)
                  </span>
                </div>
              </div>

              {/* Core Manifesto Statement */}
              <p className="text-base md:text-xl text-[var(--text-main)] font-normal leading-relaxed mb-6 font-sans">
                I engineer web applications that excel in production environments. From mission-critical ERP & POS architectures to responsive, accessible client interfaces.
              </p>

              {/* Bio Narrative */}
              <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed mb-8">
                Holding a Bachelor of Computer Applications (BCA with Distinction) from MG University and actively shipping software at <strong className="text-white">D3innovatives</strong>, I specialize in combining modern React and TypeScript client ecosystems with performant Express/MongoDB backends and physical IoT hardware (ESC/POS thermal printers, barcoding).
              </p>
            </div>

            {/* Quick Spec Pills & CTA */}
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 pt-5 border-t border-[var(--border-subtle)]/70">
                <div className="p-3 rounded-lg bg-[var(--bg-base)] border border-[var(--border-subtle)]">
                  <span className="block text-[10px] font-mono uppercase text-[var(--text-dim)]">Specialty</span>
                  <span className="text-xs font-semibold text-white font-mono">ERP, POS & MERN</span>
                </div>
                <div className="p-3 rounded-lg bg-[var(--bg-base)] border border-[var(--border-subtle)]">
                  <span className="block text-[10px] font-mono uppercase text-[var(--text-dim)]">Education</span>
                  <span className="text-xs font-semibold text-white font-mono">BCA Distinction</span>
                </div>
                <div className="p-3 rounded-lg bg-[var(--bg-base)] border border-[var(--border-subtle)] col-span-2 sm:col-span-1">
                  <span className="block text-[10px] font-mono uppercase text-[var(--text-dim)]">Status</span>
                  <span className="text-xs font-semibold text-emerald-400 font-mono">Open For Selective Work</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => handleScrollTo("contact")}
                  className="px-6 py-3 rounded-full bg-[var(--text-main)] text-[var(--bg-base)] text-xs font-bold font-mono uppercase tracking-widest hover:scale-105 hover:bg-white transition-all shadow-lg flex items-center gap-2"
                >
                  <span>Initiate Collaboration</span>
                  <FiArrowUpRight className="text-sm" />
                </button>

                <button
                  onClick={() => handleScrollTo("experience")}
                  className="px-6 py-3 rounded-full bg-white/5 border border-[var(--border-subtle)] text-[var(--text-main)] text-xs font-bold font-mono uppercase tracking-widest hover:border-[var(--accent)] hover:bg-white/10 transition-all flex items-center gap-2"
                >
                  <span>Explore Track Record</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: 3D Holographic Portrait Dossier Card (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-center justify-center"
          >
            <div className="w-full h-full perspective-[1600px] flex items-center justify-center">
              <motion.div
                ref={imageRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                animate={{ rotateX: tilt.x, rotateY: tilt.y }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="relative w-full max-w-md aspect-[4/5] rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--accent)]/50 transition-colors duration-500 overflow-hidden shadow-2xl group transform-style-3d"
              >
                {/* Viewfinder Corner Brackets */}
                <span className="absolute top-4 left-4 font-mono text-[10px] text-white/40 select-none z-30">┌</span>
                <span className="absolute top-4 right-4 font-mono text-[10px] text-white/40 select-none z-30">┐</span>
                <span className="absolute bottom-4 left-4 font-mono text-[10px] text-white/40 select-none z-30">└</span>
                <span className="absolute bottom-4 right-4 font-mono text-[10px] text-white/40 select-none z-30">┘</span>

                {/* Top Telemetry Header */}
                <div className="absolute top-4 left-0 right-0 px-7 flex items-center justify-between z-30 pointer-events-none">
                  <span className="text-[10px] font-mono tracking-widest text-white/70 bg-black/60 px-2 py-0.5 rounded border border-white/10 backdrop-blur-md">
                    SG.ARCH // 02
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-emerald-400 bg-black/60 px-2 py-0.5 rounded border border-emerald-500/20 backdrop-blur-md flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    LIVE
                  </span>
                </div>

                {/* Portrait Photo with Smooth Parallax & Grayscale Hover */}
                <div className="w-full h-full relative overflow-hidden">
                  <img
                    src={saviyoImage}
                    alt="Saviyo George"
                    className="w-full h-full object-cover object-center grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  {/* Subtle dark vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)] via-transparent to-black/30 pointer-events-none z-10" />
                </div>

                {/* Glare Sheen Reflection */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 mix-blend-overlay"
                  style={{
                    background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.45) 0%, transparent 60%)`,
                  }}
                />

                {/* Bottom HUD Telemetry Strip */}
                <div className="absolute bottom-4 left-4 right-4 z-30 bg-[var(--bg-surface)]/85 border border-[var(--border-subtle)] backdrop-blur-md rounded-xl p-3.5 transform-style-3d translate-z-[40px] shadow-xl">
                  <div className="flex items-center justify-between text-[11px] font-mono text-white mb-1">
                    <span className="font-semibold tracking-wider">SAVIYO GEORGE</span>
                    <span className="text-[var(--text-dim)]">MERN / TS</span>
                  </div>
                  <div className="text-[10px] font-mono text-[var(--text-muted)] flex items-center justify-between">
                    <span>D3INNOVATIVES // MALAPPURAM</span>
                    <span>9.98° N, 76.29° E</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* MIDDLE ROW: 4 Core Engineering Pillars (Bento Grid) */}
        <div className="mb-14 md:mb-20">
          <div className="mb-6 flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--text-dim)] font-semibold flex items-center gap-2">
              <span className="text-[var(--accent)]">◆</span>
              Core Engineering Pillars & Working Philosophy
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {engineeringPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="p-6 rounded-2xl bg-[var(--bg-surface)]/60 border border-[var(--border-subtle)] hover:border-[var(--accent)]/40 hover:bg-[var(--bg-elevated)] transition-all duration-300 backdrop-blur-sm group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[var(--bg-base)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--accent)] group-hover:scale-110 group-hover:border-[var(--accent)] transition-all duration-300">
                        <Icon className="text-lg" />
                      </div>
                      <span className="text-[10px] font-mono tracking-widest text-[var(--text-dim)]">
                        {pillar.tag}
                      </span>
                    </div>

                    <h4 className="text-lg font-['Anton'] uppercase tracking-wide text-white mb-2 group-hover:text-[var(--accent)] transition-colors">
                      {pillar.title}
                    </h4>

                    <p className="text-xs text-[var(--text-muted)] leading-relaxed font-sans group-hover:text-[var(--text-main)]/90 transition-colors">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[var(--border-subtle)]/50 flex items-center justify-between text-[10px] font-mono text-[var(--text-dim)]">
                    <span className="group-hover:text-[var(--accent)] transition-colors">STANDARD PROTOCOL</span>
                    <FiCheckCircle className="text-xs opacity-60 group-hover:opacity-100 group-hover:text-emerald-400 transition-all" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM ROW: Production Metrics Counters Strip */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-10 border-t border-[var(--border-subtle)]">
          {stats.map((stat, i) => (
            <StatCounterItem
              key={i}
              number={stat.number}
              suffix={stat.suffix}
              label={stat.label}
              sub={stat.sub}
              inView={statsInView}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const StatCounterItem = ({ number, suffix, label, sub, inView, delay }) => {
  const count = useCounter(number, 1800, inView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="p-5 md:p-6 rounded-xl bg-[var(--bg-surface)]/40 border border-[var(--border-subtle)] hover:border-[var(--accent)]/30 transition-all"
    >
      <div className="text-4xl md:text-6xl font-['Anton'] text-white tracking-tight mb-1 flex items-baseline">
        <span>{count}</span>
        <span className="text-[var(--accent)] text-3xl md:text-4xl ml-0.5">{suffix}</span>
      </div>
      <div className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-main)] mb-1">
        {label}
      </div>
      <div className="text-[11px] font-sans text-[var(--text-dim)] leading-tight">
        {sub}
      </div>
    </motion.div>
  );
};

export default About;

