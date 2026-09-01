import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { skills } from "../data/skills";

// 3D Tilt Card component
function TiltCard({ children, className }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: (y - 0.5) * -12,  // rotation around X axis
      y: (x - 0.5) * 12,   // rotation around Y axis
    });
    setGlare({ x: x * 100, y: y * 100 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
      {/* Glare effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-inherit"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.06) 0%, transparent 60%)`,
        }}
      />
    </motion.div>
  );
}

function Skills() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const skillItemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section className="relative">
      <div className="container-custom section-padding">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16 md:mb-24"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-[var(--text-dim)] font-medium">
            (02)
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
            Skills
          </span>
        </motion.div>

        {/* Heading */}
        <div className="overflow-hidden mb-16 md:mb-20">
          <motion.h2
            className="text-5xl md:text-7xl lg:text-8xl font-['Anton'] uppercase leading-[0.9]"
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            Technical Stack
          </motion.h2>
        </div>

        {/* Skills Grid with 3D tilt */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-[var(--border-subtle)]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {skills.map((categoryGroup, index) => (
            <motion.div key={index} variants={cardVariants}>
              <TiltCard
                className="border-b border-r border-[var(--border-subtle)] p-8 md:p-10 group hover:bg-[var(--bg-elevated)] transition-colors duration-500 relative overflow-hidden glow-border"
              >
                {/* Category Header */}
                <div className="flex items-baseline justify-between mb-6 relative z-10">
                  <h3 className="text-lg md:text-xl font-['Anton'] uppercase tracking-wide group-hover:text-white transition-colors relative">
                    {categoryGroup.category}
                    {/* Underline grow */}
                    <motion.div
                      className="absolute -bottom-1 left-0 h-px bg-[var(--text-main)]"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--bg-base)] border border-[var(--border-subtle)] text-[var(--text-dim)] font-mono group-hover:border-[var(--text-muted)] group-hover:text-[var(--text-muted)] transition-colors">
                      {categoryGroup.items.length}
                    </span>
                    <span className="text-xs text-[var(--text-dim)] font-medium tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* Skills List with stagger */}
                <ul className="flex flex-col gap-3 relative z-10">
                  {categoryGroup.items.map((skill, i) => (
                    <motion.li
                      key={i}
                      custom={i}
                      variants={skillItemVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="text-sm text-[var(--text-muted)] group-hover:text-[var(--text-main)] transition-colors duration-300 flex items-center gap-3"
                    >
                      <motion.span
                        className="w-1 h-1 rounded-full bg-[var(--text-dim)] group-hover:bg-[var(--text-main)] transition-colors flex-shrink-0"
                        whileHover={{ scale: 2 }}
                      />
                      {skill}
                    </motion.li>
                  ))}
                </ul>

                {/* Background number watermark */}
                <span className="absolute -bottom-4 -right-2 text-[8rem] font-['Anton'] text-white/[0.015] leading-none pointer-events-none select-none">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;
