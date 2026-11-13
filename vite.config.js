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
    build: {
      rollupOptions: {
        output: {
          // Big libraries get their own files: they download in parallel and stay cached between deploys
          manualChunks(id) {
            if (!id.includes('node_modules')) return
            if (id.includes('framer-motion') || id.includes('/motion')) return 'motion'
            if (id.includes('react-router')) return 'router'
            if (id.includes('react-icons')) return 'icons'
            if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/scheduler/')) return 'react'
          },
        },
      },
    },
  }
})
