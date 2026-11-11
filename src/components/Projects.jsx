import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects as manualProjects, PROJECT_CATEGORIES } from "../data/projects";
import { FiArrowUpRight } from "react-icons/fi";
import { useGithubProjects } from "../hooks/useGithubProjects";
import {
  mergeProjects,
  languagesOf,
  applyControls,
  demoUrl,
  repoUrl,
} from "../lib/mergeProjects";
import ProjectControls from "./ProjectControls";

const FILTERS = [
  { key: PROJECT_CATEGORIES.COMPANY, label: "Company" },
  { key: PROJECT_CATEGORIES.PERSONAL, label: "Personal" },
  { key: PROJECT_CATEGORIES.ALL, label: "All" },
];

// Rows shown before "Show all", unless the visitor is searching or filtering.
const INITIAL_ROWS = 8;

const imageSrc = (image) =>
  image.startsWith("/") || image.startsWith("http") ? image : `/${image}`;

const formatDate = (iso) =>
  new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(iso));

export default function Projects() {
  const { projects: githubProjects, status, error, retry } = useGithubProjects();

  const [category, setCategory] = useState(PROJECT_CATEGORIES.COMPANY);
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("");
  const [sort, setSort] = useState("updated");
  const [showAll, setShowAll] = useState(false);

  const allProjects = useMemo(
    () => mergeProjects(manualProjects, githubProjects ?? []),
    [githubProjects]
  );
  const languages = useMemo(() => languagesOf(allProjects), [allProjects]);

  const inCategory = useMemo(
    () =>
      category === PROJECT_CATEGORIES.ALL
        ? allProjects
        : allProjects.filter((p) => p.category === category),
    [allProjects, category]
  );

  const matches = useMemo(
    () => applyControls(inCategory, { query, language, sort }),
    [inCategory, query, language, sort]
  );

  const isFiltering = Boolean(query.trim() || language);
  const limited = !showAll && !isFiltering && matches.length > INITIAL_ROWS;

  // Featured first, then the rest. The row limit applies to this combined order.
  const ordered = useMemo(() => {
    const full = [...matches.filter((p) => p.featured), ...matches.filter((p) => !p.featured)];
    return limited ? full.slice(0, INITIAL_ROWS) : full;
  }, [matches, limited]);

  const featured = ordered.filter((p) => p.featured);
  const rest = ordered.filter((p) => !p.featured);

  // Fall back to the first project when the selection is hidden by a filter
  const active = ordered.find((p) => p.id === selectedId) || ordered[0];

  const count = (key) =>
    key === PROJECT_CATEGORIES.ALL
      ? allProjects.length
      : allProjects.filter((p) => p.category === key).length;

  const clearFilters = () => {
    setQuery("");
    setLanguage("");
  };

  const renderGroup = (title, items) =>
    items.length > 0 && (
      <div className="mb-10">
        {title && (
          <h3
            className="text-sm text-[var(--accent)] font-medium mb-3"
            style={{ fontFamily: "'Inter', sans-serif", textTransform: "none", letterSpacing: "normal", lineHeight: 1.4 }}
          >
            {title}
          </h3>
        )}
        <ul className="border-t border-[var(--border-subtle)] list-none m-0 p-0">
          {items.map((p) => (
            <ProjectRow
              key={p.id}
              project={p}
              isActive={Boolean(active) && p.id === active.id}
              onSelect={() => setSelectedId(p.id)}
            />
          ))}
        </ul>
      </div>
    );

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
                <span className="text-[var(--text-dim)] font-normal">{count(f.key)}</span>
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

      <ProjectControls
        query={query}
        onQuery={setQuery}
        language={language}
        onLanguage={setLanguage}
        languages={languages}
        sort={sort}
        onSort={setSort}
      />

      <div aria-live="polite" className="mb-6 min-h-[1.5rem] text-sm text-[var(--text-dim)]">
        {status === "loading" && (
          <span className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            Loading your latest projects from GitHub
          </span>
        )}
        {error && (
          <span>
            {error.rateLimited
              ? `GitHub's request limit was reached${
                  error.retryAfter ? `, try again in about ${Math.ceil(error.retryAfter / 60)} min` : ""
                }. `
              : "Couldn't load the latest projects from GitHub. "}
            Showing saved projects.{" "}
            <button
              type="button"
              onClick={retry}
              className="text-[var(--text-main)] underline underline-offset-4 hover:text-[var(--accent)]"
            >
              Try again
            </button>
          </span>
        )}
        {status !== "loading" && !error && (
          <span>
            {matches.length} {matches.length === 1 ? "project" : "projects"}
            {isFiltering ? " match" : ""}
          </span>
        )}
      </div>

      {ordered.length === 0 ? (
        <div className="border-t border-[var(--border-subtle)] py-16 text-[var(--text-muted)]">
          <p className="m-0 text-lg">
            {isFiltering
              ? "No projects match your search."
              : "No projects in this group yet."}
          </p>
          {isFiltering && (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 text-[var(--text-main)] underline underline-offset-4 hover:text-[var(--accent)]"
            >
              Clear search and filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid lg:grid-cols-12 gap-x-16 items-start">
          <div className="lg:col-span-7">
            {featured.length > 0 && rest.length > 0 ? (
              <>
                {renderGroup("Featured projects", featured)}
                {renderGroup("All projects", rest)}
              </>
            ) : (
              renderGroup(null, ordered)
            )}

            {limited && (
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="mt-2 font-semibold text-[var(--text-main)] border-b-2 border-[var(--accent)] pb-1 hover:text-[var(--accent)] transition-colors"
              >
                Show all {matches.length} projects
              </button>
            )}
          </div>

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
      )}
    </section>
  );
}

function ProjectRow({ project: p, isActive, onSelect }) {
  return (
    <li className="border-b border-[var(--border-subtle)]">
      <button
        type="button"
        aria-expanded={isActive}
        onClick={onSelect}
        onMouseEnter={onSelect}
        onFocus={onSelect}
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
          {p.company || p.language || "Personal"}
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
}

function ProjectImage({ project: p }) {
  const [failed, setFailed] = useState(false);
  const src = p.image || p.previewImage;

  if (src && !failed) {
    return (
      <img
        src={imageSrc(src)}
        alt={`${p.title} screenshot`}
        loading="lazy"
        onError={() => setFailed(true)}
        className="w-full h-full object-cover object-top"
      />
    );
  }
  return (
    <div className={`w-full h-full bg-gradient-to-br ${p.gradient} flex items-end p-6`}>
      <span className="text-white/90 text-sm">
        {p.company ? `${p.company}, no public screenshot` : "No screenshot yet"}
      </span>
    </div>
  );
}

function Details({ project: p }) {
  const demo = demoUrl(p);
  const repo = repoUrl(p);
  const tags = p.tags?.length ? p.tags : (p.tech || "").split(",").map((t) => t.trim()).filter(Boolean);
  const meta = [p.type, p.updatedAt && `Updated ${formatDate(p.updatedAt)}`].filter(Boolean);

  const linkClass =
    "inline-flex items-center gap-2 w-max font-semibold text-[var(--text-main)] border-b-2 border-[var(--accent)] pb-1 hover:text-[var(--accent)] transition-colors";

  return (
    <div className="flex flex-col gap-6">
      <div className="aspect-[4/3] w-full overflow-hidden rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
        <ProjectImage key={p.id} project={p} />
      </div>

      <div>
        <p className="text-sm text-[var(--text-dim)] m-0">{meta.join(", ")}</p>
        <p className="mt-3 mb-0 text-[var(--text-muted)] leading-relaxed max-w-[60ch]">
          {p.description}
        </p>
        {tags.length > 0 && (
          <p className="mt-4 mb-0 text-sm text-[var(--text-dim)]">{tags.slice(0, 6).join(", ")}</p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
        {demo && (
          <a href={demo} target="_blank" rel="noreferrer" className={linkClass}>
            Live demo
            <FiArrowUpRight aria-hidden="true" />
            <span className="sr-only">: {p.title} (opens in a new tab)</span>
          </a>
        )}
        {repo && (
          <a href={repo} target="_blank" rel="noreferrer" className={linkClass}>
            {demo ? "GitHub" : "View project"}
            <FiArrowUpRight aria-hidden="true" />
            <span className="sr-only">: {p.title} on GitHub (opens in a new tab)</span>
          </a>
        )}
        {!demo && !repo && (
          <p className="m-0 text-sm text-[var(--text-dim)]">{p.private ? "Private repository" : p.cta}</p>
        )}
      </div>

      {p.related?.length > 0 && (
        <p className="m-0 text-sm text-[var(--text-dim)]">
          Also on GitHub:{" "}
          {p.related.map((r, i) => (
            <React.Fragment key={r.name}>
              {i > 0 && ", "}
              <a
                href={r.url}
                target="_blank"
                rel="noreferrer"
                className="text-[var(--text-muted)] underline underline-offset-4 hover:text-[var(--accent)]"
              >
                {r.name}
              </a>
            </React.Fragment>
          ))}
        </p>
      )}
    </div>
  );
}
