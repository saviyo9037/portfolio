import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight, FiX } from "react-icons/fi";
import { PROJECT_CATEGORIES } from "../data/projects";
import { applyControls, demoUrl, languagesOf, repoUrl } from "../lib/mergeProjects";
import { imageSrc, tagsOf, useAllProjects, yearOf } from "../hooks/useAllProjects";
import ProjectControls from "./ProjectControls";
import { useStaticLayout } from "../hooks/useStaticLayout";

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

/* ---------- Showcase: cards stack on top of each other as you scroll ---------- */
// Soft card colours, each with a darker tone for the small heading. Text on them is always dark.
const CARD_TONES = [
  { bg: "#ffb59a", ink: "#6b4de6" },
  { bg: "#cfc9f5", ink: "#4b3bb5" },
  { bg: "#b7dcc2", ink: "#166a3d" },
  { bg: "#f3e3a2", ink: "#8a5a00" },
  { bg: "#a9d0ee", ink: "#1b5a96" },
  { bg: "#efbad6", ink: "#a02266" },
];

const clamp01 = (v) => Math.min(1, Math.max(0, v));

// Card number `index` arrives (slides up over the previous one) while the scroll is between these two points
const arrival = (index, count) => {
  const span = 1 / (count - 1);
  const start = (index - 1) * span;
  return [start, start + span];
};

function CardBody({ project: p, index, tone, onOpen }) {
  return (
    <div className="grid gap-8 p-6 sm:p-10 lg:min-h-[28rem] lg:grid-cols-2 lg:gap-12">
      <div className="flex flex-col">
        <div className="flex items-center justify-between gap-4 text-sm text-black/60">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span>{yearOf(p)}</span>
        </div>

        <h3 className="m-0 mt-5 text-3xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl" style={heading}>
          {p.title}
        </h3>
        <p className="m-0 mt-3 text-lg font-medium sm:text-xl" style={{ color: tone.ink }}>
          {kind(p)}
        </p>
        <p className="m-0 mt-4 line-clamp-4 max-w-[46ch] text-[15px] leading-relaxed text-black/70 sm:text-base">{p.description}</p>

        <div className="mt-auto pt-6">
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
            {tagsOf(p, 4).map((t) => (
              <li key={t} className="rounded-full bg-white/55 px-4 py-1.5 text-sm text-black/80">
                {t}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => onOpen(p)}
            className="mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-[#1a1a1a] px-6 text-sm font-bold text-white transition-transform hover:scale-[1.03]"
          >
            Open project <FiArrowUpRight aria-hidden="true" />
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onOpen(p)}
        aria-label={`Open ${p.title}`}
        className="group relative block aspect-[16/10] w-full self-center overflow-hidden rounded-3xl bg-black/10 shadow-xl outline-none focus-visible:ring-2 focus-visible:ring-black/60"
      >
        <Cover project={p} className="object-top transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none" />
      </button>
    </div>
  );
}

// A card in the pinned stack: card 1 is there at the start, the others rise from below and cover the one before
function StackCard({ project: p, index, count, progress, onOpen }) {
  const tone = CARD_TONES[index % CARD_TONES.length];

  // How far each later card has arrived, added up: this card shrinks and dims as more cards cover it
  const covered = useTransform(progress, (v) => {
    let sum = 0;
    for (let j = index + 1; j < count; j += 1) {
      const [s, e] = arrival(j, count);
      sum += clamp01((v - s) / (e - s));
    }
    return sum;
  });
  const scale = useTransform(covered, (c) => 1 - c * 0.04);
  const shade = useTransform(covered, (c) => Math.min(0.5, c * 0.12));

  // Card 1 never moves in. Later cards slide up from below the screen.
  const [s0, e0] = index > 0 ? arrival(index, count) : [0, 1];
  const rise = useTransform(progress, [s0, e0], [index > 0 ? "105vh" : "0vh", "0vh"], { clamp: true });

  return (
    <motion.article
      style={{ y: rise, scale, backgroundColor: tone.bg, top: `calc(${index} * 1.4rem)`, zIndex: index + 1, transformOrigin: "50% 0%" }}
      className="absolute inset-x-0 overflow-hidden rounded-[2rem] text-[#1a1a1a] shadow-[0_-24px_50px_-28px_rgba(0,0,0,0.8)] sm:rounded-[2.5rem]"
    >
      <CardBody project={p} index={index} tone={tone} onOpen={onOpen} />
      <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black" style={{ opacity: shade }} />
    </motion.article>
  );
}

function Showcase({ featured, onOpen }) {
  const plain = useStaticLayout();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const count = featured.length;
  if (!count) return null;
  const stacked = !plain && count > 1;

  return (
    <div className="px-5 pb-10 pt-10 sm:px-10">
      <div className="mx-auto max-w-[1500px]">
        <p className="m-0 text-sm font-medium" style={{ color: ACCENT }}>
          Selected projects
        </p>
        <h2 className="m-0 mt-2 text-4xl font-black leading-[0.95] tracking-tight text-white lg:text-6xl" style={heading}>
          Featured work
        </h2>

        {stacked ? (
          // The section is tall; the stage stays pinned while you scroll through it
          <div ref={ref} className="relative mt-8" style={{ height: `${count * 100}svh` }}>
            <div className="sticky top-24 h-[calc(100svh-7rem)]">
              {featured.map((p, i) => (
                <StackCard key={p.id} project={p} index={i} count={count} progress={scrollYProgress} onOpen={onOpen} />
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-10 flex flex-col gap-8">
            {featured.map((p, i) => {
              const tone = CARD_TONES[i % CARD_TONES.length];
              return (
                <article key={p.id} className="overflow-hidden rounded-[2rem] text-[#1a1a1a]" style={{ backgroundColor: tone.bg }}>
                  <CardBody project={p} index={i} tone={tone} onOpen={onOpen} />
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- All projects as flip tiles: each tile turns over to show its details ---------- */
function FlipTile({ project: p, index, cols, onOpen, reduce }) {
  const [flipped, setFlipped] = useState(false);
  const ref = useRef(null);

  // A light that follows the mouse across the front of the tile
  const glare = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--gx", `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
    el.style.setProperty("--gy", `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
  };

  // The tiles stand up one diagonal at a time
  const wave = ((index % cols) + Math.floor(index / cols)) * 0.09;

  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, rotateX: -80, y: 40 }}
      whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay: wave, ease: [0.16, 1, 0.3, 1] }}
      className="min-w-0 list-none"
      style={{ perspective: "1200px", transformOrigin: "50% 100%" }}
    >
      <button
        ref={ref}
        type="button"
        onMouseEnter={() => window.matchMedia("(hover: hover)").matches && setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
        onMouseMove={glare}
        onFocus={() => setFlipped(true)}
        onBlur={() => setFlipped(false)}
        onClick={() => (flipped ? onOpen(p) : setFlipped(true))}
        aria-label={`Open ${p.title}`}
        className="relative block aspect-[4/3] w-full rounded-2xl text-left outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        style={{ perspective: "1200px" }}
      >
        {/* The button itself never moves, so the mouse cannot flicker between "inside" and "outside" as the tile turns */}
        <span
          className="absolute inset-0 block"
          style={{ transformStyle: "preserve-3d", transform: `rotateY(${flipped ? 180 : 0}deg)`, transition: reduce ? "none" : "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)", willChange: "transform" }}
        >
        {/* Front: the screenshot */}
        <span className="absolute inset-0 block overflow-hidden rounded-2xl border border-white/15 bg-[#1f1f23]" style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}>
          <Cover project={p} className="object-top" />
          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
          <span aria-hidden="true" className="absolute inset-0" style={{ background: "radial-gradient(260px circle at var(--gx,50%) var(--gy,50%), rgba(255,255,255,0.16), transparent 60%)" }} />
          {p.featured && (
            <span className="absolute right-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold text-black" style={{ backgroundColor: ACCENT }}>
              Featured
            </span>
          )}
          <span className="absolute inset-x-4 bottom-3 block">
            <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-white/65">
              {kind(p)} · {yearOf(p)}
            </span>
            <span className="mt-1 block truncate text-xl font-black uppercase leading-tight tracking-tight text-white" style={heading}>
              {p.title}
            </span>
          </span>
        </span>

        {/* Back: the details */}
        <span
          className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl p-5 text-[#1a1a1a]"
          style={{ backgroundColor: ACCENT, transform: "rotateY(180deg)", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <span className="block">
            <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-black/60">
              {String(index + 1).padStart(2, "0")} · {kind(p)} · {yearOf(p)}
            </span>
            <span className="mt-2 block text-xl font-black uppercase leading-tight tracking-tight" style={heading}>
              {p.title}
            </span>
            <span className="mt-2 line-clamp-4 block text-[14px] leading-relaxed text-black/75">{p.description}</span>
          </span>
          <span className="flex flex-wrap items-center gap-1.5">
            {tagsOf(p, 3).map((t) => (
              <span key={t} className="rounded-full bg-black/10 px-2.5 py-1 text-xs text-black/80">
                {t}
              </span>
            ))}
            <span className="ml-auto inline-flex h-9 items-center gap-1.5 rounded-full bg-[#1a1a1a] px-4 text-xs font-bold text-white">
              Open <FiArrowUpRight aria-hidden="true" />
            </span>
          </span>
        </span>
        </span>
      </button>
    </motion.li>
  );
}

function ProjectFlip({ projects, onOpen }) {
  const reduce = useReducedMotion();
  const gridRef = useRef(null);
  const [cols, setCols] = useState(3);

  // Columns, for timing the wave
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return undefined;
    const measure = () => setCols(el.clientWidth >= 1100 ? 3 : el.clientWidth >= 640 ? 2 : 1);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="mt-10">
      <p className="m-0 mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">Hover or tap a tile to turn it over · click again to open the project</p>
      <ul ref={gridRef} className="m-0 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((p, i) => (
          <FlipTile key={p.id} project={p} index={i} cols={cols} onOpen={onOpen} reduce={reduce} />
        ))}
      </ul>
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
        <ProjectFlip key={shown.map((x) => x.id).join("|")} projects={shown} onOpen={onOpen} />
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
