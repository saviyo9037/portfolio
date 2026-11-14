import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import TechRow from "../components/tech/TechRow";
import { TECHNOLOGIES, TECH_CATEGORIES } from "../data/technologies";
import { experience } from "../data/experience";
import { projects as manualProjects } from "../data/projects";
import { useGithubProjects } from "../hooks/useGithubProjects";
import { mergeProjects } from "../lib/mergeProjects";
import { buildEvidence, languageCounts } from "../lib/techEvidence";
import { scrollToId } from "../lib/scroll";

const ACCENT = "#ff4d00";
const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff4d00]";

export default function TechnologiesPage() {
  const { projects: githubProjects, status, error } = useGithubProjects();
  const [active, setActive] = useState(TECH_CATEGORIES[0].id);

  useEffect(() => {
    const previous = document.title;
    document.title = "Technologies & Skills | Saviyo George";
    return () => {
      document.title = previous;
    };
  }, []);

  // Highlight the category currently in view
  useEffect(() => {
    const observers = TECH_CATEGORIES.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const o = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-20% 0px -65% 0px" }
      );
      o.observe(el);
      return o;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const allProjects = useMemo(
    () => mergeProjects(manualProjects, githubProjects ?? []),
    [githubProjects]
  );
  const evidence = useMemo(
    () => buildEvidence({ technologies: TECHNOLOGIES, experience, projects: allProjects }),
    [allProjects]
  );
  const languages = useMemo(() => languageCounts(githubProjects), [githubProjects]);

  return (
    <div className="relative min-h-dvh text-[var(--text-main)]">
      <main className="mx-auto w-full max-w-[1240px] px-5 pb-24 pt-32 md:px-8 md:pt-40">
        <Link
          to="/"
          className={`mb-10 inline-flex items-center gap-2 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text-main)] ${focusRing}`}
        >
          <FiArrowLeft aria-hidden="true" /> Back to portfolio
        </Link>

        <header className="max-w-[60ch]">
          <h1
            className="m-0 text-5xl font-extrabold leading-tight text-[var(--text-main)] md:text-7xl"
            style={{ fontFamily: "'Inter', sans-serif", textTransform: "none", letterSpacing: "-0.03em" }}
          >
            Technologies &amp; Skills
          </h1>
          <p className="mb-0 mt-5 text-lg leading-relaxed text-[var(--text-muted)]">
            The tools I build with. Next to each one is where I have used it, in a job or a project, instead of a
            rating.
          </p>
        </header>

        <LanguageBar languages={languages} status={status} error={error} />

        <div className="mt-16 grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
          {/* Category index */}
          <nav aria-label="Skill categories" className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <ul className="m-0 flex list-none gap-2 overflow-x-auto p-0 pb-2 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
              {TECH_CATEGORIES.map((c) => {
                const on = active === c.id;
                return (
                  <li key={c.id} className="shrink-0">
                    <a
                      href={`#${c.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToId(c.id, { offset: -100 });
                      }}
                      aria-current={on ? "true" : undefined}
                      className={`flex items-center justify-between gap-3 whitespace-nowrap rounded-lg lg:whitespace-normal px-3 py-2 text-sm font-semibold transition-colors ${focusRing} ${
                        on
                          ? "bg-[#ff4d00]/10 text-[#ff4d00]"
                          : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                      }`}
                    >
                      {c.title}
                      <span className="text-xs font-normal opacity-70">{c.items.length}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Categories as lists */}
          <div className="flex min-w-0 flex-col gap-16">
            {TECH_CATEGORIES.map((category) => (
              <section key={category.id} id={category.id} aria-labelledby={`${category.id}-title`}>
                <h2
                  id={`${category.id}-title`}
                  className="m-0 text-3xl font-bold text-[var(--text-main)]"
                  style={{ fontFamily: "'Inter', sans-serif", textTransform: "none", letterSpacing: "-0.01em" }}
                >
                  {category.title}
                </h2>
                <p className="mb-5 mt-2 text-[var(--text-muted)]">{category.description}</p>
                <ul className="m-0 list-none border-b border-[var(--border-subtle)] p-0">
                  {category.items.map((id) => (
                    <TechRow key={id} tech={TECHNOLOGIES[id]} evidence={evidence[id]} />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>

        <p className="mb-0 mt-20 max-w-[62ch] text-sm leading-relaxed text-[var(--text-dim)]">
          Evidence comes from my work experience, my projects and the main language of my public GitHub repositories.
          A row marked "No recorded project yet" is something I list but have no project for yet.
        </p>
      </main>
    </div>
  );
}

// Main language of each public repository, as one proportional bar
function LanguageBar({ languages, status, error }) {
  const total = languages.reduce((sum, l) => sum + l.count, 0);

  return (
    <section aria-labelledby="gh-languages-title" className="mt-14 max-w-[900px]">
      <h2
        id="gh-languages-title"
        className="m-0 text-sm font-bold text-[var(--text-main)]"
        style={{ fontFamily: "'Inter', sans-serif", textTransform: "none", letterSpacing: "normal" }}
      >
        Languages across my GitHub repositories
      </h2>
      <p className="mb-4 mt-1 text-sm text-[var(--text-dim)]">
        Counted from each public project's main language. It shows what I have written, not how well I know it.
      </p>

      <div aria-live="polite">
        {status === "loading" && <p className="m-0 text-sm text-[var(--text-dim)]">Loading GitHub data…</p>}
        {status === "error" && (
          <p className="m-0 text-sm text-[var(--text-dim)]">
            {error?.rateLimited
              ? "GitHub's request limit was reached, so this is unavailable right now."
              : "Couldn't load GitHub data, so this is unavailable right now."}
          </p>
        )}
        {status === "ready" && languages.length === 0 && (
          <p className="m-0 text-sm text-[var(--text-dim)]">No repositories to count yet.</p>
        )}
        {total > 0 && (
          <>
            <div className="flex h-3 w-full overflow-hidden rounded-full bg-[var(--bg-surface)]" role="img" aria-label="Share of repositories by main language">
              {languages.map((l, i) => (
                <span
                  key={l.language}
                  title={`${l.language}: ${l.count}`}
                  style={{
                    width: `${(l.count / total) * 100}%`,
                    backgroundColor: ACCENT,
                    opacity: Math.max(0.25, 1 - i * 0.18),
                    borderRight: "2px solid var(--bg-base)",
                  }}
                />
              ))}
            </div>
            <ul className="m-0 mt-4 flex list-none flex-wrap gap-x-6 gap-y-2 p-0 text-sm">
              {languages.map((l, i) => (
                <li key={l.language} className="flex items-center gap-2 text-[var(--text-muted)]">
                  <span
                    aria-hidden="true"
                    className="h-2.5 w-2.5 rounded-sm"
                    style={{ backgroundColor: ACCENT, opacity: Math.max(0.25, 1 - i * 0.18) }}
                  />
                  {l.language} <span className="text-[var(--text-dim)]">{l.count}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
