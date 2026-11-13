import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiMenu, FiArrowRight, FiCpu } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

const ACCENT = "#ff8a1f";

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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("introduction");
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

  return (
    <>
      <motion.nav
        className="fixed left-0 right-0 top-0 z-[100]"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 border-b border-[var(--border-subtle)] bg-[var(--bg-base)]/90 backdrop-blur-xl transition-opacity duration-300"
          style={{ opacity: 1 }}
        />

        <div className="relative z-10 mx-auto flex h-20 max-w-[1680px] items-center justify-between gap-6 px-5 sm:px-8">
          {/* Brand badge */}
          <button
            type="button"
            onClick={() => go("introduction")}
            className="flex shrink-0 items-center gap-3 text-left"
          >
            <span
              className="flex h-10 w-10 items-center justify-center rounded-lg border-2 text-sm font-extrabold tracking-tight"
              style={{ borderColor: ACCENT, color: ACCENT }}
            >
              SG
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="text-sm font-bold text-[var(--text-main)]">Saviyo George</span>
              <span className="text-xs text-[var(--text-muted)]">Full-Stack Developer</span>
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = current === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => go(item.id)}
                  className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-[15px] transition-colors ${
                    item.id === "technologies"
                      ? isActive
                        ? "border border-dashed border-transparent font-semibold text-black"
                        : "border border-dashed border-[#ff8a1f] font-semibold text-[#ff8a1f] hover:bg-[#ff8a1f]/15"
                      : isActive
                        ? "font-semibold text-black"
                        : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                  }`}
                  style={isActive ? { backgroundColor: ACCENT } : undefined}
                >
                  {item.id === "technologies" && <FiCpu aria-hidden="true" />}
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right actions */}
          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={() => go("contact")}
              className="hidden items-center gap-2 rounded-full border-2 px-5 py-2.5 text-sm font-semibold text-[var(--text-main)] transition-colors hover:text-black md:inline-flex"
              style={{ borderColor: ACCENT }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = ACCENT)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              Let's Connect <FiArrowRight aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-main)] lg:hidden"
            >
              {isOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[108] bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="fixed inset-x-0 top-0 z-[109] max-h-[100dvh] overflow-y-auto border-b border-[var(--border-subtle)] bg-[var(--bg-base)] px-5 pb-8 pt-5 shadow-2xl"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.35, ease: [0.32, 0, 0.1, 1] }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[var(--text-main)]">Saviyo George</span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--text-main)]"
                >
                  <FiX aria-hidden="true" />
                </button>
              </div>

              <nav className="mt-6 flex flex-col">
                {NAV_ITEMS.map((item) => {
                  const isActive = current === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => go(item.id)}
                      className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-left text-base transition-colors ${
                        item.id === "technologies"
                          ? isActive
                            ? "border border-dashed border-transparent font-semibold text-black"
                            : "border border-dashed border-[#ff8a1f] font-semibold text-[#ff8a1f] hover:bg-[#ff8a1f]/15"
                          : isActive
                            ? "font-semibold text-black"
                            : "text-[var(--text-main)] hover:bg-[var(--bg-surface)]"
                      }`}
                      style={isActive ? { backgroundColor: ACCENT } : undefined}
                    >
                      <span className="inline-flex items-center gap-2">
                        {item.id === "technologies" && <FiCpu aria-hidden="true" />}
                        {item.label}
                      </span>
                      {isActive && <FiArrowRight aria-hidden="true" />}
                    </button>
                  );
                })}
              </nav>

              <div className="mt-6 flex items-center">
                <button
                  type="button"
                  onClick={() => go("contact")}
                  className="inline-flex items-center gap-2 rounded-full border-2 px-5 py-2.5 text-sm font-semibold text-[var(--text-main)]"
                  style={{ borderColor: ACCENT }}
                >
                  Let's Connect <FiArrowRight aria-hidden="true" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
