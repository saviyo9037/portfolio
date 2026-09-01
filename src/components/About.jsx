import React from "react";
import { motion } from "framer-motion";
import saviyoImage from "../assets/saviyo.jpeg";

function About() {
  const stats = [
    { number: "2+", label: "Years Experience" },
    { number: "10+", label: "Projects Built" },
    { number: "5+", label: "Technologies" },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section className="bg-[var(--bg-base)] border-t border-[var(--border-subtle)]">
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
            01
          </span>
          <div className="divider flex-1" />
          <span className="text-xs tracking-[0.3em] uppercase text-[var(--text-muted)] font-medium">
            About
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* LEFT — Text Content */}
          <div>
            <div className="overflow-hidden mb-8">
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

            <motion.p
              className="text-base md:text-lg text-[var(--text-muted)] leading-[1.8] mb-8 max-w-lg"
              variants={fadeUp}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              I'm a Full Stack Developer specializing in the MERN stack,
              passionate about building responsive user interfaces and
              scalable backend architectures. I create applications that are
              fast, secure, and visually modern.
            </motion.p>

            <motion.p
              className="text-base md:text-lg text-[var(--text-muted)] leading-[1.8] mb-12 max-w-lg"
              variants={fadeUp}
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              Currently working at D3innovatives, developing enterprise-level
              ERP and POS systems with React, TypeScript, and modern tooling.
            </motion.p>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6 border-t border-[var(--border-subtle)] pt-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  custom={3 + i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <span className="text-3xl md:text-4xl font-['Anton'] block mb-1">
                    {stat.number}
                  </span>
                  <span className="text-xs tracking-[0.1em] uppercase text-[var(--text-dim)]">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT — Image */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-full max-w-md aspect-[3/4] overflow-hidden group">
              <img
                src={saviyoImage}
                alt="Saviyo George"
                className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 transition-all duration-700"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)]/40 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
