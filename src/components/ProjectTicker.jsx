import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/projects";
import { FiArrowUpRight, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

/**
 * Premium Interactive Featured Projects Carousel (Theme Aware)
 */
function ProjectTicker() {
  const [lightboxImage, setLightboxImage] = useState(null);
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const featuredIds = ['erp-pos', 'overprint', 'crm-live', 'betterinu-lms'];
  const featuredProjects = projects.filter((p) => featuredIds.includes(p.id));

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(checkScroll, 350);
    }
  };

  return (
    <>
      <section className="relative py-20 md:py-28 overflow-hidden bg-[var(--bg-base)] transition-colors duration-300">
        <div className="container-custom mb-12 flex items-end justify-between relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center gap-3">
              <span className="text-xs tracking-[0.3em] uppercase text-[var(--accent)] font-bold">
                ✦ HIGHLIGHTS
              </span>
              <div className="h-[1px] w-12 bg-[var(--accent)] opacity-40" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-['Anton'] uppercase text-[var(--text-main)] tracking-wide">
              Featured <span className="text-[var(--text-muted)]">Projects</span>
            </h2>
          </motion.div>

          {/* Navigation Controls */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 ${
                canScrollLeft 
                ? "border-[var(--text-main)] text-[var(--text-main)] hover:bg-[var(--text-main)] hover:text-[var(--bg-base)] hover:scale-105" 
                : "border-[var(--border-subtle)] text-[var(--text-muted)] opacity-50 cursor-not-allowed"
              }`}
            >
              <FiChevronLeft className="text-2xl" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 ${
                canScrollRight 
                ? "border-[var(--text-main)] text-[var(--text-main)] hover:bg-[var(--text-main)] hover:text-[var(--bg-base)] hover:scale-105" 
                : "border-[var(--border-subtle)] text-[var(--text-muted)] opacity-50 cursor-not-allowed"
              }`}
            >
              <FiChevronRight className="text-2xl" />
            </button>
          </div>
        </div>

        {/* Draggable/Scrollable Carousel */}
        <div className="relative w-full">
          <motion.div 
            ref={carouselRef}
            onScroll={checkScroll}
            className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory hide-scrollbar px-5 md:px-[calc((100vw-min(100vw,1280px))/2+20px)] pb-10 pt-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {featuredProjects.map((project, i) => (
              <TickerCard
                key={project.id}
                project={project}
                index={i}
                onViewImage={setLightboxImage}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-10"
            onClick={() => setLightboxImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
              onClick={() => setLightboxImage(null)}
            >
              <FiX className="text-4xl" />
            </button>
            <motion.img
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={lightboxImage.startsWith("/") || lightboxImage.startsWith("http") ? lightboxImage : `/${lightboxImage}`}
              alt="Fullscreen view"
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl ring-1 ring-white/10"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </>
  );
}

function TickerCard({ project, index, onViewImage }) {
  const isCompany = project.category === "company";
  const clickTimeout = useRef(null);

  const gradients = [
    "from-purple-600/40 to-indigo-600/40",
    "from-cyan-600/40 to-blue-600/40",
    "from-amber-600/40 to-orange-600/40",
    "from-emerald-600/40 to-teal-600/40",
    "from-rose-600/40 to-pink-600/40",
  ];
  const gradient = gradients[index % gradients.length];

  const imageSrc = project.image
    ? (project.image.startsWith("http") || project.image.startsWith("/") ? project.image : `/${project.image}`)
    : null;

  const handleInteraction = () => {
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
      if (imageSrc) onViewImage(imageSrc);
    } else {
      clickTimeout.current = setTimeout(() => {
        clickTimeout.current = null;
        if (project.liveUrl || project.githubUrl) {
          window.open(project.liveUrl || project.githubUrl, "_blank");
        }
      }, 300);
    }
  };

  return (
    <motion.div
      className="flex-shrink-0 w-[80vw] sm:w-[320px] md:w-[380px] snap-center group cursor-pointer relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={handleInteraction}
      whileHover={{ y: -5 }}
    >
      <CardContent project={project} gradient={gradient} isCompany={isCompany} imageSrc={imageSrc} />
    </motion.div>
  );
}

function CardContent({ project, gradient, isCompany, imageSrc }) {
  return (
    <div className="h-full bg-[var(--card-bg)] rounded-2xl border border-[var(--border-subtle)] p-4 transition-all duration-500 group-hover:border-[var(--border-hover)] group-hover:shadow-[0_8px_30px_var(--accent-glow)] group-hover:bg-[var(--bg-elevated)]">
      {/* Padded Image frame */}
      <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-black/5 ring-1 ring-[var(--border-subtle)] group-hover:ring-[var(--accent)]/30 transition-all duration-500">
        
        {imageSrc ? (
          <>
            <img
              src={imageSrc}
              alt={project.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] pointer-events-none" />
          </>
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90`} />
        )}

        {!imageSrc && (
          <div className="absolute inset-0 flex items-center justify-center p-5">
            <span className="text-2xl md:text-3xl font-['Anton'] uppercase text-center leading-tight text-white/90 drop-shadow-md group-hover:text-white transition-colors duration-500">
              {project.title}
            </span>
          </div>
        )}

        {/* Hover dark overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

        {/* Animated Arrow icon */}
        {(project.liveUrl || project.githubUrl) && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[var(--accent)] flex items-center justify-center text-white shadow-lg transition-all duration-500 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100">
            <FiArrowUpRight className="text-xl" />
          </div>
        )}

        {/* Category badge floating */}
        <div className="absolute top-3 left-3">
          <span className="backdrop-blur-md bg-[var(--bg-base)]/80 border border-[var(--border-subtle)] text-[var(--text-main)] text-[9px] tracking-widest uppercase font-mono px-2.5 py-1 rounded-full shadow-sm">
            {isCompany ? "Company" : "Personal"}
          </span>
        </div>
      </div>

      {/* Caption & Info */}
      <div className="flex flex-col gap-1.5 px-1">
        <div className="flex items-start justify-between gap-3">
          <h4 className="text-[17px] md:text-[19px] font-['Anton'] uppercase tracking-wide text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors line-clamp-1">
            {project.title}
          </h4>
          {(project.liveUrl || project.githubUrl) && (
            <FiArrowUpRight className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors mt-0.5 text-lg flex-shrink-0" />
          )}
        </div>
        
        <p className="text-[13px] md:text-[14px] text-[var(--text-muted)] tracking-wide font-sans line-clamp-2 leading-snug">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-1.5">
          {project.tags?.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="text-[9px] font-mono text-[var(--text-main)] bg-[var(--nav-pill-bg)] px-2 py-0.5 rounded border border-[var(--nav-pill-border)]">
              {tag}
            </span>
          ))}
          {project.tags?.length > 3 && (
            <span className="text-[9px] font-mono text-[var(--text-muted)] px-1 py-0.5">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectTicker;
