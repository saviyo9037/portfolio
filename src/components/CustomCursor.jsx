import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from "framer-motion";

function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorLabel, setCursorLabel] = useState("");
  const trailRefs = useRef([]);
  const trailPositions = useRef(Array.from({ length: 5 }, () => ({ x: 0, y: 0 })));
  const rafId = useRef(null);

  // Smooth springs for cursor position
  const cursorX = useSpring(0, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 28 });

  // Velocity for deformation
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const velocityX = useMotionValue(0);
  const velocityY = useMotionValue(0);
  const prevPos = useRef({ x: 0, y: 0, time: Date.now() });

  // Deformation transforms based on velocity
  const skewX = useTransform(velocityX, [-1000, 0, 1000], [-12, 0, 12]);
  const skewY = useTransform(velocityY, [-1000, 0, 1000], [-12, 0, 12]);
  const scaleX = useTransform(velocityX, [-1500, 0, 1500], [0.7, 1, 0.7]);

  const updateTrail = useCallback(() => {
    for (let i = trailPositions.current.length - 1; i > 0; i--) {
      trailPositions.current[i].x += (trailPositions.current[i - 1].x - trailPositions.current[i].x) * 0.3;
      trailPositions.current[i].y += (trailPositions.current[i - 1].y - trailPositions.current[i].y) * 0.3;
    }
    trailPositions.current[0].x = mouseX.get();
    trailPositions.current[0].y = mouseY.get();

    trailRefs.current.forEach((el, i) => {
      if (el) {
        el.style.transform = `translate(${trailPositions.current[i].x - 3}px, ${trailPositions.current[i].y - 3}px)`;
        el.style.opacity = `${0.2 - i * 0.035}`;
      }
    });

    rafId.current = requestAnimationFrame(updateTrail);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);

      const now = Date.now();
      const dt = Math.max(now - prevPos.current.time, 1);
      const vx = ((e.clientX - prevPos.current.x) / dt) * 1000;
      const vy = ((e.clientY - prevPos.current.y) / dt) * 1000;

      velocityX.set(vx);
      velocityY.set(vy);
      prevPos.current = { x: e.clientX, y: e.clientY, time: now };

      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Start trail animation loop
    rafId.current = requestAnimationFrame(updateTrail);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [cursorX, cursorY, isVisible, mouseX, mouseY, velocityX, velocityY, updateTrail]);

  // Hover detection with labels
  useEffect(() => {
    const handleElementHover = (e) => {
      setIsHovered(true);
      const target = e.currentTarget;
      // Check for data-cursor-label attribute
      const label = target.getAttribute("data-cursor-label");
      if (label) {
        setCursorLabel(label);
      }
    };
    const handleElementLeave = () => {
      setIsHovered(false);
      setCursorLabel("");
    };

    const addHoverListeners = () => {
      const interactables = document.querySelectorAll("a, button, .group, input, textarea, [data-cursor-label]");
      interactables.forEach((el) => {
        el.addEventListener("mouseenter", handleElementHover);
        el.addEventListener("mouseleave", handleElementLeave);
      });
    };

    addHoverListeners();
    const timeout = setTimeout(addHoverListeners, 1000);
    const timeout2 = setTimeout(addHoverListeners, 3000);

    return () => {
      clearTimeout(timeout);
      clearTimeout(timeout2);
      const interactables = document.querySelectorAll("a, button, .group, input, textarea, [data-cursor-label]");
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", handleElementHover);
        el.removeEventListener("mouseleave", handleElementLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Trail dots */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={`trail-${i}`}
          ref={(el) => (trailRefs.current[i] = el)}
          className="cursor-trail-dot hidden md:block"
          style={{ opacity: 0 }}
        />
      ))}

      {/* Main cursor */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full mix-blend-difference hidden md:flex items-center justify-center"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          skewX,
          scaleX,
        }}
        initial={{ opacity: 0, width: 16, height: 16, backgroundColor: "#FFF" }}
        animate={{
          opacity: isVisible ? 1 : 0,
          width: cursorLabel ? 100 : isHovered ? 64 : 16,
          height: cursorLabel ? 100 : isHovered ? 64 : 16,
          backgroundColor: "#FFF",
        }}
        transition={{
          width: { type: "spring", stiffness: 300, damping: 20 },
          height: { type: "spring", stiffness: 300, damping: 20 },
          opacity: { duration: 0.2 },
        }}
      >
        {/* Cursor label text */}
        <AnimatePresence>
          {cursorLabel && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-[10px] font-bold uppercase tracking-widest text-black mix-blend-normal pointer-events-none select-none"
            >
              {cursorLabel}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

export default CustomCursor;
