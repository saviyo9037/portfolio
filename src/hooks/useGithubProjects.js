import { useCallback, useEffect, useRef, useState } from "react";
import { GITHUB } from "../config/github";
import { fetchRepos, buildProjects } from "../lib/github";

const CACHE_KEY = "portfolio:github-projects:v6";
const TTL_MS = GITHUB.cacheMinutes * 60 * 1000;

function readCache() {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY));
    return Array.isArray(cached?.projects) ? cached : null;
  } catch {
    return null;
  }
}

function writeCache(projects) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), projects }));
  } catch {
    /* storage unavailable (private mode, quota): the page still works */
  }
}

// 1) Our own /api/github-projects (server-side, can use a token).
async function loadFromApi(signal) {
  const res = await fetch("/api/github-projects", {
    signal,
    headers: { Accept: "application/json" },
  });
  // A static host answers unknown paths with index.html, so check the type.
  if (!(res.headers.get("content-type") || "").includes("json")) {
    throw new Error("api-unavailable");
  }
  const body = await res.json();
  if (!res.ok) {
    throw Object.assign(new Error(body.error || "api-error"), {
      rateLimited: body.error === "rate_limited",
      retryAfter: body.retryAfter ?? null,
    });
  }
  return body.projects;
}

// 2) Fallback: public repos straight from GitHub, no token involved.
async function loadDirect(signal) {
  const repos = await fetchRepos({ username: GITHUB.username, signal });
  return buildProjects({ repos, config: GITHUB }).projects;
}

/**
 * Returns { projects, status, error, retry }.
 * status: "loading" | "ready" | "error". Cached data is shown immediately and
 * refreshed in the background once it is older than GITHUB.cacheMinutes.
 */
export function useGithubProjects() {
  const [state, setState] = useState(() => {
    const cached = readCache();
    return {
      projects: cached?.projects ?? null,
      status: cached ? "ready" : "loading",
      error: null,
    };
  });
  const abortRef = useRef(null);

  const load = useCallback(async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      let projects;
      try {
        projects = await loadFromApi(controller.signal);
      } catch (apiError) {
        if (controller.signal.aborted) return;
        projects = await loadDirect(controller.signal).catch((directError) => {
          throw apiError.rateLimited ? apiError : directError;
        });
      }
      writeCache(projects);
      setState({ projects, status: "ready", error: null });
    } catch (error) {
      if (controller.signal.aborted) return;
      setState((prev) => ({
        projects: prev.projects, // keep showing whatever we had
        status: prev.projects ? "ready" : "error",
        error: {
          rateLimited: Boolean(error.rateLimited),
          retryAfter: error.retryAfter ?? null,
        },
      }));
    }
  }, []);

  useEffect(() => {
    const cached = readCache();
    if (!cached || Date.now() - cached.at > TTL_MS) load();
    return () => abortRef.current?.abort();
  }, [load]);

  const retry = useCallback(() => {
    setState((prev) => ({ ...prev, status: prev.projects ? "ready" : "loading", error: null }));
    load();
  }, [load]);

  return { ...state, retry };
}
