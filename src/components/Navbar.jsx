import React, { useState, useEffect, useRef, useContext } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { FiArrowUpRight, FiX, FiMenu } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import ThemeSwitcher from "./ThemeSwitcher";

// ─── nav items ────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "about",        label: "About" },
  { id: "experience",   label: "Experience" },
  { id: "skills",       label: "Skills" },
  { id: "projects",     label: "Projects" },
  { id: "education",    label: "Education" },
  { id: "contact",      label: "Contact" },
  { id: "technologies", label: "Tech & Skills", route: "/skills" },
];

// ─── component ────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [isOpen, setIsOpen]             = useState(false);
  const [scrolled, setScrolled]         = useState(false);
  const [activeSection, setActiveSection] = useState("introduction");
  const { isDark } = useContext(ThemeContext);
  const { pathname } = useLocation();
  const navigate     = useNavigate();
  const onHome       = pathname === "/";

  const current = pathname === "/skills" ? "technologies" : activeSection;

  // ── scroll detection ──
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 20));

  // ── active section via IntersectionObserver ──
  useEffect(() => {
    if (!onHome) return;
    const ids = ["introduction", "about", "experience", "skills", "education", "projects", "contact"];
    const obs = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveSection(id); },
        { threshold: 0.25, rootMargin: "-10% 0px -60% 0px" }
      );
      o.observe(el);
      return o;
    });
    return () => obs.forEach((o) => o?.disconnect());
  }, [onHome]);

  // ── navigation helper ──
  const go = (id) => {
    setIsOpen(false);
    if (id === "technologies") { navigate("/skills"); return; }
    if (!onHome) { navigate(id === "introduction" ? "/" : `/#${id}`); return; }
    if (id === "introduction") {
      window.__lenis ? window.__lenis.scrollTo(0, { duration: 1.2 }) : window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      window.__lenis
        ? window.__lenis.scrollTo(el, { offset: -68, duration: 1.2 })
        : el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* ══════════════════ NAV BAR ══════════════════ */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[100]"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* frosted backdrop — fades in on scroll */}
        <motion.div
          className="absolute inset-0 bg-[var(--nav-bg)] backdrop-blur-2xl border-b border-[var(--border-subtle)] transition-colors duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        />

        <div className="relative z-10 max-w-[1340px] mx-auto px-5 sm:px-8 lg:px-12 h-16 flex items-center justify-between gap-6">

          {/* ── BRAND ── */}
          <motion.button
            onClick={() => go("introduction")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2.5 shrink-0 cursor-pointer group"
          >
            {/* green pulse dot */}
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            </span>
            <span className="font-['JetBrains_Mono',monospace] text-sm font-bold tracking-[0.12em] uppercase text-[var(--text-main)] group-hover:text-emerald-400 transition-colors duration-200">
              Saviyo George
            </span>
          </motion.button>

          {/* ── DESKTOP NAV ── */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-0">
            {NAV_ITEMS.map((item) => {
              const isActive = current === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  className={[
                    "relative px-3 xl:px-4 py-2 font-mono text-[11px] xl:text-[12px] font-semibold tracking-[0.12em] uppercase rounded-lg transition-colors duration-200 cursor-pointer whitespace-nowrap",
                    isActive
                      ? "text-[var(--text-main)]"
                      : "text-[var(--text-dim)] hover:text-[var(--text-main)]",
                  ].join(" ")}
                >
                  {item.label}
                  {/* animated underline indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="navUnderline"
                      className="absolute bottom-0.5 left-3 xl:left-4 right-3 xl:right-4 h-[2px] rounded-full bg-emerald-400"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* ── RIGHT ACTIONS ── */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Theme toggle */}
            <ThemeSwitcher compact />

            {/* Let's Connect CTA — hidden on mobile */}
            <motion.button
              onClick={() => go("contact")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--btn-cta-bg)] text-[var(--btn-cta-text)] font-mono text-[11px] font-bold tracking-widest uppercase shadow-md hover:opacity-90 transition-all cursor-pointer group"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)] group-hover:scale-125 transition-transform" />
              Connect
              <FiArrowUpRight className="text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>

            {/* Mobile hamburger */}
            <motion.button
              onClick={() => setIsOpen((v) => !v)}
              whileTap={{ scale: 0.93 }}
              aria-label="Toggle menu"
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full border border-[var(--border-subtle)] bg-[var(--nav-pill-bg)] text-[var(--text-main)] hover:border-[var(--text-dim)]/40 transition-all cursor-pointer"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isOpen ? "x" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="flex items-center justify-center"
                >
                  {isOpen ? <FiX className="text-base" /> : <FiMenu className="text-base" />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* ══════════════════ MOBILE MENU OVERLAY ══════════════════ */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* backdrop */}
            <motion.div
              className="fixed inset-0 z-[108] bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
            />

            {/* drawer panel — slides from top */}
            <motion.div
              className="fixed top-0 left-0 right-0 z-[109] bg-[var(--bg-base)] border-b border-[var(--border-subtle)] shadow-2xl overflow-hidden"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.38, ease: [0.32, 0, 0.1, 1] }}
            >
              {/* header row */}
              <div className="flex items-center justify-between px-5 sm:px-8 h-16 border-b border-[var(--border-subtle)]/50">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                  </span>
                  <span className="font-['JetBrains_Mono',monospace] text-sm font-bold tracking-[0.12em] uppercase text-[var(--text-main)]">
                    Saviyo George
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-[var(--border-subtle)] bg-[var(--nav-pill-bg)] text-[var(--text-main)] cursor-pointer hover:border-[var(--text-dim)]/40 transition-all"
                >
                  <FiX className="text-base" />
                </button>
              </div>

              {/* nav links */}
              <nav className="px-5 sm:px-8 py-4">
                {NAV_ITEMS.map((item, i) => {
                  const isActive = current === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => go(item.id)}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 + i * 0.045, duration: 0.3, ease: "easeOut" }}
                      className={[
                        "flex items-center justify-between w-full px-4 py-3.5 rounded-xl mb-1 font-mono text-[13px] font-semibold tracking-[0.1em] uppercase transition-colors duration-150 cursor-pointer group",
                        isActive
                          ? "bg-[var(--bg-elevated)] text-[var(--text-main)]"
                          : "text-[var(--text-dim)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-main)]",
                      ].join(" ")}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] text-[var(--text-dim)]/60 w-5">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {item.label}
                      </div>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                      )}
                    </motion.button>
                  );
                })}
              </nav>

              {/* footer row */}
              <motion.div
                className="flex items-center justify-between px-5 sm:px-8 pb-6 pt-2 border-t border-[var(--border-subtle)]/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
              >
                <div className="flex flex-col gap-0.5">
                  <span className="font-mono text-[10px] text-[var(--text-dim)] uppercase tracking-widest">
                    © 2026 Saviyo George
                  </span>
                  <span className="font-mono text-[10px] text-[var(--text-dim)]/60 uppercase tracking-widest">
                    Kerala, India
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ThemeSwitcher compact />
                  <button
                    onClick={() => go("contact")}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--btn-cta-bg)] text-[var(--btn-cta-text)] font-mono text-[11px] font-bold tracking-widest uppercase shadow-md hover:opacity-90 transition-all cursor-pointer"
                  >
                    Connect
                    <FiArrowUpRight className="text-sm" />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
