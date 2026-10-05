import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import saviyoCutout from "../assets/saviyo-cutout.png";
import {
  FiArrowUpRight,
  FiArrowRight,
  FiTerminal,
  FiX,
  FiPlus,
} from "react-icons/fi";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiTypescript, SiMongodb, SiNextdotjs, SiTailwindcss } from "react-icons/si";
import { LuBox, LuAudioWaveform, LuLightbulb } from "react-icons/lu";

// Magnetic Button component for tactile micro-interactions
function MagneticButton({ children, className = "", onClick, href, style = {}, ...props }) {
  const btnRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setOffset({ x: x * 0.22, y: y * 0.22 });
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
  // 3D Parallax Mouse Tracking
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

  // Interactive Developer AI / CLI Terminal Modal
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const initialBootSequence = [
    { type: "cmd", text: "$ whoami" },
    { type: "out", text: "saviyo-george · full-stack developer · kerala, in" },
    { type: "cmd", text: "$ cat status.json" },
    { type: "out", text: '{ "role": "Full-Stack & Software Builder", "status": "Ready to build" }' },
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
        { type: "out", text: "frontend → React.js, Next.js, TypeScript, Tailwind CSS" },
        { type: "out", text: "backend  → Node.js, Express.js, REST APIs, WebSockets" },
        { type: "out", text: "database → MongoDB, Mongoose ODM, MySQL" },
        { type: "out", text: "software → ERP/POS Systems, CRM, LMS, AI Tools" },
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
        { type: "ok", text: "✔ Available for Full-Time, Freelance & Remote" },
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
    }, 180);
  };

  return (
    <div
      ref={heroRef}
      onMouseMove={handleHeroMouseMove}
      onMouseLeave={handleHeroMouseLeave}
      className="relative w-full min-h-screen bg-[var(--bg-base)] text-[var(--text-main)] overflow-hidden flex flex-col justify-between pt-24 sm:pt-28 select-none transition-colors duration-300"
    >
      {/* ================= CUSTOM EMBEDDED STYLES ================= */}
      <style>{`
        .hero-tech-grid {
          background-image: 
            linear-gradient(to right, var(--border-subtle) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border-subtle) 1px, transparent 1px);
          background-size: 56px 56px;
        }
        .hero-solid-text {
          font-family: 'Anton', sans-serif;
          letter-spacing: -0.025em;
          line-height: 0.88;
          color: var(--hero-title-solid);
          transition: color 0.3s ease;
        }
        .hero-stroked-text {
          font-family: 'Anton', sans-serif;
          letter-spacing: -0.025em;
          line-height: 0.88;
          color: transparent;
          -webkit-text-stroke: 1.8px var(--hero-title-stroke);
          transition: -webkit-text-stroke 0.3s ease, color 0.3s ease;
        }
        @media (min-width: 1024px) {
          .hero-stroked-text {
            -webkit-text-stroke: 2.2px var(--hero-title-stroke);
          }
        }
        .hero-glowing-stroke {
          font-family: 'Anton', sans-serif;
          letter-spacing: -0.025em;
          line-height: 0.88;
          color: transparent;
          -webkit-text-stroke: 1.8px #10b981;
          filter: drop-shadow(0 0 16px rgba(16, 185, 129, 0.45));
          transition: -webkit-text-stroke 0.3s ease, filter 0.3s ease;
        }
        @media (min-width: 1024px) {
          .hero-glowing-stroke {
            -webkit-text-stroke: 2.4px #10b981;
          }
        }
        .doodle-handwritten {
          font-family: 'Caveat', cursive, sans-serif;
        }
        .green-halo-aura {
          background: radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.42) 0%, rgba(16, 185, 129, 0.18) 40%, rgba(6, 182, 212, 0.08) 60%, transparent 75%);
        }
        .ambient-rock-glow {
          background: radial-gradient(ellipse at bottom, rgba(16, 185, 129, 0.12) 0%, transparent 70%);
        }
      `}</style>

      {/* Background Tech Grid & Atmosphere */}
      <div className="absolute inset-0 hero-tech-grid pointer-events-none z-0 opacity-40" />

      {/* Ambient Volumetric Color Fog */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-emerald-500/12 blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-20 left-10 w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-0 inset-x-0 h-72 ambient-rock-glow pointer-events-none z-0" />

      {/* Decorative Technical Crosshairs dotted on the backdrop */}
      <div className="absolute top-36 left-[34%] text-[var(--text-dim)]/40 font-mono text-xs select-none pointer-events-none hidden lg:block">
        +
      </div>
      <div className="absolute top-44 right-[28%] text-emerald-500/50 font-mono text-sm select-none pointer-events-none hidden lg:block">
        +
      </div>
      <div className="absolute top-1/2 right-[12%] text-[var(--text-dim)]/40 font-mono text-xs select-none pointer-events-none hidden lg:block">
        +
      </div>
      <div className="absolute bottom-40 left-[8%] text-emerald-500/40 font-mono text-xs select-none pointer-events-none hidden lg:block">
        +
      </div>

      {/* ================= MAIN HERO BODY ================= */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 w-full flex-1 flex flex-col justify-center my-auto py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">

          {/* ================= LEFT COLUMN: VERTICAL RAIL + HEADLINE & CTAS ================= */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-start gap-4 sm:gap-6">

              {/* Far Left Vertical Step Rail [01] */}
              <div className="hidden sm:flex flex-col items-center pt-1.5 select-none shrink-0 pr-1">
                <span className="font-mono text-sm font-extrabold text-[#10b981] drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">
                  01
                </span>
                <div className="w-[1.5px] h-10 bg-emerald-500/50 my-2.5" />
                <div className="flex flex-col items-center gap-1.5 font-mono text-[9px] font-bold text-[var(--text-dim)] uppercase tracking-[0.2em] leading-none py-1">
                  <span>CODE</span>
                  <span>BUILD</span>
                  <span>SOLVE</span>
                  <span>AUTOMATE</span>
                  <span>GROW</span>
                </div>
              </div>

              {/* Main Left Content */}
              <div className="flex-1 max-w-2xl">

                {/* Top Breadcrumb Tag: 01 / SOFTWARE ENGINEERING & KERALA • INDIA */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="flex items-center gap-4 sm:gap-6 mb-4 sm:mb-5 flex-wrap"
                >
                  <div className="inline-flex items-center gap-2 relative pb-1">
                    <span className="font-mono text-xs sm:text-[13px] tracking-wider text-[var(--text-muted)] font-semibold uppercase">
                      <span className="text-[#10b981] font-bold">01</span> / SOFTWARE ENGINEERING
                    </span>
                    {/* Emerald accent underline bar */}
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-emerald-500 to-transparent" />
                  </div>

                  <div className="inline-flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981] animate-pulse" />
                    <span className="font-mono text-xs sm:text-[13px] tracking-wider text-[var(--text-dim)] font-semibold uppercase">
                      KERALA • INDIA
                    </span>
                  </div>
                </motion.div>

                {/* Massive 3-Tier Display Headline */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                  className="space-y-1 sm:space-y-2 mb-6 sm:mb-7"
                >
                  {/* Line 1: FULL-STACK (Solid bold) */}
                  <h1 className="hero-solid-text text-[13.5vw] sm:text-[10vw] md:text-[8.5vw] lg:text-[5.4rem] xl:text-[6.8rem] tracking-tight">
                    FULL-STACK
                  </h1>

                  {/* Line 2: & SOFTWARE (Stroked) */}
                  <h2 className="hero-stroked-text text-[13.5vw] sm:text-[10vw] md:text-[8.5vw] lg:text-[5.4rem] xl:text-[6.8rem] tracking-tight">
                    &amp; SOFTWARE
                  </h2>

                  {/* Line 3: BUILDER (Glowing Stroked with Cyan/Emerald Hue) */}
                  <h2 className="hero-glowing-stroke text-[13.5vw] sm:text-[10vw] md:text-[8.5vw] lg:text-[5.4rem] xl:text-[6.8rem] tracking-tight">
                    BUILDER
                  </h2>
                </motion.div>

                {/* Subtitle Bio Paragraph */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                  className="text-[var(--text-muted)] font-['Inter'] text-sm sm:text-base leading-relaxed max-w-xl mb-7 sm:mb-8 font-normal"
                >
                  I build production-ready web applications, ERP/POS systems, CRM &amp; LMS platforms,
                  AI-powered tools and custom business software that{" "}
                  <strong className="text-[#10b981] font-semibold underline decoration-emerald-400/50 underline-offset-4">
                    solve real problems
                  </strong>.
                </motion.p>

                {/* Action Buttons: White pill CTA + Transparent secondary CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                  className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6"
                >
                  {/* Primary CTA (View My Work) */}
                  <MagneticButton
                    href="#projects"
                    onClick={(e) => {
                      e.preventDefault();
                      handleScrollTo("projects");
                    }}
                    className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[var(--btn-cta-bg)] text-[var(--btn-cta-text)] font-mono text-xs sm:text-[13px] font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow-xl group cursor-pointer border border-transparent"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981] group-hover:scale-125 transition-transform" />
                    <span>VIEW MY WORK</span>
                    <FiArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                  </MagneticButton>

                  {/* Secondary CTA (Work With Me) */}
                  <MagneticButton
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      handleScrollTo("contact");
                    }}
                    className="inline-flex items-center gap-1.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[var(--btn-sec-bg)] text-[var(--btn-sec-text)] font-mono text-xs sm:text-[13px] font-bold uppercase tracking-wider border border-[var(--btn-sec-border)] hover:border-[#10b981]/50 hover:bg-[var(--card-bg)] transition-all shadow-xs group cursor-pointer"
                  >
                    <span>WORK WITH ME</span>
                    <FiArrowUpRight className="text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </MagneticButton>
                </motion.div>

                {/* Availability Status Badge */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]"
                >
                  <span className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981] animate-pulse" />
                  <span>
                    <strong className="text-[var(--text-main)] font-semibold">Available for:</strong>{" "}
                    Full-Time • Freelance • Remote
                  </span>
                </motion.div>

              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: VISUAL COMPOSITION ================= */}
          <div className="lg:col-span-5 relative flex items-center justify-center pt-6 lg:pt-0">
            <div className="relative w-full max-w-[500px] sm:max-w-[560px] flex items-center justify-center">

              {/* Geometric Tech Backdrop: Intersecting Diagonal Chevron Glass Plates */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
                style={{
                  transform: `translate3d(${mousePos.x * 6}px, ${mousePos.y * 6}px, 0)`,
                  transition: "transform 0.3s ease-out",
                }}
              >
                {/* Large angled tech polygon / chevron */}
                <svg
                  viewBox="0 0 500 500"
                  className="w-full h-full opacity-35 text-emerald-500 overflow-visible"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon
                    points="60,20 440,80 400,480 80,420"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="4 6"
                    className="opacity-40"
                  />
                  <polygon
                    points="120,60 480,140 380,440 40,360"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="opacity-60"
                  />
                  <line x1="80" y1="40" x2="420" y2="460" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="opacity-30" />
                  <line x1="420" y1="40" x2="80" y2="460" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="opacity-30" />
                </svg>
              </div>

              {/* Volumetric Green Halo Aura behind head and shoulders */}
              <div
                className="absolute w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] rounded-full green-halo-aura pointer-events-none z-0"
                style={{
                  transform: `translate3d(${mousePos.x * 12}px, ${mousePos.y * 12}px, 0)`,
                  transition: "transform 0.25s ease-out",
                }}
              />

              {/* Hand-Drawn Doodle & Arrow (to the left of Saviyo's shoulder) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute -left-2 sm:left-4 top-4 sm:top-8 z-20 flex flex-col items-center pointer-events-none select-none"
                style={{
                  transform: `translate3d(${mousePos.x * -8}px, ${mousePos.y * -8}px, 0)`,
                  transition: "transform 0.2s ease-out",
                }}
              >
                <div className="doodle-handwritten text-emerald-400 text-lg sm:text-xl font-bold leading-tight -rotate-6 text-center drop-shadow-[0_0_12px_rgba(16,185,129,0.4)]">
                  <div>Build</div>
                  <div>Develop</div>
                  <div>Solve</div>
                  <div>Repeat</div>
                </div>

                {/* Hand-drawn curving arrow pointing down towards him */}
                <svg
                  width="70"
                  height="45"
                  viewBox="0 0 70 45"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mt-1 text-emerald-400"
                >
                  <path
                    d="M 12 6 C 25 24, 45 35, 62 25"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M 52 19 L 62 25 L 56 34"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>

              {/* Top Right Tech Wireframe Badge: TURNING IDEAS INTO SCALABLE SOFTWARE */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="absolute -right-2 sm:right-2 top-2 sm:top-6 z-20"
                style={{
                  transform: `translate3d(${mousePos.x * -10}px, ${mousePos.y * -10}px, 0)`,
                  transition: "transform 0.2s ease-out",
                }}
              >
                <div className="bg-[var(--hero-card-bg)] backdrop-blur-md border border-[var(--card-border)] rounded-lg p-3 sm:px-3.5 sm:py-3 shadow-xl flex items-start gap-2.5 max-w-[170px] sm:max-w-[190px]">
                  <div className="w-[3px] h-9 bg-emerald-500 rounded-full shrink-0 mt-0.5" />
                  <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[var(--text-main)] leading-snug">
                    TURNING IDEAS INTO SCALABLE SOFTWARE
                  </span>
                </div>
              </motion.div>

              {/* Middle Right Tech Services List with Green '+' Icon */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute -right-4 sm:-right-2 top-28 sm:top-32 z-20 hidden md:flex flex-col items-start font-mono text-[9px] tracking-widest text-[var(--text-dim)] uppercase space-y-1.5 select-none pointer-events-none"
                style={{
                  transform: `translate3d(${mousePos.x * -6}px, ${mousePos.y * -6}px, 0)`,
                  transition: "transform 0.2s ease-out",
                }}
              >
                <div className="text-emerald-400 font-bold text-sm mb-0.5 flex items-center gap-1">
                  <FiPlus className="text-base" />
                </div>
                <div className="hover:text-[var(--text-main)] transition-colors">WEB APPLICATIONS</div>
                <div className="hover:text-[var(--text-main)] transition-colors">ERP / POS SYSTEMS</div>
                <div className="hover:text-[var(--text-main)] transition-colors">CRM &amp; LMS PLATFORMS</div>
                <div className="hover:text-[var(--text-main)] transition-colors">AI TOOLS &amp; AUTOMATION</div>
                <div className="hover:text-[var(--text-main)] transition-colors">CUSTOM BUSINESS SOFTWARE</div>
              </motion.div>

              {/* Cutout Portrait Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-[300px] sm:w-[380px] md:w-[430px] h-[390px] sm:h-[470px] md:h-[530px] flex items-end justify-center overflow-visible"
                style={{
                  transform: `translate3d(${mousePos.x * 10}px, ${mousePos.y * 6}px, 0)`,
                  transition: "transform 0.15s ease-out",
                }}
              >
                <img
                  src={saviyoCutout}
                  alt="Saviyo George"
                  className="w-full h-full object-contain object-bottom drop-shadow-[0_25px_40px_rgba(0,0,0,0.65)] select-none pointer-events-none"
                  loading="eager"
                />
              </motion.div>

              {/* Subtle Monogram Watermark (Lower Right) */}
              <div className="absolute right-0 bottom-24 hidden lg:flex items-center gap-3 text-[var(--text-dim)]/40 pointer-events-none select-none z-10">
                <span className="font-['Anton'] text-3xl tracking-widest text-[var(--text-dim)]/30">SG</span>
                <div className="flex flex-col text-[8px] font-mono tracking-widest uppercase leading-tight">
                  <span>SOFTWARE SOLUTIONS</span>
                  <span>FOR A BETTER TOMORROW</span>
                </div>
              </div>

              {/* Floating Card: Core Stack / Technologies I Work With (Bottom Right) */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute -bottom-6 sm:-bottom-8 right-0 sm:right-0 z-20 w-[95%] sm:w-auto"
                style={{
                  transform: `translate3d(${mousePos.x * -6}px, ${mousePos.y * -6}px, 0)`,
                  transition: "transform 0.2s ease-out",
                }}
              >
                <div className="bg-[var(--hero-card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-2xl p-3 sm:p-4 shadow-2xl">
                  {/* Card Header: CORE STACK / TECHNOLOGIES I WORK WITH + AND MORE */}
                  <div className="flex items-center justify-between gap-4 mb-3 pb-2 border-b border-[var(--border-subtle)]">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981] animate-pulse" />
                      <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[var(--text-main)]">
                        CORE STACK <span className="opacity-40">/</span> TECHNOLOGIES I WORK WITH
                      </span>
                    </div>
                    <span className="font-mono text-[9px] text-[var(--text-dim)] hover:text-[#10b981] transition-colors cursor-pointer">
                      AND MORE +
                    </span>
                  </div>

                  {/* 6 Tech Icons Grid: React, Node.js, TypeScript, MongoDB, Next.js, Tailwind */}
                  <div className="grid grid-cols-6 gap-2 sm:gap-2.5">
                    {/* 1. React */}
                    <div
                      className="p-2 sm:p-2.5 rounded-xl bg-[var(--badge-bg)] border border-[var(--badge-border)] hover:border-[#0ea5e9]/50 hover:scale-105 transition-all text-center flex flex-col items-center gap-1 group cursor-pointer"
                      title="React.js"
                    >
                      <FaReact className="text-xl sm:text-2xl text-[#00d8ff] group-hover:scale-110 transition-transform" />
                      <span className="font-mono text-[8px] sm:text-[9px] text-[var(--text-muted)] font-medium">React</span>
                    </div>

                    {/* 2. Node.js */}
                    <div
                      className="p-2 sm:p-2.5 rounded-xl bg-[var(--badge-bg)] border border-[var(--badge-border)] hover:border-[#22c55e]/50 hover:scale-105 transition-all text-center flex flex-col items-center gap-1 group cursor-pointer"
                      title="Node.js"
                    >
                      <FaNodeJs className="text-xl sm:text-2xl text-[#22c55e] group-hover:scale-110 transition-transform" />
                      <span className="font-mono text-[8px] sm:text-[9px] text-[var(--text-muted)] font-medium">Node.js</span>
                    </div>

                    {/* 3. TypeScript */}
                    <div
                      className="p-2 sm:p-2.5 rounded-xl bg-[var(--badge-bg)] border border-[var(--badge-border)] hover:border-[#3178c6]/50 hover:scale-105 transition-all text-center flex flex-col items-center gap-1 group cursor-pointer"
                      title="TypeScript"
                    >
                      <SiTypescript className="text-xl sm:text-2xl text-[#3178c6] group-hover:scale-110 transition-transform" />
                      <span className="font-mono text-[8px] sm:text-[9px] text-[var(--text-muted)] font-medium">TypeScript</span>
                    </div>

                    {/* 4. MongoDB */}
                    <div
                      className="p-2 sm:p-2.5 rounded-xl bg-[var(--badge-bg)] border border-[var(--badge-border)] hover:border-[#10b981]/50 hover:scale-105 transition-all text-center flex flex-col items-center gap-1 group cursor-pointer"
                      title="MongoDB"
                    >
                      <SiMongodb className="text-xl sm:text-2xl text-[#10b981] group-hover:scale-110 transition-transform" />
                      <span className="font-mono text-[8px] sm:text-[9px] text-[var(--text-muted)] font-medium">MongoDB</span>
                    </div>

                    {/* 5. Next.js */}
                    <div
                      className="p-2 sm:p-2.5 rounded-xl bg-[var(--badge-bg)] border border-[var(--badge-border)] hover:border-[var(--text-main)]/50 hover:scale-105 transition-all text-center flex flex-col items-center gap-1 group cursor-pointer"
                      title="Next.js"
                    >
                      <SiNextdotjs className="text-xl sm:text-2xl text-[var(--text-main)] group-hover:scale-110 transition-transform" />
                      <span className="font-mono text-[8px] sm:text-[9px] text-[var(--text-muted)] font-medium">Next.js</span>
                    </div>

                    {/* 6. Tailwind CSS */}
                    <div
                      className="p-2 sm:p-2.5 rounded-xl bg-[var(--badge-bg)] border border-[var(--badge-border)] hover:border-[#06b6d4]/50 hover:scale-105 transition-all text-center flex flex-col items-center gap-1 group cursor-pointer"
                      title="Tailwind CSS"
                    >
                      <SiTailwindcss className="text-xl sm:text-2xl text-[#06b6d4] group-hover:scale-110 transition-transform" />
                      <span className="font-mono text-[8px] sm:text-[9px] text-[var(--text-muted)] font-medium">Tailwind</span>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM ROCK DETAILS & WIREFRAME BOX ================= */}
      <div className="relative w-full pointer-events-none select-none">
        {/* Left Bottom Wireframe Box (IDEAS / CODE / PRODUCTS / IMPACT) */}
        <div className="absolute bottom-2 left-6 sm:left-10 z-10 hidden sm:block">
          <div className="border border-[var(--border-subtle)] bg-[var(--card-bg)]/80 backdrop-blur-xs px-3 py-2 rounded-xs">
            <div className="font-mono text-[8px] tracking-[0.25em] text-[var(--text-dim)] uppercase leading-relaxed">
              <div>IDEAS</div>
              <div>CODE</div>
              <div>PRODUCTS</div>
              <div>IMPACT</div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM FEATURE STRIP & SCROLL PROMPT ================= */}
      <div className="relative z-20 w-full border-t border-b border-[var(--border-subtle)] bg-[var(--hero-ticker-bg)] backdrop-blur-md transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-3 sm:py-3.5 flex flex-wrap items-center justify-between gap-4">

          {/* Left Tech Slash */}
          <div className="hidden xl:flex items-center text-[var(--text-dim)] font-mono text-sm font-bold select-none pr-3 border-r border-[var(--border-subtle)]">
            //
          </div>

          {/* 4 Feature Columns */}
          <div className="flex-1 flex flex-wrap items-center justify-start lg:justify-between gap-4 sm:gap-6 text-left">

            {/* Feature 1: Full-Stack Development */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--badge-bg)] border border-[var(--badge-border)] flex items-center justify-center text-[var(--text-main)] font-mono font-bold text-xs shrink-0">
                &lt;/&gt;
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[11px] sm:text-xs font-bold text-[var(--text-main)] uppercase tracking-wider">
                  FULL-STACK DEVELOPMENT
                </span>
                <span className="font-['Inter'] text-[11px] sm:text-xs text-[var(--text-muted)]">
                  Modern Web Applications
                </span>
              </div>
            </div>

            {/* Dot Separator */}
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#10b981]" />

            {/* Feature 2: Business Software */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--badge-bg)] border border-[var(--badge-border)] flex items-center justify-center text-[var(--text-main)] shrink-0">
                <LuBox className="text-base" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[11px] sm:text-xs font-bold text-[var(--text-main)] uppercase tracking-wider">
                  BUSINESS SOFTWARE
                </span>
                <span className="font-['Inter'] text-[11px] sm:text-xs text-[var(--text-muted)]">
                  ERP • POS • CRM • LMS
                </span>
              </div>
            </div>

            {/* Dot Separator */}
            <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-[#10b981]" />

            {/* Feature 3: AI & Automation */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--badge-bg)] border border-[var(--badge-border)] flex items-center justify-center text-[var(--text-main)] shrink-0">
                <LuAudioWaveform className="text-base" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[11px] sm:text-xs font-bold text-[var(--text-main)] uppercase tracking-wider">
                  AI &amp; AUTOMATION
                </span>
                <span className="font-['Inter'] text-[11px] sm:text-xs text-[var(--text-muted)]">
                  AI Tools • Voice • LLM
                </span>
              </div>
            </div>

            {/* Dot Separator */}
            <span className="hidden lg:inline-block w-1.5 h-1.5 rounded-full bg-[#10b981]" />

            {/* Feature 4: Custom Solutions */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--badge-bg)] border border-[var(--badge-border)] flex items-center justify-center text-[var(--text-main)] shrink-0">
                <LuLightbulb className="text-base" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[11px] sm:text-xs font-bold text-[var(--text-main)] uppercase tracking-wider">
                  CUSTOM SOLUTIONS
                </span>
                <span className="font-['Inter'] text-[11px] sm:text-xs text-[var(--text-muted)]">
                  Ideas to Production
                </span>
              </div>
            </div>
          </div>

          {/* Right Action: ASK SAVIYO AI Neon Pill Button */}
          <div className="flex items-center justify-end w-full lg:w-auto pt-2 lg:pt-0">
            <MagneticButton
              onClick={() => setIsTerminalOpen(true)}
              className="w-full lg:w-auto inline-flex items-center justify-center gap-2 px-5 py-2 sm:py-2.5 rounded-full bg-[#051e15] border border-emerald-500/70 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:bg-emerald-500 hover:text-black transition-all cursor-pointer group"
            >
              <span className="text-sm group-hover:rotate-12 transition-transform">✦</span>
              <span>ASK SAVIYO AI</span>
              <FiArrowUpRight className="text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* ================= INTERACTIVE DEVELOPER / AI TERMINAL MODAL ================= */}
      <AnimatePresence>
        {isTerminalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-2xl bg-[#090a0f] border border-emerald-500/40 rounded-2xl shadow-2xl overflow-hidden text-emerald-400 font-mono"
            >
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#0d0f17] border-b border-emerald-500/20">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-2 text-xs text-slate-400">saviyo@terminal:~ (AI Assistant)</span>
                </div>
                <button
                  onClick={() => setIsTerminalOpen(false)}
                  className="text-slate-400 hover:text-white transition-colors p-1"
                >
                  <FiX className="text-base" />
                </button>
              </div>

              {/* Terminal Output Area */}
              <div
                ref={terminalOutputRef}
                className="p-5 h-72 sm:h-80 overflow-y-auto space-y-2 text-xs sm:text-sm bg-black/60 font-mono select-text"
              >
                {terminalLines.map((line, index) => (
                  <div key={index} className="leading-relaxed">
                    {line.type === "cmd" && (
                      <span className="text-emerald-300 font-bold">{line.text}</span>
                    )}
                    {line.type === "out" && (
                      <span className="text-slate-300 pl-2 block">{line.text}</span>
                    )}
                    {line.type === "hint" && (
                      <span className="text-cyan-400 pl-2 block italic">{line.text}</span>
                    )}
                    {line.type === "ok" && (
                      <span className="text-emerald-400 pl-2 block font-semibold">{line.text}</span>
                    )}
                  </div>
                ))}
                {isPrinting && (
                  <div className="text-emerald-400 animate-pulse">Running task...</div>
                )}
              </div>

              {/* Terminal Command Quick Action Bar */}
              <div className="p-3 bg-[#0d0f17] border-t border-emerald-500/20 flex flex-wrap gap-2 items-center justify-between">
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  <button
                    onClick={() => runCommand("skills")}
                    disabled={isPrinting}
                    className="px-2.5 py-1 text-xs rounded-md bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 transition-colors cursor-pointer"
                  >
                    $ skills
                  </button>
                  <button
                    onClick={() => runCommand("projects")}
                    disabled={isPrinting}
                    className="px-2.5 py-1 text-xs rounded-md bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 transition-colors cursor-pointer"
                  >
                    $ projects
                  </button>
                  <button
                    onClick={() => runCommand("contact")}
                    disabled={isPrinting}
                    className="px-2.5 py-1 text-xs rounded-md bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 transition-colors cursor-pointer"
                  >
                    $ contact
                  </button>
                  <button
                    onClick={() => runCommand("hire")}
                    disabled={isPrinting}
                    className="px-2.5 py-1 text-xs rounded-md bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 text-white font-semibold transition-colors cursor-pointer"
                  >
                    $ ./hire-me
                  </button>
                </div>
                <span className="text-[10px] text-slate-500 hidden sm:inline">
                  Interactive CLI Mode
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Introduction;
