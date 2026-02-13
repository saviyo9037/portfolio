import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "#introduction", label: "Home" },
    { href: "#my-skills", label: "My Skills" },
    { href: "#education", label: "Education" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#what-learning", label: "What I'm Learning" },
    { href: "#achievements", label: "Achievements" },
    { href: "#contact", label: "Contact" },
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
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 20 },
    },
    exit: { opacity: 0, y: -20 },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      },
    }),
  };

  return (
    <nav className="sticky top-0 z-50 w-full glass-dark border-b border-white/5">
      {/* Full width container */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo with gradient text */}
        <motion.div
          className="text-lg sm:text-xl lg:text-2xl font-bold cursor-pointer"
          onClick={() => handleScroll("introduction")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-gradient">Saviyo</span>{" "}
          <span className="text-white">George</span>
        </motion.div>

        {/* Desktop Menu with animated nav items */}
        <ul className="hidden md:flex items-center gap-2 lg:gap-4">
          {navItems.map((item, index) => (
            <motion.li
              key={item.href}
              custom={index}
              variants={navItemVariants}
              initial="hidden"
              animate="visible"
            >
              <a
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleScroll(item.href.substring(1));
                }}
                className="relative px-3 py-2 text-sm lg:text-base font-medium text-gray-300 hover:text-white transition-colors group"
              >
                {item.label}
                {/* Animated underline */}
                <motion.span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                />
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Mobile Menu Button with animation */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl sm:text-3xl text-white p-2"
          aria-label="Toggle Menu"
          whileTap={{ scale: 0.9 }}
        >
          <motion.span
            animate={isOpen ? { rotate: 90, opacity: 0 } : { rotate: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            ☰
          </motion.span>
        </motion.button>
      </div>

      {/* Mobile Menu with slide animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden absolute top-full left-0 w-full glass-dark border-t border-white/5"
          >
            {navItems.map((item, index) => (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-white/5"
              >
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleScroll(item.href.substring(1));
                  }}
                  className="block px-6 py-4 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                >
                  {item.label}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
