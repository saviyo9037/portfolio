import React from "react";
import heroScene from "../assets/hero-scene.webp";
import { FiArrowRight, FiDownload, FiLayers, FiBriefcase, FiCode } from "react-icons/fi";
import { scrollToId } from "../lib/scroll";
import { FocusLine, CountUp, Magnetic, Float } from "./motion/effects";

const ACCENT = "#ff8a1f";

const STATS = [
  { Icon: FiLayers, value: "4+", label: "Projects" },
  { Icon: FiBriefcase, value: "1.5+ Years", label: "Experience" },
  { Icon: FiCode, value: "MERN Stack", label: "Specialization" },
];

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff8a1f]";

export default function Introduction() {
  const goTo = (id) => (e) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <section className="relative overflow-hidden">
      {/* Artwork: you at the laptop, the code card and the tech chips */}
      <div className="pointer-events-none relative mt-24 lg:absolute lg:bottom-0 lg:right-0 lg:top-20 lg:mt-0 lg:w-[58%]">
        <Float className="h-full w-full">
        <img
          src={heroScene}
          alt="Saviyo George at a laptop, with a code card and the React, Node.js, MongoDB, Express and Tailwind logos"
          className="h-full w-full select-none object-cover object-[left_bottom] lg:object-[left_center]"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, #000 22%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, #000 22%)",
          }}
        />
        </Float>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1680px] px-5 pb-16 pt-28 md:px-8 lg:pb-20 lg:pt-36">
        <div className="lg:w-[52%]">
          <span className="inline-flex items-center gap-3 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-5 py-3 text-base font-semibold text-[var(--text-main)]">
            <FiCode aria-hidden="true" style={{ color: ACCENT }} className="text-xl" />
            Full-Stack Developer
          </span>

          <h1
            className="mb-0 mt-9 font-bold leading-[1.12] text-[var(--text-main)]"
            style={{
              fontFamily: "'Inter', sans-serif",
              textTransform: "none",
              letterSpacing: "-0.02em",
              fontSize: "clamp(2.5rem, 4.6vw, 4.5rem)",
            }}
          >
            <FocusLine index={0}>Building</FocusLine>
            <br />
            <FocusLine index={1}>Real-World Solutions</FocusLine>
            <br />
            <FocusLine index={2}>with{" "}
            <span className="relative inline-block" style={{ color: ACCENT }}>
              MERN Stack
              <svg
                aria-hidden="true"
                viewBox="0 0 260 14"
                preserveAspectRatio="none"
                className="absolute -bottom-3 left-0 h-3 w-full"
                fill="none"
                stroke={ACCENT}
                strokeWidth="3"
                strokeLinecap="round"
              >
                <path d="M3 9 C 60 3, 110 12, 170 6" />
                <path d="M120 11 C 170 6, 215 9, 257 5" />
              </svg>
            </span></FocusLine>
          </h1>

          <p className="mb-0 mt-10 max-w-[44ch] text-lg leading-relaxed text-[var(--text-muted)]">
            I design and develop production-ready web applications, ERP &amp; POS systems, CRM/LMS platforms and
            AI-powered tools that solve real business problems.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
            <a
              href="#projects"
              onClick={goTo("projects")}
              className={`inline-flex items-center gap-3 rounded-xl px-8 py-4 text-base font-bold text-black transition-colors hover:bg-white ${focusRing}`}
              style={{ backgroundColor: ACCENT }}
            >
              View Projects <FiArrowRight aria-hidden="true" />
            </a>
            </Magnetic>
            <Magnetic>
            <a
              href="/Saviyo_George_Resume.pdf"
              download
              className={`inline-flex items-center gap-3 rounded-xl border border-[var(--text-dim)] px-7 py-4 text-base font-semibold text-[var(--text-main)] transition-colors hover:border-[#ff8a1f] ${focusRing}`}
            >
              <FiDownload aria-hidden="true" /> Download Resume
            </a>
            </Magnetic>
          </div>

          <ul className="m-0 mt-12 flex list-none flex-wrap items-center gap-y-6 p-0">
            {STATS.map((s, i) => (
              <li
                key={s.label}
                className={`flex items-center gap-4 pr-8 ${i > 0 ? "sm:border-l sm:border-[var(--border-subtle)] sm:pl-8" : ""}`}
              >
                <s.Icon aria-hidden="true" className="text-4xl" style={{ color: ACCENT }} />
                <div>
                  <p className="m-0 text-xl font-bold text-[var(--text-main)]"><CountUp value={s.value} /></p>
                  <p className="m-0 text-[var(--text-muted)]">{s.label}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
