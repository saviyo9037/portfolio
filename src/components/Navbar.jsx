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
      setIsOpen(false); // Close mobile menu after clicking
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

  return (
    <nav className="sticky top-0 z-50 w-full bg-gray-900/90 backdrop-blur-md text-white">
      
      {/* FULL WIDTH CONTAINER */}
      <div className="w-full py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <div className="text-lg sm:text-xl lg:text-2xl font-bold cursor-pointer" onClick={() => handleScroll("introduction")}>
          Saviyo George
        </div>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-8 xl:gap-10 text-sm lg:text-base">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleScroll(item.href.substring(1));
                }}
                className={`px-2 py-1 transition ${
                  window.location.hash === item.href
                    ? "text-indigo-400"
                    : "hover:text-indigo-400"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl sm:text-3xl"
          aria-label="Toggle Menu"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden absolute top-full left-0 w-full bg-gray-900 border-t border-gray-800"
          >
            {navItems.map((item) => (
              <li key={item.href} className="border-b border-gray-800">
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleScroll(item.href.substring(1));
                  }}
                  className="block px-6 py-4 text-base hover:bg-gray-800 transition"
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
