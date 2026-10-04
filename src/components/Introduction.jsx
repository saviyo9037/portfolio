import React, { useState, useEffect, useRef } from "react";
import saviyoCutout from "../assets/saviyo-cutout.png";
import saviyoImage from "../assets/saviyo.jpeg";
import { FiTerminal, FiX, FiArrowUpRight, FiCheckCircle } from "react-icons/fi";
import { FaReact, FaNodeJs, FaPython } from "react-icons/fa";
import { SiTypescript, SiMongodb, SiTailwindcss } from "react-icons/si";

// Magnetic Button Component for snappy micro-interactions
function MagneticButton({ children, className = "", onClick, href, style = {}, ...props }) {
  const btnRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setOffset({ x: x * 0.28, y: y * 0.28 });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  const isAnchor = Boolean(href);
  const Component = isAnchor ? "a" : "button";

  return (
    <Component
      ref={btnRef}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition:
          offset.x === 0 && offset.y === 0
            ? "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s"
            : "transform 0.08s ease-out, background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s",
        ...style,
      }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}

function Introduction() {
  // Rotating skills / focus area
  const phrases = [
    "Enterprise ERP & POS Platforms",
    "Scalable MERN Architectures",
    "Hardware ESC/POS Bridges",
    "Realtime WebSockets & APIs",
    "High-Performance Reactive UIs",
  ];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [phraseVisible, setPhraseVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseVisible(false);
      setTimeout(() => {
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        setPhraseVisible(true);
      }, 240);
    }, 2500);
    return () => clearInterval(interval);
  }, [phrases.length]);

  // 3D Parallax Mouse Tracking for Cutout Portrait
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  const handleHeroMouseMove = (e) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    setMousePos({ x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) });
  };

  const handleHeroMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Smooth scroll helper
  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -60, duration: 1.2 });
    } else {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 60;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  // Interactive Developer Terminal Modal / Drawer
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const initialBootSequence = [
    { type: "cmd", text: "$ whoami" },
    { type: "out", text: "saviyo-george · full-stack developer · kerala, in" },
    { type: "cmd", text: "$ cat status.json" },
    { type: "out", text: '{ "role": "Full Stack Engineer", "company": "D3innovatives", "availability": "open" }' },
    { type: "cmd", text: "$ help" },
    { type: "hint", text: "try → skills · projects · contact · hire" },
  ];

  const [terminalLines, setTerminalLines] = useState(initialBootSequence);
  const [isPrinting, setIsPrinting] = useState(false);
  const terminalOutputRef = useRef(null);

  useEffect(() => {
    if (terminalOutputRef.current) {
      terminalOutputRef.current.scrollTop = terminalOutputRef.current.scrollHeight;
    }
  }, [terminalLines]);

  const runCommand = (cmdKey) => {
    if (isPrinting) return;

    let linesToPrint = [];
    if (cmdKey === "skills") {
      linesToPrint = [
        { type: "cmd", text: "$ skills" },
        { type: "out", text: "frontend → React.js, Next.js, TypeScript, Tailwind CSS, Redux" },
        { type: "out", text: "backend  → Node.js, Express.js, REST APIs, WebSockets" },
        { type: "out", text: "database → MongoDB, Mongoose ODM, MySQL, SQLite" },
        { type: "out", text: "hardware → ESC/POS Thermal Printing, QR/Barcode, PyInstaller" },
      ];
    } else if (cmdKey === "projects") {
      linesToPrint = [
        { type: "cmd", text: "$ projects" },
        { type: "out", text: "01. Enterprise ERP & POS System (Desktop & Web)" },
        { type: "out", text: "02. NOVA Voice OS Assistant (Python / React)" },
        { type: "out", text: "03. MoneyTrack Financial Dashboard" },
        { type: "out", text: "04. Apzxrtra LMS Platform" },
        { type: "out", text: "05. Betterinu LMS & Hospital Management" },
      ];
    } else if (cmdKey === "contact") {
      linesToPrint = [
        { type: "cmd", text: "$ contact" },
        { type: "out", text: "email → saviyogeorge903734@gmail.com" },
        { type: "out", text: "phone → +91 9037348073" },
        { type: "out", text: "location → Malappuram, Kerala, India" },
      ];
    } else if (cmdKey === "hire") {
      linesToPrint = [
        { type: "cmd", text: "$ ./hire-me" },
        { type: "ok", text: "✔ 1+ Years Enterprise Experience" },
        { type: "ok", text: "✔ 10+ Production Modules Deployed" },
        { type: "ok", text: "✔ Ready for High-Impact Roles" },
        { type: "hint", text: "→ Navigating to Contact Section..." },
      ];
    }

    if (linesToPrint.length === 0) return;

    setIsPrinting(true);
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < linesToPrint.length) {
        const nextItem = linesToPrint[idx];
        setTerminalLines((prev) => [...prev, nextItem]);
        idx++;
      } else {
        clearInterval(interval);
        setIsPrinting(false);
        if (cmdKey === "hire") {
          setTimeout(() => {
            setIsTerminalOpen(false);
            handleScrollTo("contact");
          }, 600);
        }
      }
    }, 200);
  };

  return (
    <section
      id="introduction"
      ref={heroRef}
      onMouseMove={handleHeroMouseMove}
      onMouseLeave={handleHeroMouseLeave}
      className="relative min-h-[92vh] lg:min-h-screen w-full flex flex-col justify-between overflow-hidden bg-transparent text-[#F0F0F0] select-none pt-24 sm:pt-28 pb-6"
    >
      {/* Custom Styles */}
      <style>{`
        .hero-title-solid {
          font-family: 'Anton', sans-serif;
          letter-spacing: -0.02em;
          line-height: 0.88;
          color: #FFFFFF;
          text-shadow: 0 10px 40px rgba(0, 0, 0, 0.8);
        }
        .hero-title-stroke {
          font-family: 'Anton', sans-serif;
          letter-spacing: -0.02em;
          line-height: 0.88;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.4);
          transition: -webkit-text-stroke 0.3s ease, color 0.3s ease;
        }
        @media (min-width: 1024px) {
          .hero-title-stroke {
            -webkit-text-stroke: 2px rgba(255, 255, 255, 0.45);
          }
        }
        .hero-title-stroke:hover {
          -webkit-text-stroke: 2px #39ff88;
          color: rgba(57, 255, 136, 0.05);
        }
        .text-stroke-marquee {
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.2);
        }
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-28s {
          display: flex;
          width: max-content;
          animation: marqueeScroll 28s linear infinite;
        }
        .animate-marquee-28s:hover {
          animation-play-state: paused;
        }
        .ambient-portrait-glow {
          background: radial-gradient(circle at 50% 55%, rgba(57, 255, 136, 0.18) 0%, rgba(99, 102, 241, 0.12) 40%, transparent 70%);
        }
      `}</style>

      {/* Background Ambient Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] ambient-portrait-glow pointer-events-none z-0 blur-2xl" />

      {/* ================= 1. GREETING & STATUS BADGE ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full text-center mb-2 sm:mb-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-lg">
          <span className="text-base sm:text-lg animate-bounce">👋</span>
          <span className="font-mono text-xs sm:text-sm font-medium text-slate-300">
            Hi, I'm <strong className="text-white font-bold tracking-wide">Saviyo George</strong> and I build
          </span>
          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#39ff88] animate-pulse" />
          <span className="hidden sm:inline-block font-mono text-[11px] text-[#39ff88] font-semibold">
            {phrases[phraseIndex]}
          </span>
        </div>
      </div>

      {/* ================= 2. BAZIL-INSPIRED 3D LAYERED HERO STAGE ================= */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center max-w-7xl mx-auto px-2 sm:px-6 w-full my-auto">
        <div className="relative w-full flex flex-col items-center justify-center">

          {/* LAYER A: Behind Portrait - Massive Top Line: "FULL STACK" */}
          <div
            className="w-full text-center z-[1] select-none"
            style={{
              transform: `translate3d(${mousePos.x * -12}px, ${mousePos.y * -8}px, 0)`,
              transition: "transform 0.15s ease-out",
            }}
          >
            <h1
              className="hero-title-solid text-[14vw] sm:text-[13vw] md:text-[11.5vw] lg:text-[10.5vw] uppercase tracking-tighter"
              style={{ fontSize: "clamp(3.8rem, 12.5vw, 11rem)" }}
            >
              FULL STACK
            </h1>
          </div>

          {/* LAYER B: Center Cutout Portrait */}
          <div
            className="absolute z-[10] bottom-[-5%] sm:bottom-[-6%] md:bottom-[-8%] pointer-events-none flex justify-center items-end"
            style={{
              transform: `translate3d(${mousePos.x * 16}px, ${mousePos.y * 10}px, 0) scale(${1 + Math.abs(mousePos.y) * 0.02})`,
              transition: "transform 0.12s ease-out",
            }}
          >
            <div className="relative w-[280px] sm:w-[380px] md:w-[460px] lg:w-[520px] max-h-[50vh] sm:max-h-[58vh] md:max-h-[64vh] flex items-end justify-center">
              {/* Subtle bottom fade to blend smoothly */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-90 z-[12] h-20 bottom-0 pointer-events-none" />

              <img
                src={saviyoCutout}
                alt="Saviyo George Cutout Portrait"
                className="w-full h-auto max-h-[50vh] sm:max-h-[58vh] md:max-h-[64vh] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] filter contrast-[1.04] brightness-[0.98]"
              />
            </div>
          </div>

          {/* LAYER C: In Front of Portrait - Massive Bottom Line: "& DEVELOPER" */}
          <div
            className="w-full text-center z-[20] select-none mt-[-2vw] sm:mt-[-3vw] md:mt-[-4vw]"
            style={{
              transform: `translate3d(${mousePos.x * -8}px, ${mousePos.y * -5}px, 0)`,
              transition: "transform 0.15s ease-out",
            }}
          >
            <h2
              className="hero-title-stroke text-[14vw] sm:text-[13vw] md:text-[11.5vw] lg:text-[10.5vw] uppercase tracking-tighter"
              style={{ fontSize: "clamp(3.8rem, 12.5vw, 11rem)" }}
            >
              &amp; DEVELOPER
            </h2>
          </div>

        </div>
      </div>

      {/* ================= 3. BALANCED SIDE DETAILS & CLIENT LOGOS ================= */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 w-full mb-6 mt-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">

          {/* Left Side Info: Location & Experience */}
          <div className="flex flex-col gap-1.5 text-center md:text-left">
            <div className="font-mono text-xs font-semibold text-white tracking-wider flex items-center justify-center md:justify-start gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>BASED IN KERALA, INDIA</span>
            </div>
            <p className="font-['Inter'] text-xs sm:text-sm text-slate-400 max-w-xs mx-auto md:mx-0">
              Open to selective enterprise roles &amp; high-scale web engineering projects worldwide.
            </p>
          </div>

          {/* Center: Dual Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* Primary CTA */}
            <MagneticButton
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo("contact");
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-wider border border-white hover:bg-[#39ff88] hover:border-[#39ff88] hover:text-black hover:shadow-[0_0_25px_rgba(57,255,136,0.4)] transition-all flex items-center justify-center gap-2 shadow-xl cursor-pointer"
            >
              <span>Need a developer</span>
              <span className="text-sm font-bold">→</span>
            </MagneticButton>

            {/* Secondary CTA */}
            <MagneticButton
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo("projects");
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/5 text-white font-mono text-xs font-bold uppercase tracking-wider border border-white/20 hover:border-white hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Explore projects</span>
              <FiArrowUpRight className="text-sm" />
            </MagneticButton>
          </div>

          {/* Right Side: Stack / Experience Badges */}
          <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
              CORE PRODUCTION STACK
            </span>
            <div className="flex items-center gap-3 text-slate-400">
              <span className="p-2 rounded-lg bg-white/5 border border-white/10 hover:text-cyan-400 hover:border-cyan-400/40 transition-colors" title="React.js">
                <FaReact className="text-lg" />
              </span>
              <span className="p-2 rounded-lg bg-white/5 border border-white/10 hover:text-emerald-400 hover:border-emerald-400/40 transition-colors" title="Node.js">
                <FaNodeJs className="text-lg" />
              </span>
              <span className="p-2 rounded-lg bg-white/5 border border-white/10 hover:text-blue-400 hover:border-blue-400/40 transition-colors" title="TypeScript">
                <SiTypescript className="text-lg" />
              </span>
              <span className="p-2 rounded-lg bg-white/5 border border-white/10 hover:text-emerald-500 hover:border-emerald-500/40 transition-colors" title="MongoDB">
                <SiMongodb className="text-lg" />
              </span>
              <span className="p-2 rounded-lg bg-white/5 border border-white/10 hover:text-cyan-300 hover:border-cyan-300/40 transition-colors" title="Tailwind CSS">
                <SiTailwindcss className="text-lg" />
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* ================= 4. MARQUEE STRIP & FLOATING TERMINAL TRIGGER ================= */}
      <div className="relative z-20 w-full mt-2">
        {/* Full-width marquee strip */}
        <div
          className="w-full border-t border-b border-white/10 py-3 sm:py-3.5 overflow-hidden bg-black/40 backdrop-blur-sm"
          aria-hidden="true"
        >
          <div className="animate-marquee-28s whitespace-nowrap opacity-60 select-none">
            {[1, 2, 3].map((rep) => (
              <span
                key={rep}
                className="font-['Anton'] uppercase tracking-wider text-stroke-marquee text-2xl sm:text-4xl px-4 inline-flex items-center gap-6"
              >
                <span>CREATIVE DEVELOPER</span>
                <span className="text-[#39ff88] text-lg font-mono">•</span>
                <span>BASED IN KERALA, INDIA</span>
                <span className="text-[#39ff88] text-lg font-mono">•</span>
                <span>MERN STACK ARCHITECT</span>
                <span className="text-[#39ff88] text-lg font-mono">•</span>
                <span>ENTERPRISE ERP &amp; POS SOLUTIONS</span>
                <span className="text-[#39ff88] text-lg font-mono">•</span>
              </span>
            ))}
          </div>
        </div>

        {/* Stats & Floating Terminal Trigger Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Quick Stats */}
          <div className="flex items-center gap-6 sm:gap-10">
            <div>
              <span className="font-['Anton'] text-xl sm:text-2xl text-white mr-1.5">1+</span>
              <span className="font-mono text-[10px] uppercase text-slate-400 tracking-wider">Years Exp</span>
            </div>
            <div className="w-[1px] h-4 bg-white/10" />
            <div>
              <span className="font-['Anton'] text-xl sm:text-2xl text-white mr-1.5">10+</span>
              <span className="font-mono text-[10px] uppercase text-slate-400 tracking-wider">Modules Shipped</span>
            </div>
            <div className="w-[1px] h-4 bg-white/10 hidden sm:block" />
            <div className="hidden sm:block">
              <span className="font-['Anton'] text-xl sm:text-2xl text-[#39ff88] mr-1.5">100%</span>
              <span className="font-mono text-[10px] uppercase text-slate-400 tracking-wider">Code Integrity</span>
            </div>
          </div>

          {/* Interactive Terminal Toggle Button */}
          <button
            onClick={() => setIsTerminalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/15 hover:border-[#39ff88] hover:text-[#39ff88] text-slate-300 font-mono text-xs font-semibold tracking-wider transition-all shadow-md cursor-pointer group"
          >
            <FiTerminal className="text-sm group-hover:rotate-12 transition-transform text-[#39ff88]" />
            <span>Interactive Terminal</span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-[#39ff88] text-[9px] font-bold">CLI</span>
          </button>
        </div>
      </div>

      {/* ================= 5. INTERACTIVE TERMINAL DRAWER / MODAL ================= */}
      {isTerminalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div
            className="w-full max-w-xl bg-[#121216]/95 border border-white/15 rounded-2xl p-5 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col justify-between animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Terminal Title Bar */}
            <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-4 select-none">
              {/* macOS dots */}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>

              {/* Title & Avatar */}
              <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
                <div className="w-[22px] h-[22px] rounded-full overflow-hidden border border-white/20">
                  <img src={saviyoImage} alt="Saviyo" className="w-full h-full object-cover" />
                </div>
                <span className="text-white font-medium">saviyo@kerala:~ (CLI)</span>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsTerminalOpen(false)}
                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close Terminal"
              >
                <FiX className="text-base" />
              </button>
            </div>

            {/* Terminal Output */}
            <div
              ref={terminalOutputRef}
              className="font-mono text-xs leading-relaxed overflow-y-auto mb-4 h-[260px] pr-2 text-slate-300 space-y-2 flex flex-col justify-start"
            >
              {terminalLines.map((line, idx) => {
                if (line.type === "cmd") {
                  const cmdParts = line.text.split(" ");
                  return (
                    <div key={idx} className="flex items-center gap-1.5 text-white font-semibold">
                      <span className="text-[#39ff88] font-bold">{cmdParts[0]}</span>
                      <span>{cmdParts.slice(1).join(" ")}</span>
                    </div>
                  );
                }
                if (line.type === "ok") {
                  return (
                    <div key={idx} className="text-[#39ff88] font-medium flex items-center gap-1.5">
                      <FiCheckCircle className="text-xs shrink-0" />
                      <span>{line.text}</span>
                    </div>
                  );
                }
                if (line.type === "hint") {
                  return (
                    <div key={idx} className="text-emerald-400/90 font-medium">
                      {line.text}
                    </div>
                  );
                }
                return (
                  <div key={idx} className="text-slate-300 pl-2 border-l border-white/10">
                    {line.text}
                  </div>
                );
              })}
              <div className="flex items-center gap-1 text-[#39ff88] pt-1">
                <span className="font-bold">$</span>
                <span className="animate-pulse text-sm">▍</span>
              </div>
            </div>

            {/* Terminal Actions */}
            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-2">
              <button
                onClick={() => runCommand("skills")}
                disabled={isPrinting}
                className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#39ff88] hover:text-[#39ff88] font-mono text-[11px] font-semibold text-slate-300 transition-colors disabled:opacity-50 cursor-pointer"
              >
                skills
              </button>
              <button
                onClick={() => runCommand("projects")}
                disabled={isPrinting}
                className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#39ff88] hover:text-[#39ff88] font-mono text-[11px] font-semibold text-slate-300 transition-colors disabled:opacity-50 cursor-pointer"
              >
                projects
              </button>
              <button
                onClick={() => runCommand("contact")}
                disabled={isPrinting}
                className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#39ff88] hover:text-[#39ff88] font-mono text-[11px] font-semibold text-slate-300 transition-colors disabled:opacity-50 cursor-pointer"
              >
                contact
              </button>
              <button
                onClick={() => runCommand("hire")}
                disabled={isPrinting}
                className="px-3.5 py-1.5 rounded-full bg-[#39ff88]/15 border border-[#39ff88]/40 hover:bg-[#39ff88] hover:text-black font-mono text-[11px] font-bold text-[#39ff88] transition-all ml-auto disabled:opacity-50 cursor-pointer shadow-[0_0_12px_rgba(57,255,136,0.2)]"
              >
                ./hire-me
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Introduction;
