import React, { useState, useEffect, useRef } from "react";

const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789!@#$%&*<>";

export default function ScrambleText({
  text = "",
  as: Component = "span",
  className = "",
  triggerOnHover = true,
  scrambleSpeed = 28,
  ...props
}) {
  const [displayText, setDisplayText] = useState(text);
  const elementRef = useRef(null);
  const animatingRef = useRef(false);

  const startScramble = () => {
    if (animatingRef.current || !text) return;
    animatingRef.current = true;
    let iteration = 0;

    const interval = setInterval(() => {
      iteration++;
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " " || char === "\n") return char;
            if (index < iteration / 2) return text[index];
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );

      if (iteration > text.length * 2) {
        clearInterval(interval);
        setDisplayText(text);
        animatingRef.current = false;
      }
    }, scrambleSpeed);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          startScramble();
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [text]);

  return (
    <Component
      ref={elementRef}
      className={className}
      onMouseEnter={triggerOnHover ? startScramble : undefined}
      aria-label={text}
      {...props}
    >
      {displayText}
    </Component>
  );
}
