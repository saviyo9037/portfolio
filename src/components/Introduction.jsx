import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

function Introduction() {
  const sectionRef = useRef(null);
  
  // Advanced Scroll Tracking
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // 4D / Spatial Parallax transforms
  const textY = useTransform(smoothProgress, [0, 1], ["0%", "80%"]);
  const textScale = useTransform(smoothProgress, [0, 1], [1, 0.8]);
  const textZ = useTransform(smoothProgress, [0, 1], [0, -500]);
  const opacityOut = useTransform(smoothProgress, [0, 0.5, 1], [1, 0.5, 0]);

  // Split text animation for name
  const nameFirstLine = "Saviyo";
  const nameSecondLine = "George";

  const charVariants = {
    hidden: { y: "150%", opacity: 0, rotateX: -90, z: -200 },
    visible: (i) => ({
      y: "0%",
      opacity: 1,
      rotateX: 0,
      z: 0,
      transition: {
        duration: 1.2,
        delay: 0.5 + i * 0.06,
        ease: [0.16, 1, 0.3, 1], // Very snappy expo out
      },
    }),
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const marqueeItems = (text, count = 8) =>
    [...Array(count)].map((_, i) => (
      <span
        key={i}
        className="text-[18vw] md:text-[12vw] font-['Anton'] uppercase leading-[0.9] tracking-tight whitespace-nowrap px-[2vw] text-transparent text-stroke"
      >
        {text}
        <span className="text-[var(--text-dim)] mx-[1vw]">•</span>
      </span>
    ));

  const badgeText = "AVAILABLE FOR WORK • OPEN TO OPPORTUNITIES • ";

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[var(--bg-base)] perspective-[1500px]"
    >
      {/* ===== HERO CONTENT ===== */}
      <motion.div
        className="flex-1 flex flex-col justify-center relative pt-28 md:pt-36 z-10"
        style={{ 
          y: textY, 
          opacity: opacityOut, 
          scale: textScale,
          translateZ: textZ,
          transformStyle: "preserve-3d"
        }}
      >
        {/* Main Heading */}
        <div className="container-custom relative z-20">
          {/* Subtitle */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-6 md:mb-8"
          >
            <span className="text-xs md:text-sm tracking-[0.3em] uppercase text-[var(--accent)] font-medium inline-flex items-center gap-4 bg-[var(--glass-bg)] px-6 py-3 rounded-full border border-[var(--glass-border)] backdrop-blur-md">
              <motion.span
                className="inline-block w-2 h-2 rounded-full bg-[var(--accent)]"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              Full Stack Developer
            </span>
          </motion.div>

          {/* Name - 4D Split character animation */}
          <div className="overflow-hidden" style={{ perspective: "1000px" }}>
            <div className="flex flex-wrap transform-style-3d">
              {nameFirstLine.split("").map((char, i) => (
                <motion.span
                  key={`first-${i}`}
                  custom={i}
                  variants={charVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-[16vw] md:text-[12vw] font-['Anton'] uppercase leading-[0.85] tracking-tighter inline-block text-[var(--text-main)] drop-shadow-2xl hover:text-transparent hover:text-stroke transition-colors duration-300"
                  style={{ transformOrigin: "bottom center" }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="overflow-hidden md:ml-[15vw]" style={{ perspective: "1000px" }}>
            <div className="flex flex-wrap transform-style-3d">
              {nameSecondLine.split("").map((char, i) => (
                <motion.span
                  key={`second-${i}`}
                  custom={i + nameFirstLine.length}
                  variants={charVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-[16vw] md:text-[12vw] font-['Anton'] uppercase leading-[0.85] tracking-tighter inline-block text-[var(--text-main)] drop-shadow-2xl hover:text-transparent hover:text-stroke transition-colors duration-300"
                  style={{ transformOrigin: "bottom center" }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        {/* Rotating badge - Glassmorphism */}
        <motion.div
          className="absolute top-32 right-8 md:top-40 md:right-20 w-28 h-28 md:w-36 md:h-36 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-full backdrop-blur-xl shadow-2xl"
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 1.5, duration: 1.2, type: "spring", bounce: 0.4 }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full rotate-badge">
            <defs>
              <path id="circlePath" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
            </defs>
            <text className="fill-[var(--text-main)] font-semibold" style={{ fontSize: "14px", letterSpacing: "3px", fontFamily: "Inter, sans-serif", textTransform: "uppercase" }}>
              <textPath xlinkHref="#circlePath">{badgeText}</textPath>
            </text>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-[var(--accent)] animate-pulse shadow-[0_0_20px_var(--accent)]" />
          </div>
        </motion.div>
      </motion.div>

      {/* ===== 4D BACKGROUND ELEMENTS ===== */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ y: useTransform(smoothProgress, [0, 1], ["0%", "40%"]) }}
      >
         <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[var(--glass-bg)] rounded-full blur-[100px] opacity-30 animate-pulse" />
         <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#333] rounded-full blur-[120px] opacity-20" />
      </motion.div>

      {/* ===== BOTTOM INFO BAR WITH MARQUEE ===== */}
      <motion.div 
        className="relative z-20 border-t border-[var(--border-subtle)] bg-[var(--bg-base)]/80 backdrop-blur-lg"
        style={{ y: useTransform(smoothProgress, [0, 1], ["0%", "-50%"]) }}
      >
        <div className="py-3 md:py-4 overflow-hidden border-b border-[var(--border-subtle)]">
          <div className="marquee-track">{marqueeItems("CREATIVE DEVELOPER")}</div>
        </div>

        <motion.div
          className="container-custom py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <p className="text-sm text-[var(--text-muted)] max-w-md leading-relaxed font-light text-stroke hover:text-[var(--text-main)] transition-colors duration-500">
            Crafting responsive, scalable web applications with high-end animations, clean architecture, and pixel-perfect 4D interfaces.
          </p>
          <div className="flex items-center gap-4 bg-[var(--bg-elevated)] px-6 py-3 rounded-full border border-[var(--border-hover)]">
            <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_#4ade80] animate-pulse" />
            <span className="text-xs tracking-[0.2em] uppercase text-[var(--text-main)] font-medium">
              Based in Kerala, India
            </span>
          </div>
        </motion.div>
      </motion.div>

    </section>
  );
}

export default Introduction;
