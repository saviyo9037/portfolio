// Server-side GitHub proxy (Vercel-style function; also mounted by vite.config.js
// for `npm run dev` / `npm run preview`).
//
// The optional GITHUB_TOKEN is read from process.env here and never sent to the
// browser. It is not prefixed VITE_ / NEXT_PUBLIC_, so bundlers will not expose it.
import { GITHUB } from "../src/config/github.js";
import { fetchRepos, buildProjects, GithubError } from "../src/lib/github.js";

const TTL_MS = GITHUB.cacheMinutes * 60 * 1000;
const CDN_CACHE = "public, s-maxage=1800, stale-while-revalidate=86400";

let cache = null; // { at, payload } - survives between requests on a warm instance

function send(res, status, body, headers = {}) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  for (const [key, value] of Object.entries(headers)) res.setHeader(key, value);
  res.end(JSON.stringify(body));
}

export default async function handler(req, res) {
  if (req.method && req.method !== "GET") {
    return send(res, 405, { error: "method_not_allowed" }, { Allow: "GET" });
  }

  if (cache && Date.now() - cache.at < TTL_MS) {
    return send(res, 200, { ...cache.payload, cached: true }, { "Cache-Control": CDN_CACHE });
  }

  try {
    const token = process.env.GITHUB_TOKEN || undefined;
    const includePrivate = process.env.GITHUB_INCLUDE_PRIVATE === "true";
    const repos = await fetchRepos({ username: GITHUB.username, token, includePrivate });
    const { projects } = buildProjects({ repos, config: GITHUB });
    cache = { at: Date.now(), payload: { projects, fetchedAt: new Date().toISOString() } };
    return send(res, 200, cache.payload, { "Cache-Control": CDN_CACHE });
  } catch (err) {
    // Prefer slightly old data over an error page.
    if (cache) {
      return send(res, 200, { ...cache.payload, stale: true }, { "Cache-Control": "no-store" });
    }
    if (err instanceof GithubError && err.rateLimited) {
      return send(
        res,
        503,
        { error: "rate_limited", retryAfter: err.retryAfter },
        { "Cache-Control": "no-store", ...(err.retryAfter ? { "Retry-After": String(err.retryAfter) } : {}) }
      );
    }
    return send(res, 502, { error: "github_unavailable" }, { "Cache-Control": "no-store" });
  }
}
