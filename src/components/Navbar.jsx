import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion, useScroll } from "framer-motion";
import { FiArrowRight, FiBookOpen, FiBriefcase, FiCode, FiCpu, FiHome, FiLayers, FiMail, FiUser } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

const ACCENT = "#ff4d00";
const EASE = [0.22, 1, 0.36, 1];

// Section ids on the home page. "technologies" is its own page at /skills.
const NAV_ITEMS = [
  { id: "introduction", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
  { id: "technologies", label: "Tech & Skills", route: "/skills" },
];

const TILE_ICONS = {
  introduction: <FiHome aria-hidden="true" />,
  about: <FiUser aria-hidden="true" />,
  experience: <FiBriefcase aria-hidden="true" />,
  skills: <FiCode aria-hidden="true" />,
  projects: <FiLayers aria-hidden="true" />,
  education: <FiBookOpen aria-hidden="true" />,
  contact: <FiMail aria-hidden="true" />,
  technologies: <FiCpu aria-hidden="true" />,
};

const SECTION_IDS = ["introduction", "about", "experience", "skills", "projects", "education", "contact"];

// Two lines that turn into a cross
function MenuIcon({ open }) {
  return (
    <span className="relative block h-3.5 w-6" aria-hidden="true">
      <span className={`absolute left-0 h-[2px] w-6 rounded bg-current transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
      <span className={`absolute left-0 h-[2px] w-6 rounded bg-current transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
    </span>
  );
}

export default function Navbar() {
  const reduce = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("introduction");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const { scrollYProgress } = useScroll();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const onHome = pathname === "/";

  const current = pathname === "/skills" ? "technologies" : activeSection;

  // Highlight the section in view while on the home page
  useEffect(() => {
    if (!onHome) return;
    const observers = SECTION_IDS.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const o = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.25, rootMargin: "-10% 0px -60% 0px" }
      );
      o.observe(el);
      return o;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [onHome]);

  // The bar turns solid after you scroll, hides while you scroll down and returns when you scroll up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y < 120) setHidden(false);
      else if (y > lastY.current + 6) setHidden(true);
      else if (y < lastY.current - 6) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const go = (id) => {
    setIsOpen(false);
    if (id === "technologies") {
      navigate("/skills");
      return;
    }
    if (!onHome) {
      navigate(id === "introduction" ? "/" : `/#${id}`);
      return;
    }
    if (id === "introduction") {
      if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.2 });
      else window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -72, duration: 1.2 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  const hide = hidden && !isOpen;

  return (
    <>
      <motion.header
        className={`fixed inset-x-3 top-3 z-[100] rounded-full border border-white/12 bg-[#14121d]/95 shadow-[0_12px_40px_rgba(0,0,0,0.45)] transition-[background-color,border-color] duration-300 lg:inset-x-0 lg:top-0 lg:rounded-none lg:border-x-0 lg:border-t-0 lg:shadow-none ${
          scrolled ? "lg:border-white/10 lg:bg-[#0b0a12]/95" : "lg:border-transparent lg:bg-transparent"
        }`}
        initial={{ y: -90 }}
        animate={{ y: hide ? -110 : 0 }}
        transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
      >
        <nav aria-label="Main" className="mx-auto flex h-14 w-full max-w-[1500px] items-center justify-between gap-4 pl-5 pr-2 lg:h-[4.5rem] lg:px-8">
          {/* Brand */}
          <button type="button" onClick={() => go("introduction")} className="group flex shrink-0 items-baseline gap-2 text-left" aria-label="Saviyo George, go to the top">
            <span className="text-xl font-black tracking-[-0.04em] text-[var(--text-main)] sm:text-2xl" style={{ fontFamily: "'Inter', sans-serif" }}>
              SAVIYO<span style={{ color: ACCENT }}>.</span>
            </span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-dim)] transition-colors group-hover:text-[var(--text-muted)] xl:inline">Full-stack dev</span>
          </button>

          {/* Desktop links: a yellow underline slides to the active one */}
          <ul className="m-0 hidden list-none items-center gap-1 p-0 lg:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = current === item.id;
              const special = item.id === "technologies";
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => go(item.id)}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative inline-flex items-center gap-1.5 whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff4d00] ${
                      isActive ? "text-[var(--text-main)]" : special ? "text-[#ff4d00] hover:text-white" : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                    }`}
                  >
                    {special && <FiCpu aria-hidden="true" />}
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full"
                        style={{ backgroundColor: ACCENT }}
                        transition={{ type: "spring", stiffness: 450, damping: 36 }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Right: call to action and the menu button */}
          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={() => go("contact")}
              className="group hidden h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold text-[#0b0a12] transition-colors hover:bg-[#ff4d00] hover:text-white md:inline-flex"
              style={{ backgroundColor: "#f4f0ff" }}
            >
              Let&apos;s Connect <FiArrowRight aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>

            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="relative z-[130] flex h-10 w-10 items-center justify-center rounded-full bg-[#f4f0ff] text-[#0b0a12] transition-transform active:scale-90 lg:hidden"
            >
              <svg aria-hidden="true" viewBox="0 0 44 44" className="pointer-events-none absolute -inset-[3px] h-[calc(100%+6px)] w-[calc(100%+6px)] -rotate-90">
                <circle cx="22" cy="22" r="20" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
                <motion.circle cx="22" cy="22" r="20" fill="none" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" style={{ pathLength: scrollYProgress }} />
              </svg>
              <MenuIcon open={isOpen} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Phone menu: a dimmed page and a floating panel of tiles that pop in one after another */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[95] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <button type="button" aria-label="Close menu" className="absolute inset-0 h-full w-full cursor-default bg-black/65" onClick={() => setIsOpen(false)} />

            <motion.div
              className="absolute inset-x-3 top-[4.75rem] max-h-[calc(100dvh-5.5rem)] overflow-y-auto rounded-[1.75rem] border border-white/12 bg-[#14121d] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
              style={{ transformOrigin: "100% 0%" }}
              initial={reduce ? false : { opacity: 0, scale: 0.85, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            >
              <ul className="m-0 grid list-none grid-cols-2 gap-2.5 p-0">
                {NAV_ITEMS.map((item, i) => {
                  const isActive = current === item.id;
                  const special = item.id === "technologies";
                  return (
                    <motion.li
                      key={item.id}
                      className={special ? "col-span-2" : ""}
                      initial={reduce ? false : { opacity: 0, scale: 0.8, y: 14 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 340, damping: 22, delay: 0.08 + i * 0.045 }}
                    >
                      <button
                        type="button"
                        onClick={() => go(item.id)}
                        aria-current={isActive ? "page" : undefined}
                        className={`flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition-colors active:scale-[0.97] ${
                          isActive ? "border-transparent text-[#0b0a12]" : special ? "border-[#ff4d00]/50 text-[#ff4d00]" : "border-white/10 bg-white/[0.03] text-[var(--text-main)]"
                        }`}
                        style={isActive ? { backgroundColor: "#f4f0ff" } : undefined}
                      >
                        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-lg ${isActive ? "text-white" : "bg-white/[0.06]"}`} style={isActive ? { backgroundColor: ACCENT } : undefined}>
                          {TILE_ICONS[item.id]}
                        </span>
                        <span className="min-w-0">
                          <span className="block font-mono text-[10px] opacity-60">{String(i + 1).padStart(2, "0")}</span>
                          <span className="block truncate text-[15px] font-bold leading-tight">{item.label}</span>
                        </span>
                      </button>
                    </motion.li>
                  );
                })}
              </ul>

              <motion.div
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-3 flex items-center justify-between gap-3 rounded-2xl bg-white/[0.04] p-2 pl-4"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-dim)]">Kerala, India</span>
                <button
                  type="button"
                  onClick={() => go("contact")}
                  className="inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-bold text-black active:scale-95"
                  style={{ backgroundColor: ACCENT }}
                >
                  Let&apos;s Connect <FiArrowRight aria-hidden="true" />
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
