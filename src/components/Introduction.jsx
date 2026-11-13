import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import saviyoCutout from "../assets/saviyo-cutout.png";
import { FiArrowRight, FiDownload, FiMapPin } from "react-icons/fi";
import { SiReact, SiNodedotjs, SiTypescript, SiMongodb, SiNextdotjs, SiTailwindcss } from "react-icons/si";
import { scrollToId } from "../lib/scroll";

const ACCENT = "#ff8a1f";
const DISPLAY = "'Bricolage Grotesque', 'Inter', sans-serif";

const STACK = [
  { Icon: SiReact, name: "React" },
  { Icon: SiNodedotjs, name: "Node.js" },
  { Icon: SiTypescript, name: "TypeScript" },
  { Icon: SiMongodb, name: "MongoDB" },
  { Icon: SiNextdotjs, name: "Next.js" },
  { Icon: SiTailwindcss, name: "Tailwind CSS" },
];

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff8a1f]";

export default function Introduction() {
  const reduce = useReducedMotion();
  const goTo = (id) => (e) => {
    e.preventDefault();
    scrollToId(id);
  };

  // One authored moment: the two name lines rise out of a mask on load
  const line = (i) => ({
    initial: reduce ? false : { y: "105%" },
    animate: { y: 0 },
    transition: { duration: 0.9, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section className="relative mx-auto w-full max-w-[1680px] px-5 pt-28 md:px-8 md:pt-32">
      <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-6">
        {/* Name and copy */}
        <div className="pb-6 lg:col-span-7 lg:pb-16">
          <h1
            className="m-0 text-[clamp(3.5rem,10.5vw,9.5rem)] font-extrabold leading-[0.86] text-[var(--text-main)]"
            style={{ fontFamily: DISPLAY, textTransform: "none", letterSpacing: "-0.035em" }}
          >
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span className="block" {...line(0)}>
                Saviyo
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span className="block" {...line(1)}>
                George
              </motion.span>
            </span>
          </h1>

          <p
            className="mb-0 mt-8 max-w-[24ch] text-2xl font-bold leading-tight text-[var(--text-main)] md:text-3xl"
            style={{ fontFamily: DISPLAY, textWrap: "balance" }}
          >
            Full-stack developer building software that solves real problems.
          </p>

          <p className="mb-0 mt-5 max-w-[60ch] text-lg leading-relaxed text-[var(--text-muted)]">
            Production-ready web applications, ERP and POS systems, CRM and LMS platforms, AI-powered tools and
            custom business software.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href="#projects"
              onClick={goTo("projects")}
              className={`inline-flex items-center gap-2 rounded-xl px-7 py-4 font-bold text-black transition-colors hover:bg-white ${focusRing}`}
              style={{ backgroundColor: ACCENT }}
            >
              View my work <FiArrowRight aria-hidden="true" />
            </a>
            <a
              href="/Saviyo_George_Resume.pdf"
              download
              className={`inline-flex items-center gap-2 font-semibold text-[var(--text-main)] underline decoration-[var(--border-subtle)] decoration-2 underline-offset-8 transition-colors hover:decoration-[#ff8a1f] ${focusRing}`}
            >
              <FiDownload aria-hidden="true" /> Download resume
            </a>
          </div>
        </div>

        {/* Portrait: the head breaks out above a solid block */}
        <div className="relative mx-auto w-full max-w-[520px] lg:col-span-5 lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute inset-x-[6%] bottom-0 top-[22%] rounded-2xl"
            style={{ backgroundColor: ACCENT }}
          />
          <motion.img
            src={saviyoCutout}
            alt="Portrait of Saviyo George"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto block h-auto w-[92%] select-none object-contain"
          />
        </div>
      </div>

      {/* Facts as plain text, one line each */}
      <div className="grid gap-6 border-t border-[var(--border-subtle)] py-8 md:grid-cols-12 md:items-center">
        <p className="m-0 flex flex-wrap items-center gap-x-6 gap-y-2 text-[var(--text-muted)] md:col-span-6">
          <span className="inline-flex items-center gap-2 font-semibold text-[var(--text-main)]">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for work
          </span>
          <span>Developer at D3innovatives</span>
          <span className="inline-flex items-center gap-1.5">
            <FiMapPin aria-hidden="true" /> Kerala, India
          </span>
        </p>
        <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-2 p-0 md:col-span-6 md:justify-end">
          {STACK.map((t) => (
            <li key={t.name} className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
              <t.Icon aria-hidden="true" className="text-base text-[var(--text-main)]" />
              {t.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
