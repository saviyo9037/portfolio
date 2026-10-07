import React from "react";
import { experience } from "../data/experience";

function Experiences() {
  const workExperience = experience.filter((item) => item.type === "work");

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="container-custom relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-baseline gap-4 mb-8 md:mb-12 border-b border-[var(--border-subtle)] pb-4">
          <span className="section-label">[02]</span>
          <h2 className="font-['Anton'] text-5xl md:text-7xl lg:text-8xl uppercase tracking-tight">
            <span className="text-amber-500" style={{ textShadow: "0 0 20px rgba(245,158,11,0.4)" }}>CHRONOLOGICAL</span>{" "}
            <span className="text-[var(--text-main)]">DISPATCH</span>
          </h2>
        </div>

        <div className="flex flex-col gap-8">
          {workExperience.map((activeExp, idx) => (
            <div key={idx} className="relative rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-xl p-6 md:p-10 shadow-xl overflow-hidden text-[var(--text-main)]">
                <div className="font-mono text-xs md:text-sm text-amber-400 font-semibold tracking-widest mb-2 flex flex-wrap items-center gap-2">
                  <span>{activeExp.period}</span>
                  <span className="opacity-40">|</span>
                  <span className="text-[var(--text-muted)]">{activeExp.location}</span>
                </div>
                <h3 className="font-['Anton'] text-4xl sm:text-5xl uppercase tracking-tight text-[var(--text-main)] mb-2">
                  {activeExp.company}
                </h3>
                <div className="font-mono text-sm md:text-base text-amber-300 font-medium mb-6">
                  {activeExp.role} {activeExp.employmentType ? `(${activeExp.employmentType})` : ""}
                </div>
                {activeExp.description && (
                  <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed mb-6 border-l-2 border-amber-400 pl-4 py-1 italic bg-[var(--badge-bg)] rounded-r-lg">
                    "{activeExp.description}"
                  </p>
                )}
                {activeExp.highlights && activeExp.highlights.length > 0 && (
                  <div className="mb-8 space-y-3">
                    {activeExp.highlights.map((item, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-3 text-sm md:text-base text-[var(--text-main)] leading-relaxed">
                        <span className="w-2 h-2 rounded-full bg-amber-400 mt-2 shrink-0 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experiences;
