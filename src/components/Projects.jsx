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
const INITIAL_CARDS = Infinity;

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
    // Company work: D3innovatives projects first, the Irohub CRM last
    if (category === PROJECT_CATEGORIES.COMPANY) {
      const rank = (p) => (/d3innovatives/i.test(p.company || "") ? 0 : /irohub/i.test(p.company || "") ? 2 : 1);
      full.sort((a, b) => rank(a) - rank(b));
    }
    return limited ? full.slice(0, INITIAL_CARDS) : full;
  }, [matches, limited, category]);

  const count = (key) =>
    key === PROJECT_CATEGORIES.ALL
      ? allProjects.length
      : allProjects.filter((p) => p.category === key).length;

  const clearFilters = () => {
    setQuery("");
    setLanguage("");
  };

  return (
    <section id="work" className="mx-auto w-full max-w-[1680px] py-4 md:py-6">
      <div className="flex flex-col gap-6 px-5 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <h2
            className="m-0 text-3xl font-extrabold tracking-tight text-[var(--text-main)] md:text-4xl"
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

      <div className="mt-4 px-5 md:px-8">
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

      <div aria-live="polite" className="mb-1 mt-1 min-h-[1.25rem] px-5 text-sm text-[var(--text-dim)] md:px-8">
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
  const active = useRef(0);

  // Spotlight: the card nearest the middle is full size; the others shrink and step back.
  // Card positions are measured once (and on resize), so a scroll frame only does arithmetic and
  // writes styles straight to the cards. Nothing re-renders while scrolling.
  useEffect(() => {
    trackRef.current?.scrollTo({ left: 0, behavior: "instant" });
  }, [items]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = [...el.children];
    let metrics = [];
    let frame = 0;
    const measure = () => {
      metrics = cards.map((c) => ({ mid: c.offsetLeft + c.offsetWidth / 2, w: c.offsetWidth }));
    };
    const update = () => {
      frame = 0;
      const mid = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      for (let i = 0; i < cards.length; i++) {
        const m = metrics[i];
        const dist = Math.abs(m.mid - mid);
        if (!reduce) {
          const d = dist / (m.w - 64);
          // Deck of layers: the card in focus sits in front at full size, the others step back behind it
          cards[i].style.scale = (1 - Math.min(d, 3) * 0.1).toFixed(3);
          cards[i].style.zIndex = String(100 - Math.round(d * 10));
        }
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      }
      active.current = best;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      onScroll();
    };
    measure();
    update();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [items]);

  const goTo = (i) => {
    const el = trackRef.current;
    const card = el?.children[i];
    if (!card) return;
    el.scrollTo({ left: card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2, behavior: "smooth" });
  };

  // Scrolling down the page: when the row reaches the middle of the screen the page stops there and the
  // wheel moves the cards instead, starting from the first one. After the last card (or the first, going
  // back up) the wheel scrolls the page again.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let snapping = false;
    // Wheel input is eased: the row glides toward a target position instead of jumping per wheel tick
    let target = el.scrollLeft;
    let gliding = false;
    const glide = () => {
      const diff = target - el.scrollLeft;
      if (Math.abs(diff) < 0.5) {
        el.scrollLeft = target;
        gliding = false;
        return;
      }
      el.scrollLeft += diff * 0.16;
      requestAnimationFrame(glide);
    };
    // Arrow buttons, dragging or touch moved the row: follow it
    const onNativeScroll = () => {
      if (!gliding) target = el.scrollLeft;
    };
    el.addEventListener("scroll", onNativeScroll, { passive: true });
    const onWheel = (e) => {
      const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      const max = el.scrollWidth - el.clientWidth;
      if (!delta || max <= 0) return;
      // Judge the ends by where the row is heading, not where it is mid-glide, so the page takes over
      // the moment the last (or first) card has been asked for instead of after the glide settles
      const at = gliding ? target : el.scrollLeft;
      const atStart = at <= 1 && delta < 0;
      const atEnd = at >= max - 1 && delta > 0;
      // The whole block (title, Company/Personal switch, search, then the cards) is held in view,
      // just under the navbar, so the filters stay above the cards while the wheel moves them
      const section = el.closest("section");
      const vh = window.innerHeight;
      const off = (section ? section.getBoundingClientRect().top : 0) - 88;
      if (snapping) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      if (atStart || atEnd || Math.abs(off) > vh * 0.35) return;
      e.preventDefault();
      e.stopPropagation(); // keeps the page smooth-scroller from also moving the page
      if (Math.abs(off) > 6) {
        // Bring the block to its place under the navbar first
        snapping = true;
        const top = window.scrollY + off;
        if (window.__lenis) window.__lenis.scrollTo(top, { duration: 0.45 });
        else window.scrollTo({ top, behavior: "smooth" });
        setTimeout(() => (snapping = false), 500);
        return;
      }
      target = Math.max(0, Math.min(max, (gliding ? target : el.scrollLeft) + delta));
      if (!gliding) {
        gliding = true;
        requestAnimationFrame(glide);
      }
    };
    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    return () => {
      window.removeEventListener("wheel", onWheel, { capture: true });
      el.removeEventListener("scroll", onNativeScroll);
    };
  }, []);

  const scrollBy = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    goTo(Math.max(0, Math.min(items.length - 1, active.current + dir)));
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => scrollBy(-1)}
        aria-label="Previous project"
        className="absolute left-3 top-1/2 z-[200] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-main)] transition-colors hover:border-[#ff8a1f] md:left-6"
      >
        <FiArrowLeft aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => scrollBy(1)}
        aria-label="Next project"
        className="absolute right-3 top-1/2 z-[200] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-main)] transition-colors hover:border-[#ff8a1f] md:right-6"
      >
        <FiArrowRight aria-hidden="true" />
      </button>

      <ul
        ref={trackRef}
        className="relative m-0 flex list-none items-center overflow-x-auto px-[calc(50%-170px)] pb-4 pt-4 sm:px-[calc(50%-200px)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
  // Company work is not linked anywhere: no live demo and no code, per company policy
  const isCompany = p.category === PROJECT_CATEGORIES.COMPANY;
  const demo = isCompany ? null : demoUrl(p);
  const repo = isCompany ? null : repoUrl(p);
  const tags = (p.tags?.length ? p.tags : (p.tech || "").split(",").map((t) => t.trim()).filter(Boolean)).slice(0, 4);
  // Live projects show their address; others show where the code lives
  const address = hostOf(demo) || (repo ? hostOf(repo) + repo.replace(/^https?:\/\/[^/]+/, "") : "private project");

  return (
    <li
      onMouseMove={tilt}
      onMouseLeave={untilt}
      className="group -ml-16 will-change-transform flex w-[340px] shrink-0 flex-col first:ml-0 overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] transition-[transform,border-color] duration-200 hover:border-[#ff8a1f] sm:w-[400px]"
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-3 py-2">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-[#ff5f56]" />
          <span className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
          <span className="h-2 w-2 rounded-full bg-[#27c93f]" />
        </span>
        <span className="min-w-0 flex-1 truncate rounded-md bg-[var(--bg-base)] px-2 py-0.5 text-xs text-[var(--text-muted)]">
          {address}
        </span>
      </div>

      {/* Screenshot */}
      <div className="relative aspect-[2/1] overflow-hidden bg-[var(--bg-elevated)]">
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
      <div className="flex flex-1 flex-col p-5">
        <h3
          className="m-0 text-lg font-bold leading-snug text-[var(--text-main)]"
          style={{ fontFamily: "'Inter', sans-serif", textTransform: "none" }}
        >
          {p.title}
        </h3>
        <p className="m-0 mt-1 text-sm text-[var(--text-muted)]">
          {p.company || p.language || "Personal"}
          {p.updatedAt && ` · ${formatDate(p.updatedAt)}`}
        </p>

        {p.description && (
          <p className="m-0 mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--text-main)]/85">{p.description}</p>
        )}

        {tags.length > 0 && (
          <ul className="m-0 mt-3 flex list-none flex-wrap gap-1 p-0">
            {tags.slice(0, 3).map((t) => (
              <li
                key={t}
                className="rounded-full bg-[#ff8a1f]/10 px-2.5 py-1 text-xs font-semibold text-[#ff8a1f]"
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
              className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-bold text-black transition-colors hover:bg-white ${focusRing}`}
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
              className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[var(--border-subtle)] px-3 py-2.5 text-sm font-semibold text-[var(--text-main)] transition-colors hover:border-[#ff8a1f] ${focusRing}`}
            >
              View project <FiArrowUpRight aria-hidden="true" />
              <span className="sr-only"> for {p.title} on GitHub (opens in a new tab)</span>
            </a>
          )}
          {!demo && !repo && (
            <span className="flex-1 rounded-lg border border-dashed border-[var(--border-subtle)] px-3 py-2.5 text-center text-sm text-[var(--text-muted)]">
              {isCompany ? "Private company project" : p.private ? "Private repository" : p.cta}
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
        decoding="async"
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
