import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Preloader({ onComplete }) {
  const [phase, setPhase] = useState("letters"); // letters → hold → exit
  const name = "SAVIYO GEORGE";
  const letters = name.split("");

  useEffect(() => {
    // Phase 1: Letters animate in (stagger ~80ms * 13 letters ≈ 1s + 0.6s anim)
    const holdTimer = setTimeout(() => setPhase("hold"), 1600);
    const exitTimer = setTimeout(() => setPhase("exit"), 2200);
    const completeTimer = setTimeout(() => onComplete(), 3000);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 80,
      rotateX: -90,
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.08,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 1.2, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[var(--bg-base)]"
          initial={{ y: 0 }}
          animate={phase === "exit" ? { y: "-100%" } : { y: 0 }}
          exit={{ y: "-100%" }}
          transition={{
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          {/* Grain overlay */}
          <div className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Decorative line */}
          <motion.div
            className="absolute top-1/2 left-[10%] right-[10%] h-px bg-[var(--border-subtle)] origin-center"
            variants={lineVariants}
            initial="hidden"
            animate="visible"
          />

          {/* Name letters */}
          <div className="relative z-10 flex items-center justify-center gap-[0.02em] perspective-[1000px]">
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className={`text-[12vw] md:text-[8vw] font-['Anton'] uppercase leading-none tracking-tight ${
                  letter === " " ? "mx-[2vw]" : ""
                }`}
                style={{ display: "inline-block", transformOrigin: "bottom center" }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </div>

          {/* Subtitle */}
          <motion.p
            className="relative z-10 mt-6 text-xs md:text-sm tracking-[0.4em] uppercase text-[var(--text-dim)]"
            variants={subtitleVariants}
            initial="hidden"
            animate="visible"
          >
            Full Stack Developer
          </motion.p>

          {/* Bottom progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-[var(--text-main)]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.2, ease: "linear" }}
          />

          {/* Corner decorations */}
          <motion.span
            className="absolute top-8 left-8 text-[10px] tracking-[0.3em] uppercase text-[var(--text-dim)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Portfolio / 2026
          </motion.span>
          <motion.span
            className="absolute top-8 right-8 text-[10px] tracking-[0.3em] uppercase text-[var(--text-dim)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Loading
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Preloader;
