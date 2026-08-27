import React from "react";
import { motion } from "framer-motion";
import { projects } from "../data/projects";

function Projects() {
  return (
    <section className="relative bg-[#09090B] py-24 px-6 overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col items-center"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-center font-mono">
            SYS.GET<span className="text-cyan">("PROJECTS")</span>
          </h1>
          <div className="barcode-divider mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`thermal-card receipt-edge p-8 flex flex-col h-full ${project.featured ? "md:col-span-2 lg:col-span-2 bg-[#18181B]" : ""}`}
            >
              <h2 className="text-xl font-bold mb-2 font-mono text-[#FAFAFA]">
                {project.title}
              </h2>
              {project.company && (
                <div className="text-sm font-mono text-[#00F0FF] mb-4 opacity-80">
                  @ {project.company}
                </div>
              )}
              
              <p className="text-[#A1A1AA] mb-6 flex-grow leading-relaxed">
                {project.description}
              </p>
              
              <div className="mt-auto">
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="text-xs font-mono text-[#FFB000] bg-[#FFB000]/10 px-2 py-1 rounded-sm border border-[#FFB000]/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="flex gap-4 border-t border-white/10 pt-4 mt-4 font-mono text-sm">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00F0FF] hover:underline"
                    >
                      [ LIVE_DEMO ]
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00F0FF] hover:underline"
                    >
                      [ SOURCE_CODE ]
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
