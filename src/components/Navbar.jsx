import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FiArrowRight, FiArrowUpRight, FiCpu } from "react-icons/fi";
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
        className={`fixed inset-x-0 top-0 z-[100] transition-[background-color,border-color,backdrop-filter] duration-300 ${
          scrolled ? "border-b border-white/10 bg-[#0b0a12]/95" : "border-b border-transparent bg-transparent"
        }`}
        initial={{ y: -90 }}
        animate={{ y: hide ? -96 : 0 }}
        transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
      >
        <nav aria-label="Main" className="mx-auto flex h-16 w-full max-w-[1500px] items-center justify-between gap-4 px-5 sm:h-[4.5rem] sm:px-8">
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
              className="relative z-[130] flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-[var(--text-main)] transition-colors hover:border-white/40 lg:hidden"
            >
              <MenuIcon open={isOpen} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu: a full-screen sheet with big links */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[120] flex flex-col overflow-y-auto bg-[#0e0c16] px-6 pb-10 pt-24"
            initial={{ clipPath: "circle(0% at calc(100% - 2.75rem) 2.25rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.75rem) 2.25rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2.75rem) 2.25rem)" }}
            transition={{ duration: reduce ? 0 : 0.55, ease: EASE }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <ul className="m-0 flex list-none flex-col p-0">
              {NAV_ITEMS.map((item, i) => {
                const isActive = current === item.id;
                const special = item.id === "technologies";
                return (
                  <motion.li
                    key={item.id}
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.18 + i * 0.045, ease: EASE }}
                    className="border-b border-white/10"
                  >
                    <button
                      type="button"
                      onClick={() => go(item.id)}
                      className="flex w-full items-center justify-between gap-4 py-3.5 text-left"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-mono text-xs text-[var(--text-dim)]">{String(i + 1).padStart(2, "0")}</span>
                        <span
                          className="inline-flex items-center gap-2 text-[1.7rem] font-black tracking-tight"
                          style={{ fontFamily: "'Inter', sans-serif", color: isActive || special ? ACCENT : "var(--text-main)" }}
                        >
                          {special && <FiCpu aria-hidden="true" className="text-xl" />}
                          {item.label}
                        </span>
                      </span>
                      <FiArrowUpRight aria-hidden="true" className={isActive ? "text-[#ff4d00]" : "text-[var(--text-dim)]"} />
                    </button>
                  </motion.li>
                );
              })}
            </ul>

            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-auto flex flex-col gap-4 pt-10"
            >
              <button
                type="button"
                onClick={() => go("contact")}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full text-base font-bold text-black"
                style={{ backgroundColor: ACCENT }}
              >
                Let&apos;s Connect <FiArrowRight aria-hidden="true" />
              </button>
              <p className="m-0 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-dim)]">Saviyo George · Kerala, India</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
