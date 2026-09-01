import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/projects";
import { FiArrowUpRight, FiBriefcase, FiCode, FiLayers } from "react-icons/fi";

const CATEGORIES = [
  { key: "all", label: "All Projects", icon: FiLayers },
  { key: "company", label: "Company Work", icon: FiBriefcase },
  { key: "personal", label: "Personal / Side Projects", icon: FiCode },
];

function Projects() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === "all") return true;
    return project.category === activeCategory;
  });

  const getCategoryCount = (catKey) => {
    if (catKey === "all") return projects.length;
    return projects.filter((p) => p.category === catKey).length;
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] },
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
          className="flex items-center gap-4 mb-12 md:mb-16"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-[var(--text-dim)] font-medium">
            (05)
          </span>
          <div className="divider flex-1" />
          <span className="text-xs tracking-[0.3em] uppercase text-[var(--text-dim)] font-medium">
            Projects
          </span>
        </motion.div>

        {/* Heading & Meta */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
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

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-center gap-2 text-xs text-[var(--text-dim)] tracking-widest uppercase"
          >
            <span>Showing</span>
            <span className="text-[var(--text-main)] font-semibold">
              {filteredProjects.length}
            </span>
            <span>of {projects.length} Projects</span>
          </motion.div>
        </div>

        {/* Category Tabs */}
        <div className="mb-12">
          <div className="inline-flex flex-wrap gap-2 p-1.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.key;
              const count = getCategoryCount(cat.key);

              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`relative flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-xl text-xs md:text-sm font-medium tracking-wider uppercase transition-all duration-300 ${
                    isActive
                      ? "text-[var(--bg-base)] font-semibold"
                      : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 bg-[var(--text-main)] rounded-xl z-0"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon className="text-sm" />
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-mono transition-colors duration-300 ${
                        isActive
                          ? "bg-[var(--bg-base)] text-[var(--text-main)]"
                          : "bg-[var(--bg-elevated)] text-[var(--text-dim)] border border-[var(--border-subtle)]"
                      }`}
                    >
                      {count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Project List */}
        <div className="flex flex-col relative min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="flex flex-col"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id || project.title}
                  variants={fadeUp}
                  custom={index}
                  initial="hidden"
                  animate="visible"
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
            </motion.div>
          </AnimatePresence>
          <div className="border-t border-[var(--border-subtle)]" />
        </div>
      </div>
    </section>
  );
}

function ProjectRow({ project, index }) {
  const isCompany = project.category === "company";

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start md:items-center relative z-10">
      {/* Index */}
      <div className="md:col-span-1 hidden md:block">
        <span className="text-xs text-[var(--text-dim)] font-medium tabular-nums group-hover:text-[var(--text-main)] transition-colors duration-300">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Title & Category Badge */}
      <div className="md:col-span-4 transition-transform duration-500 group-hover:translate-x-4">
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <span
            className={`text-[9px] tracking-[0.15em] uppercase font-mono px-2 py-0.5 rounded-md border ${
              isCompany
                ? "bg-amber-500/10 text-amber-300 border-amber-500/20"
                : "bg-cyan-500/10 text-cyan-300 border-cyan-500/20"
            }`}
          >
            {isCompany ? "Company Project" : "Personal Project"}
          </span>
          {project.company && (
            <span className="text-[10px] tracking-[0.12em] uppercase text-[var(--text-dim)]">
              • {project.company}
            </span>
          )}
        </div>

        <h3 className="text-2xl md:text-4xl font-['Anton'] uppercase leading-tight text-[var(--text-main)] flex items-center gap-3">
          {project.title}
          {project.liveUrl && (
            <FiArrowUpRight className="text-lg opacity-0 -translate-x-4 translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
          )}
        </h3>
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
