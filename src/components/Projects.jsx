import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, PROJECT_CATEGORIES } from "../data/projects";
import { FiArrowUpRight } from "react-icons/fi";

const FILTERS = [
  { key: PROJECT_CATEGORIES.COMPANY, label: "Company" },
  { key: PROJECT_CATEGORIES.PERSONAL, label: "Personal" },
  { key: PROJECT_CATEGORIES.ALL, label: "All" },
];

const imageSrc = (image) =>
  image.startsWith("/") || image.startsWith("http") ? image : `/${image}`;

export default function Projects() {
  const [category, setCategory] = useState(PROJECT_CATEGORIES.COMPANY);
  const [selectedId, setSelectedId] = useState(null);

  const visible = useMemo(
    () =>
      category === PROJECT_CATEGORIES.ALL
        ? projects
        : projects.filter((p) => p.category === category),
    [category]
  );

  // Fall back to the first project when the selection is hidden by the filter
  const active = visible.find((p) => p.id === selectedId) || visible[0];

  const count = (key) =>
    key === PROJECT_CATEGORIES.ALL
      ? projects.length
      : projects.filter((p) => p.category === key).length;

  return (
    <section
      id="work"
      className="relative w-full max-w-[1400px] mx-auto px-4 md:px-8 py-20 md:py-32"
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 md:mb-16">
        <h2 className="font-['Anton'] text-6xl md:text-8xl uppercase tracking-tight leading-none text-[var(--text-main)]">
          Selected Works
        </h2>

        <div
          role="group"
          aria-label="Filter projects"
          className="flex items-center gap-6 border-b border-[var(--border-subtle)]"
        >
          {FILTERS.map((f) => {
            const on = category === f.key;
            return (
              <button
                key={f.key}
                type="button"
                aria-pressed={on}
                onClick={() => setCategory(f.key)}
                className={`relative pb-3 text-base font-medium transition-colors ${
                  on
                    ? "text-[var(--text-main)]"
                    : "text-[var(--text-dim)] hover:text-[var(--text-main)]"
                }`}
              >
                {f.label}{" "}
                <span className="text-[var(--text-dim)] font-normal">
                  {count(f.key)}
                </span>
                {on && (
                  <motion.span
                    layoutId="works-filter-underline"
                    className="absolute left-0 right-0 -bottom-px h-[2px] bg-[var(--accent)]"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-x-16 items-start">
        {/* Project index */}
        <ul className="lg:col-span-7 border-t border-[var(--border-subtle)] list-none m-0 p-0">
          {visible.map((p) => {
            const isActive = active && p.id === active.id;
            return (
              <li key={p.id} className="border-b border-[var(--border-subtle)]">
                <button
                  type="button"
                  aria-expanded={isActive}
                  onClick={() => setSelectedId(p.id)}
                  onMouseEnter={() => setSelectedId(p.id)}
                  onFocus={() => setSelectedId(p.id)}
                  className="w-full text-left py-6 md:py-8 flex items-baseline justify-between gap-6 group"
                >
                  <span
                    className={`font-['Anton'] uppercase text-3xl md:text-5xl leading-none transition-colors duration-300 ${
                      isActive
                        ? "text-[var(--text-main)]"
                        : "text-[var(--text-dim)] group-hover:text-[var(--text-muted)]"
                    }`}
                  >
                    {p.title}
                  </span>
                  <span
                    className={`hidden sm:block shrink-0 text-sm transition-colors ${
                      isActive ? "text-[var(--accent)]" : "text-[var(--text-dim)]"
                    }`}
                  >
                    {p.company || "Personal"}
                  </span>
                </button>

                {/* Details inline on small screens */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      key="inline"
                      className="lg:hidden overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                    >
                      <div className="pb-8">
                        <Details project={p} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        {/* Preview panel, large screens */}
        <div className="hidden lg:block lg:col-span-5 sticky top-28">
          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <Details project={active} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Details({ project: p }) {
  const url = p.liveUrl || p.githubUrl;
  const tags = p.tags?.length ? p.tags : p.tech.split(",").map((t) => t.trim());

  return (
    <div className="flex flex-col gap-6">
      <div className="aspect-[4/3] w-full overflow-hidden rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
        {p.image ? (
          <img
            src={imageSrc(p.image)}
            alt={`${p.title} screenshot`}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div
            className={`w-full h-full bg-gradient-to-br ${p.gradient} flex items-end p-6`}
          >
            <span className="text-white/90 text-sm">
              {p.company ? `${p.company}, no public screenshot` : "No screenshot yet"}
            </span>
          </div>
        )}
      </div>

      <div>
        <p className="text-sm text-[var(--text-dim)] m-0">{p.type}</p>
        <p className="mt-3 mb-0 text-[var(--text-muted)] leading-relaxed max-w-[60ch]">
          {p.description}
        </p>
        <p className="mt-4 mb-0 text-sm text-[var(--text-dim)]">
          {tags.slice(0, 6).join(", ")}
        </p>
      </div>

      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 w-max font-semibold text-[var(--text-main)] border-b-2 border-[var(--accent)] pb-1 hover:text-[var(--accent)] transition-colors"
        >
          View project
          <FiArrowUpRight aria-hidden="true" />
          <span className="sr-only">: {p.title} (opens in a new tab)</span>
        </a>
      ) : (
        <p className="m-0 text-sm text-[var(--text-dim)]">{p.cta}</p>
      )}
    </div>
  );
}
