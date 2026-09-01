import React from "react";
import { motion } from "framer-motion";
import { skills } from "../data/skills";

function Skills() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section className="bg-[var(--bg-surface)] border-t border-[var(--border-subtle)]">
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
            02
          </span>
          <div className="divider flex-1" />
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

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-[var(--border-subtle)]">
          {skills.map((categoryGroup, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="border-b border-r border-[var(--border-subtle)] p-8 md:p-10 group hover:bg-[var(--bg-elevated)] transition-colors duration-500"
            >
              {/* Category Header */}
              <div className="flex items-baseline justify-between mb-6">
                <h3 className="text-lg md:text-xl font-['Anton'] uppercase tracking-wide group-hover:text-white transition-colors">
                  {categoryGroup.category}
                </h3>
                <span className="text-xs text-[var(--text-dim)] font-medium tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Skills List */}
              <ul className="flex flex-col gap-3">
                {categoryGroup.items.map((skill, i) => (
                  <li
                    key={i}
                    className="text-sm text-[var(--text-muted)] group-hover:text-[var(--text-main)] transition-colors duration-300 flex items-center gap-3"
                  >
                    <span className="w-1 h-1 rounded-full bg-[var(--text-dim)] group-hover:bg-[var(--text-main)] transition-colors flex-shrink-0" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
