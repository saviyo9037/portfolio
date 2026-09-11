import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import './App.css'
import Home from './pages/Home'
import CustomCursor from './components/CustomCursor'
import Chatbot from './components/Chatbot'
import Preloader from './components/Preloader'
import FloatingElements from './components/FloatingElements'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

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
      <AnimatePresence>
        {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>
      {!isLoading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <FloatingElements />
          <Home />
          <Chatbot />
        </motion.div>
      )}
    </div>
  )
}

export default App
