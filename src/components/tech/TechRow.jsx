import React from "react";
import { TECH_ICONS, FALLBACK_ICON, MONO_COLOR } from "./techIcons";

const MAX_NAMES = 3;

function summarise(names) {
  const shown = names.slice(0, MAX_NAMES).join(", ");
  const more = names.length - MAX_NAMES;
  return more > 0 ? `${shown} and ${more} more` : shown;
}

// One technology as a list row: icon, name, and where it was actually used
export default function TechRow({ tech, evidence }) {
  const { Icon, color } = TECH_ICONS[tech.icon] ?? FALLBACK_ICON;
  const work = evidence?.work ?? [];
  const projects = evidence?.projects ?? [];
  const used = [
    work.length > 0 && `At work: ${work.join(", ")}`,
    projects.length > 0 &&
      `${projects.length === 1 ? "1 project" : `${projects.length} projects`}: ${summarise(projects)}`,
  ].filter(Boolean);

  return (
    <li className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] items-start gap-x-4 gap-y-1 border-t border-[var(--border-subtle)] py-4 transition-colors hover:bg-[var(--bg-surface)] sm:grid-cols-[auto_12rem_minmax(0,1fr)] sm:items-center sm:px-3 sm:-mx-3">
      <span
        aria-hidden="true"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f4f5f7] text-xl"
        style={{ color: color ?? MONO_COLOR }}
      >
        <Icon />
      </span>

      <p className="m-0 flex min-w-0 flex-wrap items-center gap-2 font-semibold text-[var(--text-main)]">
        {tech.name}
        {tech.status === "learning" && (
          <span className="rounded-full border border-[var(--border-subtle)] px-2 py-0.5 text-[11px] font-normal text-[var(--text-dim)]">
            Learning
          </span>
        )}
      </p>

      <p className="col-start-2 m-0 min-w-0 break-words text-sm leading-relaxed text-[var(--text-dim)] sm:col-start-auto">
        {used.length > 0 ? used.join(" · ") : "No recorded project yet"}
      </p>
    </li>
  );
}
