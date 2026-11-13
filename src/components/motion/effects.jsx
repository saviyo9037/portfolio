import React, { useLayoutEffect, useRef } from "react";
import { animate, motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

// A line of text that comes into focus from a blur. `index` staggers several lines.
export function FocusLine({ children, index = 0 }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className="inline-block"
      initial={reduce ? false : { opacity: 0, filter: "blur(14px)", y: 14 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 + index * 0.15, ease: EASE }}
    >
      {children}
    </motion.span>
  );
}

// "4+" or "1.5+ Years" counts up from zero once. Text without a leading number is shown as is.
export function CountUp({ value, delay = 0.5 }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const match = String(value).match(/^(\d+(?:\.\d+)?)(.*)$/);

  useLayoutEffect(() => {
    if (!match || reduce || !ref.current) return;
    const target = parseFloat(match[1]);
    const decimals = match[1].includes(".") ? match[1].split(".")[1].length : 0;
    const suffix = match[2];
    ref.current.textContent = (0).toFixed(decimals) + suffix;
    const controls = animate(0, target, {
      duration: 1.4,
      delay,
      ease: EASE,
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = v.toFixed(decimals) + suffix;
      },
    });
    // If the animation clock is throttled (background tab), still end on the real value
    const done = setTimeout(() => {
      if (ref.current) ref.current.textContent = value;
    }, (delay + 1.4) * 1000 + 300);
    return () => {
      controls.stop();
      clearTimeout(done);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, reduce]);

  return <span ref={ref}>{value}</span>;
}

// Fades and rises once as the block scrolls into view
export function Reveal({ children, className = "" }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

// Pulls its child a few pixels toward the pointer, then eases back on leave
export function Magnetic({ children, strength = 0.25 }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const move = (e) => {
    const el = ref.current;
    if (!el || reduce) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const leave = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <span
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      className="inline-block transition-transform duration-200 ease-out"
    >
      {children}
    </span>
  );
}

// Slow, gentle up-and-down drift for artwork
export function Float({ children, className = "" }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      animate={reduce ? undefined : { y: [0, -10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
