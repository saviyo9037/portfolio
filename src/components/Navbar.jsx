import React, { useState, useEffect, useRef, useContext } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { ThemeContext } from "../context/ThemeContext";
import ThemeSwitcher from "./ThemeSwitcher";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("introduction");
  const { isDark } = useContext(ThemeContext);

  const navItems = [
    { href: "#about", label: "ABOUT", id: "about" },
    { href: "#experience", label: "EXPERIENCE", id: "experience" },
    { href: "#skills", label: "SKILLS", id: "skills" },
    { href: "#projects", label: "PROJECTS", id: "projects" },
    { href: "#education", label: "EDUCATION", id: "education" },
    { href: "#contact", label: "CONTACT", id: "contact" },
  ];

  // Scroll detection for navbar background
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 30);
  });

  // Active section detection via IntersectionObserver
  useEffect(() => {
    const sectionIds = ["introduction", "about", "experience", "skills", "education", "projects", "contact"];
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3, rootMargin: "-10% 0px -60% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleScroll = (id) => {
    setIsOpen(false);

    if (id === "introduction") {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      if (window.__lenis) {
        window.__lenis.scrollTo(element, { offset: -60, duration: 1.2 });
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Magnetic hover effect for nav items
  const MagneticNavItem = ({ children, className, onClick, isActive }) => {
    const itemRef = useRef(null);
    const [pos, setPos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
      const rect = itemRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      setPos({
        x: (e.clientX - centerX) * 0.15,
        y: (e.clientY - centerY) * 0.15,
      });
    };

    const handleMouseLeave = () => setPos({ x: 0, y: 0 });

    return (
      <motion.div
        ref={itemRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: "spring", stiffness: 300, damping: 15, mass: 0.1 }}
        className="relative"
      >
        <button onClick={onClick} className={className}>
          {children}
        </button>
        {/* Active indicator dot */}
        {isActive && (
          <motion.div
            layoutId="navActiveIndicator"
            className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#10b981]"
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          />
        )}
      </motion.div>
    );
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 w-full z-50 pointer-events-auto"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Background that appears on scroll */}
        <motion.div
          className="absolute inset-0 bg-[var(--nav-bg)] backdrop-blur-xl border-b border-[var(--border-subtle)] shadow-lg transition-colors duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex items-center justify-between relative z-10">
          {/* Brand Pill */}
          <motion.a
            href="#introduction"
            onClick={(e) => {
              e.preventDefault();
              handleScroll("introduction");
            }}
            className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full border border-[var(--nav-pill-border)] bg-[var(--nav-pill-bg)] backdrop-blur-md shadow-xs hover:border-[var(--text-main)]/40 transition-all cursor-pointer group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981] animate-pulse shrink-0" />
            <div className="flex items-center gap-2.5">
              <span className="font-['JetBrains_Mono',monospace] text-xs sm:text-sm font-bold tracking-widest text-[var(--text-main)] uppercase">
                SAVIYO GEORGE
              </span>
              <span className="hidden xl:inline-block w-[1px] h-3 bg-[var(--border-subtle)]" />
              <span className="hidden xl:inline-block font-mono text-[9px] text-[var(--text-dim)] uppercase tracking-wider">
                FULL-STACK DEVELOPER <span className="opacity-40">/</span> SOFTWARE SOLUTION BUILDER
              </span>
            </div>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => (
              <MagneticNavItem
                key={item.label}
                isActive={activeSection === item.id}
                onClick={() => handleScroll(item.id)}
                className={`text-[11px] font-mono tracking-[0.2em] uppercase font-bold transition-colors cursor-pointer ${
                  activeSection === item.id
                    ? "text-[var(--text-main)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                }`}
              >
                {item.label}
              </MagneticNavItem>
            ))}
          </div>

          {/* Right Actions: Theme Toggle + Connect CTA */}
          <div className="flex items-center gap-3">
            {/* Theme Switcher Button */}
            <ThemeSwitcher compact />

            {/* Right Connect CTA (Hidden on tiny mobile) */}
            <div className="hidden sm:flex items-center">
              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleScroll("contact");
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[var(--btn-cta-bg)] text-[var(--btn-cta-text)] font-mono text-xs font-bold tracking-wider hover:opacity-90 transition-all shadow-md group cursor-pointer border border-transparent"
              >
                <span className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981] group-hover:scale-125 transition-transform" />
                <span>LET'S CONNECT</span>
                <FiArrowUpRight className="text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.a>
            </div>

            {/* Mobile Toggle */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-xs tracking-[0.2em] uppercase font-semibold text-[var(--text-main)] relative z-[60] bg-[var(--card-bg)] border border-[var(--border-subtle)] px-3.5 py-1.5 rounded-full shadow-sm cursor-pointer"
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={isOpen ? "close" : "menu"}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? "Close" : "Menu"}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[55] bg-[var(--bg-base)]/98 backdrop-blur-2xl flex flex-col items-start justify-center px-10 text-[var(--text-main)]"
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Decorative watermark */}
            <motion.span
              className="absolute top-8 right-20 text-[30vw] font-['Anton'] text-[var(--text-main)]/[0.04] leading-none pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              ☰
            </motion.span>

            <nav className="flex flex-col gap-4 relative z-10">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleScroll(item.id);
                  }}
                  className="text-4xl sm:text-5xl font-['Anton'] uppercase tracking-tight text-[var(--text-main)] hover:text-emerald-400 transition-colors flex items-center gap-4"
                  initial={{ y: 60, opacity: 0, filter: "blur(10px)" }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    transition: { delay: 0.15 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                  }}
                  exit={{ y: 30, opacity: 0, filter: "blur(5px)" }}
                >
                  <span className="text-sm text-[var(--text-dim)] font-['Inter'] font-normal tracking-widest">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </motion.a>
              ))}
            </nav>

            {/* Bottom info + theme toggle */}
            <motion.div
              className="absolute bottom-10 left-10 right-10 flex justify-between items-end border-t border-[var(--border-subtle)] pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div>
                <p className="text-xs text-[var(--text-dim)] tracking-widest uppercase">
                  © 2026 Saviyo George
                </p>
                <p className="text-xs text-[var(--text-dim)] tracking-widest uppercase mt-1">
                  Kerala, India
                </p>
              </div>
              <ThemeSwitcher compact />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
