import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import saviyoImage from "../assets/saviyo.jpeg";

// Animated counter hook
function useCounter(target, duration = 2000, startWhenVisible = false, isVisible = true) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const numericTarget = parseInt(target);
    if (isNaN(numericTarget)) return;

    let start = 0;
    const startTime = performance.now();

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numericTarget));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [target, duration, isVisible]);

  return count;
}

function About() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  // Slide-in from right
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });
  const slideX = useTransform(scrollYProgress, [0, 1], ["100vw", "0vw"]);

  // Parallax on image
  const { scrollYProgress: imageScroll } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(imageScroll, [0, 1], ["-10%", "10%"]);

  const stats = [
    { number: "1", suffix: "+", label: "Years Experience" },
    { number: "10", suffix: "+", label: "Projects Built" },
    { number: "5", suffix: "+", label: "Technologies" },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  // Word-by-word reveal for paragraphs
  const WordReveal = ({ text, delay = 0 }) => {
    const words = text.split(" ");
    return (
      <span>
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
            <motion.span
              className="inline-block"
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: delay + i * 0.03,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    );
  };

  // Counter component
  const AnimatedStat = ({ number, suffix, label }) => {
    const count = useCounter(number, 2000, true, statsInView);
    return (
      <div>
        <span className="text-3xl md:text-5xl font-['Anton'] block mb-1">
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {count}{suffix}
          </motion.span>
        </span>
        <span className="text-xs tracking-[0.1em] uppercase text-[var(--text-dim)]">
          {label}
        </span>
      </div>
    );
  };

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      <motion.div
        style={{ x: slideX }}
        className="w-full bg-[var(--bg-base)] border-l border-[var(--border-subtle)] shadow-[-30px_0_70px_rgba(0,0,0,0.5)]"
      >
        <div className="container-custom py-16 md:py-24">
          {/* Section Label */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-12 md:mb-16"
          >
            <span className="text-xs tracking-[0.3em] uppercase text-[var(--text-dim)] font-medium">
              (01)
            </span>
            <motion.div
              className="divider flex-1"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "left" }}
            />
            <span className="text-xs tracking-[0.3em] uppercase text-[var(--text-muted)] font-medium">
              About
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* LEFT — Text Content */}
            <div>
              <div className="overflow-hidden mb-6">
                <motion.h2
                  className="text-5xl md:text-7xl lg:text-8xl font-['Anton'] uppercase leading-[0.9]"
                  initial={{ y: "100%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                >
                  About Me
                </motion.h2>
              </div>

              <div className="text-base md:text-lg text-[var(--text-muted)] leading-[1.8] mb-6 max-w-lg">
                <WordReveal
                  text="I'm a Full Stack Developer specializing in the MERN stack, passionate about building responsive user interfaces and scalable backend architectures. I create applications that are fast, secure, and visually modern."
                  delay={0.3}
                />
              </div>

              <div className="text-base md:text-lg text-[var(--text-muted)] leading-[1.8] mb-10 max-w-lg">
                <WordReveal
                  text="Currently working at D3innovatives, developing enterprise-level ERP and POS systems with React, TypeScript, and modern tooling."
                  delay={0.5}
                />
              </div>

              {/* Stats Row with Animated Counters */}
              <div ref={statsRef} className="grid grid-cols-3 gap-6 border-t border-[var(--border-subtle)] pt-8">
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    custom={3 + i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <AnimatedStat
                      number={stat.number}
                      suffix={stat.suffix}
                      label={stat.label}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* RIGHT — Image with curtain reveal + parallax */}
            <motion.div
              ref={imageRef}
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative w-full max-w-sm aspect-[3/4] overflow-hidden group rounded-sm">
                {/* Curtain reveal overlay */}
                <motion.div
                  className="absolute inset-0 bg-[var(--bg-base)] z-10"
                  initial={{ y: "0%" }}
                  whileInView={{ y: "-100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
                />
                {/* Parallax image */}
                <motion.div className="w-full h-[120%] -mt-[10%]" style={{ y: imageY }}>
                  <img
                    src={saviyoImage}
                    alt="Saviyo George"
                    className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 transition-all duration-700"
                  />
                </motion.div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)]/40 to-transparent pointer-events-none z-20" />
                {/* Grain on image */}
                <div
                  className="absolute inset-0 pointer-events-none z-20 opacity-20 mix-blend-overlay"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default About;
