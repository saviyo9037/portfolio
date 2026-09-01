import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Curved wave divider that sits between sections — inspired by ronnsquare.fr
 * Creates a smooth curved transition between two backgrounds.
 */
function CurvedDivider({ inverted = false, color = "var(--bg-base)", className = "" }) {
  return (
    <div className={`relative w-full overflow-hidden pointer-events-none ${className}`} style={{ marginTop: inverted ? 0 : "-1px", marginBottom: inverted ? "-1px" : 0 }}>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="w-full block"
        style={{
          height: "clamp(60px, 8vw, 120px)",
          transform: inverted ? "scaleY(-1)" : "none",
        }}
      >
        <path
          d="M0,0 C360,120 1080,120 1440,0 L1440,120 L0,120 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}

/**
 * Animated curved divider that reveals on scroll
 */
function AnimatedCurvedDivider({ inverted = false, color = "var(--bg-base)", className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 50%"],
  });

  const pathProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className={`relative w-full overflow-hidden pointer-events-none ${className}`}>
      <motion.svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="w-full block"
        style={{
          height: "clamp(60px, 8vw, 120px)",
          transform: inverted ? "scaleY(-1)" : "none",
          opacity: pathProgress,
        }}
      >
        <motion.path
          d="M0,0 C360,120 1080,120 1440,0 L1440,120 L0,120 Z"
          fill={color}
        />
      </motion.svg>
    </div>
  );
}

export { CurvedDivider, AnimatedCurvedDivider };
export default CurvedDivider;
