import React from "react";
import { FiAward, FiCalendar, FiMapPin } from "react-icons/fi";

const ACCENT = "#ff8a1f";

export default function Education() {
  return (
    <section id="education" className="mx-auto w-full max-w-[1680px] px-5 py-14 md:px-8 md:py-20">
      <div className="mb-8">
        <p className="m-0 text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>
          Education
        </p>
        <h2
          className="mb-0 mt-3 text-2xl font-extrabold tracking-tight text-[var(--text-main)] md:text-3xl"
          style={{ fontFamily: "'Inter', sans-serif", textTransform: "none" }}
        >
          Academic Background
        </h2>
      </div>

      {/* Three panels divided by hairlines (gap-px shows the background colour through) */}
      <div className="grid gap-px overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--border-subtle)] md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-6 bg-[var(--bg-surface)] p-6 md:p-8">
          <span
            className="w-max rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-black"
            style={{ backgroundColor: ACCENT }}
          >
            Undergraduate Degree
          </span>
          <h3
            className="m-0 text-xl font-bold leading-snug text-[var(--text-main)] md:text-2xl"
            style={{ fontFamily: "'Inter', sans-serif", textTransform: "none" }}
          >
            Bachelor of Computer Applications (BCA)
          </h3>
          <ul className="m-0 flex list-none flex-col gap-2 p-0 text-sm text-[var(--text-muted)]">
            <li className="flex items-center gap-2">
              <FiAward aria-hidden="true" style={{ color: ACCENT }} /> Sree Sabareesa College
            </li>
            <li className="flex items-center gap-2">
              <FiMapPin aria-hidden="true" style={{ color: ACCENT }} /> MG University, Kerala
            </li>
          </ul>
        </div>

        <div className="flex flex-col justify-center gap-4 bg-[var(--bg-surface)] p-6 md:p-8">
          <p className="m-0 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-dim)]">
            Graduated with
          </p>
          <p
            className="m-0 text-lg font-bold text-[var(--text-main)]"
            style={{ fontFamily: "'Inter', sans-serif", textTransform: "none" }}
          >
            First Class Distinction
          </p>
          <p className="m-0 text-sm leading-relaxed text-[var(--text-muted)]">
            Software engineering, object-oriented programming, data structures, and database management systems.
          </p>
        </div>

        <div className="flex flex-row flex-wrap items-center justify-between gap-4 bg-[var(--bg-surface)] p-6 md:col-span-2 md:p-8">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-main)]">
            <FiCalendar aria-hidden="true" style={{ color: ACCENT }} /> 2021 — 2024
          </span>
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
            <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" /> Verified
          </span>
        </div>
      </div>
    </section>
  );
}
