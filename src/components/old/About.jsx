import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FiMapPin,
  FiAward,
  FiDownload,
  FiArrowUpRight,
  FiBox,
  FiDatabase,
  FiCpu,
  FiCheck,
  FiCopy,
  FiRotateCcw,
  FiCode,
  FiMaximize2,
} from "react-icons/fi";

// Cutout portrait asset (Saviyo in coat from saviyo-hero.jpg)
import saviyoCutout from "../assets/saviyo-coat-cutout.png";

// Import NeonBorder for the cards
import NeonBorder from "./NeonBorder";


// ================= CODE SNIPPETS FOR LAPTOP TABS =================
const LAPTOP_FILES = {
  "AboutSaviyo.tsx": {
    label: "AboutSaviyo.tsx",
    icon: FiCode,
    badgeColor: "text-cyan-400",
    lines: [
      {
        tokens: [
          { text: "// DEVELOPER DOSSIER - SAVIYO GEORGE", color: "text-slate-500 italic" },
        ],
      },
      {
        tokens: [
          { text: "// Full-Stack & Enterprise Software Engineer", color: "text-slate-500 italic" },
        ],
      },
      { tokens: [] },
      {
        tokens: [
          { text: "const ", color: "text-pink-400 font-semibold" },
          { text: "developer", color: "text-purple-300 font-bold" },
          { text: " = {", color: "text-slate-300" },
        ],
      },
      {
        tokens: [
          { text: "  name", color: "text-cyan-300" },
          { text: ": ", color: "text-slate-400" },
          { text: '"Saviyo George"', color: "text-amber-300" },
          { text: ",", color: "text-slate-400" },
        ],
      },
      {
        tokens: [
          { text: "  role", color: "text-cyan-300" },
          { text: ": ", color: "text-slate-400" },
          { text: '"Full-Stack Developer @ D3innovatives"', color: "text-amber-300" },
          { text: ",", color: "text-slate-400" },
        ],
      },
      {
        tokens: [
          { text: "  location", color: "text-cyan-300" },
          { text: ": ", color: "text-slate-400" },
          { text: '"Kerala, India (IST - UTC+5:30)"', color: "text-amber-300" },
          { text: ",", color: "text-slate-400" },
        ],
      },
      {
        tokens: [
          { text: "  education", color: "text-cyan-300" },
          { text: ": ", color: "text-slate-400" },
          { text: '"BCA with Distinction (MG University)"', color: "text-amber-300" },
          { text: ",", color: "text-slate-400" },
        ],
      },
      {
        tokens: [
          { text: "  status", color: "text-cyan-300" },
          { text: ": ", color: "text-slate-400" },
          { text: '"Active in Production 🟢"', color: "text-emerald-400 font-medium" },
          { text: ",", color: "text-slate-400" },
        ],
      },
      {
        tokens: [
          { text: "  coreStack", color: "text-cyan-300" },
          { text: ": [", color: "text-slate-400" },
          { text: '"React"', color: "text-emerald-300" },
          { text: ', ', color: "text-slate-400" },
          { text: '"TypeScript"', color: "text-emerald-300" },
          { text: ', ', color: "text-slate-400" },
          { text: '"Next.js"', color: "text-emerald-300" },
          { text: ', ', color: "text-slate-400" },
          { text: '"Node/Express"', color: "text-emerald-300" },
          { text: ', ', color: "text-slate-400" },
          { text: '"MongoDB"', color: "text-emerald-300" },
          { text: "],", color: "text-slate-400" },
        ],
      },
      {
        tokens: [
          { text: "  specialty", color: "text-cyan-300" },
          { text: ": ", color: "text-slate-400" },
          { text: '"Enterprise ERP & POS Platforms (10+ Modules)"', color: "text-amber-300" },
          { text: ",", color: "text-slate-400" },
        ],
      },
      {
        tokens: [
          { text: "  mission", color: "text-cyan-300" },
          { text: ": ", color: "text-slate-400" },
          { text: '"Engineering software that solves real production problems."', color: "text-amber-300" },
        ],
      },
      {
        tokens: [
          { text: "};", color: "text-slate-300" },
        ],
      },
    ],
  },
  "EnterprisePOS.ts": {
    label: "EnterprisePOS.ts",
    icon: FiBox,
    badgeColor: "text-purple-400",
    lines: [
      {
        tokens: [
          { text: "// D3INNOVATIVES POS ENGINE ARCHITECTURE", color: "text-slate-500 italic" },
        ],
      },
      {
        tokens: [
          { text: "export class ", color: "text-pink-400 font-semibold" },
          { text: "RetailPOSEngine", color: "text-purple-300 font-bold" },
          { text: " {", color: "text-slate-300" },
        ],
      },
      {
        tokens: [
          { text: "  readonly modules", color: "text-cyan-300" },
          { text: " = [", color: "text-slate-400" },
          { text: '"Billing"', color: "text-amber-300" },
          { text: ', ', color: "text-slate-400" },
          { text: '"Inventory"', color: "text-amber-300" },
          { text: ', ', color: "text-slate-400" },
          { text: '"Customers"', color: "text-amber-300" },
          { text: ', ', color: "text-slate-400" },
          { text: '"RBAC"', color: "text-amber-300" },
          { text: "];", color: "text-slate-400" },
        ],
      },
      {
        tokens: [
          { text: "  async ", color: "text-pink-400" },
          { text: "processCheckout", color: "text-emerald-400" },
          { text: "(order: ", color: "text-slate-300" },
          { text: "OrderPayload", color: "text-cyan-300" },
          { text: ") {", color: "text-slate-300" },
        ],
      },
      {
        tokens: [
          { text: "    await ", color: "text-pink-400" },
          { text: "tanstackCache", color: "text-slate-300" },
          { text: ".optimisticSync(order);", color: "text-cyan-400" },
        ],
      },
      {
        tokens: [
          { text: "    return ", color: "text-pink-400" },
          { text: "this.printSlip(order.id);", color: "text-amber-300" },
        ],
      },
      {
        tokens: [
          { text: "  }", color: "text-slate-300" },
        ],
      },
      {
        tokens: [
          { text: "}", color: "text-slate-300" },
        ],
      },
    ],
  },
  "Hardware.ts": {
    label: "Hardware.ts",
    icon: FiCpu,
    badgeColor: "text-amber-400",
    lines: [
      {
        tokens: [
          { text: "// PHYSICAL IOT & THERMAL PRINTING DAEMON", color: "text-slate-500 italic" },
        ],
      },
      {
        tokens: [
          { text: "const ", color: "text-pink-400 font-semibold" },
          { text: "thermalPrinterDaemon", color: "text-purple-300 font-bold" },
          { text: " = {", color: "text-slate-300" },
        ],
      },
      {
        tokens: [
          { text: "  protocol", color: "text-cyan-300" },
          { text: ": ", color: "text-slate-400" },
          { text: '"ESC/POS via WebSocket"', color: "text-amber-300" },
          { text: ",", color: "text-slate-400" },
        ],
      },
      {
        tokens: [
          { text: "  targetPort", color: "text-cyan-300" },
          { text: ": ", color: "text-slate-400" },
          { text: "8080", color: "text-emerald-400" },
          { text: ",", color: "text-slate-400" },
        ],
      },
      {
        tokens: [
          { text: "  baudRate", color: "text-cyan-300" },
          { text: ": ", color: "text-slate-400" },
          { text: "9600", color: "text-emerald-400" },
          { text: ",", color: "text-slate-400" },
        ],
      },
      {
        tokens: [
          { text: "  peripherals", color: "text-cyan-300" },
          { text: ": [", color: "text-slate-400" },
          { text: '"EAN-13 Scanner"', color: "text-amber-300" },
          { text: ', ', color: "text-slate-400" },
          { text: '"Cash Drawer"', color: "text-amber-300" },
          { text: "],", color: "text-slate-400" },
        ],
      },
      {
        tokens: [
          { text: "  status", color: "text-cyan-300" },
          { text: ": ", color: "text-slate-400" },
          { text: '"CONNECTED_ONLINE"', color: "text-emerald-400 font-semibold" },
        ],
      },
      {
        tokens: [
          { text: "};", color: "text-slate-300" },
        ],
      },
    ],
  },
};

// 4 CAPABILITY CARDS DATA
const CAPABILITY_CARDS = [
  {
    num: "01",
    title: "10+ ERP MODULES",
    desc: "Billing, Inventory, POS, Customer & RBAC in live deployment.",
    icon: FiBox,
    glowColor: "from-purple-500/20 to-purple-700/5",
    iconBg: "bg-purple-500/20 text-purple-400 border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.3)]",
    cardBorder: "hover:border-purple-500/50",
  },
  {
    num: "02",
    title: "SUB-SECOND CACHE",
    desc: "TanStack Query optimistic UI & multi-tier state sync.",
    icon: FiDatabase,
    glowColor: "from-cyan-500/20 to-cyan-700/5",
    iconBg: "bg-cyan-500/20 text-cyan-400 border-cyan-500/40 shadow-[0_0_15px_rgba(56,189,248,0.3)]",
    cardBorder: "hover:border-cyan-500/50",
  },
  {
    num: "03",
    title: "ESC/POS DAEMONS",
    desc: "Direct WebSocket thermal receipts & barcode scanner automation.",
    icon: FiCpu,
    glowColor: "from-amber-500/20 to-amber-700/5",
    iconBg: "bg-amber-500/20 text-amber-400 border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.3)]",
    cardBorder: "hover:border-amber-500/50",
  },
  {
    num: "04",
    title: "BCA DISTINCTION",
    desc: "Honors graduate in Computer Applications from MG University.",
    icon: FiAward,
    glowColor: "from-emerald-500/20 to-emerald-700/5",
    iconBg: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.3)]",
    cardBorder: "hover:border-emerald-500/50",
  },
];

export default function About() {
  const [activeFile, setActiveFile] = useState("AboutSaviyo.tsx");
  const [copiedCode, setCopiedCode] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  // Parallax tilt tracking for 3D laptop
  const laptopRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 6, ry: -14, rz: 1 });

  const fileData = LAPTOP_FILES[activeFile] || LAPTOP_FILES["AboutSaviyo.tsx"];

  // Calculate total characters for typewriter
  const totalChars = React.useMemo(() => {
    let count = 0;
    fileData.lines.forEach((line) => {
      line.tokens.forEach((token) => {
        count += token.text.length;
      });
      count += 1;
    });
    return count;
  }, [fileData]);

  // Plain text for copy button
  const filePlainText = React.useMemo(() => {
    return fileData.lines
      .map((line) => line.tokens.map((t) => t.text).join(""))
      .join("\n");
  }, [fileData]);

  // Trigger typewriter typing effect
  useEffect(() => {
    setCharCount(0);
    setIsTyping(true);
    let current = 0;
    const interval = setInterval(() => {
      current += 2;
      setCharCount(current);
      if (current >= totalChars) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 18);

    return () => clearInterval(interval);
  }, [activeFile, totalChars]);

  const handleCopyCode = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(filePlainText);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleReplayTypewriter = (e) => {
    e.stopPropagation();
    setCharCount(0);
    setIsTyping(true);
    let current = 0;
    const interval = setInterval(() => {
      current += 2;
      setCharCount(current);
      if (current >= totalChars) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 18);
  };

  const handleMouseMove = (e) => {
    if (!laptopRef.current) return;
    const rect = laptopRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setTilt({
      rx: 6 - y * 6,
      ry: -14 + x * 8,
      rz: 1,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 6, ry: -14, rz: 1 });
  };

  const handleScrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  let accumulatedChars = 0;

  return (
    <section
      id="about"
      className="relative w-full bg-transparent text-[var(--text-main)] overflow-hidden py-16 sm:py-20 lg:py-24 selection:bg-[#39ff88] selection:text-black"
    >
      {/* ================= AMBIENT COLOR FOG (SEAMLESSLY MATCHES HERO & EXPERIENCES) ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft amber volumetric glow behind portrait */}
        <div className="absolute top-[10%] left-[2%] w-[550px] h-[550px] rounded-full bg-amber-600/10 blur-[130px]" />

        {/* Soft orange glow behind 3D laptop */}
        <div className="absolute top-[20%] right-[4%] w-[600px] h-[600px] rounded-full bg-orange-500/10 blur-[140px]" />

        {/* Central subtle connection glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] rounded-full bg-zinc-500/10 blur-[150px]" />

        {/* Decorative Technical Crosshairs dotted on the backdrop like Introduction */}
        <div className="absolute top-16 left-[18%] text-[var(--text-dim)]/30 font-mono text-xs select-none hidden lg:block">
          +
        </div>
        <div className="absolute top-28 right-[24%] text-amber-500/35 font-mono text-sm select-none hidden lg:block">
          +
        </div>
        <div className="absolute bottom-24 left-[10%] text-orange-400/30 font-mono text-xs select-none hidden lg:block">
          +
        </div>
        <div className="absolute bottom-32 right-[12%] text-[var(--text-dim)]/30 font-mono text-xs select-none hidden lg:block">
          +
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 flex flex-col justify-between min-h-[85vh]">

        {/* ================= MAIN HERO / SHOWCASE ROW ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">

          {/* ---------------- COLUMN 1: SAVIYO 3D PORTRAIT & PORTAL (4 COLS) ---------------- */}
          <div className="lg:col-span-4 relative flex flex-col items-center justify-center">

            {/* Cyber HUD Strip on the far left */}
            <div className="hidden xl:flex absolute -left-6 top-8 bottom-12 flex-col items-center justify-between text-[11px] font-mono text-[var(--text-dim)] select-none">
              <span className="font-bold text-[var(--text-muted)]">01</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]" />
              <div
                className="tracking-[0.35em] text-[10px] text-[var(--text-muted)] uppercase font-semibold"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                SAVIYO
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shadow-[0_0_8px_#f97316]" />
              <div className="space-y-2 text-[10px] text-[var(--text-dim)] font-mono">
                <div>02</div>
                <div>03</div>
                <div>04</div>
              </div>
            </div>

            {/* Glowing Cosmic Neon Portal Rings */}
            <div className="relative w-[300px] h-[340px] sm:w-[350px] sm:h-[400px] flex items-center justify-center">

              {/* Outer Amber Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                className="absolute w-[280px] h-[280px] sm:w-[330px] sm:h-[330px] rounded-full border border-amber-400/30 shadow-[0_0_40px_rgba(251,191,36,0.25)] pointer-events-none"
                style={{
                  borderTopColor: "rgba(251, 191, 36, 0.8)",
                  borderRightColor: "transparent",
                }}
              />

              {/* Inner Orange Portal Ring with Intense Glow */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute w-[240px] h-[240px] sm:w-[290px] sm:h-[290px] rounded-full border-2 border-orange-500/40 shadow-[0_0_55px_rgba(249,115,22,0.35)] pointer-events-none"
                style={{
                  borderLeftColor: "rgba(249, 115, 22, 0.9)",
                  borderBottomColor: "transparent",
                }}
              />

              {/* Central Radiant Halo Glow */}
              <div className="absolute w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] rounded-full bg-gradient-to-tr from-amber-600/30 via-orange-500/20 to-yellow-500/30 blur-2xl" />

              {/* High-Resolution Cutout Photo of Saviyo George (Coat from saviyo-hero.jpg) */}
              <motion.img
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                src={saviyoCutout}
                alt="Saviyo George - Full-Stack Developer"
                className="relative z-10 w-full h-full max-h-[380px] sm:max-h-[440px] object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] filter contrast-[1.03]"
              />

              {/* Floating Circular 3+ Years Experience Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                whileHover={{ scale: 1.08 }}
                className="absolute left-[-10px] bottom-10 z-20 w-[95px] h-[95px] sm:w-[110px] sm:h-[110px] rounded-full bg-[var(--card-bg)]/90 backdrop-blur-xl border-2 border-amber-500/60 shadow-[0_0_30px_rgba(245,158,11,0.5)] flex flex-col items-center justify-center text-center cursor-pointer select-none group"
              >
                <span className="text-2xl sm:text-3xl font-black bg-gradient-to-br from-white via-slate-100 to-amber-300 bg-clip-text text-transparent group-hover:from-amber-200 group-hover:to-orange-200 transition-all">
                  3+
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[var(--text-main)]">
                  Years
                </span>
                <span className="text-[8px] sm:text-[9px] font-mono text-amber-300">
                  Experience
                </span>
              </motion.div>
            </div>

            {/* Bottom Status Pill: Open for Opportunities */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-4 w-full max-w-[280px] px-4 py-2 rounded-xl bg-[var(--card-bg)]/85 backdrop-blur-md border border-[var(--border-subtle)] flex items-center justify-between text-xs shadow-lg hover:border-lime-500/50 transition-all group"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-lime-400 shadow-[0_0_8px_#a3e635] animate-pulse" />
                <div>
                  <span className="text-[10px] text-[var(--text-dim)] block uppercase font-mono">Currently</span>
                  <span className="font-semibold text-[var(--text-main)] group-hover:text-lime-400 transition-colors">
                    Open for Opportunities
                  </span>
                </div>
              </div>
              <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center text-[var(--text-dim)] group-hover:text-lime-400 group-hover:bg-lime-500/10 transition-colors">
                <FiArrowUpRight className="text-sm" />
              </div>
            </motion.div>

          </div>

          {/* ---------------- COLUMN 2: CENTER BIO & TYPOGRAPHY (4 COLS) ---------------- */}
          <div className="lg:col-span-4 flex flex-col justify-center space-y-4 lg:pr-2">

            {/* Top Badges */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="flex flex-wrap items-center gap-2 select-none"
            >
              <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-[var(--border-subtle)] text-[10px] font-mono tracking-wider text-[var(--text-dim)]">
                CONFIDENTIAL // SG-903734
              </span>
              <span className="px-3 py-1 rounded-full bg-lime-500/10 border border-lime-500/30 text-[10px] font-mono tracking-wider text-lime-400 font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-lime-400 shadow-[0_0_6px_#a3e635] animate-ping" />
                PROD ACTIVE @ D3INNOVATIVES
              </span>
            </motion.div>

            {/* Cursive Greeting */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="pt-1"
            >
              <span
                className="font-serif italic text-2xl sm:text-3xl text-amber-200/90 tracking-wide select-none"
                style={{ fontFamily: "'Caveat', cursive, serif" }}
              >
                Hi, I'm
              </span>
            </motion.div>

            {/* Massive Name Headline (Matching Hero Style) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <h1 className="flex flex-col text-5xl sm:text-6xl lg:text-7xl xl:text-[5rem] tracking-tight uppercase leading-[0.85] mb-2 font-['Anton'] cursor-default select-none">
                <span className="text-[var(--hero-title-solid)] hover:text-white transition-colors duration-300">
                  SAVIYO
                </span>
                <span
                  className="text-transparent transition-all duration-300"
                  style={{
                    WebkitTextStroke: "1.8px #f59e0b",
                    filter: "drop-shadow(0 0 16px rgba(245, 158, 11, 0.45))"
                  }}
                >
                  GEORGE
                </span>
              </h1>
            </motion.div>

            {/* Role & Position Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-sm sm:text-base font-bold text-[var(--text-muted)] tracking-wide"
            >
              Full-Stack Solutions Engineer @ D3innovatives
            </motion.div>

            {/* Quick Metadata Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              viewport={{ once: true }}
              className="space-y-1.5 text-xs sm:text-[13px] text-[var(--text-muted)] font-medium"
            >
              <div className="flex items-center gap-2">
                <FiAward className="text-amber-400 text-sm shrink-0" />
                <span>BCA with Distinction • MG University</span>
              </div>
              <div className="flex items-center gap-2">
                <FiMapPin className="text-orange-400 text-sm shrink-0" />
                <span>Kerala, India (UTC+5:30)</span>
              </div>
            </motion.div>

            {/* Core Mission & Bio Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed max-w-md pt-1"
            >
              Architecting production-grade platforms where complex enterprise ERP rules,
              sub-second POS state, and physical IoT daemons converge into resilient software.
            </motion.p>

            {/* Action Buttons: Let's Collaborate & Download CV */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
              viewport={{ once: true }}
              className="flex flex-wrap items-center gap-3 pt-3"
            >
              <motion.button
                onClick={handleScrollToContact}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="px-5 py-2.5 rounded-xl bg-[var(--btn-cta-bg)] text-[var(--btn-cta-text)] font-bold text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:opacity-90 transition-all cursor-pointer"
              >
                <span>Let's Collaborate</span>
                <FiArrowUpRight className="text-base" />
              </motion.button>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="px-5 py-2.5 rounded-xl bg-white/5 border border-[var(--border-subtle)] text-[var(--text-main)] hover:border-amber-400/50 hover:bg-white/10 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Download CV</span>
                <FiDownload className="text-sm" />
              </motion.a>
            </motion.div>

          </div>

          {/* ---------------- COLUMN 3: 3D ANGLED LAPTOP & TECH STACK WIDGET (4 COLS) ---------------- */}
          <div
            ref={laptopRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-4 relative flex items-center justify-center pt-6 lg:pt-0"
          >
            {/* Top Right Handwritten Doodle Accent */}
            <div className="absolute -top-10 right-4 sm:right-8 z-30 select-none hidden sm:flex flex-col items-end">
              <span
                className="text-amber-200/90 text-sm sm:text-base font-serif italic tracking-wide"
                style={{ fontFamily: "'Caveat', cursive, serif" }}
              >
                ✦ Turning Ideas into Production Ready Solutions
              </span>
              <svg className="w-14 h-8 text-amber-200/80 -mr-2" viewBox="0 0 60 30" fill="none">
                <path d="M5 5 C 25 15, 45 10, 50 25" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M43 23 L 50 25 L 48 18" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>

            {/* 3D Angled Perspective Laptop Mockup */}
            <div
              style={{
                transform: `perspective(1000px) rotateY(${tilt.ry}deg) rotateX(${tilt.rx}deg) rotateZ(${tilt.rz}deg)`,
                transition: "transform 0.15s ease-out",
                transformStyle: "preserve-3d",
              }}
              className="relative w-full max-w-[520px] lg:max-w-[480px] xl:max-w-[540px]"
            >
              {/* Laptop Display Top Lid */}
              <div className="rounded-[20px] bg-gradient-to-b from-[#2b2d38] via-[#1a1b24] to-[#12131a] p-3 shadow-[0_30px_70px_rgba(0,0,0,0.85),0_0_40px_rgba(124,58,237,0.25)] border border-white/20 relative">

                {/* Webcam Notch */}
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/90 border border-white/10 z-30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1e293b]" />
                  <span className="w-1 h-1 rounded-full bg-emerald-400" />
                </div>

                {/* Diagonal Gloss Sheen */}
                <div className="absolute inset-0 rounded-[20px] bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none z-20" />

                {/* Inner Retina Screen */}
                <div className="rounded-xl bg-[#080a11] border border-white/10 overflow-hidden shadow-2xl flex flex-col h-[320px] sm:h-[350px]">

                  {/* Chrome Tab Bar */}
                  <div className="px-2.5 py-1.5 bg-[#0e111a] border-b border-white/10 flex items-center justify-between gap-1 shrink-0 select-none">
                    {/* Traffic lights */}
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                    </div>

                    {/* File Tabs */}
                    <div className="flex items-center gap-1 overflow-x-auto max-w-[280px]">
                      {Object.keys(LAPTOP_FILES).map((fileName) => {
                        const file = LAPTOP_FILES[fileName];
                        const Icon = file.icon;
                        const active = activeFile === fileName;
                        return (
                          <button
                            key={fileName}
                            onClick={() => setActiveFile(fileName)}
                            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-mono transition-all cursor-pointer whitespace-nowrap ${active
                              ? "bg-[#1c2130] text-white border-b-2 border-cyan-400 font-semibold"
                              : "text-slate-400 hover:text-slate-200"
                              }`}
                          >
                            <Icon className={`text-[10px] ${file.badgeColor}`} />
                            <span>{file.label}</span>
                          </button>
                        );
                      })}
                      <span className="text-slate-500 text-xs px-1 cursor-default">+</span>
                    </div>

                    {/* Quick Code Controls */}
                    <div className="flex items-center gap-1 text-[9px]">
                      <button
                        onClick={handleCopyCode}
                        title="Copy code"
                        className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      >
                        {copiedCode ? <FiCheck className="text-emerald-400" /> : <FiCopy />}
                      </button>
                      <button
                        onClick={handleReplayTypewriter}
                        title="Replay typewriter"
                        className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      >
                        <FiRotateCcw />
                      </button>
                    </div>
                  </div>

                  {/* Code Editor Body */}
                  <div className="flex-1 p-3 overflow-y-auto font-mono text-[10.5px] sm:text-[11.5px] leading-[1.65] text-slate-200 select-text">
                    {fileData.lines.map((line, lineIdx) => {
                      const lineNumber = lineIdx + 1;
                      return (
                        <div key={lineIdx} className="flex items-start hover:bg-white/[0.03] px-1 -mx-1 rounded">
                          <span className="w-5 shrink-0 text-right pr-2.5 text-slate-600 select-none text-[9.5px]">
                            {lineNumber}
                          </span>
                          <div className="flex-1 flex flex-wrap items-center">
                            {line.tokens.length === 0 ? (
                              <span className="h-4" />
                            ) : (
                              line.tokens.map((token, tokenIdx) => {
                                const tokenLength = token.text.length;
                                const tokenStart = accumulatedChars;
                                accumulatedChars += tokenLength;

                                if (charCount <= tokenStart) return null;

                                const visibleChars = Math.min(tokenLength, charCount - tokenStart);
                                const displayedText = token.text.slice(0, visibleChars);
                                const isCurrentToken =
                                  charCount >= tokenStart && charCount < tokenStart + tokenLength;

                                return (
                                  <span key={tokenIdx} className={token.color}>
                                    {displayedText}
                                    {isCurrentToken && (
                                      <span className="inline-block w-1.5 h-3 bg-emerald-400 animate-pulse ml-0.5 align-middle" />
                                    )}
                                  </span>
                                );
                              })
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {!isTyping && charCount >= totalChars && (
                      <div className="flex items-center pl-5 pt-0.5">
                        <span className="inline-block w-1.5 h-3 bg-emerald-400 animate-pulse" />
                      </div>
                    )}
                  </div>

                  {/* VS Code Bottom Status Bar */}
                  <div className="px-2.5 py-1 bg-[#0a0c14] border-t border-white/5 flex items-center justify-between text-[8.5px] font-mono text-slate-500 shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        main*
                      </span>
                      <span>0 errors 0 warnings</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>TypeScript</span>
                      <span>React</span>
                      <span>UTF-8</span>
                      <span>Prettier</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* REALISTIC 3D MACBOOK PRO CHASSIS & KEYBOARD BASE */}
              <div className="relative w-full">
                {/* Cylindrical Aluminum Display Hinge */}
                <div className="h-2.5 w-[96%] mx-auto bg-gradient-to-r from-[#14161f] via-[#3b3e50] to-[#14161f] rounded-b-sm border-t border-white/15 shadow-inner" />

                {/* 3D Perspective Keyboard Deck */}
                <div
                  style={{
                    transform: "perspective(800px) rotateX(38deg)",
                    transformOrigin: "top center",
                  }}
                  className="w-[104%] -ml-[2%] -mt-1 bg-gradient-to-b from-[#262834] via-[#1c1d27] to-[#111218] rounded-b-[26px] border-x border-b border-white/20 p-2.5 sm:p-3.5 shadow-[0_30px_60px_rgba(0,0,0,0.95)]"
                >
                  {/* Keyboard Deck Upper: Recessed Matte Well & Side Speaker Grilles */}
                  <div className="flex items-center gap-1.5 sm:gap-2.5">
                    {/* Left Speaker Grille Micro-perforations */}
                    <div className="w-3 sm:w-5 h-16 sm:h-20 flex flex-col justify-between py-1 opacity-35 select-none">
                      {[...Array(7)].map((_, i) => (
                        <div key={i} className="flex justify-between gap-[2px]">
                          <span className="w-0.5 h-0.5 rounded-full bg-white/50" />
                          <span className="w-0.5 h-0.5 rounded-full bg-white/50" />
                          <span className="w-0.5 h-0.5 rounded-full bg-white/50" />
                        </div>
                      ))}
                    </div>

                    {/* Recessed Matte Black Keyboard Well */}
                    <div className="flex-1 bg-[#090a0f] rounded-md sm:rounded-lg p-1 sm:p-1.5 border border-white/10 shadow-[inset_0_2px_6px_rgba(0,0,0,0.95)] space-y-0.5 sm:space-y-1">
                      {/* Row 1: Function Keys */}
                      <div className="flex gap-0.5 sm:gap-1">
                        {["esc", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "⏻"].map((_, i) => (
                          <div key={i} className="flex-1 h-1 sm:h-1.5 rounded-[1px] bg-[#161822] border border-white/10 shadow-[0_1px_1px_rgba(0,0,0,0.8)]" />
                        ))}
                      </div>

                      {/* Row 2: Numbers */}
                      <div className="flex gap-0.5 sm:gap-1">
                        {[...Array(14)].map((_, i) => (
                          <div key={i} className="flex-1 h-1.5 sm:h-2 rounded-[1.5px] bg-[#14151e] border border-white/10 shadow-[0_1px_1px_rgba(0,0,0,0.8)]" />
                        ))}
                      </div>

                      {/* Row 3: QWERTY */}
                      <div className="flex gap-0.5 sm:gap-1">
                        <div className="w-2.5 sm:w-4 h-1.5 sm:h-2 rounded-[1.5px] bg-[#161822] border border-white/10" />
                        {[...Array(12)].map((_, i) => (
                          <div key={i} className="flex-1 h-1.5 sm:h-2 rounded-[1.5px] bg-[#14151e] border border-white/10 shadow-[0_1px_1px_rgba(0,0,0,0.8)]" />
                        ))}
                        <div className="w-2.5 sm:w-4 h-1.5 sm:h-2 rounded-[1.5px] bg-[#161822] border border-white/10" />
                      </div>

                      {/* Row 4: ASDF */}
                      <div className="flex gap-0.5 sm:gap-1">
                        <div className="w-3 sm:w-5 h-1.5 sm:h-2 rounded-[1.5px] bg-[#161822] border border-white/10" />
                        {[...Array(11)].map((_, i) => (
                          <div key={i} className="flex-1 h-1.5 sm:h-2 rounded-[1.5px] bg-[#14151e] border border-white/10 shadow-[0_1px_1px_rgba(0,0,0,0.8)]" />
                        ))}
                        <div className="w-3.5 sm:w-6 h-1.5 sm:h-2 rounded-[1.5px] bg-[#161822] border border-white/10" />
                      </div>

                      {/* Row 5: ZXCV */}
                      <div className="flex gap-0.5 sm:gap-1">
                        <div className="w-4 sm:w-7 h-1.5 sm:h-2 rounded-[1.5px] bg-[#161822] border border-white/10" />
                        {[...Array(10)].map((_, i) => (
                          <div key={i} className="flex-1 h-1.5 sm:h-2 rounded-[1.5px] bg-[#14151e] border border-white/10 shadow-[0_1px_1px_rgba(0,0,0,0.8)]" />
                        ))}
                        <div className="w-4 sm:w-7 h-1.5 sm:h-2 rounded-[1.5px] bg-[#161822] border border-white/10" />
                      </div>

                      {/* Row 6: Modifiers + Spacebar + Arrows */}
                      <div className="flex gap-0.5 sm:gap-1 items-center">
                        <div className="w-2.5 sm:w-3.5 h-1.5 sm:h-2 rounded-[1.5px] bg-[#161822] border border-white/10" />
                        <div className="w-2.5 sm:w-3.5 h-1.5 sm:h-2 rounded-[1.5px] bg-[#161822] border border-white/10" />
                        <div className="w-3 sm:w-4 h-1.5 sm:h-2 rounded-[1.5px] bg-[#161822] border border-white/10" />
                        {/* Spacebar */}
                        <div className="flex-1 h-1.5 sm:h-2 rounded-[1.5px] bg-[#181a26] border border-white/15 shadow-sm" />
                        <div className="w-3 sm:w-4 h-1.5 sm:h-2 rounded-[1.5px] bg-[#161822] border border-white/10" />
                        <div className="w-2.5 sm:w-3.5 h-1.5 sm:h-2 rounded-[1.5px] bg-[#161822] border border-white/10" />
                        {/* Arrow keys */}
                        <div className="w-5 sm:w-7 h-1.5 sm:h-2 flex gap-[1px]">
                          <div className="flex-1 rounded-[1px] bg-[#14151e] border border-white/10" />
                          <div className="flex-1 rounded-[1px] bg-[#14151e] border border-white/10" />
                          <div className="flex-1 rounded-[1px] bg-[#14151e] border border-white/10" />
                        </div>
                      </div>
                    </div>

                    {/* Right Speaker Grille Micro-perforations */}
                    <div className="w-3 sm:w-5 h-16 sm:h-20 flex flex-col justify-between py-1 opacity-35 select-none">
                      {[...Array(7)].map((_, i) => (
                        <div key={i} className="flex justify-between gap-[2px]">
                          <span className="w-0.5 h-0.5 rounded-full bg-white/50" />
                          <span className="w-0.5 h-0.5 rounded-full bg-white/50" />
                          <span className="w-0.5 h-0.5 rounded-full bg-white/50" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Palm Rest & Glass Force Touch Trackpad */}
                  <div className="pt-1.5 sm:pt-2">
                    <div className="w-28 sm:w-36 h-8 sm:h-11 mx-auto rounded-md bg-white/[0.03] border border-white/15 shadow-[inset_0_1px_2px_rgba(255,255,255,0.06),0_2px_5px_rgba(0,0,0,0.5)]" />
                  </div>

                  {/* Front Lip with Machined Thumb Scoop Notch */}
                  <div className="w-16 sm:w-20 h-0.5 sm:h-1 bg-[#08090e] mx-auto rounded-b-md border-t border-white/20 mt-1 shadow-inner" />
                </div>

                {/* Front Aluminum Bevel Lip */}
                <div className="h-1.5 sm:h-2 w-[98%] mx-auto bg-gradient-to-r from-[#111218] via-[#2d2f3d] to-[#111218] rounded-b-xl border-b border-white/15 -mt-0.5 shadow-lg" />

                {/* Desk Reflection Contact Shadow with Purple Underglow */}
                <div className="h-6 w-[94%] mx-auto bg-purple-600/30 blur-xl rounded-full -mt-2 pointer-events-none" />
              </div>

            </div>

          </div>

        </div>

        {/* ================= BOTTOM ROW: 4 CAPABILITY GLASSMORPHIC CARDS ================= */}
        <div className="mt-14 sm:mt-16 lg:mt-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {CAPABILITY_CARDS.map((card, idx) => {
              const Icon = card.icon;
              
              // Determine neon color based on index to match the cards
              let neonColor = "#a855f7"; // purple
              if (idx === 1) neonColor = "#06b6d4"; // cyan
              if (idx === 2) neonColor = "#f59e0b"; // amber
              if (idx === 3) neonColor = "#10b981"; // emerald

              return (
                <motion.div
                  key={card.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className={`group relative rounded-2xl bg-[var(--card-bg)]/85 backdrop-blur-xl shadow-xl transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] cursor-pointer h-full`}
                >
                  <NeonBorder
                    color={neonColor}
                    rounded={16}
                    borderSize={30}
                    thickness={2}
                    glow={15}
                    movement="step" /* Scratch/step style movement */
                    speed={2}
                  >
                    <div className="flex flex-col justify-between h-full p-5 relative z-10">
                      {/* Subtle Card Ambient Glow */}
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                      {/* Top Bar: Number & Corner Icon */}
                      <div className="relative flex items-center justify-between mb-4">
                        <span className="font-mono text-xs font-bold text-[var(--text-dim)] tracking-wider group-hover:text-[var(--text-muted)] transition-colors">
                          {card.num}
                        </span>
                        <FiMaximize2 className="text-xs text-[var(--text-dim)] group-hover:text-[var(--text-muted)] transition-colors" />
                      </div>

                      {/* Icon & Title Block */}
                      <div className="relative flex items-start gap-3.5 mb-3">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg border transition-transform duration-300 group-hover:scale-110 shrink-0 ${card.iconBg}`}>
                          <Icon />
                        </div>
                        <div>
                          <div className="text-[15px] font-bold font-sans text-[var(--text-main)] tracking-wider uppercase leading-snug group-hover:text-white transition-colors mb-2">
                            {card.title}
                          </div>
                          <p className="text-sm text-[var(--text-muted)] leading-relaxed font-medium">
                            {card.desc}
                          </p>
                        </div>
                      </div>

                      {/* Bottom Corner Button */}
                      <div className="relative mt-2 pt-2 border-t border-[var(--border-subtle)] flex items-center justify-end">
                        <div className="w-7 h-7 rounded-lg bg-white/5 group-hover:bg-white/10 flex items-center justify-center text-[var(--text-dim)] group-hover:text-[var(--text-main)] transition-all">
                          <FiArrowUpRight className="text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </NeonBorder>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
