import React from "react";
import { motion } from "framer-motion";
import { projects } from "../data/projects";
import { FiArrowUpRight } from "react-icons/fi";

function Projects() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
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
            (05)
          </span>
          <div className="divider flex-1" />
          <span className="text-xs tracking-[0.3em] uppercase text-[var(--text-dim)] font-medium">
            Projects
          </span>
        </motion.div>

        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16 md:mb-20">
          <div className="overflow-hidden">
            <motion.h2
              className="text-5xl md:text-7xl lg:text-8xl font-['Anton'] uppercase leading-[0.9] text-[var(--text-main)]"
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            >
              Selected Work
            </motion.h2>
          </div>
          <motion.span
            className="text-sm text-[var(--text-dim)] tracking-widest uppercase"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {projects.length} Projects
          </motion.span>
        </div>

        {/* Project List */}
        <div className="flex flex-col relative">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group"
            >
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border-t border-[var(--border-subtle)] py-8 md:py-12 hover:bg-[var(--bg-surface)] transition-all duration-500 -mx-5 md:-mx-10 px-5 md:px-10"
                >
                  <ProjectRow project={project} index={index} />
                </a>
              ) : (
                <div className="border-t border-[var(--border-subtle)] py-8 md:py-12 hover:bg-[var(--bg-surface)] transition-all duration-500 -mx-5 md:-mx-10 px-5 md:px-10 cursor-default">
                  <ProjectRow project={project} index={index} />
                </div>
              )}
            </motion.div>
          ))}
          <div className="border-t border-[var(--border-subtle)]" />
        </div>
      </div>
    </section>
  );
}

function ProjectRow({ project, index }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start md:items-center relative z-10">
      {/* Index */}
      <div className="md:col-span-1 hidden md:block">
        <span className="text-xs text-[var(--text-dim)] font-medium tabular-nums group-hover:text-[var(--text-main)] transition-colors duration-300">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Title */}
      <div className="md:col-span-4 transition-transform duration-500 group-hover:translate-x-4">
        <h3 className="text-2xl md:text-4xl font-['Anton'] uppercase leading-tight text-[var(--text-main)] flex items-center gap-3">
          {project.title}
          {project.liveUrl && (
            <FiArrowUpRight className="text-lg opacity-0 -translate-x-4 translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
          )}
        </h3>
        {project.company && (
          <span className="text-xs tracking-[0.15em] uppercase text-[var(--text-dim)] mt-1 block">
            {project.company}
          </span>
        )}
      </div>

      {/* Description */}
      <div className="md:col-span-5 transition-transform duration-500 group-hover:translate-x-2">
        <p className="text-sm text-[var(--text-muted)] leading-[1.7] group-hover:text-[var(--text-main)] transition-colors duration-300">
          {project.description}
        </p>
      </div>

      {/* Tags */}
      <div className="md:col-span-2 flex flex-wrap gap-2 transition-transform duration-500 group-hover:translate-x-2">
        {project.tags &&
          project.tags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="text-[10px] tracking-[0.1em] uppercase text-[var(--text-dim)] border border-[var(--border-subtle)] rounded-full px-3 py-1 group-hover:border-[var(--text-main)] group-hover:text-[var(--text-main)] transition-all duration-300"
            >
              {tag}
            </span>
          ))}
      </div>
    </div>
  );
}

export default Projects;
