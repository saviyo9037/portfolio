import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fast & smooth loading process
    const duration = 1100; // 1.1 seconds loading time
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min(Math.floor((currentStep / steps) * 100), 100);
      setProgress(nextProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          onComplete();
        }, 150);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[var(--bg-base)] overflow-hidden"
      initial={{ y: "0%" }}
      exit={{ y: "-100%" }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Decorative background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, var(--text-main) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Loading Counter */}
        <div className="overflow-hidden mb-4">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="flex items-baseline"
          >
            <span className="text-7xl md:text-9xl font-['Anton'] text-[var(--text-main)] tabular-nums tracking-tighter">
              {progress}
            </span>
            <span className="text-3xl md:text-5xl font-['Anton'] text-[var(--text-dim)] ml-2">
              %
            </span>
          </motion.div>
        </div>

        {/* Loading Bar */}
        <div className="w-64 md:w-96 h-[2px] bg-[var(--border-subtle)] relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 bottom-0 bg-[var(--accent)]"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>

        <motion.div
          className="mt-8 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <span className="text-xs tracking-[0.3em] uppercase text-[var(--text-dim)] font-medium">
            Loading Experience
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Preloader;
