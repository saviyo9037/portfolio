import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function StickySection({ children, zIndex, className = "", id }) {
  const sectionRef = useRef(null);
  const [topOffset, setTopOffset] = useState("0px");

  // Scroll progress for this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Progress bar width
  const progressWidth = useTransform(scrollYProgress, [0, 0.5, 1], ["0%", "100%", "100%"]);

  useEffect(() => {
    const handleResize = () => {
      if (sectionRef.current) {
        const height = sectionRef.current.offsetHeight;
        const windowHeight = window.innerHeight;
        // If section is taller than screen, stick it when its bottom reaches screen bottom
        if (height > windowHeight) {
          setTopOffset(`-${height - windowHeight}px`);
        } else {
          setTopOffset("0px");
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    // Observe content changes (like images loading)
    const observer = new ResizeObserver(handleResize);
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

  return (
    <motion.section
      id={id}
      ref={sectionRef}
      className={`sticky w-full bg-[var(--bg-base)] ${className}`}
      style={{
        top: topOffset,
        zIndex,
        willChange: "transform"
      }}
    >
      {/* Scroll progress bar */}
      <motion.div
        className="section-progress-bar"
        style={{ width: progressWidth }}
      />
      {children}
    </motion.section>
  );
}

export default StickySection;
