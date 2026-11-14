// Works out where each technology is actually used. Nothing here rates a skill:
// a technology that appears in no job, project or repository simply gets no
// evidence line.

const norm = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9]/g, "");

// "nextjs15" counts as "nextjs"; "java" must not count as "javascript".
const sameName = (value, alias) => new RegExp(`^${alias}\\d*$`).test(value);

function projectMatches(tech, project) {
  const names = [
    project.language,
    ...(project.tags ?? []),
    ...String(project.tech || "").split(","),
  ]
    .map(norm)
    .filter(Boolean);
  if (tech.match?.some((alias) => names.some((n) => sameName(n, norm(alias))))) return true;

  const description = String(project.description || "").toLowerCase();
  if (tech.keywords?.some((k) => description.includes(k.toLowerCase()))) return true;

  const links = `${project.liveUrl ?? ""} ${project.githubUrl ?? ""}`.toLowerCase();
  return Boolean(tech.urlHints?.some((h) => links.includes(h.toLowerCase())));
}

/**
 * @param technologies  the TECHNOLOGIES map
 * @param experience    entries from data/experience.js
 * @param projects      merged manual + GitHub projects
 * @returns { [techId]: { work: string[], projects: string[] } }
 */
export function buildEvidence({ technologies, experience, projects }) {
  const jobs = experience.filter((e) => e.type === "work");
  const evidence = {};

  for (const [id, tech] of Object.entries(technologies)) {
    const aliases = (tech.match ?? []).map(norm);
    const work = jobs
      .filter((job) =>
        (job.skills ?? []).some((s) => aliases.some((a) => sameName(norm(s), a)))
      )
      .map((job) => job.company);
    const used = projects.filter((p) => projectMatches(tech, p)).map((p) => p.title);
    evidence[id] = { work, projects: used };
  }
  return evidence;
}

/** Main-language counts across GitHub repositories, most common first. */
export function languageCounts(githubProjects) {
  const counts = new Map();
  for (const p of githubProjects ?? []) {
    if (p.language) counts.set(p.language, (counts.get(p.language) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([language, count]) => ({ language, count }))
    .sort((a, b) => b.count - a.count || a.language.localeCompare(b.language));
}
