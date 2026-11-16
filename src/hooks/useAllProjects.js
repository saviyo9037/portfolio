import { useMemo } from "react";
import { projects as manualProjects, PROJECT_CATEGORIES } from "../data/projects";
import { useGithubProjects } from "./useGithubProjects";
import { mergeProjects } from "../lib/mergeProjects";
import { GITHUB } from "../config/github";

// D3innovatives work first, then other company work, then personal. Featured first inside each group.
const rank = (p) => {
  if (p.category !== PROJECT_CATEGORIES.COMPANY) return 3;
  if (/d3innovatives/i.test(p.company || "")) return 0;
  return /irohub/i.test(p.company || "") ? 2 : 1;
};

export function useAllProjects() {
  const { projects: githubProjects, status } = useGithubProjects();
  const list = useMemo(() => {
    const all = mergeProjects(manualProjects, githubProjects ?? []);
    return [...all].sort((a, b) => rank(a) - rank(b) || Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  }, [githubProjects]);
  return { list, status };
}

export const imageSrc = (image) => (image.startsWith("/") || image.startsWith("http") ? image : `/${image}`);
export const yearOf = (p) => {
  const set = GITHUB.years?.[String(p.id ?? "").replace(/^gh-/, "").toLowerCase()];
  return set ?? (p.updatedAt ? new Date(p.updatedAt).getFullYear() : 2026);
};
export const tagsOf = (p, max = 3) =>
  (p.tags?.length ? p.tags : (p.tech || "").split(",").map((t) => t.trim()).filter(Boolean)).slice(0, max);
