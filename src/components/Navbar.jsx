import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("introduction");

  const navItems = [
    { href: "#about", label: "About", id: "about" },
    { href: "#experience", label: "Experience", id: "experience" },
    { href: "#skills", label: "Skills", id: "skills" },
    { href: "#projects", label: "Projects", id: "projects" },
    { href: "#contact", label: "Contact", id: "contact" },
  ];

  // Scroll detection for navbar background
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
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
        window.__lenis.scrollTo(element, { offset: 0, duration: 1.2 });
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
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--text-main)]"
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
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Background that appears on scroll */}
        <motion.div
          className="absolute inset-0 bg-[var(--bg-base)]/70 backdrop-blur-xl border-b border-[var(--border-subtle)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <div className="container-custom py-5 md:py-6 flex items-center justify-between relative z-10">
          {/* Brand */}
          <motion.a
            href="#introduction"
            onClick={(e) => {
              e.preventDefault();
              handleScroll("introduction");
            }}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <span className="text-xl md:text-2xl font-['Anton'] uppercase tracking-wider text-[var(--text-main)] mix-blend-difference relative overflow-hidden">
              <motion.span
                className="inline-block"
                whileHover={{
                  transition: { staggerChildren: 0.03 },
                }}
              >
                Saviyo George
              </motion.span>
            </span>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <MagneticNavItem
                key={item.href}
                isActive={activeSection === item.id}
                onClick={() => handleScroll(item.id)}
                className="link-underline text-xs tracking-[0.2em] uppercase font-medium hover:opacity-60 transition-opacity text-[var(--text-main)] mix-blend-difference"
              >
                {item.label}
              </MagneticNavItem>
            ))}
          </div>

          {/* Mobile Toggle */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-xs tracking-[0.2em] uppercase font-medium text-[var(--text-main)] mix-blend-difference relative z-[60]"
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={isOpen ? "close" : "menu"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? "Close" : "Menu"}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[55] bg-[var(--bg-base)]/95 backdrop-blur-2xl flex flex-col items-start justify-center px-10"
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Decorative number */}
            <motion.span
              className="absolute top-8 right-20 text-[30vw] font-['Anton'] text-white/[0.02] leading-none pointer-events-none"
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
                  className="text-5xl font-['Anton'] uppercase tracking-tight hover:opacity-50 transition-opacity flex items-center gap-4"
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

            {/* Bottom info */}
            <motion.div
              className="absolute bottom-10 left-10 right-10 flex justify-between items-end"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div>
                <p className="text-xs text-[var(--text-dim)] tracking-widest uppercase">
                  © 2026 Saviyo George
                </p>
              </div>
              <div>
                <p className="text-xs text-[var(--text-dim)] tracking-widest uppercase">
                  Kerala, India
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
