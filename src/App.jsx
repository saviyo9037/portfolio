import { useEffect } from 'react'
import Lenis from 'lenis'
import './App.css'
import Home from './pages/Home'
import CustomCursor from './components/CustomCursor'

function App() {
  useEffect(() => {
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
  }, [])

  return (
    <>
      <CustomCursor />
      <Home />
    </>
  )
}

export default App
