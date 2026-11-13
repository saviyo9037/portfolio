import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { experience } from "../data/experience";

const ACCENT = "#ff8a1f";

const jobs = experience.filter((item) => item.type === "work");

export default function Experiences() {
  const reduce = useReducedMotion();
  return (
    <section className="mx-auto w-full max-w-[1680px] px-5 py-20 md:px-8 md:py-32">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Sticky intro */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="m-0 text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>
              Experience
            </p>
            <h2
              className="mb-0 mt-4 text-4xl font-black leading-[1.05] tracking-tight text-[var(--text-main)] md:text-5xl"
              style={{ fontFamily: "'Inter', sans-serif", textTransform: "none" }}
            >
              Where I
              <br />
              have worked<span style={{ color: ACCENT }}>.</span>
            </h2>
            <p className="mb-0 mt-6 max-w-[34ch] text-[var(--text-muted)]">
              {jobs.length} roles building enterprise software, from internships to a full-time role.
            </p>
          </div>
        </aside>

        {/* Roles */}
        <ol className="m-0 list-none p-0 lg:col-span-8">
          {jobs.map((job) => (
            <motion.li
              key={`${job.company}-${job.period}`}
              initial={reduce ? false : { opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-6 border-t border-[var(--border-subtle)] py-12 first:border-t-0 first:pt-0 md:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] md:gap-10"
            >
              <div className="text-sm text-[var(--text-dim)]">
                <p className="m-0 font-mono">{job.period}</p>
                <p className="m-0 mt-1">{job.location}</p>
                {job.current && (
                  <p className="m-0 mt-3 inline-flex items-center gap-2 font-semibold text-[var(--text-main)]">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ACCENT }} aria-hidden="true" />
                    Current role
                  </p>
                )}
              </div>

              <div>
                <h3
                  className="m-0 text-2xl font-bold leading-snug text-[var(--text-main)] md:text-3xl"
                  style={{ fontFamily: "'Inter', sans-serif", textTransform: "none" }}
                >
                  {job.role}
                </h3>
                <p className="m-0 mt-1 font-semibold" style={{ color: ACCENT }}>
                  {job.company}
                  {job.employmentType ? ` · ${job.employmentType}` : ""}
                </p>

                {job.description && (
                  <p className="mb-0 mt-5 max-w-[66ch] leading-relaxed text-[var(--text-muted)]">{job.description}</p>
                )}

                {job.highlights?.length > 0 && (
                  <ul className="m-0 mt-5 list-none space-y-2.5 p-0">
                    {job.highlights.map((item) => (
                      <li key={item} className="flex gap-3 text-[var(--text-main)]">
                        <span className="mt-2.5 h-px w-4 shrink-0 bg-[var(--text-dim)]" aria-hidden="true" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {job.skills?.length > 0 && (
                  <p className="mb-0 mt-6 font-mono text-xs leading-loose text-[var(--text-dim)]">
                    {job.skills.join("  /  ")}
                  </p>
                )}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
