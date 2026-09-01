import React, { useState } from "react";
import { motion } from "framer-motion";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

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

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 mix-blend-difference text-[var(--text-main)] pointer-events-auto">
        <div className="container-custom py-6 md:py-8 flex items-center justify-between">
          {/* Brand */}
          <motion.a
            href="#introduction"
            onClick={(e) => {
              e.preventDefault();
              handleScroll("introduction");
            }}
            className="flex items-center gap-2 cursor-pointer group"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-xl md:text-2xl font-['Anton'] uppercase tracking-wider group-hover:opacity-70 transition-opacity">
              Saviyo George
            </span>
          </motion.a>

          {/* Desktop Nav */}
          <motion.div
            className="hidden md:flex items-center gap-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleScroll(item.href.substring(1));
                }}
                className="link-underline text-xs tracking-[0.2em] uppercase font-medium hover:opacity-60 transition-opacity"
              >
                {item.label}
              </a>
            ))}
          </motion.div>

          {/* Mobile Toggle */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-xs tracking-[0.2em] uppercase font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {isOpen ? "Close" : "Menu"}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[var(--bg-base)] flex flex-col items-start justify-center px-10 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
          }`}
      >
        <nav className="flex flex-col gap-6">
          {navItems.map((item, i) => (
            <motion.a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleScroll(item.href.substring(1));
              }}
              className="text-5xl font-['Anton'] uppercase tracking-tight hover:opacity-50 transition-opacity"
              initial={false}
              animate={
                isOpen
                  ? { y: 0, opacity: 1, transition: { delay: 0.1 + i * 0.08 } }
                  : { y: 30, opacity: 0 }
              }
            >
              {item.label}
            </motion.a>
          ))}
        </nav>
      </div>
    </>
  );
}

export default Navbar;
