import React from "react";
import { TECH_ICONS, FALLBACK_ICON, MONO_COLOR } from "./techIcons";

const MAX_NAMES = 2;

function summarise(names) {
  const shown = names.slice(0, MAX_NAMES).join(", ");
  const more = names.length - MAX_NAMES;
  return more > 0 ? `${shown} +${more} more` : shown;
}

export default function TechCard({ tech, evidence }) {
  const { Icon, color } = TECH_ICONS[tech.icon] ?? FALLBACK_ICON;
  const work = evidence?.work ?? [];
  const projects = evidence?.projects ?? [];

  return (
    <li className="flex items-start gap-4 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4 transition-colors duration-300 hover:border-[var(--border-hover)]">
      <span
        aria-hidden="true"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[#f4f5f7] text-2xl"
        style={{ color: color ?? MONO_COLOR }}
      >
        <Icon />
      </span>

      <div className="min-w-0">
        <p className="m-0 text-base font-semibold leading-snug text-[var(--text-main)]">
          {tech.name}
          {tech.status === "learning" && (
            <span className="ml-2 rounded-full border border-[var(--border-subtle)] px-2 py-0.5 text-xs font-normal text-[var(--text-dim)]">
              Learning
            </span>
          )}
        </p>

        {(work.length > 0 || projects.length > 0) && (
          <div className="mt-1.5 space-y-0.5 text-sm leading-snug text-[var(--text-dim)]">
            {work.length > 0 && <p className="m-0">At work: {work.join(", ")}</p>}
            {projects.length > 0 && (
              <p className="m-0">
                {projects.length === 1 ? "1 project" : `${projects.length} projects`}:{" "}
                {summarise(projects)}
              </p>
            )}
          </div>
        )}
      </div>
    </li>
  );
}
