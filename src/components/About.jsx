import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const HEADING = "Engineering reliable full-stack realities.";
const BODY =
  "I am Saviyo George, a full-stack engineer based in Kerala, India. I join backend data integrity to fast, fluid interfaces. Today I build production ERP and POS software at D3innovatives. With a BCA from MG University and hands-on MERN internships behind me, I focus on systems that stay correct under load and feel instant to use.";
const BOLD = ["Saviyo", "George,", "D3innovatives."];

// One word: grey at first, white as the scroll reaches it
function Word({ word, index, count, progress, from, to, strong }) {
  const start = from + ((to - from) * index) / count;
  const end = start + ((to - from) / count) * 2.2;
  const opacity = useTransform(progress, [start, end], [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className={strong ? "font-bold text-white" : ""}>
      {word}{" "}
    </motion.span>
  );
}

function Words({ text, progress, from, to, bold = [], className = "" }) {
  const words = text.split(" ");
  return (
    <p className={className}>
      {words.map((w, i) => (
        <Word key={i} word={w} index={i} count={words.length} progress={progress} from={from} to={to} strong={bold.includes(w)} />
      ))}
    </p>
  );
}

export default function About() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Reduced motion: the same text, plain, with no pinned scroll
  if (reduce) {
    return (
      <div className="px-5 py-32 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="m-0 text-[clamp(1.8rem,4.6vw,4.2rem)] font-black uppercase leading-[0.98] tracking-[-0.03em] text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
            {HEADING}
          </h2>
          <p className="m-0 mt-8 text-lg leading-relaxed text-white/80">{BODY}</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative h-[320vh]">
      <div className="sticky top-0 flex h-[100svh] w-full items-center justify-center px-5">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="m-0 text-[clamp(1.8rem,4.6vw,4.2rem)] font-black uppercase leading-[0.98] tracking-[-0.03em] text-white"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <Words text={HEADING} progress={scrollYProgress} from={0.02} to={0.3} />
          </h2>
          <Words
            text={BODY}
            progress={scrollYProgress}
            from={0.32}
            to={0.9}
            bold={BOLD}
            className="m-0 mt-8 text-base leading-relaxed text-white sm:text-lg md:text-xl"
          />
        </div>
      </div>
    </div>
  );
}
