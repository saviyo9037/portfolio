import React, { useState, useEffect, useRef, useMemo } from "react";
import ReactDOM from "react-dom";
import { projects, PROJECT_CATEGORIES } from "../data/projects";

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState(PROJECT_CATEGORIES.COMPANY);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [isHoverSupported, setIsHoverSupported] = useState(true);
  const [expandedTouchIdx, setExpandedTouchIdx] = useState(null);

  // Filter projects based on selected category tab
  const filteredProjects = useMemo(() => {
    if (selectedCategory === PROJECT_CATEGORIES.ALL) {
      return projects;
    }
    return projects.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  // Keep last hovered project in state so preview card doesn't flicker during fade-out
  const [lastProject, setLastProject] = useState(projects[0]);

  // Direct DOM ref for cursor-following preview card
  const cardRef = useRef(null);
  const mousePos = useRef({ x: -1000, y: -1000 });
  const cardPos = useRef({ x: -1000, y: -1000 });
  const rafId = useRef(null);

  // Detect fine hover capability
  useEffect(() => {
    const checkHover = () => {
      const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      setIsHoverSupported(fine);
    };
    checkHover();
    window.addEventListener("resize", checkHover);
    return () => window.removeEventListener("resize", checkHover);
  }, []);

  // Update last project cache when hovering
  useEffect(() => {
    if (hoveredIdx !== null && filteredProjects[hoveredIdx]) {
      setLastProject(filteredProjects[hoveredIdx]);
    }
  }, [hoveredIdx, filteredProjects]);

  // Mouse tracking and smooth lerp (0.14) loop for cursor card
  useEffect(() => {
    if (!isHoverSupported) return;

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const CARD_WIDTH = 340;
    const CARD_EST_HEIGHT = 410;

    const tick = () => {
      const { x: mx, y: my } = mousePos.current;
      if (mx === -1000) {
        rafId.current = requestAnimationFrame(tick);
        return;
      }

      // Target position: offset by +30px X, -150px Y
      let targetX = mx + 30;
      if (targetX + CARD_WIDTH > window.innerWidth - 16) {
        targetX = mx - 380;
      }
      if (targetX < 12) {
        targetX = 12;
      }

      let targetY = my - 150;
      // Clamp inside viewport
      targetY = Math.max(12, Math.min(window.innerHeight - CARD_EST_HEIGHT - 12, targetY));

      // Initial instant snap or 0.14 lerp
      if (cardPos.current.x === -1000) {
        cardPos.current.x = targetX;
        cardPos.current.y = targetY;
      } else {
        cardPos.current.x += (targetX - cardPos.current.x) * 0.14;
        cardPos.current.y += (targetY - cardPos.current.y) * 0.14;
      }

      if (cardRef.current) {
        cardRef.current.style.transform = `translate3d(${cardPos.current.x}px, ${cardPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isHoverSupported]);

  // Touch row toggle
  const toggleTouchRow = (idx) => {
    setExpandedTouchIdx((prev) => (prev === idx ? null : idx));
  };

  const companyCount = projects.filter((p) => p.category === PROJECT_CATEGORIES.COMPANY).length;
  const personalCount = projects.filter((p) => p.category === PROJECT_CATEGORIES.PERSONAL).length;

  return (
    <section id="work" className="relative w-full max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-28">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-6 border-b border-[var(--border-subtle)] pb-4">
        <div className="flex items-baseline gap-4">
          <span className="section-label">[04]</span>
          <h2 className="font-['Anton'] text-5xl md:text-7xl lg:text-8xl uppercase tracking-tight">
            <span className="heading-gradient-amber">SELECTED</span>{" "}
            <span className="text-[var(--text-main)]">WORKS</span>
          </h2>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedCategory(PROJECT_CATEGORIES.COMPANY)}
            className={`font-mono text-xs uppercase px-3.5 py-1.5 rounded-full transition-all border cursor-pointer ${selectedCategory === PROJECT_CATEGORIES.COMPANY
              ? "bg-[var(--btn-cta-bg)] text-[var(--btn-cta-text)] font-bold border-[var(--border-subtle)] shadow-md"
              : "border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-[var(--text-main)]/30 bg-[var(--badge-bg)]"
              }`}
          >
            Company Work [{String(companyCount).padStart(2, "0")}]
          </button>
          <button
            onClick={() => setSelectedCategory(PROJECT_CATEGORIES.PERSONAL)}
            className={`font-mono text-xs uppercase px-3.5 py-1.5 rounded-full transition-all border cursor-pointer ${selectedCategory === PROJECT_CATEGORIES.PERSONAL
              ? "bg-[var(--btn-cta-bg)] text-[var(--btn-cta-text)] font-bold border-[var(--border-subtle)] shadow-md"
              : "border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-[var(--text-main)]/30 bg-[var(--badge-bg)]"
              }`}
          >
            Personal Projects [{String(personalCount).padStart(2, "0")}]
          </button>
          <button
            onClick={() => setSelectedCategory(PROJECT_CATEGORIES.ALL)}
            className={`font-mono text-xs uppercase px-3.5 py-1.5 rounded-full transition-all border cursor-pointer ${selectedCategory === PROJECT_CATEGORIES.ALL
              ? "bg-[var(--btn-cta-bg)] text-[var(--btn-cta-text)] font-bold border-[var(--border-subtle)] shadow-md"
              : "border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-[var(--text-main)]/30 bg-[var(--badge-bg)]"
              }`}
          >
            All [{String(projects.length).padStart(2, "0")}]
          </button>
        </div>
      </div>

      {/* Helper Subtitle */}
      <div className="flex items-center justify-between mb-8 text-xs font-mono tracking-widest text-[var(--text-muted)]">
        <span>
          {isHoverSupported
            ? "HOVER A TITLE TO PREVIEW, CLICK TO OPEN"
            : "TAP A TITLE TO EXPAND"}
        </span>
        <span className="hidden sm:inline-block text-violet-400 font-semibold">
          [ {String(filteredProjects.length).padStart(2, "0")} RELEASES IN VIEW ]
        </span>
      </div>

      {/* Typographic List */}
      <div className="border-t border-[var(--border-subtle)]">
        {filteredProjects.map((proj, idx) => {
          const indexStr = String(idx + 1).padStart(2, "0");
          const targetUrl = proj.liveUrl || proj.githubUrl;
          const hasUrl = Boolean(targetUrl);
          const isTouchExpanded = expandedTouchIdx === idx;
          const techChips = (proj.tags && proj.tags.length > 0)
            ? proj.tags
            : proj.tech.split(",").map((t) => t.trim());

          const RowInner = (
            <div
              className="relative z-10 flex items-center justify-between gap-4"
              style={{ padding: "1.3rem 0.5rem" }}
            >
              <div className="flex items-baseline gap-4 sm:gap-8 flex-1 min-w-0">
                {/* Index in display font (Anton) and violet */}
                <span className="font-['Anton'] text-2xl sm:text-3xl md:text-4xl text-violet-400 select-none shrink-0 w-8 sm:w-10">
                  {indexStr}
                </span>

                {/* Title + Underneath Type */}
                <div className="flex flex-col min-w-0 flex-1">
                  <h3
                    className="project-title font-['Anton'] uppercase text-[var(--text-main)] hover:text-cyan-400 transition-colors tracking-tight leading-[1.05]"
                    style={{ fontSize: "clamp(1.7rem, 5.2vw, 3.8rem)" }}
                  >
                    {proj.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider">
                      {proj.type || (proj.company ? `Company · ${proj.company}` : "Personal Project")}
                    </span>
                    {proj.image && (
                      <span className="font-mono text-[10px] text-cyan-400 border border-cyan-500/30 bg-cyan-950/40 px-1.5 py-0.2 rounded hidden sm:inline-block font-semibold">
                        IMG
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Arrow / Public status icon */}
              <span
                className="project-arrow font-mono text-2xl sm:text-3xl md:text-4xl text-[var(--text-muted)] shrink-0 select-none pl-2"
                aria-hidden="true"
              >
                {hasUrl ? "↗" : "○"}
              </span>
            </div>
          );

          return (
            <div key={proj.id || proj.title} className="relative">
              {/* DESKTOP HOVER: Entire row is an <a> (or div if no url) */}
              {isHoverSupported ? (
                hasUrl ? (
                  <a
                    href={targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-row block focus-visible:outline-2 focus-visible:outline-[#22d3ee] focus-visible:outline-offset-2"
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                  >
                    {RowInner}
                  </a>
                ) : (
                  <div
                    className="project-row block cursor-default"
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                  >
                    {RowInner}
                  </div>
                )
              ) : (
                /* TOUCH DEVICE: Expandable Accordion on tap */
                <div>
                  <div
                    role="button"
                    tabIndex={0}
                    aria-expanded={isTouchExpanded}
                    className="project-row block focus-visible:outline-2 focus-visible:outline-[#22d3ee] focus-visible:outline-offset-2"
                    onClick={() => toggleTouchRow(idx)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleTouchRow(idx);
                      }
                    }}
                  >
                    {RowInner}
                  </div>

                  {/* Inline expansion panel for touch */}
                  <div
                    style={{
                      maxHeight: isTouchExpanded ? "520px" : "0px",
                      transition: "max-height 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
                      overflow: "hidden",
                    }}
                  >
                    <div className="px-4 py-4 bg-[var(--card-bg)] border-b border-[var(--border-subtle)] flex flex-col gap-3 font-sans rounded-b-xl text-[var(--text-main)]">
                      {/* Image preview in touch mode */}
                      {proj.image && (
                        <div className="w-full h-44 rounded-lg overflow-hidden border border-[var(--border-subtle)] relative bg-slate-900">
                          <img
                            src={proj.image}
                            alt={proj.title}
                            className="w-full h-full object-cover object-top"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                        </div>
                      )}

                      <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                        {proj.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 my-1">
                        {techChips.map((techItem) => (
                          <span
                            key={techItem}
                            className="font-mono text-[11px] border border-[var(--badge-border)] bg-[var(--badge-bg)] text-[var(--text-main)] px-2.5 py-0.5 rounded-full shadow-sm"
                          >
                            {techItem}
                          </span>
                        ))}
                      </div>

                      <div className="pt-2 flex items-center gap-3">
                        {hasUrl ? (
                          <a
                            href={targetUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[var(--btn-cta-text)] bg-[var(--btn-cta-bg)] px-4 py-2 rounded-full hover:opacity-85 transition-opacity shadow-sm"
                          >
                            <span>{proj.cta || "Open Project"}</span>
                            <span>↗</span>
                          </a>
                        ) : (
                          <span className="font-mono text-xs text-[var(--text-dim)]">
                            [ no public link ]
                          </span>
                        )}
                        {proj.githubUrl && proj.liveUrl && proj.githubUrl !== proj.liveUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-xs text-violet-400 hover:underline font-semibold"
                          >
                            Source code ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* CURSOR-FOLLOWING PREVIEW CARD (DESKTOP PORTAL) */}
      {isHoverSupported &&
        typeof document !== "undefined" &&
        ReactDOM.createPortal(
          <div
            ref={cardRef}
            className="fixed top-0 left-0 pointer-events-none z-[60] w-[340px] rounded-[20px] bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] overflow-hidden shadow-2xl transition-colors duration-300"
            style={{
              opacity: hoveredIdx !== null ? 1 : 0,
              transition: "opacity 0.25s ease-out",
              willChange: "transform, opacity",
            }}
            aria-hidden="true"
          >
            {lastProject && (
              <>
                {/* Header (140px): Real Project Screenshot OR Gradient Mockup */}
                <div className="h-36 relative overflow-hidden bg-slate-900 flex flex-col justify-between">
                  {lastProject.image ? (
                    <>
                      {/* Real Image Screenshot with top browser bar */}
                      <div className="relative w-full h-full">
                        <img
                          src={lastProject.image}
                          alt={lastProject.title}
                          className="w-full h-full object-cover object-top filter brightness-[0.98]"
                        />
                        {/* Gradient shade overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/60" />

                        {/* Mini browser chrome pill on top */}
                        <div className="absolute top-2.5 left-3 right-3 flex items-center justify-between">
                          <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                            <span className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                            <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                            <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
                            <span className="font-mono text-[9px] text-white/90 ml-1.5 truncate max-w-[140px]">
                              {lastProject.title}
                            </span>
                          </div>
                          <span className="font-mono text-[9px] uppercase tracking-wider bg-violet-950/60 text-violet-300 border border-violet-500/30 px-2 py-0.5 rounded-full font-bold shadow-sm">
                            {lastProject.categoryLabel || "Project"}
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    /* Fallback: gradient background & mock browser chrome */
                    <div
                      className={`w-full h-full bg-gradient-to-br ${lastProject.gradient || "from-fuchsia-500 to-indigo-500"
                        } p-3.5 relative overflow-hidden flex flex-col justify-between`}
                    >
                      <div className="bg-black/60 rounded-lg p-2.5 space-y-2 backdrop-blur-sm w-4/5 border border-white/10 shadow-lg">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                          <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                          <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
                          <span className="h-1.5 w-1/3 bg-white/40 rounded ml-2" />
                        </div>
                        <div className="h-2 w-4/5 bg-white/20 rounded" />
                        <div className="grid grid-cols-3 gap-1 pt-1">
                          <div className="h-3.5 bg-white/35 rounded-sm" />
                          <div className="h-3.5 bg-white/20 rounded-sm" />
                          <div className="h-3.5 bg-white/35 rounded-sm" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Big Ghost Index Watermark at bottom right */}
                  <span className="font-['Anton'] absolute right-3 bottom-0 text-7xl text-[var(--text-main)]/10 leading-none select-none pointer-events-none">
                    {String(
                      (() => {
                        const fIdx = filteredProjects.findIndex((p) => p.title === lastProject.title);
                        return fIdx !== -1
                          ? fIdx + 1
                          : projects.findIndex((p) => p.title === lastProject.title) + 1;
                      })()
                    ).padStart(2, "0")}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-3 font-sans bg-[var(--card-bg)] text-[var(--text-main)]">
                  {/* Type in mono cyan */}
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-cyan-400 tracking-wider uppercase font-semibold">
                      {lastProject.type ||
                        (lastProject.company
                          ? `Company · ${lastProject.company}`
                          : "Personal Project")}
                    </span>
                    <span className="text-[var(--text-dim)] text-[10px]">
                      REF-
                      {String(
                        (() => {
                          const fIdx = filteredProjects.findIndex((p) => p.title === lastProject.title);
                          return fIdx !== -1
                            ? fIdx + 1
                            : projects.findIndex((p) => p.title === lastProject.title) + 1;
                        })()
                      ).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Description (1-2 lines) */}
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed line-clamp-2">
                    {lastProject.description}
                  </p>

                  {/* Up to 5 tech chips as small outlined pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(lastProject.tags ||
                      lastProject.tech.split(",").map((t) => t.trim()))
                      .slice(0, 5)
                      .map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[10px] border border-[var(--badge-border)] bg-[var(--badge-bg)] text-[var(--text-main)] px-2 py-0.5 rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                  </div>

                  {/* CTA Label in violet */}
                  <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between font-mono text-xs text-violet-400 font-bold">
                    <span>
                      {(lastProject.cta || (lastProject.liveUrl ? "Live Demo" : "Details")).toUpperCase()}
                    </span>
                    <span>
                      {lastProject.liveUrl || lastProject.githubUrl
                        ? "↗"
                        : "NO PUBLIC LINK"}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>,
          document.body
        )}
    </section>
  );
}
