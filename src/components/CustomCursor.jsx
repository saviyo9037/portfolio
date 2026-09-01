import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth springs for cursor position
  const cursorX = useSpring(0, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleElementHover = () => setIsHovered(true);
    const handleElementLeave = () => setIsHovered(false);

    // Attach listeners to window
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Find interactive elements and add hover listeners
    const addHoverListeners = () => {
      const interactables = document.querySelectorAll("a, button, .group, input, textarea");
      interactables.forEach((el) => {
        el.addEventListener("mouseenter", handleElementHover);
        el.addEventListener("mouseleave", handleElementLeave);
      });
    };

    // Run initially and set a small timeout in case elements render slightly later
    addHoverListeners();
    const timeout = setTimeout(addHoverListeners, 1000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      clearTimeout(timeout);
      
      const interactables = document.querySelectorAll("a, button, .group, input, textarea");
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", handleElementHover);
        el.removeEventListener("mouseleave", handleElementLeave);
      });
    };
  }, [cursorX, cursorY, isVisible]);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full mix-blend-difference hidden md:block"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      initial={{ opacity: 0, width: 16, height: 16, backgroundColor: "#FFF" }}
      animate={{
        opacity: isVisible ? 1 : 0,
        width: isHovered ? 64 : 16,
        height: isHovered ? 64 : 16,
        backgroundColor: "#FFF", // Always white so mix-blend-difference makes it black on white bg
      }}
      transition={{ 
        width: { type: "spring", stiffness: 300, damping: 20 },
        height: { type: "spring", stiffness: 300, damping: 20 },
        opacity: { duration: 0.2 }
      }}
    />
  );
}

export default CustomCursor;
