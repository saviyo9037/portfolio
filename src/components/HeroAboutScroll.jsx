import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Introduction from "./Introduction";
import About from "./About";

function HeroAboutScroll({ zIndex = 10 }) {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const compute = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight; // pinned scroll distance
      if (total <= 0) return;
      const scrolled = -rect.top;
      setProgress(Math.min(1, Math.max(0, scrolled / total)));
    };

    compute();

    // Prefer Lenis's own scroll tick if it exists — avoids sync issues with framer-motion's useScroll
    if (window.__lenis) {
      window.__lenis.on("scroll", compute);
    }
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);

    return () => {
      if (window.__lenis) window.__lenis.off("scroll", compute);
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, []);

  // First 40% of the pinned range: About slides in. Remaining 60%: holds fully in view.
  const slidePortion = Math.min(1, progress / 0.4);
  const slideX = `${(1 - slidePortion) * 100}vw`;

  return (
    <section ref={containerRef} className="relative h-[300vh]" style={{ zIndex }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[var(--bg-base)]">
        <div id="introduction" className="absolute inset-0 w-full h-full z-0">
          <Introduction />
        </div>

        <motion.div
          id="about"
          className="absolute inset-0 w-full h-full z-10 bg-[var(--bg-base)] border-l border-[var(--border-subtle)] shadow-[-30px_0_70px_rgba(0,0,0,0.6)] overflow-y-auto flex items-center justify-center"
          style={{ x: slideX }}
        >
          {/* pt-24/28 clears the fixed navbar so its text stops overlapping the paragraph */}
          <div className="w-full pt-24 md:pt-28">
            <About />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroAboutScroll;