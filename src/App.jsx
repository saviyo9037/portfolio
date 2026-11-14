import { useEffect, useState, useCallback, useRef, lazy, Suspense } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import './App.css'
import Home from './pages/Home'
import { scrollToId, scrollToTop } from './lib/scroll'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
// Loaded only when needed, so they stay out of the first download
const TechnologiesPage = lazy(() => import('./pages/TechnologiesPage'))
const Chatbot = lazy(() => import('./components/Chatbot'))
import Preloader from './components/Preloader'

// The first load always opens at the top, even if the address carries a #section or the
// browser remembers an old scroll position. After that, a new page starts at the top and
// a link to a #section on Home jumps to that section.
function ScrollManager() {
  const { pathname, hash } = useLocation()
  const firstLoad = useRef(true)

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
  }, [])

  useEffect(() => {
    const isFirst = firstLoad.current
    firstLoad.current = false

    if (isFirst && hash) {
      // Drop the leftover #section from the address so it does not jump back later
      window.history.replaceState(null, '', pathname + window.location.search)
    }

    const timer = setTimeout(() => {
      if (!isFirst && hash && scrollToId(hash.slice(1), { immediate: true })) return
      scrollToTop({ immediate: true })
    }, 60)
    return () => clearTimeout(timer)
  }, [pathname, hash])

  return null
}

function App() {
  // The loading screen plays once per visit; moving between pages or reloading skips it
  const [isLoading, setIsLoading] = useState(() => {
    try {
      return !sessionStorage.getItem('portfolio-seen')
    } catch {
      return true
    }
  })

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false)
    try {
      sessionStorage.setItem('portfolio-seen', '1')
    } catch {
      /* storage unavailable: the loading screen just plays again next time */
    }
    // The page content appears now. Reset to the top once it has laid out (and again a moment
    // later) so the browser's own jump to a remembered #section or scroll position cannot win.
    requestAnimationFrame(() => window.scrollTo(0, 0))
    setTimeout(() => window.scrollTo(0, 0), 250)
  }, [])

  // Smooth top reading progress lineu
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    if (isLoading) return

    // Smoothing by easing toward the target (lerp) feels steadier than a fixed duration
    const lenis = new Lenis({
      lerp: 0.11,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      smoothWheel: true,
    })
    window.__lenis = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      window.__lenis = null
      lenis.destroy()
    }
  }, [isLoading])

  return (
    <div className="grain-overlay">
      <CustomCursor />

      {/* Top Reading Progress Bar with Neon Gradient */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-yellow-400 via-yellow-400 to-yellow-400 origin-left z-[100] shadow-[0_0_12px_rgba(255, 77, 0,0.8)]"
        style={{ scaleX }}
      />

      <AnimatePresence>
        {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>
      {!isLoading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
          <ScrollManager />
          {/* One navbar for every page, so it never re-animates or jumps when the page changes */}
          <Navbar />
          <Suspense fallback={null}>
            <Routes>
              <Route path="/skills" element={<TechnologiesPage />} />
              <Route path="*" element={<Home />} />
            </Routes>
            <Chatbot />
          </Suspense>
        </motion.div>
      )}
    </div>
  )
}

export default App
