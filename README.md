# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## GitHub project sync

The Projects section lists your public GitHub repositories automatically. Push a
new meaningful public repo to `saviyo9037` and it shows up (within the cache
window, 30 minutes by default) with no code change.

**Settings:** everything lives in `src/config/github.js` (username, featured
repos, excluded repos, cache time).

**Rules:** forks, archived, empty and profile repos are skipped, as are repos
with no description, topics or live URL and almost no content. Frontend/backend
pairs (for example `job-finder-frontend` + `job-finder-backend`) become one
project. Hand-written entries in `src/data/projects.js` stay as they are and are
refreshed from the matching repo; add `repo: "RepoName"` to an entry if its
repo is not matched automatically.

**Featured:** add the repo name to `featured` in `src/config/github.js`.

**Token (optional):** copy `.env.example` to `.env` and set `GITHUB_TOKEN` to
raise GitHub's rate limit. It is read only by `api/github-projects.js` on the
server and is never sent to the browser. Use a fine-grained token with read-only
access to public repositories. Without a token, public repos still work.
Set `GITHUB_INCLUDE_PRIVATE=true` only if you want private repos listed (they
appear without a link).

**Hosting:** `npm run dev` and `npm run preview` serve `/api/github-projects`
themselves. On Vercel the `api/` folder deploys as a serverless function with
CDN caching; add `GITHUB_TOKEN` under Project Settings, Environment Variables.
On a static host with no functions, the site falls back to reading public repos
directly from GitHub in the browser and caches them in localStorage.
