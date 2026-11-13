import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
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

        {/* One track; a single orange highlight slides to the chosen option */}
        <div
          role="group"
          aria-label="Filter projects"
          className="inline-flex w-max rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-1"
        >
          {FILTERS.map((f) => {
            const on = category === f.key;
            return (
              <button
                key={f.key}
                type="button"
                aria-pressed={on}
                onClick={() => setCategory(f.key)}
                className={`relative rounded-lg px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff8a1f] ${
                  on ? "text-black" : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                }`}
              >
                {on && (
                  <motion.span
                    layoutId="projects-filter-thumb"
                    className="absolute inset-0 rounded-lg"
                    style={{ backgroundColor: ACCENT }}
                    transition={{ type: "spring", stiffness: 450, damping: 36 }}
                  />
                )}
                <span className="relative z-10">
                  {f.label}{" "}
                  <span className={`font-normal ${on ? "text-black/80" : "text-[var(--text-dim)]"}`}>{count(f.key)}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 px-5 md:px-8">
        <ProjectControls
          query={query}
          onQuery={(v) => {
          setQuery(v);
          if (v.trim()) setCategory(PROJECT_CATEGORIES.ALL);
        }}
          language={language}
          onLanguage={(v) => {
          setLanguage(v);
          if (v) setCategory(PROJECT_CATEGORIES.ALL);
        }}
          languages={languages}
          sort={sort}
          onSort={(v) => {
          setSort(v);
          setCategory(PROJECT_CATEGORIES.ALL);
        }}
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

// Browser-window card: a title bar with the project's real address, the screenshot, then details
function hostOf(url) {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return "";
  }
}

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff8a1f]";

// Tilts the card a few degrees toward the pointer. Mouse only, and not for reduced motion.
function tilt(e) {
  if (!window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
  const r = e.currentTarget.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  e.currentTarget.style.transform = `perspective(700px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateY(-2px)`;
}
function untilt(e) {
  e.currentTarget.style.transform = "";
}

function ProjectCard({ project: p }) {
  const demo = demoUrl(p);
  const repo = repoUrl(p);
  const tags = (p.tags?.length ? p.tags : (p.tech || "").split(",").map((t) => t.trim()).filter(Boolean)).slice(0, 4);
  // Live projects show their address; others show where the code lives
  const address = hostOf(demo) || (repo ? hostOf(repo) + repo.replace(/^https?:\/\/[^/]+/, "") : "private project");

  return (
    <li
      onMouseMove={tilt}
      onMouseLeave={untilt}
      className="group flex w-[230px] shrink-0 flex-col overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] transition-[transform,border-color] duration-200 hover:border-[#ff8a1f] sm:w-[260px]"
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-3 py-2">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-[#ff5f56]" />
          <span className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
          <span className="h-2 w-2 rounded-full bg-[#27c93f]" />
        </span>
        <span className="min-w-0 flex-1 truncate rounded-md bg-[var(--bg-base)] px-2 py-0.5 text-[10px] text-[var(--text-dim)]">
          {address}
        </span>
      </div>

      {/* Screenshot */}
      <div className="relative aspect-[16/9] overflow-hidden bg-[var(--bg-elevated)]">
        <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.04]">
          <ProjectImage project={p} />
        </div>
        {p.featured && (
          <span
            className="absolute right-2 top-2 rounded px-1.5 py-0.5 text-[10px] font-bold text-black"
            style={{ backgroundColor: ACCENT }}
          >
            Featured
          </span>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col p-4">
        <h3
          className="m-0 text-base font-bold leading-snug text-[var(--text-main)]"
          style={{ fontFamily: "'Inter', sans-serif", textTransform: "none" }}
        >
          {p.title}
        </h3>
        <p className="m-0 mt-1 text-xs text-[var(--text-dim)]">
          {p.company || p.language || "Personal"}
          {p.updatedAt && ` · ${formatDate(p.updatedAt)}`}
        </p>

        {p.description && (
          <p className="m-0 mt-2 line-clamp-2 text-xs leading-relaxed text-[var(--text-muted)]">{p.description}</p>
        )}

        {tags.length > 0 && (
          <ul className="m-0 mt-3 flex list-none flex-wrap gap-1 p-0">
            {tags.slice(0, 3).map((t) => (
              <li
                key={t}
                className="rounded-full bg-[#ff8a1f]/10 px-2 py-0.5 text-[10px] font-semibold text-[#ff8a1f]"
              >
                {t}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex items-center gap-2 pt-4">
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold text-black transition-colors hover:bg-white ${focusRing}`}
              style={{ backgroundColor: ACCENT }}
            >
              Live demo <FiArrowUpRight aria-hidden="true" />
              <span className="sr-only"> for {p.title} (opens in a new tab)</span>
            </a>
          )}
          {!demo && repo && (
            <a
              href={repo}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[var(--border-subtle)] px-3 py-2 text-xs font-semibold text-[var(--text-main)] transition-colors hover:border-[#ff8a1f] ${focusRing}`}
            >
              View project <FiArrowUpRight aria-hidden="true" />
              <span className="sr-only"> for {p.title} on GitHub (opens in a new tab)</span>
            </a>
          )}
          {!demo && !repo && (
            <span className="flex-1 rounded-lg border border-dashed border-[var(--border-subtle)] px-3 py-2 text-center text-xs text-[var(--text-dim)]">
              {p.private ? "Private repository" : p.cta}
            </span>
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
