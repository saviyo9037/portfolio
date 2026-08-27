import React from "react";
import { motion } from "framer-motion";
import { experience } from "../data/experience";

function Education() {
  const educationData = experience.filter(item => item.type === "education");

  return (
    <section className="relative bg-[#09090B] py-24 px-6 overflow-hidden">
      <div className="relative max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col items-center md:items-start"
        >
          <h1 className="text-3xl md:text-5xl font-bold font-mono">
            SYS.GET<span className="text-cyan">("EDUCATION")</span>
          </h1>
          <div className="barcode-divider mt-6 self-center md:self-start" />
        </motion.div>

        <div className="flex flex-col gap-8 border-l-2 border-[#18181B] pl-6 ml-4">
          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative thermal-card receipt-edge p-6 sm:p-8"
            >
              {/* Timeline marker */}
              <div className="absolute w-4 h-4 rounded-full bg-[#00F0FF] -left-[35px] top-10 border-4 border-[#09090B]" />
              
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <h2 className="text-xl md:text-2xl font-bold font-mono text-[#FAFAFA]">
                  {edu.degree}
                </h2>
                <span className="text-sm font-mono text-[#FFB000] bg-[#FFB000]/10 px-3 py-1 rounded-sm border border-[#FFB000]/20">
                  {edu.period}
                </span>
              </div>
              
              <div className="flex items-center gap-2 mb-2 font-mono text-[#A1A1AA]">
                <span className="font-semibold text-white">{edu.institution}</span>
                <span>//</span>
                <span>{edu.location}</span>
              </div>
              
              {edu.description && (
                <p className="text-[#A1A1AA] leading-relaxed mt-4">
                  {edu.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;
