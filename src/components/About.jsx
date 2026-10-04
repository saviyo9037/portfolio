import React, { useRef, useState, useEffect } from "react";
import saviyoImage from "../assets/saviyo.jpeg";
import { FiArrowUpRight, FiCheckCircle } from "react-icons/fi";

// Deterministic pseudo-random torn edge polygon generator
export function tn(seed = 1, n = 36) {
  const pseudoRand = (s) => {
    const x = Math.sin(s) * 10000;
    return x - Math.floor(x);
  };

  const topPoints = [];
  const bottomPoints = [];

  // Top edge from 0% to 100% with y offset randomly between 0 and 2.2%
  for (let i = 0; i <= n; i++) {
    const x = ((i / n) * 100).toFixed(2);
    const r = pseudoRand(seed * 127 + i * 29);
    const y = (r * 2.2).toFixed(2);
    topPoints.push(`${x}% ${y}%`);
  }

  // Bottom edge from 100% to 0% with y offset randomly between 0 and 2.2% from bottom
  for (let i = n; i >= 0; i--) {
    const x = ((i / n) * 100).toFixed(2);
    const r = pseudoRand(seed * 349 + i * 37);
    const y = (100 - r * 2.2).toFixed(2);
    bottomPoints.push(`${x}% ${y}%`);
  }

  return { clipPath: `polygon(${[...topPoints, ...bottomPoints].join(", ")})` };
}

// Inline SVG noise data URI for authentic paper grain
const NOISE_BG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.09 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

// Text Scramble / Decode effect hook
function useDecodeText(targetText, speed = 25) {
  const [displayText, setDisplayText] = useState(targetText);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&@$";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        targetText
          .split("")
          .map((char, index) => {
            if (char === " " || char === "&") return char;
            if (index < iteration) {
              return targetText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= targetText.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2;
    }, speed);

    return () => clearInterval(interval);
  }, [targetText, speed]);

  return displayText;
}

export default function About() {
  const decodedTitle = useDecodeText("THE ENGINEER & THE CRAFT");

  // Parallax tracking for collage pieces
  const collageRef = useRef(null);
  const [parallax, setParallax] = useState({ px: 0, py: 0 });

  const handleMouseMove = (e) => {
    if (!collageRef.current) return;
    const rect = collageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setParallax({
      px: Math.max(-1, Math.min(1, x)),
      py: Math.max(-1, Math.min(1, y)),
    });
  };

  const handleMouseLeave = () => {
    setParallax({ px: 0, py: 0 });
  };

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

  // Precomputed clip paths using deterministic pseudo-random seeds
  const clipPieceA = useRef(tn(11, 32)).current;
  const clipPieceB = useRef(tn(24, 32)).current;
  const clipPieceC = useRef(tn(38, 32)).current;
  const clipTicker = useRef(tn(49, 44)).current;
  const clipPillar1 = useRef(tn(71, 26)).current;
  const clipPillar2 = useRef(tn(83, 26)).current;
  const clipPillar3 = useRef(tn(97, 26)).current;
  const clipPillar4 = useRef(tn(112, 26)).current;

  const tickerItems = [
    "REACT.JS",
    "TYPESCRIPT",
    "TANSTACK REACT QUERY",
    "NEXT.JS",
    "NODE.JS",
    "EXPRESS.JS",
    "MONGODB",
    "TAILWIND CSS",
    "ESC/POS THERMAL PRINTING",
    "WEBSOCKETS",
    "REST APIS",
    "PYTHON DAEMONS",
  ];

  const pillars = [
    {
      num: "01 // ARCHITECTURE",
      title: "ENTERPRISE MODULARITY",
      desc: "Architecting 10+ core modules (Product, Customer, Billing, Inventory, POS) with 40+ reusable React components that decouple business rules from presentation.",
      bg: "#ddd6ff",
      rot: -2,
      clip: clipPillar1,
    },
    {
      num: "02 // PERFORMANCE",
      title: "REACTIVE CACHING",
      desc: "Deploying TanStack React Query for aggressive multi-tier server state synchronization, optimistic mutations, and sub-second retail POS feedback.",
      bg: "#e6e6e0",
      rot: 1.5,
      clip: clipPillar2,
    },
    {
      num: "03 // HARDWARE & IOT",
      title: "ESC/POS & DAEMONS",
      desc: "Direct WebSocket hardware communication, custom receipt templates, ESC/POS thermal printing daemons, and barcode automation in live retail environments.",
      bg: "#b6f1fb",
      rot: -1,
      clip: clipPillar3,
    },
    {
      num: "04 // BACKEND CRAFT",
      title: "MERN & DATA SECURITY",
      desc: "Engineering scalable MongoDB schemas, robust Express.js validation middleware, role-based access control (RBAC), and bulletproof JWT authentication.",
      bg: "#ffd3ee",
      rot: 2,
      clip: clipPillar4,
    },
  ];

  return (
    <section id="about" className="relative w-full max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-28 bg-transparent text-slate-900">
      <style>{`
        /* Continuous marquee ticker */
        @keyframes collageMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-continuous {
          display: flex;
          width: max-content;
          animation: collageMarquee 34s linear infinite;
        }
        .animate-marquee-continuous:hover {
          animation-play-state: paused;
        }

        /* Pillars hover transition */
        .pillar-card-hover {
          transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.35s ease;
        }
        .pillar-card-hover:hover {
          transform: translateY(-8px) scale(1.02) rotate(0deg) !important;
          z-index: 20;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-marquee-continuous {
            animation: none !important;
          }
          .pillar-card-hover,
          .collage-piece {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* ================= 1. SECTION HEADER ================= */}
      <div className="mb-12 md:mb-16">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-[#8b7bff] mb-3">
          <span className="w-2.5 h-[2px] bg-[#8b7bff]" />
          <span>[01] // DOSSIER</span>
        </div>

        <h2 className="font-['Anton'] text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight leading-[0.92]">
          <span className="heading-gradient">{decodedTitle}</span>
        </h2>

        <p className="font-mono text-xs md:text-sm text-slate-500 uppercase tracking-wider mt-4 max-w-3xl leading-relaxed">
          Bridging high-throughput web system architecture with modern product engineering, strict TypeScript contracts, and physical hardware integrations.
        </p>
      </div>

      {/* ================= 2. TWO-COLUMN SPLIT (1.1fr / 1fr) ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-10 items-center mb-16 md:mb-20">

        {/* LEFT COLUMN: DARK GLASS CARD */}
        <div className="rounded-3xl bg-[#121216]/90 border border-white/10 p-6 sm:p-9 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between space-y-6 text-white">

          <div>
            {/* Green pulsing status pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
              <span>ACTIVE IN PRODUCTION @ D3INNOVATIVES</span>
            </div>

            {/* Profile Avatar + Name Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-6">
              <div className="relative group shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-white/20 group-hover:border-violet-400 transition-all duration-300 shadow-md bg-slate-900">
                  <img
                    src={saviyoImage}
                    alt="Saviyo George"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    style={{ objectPosition: "50% 20%" }}
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#121216] flex items-center justify-center border border-white/20 shadow-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
              </div>

              <div>
                <h3 className="font-['Anton'] uppercase text-4xl sm:text-5xl md:text-6xl leading-[0.9] tracking-tight mb-2">
                  <span className="text-white">SAVIYO </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-cyan-400 to-pink-400">
                    GEORGE
                  </span>
                </h3>
                <p className="font-mono text-xs text-slate-400 tracking-wider uppercase">
                  Full Stack Developer | Kerala, India (IST • UTC+5:30)
                </p>
              </div>
            </div>

            {/* Lead paragraph */}
            <p className="font-sans font-semibold text-lg sm:text-xl text-slate-200 leading-snug mb-4">
              I engineer web applications that excel in production environments, combining enterprise ERP/POS architectures with responsive, accessible client interfaces.
            </p>

            {/* Body paragraph */}
            <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
              Holding a Bachelor of Computer Applications with Distinction from <strong className="text-white font-semibold">Mahatma Gandhi University</strong> and actively shipping software at <strong className="text-white font-semibold">D3innovatives</strong>, I specialize in combining modern React and TypeScript client ecosystems with performant Express/MongoDB backends and physical IoT hardware (ESC/POS thermal printers, barcoding).
            </p>

            {/* Three small fact boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="block text-[10px] text-slate-400 uppercase tracking-wider mb-1">
                  PRODUCTS
                </span>
                <span className="font-sans font-semibold text-xs text-white">
                  ERP, POS &amp; MERN Platforms
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="block text-[10px] text-slate-400 uppercase tracking-wider mb-1">
                  EDUCATION
                </span>
                <span className="font-sans font-semibold text-xs text-white">
                  BCA with Distinction
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="block text-[10px] text-slate-400 uppercase tracking-wider mb-1">
                  STATUS
                </span>
                <span className="font-sans font-semibold text-xs text-emerald-400 font-bold">
                  Active in Production
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => handleScrollTo("contact")}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-mono text-xs font-bold uppercase tracking-wider hover:opacity-95 transition-opacity shadow-md shadow-violet-500/20 flex items-center gap-2 cursor-pointer"
            >
              <span>Initiate Collaboration</span>
              <FiArrowUpRight className="text-sm font-bold" />
            </button>

            <button
              onClick={() => handleScrollTo("experience")}
              className="px-6 py-3 rounded-full bg-white/5 border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider hover:border-white hover:bg-white/10 transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Explore Track Record</span>
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: MODERN TORN-PAPER COLLAGE AREA WITH MOUSE PARALLAX */}
        <div
          ref={collageRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full h-[470px] sm:h-[500px] flex items-center justify-center select-none"
        >
          {/* PIECE A: VIOLET (#8b7bff) TORN PIECE (Top Right, +5deg, 80% wide, k=16) */}
          <div
            className="collage-piece absolute top-4 right-2 sm:right-4 w-[82%] sm:w-[80%] z-10"
            style={{
              filter: "drop-shadow(0 16px 22px rgba(0,0,0,0.65))",
              transform: `translate(calc(${parallax.px} * 16px), calc(${parallax.py} * 16px)) rotate(5deg)`,
              transition: "transform 0.25s ease-out",
            }}
          >
            <div
              className="p-5 sm:p-6 text-[#0A0A0A]"
              style={{
                backgroundColor: "#8b7bff",
                ...clipPieceA,
              }}
            >
              <div className="font-['Anton'] text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-[#0A0A0A] leading-tight">
                ERP · POS · MERN
              </div>
              <div className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-[#0A0A0A]/75 mt-1">
                ENTERPRISE SYSTEM ARCHITECTURE // HARDWARE BRIDGES
              </div>
            </div>
          </div>

          {/* PIECE B: NEWSPRINT PIECE (#e6e6e0) - SPECIMEN CARD WITH SG MONOGRAM (Middle Left, -4deg, 66% wide, k=-10) */}
          <div
            className="collage-piece absolute top-20 left-2 sm:left-4 w-[74%] sm:w-[66%] z-20"
            style={{
              filter: "drop-shadow(0 18px 26px rgba(0,0,0,0.75))",
              transform: `translate(calc(${parallax.px} * -10px), calc(${parallax.py} * -10px)) rotate(-4deg)`,
              transition: "transform 0.25s ease-out",
            }}
          >
            <div
              className="p-4 sm:p-5 text-[#0A0A0A]"
              style={{
                backgroundColor: "#e6e6e0",
                backgroundImage: NOISE_BG,
                ...clipPieceB,
              }}
            >
              {/* Graphic Display: Dark radial gradient card with SG Monogram & telemetry */}
              <div className="relative w-full h-[190px] overflow-hidden rounded-lg bg-gradient-to-br from-[#121218] via-[#1a1926] to-[#0A0A0A] border border-black/30 mb-3 shadow-inner flex flex-col justify-between p-4 text-white">
                <div className="flex items-center justify-between font-mono text-[10px] text-[#8b7bff] tracking-widest uppercase">
                  <span>// SPECIMEN 01</span>
                  <span className="px-2 py-0.5 rounded bg-[#8b7bff]/20 text-[#8b7bff] font-bold">KERALA, IN</span>
                </div>

                {/* Big initials monogram with neon glow */}
                <div className="flex items-center justify-center my-auto">
                  <span className="font-['Anton'] text-7xl sm:text-8xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-[#8b7bff] to-[#22d3ee] drop-shadow-[0_0_25px_rgba(139,123,255,0.4)]">
                    SG
                  </span>
                </div>

                {/* Equalizer audio / telemetry bars */}
                <div className="flex items-center justify-between pt-1 border-t border-white/10 font-mono text-[9px] text-white/50 tracking-wider">
                  <div className="flex items-end gap-1 h-3">
                    <span className="w-1 h-2 bg-[#22d3ee] animate-pulse" />
                    <span className="w-1 h-3 bg-[#8b7bff] animate-pulse" style={{ animationDelay: "150ms" }} />
                    <span className="w-1 h-1.5 bg-[#ff6ad5] animate-pulse" style={{ animationDelay: "300ms" }} />
                    <span className="w-1 h-2.5 bg-[#39ff88] animate-pulse" style={{ animationDelay: "450ms" }} />
                  </div>
                  <span>FULL STACK // ARCHITECT</span>
                </div>
              </div>

              {/* Photo Caption Text in Anton & Mono */}
              <div className="font-['Anton'] text-xl sm:text-2xl uppercase tracking-tight text-[#0A0A0A] leading-tight">
                SAVIYO GEORGE
              </div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#0A0A0A]/70 mt-0.5">
                Full Stack Developer · Kerala, IN
              </div>
            </div>
          </div>

          {/* PIECE C: CYAN (#22d3ee) TORN PIECE (Bottom Right, -6deg, 74% wide, k=24) */}
          <div
            className="collage-piece absolute bottom-4 right-1 sm:right-3 w-[78%] sm:w-[74%] z-30"
            style={{
              filter: "drop-shadow(0 16px 22px rgba(0,0,0,0.7))",
              transform: `translate(calc(${parallax.px} * 24px), calc(${parallax.py} * 24px)) rotate(-6deg)`,
              transition: "transform 0.25s ease-out",
            }}
          >
            <div
              className="p-4 sm:p-5 text-[#0A0A0A] flex items-center justify-between gap-3"
              style={{
                backgroundColor: "#22d3ee",
                ...clipPieceC,
              }}
            >
              <div className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-[#0A0A0A] truncate">
                PRODUCTION READY // 10+ CORE SHIPPED MODULES
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-[#0A0A0A] shrink-0" />
            </div>
          </div>

        </div>

      </div>

      {/* ================= 3. TICKER STRIP ================= */}
      <div className="mb-20 overflow-hidden py-3">
        <div
          className="relative w-[104%] -ml-[2%] py-3 sm:py-3.5 text-[#0A0A0A]"
          style={{
            filter: "drop-shadow(0 14px 20px rgba(0,0,0,0.6))",
            transform: "rotate(-1.4deg)",
          }}
        >
          <div
            className="w-full py-2 overflow-hidden"
            style={{
              backgroundColor: "#e6e6e0",
              backgroundImage: NOISE_BG,
              ...clipTicker,
            }}
          >
            <div className="animate-marquee-continuous font-['Anton'] text-xl sm:text-2xl uppercase tracking-wide flex items-center">
              {/* Loop duplicated twice for seamless infinite scroll */}
              {[...tickerItems, ...tickerItems].map((item, idx) => (
                <span key={idx} className="flex items-center whitespace-nowrap px-4 text-[#0A0A0A]">
                  <span>{item}</span>
                  <span className="text-[#8b7bff] ml-8 text-sm">◆</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================= 4. PILLARS ================= */}
      <div>
        {/* Centered mono section label */}
        <div className="text-center mb-10">
          <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-[#8b7bff]">
            // CORE ENGINEERING PILLARS &amp; WORKING PHILOSOPHY
          </span>
        </div>

        {/* 4-Column Grid of Colorful Torn Paper Pieces */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 lg:gap-6 items-stretch pt-2">
          {pillars.map((pillar) => (
            <div
              key={pillar.num}
              className="pillar-card-hover relative flex flex-col justify-between"
              style={{
                filter: "drop-shadow(0 16px 22px rgba(0,0,0,0.6))",
                transform: `rotate(${pillar.rot}deg)`,
              }}
            >
              <div
                className="p-6 sm:p-7 flex flex-col justify-between h-full text-[#0A0A0A]"
                style={{
                  backgroundColor: pillar.bg,
                  backgroundImage: NOISE_BG,
                  ...pillar.clip,
                }}
              >
                <div>
                  {/* Mono small caps label */}
                  <span className="block font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-[#0A0A0A]/70 mb-2">
                    {pillar.num}
                  </span>

                  {/* Anton Uppercase Title */}
                  <h4 className="font-['Anton'] text-2xl uppercase tracking-tight text-[#0A0A0A] leading-tight mb-3">
                    {pillar.title}
                  </h4>

                  {/* Body text in 13.5px Inter */}
                  <p className="font-sans text-[13.5px] text-[#0A0A0A]/85 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                {/* Bottom rule mark */}
                <div className="mt-6 pt-3 border-t border-[#0A0A0A]/20 flex items-center justify-between font-mono text-[10px] text-[#0A0A0A]/70 uppercase tracking-wider font-bold">
                  <span>STANDARD PROTOCOL</span>
                  <FiCheckCircle className="text-xs text-[#0A0A0A]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
