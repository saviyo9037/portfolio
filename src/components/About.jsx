import React from "react";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiDownload,
  FiChevronDown,
  FiMapPin,
  FiAward,
  FiArrowDown,
} from "react-icons/fi";
import {
  SiReact,
  SiJavascript,
  SiNodedotjs,
  SiMongodb,
  SiTypescript,
  SiTailwindcss,
  SiGithub,
  SiAmazonwebservices,
} from "react-icons/si";
import { scrollToId } from "../lib/scroll";
import aboutLaptop from "../assets/about-laptop.png";

const ACCENT = "#ff8a1f";

const STACK = [
  { Icon: SiReact, name: "React", color: "#61dafb" },
  { Icon: SiJavascript, name: "JavaScript", color: "#f7df1e" },
  { Icon: SiNodedotjs, name: "Node.js", color: "#84cc16" },
  { Icon: SiMongodb, name: "MongoDB", color: "#22c55e" },
  { Icon: SiTypescript, name: "TypeScript", color: "#3b82f6" },
  { Icon: SiTailwindcss, name: "Tailwind CSS", color: "#06b6d4" },
  { Icon: SiGithub, name: "GitHub", color: "#ffffff" },
  { Icon: SiAmazonwebservices, name: "AWS", color: "#ff9900" },
];

// Code shown on the laptop screen: [text, colour] pairs per line
const CODE = [
  { n: 1, parts: [["const ", "#f472b6"], ["developer", "#93c5fd"], [" = {", "#e2e8f0"]] },
  { n: 2, parts: [["  name: ", "#7dd3fc"], ['"Saviyo George"', "#86efac"], [",", "#e2e8f0"]] },
  { n: 3, parts: [["  role: ", "#7dd3fc"], ['"Full-Stack Developer"', "#86efac"], [",", "#e2e8f0"]] },
  { n: 4, parts: [["  stack: [", "#7dd3fc"], ['"React", "Node.js", "MongoDB"', "#86efac"], ["],", "#e2e8f0"]] },
  { n: 5, parts: [["  passion: ", "#7dd3fc"], ['"Building better solutions"', "#86efac"]] },
  { n: 6, parts: [["};", "#e2e8f0"]] },
];

function Laptop() {
  return (
    <img
      src={aboutLaptop}
      alt="Laptop showing a code editor with portfolio.jsx open"
      className="mx-auto w-full max-w-[720px] select-none object-contain"
      style={{
        // feather all four edges so the photo's own background blends into the page
        maskImage:
          "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent), linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent)",
        maskComposite: "intersect",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent), linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent)",
        WebkitMaskComposite: "source-in",
      }}
      loading="lazy"
    />
  );
}

export default function About() {
  return (
    <section
      id="about-details"
      className="relative w-full overflow-hidden bg-[#07090c] px-4 pb-10 pt-20 text-white md:px-8 md:pt-24"
    >
      <div className="mx-auto max-w-[1680px]">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-6">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex flex-wrap items-center gap-3 rounded-full border border-[#2b313c] bg-[#0f1319] px-4 py-2 text-sm text-[#e5e7eb]">
              <span className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </span>
                Available for Opportunities
              </span>
              <span className="h-4 w-px bg-[#2b313c]" aria-hidden="true" />
              <span className="flex items-center gap-1.5 text-[#cbd5e1]">
                <FiMapPin aria-hidden="true" style={{ color: ACCENT }} /> Kerala, India
              </span>
            </div>

            <p
              className="mb-0 mt-8 text-2xl text-[#fb923c]"
              style={{ fontFamily: "'Caveat', cursive", fontWeight: 700 }}
            >
              Hi, I'm
            </p>

            <h2
              className="m-0 mt-1 text-[clamp(3.25rem,9vw,6.5rem)] font-black uppercase leading-[0.9] tracking-tight"
              style={{ fontFamily: "'Inter', sans-serif", textTransform: "uppercase" }}
            >
              <span className="block text-white">Saviyo</span>
              <span className="block text-transparent" style={{ WebkitTextStroke: `2px ${ACCENT}` }}>
                George
              </span>
            </h2>

            <p className="mb-0 mt-6 text-lg font-semibold text-white">
              Full-Stack Solutions Engineer @{" "}
              <span style={{ color: ACCENT }}>D3innovatives</span>
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-[#e5e7eb]">
              <span className="flex items-center gap-3">
                <FiAward aria-hidden="true" className="text-2xl" style={{ color: ACCENT }} />
                <span>
                  <span className="block font-semibold">BCA with Distinction</span>
                  <span className="block text-sm text-[#9ca3af]">MG University</span>
                </span>
              </span>
              <span className="hidden h-8 w-px bg-[#2b313c] sm:block" aria-hidden="true" />
              <span className="flex items-center gap-3">
                <FiMapPin aria-hidden="true" className="text-2xl" style={{ color: ACCENT }} />
                <span>
                  <span className="block font-semibold">Kerala, India</span>
                  <span className="block text-sm text-[#9ca3af]">(UTC+5:30)</span>
                </span>
              </span>
            </div>

            <p className="mb-0 mt-6 max-w-[52ch] text-base leading-relaxed text-[#9ca3af]">
              Architecting production-grade platforms where complex enterprise ERP flows,
              sub-second POS state, and physical IoT daemons converge into resilient software.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => scrollToId("contact")}
                className="inline-flex items-center gap-2 rounded-lg px-6 py-3.5 font-semibold text-black transition-opacity hover:opacity-90"
                style={{ backgroundColor: ACCENT }}
              >
                <span aria-hidden="true" className="font-mono">{"</>"}</span>
                Let's Collaborate <FiArrowRight aria-hidden="true" />
              </button>
              <a
                href="/Saviyo_George_Resume.pdf"
                download
                className="inline-flex items-center gap-3 rounded-lg border border-[#2b313c] bg-[#0f1319] px-6 py-3.5 font-semibold text-white transition-colors hover:border-[#4b5563]"
              >
                <FiDownload aria-hidden="true" /> Download CV <FiChevronDown aria-hidden="true" className="text-[#9ca3af]" />
              </a>
            </div>
          </motion.div>

          {/* Right: laptop */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Laptop />
          </motion.div>
        </div>

        {/* Tech stack bar */}
        <div className="mt-16 flex flex-col gap-6 rounded-2xl border border-[#2b313c] bg-[#0b0e13] p-6 lg:flex-row lg:items-center lg:gap-8">
          <div className="flex shrink-0 items-center gap-4 lg:border-r lg:border-[#2b313c] lg:pr-8">
            <span aria-hidden="true" className="h-12 w-1 rounded-full" style={{ backgroundColor: ACCENT }} />
            <p className="m-0 text-lg font-bold leading-tight text-white">
              Tech Stack
              <br />I Work With
            </p>
          </div>

          <ul className="m-0 grid list-none grid-cols-4 gap-4 p-0 sm:grid-cols-8">
            {STACK.map((tech) => (
              <li key={tech.name} className="flex flex-col items-center gap-2 text-center">
                <tech.Icon aria-label={tech.name} role="img" className="text-3xl" style={{ color: tech.color }} />
                <span className="text-xs text-[#9ca3af]">{tech.name}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer row */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 text-sm text-[#9ca3af] sm:flex-row">
          <span className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2b313c]">
              <FiArrowDown aria-hidden="true" />
            </span>
            Scroll Down
          </span>
          <span className="flex items-center gap-3 tracking-wide">
            Code <span style={{ color: ACCENT }}>•</span> Build <span style={{ color: ACCENT }}>•</span> Innovate
          </span>
        </div>
      </div>
    </section>
  );
}
