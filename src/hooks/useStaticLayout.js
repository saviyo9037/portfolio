import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

// True when the pinned scroll sections should lay out plainly: the visitor asked for reduced motion,
// or the screen is too short to hold a pinned section (a phone turned sideways).
export function useStaticLayout() {
  const reduce = useReducedMotion();
  const [short, setShort] = useState(() => (typeof window !== "undefined" ? window.matchMedia("(max-height: 620px)").matches : false));

  useEffect(() => {
    const mq = window.matchMedia("(max-height: 620px)");
    const onChange = () => setShort(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return Boolean(reduce) || short;
}
