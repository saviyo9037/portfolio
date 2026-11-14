import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { FiArrowUpRight, FiX } from "react-icons/fi";
import { PROJECT_CATEGORIES } from "../data/projects";
import { applyControls, demoUrl, languagesOf, repoUrl } from "../lib/mergeProjects";
import { imageSrc, tagsOf, useAllProjects, yearOf } from "../hooks/useAllProjects";
import ProjectControls from "./ProjectControls";

const ACCENT = "#ffc933";
const FEATURED_MAX = 6;
const PAGE = 9;
const heading = { fontFamily: "'Inter', sans-serif" };

const FILTERS = [
  { key: PROJECT_CATEGORIES.ALL, label: "All" },
  { key: PROJECT_CATEGORIES.COMPANY, label: "Company" },
  { key: PROJECT_CATEGORIES.PERSONAL, label: "Personal" },
];

const kind = (p) => (p.category === PROJECT_CATEGORIES.COMPANY ? p.company || "Company work" : p.language || "Personal project");

function Cover({ project: p, className = "", style }) {
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
        className={`h-full w-full object-cover ${className}`}
        style={style}
      />
    );
  }
  return <div className={`h-full w-full bg-gradient-to-br ${p.gradient || "from-slate-700 to-slate-900"}`} />;
}

/* ---------- Details window. Company work shows no demo or code link. ---------- */
function Details({ project: p, onClose }) {
  const closeRef = useRef(null);
  const company = p.category === PROJECT_CATEGORIES.COMPANY;
  const demo = company ? null : demoUrl(p);
  const repo = company ? null : repoUrl(p);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[200] flex items-end justify-center bg-black/80 sm:items-center sm:p-6" onClick={onClose} data-lenis-prevent>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={p.title}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-xl border border-white/15 bg-[#17171a] sm:rounded-xl"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/10 bg-[#1f1f23]">
          <Cover project={p} className="object-top" />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black"
          >
            <FiX aria-hidden="true" />
          </button>
        </div>
        <div className="p-5 sm:p-7">
          <p className="m-0 text-sm text-white/50">
            {yearOf(p)} · {kind(p)}
          </p>
          <h3 className="m-0 mt-2 text-2xl font-black leading-tight tracking-tight text-white sm:text-3xl" style={heading}>
            {p.title}
          </h3>
          <ul className="m-0 mt-4 flex list-none flex-wrap gap-2 p-0">
            {tagsOf(p, 8).map((t) => (
              <li key={t} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70">
                {t}
              </li>
            ))}
          </ul>
          <p className="m-0 mt-5 text-base leading-relaxed text-white/75">{p.description}</p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            {demo && (
              <a href={demo} target="_blank" rel="noreferrer" className="inline-flex h-10 items-center gap-2 rounded-full px-6 text-sm font-semibold text-black transition-colors hover:bg-white" style={{ backgroundColor: ACCENT }}>
                Live demo <FiArrowUpRight aria-hidden="true" />
              </a>
            )}
            {repo && (
              <a href={repo} target="_blank" rel="noreferrer" className="inline-flex h-10 items-center gap-2 rounded-full border border-white/25 px-5 text-sm font-medium text-white transition-colors hover:bg-white/10">
                Source code <FiArrowUpRight aria-hidden="true" />
              </a>
            )}
            {!demo && !repo && <span className="text-sm text-white/50">Private company project</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Showcase: one big project at a time while you scroll ---------- */
function Showcase({ featured, onOpen }) {
  const reduce = useReducedMotion();
  const n = Math.max(featured.length, 1);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [index, setIndex] = useState(0);
  const [pan, setPan] = useState(0);

  // Which project is showing, and how far through it the scroll is (the screenshot pans with it)
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const f = Math.min(0.9999, Math.max(0, v)) * n;
    setIndex(Math.floor(f));
    setPan(f - Math.floor(f));
  });

  const p = featured[index];
  if (!p) return null;

  return (
    <div ref={ref} className="relative" style={{ height: reduce ? "auto" : `${(n + 1) * 100}vh` }}>
      <div className={reduce ? "px-5 py-16 sm:px-10" : "sticky top-0 flex h-[100svh] w-full items-center px-5 pb-6 pt-28 sm:px-10"}>
        <div className="mx-auto grid w-full max-w-[1500px] items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,3.2fr)] lg:gap-12">
          <div>
            <p className="m-0 text-sm font-medium" style={{ color: ACCENT }}>
              Selected projects
            </p>
            <h2 className="m-0 mt-2 text-4xl font-black leading-[0.95] tracking-tight text-white lg:text-5xl" style={heading}>
              Featured
              <br />
              work
            </h2>
            <ol className="m-0 mt-7 hidden list-none flex-col gap-1 p-0 lg:flex">
              {featured.map((f, i) => (
                <li key={f.id}>
                  <button
                    type="button"
                    onClick={() => onOpen(f)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-white/5 ${i === index ? "bg-white/[0.07]" : ""}`}
                  >
                    <span className={`font-mono text-xs ${i === index ? "text-[#ffc933]" : "text-white/40"}`}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={`truncate text-sm font-semibold ${i === index ? "text-white" : "text-white/50"}`}>{f.title}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <button
            type="button"
            onClick={() => onOpen(p)}
            aria-label={`Open ${p.title}`}
            className="group flex w-full cursor-pointer flex-col overflow-hidden rounded-xl border border-white/15 bg-[#17171a] text-left outline-none focus-visible:ring-2 focus-visible:ring-white/50 lg:h-[calc(100svh-10rem)]"
          >
            {/* Screenshot on its own: no text over it */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1f1f23] lg:aspect-auto lg:min-h-0 lg:flex-1">
              {featured.map((f, i) => (
                <div key={f.id} className="absolute inset-0 transition-opacity duration-500" style={{ opacity: i === index ? 1 : 0 }}>
                  <Cover project={f} style={{ objectPosition: `50% ${i === index ? pan * 100 : 0}%` }} />
                </div>
              ))}
              <span className="absolute left-4 top-4 rounded-full bg-black/75 px-3 py-1 font-mono text-xs text-white">
                {String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
              </span>
            </div>

            {/* Details on a solid panel, so every line is easy to read */}
            <div className="flex shrink-0 flex-col gap-3 border-t border-white/10 bg-[#17171a] p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
              <div className="min-w-0">
                <p className="m-0 text-sm text-white/55">{kind(p)} · {yearOf(p)}</p>
                <h3 className="m-0 mt-1 text-xl font-black leading-tight tracking-tight text-white sm:text-2xl" style={heading}>
                  {p.title}
                </h3>
                <p className="m-0 mt-2 line-clamp-2 max-w-2xl text-[15px] leading-relaxed text-white/70">{p.description}</p>
              </div>
              <div className="flex shrink-0 flex-col items-start gap-3 lg:items-end">
                <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0 lg:justify-end">
                  {tagsOf(p, 4).map((t) => (
                    <li key={t} className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/80">
                      {t}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: ACCENT }}>
                  Open project <FiArrowUpRight aria-hidden="true" />
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Browse every project, with filters ---------- */
function Browser({ list, onOpen }) {
  const [category, setCategory] = useState(PROJECT_CATEGORIES.ALL);
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("");
  const [sort, setSort] = useState("updated");
  const [showAll, setShowAll] = useState(false);

  const count = (key) => (key === PROJECT_CATEGORIES.ALL ? list.length : list.filter((p) => p.category === key).length);
  const languages = useMemo(() => languagesOf(list), [list]);
  const matches = useMemo(() => {
    const base = category === PROJECT_CATEGORIES.ALL ? list : list.filter((p) => p.category === category);
    return applyControls(base, { query, language, sort });
  }, [list, category, query, language, sort]);

  const filtering = Boolean(query.trim() || language);
  const shown = showAll || filtering ? matches : matches.slice(0, PAGE);

  return (
    <div className="mx-auto max-w-[1500px] px-5 pb-28 pt-16 sm:px-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="m-0 text-3xl font-black tracking-tight text-white sm:text-4xl" style={heading}>
            All projects
          </h2>
          <p className="m-0 mt-2 text-sm text-white/55">
            {matches.length} {matches.length === 1 ? "project" : "projects"}
            {filtering ? " match your search" : ""}
          </p>
        </div>

        <div role="group" aria-label="Filter projects" className="inline-flex w-max rounded-xl border border-white/15 bg-white/[0.04] p-1">
          {FILTERS.map((f) => {
            const on = category === f.key;
            return (
              <button
                key={f.key}
                type="button"
                aria-pressed={on}
                onClick={() => {
                  setCategory(f.key);
                  setShowAll(false);
                }}
                className={`relative rounded-lg px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffc933] ${on ? "text-black" : "text-white/65 hover:text-white"}`}
              >
                {on && (
                  <motion.span layoutId="projects-filter-thumb" className="absolute inset-0 rounded-lg" style={{ backgroundColor: ACCENT }} transition={{ type: "spring", stiffness: 450, damping: 36 }} />
                )}
                <span className="relative z-10">
                  {f.label} <span className={`font-normal ${on ? "text-black/70" : "text-white/40"}`}>{count(f.key)}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        <ProjectControls query={query} onQuery={setQuery} language={language} onLanguage={setLanguage} languages={languages} sort={sort} onSort={setSort} />
      </div>

      {shown.length === 0 ? (
        <div className="mt-10 rounded-xl border border-white/15 bg-white/[0.04] p-6 text-sm text-white/65">
          <p className="m-0">No projects match your search.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setLanguage("");
            }}
            className="mt-3 underline underline-offset-4 hover:text-white"
          >
            Clear search and filters
          </button>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
          {shown.map((p) => (
            <article key={p.id} className="min-w-0" style={{ contentVisibility: "auto", containIntrinsicSize: "auto 440px" }}>
              <button type="button" onClick={() => onOpen(p)} className="group block w-full rounded-xl text-left outline-none focus-visible:ring-2 focus-visible:ring-white/40">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/15 bg-[#1f1f23] transition-colors group-hover:border-[#ffc933]/70">
                  <Cover project={p} className="object-top transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none" />
                  {p.featured && (
                    <span className="absolute right-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold text-black" style={{ backgroundColor: ACCENT }}>
                      Featured
                    </span>
                  )}
                </div>
                <p className="m-0 mt-4 text-sm text-white/50">
                  {kind(p)} · {yearOf(p)}
                </p>
                <h3 className="m-0 mt-1 text-xl font-bold leading-snug tracking-tight text-white" style={heading}>
                  {p.title}
                </h3>
                <p className="m-0 mt-2 line-clamp-2 text-[15px] leading-relaxed text-white/65">{p.description}</p>
                <ul className="m-0 mt-3 flex list-none flex-wrap gap-1.5 p-0">
                  {tagsOf(p, 3).map((t) => (
                    <li key={t} className="rounded-full border border-white/15 px-2.5 py-1 text-xs text-white/65">
                      {t}
                    </li>
                  ))}
                </ul>
              </button>
            </article>
          ))}
        </div>
      )}

      {!showAll && !filtering && matches.length > PAGE && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3 text-sm font-semibold text-white transition-colors hover:border-[#ffc933] hover:text-[#ffc933]"
          >
            Show all {matches.length} projects <FiArrowUpRight aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function Projects() {
  const { list } = useAllProjects();
  const [open, setOpen] = useState(null);
  const featured = useMemo(() => list.filter((p) => p.featured).slice(0, FEATURED_MAX), [list]);

  return (
    <section id="work" aria-label="Projects">
      <Showcase featured={featured} onOpen={setOpen} />
      <Browser list={list} onOpen={setOpen} />
      {open && <Details project={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
