import React from "react";
import { motion } from "framer-motion";

function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 mix-blend-difference text-white">
        <div className="container-custom py-6 md:py-8 flex items-center justify-between">
          {/* Brand */}
          <motion.a
            href="#introduction"
            onClick={(e) => {
              e.preventDefault();
              handleScroll("introduction");
            }}
            className="flex flex-col leading-[0.85] cursor-pointer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-2xl md:text-3xl font-['Anton'] uppercase tracking-tight">
              Saviyo
            </span>
            <span className="text-2xl md:text-3xl font-['Anton'] uppercase tracking-tight ml-6 md:ml-8">
              George
            </span>
          </motion.a>

          {/* Desktop Nav */}
          <motion.div
            className="hidden md:flex items-center gap-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {navItems.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleScroll(item.href.substring(1));
                }}
                className="link-underline text-sm uppercase tracking-[0.15em] font-medium hover:opacity-60 transition-opacity"
              >
                {item.label}
              </a>
            ))}
          </motion.div>

          {/* Mobile Toggle */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-sm uppercase tracking-[0.15em] font-medium"
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
        className={`fixed inset-0 z-40 bg-[var(--bg-base)] flex flex-col items-start justify-center px-10 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isOpen
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
