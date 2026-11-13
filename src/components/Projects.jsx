import React, { useState, useMemo, useRef, useEffect } from "react";
import { projects as manualProjects, PROJECT_CATEGORIES } from "../data/projects";
import { FiArrowUpRight, FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useGithubProjects } from "../hooks/useGithubProjects";
import {
  mergeProjects,
  languagesOf,
  applyControls,
  demoUrl,
  repoUrl,
} from "../lib/mergeProjects";
import ProjectControls from "./ProjectControls";

const ACCENT = "#ff8a1f";

const FILTERS = [
  { key: PROJECT_CATEGORIES.COMPANY, label: "Company" },
  { key: PROJECT_CATEGORIES.PERSONAL, label: "Personal" },
  { key: PROJECT_CATEGORIES.ALL, label: "All" },
];

// Cards shown before "Show all", unless the visitor is searching or filtering.
const INITIAL_CARDS = 10;

const imageSrc = (image) =>
  image.startsWith("/") || image.startsWith("http") ? image : `/${image}`;

const formatDate = (iso) =>
  new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(iso));

export default function Projects() {
  const { projects: githubProjects, status, error, retry } = useGithubProjects();

  const [category, setCategory] = useState(PROJECT_CATEGORIES.COMPANY);
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
  const limited = !showAll && !isFiltering && matches.length > INITIAL_CARDS;

  // Featured first, then the rest. The limit applies to this combined order.
  const ordered = useMemo(() => {
    const full = [...matches.filter((p) => p.featured), ...matches.filter((p) => !p.featured)];
    return limited ? full.slice(0, INITIAL_CARDS) : full;
  }, [matches, limited]);

  const count = (key) =>
    key === PROJECT_CATEGORIES.ALL
      ? allProjects.length
      : allProjects.filter((p) => p.category === key).length;

  const clearFilters = () => {
    setQuery("");
    setLanguage("");
  };

  return (
    <section id="work" className="mx-auto w-full max-w-[1680px] py-14 md:py-20">
      <div className="flex flex-col gap-6 px-5 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <p className="m-0 text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>
            Selected Works
          </p>
          <h2
            className="mb-0 mt-3 text-3xl font-extrabold tracking-tight text-[var(--text-main)] md:text-4xl"
            style={{ fontFamily: "'Inter', sans-serif", textTransform: "none" }}
          >
            Projects
          </h2>
        </div>

        <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const on = category === f.key;
            return (
              <button
                key={f.key}
                type="button"
                aria-pressed={on}
                onClick={() => setCategory(f.key)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  on
                    ? "border-transparent text-black"
                    : "border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
                }`}
                style={on ? { backgroundColor: ACCENT } : undefined}
              >
                {f.label} <span className="font-normal opacity-70">{count(f.key)}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 px-5 md:px-8">
        <ProjectControls
          query={query}
          onQuery={setQuery}
          language={language}
          onLanguage={setLanguage}
          languages={languages}
          sort={sort}
          onSort={setSort}
        />
      </div>

      <div aria-live="polite" className="mb-6 mt-4 min-h-[1.25rem] px-5 text-sm text-[var(--text-dim)] md:px-8">
        {status === "loading" && <span>Loading projects from GitHub…</span>}
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
        <div className="mx-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 text-sm text-[var(--text-muted)] md:mx-8">
          <p className="m-0">
            {isFiltering ? "No projects match your search." : "No projects in this group yet."}
          </p>
          {isFiltering && (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-3 text-sm text-[var(--text-main)] underline underline-offset-4 hover:text-[var(--accent)]"
            >
              Clear search and filters
            </button>
          )}
        </div>
      ) : (
        <Carousel items={ordered} />
      )}

      {limited && (
        <div className="mt-8 px-5 md:px-8">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] px-6 py-3 text-sm font-semibold text-[var(--text-main)] transition-colors hover:border-[#ff8a1f]/60"
          >
            Show all {matches.length} projects <FiArrowUpRight aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
}

// Horizontal scrolling track with previous and next buttons
function Carousel({ items }) {
  const trackRef = useRef(null);

  // Mouse wheel moves the row sideways while the pointer is over it.
  // Once the row reaches an end, the wheel scrolls the page again.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onWheel = (e) => {
      // Only take over the wheel while the row sits near the middle of the screen
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const centred = Math.abs(r.top + r.height / 2 - vh / 2) < vh * 0.15;
      if (!centred) return;
      const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      const max = el.scrollWidth - el.clientWidth;
      const atStart = el.scrollLeft <= 0 && delta < 0;
      const atEnd = el.scrollLeft >= max - 1 && delta > 0;
      if (!delta || atStart || atEnd || max <= 0) return;
      e.preventDefault();
      e.stopPropagation(); // keeps the page smooth-scroller from also moving the page
      el.scrollBy({ left: delta, behavior: "instant" });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const scrollBy = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div className="mb-4 flex items-center justify-end gap-2 px-5 md:px-8">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="Previous projects"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--text-main)] transition-colors hover:border-[#ff8a1f]"
        >
          <FiArrowLeft aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="Next projects"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--text-main)] transition-colors hover:border-[#ff8a1f]"
        >
          <FiArrowRight aria-hidden="true" />
        </button>
      </div>

      <ul
        ref={trackRef}
        className="m-0 flex list-none gap-5 overflow-x-auto scroll-smooth px-5 pb-6 md:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </ul>
    </div>
  );
}

// Tall portrait card for the carousel
function ProjectCard({ project: p }) {
  const demo = demoUrl(p);
  const repo = repoUrl(p);
  const tags = (p.tags?.length ? p.tags : (p.tech || "").split(",").map((t) => t.trim()).filter(Boolean)).slice(0, 4);

  return (
    <li className="flex w-[300px] shrink-0 flex-col overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] transition-colors hover:border-[#ff8a1f]/50 sm:w-[340px]">
      <div className="relative aspect-[4/3] overflow-hidden border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
        <ProjectImage project={p} />
        {p.featured && (
          <span
            className="absolute left-3 top-3 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black"
            style={{ backgroundColor: ACCENT }}
          >
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3
          className="m-0 text-lg font-bold leading-snug text-[var(--text-main)]"
          style={{ fontFamily: "'Inter', sans-serif", textTransform: "none" }}
        >
          {p.title}
        </h3>
        <p className="m-0 text-xs text-[var(--text-dim)]">
          {p.company || p.language || "Personal"}
          {p.updatedAt && ` · ${formatDate(p.updatedAt)}`}
        </p>
        {p.description && (
          <p className="m-0 line-clamp-2 text-sm leading-relaxed text-[var(--text-muted)]">{p.description}</p>
        )}
        {tags.length > 0 && (
          <p className="m-0 font-mono text-[11px] text-[var(--text-dim)]">{tags.join(" · ")}</p>
        )}

        <div className="mt-auto flex flex-wrap gap-x-5 gap-y-1 pt-3 text-sm font-semibold">
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[var(--text-main)] transition-colors hover:text-[var(--accent)]"
            >
              Live demo <FiArrowUpRight aria-hidden="true" />
              <span className="sr-only"> for {p.title} (opens in a new tab)</span>
            </a>
          )}
          {repo && (
            <a
              href={repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[var(--text-dim)] transition-colors hover:text-[var(--accent)]"
            >
              {demo ? "Code" : "View project"} <FiArrowUpRight aria-hidden="true" />
              <span className="sr-only"> for {p.title} on GitHub (opens in a new tab)</span>
            </a>
          )}
          {!demo && !repo && (
            <span className="text-[var(--text-dim)]">{p.private ? "Private repository" : p.cta}</span>
          )}
        </div>
      </div>
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
        className="h-full w-full object-cover object-top"
      />
    );
  }
  return (
    <div className={`flex h-full w-full items-end bg-gradient-to-br ${p.gradient} p-4`}>
      <span className="text-xs text-white/90">{p.title}</span>
    </div>
  );
}
