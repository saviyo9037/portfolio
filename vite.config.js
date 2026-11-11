import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import githubProjects from './api/github-projects.js'

// Serves /api/github-projects during `vite` and `vite preview`, using the same
// handler that runs in production. GITHUB_* values stay in the Node process;
// Vite only exposes VITE_-prefixed variables to browser code.
function githubApi() {
  const mount = (server) => {
    server.middlewares.use('/api/github-projects', githubProjects)
  }
  return {
    name: 'github-projects-api',
    configureServer: mount,
    configurePreviewServer: mount,
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), 'GITHUB_'))
  return {
    plugins: [react(), tailwindcss(), githubApi()],
  }
})
