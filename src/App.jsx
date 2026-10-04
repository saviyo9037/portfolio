import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import Lenis from 'lenis'
import './App.css'
import Home from './pages/Home'
import CustomCursor from './components/CustomCursor'
import Chatbot from './components/Chatbot'
import Preloader from './components/Preloader'
import BackgroundAnimation from './components/BackgroundAnimation'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  // Smooth top reading progress line
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    if (isLoading) return

    const lenis = new Lenis({
      duration: 0.7,
      wheelMultiplier: 1.6,
      touchMultiplier: 2.0,
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
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500 origin-left z-[100] shadow-[0_0_12px_rgba(16,185,129,0.8)]"
        style={{ scaleX }}
      />

      <AnimatePresence>
        {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>
      {!isLoading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <BackgroundAnimation />
          <Home />
          <Chatbot />
        </motion.div>
      )}
    </div>
  )
}

export default App
