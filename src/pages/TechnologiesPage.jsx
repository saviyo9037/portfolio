import React, { useEffect, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import Navbar from "../components/Navbar";
import TechCard from "../components/tech/TechCard";
import { TECHNOLOGIES, TECH_CATEGORIES } from "../data/technologies";
import { experience } from "../data/experience";
import { projects as manualProjects } from "../data/projects";
import { useGithubProjects } from "../hooks/useGithubProjects";
import { mergeProjects } from "../lib/mergeProjects";
import { buildEvidence, languageCounts } from "../lib/techEvidence";
import { scrollToId } from "../lib/scroll";

export default function TechnologiesPage() {
  const reduceMotion = useReducedMotion();
  const { projects: githubProjects, status, error } = useGithubProjects();

  useEffect(() => {
    const previous = document.title;
    document.title = "Technologies & Skills | Saviyo George";
    return () => {
      document.title = previous;
    };
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
    <div className="relative min-h-dvh bg-transparent text-[var(--text-main)]">
      <Navbar />

      <main className="mx-auto w-full max-w-[1680px] px-4 pb-24 pt-32 md:px-8 md:pt-40">
        <Link
          to="/"
          className="mb-10 inline-flex items-center gap-2 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text-main)]"
        >
          <FiArrowLeft aria-hidden="true" />
          Back to portfolio
        </Link>

        <header className="mb-12 md:mb-16">
          <h1 className="m-0 font-['Anton'] text-6xl uppercase leading-none tracking-tight text-[var(--text-main)] md:text-8xl">
            Technologies &amp; Skills
          </h1>
          <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-[var(--text-muted)]">
            The tools I build with, grouped by what they do. Each card shows where I have used
            the technology, in a job or in a project, rather than a rating.
          </p>

          <nav aria-label="Skill categories" className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {TECH_CATEGORIES.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId(c.id, { offset: -100 });
                }}
                className="border-b border-[var(--border-subtle)] pb-1 text-sm text-[var(--text-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--text-main)]"
              >
                {c.title}
              </a>
            ))}
          </nav>
        </header>

        <GithubLanguages languages={languages} status={status} error={error} />

        <div className="space-y-16 md:space-y-24">
          {TECH_CATEGORIES.map((category) => (
            <motion.section
              key={category.id}
              id={category.id}
              aria-labelledby={`${category.id}-title`}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
            >
              <div className="mb-6 border-b border-[var(--border-subtle)] pb-4">
                <h2
                  id={`${category.id}-title`}
                  className="m-0 font-['Anton'] text-3xl uppercase tracking-tight text-[var(--text-main)] md:text-4xl"
                >
                  {category.title}
                </h2>
                <p className="mb-0 mt-2 text-[var(--text-muted)]">{category.description}</p>
              </div>

              <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {category.items.map((id) => (
                  <TechCard key={id} tech={TECHNOLOGIES[id]} evidence={evidence[id]} />
                ))}
              </ul>
            </motion.section>
          ))}
        </div>

        <p className="mb-0 mt-20 max-w-[62ch] text-sm leading-relaxed text-[var(--text-dim)]">
          Evidence comes from my work experience, my projects and the main language and topics
          of my public GitHub repositories. A technology without a line under it is one I list
          but do not have a recorded project for yet.
        </p>
      </main>
    </div>
  );
}

function GithubLanguages({ languages, status, error }) {
  return (
    <section aria-labelledby="gh-languages-title" className="mb-16 md:mb-20">
      <h2
        id="gh-languages-title"
        className="m-0 text-lg font-semibold text-[var(--text-main)]"
        style={{ fontFamily: "'Inter', sans-serif", textTransform: "none", letterSpacing: "normal", lineHeight: 1.4 }}
      >
        Languages across my GitHub repositories
      </h2>
      <p className="mb-5 mt-1 max-w-[62ch] text-sm text-[var(--text-dim)]">
        Counted from the main language of each public project. Appearing here shows what I have
        written, not how well I know it.
      </p>

      <div aria-live="polite">
        {status === "loading" && (
          <p className="m-0 inline-flex items-center gap-2 text-sm text-[var(--text-dim)]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--accent)]" />
            Loading GitHub data
          </p>
        )}
        {status === "error" && (
          <p className="m-0 text-sm text-[var(--text-dim)]">
            {error?.rateLimited
              ? "GitHub's request limit was reached, so this list is unavailable right now."
              : "Couldn't load GitHub data, so this list is unavailable right now."}
          </p>
        )}
        {status === "ready" && languages.length === 0 && (
          <p className="m-0 text-sm text-[var(--text-dim)]">No repositories to count yet.</p>
        )}
        {languages.length > 0 && (
          <ul className="m-0 flex list-none flex-wrap gap-3 p-0">
            {languages.map(({ language, count }) => (
              <li
                key={language}
                className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-4 py-1.5 text-sm text-[var(--text-main)]"
              >
                {language} <span className="text-[var(--text-dim)]">{count}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
