import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/projects";
import { FiArrowUpRight, FiX } from "react-icons/fi";

/**
 * Horizontal scrolling project ticker — inspired by ronnsquare.fr's "running line"
 * Shows featured project cards in an infinite horizontal scroll
 */
function ProjectTicker() {
  const [lightboxImage, setLightboxImage] = useState(null);

  const featuredProjects = projects.filter((p) => p.featured || p.liveUrl);
  // Duplicate for seamless loop
  const tickerItems = [...featuredProjects, ...featuredProjects];

  return (
    <>
      <section className="relative py-16 md:py-24 overflow-hidden border-t border-b border-white/10 bg-transparent">
        {/* Section Label */}
        <div className="container-custom mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4"
          >
            <span className="text-xs tracking-[0.3em] uppercase text-emerald-400 font-medium">
              ✦
            </span>
            <h3 className="text-xs tracking-[0.3em] uppercase text-slate-400 font-medium">
              Featured Projects
            </h3>
            <div className="divider flex-1" />
          </motion.div>
        </div>

        {/* Ticker Track */}
        <div className="flex gap-6 md:gap-8 pl-5 md:pl-10 ticker-container ticker-auto">
          {tickerItems.map((project, i) => (
            <TickerCard
              key={`${project.id}-${i}`}
              project={project}
              index={i}
              onViewImage={setLightboxImage}
            />
          ))}
        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-10"
            onClick={() => setLightboxImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
              onClick={() => setLightboxImage(null)}
            >
              <FiX className="text-3xl" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={lightboxImage.startsWith("/") || lightboxImage.startsWith("http") ? lightboxImage : `/${lightboxImage}`}
              alt="Fullscreen view"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function TickerCard({ project, index, onViewImage }) {
  const isCompany = project.category === "company";
  const clickTimeout = useRef(null);

  // Placeholder gradient backgrounds for project cards (since we don't have images)
  const gradients = [
    "from-purple-900/30 to-indigo-900/20",
    "from-cyan-900/30 to-blue-900/20",
    "from-amber-900/30 to-orange-900/20",
    "from-emerald-900/30 to-teal-900/20",
    "from-rose-900/30 to-pink-900/20",
    "from-violet-900/30 to-fuchsia-900/20",
  ];
  const gradient = gradients[index % gradients.length];

  // Format image path (add leading slash if needed so it loads from public folder correctly)
  const imageSrc = project.image
    ? (project.image.startsWith("http") || project.image.startsWith("/") ? project.image : `/${project.image}`)
    : null;

  const handleInteraction = () => {
    // Single vs Double click logic
    if (clickTimeout.current) {
      // Double click detected!
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
      if (imageSrc) {
        onViewImage(imageSrc);
      }
    } else {
      // First click detected, wait 300ms to see if second click comes
      clickTimeout.current = setTimeout(() => {
        // Only single click occurred, navigate to URL
        clickTimeout.current = null;
        if (project.liveUrl || project.githubUrl) {
          window.open(project.liveUrl || project.githubUrl, "_blank");
        }
      }, 300);
    }
  };

  return (
    <motion.div
      className="flex-shrink-0 w-[300px] md:w-[400px] group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      onClick={handleInteraction}
      data-cursor-label="Tap: URL | Double: IMG"
    >
      <CardContent project={project} gradient={gradient} isCompany={isCompany} imageSrc={imageSrc} />
    </motion.div>
  );
}

function CardContent({ project, gradient, isCompany, imageSrc }) {
  return (
    <>
      {/* Image frame */}
      <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4 bg-[#121216]/90 border border-white/10 group-hover:border-white/30 transition-colors duration-500">

        {/* Project Image or Gradient Placeholder */}
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={project.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
        )}

        {/* Project title overlay (only show if no image) */}
        {!imageSrc && (
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <span className="text-2xl md:text-3xl font-['Anton'] uppercase text-center leading-tight text-white/20 group-hover:text-white/40 transition-colors duration-500">
              {project.title}
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />

        {/* Arrow icon */}
        {(project.liveUrl || project.githubUrl) && (
          <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/80 group-hover:text-black group-hover:bg-white transition-all duration-500 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0">
            <FiArrowUpRight className="text-sm" />
          </div>
        )}

        {/* Category badge */}
        <div className="absolute bottom-4 left-4">
          <span
            className={`text-[9px] tracking-[0.15em] uppercase font-mono px-2 py-1 rounded-md backdrop-blur-sm font-semibold shadow-sm ${isCompany
              ? "bg-amber-500/10 text-amber-300 border border-amber-500/30"
              : "bg-cyan-500/10 text-cyan-300 border border-cyan-500/30"
              }`}
          >
            {isCompany ? "Company" : "Personal"}
          </span>
        </div>
      </div>

      {/* Caption */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4
            className="text-sm font-sans normal-case font-semibold tracking-wide text-white group-hover:text-[#39ff88] transition-colors mb-1"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {project.title}
          </h4>
          <p className="text-xs text-slate-400 tracking-wider">
            {project.tags?.slice(0, 2).join(" · ")}
          </p>
        </div>
        {(project.liveUrl || project.githubUrl) && (
          <FiArrowUpRight className="text-slate-400 group-hover:text-[#39ff88] transition-colors mt-0.5 flex-shrink-0" />
        )}
      </div>
    </>
  );
}

export default ProjectTicker;
