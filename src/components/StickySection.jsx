import React, { useRef, useEffect, useState } from "react";

function StickySection({ children, zIndex, className = "", id }) {
  const sectionRef = useRef(null);
  const [topOffset, setTopOffset] = useState("0px");

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
    <section
      id={id}
      ref={sectionRef}
      className={`sticky w-full bg-[var(--bg-base)] ${className}`}
      style={{ top: topOffset, zIndex }}
    >
      {children}
    </section>
  );
}

export default StickySection;
