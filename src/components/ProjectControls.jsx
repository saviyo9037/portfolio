import React from "react";
import { FiSearch, FiX } from "react-icons/fi";

const field =
  "bg-transparent border-b border-[var(--border-subtle)] text-[var(--text-main)] placeholder:text-[var(--text-dim)] py-2 focus:border-[var(--accent)] outline-none transition-colors";

export default function ProjectControls({
  query,
  onQuery,
  language,
  onLanguage,
  languages,
  sort,
  onSort,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end gap-5 sm:gap-8 mb-10">
      <label className="relative flex-1 min-w-0">
        <span className="sr-only">Search projects by name</span>
        <FiSearch
          aria-hidden="true"
          className="absolute left-0 top-1/2 -translate-y-1/2 text-[var(--text-dim)]"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search projects"
          className={`${field} w-full pl-7 pr-8 text-base`}
        />
        {query && (
          <button
            type="button"
            onClick={() => onQuery("")}
            aria-label="Clear search"
            className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-[var(--text-dim)] hover:text-[var(--text-main)]"
          >
            <FiX />
          </button>
        )}
      </label>

      <label className="flex flex-col gap-1 sm:w-48">
        <span className="text-sm text-[var(--text-dim)]">Language</span>
        <select
          value={language}
          onChange={(e) => onLanguage(e.target.value)}
          className={`${field} text-base`}
        >
          <option value="" className="bg-[var(--bg-surface)]">
            All languages
          </option>
          {languages.map((l) => (
            <option key={l} value={l} className="bg-[var(--bg-surface)]">
              {l}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1 sm:w-48">
        <span className="text-sm text-[var(--text-dim)]">Sort by</span>
        <select
          value={sort}
          onChange={(e) => onSort(e.target.value)}
          className={`${field} text-base`}
        >
          <option value="updated" className="bg-[var(--bg-surface)]">
            Recently updated
          </option>
          <option value="name" className="bg-[var(--bg-surface)]">
            Name, A to Z
          </option>
        </select>
      </label>
    </div>
  );
}
