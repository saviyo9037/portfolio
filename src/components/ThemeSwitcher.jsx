import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";
import { motion } from "framer-motion";

function ThemeSwitcher() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      className="fixed top-6 right-6 z-50 
                 bg-white/10 backdrop-blur-lg 
                 border border-white/20 
                 p-3 rounded-full 
                 shadow-xl 
                 hover:shadow-purple-500/30 
                 transition duration-300"
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {theme === "dark" ? (
          <FaSun className="text-yellow-400 text-lg" />
        ) : (
          <FaMoon className="text-purple-400 text-lg" />
        )}
      </motion.div>
    </motion.button>
  );
}

export default ThemeSwitcher;
