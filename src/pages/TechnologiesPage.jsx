import React, { useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import { TECHNOLOGIES, TECH_CATEGORIES } from "../data/technologies";
import { experience } from "../data/experience";
import { projects as manualProjects } from "../data/projects";
import { useGithubProjects } from "../hooks/useGithubProjects";
import { mergeProjects } from "../lib/mergeProjects";
import { buildEvidence, languageCounts } from "../lib/techEvidence";
import { FALLBACK_ICON, MONO_COLOR, TECH_ICONS } from "../components/tech/techIcons";

const ACCENT = "#7DD3FC";
const EASE = [0.16, 1, 0.3, 1];
const focusRing = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7DD3FC]";

const iconOf = (tech) => {
  const { Icon, color } = TECH_ICONS[tech.icon] ?? FALLBACK_ICON;
  return { Icon, color: color ?? MONO_COLOR };
};

// ---------- one technology as a block inside a family card: logo, name, uses, and where it was used ----------
function Block({ tech, evidence, index, reduce }) {
  const { Icon, color } = iconOf(tech);
  const work = evidence?.work ?? [];
  const projects = evidence?.projects ?? [];
  const uses = work.length + projects.length;
  const shown = projects.slice(0, 3).join(", ");
  const more = projects.length - 3;
  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.5, delay: Math.min(index, 8) * 0.05, ease: EASE }}
      className="list-none"
    >
      <div className="group h-full rounded-2xl border border-white/12 bg-black/50 p-3.5 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-[#7DD3FC]/60">
        <div className="flex items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-black text-2xl transition-transform duration-300 group-hover:scale-110" style={{ color }}>
            <Icon aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="m-0 truncate text-base font-semibold text-white">{tech.name}</p>
            <p className="m-0 font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: tech.status === "learning" ? ACCENT : "rgba(255,255,255,0.5)" }}>
              {tech.status === "learning" ? "learning" : `${uses} ${uses === 1 ? "use" : "uses"}`}
            </p>
          </div>
        </div>
        <p className="m-0 mt-3 line-clamp-3 text-[13px] leading-snug text-white/60">
          {work.length > 0 && (
            <>
              <span style={{ color: ACCENT }}>At work</span> {work.join(", ")}
              <br />
            </>
          )}
          {projects.length > 0 ? (
            <>
              <span style={{ color: ACCENT }}>{projects.length === 1 ? "1 project" : `${projects.length} projects`}</span> {shown}
              {more > 0 ? ` and ${more} more` : ""}
            </>
          ) : (
            work.length === 0 && "No recorded project yet"
          )}
        </p>
      </div>
    </motion.li>
  );
}

// ---------- a family: a big card that sticks while the next one slides up over it, shrinking and dimming as it is covered ----------
function FamilyCard({ family, index, total, evidence, reduce }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.92]);
  const shade = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 0.6]);
  const ids = family.items.filter((id) => TECHNOLOGIES[id]);

  return (
    <section ref={ref} aria-labelledby={`fam-${family.id}`} className="[@media(min-width:768px)_and_(min-height:780px)]:sticky" style={{ top: `${6 + index * 0.75}rem`, zIndex: index + 1 }}>
      <motion.div style={{ scale, transformOrigin: "50% 0" }} className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-[#0B0B0B] p-5 md:p-8">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-2 -top-6 select-none text-[9rem] font-black leading-none md:text-[14rem]"
          style={{ fontFamily: "'Inter', sans-serif", color: "transparent", WebkitTextStroke: "1.5px rgba(125,211,252,0.28)", letterSpacing: "-0.06em" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="relative">
          <p className="m-0 font-mono text-xs uppercase tracking-[0.3em]" style={{ color: ACCENT }}>
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} · {ids.length} tools
          </p>
          <h2 id={`fam-${family.id}`} className="m-0 mt-2 text-4xl font-extrabold leading-none text-white md:text-6xl" style={{ fontFamily: "'Inter', sans-serif", textTransform: "none", letterSpacing: "-0.04em" }}>
            {family.title}
          </h2>
          <p className="mb-0 mt-3 max-w-[52ch] text-base text-white/60">{family.description}</p>
          <ul className="m-0 mt-6 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {ids.map((id, i) => (
              <Block key={id} tech={TECHNOLOGIES[id]} evidence={evidence[id]} index={i} reduce={reduce} />
            ))}
          </ul>
        </div>
        <motion.span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black" style={{ opacity: shade }} />
      </motion.div>
    </section>
  );
}

// ---------- the main language of each public repository, as bars that fill in ----------
function Languages({ languages, status, error, reduce }) {
  const total = languages.reduce((sum, l) => sum + l.count, 0);
  const top = languages[0]?.count ?? 1;
  return (
    <section aria-labelledby="gh-languages-title" className="">
      <h2 id="gh-languages-title" className="m-0 text-base font-bold text-white" style={{ fontFamily: "inherit", textTransform: "none", letterSpacing: "normal" }}>
        Languages across my GitHub repositories
      </h2>
      <p className="mb-5 mt-1 text-xs text-white/45">Counted from each public project's main language. It shows what I have written, not how well I know it.</p>
      <div aria-live="polite">
        {status === "loading" && <p className="m-0 text-sm text-white/55">Loading GitHub data…</p>}
        {status === "error" && <p className="m-0 text-sm text-white/55">{error?.rateLimited ? "GitHub's request limit was reached, so this is unavailable right now." : "Couldn't load GitHub data, so this is unavailable right now."}</p>}
        {status === "ready" && total === 0 && <p className="m-0 text-sm text-white/55">No repositories to count yet.</p>}
        {total > 0 && (
          <ul className="m-0 grid list-none gap-3 p-0">
            {languages.map((l, i) => (
              <li key={l.language} className="grid grid-cols-[7rem_minmax(0,1fr)_2rem] items-center gap-3 text-sm sm:grid-cols-[9rem_minmax(0,1fr)_2.5rem]">
                <span className="truncate text-white">{l.language}</span>
                <span className="h-2.5 overflow-hidden rounded-sm bg-white/10" aria-hidden="true">
                  <motion.span
                    className="block h-full origin-left"
                    style={{ backgroundColor: ACCENT, opacity: Math.max(0.35, 1 - i * 0.12), width: `${(l.count / top) * 100}%` }}
                    initial={reduce ? false : { scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: false, margin: "-5% 0px" }}
                    transition={{ duration: 0.9, delay: i * 0.06, ease: EASE }}
                  />
                </span>
                <span className="text-right text-white/60">{l.count}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default function TechnologiesPage() {
  const reduce = useReducedMotion();
  const { projects: githubProjects, status, error } = useGithubProjects();

  useEffect(() => {
    const previous = document.title;
    document.title = "Technologies & Skills | Saviyo George";
    return () => {
      document.title = previous;
    };
  }, []);

  const allProjects = useMemo(() => mergeProjects(manualProjects, githubProjects ?? []), [githubProjects]);
  const evidence = useMemo(() => buildEvidence({ technologies: TECHNOLOGIES, experience, projects: allProjects }), [allProjects]);
  const languages = useMemo(() => languageCounts(githubProjects), [githubProjects]);
  const everyId = useMemo(() => [...new Set(TECH_CATEGORIES.flatMap((c) => c.items))], []);
  const projectCount = new Set(everyId.flatMap((id) => evidence[id]?.projects ?? [])).size;

  return (
    <div className="relative min-h-dvh text-[var(--text-main)]">
      <main className="mx-auto w-full max-w-[1240px] px-5 pb-24 pt-32 md:px-8 md:pt-40">
        <Link to="/" className={`mb-10 inline-flex items-center gap-2 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text-main)] ${focusRing}`}>
          <FiArrowLeft aria-hidden="true" /> Back to portfolio
        </Link>

        <header>
          <p className="m-0 text-xs font-semibold uppercase tracking-[0.4em]" style={{ color: ACCENT }}>
            Scroll through the stack
          </p>
          <h1 className="m-0 mt-4 text-5xl font-extrabold leading-[1.02] text-white md:text-7xl" style={{ fontFamily: "'Inter', sans-serif", textTransform: "none", letterSpacing: "-0.04em" }}>
            <span className="inline-block overflow-hidden pb-[0.1em] align-bottom">
              <motion.span className="inline-block" initial={reduce ? false : { y: "110%" }} animate={{ y: "0%" }} transition={{ duration: 0.9, ease: EASE }}>
                Technologies &amp;
              </motion.span>
            </span>{" "}
            <span className="inline-block overflow-hidden pb-[0.1em] align-bottom">
              <motion.span className="serif-accent inline-block" style={{ color: ACCENT }} initial={reduce ? false : { y: "110%" }} animate={{ y: "0%" }} transition={{ duration: 0.9, delay: 0.1, ease: EASE }}>
                Skills
              </motion.span>
            </span>
          </h1>
          <p className="mb-0 mt-5 max-w-[58ch] text-lg leading-relaxed text-[var(--text-muted)]">
            One card for each family of tools. Next to every tool is where I used it, in a job or a project, instead of a rating. {everyId.length} tools, {TECH_CATEGORIES.length} families, {projectCount} projects.
          </p>
        </header>

        <div className="mt-14 flex flex-col gap-6 md:gap-[14vh]">
          {TECH_CATEGORIES.map((family, i) => (
            <FamilyCard key={family.id} family={family} index={i} total={TECH_CATEGORIES.length} evidence={evidence} reduce={reduce} />
          ))}
        </div>

        <div className="mt-24">
          <div className="rounded-[2rem] border border-white/15 bg-[#0B0B0B]/90 p-6 md:p-8">
            <Languages languages={languages} status={status} error={error} reduce={reduce} />
          </div>
        </div>

        <p className="mb-0 mt-10 max-w-[62ch] text-sm leading-relaxed text-[var(--text-dim)]">
          Evidence comes from my work experience, my projects and the main language of my public GitHub repositories. A technology marked "learning" is one I list but have no project for yet.
        </p>
      </main>
    </div>
  );
}
