import React from "react";
import { motion } from "framer-motion";
import { experience } from "../data/experience";

function Experiences() {
  const workExperience = experience.filter((item) => item.type === "work");

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
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
          <span className="text-xs tracking-[0.3em] uppercase text-[var(--text-dim)] font-medium">
            (03)
          </span>
          <div className="divider flex-1" />
          <span className="text-xs tracking-[0.3em] uppercase text-[var(--text-muted)] font-medium">
            Experience
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
            Career Journey
          </motion.h2>
        </div>

        {/* Timeline */}
        <div className="flex flex-col">
          {workExperience.map((exp, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group border-t border-[var(--border-subtle)] py-10 md:py-14 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 hover:bg-[var(--bg-surface)] transition-colors duration-500 -mx-5 md:-mx-10 px-5 md:px-10"
            >
              {/* Period */}
              <div className="md:col-span-3">
                <span className="text-xs tracking-[0.2em] uppercase text-[var(--text-dim)] font-medium">
                  {exp.period}
                </span>
              </div>

              {/* Role & Company */}
              <div className="md:col-span-4">
                <h3 className="text-2xl md:text-3xl font-['Anton'] uppercase leading-tight mb-2 group-hover:text-white transition-colors">
                  {exp.role}
                </h3>
                <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                  <span className="font-medium text-[var(--text-main)]">
                    {exp.company}
                  </span>
                  <span className="text-[var(--text-dim)]">·</span>
                  <span>{exp.location}</span>
                </div>
              </div>

              {/* Description */}
              <div className="md:col-span-5">
                {exp.description && (
                  <p className="text-sm text-[var(--text-muted)] leading-[1.8]">
                    {exp.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
          {/* Bottom border */}
          <div className="border-t border-[var(--border-subtle)]" />
        </div>
      </div>
    </section>
  );
}

export default Experiences;
