import { useEffect, useState, useCallback } from 'react'
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

    const lenis = new Lenis()
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
      <Preloader onComplete={handlePreloaderComplete} />
      {!isLoading && (
        <>
          <FloatingElements />
          <Home />
          <Chatbot />
        </>
      )}
    </div>
  )
}

export default App
