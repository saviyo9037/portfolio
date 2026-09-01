import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function Introduction() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Stagger text reveal
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const lineVariants = {
    hidden: { y: "110%" },
    visible: {
      y: "0%",
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const marqueeItems = (text, count = 8) =>
    [...Array(count)].map((_, i) => (
      <span
        key={i}
        className="text-[18vw] md:text-[12vw] font-['Anton'] uppercase leading-[0.9] tracking-tight whitespace-nowrap px-[2vw]"
      >
        {text}
      </span>
    ));

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[var(--bg-base)]"
    >
      {/* ===== HERO CONTENT ===== */}
      <div className="flex-1 flex flex-col justify-center relative pt-28 md:pt-36">
        {/* Main Heading */}
        <motion.div
          className="container-custom"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Subtitle */}
          <motion.div variants={fadeUp} className="mb-6 md:mb-8">
            <span className="text-xs md:text-sm tracking-[0.3em] uppercase text-[var(--text-muted)] font-medium">
              Full Stack Developer — Available for work
            </span>
          </motion.div>

          {/* Name - Massive Typography */}
          <div className="overflow-hidden">
            <motion.h1
              variants={lineVariants}
              className="text-[16vw] md:text-[11vw] font-['Anton'] uppercase leading-[0.88] tracking-tight"
            >
              Saviyo
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              variants={lineVariants}
              className="text-[16vw] md:text-[11vw] font-['Anton'] uppercase leading-[0.88] tracking-tight md:ml-[15vw]"
            >
              George
            </motion.h1>
          </div>
        </motion.div>
      </div>

      {/* ===== MARQUEE STRIP ===== */}
      <div className="border-t border-[var(--border-subtle)] py-4 md:py-6 overflow-hidden">
        <div className="marquee-track">{marqueeItems("MERN Stack")}{marqueeItems("MERN Stack")}</div>
      </div>

      {/* ===== BOTTOM INFO BAR ===== */}
      <motion.div
        className="container-custom py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-t border-[var(--border-subtle)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <p className="text-sm text-[var(--text-muted)] max-w-md leading-relaxed">
          Crafting responsive, scalable web applications with clean architecture and pixel-perfect interfaces.
        </p>
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs tracking-[0.2em] uppercase text-[var(--text-muted)]">
            Based in Kerala, India
          </span>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-32 md:bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <motion.div
          className="w-[1px] h-12 bg-gradient-to-b from-[var(--text-muted)] to-transparent origin-top"
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--text-dim)]">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}

export default Introduction;
