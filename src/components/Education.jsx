import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { experience } from "../data/experience";

function Education() {
  const educationData = experience.filter((item) => item.type === "education");
  const sectionRef = useRef(null);

  // Scroll progress for the draw line
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 60%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const cardReveal = {
    hidden: {
      opacity: 0,
      y: 60,
      rotateX: -5,
      filter: "blur(10px)",
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        delay: i * 0.15,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section className="relative">
      <div className="container-custom section-padding">
        {/* Section Label */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-16 md:mb-24"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-[var(--text-muted)] font-medium">
            04
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
            Education
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
            Education
          </motion.h2>
        </div>

        {/* Education Items with timeline */}
        <div ref={sectionRef} className="flex flex-col relative">
          {/* Animated vertical line */}
          <div className="absolute left-0 md:left-[12.5%] top-0 bottom-0 w-px bg-[var(--border-subtle)] hidden md:block">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-[var(--text-muted)] to-transparent"
              style={{ height: lineHeight }}
            />
          </div>

          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              variants={cardReveal}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              style={{ perspective: "1000px" }}
              className="group border-t border-[var(--border-subtle)] py-10 md:py-14 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 hover:bg-[var(--bg-elevated)] transition-all duration-500 -mx-5 md:-mx-10 px-5 md:px-10 relative"
            >
              {/* Timeline dot with pulse */}
              <div className="absolute left-0 md:left-[calc(12.5%-5px)] top-10 md:top-14 hidden md:block">
                <motion.div
                  className="w-2.5 h-2.5 rounded-full bg-[var(--text-dim)] group-hover:bg-[var(--text-main)] transition-all duration-500 relative"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                >
                  {/* Pulse ring */}
                  <span className="absolute inset-0 rounded-full border border-[var(--text-dim)] group-hover:border-[var(--text-main)] animate-ping opacity-30" />
                </motion.div>
              </div>

              {/* Period */}
              <div className="md:col-span-3 md:pl-8">
                <span className="text-xs tracking-[0.2em] uppercase text-[var(--text-dim)] font-medium font-mono">
                  {edu.period}
                </span>
              </div>

              {/* Degree & Institution */}
              <div className="md:col-span-4">
                <h3 className="text-2xl md:text-3xl font-['Anton'] uppercase leading-tight mb-2 group-hover:text-white transition-colors gradient-text-hover">
                  {edu.degree}
                </h3>
                <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                  <span className="text-lg mr-1">🎓</span>
                  <span className="font-medium text-[var(--text-main)]">
                    {edu.institution}
                  </span>
                </div>
              </div>

              {/* Location & Description */}
              <div className="md:col-span-5">
                <span className="text-sm text-[var(--text-dim)] block mb-2 flex items-center gap-2">
                  <span className="text-xs">📍</span>
                  {edu.location}
                </span>
                {edu.description && (
                  <p className="text-sm text-[var(--text-muted)] leading-[1.8] group-hover:text-[var(--text-main)] transition-colors duration-500">
                    {edu.description}
                  </p>
                )}
              </div>

              {/* Hover glow line */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--text-main)]/20 to-transparent" />
              </div>
            </motion.div>
          ))}
          <div className="border-t border-[var(--border-subtle)]" />
        </div>
      </div>
    </section>
  );
}

export default Education;
