import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight, FiX } from "react-icons/fi";
import { PROJECT_CATEGORIES } from "../data/projects";
import { applyControls, demoUrl, languagesOf, repoUrl } from "../lib/mergeProjects";
import { imageSrc, tagsOf, useAllProjects, yearOf } from "../hooks/useAllProjects";
import ProjectControls from "./ProjectControls";
import { useStaticLayout } from "../hooks/useStaticLayout";

const ACCENT = "#ff4d00";
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
        className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-xl border border-white/15 bg-[#14121d] sm:rounded-xl"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/10 bg-[#161320]">
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
          Featured <span className="serif-accent">work</span>
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

/* ---------- All projects as a journey: a glowing zigzag line draws down the page and bends at every project ---------- */
function JourneyCard({ project: p, index, left, reduce, onOpen }) {
  const ref = useRef(null);
  const E = [0.16, 1, 0.3, 1];

  // The screenshot drifts slowly inside its frame as the card passes through the screen
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-9%", "9%"]);

  // One observer per card: the card slides in, then its parts follow one after another
  const card = {
    hide: { opacity: 0, x: left ? -70 : 70 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: E, staggerChildren: 0.07, delayChildren: 0.15 } },
  };
  const part = { hide: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: E } } };
  const wipe = {
    hide: { clipPath: left ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)" },
    show: { clipPath: "inset(0 0% 0 0%)", transition: { duration: 0.9, ease: E, delay: 0.1 } },
  };
  const char = {
    hide: { y: "110%" },
    show: (i) => ({ y: "0%", transition: { duration: 0.6, ease: E, delay: 0.25 + i * 0.07 } }),
  };

  // A small tilt toward the mouse, written straight to the card (no re-render)
  const tilt = (e) => {
    if (reduce || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`;
  };
  const untilt = (e) => {
    e.currentTarget.style.transform = "";
  };

  return (
    <motion.article
      ref={ref}
      variants={card}
      initial={reduce ? "show" : "hide"}
      whileInView="show"
      viewport={{ once: false, margin: "-12% 0px" }}
      className={`w-full lg:w-[calc(50%-4.5rem)] ${left ? "lg:mr-auto" : "lg:ml-auto"}`}
    >
      <button
        type="button"
        onClick={() => onOpen(p)}
        onMouseMove={tilt}
        onMouseLeave={untilt}
        aria-label={`Open ${p.title}`}
        className="group block w-full overflow-hidden rounded-2xl border border-white/15 bg-[#1a1726]/90 text-left outline-none transition-[transform,border-color] duration-200 ease-out hover:border-[#ff4d00] focus-visible:ring-2 focus-visible:ring-white/70 sm:flex"
      >
        <motion.span variants={wipe} className="relative block aspect-[16/8] w-full overflow-hidden bg-[#161320] sm:aspect-auto sm:min-h-[10.5rem] sm:w-[38%] sm:shrink-0">
          <motion.span className="absolute inset-0 block scale-[1.2]" style={{ y: drift }}>
            <Cover project={p} className="object-top" />
          </motion.span>
          {p.featured && (
            <span className="absolute right-2.5 top-2.5 rounded-full px-2.5 py-1 text-[11px] font-bold text-black" style={{ backgroundColor: ACCENT }}>
              Featured
            </span>
          )}
        </motion.span>

        <span className="block p-4 sm:flex-1 sm:p-5">
          {/* The year: each digit rises out of a mask */}
          <span className="flex overflow-hidden text-4xl font-black leading-none tracking-tight sm:text-5xl" style={{ ...heading, color: ACCENT }} aria-label={String(yearOf(p))}>
            {String(yearOf(p)).split("").map((ch, i) => (
              <span key={i} aria-hidden="true" className="inline-block overflow-hidden">
                <motion.span variants={char} custom={i} className="inline-block">
                  {ch}
                </motion.span>
              </span>
            ))}
          </span>
          <motion.span variants={part} className="mt-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
            {String(index + 1).padStart(2, "0")} · {kind(p)}
          </motion.span>
          <motion.span variants={part} className="mt-2 block text-lg font-black uppercase leading-tight tracking-tight text-white sm:text-xl" style={heading}>
            {p.title}
          </motion.span>
          <motion.span variants={part} className="mt-2 line-clamp-2 block text-sm leading-relaxed text-white/65">
            {p.description}
          </motion.span>
          <motion.span variants={part} className="mt-3 flex flex-wrap items-center gap-1.5">
            {tagsOf(p, 3).map((t) => (
              <span key={t} className="rounded-full border border-white/15 px-2.5 py-0.5 text-xs text-white/70">
                {t}
              </span>
            ))}
            <span className="ml-auto inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: ACCENT }}>
              Open <FiArrowUpRight aria-hidden="true" className="transition-transform duration-300 group-hover:rotate-45" />
            </span>
          </motion.span>
        </span>
      </button>
    </motion.article>
  );
}

function ProjectJourney({ projects, onOpen }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 55%"] });
  const grow = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const reveal = useTransform(grow, (v) => `inset(-20px -20px ${((1 - v) * 100).toFixed(2)}% -20px)`);
  const n = projects.length;

  // The zigzag: it starts and ends in the middle and bends in toward each card
  const xs = projects.map((_, i) => (i % 2 === 0 ? 47 : 53));
  const ys = projects.map((_, i) => ((i + 0.5) / n) * 100);
  const d = `M 50 0 ${xs.map((x, i) => `L ${x} ${ys[i]}`).join(" ")} L 50 100`;

  return (
    <div ref={ref} className="relative mt-12">
      {/* Phones and tablets: a straight line down the left edge */}
      <div aria-hidden="true" className="absolute bottom-0 left-4 top-0 w-px bg-white/15 lg:hidden" />
      <motion.div
        aria-hidden="true"
        className="absolute bottom-0 left-4 top-0 w-[3px] origin-top -translate-x-[1px] rounded-full lg:hidden"
        style={{ backgroundColor: ACCENT, scaleY: reduce ? 1 : grow, boxShadow: "0 0 14px rgba(255, 77, 0,0.6)" }}
      />

      {/* Wide screens: the glowing zigzag. It is drawn once; scrolling only uncovers it from the top, which is cheap. */}
      <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible lg:block">
        <path d={d} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
      <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block" style={{ clipPath: reduce ? "none" : reveal, willChange: "clip-path", transform: "translateZ(0)" }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full overflow-visible">
          {/* a wide soft stroke under the bright one gives the neon glow without a costly filter */}
          <path d={d} fill="none" stroke="rgba(255, 77, 0,0.28)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          <path d={d} fill="none" stroke={ACCENT} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        </svg>
      </motion.div>

      <ol className="m-0 list-none p-0">
        {projects.map((p, i) => {
          const left = i % 2 === 0;
          return (
            <li
              key={p.id}
              className="relative pb-7 pl-12 last:pb-0 lg:flex lg:h-[15.5rem] lg:items-center lg:pb-0 lg:pl-0"
              style={{ contentVisibility: "auto", containIntrinsicSize: "auto 250px" }}
            >
              {/* Mobile stop on the line */}
              <span aria-hidden="true" className="absolute left-4 top-4 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-2 bg-[#222] font-mono text-[11px] font-bold lg:hidden" style={{ borderColor: ACCENT, color: ACCENT }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {/* Wide-screen stop: sits on the bend of the zigzag */}
              <motion.span
                aria-hidden="true"
                className="absolute top-1/2 z-10 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white lg:block"
                style={{ left: `${xs[i]}%`, backgroundColor: ACCENT, boxShadow: "0 0 0 6px rgba(255, 77, 0,0.22), 0 0 22px rgba(255, 77, 0,0.95)" }}
                initial={reduce ? false : { scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: false, margin: "-15% 0px" }}
                transition={{ type: "spring", stiffness: 380, damping: 16 }}
              >
                {!reduce && <span className="journey-ping absolute -inset-[3px] rounded-full border-2 border-[#ff4d00]" />}
              </motion.span>
              <JourneyCard project={p} index={i} left={left} reduce={reduce} onOpen={onOpen} />
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ---------- Browse every project, with filters ---------- */
function Browser({ list, onOpen }) {
  const [category, setCategory] = useState(PROJECT_CATEGORIES.PERSONAL);
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
            All <span className="serif-accent">projects</span>
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
                className={`relative rounded-lg px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff4d00] ${on ? "text-black" : "text-white/65 hover:text-white"}`}
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
        <ProjectJourney key={shown.map((x) => x.id).join("|")} projects={shown} onOpen={onOpen} />
      )}

      {!showAll && !filtering && matches.length > PAGE && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3 text-sm font-semibold text-white transition-colors hover:border-[#ff4d00] hover:text-[#ff4d00]"
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
