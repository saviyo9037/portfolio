import { GITHUB } from "../config/github";
import { SCREENSHOTS } from "../data/screenshots";
import { PROJECT_DESCRIPTIONS } from "../data/projectDescriptions";

const KNOWN_LANGUAGES = ["TypeScript", "JavaScript", "Python", "Dart", "PHP", "Java", "Go"];
const FALLBACK_GRADIENTS = [
  "from-indigo-500 to-purple-600",
  "from-sky-500 to-cyan-600",
  "from-emerald-500 to-teal-600",
  "from-rose-500 to-pink-600",
  "from-amber-500 to-orange-600",
];

const slug = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9]/g, "");
const hostPath = (u) => (u ? u.replace(/^https?:\/\//, "").replace(/\/+$/, "").toLowerCase() : "");

function repoFromUrl(url) {
  const m = /github\.com\/([^/]+)\/([^/#?]+)/i.exec(url || "");
  return m && m[1].toLowerCase() === GITHUB.username.toLowerCase() ? m[2].replace(/\.git$/, "") : null;
}

const isD3Repo = (repo) =>
  (GITHUB.d3innovatives || []).some((name) => name.toLowerCase() === String(repo).toLowerCase());

const isFeaturedRepo = (repo) =>
  GITHUB.featured.some((name) => name.toLowerCase() === String(repo).toLowerCase());

// Hand-written projects list a stack, not a language: pick the first known one.
function inferLanguage(project) {
  const found = KNOWN_LANGUAGES.find((l) => project.tech?.includes(l));
  if (found) return found;
  return /React|Next|Node|Express/.test(project.tech || "") ? "JavaScript" : null;
}

/** Which GitHub project (if any) is the same thing as this manual entry? */
function findMatch(manual, githubProjects) {
  const explicit = manual.repo?.toLowerCase();
  const urlRepo = (repoFromUrl(manual.githubUrl) || repoFromUrl(manual.liveUrl))?.toLowerCase();
  return githubProjects.find((g) => {
    const name = g.repo.toLowerCase();
    if (explicit && name === explicit) return true;
    if (urlRepo && name === urlRepo) return true;
    if (manual.liveUrl && g.liveUrl && hostPath(manual.liveUrl) === hostPath(g.liveUrl)) return true;
    return slug(g.repo) === slug(manual.id) || slug(g.repo) === slug(manual.title);
  });
}

/** A usable demo link: a live URL that is not just the GitHub repo again. */
export const demoUrl = (p) => (p.liveUrl && !/github\.com/i.test(p.liveUrl) ? p.liveUrl : null);
export const repoUrl = (p) =>
  p.githubUrl || (p.liveUrl && /github\.com/i.test(p.liveUrl) ? p.liveUrl : null);

/**
 * Hand-written projects stay as they are. GitHub data refreshes the ones that
 * match a repo (date, language, links) and adds every repo that has no manual
 * entry, so new repositories appear without touching the code.
 */
export function mergeProjects(manualProjects, allGithubProjects = []) {
  // Hidden repos are dropped here too, so an older cached or server copy of the list cannot bring them back
  const githubProjects = allGithubProjects.filter(
    (g) => {
      const repo = String(g.repo).toLowerCase();
      const title = String(g.title ?? "").toLowerCase();
      const words = GITHUB.excludeMatching ?? [];
      return !GITHUB.exclude.some((n) => n.toLowerCase() === repo) && !words.some((w) => repo.includes(w.toLowerCase()) || title.includes(w.toLowerCase()));
    }
  );
  const matched = new Set();

  const fromManual = manualProjects.map((m) => {
    const g = findMatch(m, githubProjects);
    if (!g) {
      return {
        ...m,
        source: "manual",
        language: m.language || inferLanguage(m),
        updatedAt: m.updatedAt || null,
        related: [],
        featured: Boolean(m.featured),
      };
    }
    matched.add(g.repo);
    return {
      ...m,
      source: "manual+github",
      repo: g.repo,
      language: g.language || inferLanguage(m),
      updatedAt: g.updatedAt,
      githubUrl: m.githubUrl || g.githubUrl,
      liveUrl: m.liveUrl || g.liveUrl,
      related: g.related,
      featured: Boolean(m.featured) || isFeaturedRepo(g.repo),
    };
  });

  const fromGithub = githubProjects
    .filter((g) => !matched.has(g.repo))
    .map((g, i) => ({
      ...g,
      id: `gh-${g.repo}`,
      source: "github",
      category: isD3Repo(g.repo) ? "company" : "personal",
      categoryLabel: isD3Repo(g.repo) ? "Company Work" : "Personal Project",
      company: isD3Repo(g.repo) ? "D3innovatives" : null,
      type: g.language ? `${g.language} project` : "GitHub project",
      description: g.description || PROJECT_DESCRIPTIONS[g.repo] || `${g.language || "Code"} project on GitHub.`,
      tech: g.tags.join(", "),
      cta: (g.hideLinks || g.private) ? "Private Project" : (g.liveUrl ? "Live Demo" : "GitHub"),
      image: "",
      // Generated cover per repo (public/covers); the gradient is the fallback if a cover is missing.
      previewImage: g.private
        ? ""
        : SCREENSHOTS.has(g.repo.toLowerCase())
          ? `/shots/${g.repo.toLowerCase()}.webp`
          : `/covers/gh-${g.repo.toLowerCase()}.svg`,
      gradient: FALLBACK_GRADIENTS[i % FALLBACK_GRADIENTS.length],
      featured: isFeaturedRepo(g.repo),
    }));

  return [...fromManual, ...fromGithub];
}

export function languagesOf(projects) {
  return [...new Set(projects.map((p) => p.language).filter(Boolean))].sort();
}

/** Search by name, filter by language, sort. Undated (manual) items go last. */
export function applyControls(projects, { query = "", language = "", sort = "updated" }) {
  const q = query.trim().toLowerCase();
  const list = projects.filter(
    (p) =>
      (!language || p.language === language) &&
      (!q || p.title.toLowerCase().includes(q) || p.repo?.toLowerCase().includes(q))
  );
  const time = (p) => {
    if (p.updatedAt) return new Date(p.updatedAt).getTime();
    const y = GITHUB.years?.[String(p.id ?? "").replace(/^gh-/, "").toLowerCase()] || 2026;
    return new Date(y, 11, 31).getTime();
  };
  return sort === "name"
    ? list.sort((a, b) => a.title.localeCompare(b.title))
    : list.sort((a, b) => time(b) - time(a));
}
