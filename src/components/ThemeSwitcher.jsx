import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";
import { motion } from "framer-motion";

function ThemeSwitcher({ compact = false, className = "" }) {
  const { theme, toggleTheme, isDark } = useContext(ThemeContext);

  if (compact) {
    return (
      <motion.button
        onClick={toggleTheme}
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.05 }}
        title={isDark ? "Switch to White / Light Theme" : "Switch to Dark Theme"}
        aria-label={isDark ? "Switch to White / Light Theme" : "Switch to Dark Theme"}
        className={`relative flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all cursor-pointer shadow-sm ${
          isDark
            ? "bg-white/10 border-white/20 text-yellow-300 hover:bg-white/15 hover:border-yellow-400/40"
            : "bg-black/5 border-black/15 text-indigo-600 hover:bg-black/10 hover:border-indigo-400/40"
        } ${className}`}
      >
        <motion.div
          key={theme}
          initial={{ rotate: -90, scale: 0.7, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          {isDark ? <FiMoon className="text-sm text-emerald-400" /> : <FiSun className="text-sm text-amber-500" />}
        </motion.div>
        <span className="font-mono text-[11px] font-bold tracking-wider uppercase">
          {isDark ? "DARK" : "LIGHT"}
        </span>
      </motion.button>
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.06 }}
      title={isDark ? "Switch to White / Light Theme" : "Switch to Dark Theme"}
      aria-label={isDark ? "Switch to White / Light Theme" : "Switch to Dark Theme"}
      className={`fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-2.5 px-4 py-2.5 rounded-full border backdrop-blur-xl shadow-2xl transition-all cursor-pointer ${
        isDark
          ? "bg-[#121216]/90 border-white/20 text-white hover:border-yellow-400/50 hover:shadow-[0_0_20px_rgba(250,204,21,0.25)]"
          : "bg-white/90 border-black/15 text-black hover:border-indigo-500/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.25)]"
      } ${className}`}
    >
      <div className={`p-1.5 rounded-full ${isDark ? "bg-yellow-400/20 text-yellow-300" : "bg-indigo-500/15 text-indigo-600"}`}>
        <motion.div
          key={theme}
          initial={{ rotate: -90, scale: 0.7, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          {isDark ? <FiSun className="text-sm" /> : <FiMoon className="text-sm" />}
        </motion.div>
      </div>
      <div className="flex flex-col text-left font-mono">
        <span className="text-[9px] uppercase tracking-wider opacity-60 leading-none">THEME</span>
        <span className="text-xs font-bold tracking-wider uppercase leading-tight">
          {isDark ? "LIGHT MODE" : "DARK MODE"}
        </span>
      </div>
    </motion.button>
  );
}

export default ThemeSwitcher;
