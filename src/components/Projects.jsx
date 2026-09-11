import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { projects } from "../data/projects";
import { FiArrowUpRight, FiGithub, FiExternalLink } from "react-icons/fi";

const CATEGORIES = [
  { key: "all", label: "All Projects" },
  { key: "company", label: "Company Work" },
  { key: "personal", label: "Personal Projects" },
];

// Vibrant gradients for project mockups
const gradients = [
  "bg-gradient-to-br from-purple-500 to-indigo-600",
  "bg-gradient-to-tr from-emerald-400 to-cyan-500",
  "bg-gradient-to-br from-orange-400 to-rose-500",
  "bg-gradient-to-bl from-blue-500 to-violet-600",
  "bg-gradient-to-t from-pink-500 to-amber-400",
];

function Projects() {
  const [activeCategory, setActiveCategory] = useState("all");
  const targetRef = useRef(null);
  const carouselRef = useRef(null);
  const widthRef = useRef(0);
  const [width, setWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === "all") return true;
    return project.category === activeCategory;
  });

  useEffect(() => {
    const updateDimensions = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      if (carouselRef.current && !mobile) {
        // Calculate the total scrollable width minus the viewport width plus padding
        const maxScroll = Math.max(0, carouselRef.current.scrollWidth - window.innerWidth + 120);
        widthRef.current = maxScroll;
        setWidth(maxScroll);
      }
    };

    updateDimensions();
    const timer = setTimeout(updateDimensions, 150);
    window.addEventListener("resize", updateDimensions);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateDimensions);
    };
  }, [filteredProjects]);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Dynamically calculate horizontal translation from scroll progress
  // Travels from 0px to -width between 0% and 80% of vertical scroll, then holds still before unpinning
  const x = useTransform(scrollYProgress, (progress) => {
    if (isMobile) return "0px";
    const currentWidth = widthRef.current || width;
    const p = Math.min(progress / 0.8, 1);
    return `-${p * currentWidth}px`;
  });

  return (
    <section 
      ref={targetRef} 
      className="relative bg-[var(--bg-base)] md:h-[260vh] py-12 md:py-0"
    >
      <div className="md:sticky md:top-0 md:h-screen md:overflow-hidden bg-[var(--bg-base)] flex flex-col justify-between py-6 md:py-8 lg:py-10">
        <div className="container-custom flex-shrink-0">
          {/* Section Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-4 md:mb-6"
          >
            <span className="text-xs tracking-[0.3em] uppercase text-[var(--accent)] font-medium">
              (05)
            </span>
            <div className="divider flex-1" />
            <span className="text-xs tracking-[0.3em] uppercase text-[var(--text-muted)] font-medium">
              Selected Work
            </span>
          </motion.div>

          {/* Heading & Tabs */}
          <div className="mb-4 md:mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-8">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-['Anton'] uppercase leading-[0.88] text-transparent text-stroke">
              Digital<br /> <span className="text-[var(--text-main)] drop-shadow-[0_0_20px_var(--accent-glow)]">Experiences</span>
            </h2>

            <div className="inline-flex flex-wrap gap-2 p-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] shadow-inner">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`relative px-4 md:px-5 py-2 md:py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                      isActive ? "text-[var(--bg-base)]" : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activePillProjects"
                        className="absolute inset-0 bg-[var(--text-main)] rounded-full z-0 shadow-md"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Horizontal Scroll-Linked Carousel */}
        <div className="pl-5 md:pl-10 my-auto overflow-hidden">
          <motion.div style={isMobile ? {} : { x }} className="py-2 md:py-4 w-full md:w-max will-change-transform">
            <div ref={carouselRef} className="flex flex-col md:flex-row gap-6 md:gap-8 w-full md:w-max pr-5 md:pr-10">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id || project.title}
                    initial={{ opacity: 0, scale: 0.95, x: 40 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9, x: -40 }}
                    transition={{ duration: 0.4, delay: index * 0.04 }}
                    className="w-full md:w-[75vw] lg:w-[65vw] max-w-[1050px] flex-shrink-0 perspective-[2000px]"
                  >
                    <ProjectCard project={project} index={index} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="container-custom mt-2 flex-shrink-0 hidden md:block">
          <div className="flex items-center justify-center gap-4 text-[var(--text-muted)]">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--border-hover)]" />
            <span className="text-[10px] tracking-[0.3em] uppercase font-medium">Scroll to explore</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--border-hover)]" />
          </div>
        </div>
      </div>
    </section>
  );
}

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const gradientClass = gradients[index % gradients.length];

  const handleMouseMove = (e) => {
    if (!cardRef.current || window.innerWidth <= 768) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: (y - 0.5) * -6, // Subtle rotation for carousel
      y: (x - 0.5) * 6,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const imageSrc = project.image
    ? project.image.startsWith("/")
      ? project.image
      : `/${project.image}`
    : null;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative w-full h-auto md:h-[55vh] md:min-h-[400px] md:max-h-[520px] rounded-[1.75rem] bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-[0_20px_40px_rgba(0,0,0,0.08)] overflow-hidden group transform-style-3d flex flex-col md:flex-row hover:border-amber-400 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5),0_0_25px_rgba(251,191,36,0.2)] transition-all duration-300"
    >
      {/* Content Side */}
      <div className="flex-1 p-6 md:p-8 lg:p-10 flex flex-col justify-between z-10 bg-[var(--bg-surface)] relative order-2 md:order-1">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--bg-base)] opacity-5 pointer-events-none" />

        <div className="transform-style-3d translate-z-[30px]">
          <div className="flex items-center gap-3 mb-3 md:mb-5">
            <span className="text-2xl md:text-3xl font-['Anton'] text-[var(--border-hover)] select-none">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="px-3 py-0.5 text-[10px] tracking-widest uppercase font-mono bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-full text-[var(--text-main)]">
              {project.company ? project.company : "Independent"}
            </span>
          </div>

          <h3 className="text-2xl md:text-4xl font-sans font-bold tracking-tight text-[var(--text-main)] mb-2 md:mb-3 leading-tight">
            {project.title}
          </h3>

          <p className="text-xs md:text-sm text-[var(--text-muted)] max-w-md leading-relaxed mb-4 md:mb-6 line-clamp-2 md:line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap items-center gap-2 mb-4 md:mb-6">
            {project.tags && project.tags.slice(0, 4).map((tag, i) => (
              <span key={i} className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-dim)] border border-[var(--border-subtle)] px-2.5 py-1 rounded-full bg-[var(--bg-base)]">
                {tag}
              </span>
            ))}
            {project.tags && project.tags.length > 4 && (
              <span className="text-[10px] font-mono tracking-widest text-[var(--text-dim)] px-2">
                +{project.tags.length - 4} more
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 transform-style-3d translate-z-[50px] relative z-20 pt-2 border-t border-[var(--border-subtle)]">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-label="VIEW"
              className="group/btn flex items-center justify-center w-11 h-11 md:w-13 md:h-13 rounded-full bg-[var(--text-main)] text-[var(--bg-base)] hover:scale-110 hover:bg-amber-400 transition-all duration-300 shadow-xl"
            >
              <FiArrowUpRight className="text-xl md:text-2xl group-hover/btn:rotate-45 transition-transform duration-300" />
            </a>
          )}

          <button className="btn-minimal px-5 py-2.5 text-xs hover:border-amber-400/60" data-cursor-label="DETAILS">
            <span>Case Study</span>
          </button>
        </div>
      </div>

      {/* Visual Mockup Side */}
      <div className="h-52 md:h-auto md:w-5/12 lg:w-1/2 relative overflow-hidden order-1 md:order-2 border-b md:border-b-0 md:border-l border-[var(--border-subtle)]">
        <div className={`absolute inset-0 ${gradientClass} opacity-80`} />

        {/* Real Screenshot or Abstract Mockup */}
        <div className="absolute inset-0 flex items-center justify-center transform-style-3d translate-z-[60px] p-4 md:p-6">
          <div className="w-[90%] h-[95%] md:h-[85%] bg-[var(--bg-base)] rounded-xl shadow-2xl border border-[var(--border-subtle)] overflow-hidden relative group-hover:-translate-y-2 md:group-hover:-translate-y-4 group-hover:scale-[1.02] transition-all duration-700 ease-out flex flex-col">
            <div className="w-full h-7 bg-[var(--bg-elevated)] border-b border-[var(--border-subtle)] flex items-center px-3 gap-1.5 flex-shrink-0">
              <div className="w-2 h-2 rounded-full bg-red-400/80" />
              <div className="w-2 h-2 rounded-full bg-amber-400/80" />
              <div className="w-2 h-2 rounded-full bg-green-400/80" />
            </div>

            {imageSrc ? (
              <div className="flex-1 w-full overflow-hidden relative">
                <img
                  src={imageSrc}
                  alt={project.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            ) : (
              /* Abstract mockup content lines */
              <div className="p-4 md:p-5 space-y-3 opacity-30 flex-1 flex flex-col justify-center">
                <div className="h-3 w-3/4 bg-[var(--text-dim)] rounded" />
                <div className="h-2.5 w-1/2 bg-[var(--text-muted)] rounded" />
                <div className="h-16 md:h-24 w-full bg-[var(--bg-surface)] rounded mt-3 border border-[var(--border-subtle)]" />
                <div className="h-2.5 w-5/6 bg-[var(--text-muted)] rounded" />
              </div>
            )}

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)] via-transparent to-transparent opacity-60 pointer-events-none" />
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-1/4 -left-8 w-20 h-20 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 blur-[2px] transform-style-3d translate-z-[80px] group-hover:translate-x-6 transition-transform duration-1000 ease-out pointer-events-none" />
        <div className="absolute bottom-1/4 -right-8 w-24 h-24 bg-black/10 backdrop-blur-xl rounded-full border border-white/10 blur-[3px] transform-style-3d translate-z-[40px] group-hover:-translate-x-6 transition-transform duration-1000 ease-out pointer-events-none" />
      </div>

    </motion.div>
  );
};

export default Projects;
