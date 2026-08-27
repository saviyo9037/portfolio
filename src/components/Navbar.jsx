import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "#introduction", label: "HOME" },
    { href: "#skills", label: "SKILLS" },
    { href: "#experience", label: "EXPERIENCE" },
    { href: "#education", label: "EDUCATION" },
    { href: "#projects", label: "PROJECTS" },
    { href: "#contact", label: "CONTACT" },
  ];

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 20 } },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#09090B] border-b border-[#18181B] font-mono text-sm shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Brand */}
        <motion.div
          className="text-lg sm:text-xl font-bold cursor-pointer text-[#FAFAFA] flex items-center gap-2"
          onClick={() => handleScroll("introduction")}
          whileHover={{ opacity: 0.8 }}
        >
          <span className="text-cyan cursor-blink">&gt;</span> SAVIYO GEORGE
        </motion.div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleScroll(item.href.substring(1));
                }}
                className="text-[#A1A1AA] hover:text-[#00F0FF] transition-colors relative group uppercase tracking-widest"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[#00F0FF] p-2"
          aria-label="Toggle Menu"
        >
          {isOpen ? "[ X ]" : "[ = ]"}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden absolute top-full left-0 w-full bg-[#18181B] border-b border-white/5 font-mono text-center"
          >
            {navItems.map((item) => (
              <li key={item.href} className="border-b border-white/5 last:border-0">
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleScroll(item.href.substring(1));
                  }}
                  className="block px-6 py-4 text-[#A1A1AA] hover:text-[#00F0FF] hover:bg-black/20 transition-all uppercase tracking-widest"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
