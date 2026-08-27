import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] text-4xl"
      animate={{
        x: mousePosition.x - 16, // Adjusting so the center of the emoji is at the cursor
        y: mousePosition.y - 16,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
        mass: 0.5,
      }}
    >
      🚙
    </motion.div>
  );
}

export default CustomCursor;
