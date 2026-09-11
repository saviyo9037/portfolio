import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const skillWords = [
  "Versatile",
  "Creative",
  "Frontend",
  "Backend",
  "Scalable",
  "Responsive",
  "Modern",
  "Dynamic",
  "Innovative",
  "Performant",
];

function SkillsWheel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax for background elements
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % skillWords.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[80vh] bg-[var(--bg-base)] overflow-hidden flex items-center justify-center border-t border-[var(--border-subtle)]"
    >
      {/* Background ambient elements */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.02] blur-[150px]" />
      </motion.div>

      {/* Container for 3D perspective */}
      <div
        className="relative w-full max-w-5xl px-8 md:px-16 flex items-center justify-center min-h-[500px]"
        style={{ perspective: "1200px" }}
      >
        {skillWords.map((word, i) => {
          // Calculate shortest distance in circular array
          let distance = i - activeIndex;
          if (distance > skillWords.length / 2) distance -= skillWords.length;
          if (distance < -skillWords.length / 2) distance += skillWords.length;

          // Hide elements too far
          if (Math.abs(distance) > 4) return null;

          const isActive = distance === 0;

          return (
            <motion.div
              key={word}
              className="absolute left-1/2 flex items-center gap-4 md:gap-6 font-['Anton'] uppercase text-5xl md:text-7xl lg:text-[7rem] tracking-tighter select-none"
              initial={false}
              animate={{
                y: distance * 85,
                rotateX: distance * -22,
                scale: isActive ? 1 : Math.max(0.55, 1 - Math.abs(distance) * 0.15),
                opacity: isActive ? 1 : Math.max(0, 0.55 - Math.abs(distance) * 0.13),
                filter: isActive ? "blur(0px)" : `blur(${Math.abs(distance) * 3}px)`,
                color: isActive ? "#ffffff" : "#444444",
                x: "-50%",
              }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                transformOrigin: "center center -250px",
                zIndex: 10 - Math.abs(distance),
                textShadow: isActive ? "0 0 60px rgba(255,255,255,0.15)" : "none",
              }}
            >
              {/* Arrow indicator */}
              <motion.span
                initial={{ opacity: 0, x: -30, scale: 0.5 }}
                animate={{
                  opacity: isActive ? 1 : 0,
                  x: isActive ? 0 : -30,
                  scale: isActive ? 1 : 0.5,
                }}
                transition={{ duration: 0.5, delay: isActive ? 0.15 : 0, ease: [0.16, 1, 0.3, 1] }}
                className="text-white text-3xl md:text-5xl flex-shrink-0"
              >
                →
              </motion.span>
              <span className={isActive ? "drop-shadow-[0_0_40px_rgba(255,255,255,0.2)]" : ""}>
                {word}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {skillWords.map((_, i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full transition-all duration-300"
            animate={{
              backgroundColor: i === activeIndex ? "#ffffff" : "rgba(255,255,255,0.15)",
              scale: i === activeIndex ? 1.5 : 1,
              boxShadow: i === activeIndex ? "0 0 10px rgba(255,255,255,0.5)" : "none",
            }}
          />
        ))}
      </div>
    </section>
  );
}

export default SkillsWheel;
