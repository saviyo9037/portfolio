// Shared GitHub logic. Runs in the browser (public fallback) and on the server
// (api/github-projects.js), so it must not touch the DOM or read any token
// from the client bundle.

const API = "https://api.github.com";
const SPLIT_MARKERS = ["frontend", "backend", "front", "back", "client", "server"];

export class GithubError extends Error {
  constructor(message, { status = 0, rateLimited = false, retryAfter = null } = {}) {
    super(message);
    this.name = "GithubError";
    this.status = status;
    this.rateLimited = rateLimited;
    this.retryAfter = retryAfter;
  }
}

function toError(res) {
  const remaining = res.headers.get("x-ratelimit-remaining");
  const limited =
    (res.status === 403 || res.status === 429) &&
    (remaining === "0" || res.headers.has("retry-after"));
  let retryAfter = Number(res.headers.get("retry-after")) || null;
  if (limited && !retryAfter) {
    const reset = Number(res.headers.get("x-ratelimit-reset"));
    if (reset) retryAfter = Math.max(0, reset - Math.floor(Date.now() / 1000));
  }
  return new GithubError(
    limited ? "GitHub rate limit reached" : `GitHub responded with ${res.status}`,
    { status: res.status, rateLimited: limited, retryAfter }
  );
}

/**
 * Fetch the owner's repositories. With no token only public repos are read
 * (60 requests/hour per IP). A token raises the limit; private repos are
 * only requested when includePrivate is explicitly true.
 */
export async function fetchRepos({
  username,
  token,
  includePrivate = false,
  fetchImpl = globalThis.fetch,
  signal,
}) {
  const headers = { Accept: "application/vnd.github+json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
    headers["X-GitHub-Api-Version"] = "2022-11-28";
  }

  const base =
    token && includePrivate
      ? `${API}/user/repos?affiliation=owner&visibility=all`
      : `${API}/users/${encodeURIComponent(username)}/repos?type=owner`;

  const repos = [];
  for (let page = 1; page <= 5; page += 1) {
    const res = await fetchImpl(`${base}&sort=pushed&per_page=100&page=${page}`, {
      headers,
      signal,
    });
    if (!res.ok) throw toError(res);
    const batch = await res.json();
    repos.push(...batch);
    if (batch.length < 100) break;
  }

  const owner = username.toLowerCase();
  return repos.filter((r) => r.owner?.login?.toLowerCase() === owner);
}

function cleanDescription(text) {
  if (!text) return "";
  const flat = String(text)
    .replace(/^[#>*\-\s]+/, "")
    .replace(/\s+/g, " ")
    .trim();
  return flat.length > 220 ? `${flat.slice(0, 217).trimEnd()}...` : flat;
}

function validUrl(url) {
  if (!url) return null;
  const withScheme = /^https?:\/\//i.test(url) ? url : `https://${url}`;
  try {
    return new URL(withScheme).href;
  } catch {
    return null;
  }
}

/** Returns a reason string when the repo should be hidden, or null if eligible. */
export function exclusionReason(repo, config) {
  const name = repo.name.toLowerCase();
  if (repo.fork) return "fork";
  if (repo.archived) return "archived";
  if (repo.disabled) return "disabled";
  if (name === config.username.toLowerCase()) return "profile repo";
  if (config.exclude.some((n) => n.toLowerCase() === name)) return "excluded in config";
  if (!repo.size) return "empty";
  const hasDetails =
    Boolean(cleanDescription(repo.description)) ||
    Boolean(repo.topics?.length) ||
    Boolean(validUrl(repo.homepage));
  if (!hasDetails && repo.size < config.minSizeKbWithoutDetails) return "no meaningful content";
  return null;
}

function prettyName(name) {
  const words = name.split(/[\s_.-]+/).filter(Boolean);
  // "task-management-frontend" reads better as "Task Management"
  const core = words.filter((w) => !SPLIT_MARKERS.includes(w.toLowerCase()));
  return (core.length ? core : words)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function normalizeRepo(repo) {
  const isPrivate = Boolean(repo.private);
  const tags = [...new Set([...(repo.topics ?? []), repo.language].filter(Boolean))];
  return {
    repo: repo.name,
    title: prettyName(repo.name),
    description: cleanDescription(repo.description),
    language: repo.language || null,
    tags,
    // Private repos have no public page, so they get no link.
    githubUrl: isPrivate ? null : repo.html_url,
    liveUrl: validUrl(repo.homepage),
    updatedAt: repo.pushed_at || repo.updated_at || null,
    stars: repo.stargazers_count ?? 0,
    private: isPrivate,
    related: [],
  };
}

/** "job-finder-frontend", "Job_Finder_Backend" -> "jobfinder" */
export function groupKey(name) {
  const tokens = name.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  const core = tokens.filter((t) => !SPLIT_MARKERS.includes(t));
  return (core.length ? core : tokens).join("");
}

/** Merge frontend/backend splits and near-duplicate repos into one project. */
export function collapseRelated(projects) {
  const groups = new Map();
  for (const p of projects) {
    const key = groupKey(p.repo);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(p);
  }

  return [...groups.values()].map((list) => {
    if (list.length === 1) return list[0];
    const rank = (p) =>
      (p.liveUrl ? 4 : 0) + (p.description ? 2 : 0) + (/backend|server|api/i.test(p.repo) ? -3 : 0);
    const sorted = [...list].sort(
      (a, b) => rank(b) - rank(a) || new Date(b.updatedAt) - new Date(a.updatedAt)
    );
    const [main, ...rest] = sorted;
    const newest = list.map((p) => p.updatedAt).filter(Boolean).sort().at(-1) ?? null;
    return {
      ...main,
      description: main.description || rest.find((r) => r.description)?.description || "",
      liveUrl: main.liveUrl || rest.find((r) => r.liveUrl)?.liveUrl || null,
      language: main.language || rest.find((r) => r.language)?.language || null,
      tags: [...new Set(list.flatMap((p) => p.tags))],
      updatedAt: newest,
      related: rest.filter((r) => r.githubUrl).map((r) => ({ name: r.repo, url: r.githubUrl })),
    };
  });
}

/** Raw API repos -> eligible, de-duplicated projects, newest first. */
export function buildProjects({ repos, config }) {
  const excluded = [];
  const eligible = [];
  for (const repo of repos) {
    const reason = exclusionReason(repo, config);
    if (reason) excluded.push({ name: repo.name, reason });
    else eligible.push(normalizeRepo(repo));
  }
  const projects = collapseRelated(eligible).sort(
    (a, b) => new Date(b.updatedAt ?? 0) - new Date(a.updatedAt ?? 0)
  );
  return { projects, excluded };
}
