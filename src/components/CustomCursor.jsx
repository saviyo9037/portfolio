import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE = "a, button, .group, input, textarea, select, [role='button'], [data-cursor-label]";

// A light cursor: one dot that follows the mouse and grows over links and buttons.
// It only exists on screens with a real mouse, and it does no work while the mouse is still.
function CustomCursor() {
  const [fine, setFine] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [label, setLabel] = useState("");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 900, damping: 55, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 900, damping: 55, mass: 0.4 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!fine) return undefined;

    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    // One listener for the whole page, instead of one per link and button
    const onOver = (e) => {
      const el = e.target instanceof Element ? e.target.closest(INTERACTIVE) : null;
      setHovered(Boolean(el));
      setLabel(el?.getAttribute("data-cursor-label") || "");
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [fine, x, y]);

  if (!fine) return null;

  return (
    <>
      {/* The dot. Its size changes with a transform, so nothing has to be laid out again. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-4 w-4 rounded-full border border-black/50 bg-white"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%", willChange: "transform" }}
        animate={{ opacity: visible ? 1 : 0, scale: label ? 6 : hovered ? 3.5 : 1 }}
        transition={{ scale: { type: "spring", stiffness: 320, damping: 24 }, opacity: { duration: 0.2 } }}
      />
      {label && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-[10000] select-none text-[10px] font-bold uppercase tracking-widest text-black"
          style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
        >
          {label}
        </motion.span>
      )}
    </>
  );
}

export default CustomCursor;
