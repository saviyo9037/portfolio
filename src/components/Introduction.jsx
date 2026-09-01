import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function Introduction() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax for the main text
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Split text animation for name
  const nameFirstLine = "Saviyo";
  const nameSecondLine = "George";

  const charVariants = {
    hidden: { y: "110%", opacity: 0, rotateX: -40 },
    visible: (i) => ({
      y: "0%",
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        delay: 0.4 + i * 0.04,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
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
        className="text-[18vw] md:text-[12vw] font-['Anton'] uppercase leading-[0.9] tracking-tight whitespace-nowrap px-[2vw] text-[var(--text-main)]"
      >
        {text}
        <span className="text-[var(--text-dim)] mx-[1vw]">•</span>
      </span>
    ));

  // Rotating "Available" badge SVG text
  const badgeText = "AVAILABLE FOR WORK • OPEN TO OPPORTUNITIES • ";

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[var(--bg-base)]"
    >
      {/* ===== HERO CONTENT ===== */}
      <motion.div
        className="flex-1 flex flex-col justify-center relative pt-28 md:pt-36"
        style={{ y: textY, opacity: textOpacity }}
      >
        {/* Main Heading */}
        <div className="container-custom">
          {/* Subtitle */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-6 md:mb-8"
          >
            <span className="text-xs md:text-sm tracking-[0.3em] uppercase text-[var(--text-muted)] font-medium inline-flex items-center gap-3">
              <motion.span
                className="inline-block w-8 h-px bg-[var(--text-muted)]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                style={{ transformOrigin: "left" }}
              />
              Full Stack Developer
            </span>
          </motion.div>

          {/* Name - Split character animation */}
          <div className="overflow-hidden" style={{ perspective: "1000px" }}>
            <div className="flex flex-wrap">
              {nameFirstLine.split("").map((char, i) => (
                <motion.span
                  key={`first-${i}`}
                  custom={i}
                  variants={charVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-[16vw] md:text-[11vw] font-['Anton'] uppercase leading-[0.88] tracking-tight inline-block"
                  style={{ transformOrigin: "bottom center" }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="overflow-hidden md:ml-[15vw]" style={{ perspective: "1000px" }}>
            <div className="flex flex-wrap">
              {nameSecondLine.split("").map((char, i) => (
                <motion.span
                  key={`second-${i}`}
                  custom={i + nameFirstLine.length}
                  variants={charVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-[16vw] md:text-[11vw] font-['Anton'] uppercase leading-[0.88] tracking-tight inline-block"
                  style={{ transformOrigin: "bottom center" }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        {/* Rotating badge */}
        <motion.div
          className="absolute top-32 right-8 md:top-40 md:right-20 w-24 h-24 md:w-32 md:h-32"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full rotate-badge"
          >
            <defs>
              <path
                id="circlePath"
                d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
              />
            </defs>
            <text className="fill-[var(--text-muted)]" style={{ fontSize: "14px", letterSpacing: "3px", fontFamily: "Inter, sans-serif", textTransform: "uppercase" }}>
              <textPath xlinkHref="#circlePath">
                {badgeText}
              </textPath>
            </text>
          </svg>
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
          </div>
        </motion.div>
      </motion.div>

      {/* ===== MARQUEE STRIP ===== */}
      <div className="border-t border-[var(--border-subtle)] py-4 md:py-6 overflow-hidden">
        <div className="marquee-track">{marqueeItems("MERN Stack")}{marqueeItems("MERN Stack")}</div>
      </div>

      {/* ===== BOTTOM INFO BAR ===== */}
      <motion.div
        className="container-custom py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-t border-[var(--border-subtle)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
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
