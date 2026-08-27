import React from "react";
import { motion } from "framer-motion";
import { skills } from "../data/skills";

function Skills() {
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
            SYS.GET<span className="text-cyan">("SKILLS")</span>
          </h1>
          <div className="barcode-divider mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative w-full">
          {skills.map((categoryGroup, index) => (
            <SkillCard
              key={index}
              categoryGroup={categoryGroup}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const SkillCard = ({ categoryGroup, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative w-full rounded-3xl p-8 flex flex-col bg-zinc-900 border border-zinc-800 shadow-xl overflow-hidden group hover:border-zinc-700 transition-colors"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

      <h2 className="text-xl md:text-2xl font-bold mb-6 font-mono text-[#00F0FF] border-b border-white/10 pb-4 relative z-10 group-hover:text-cyan-400 transition-colors">
        [{categoryGroup.category}]
      </h2>
      
      <ul className="flex flex-col gap-4 font-mono text-sm text-[#A1A1AA] relative z-10 flex-1">
        {categoryGroup.items.map((skill, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="text-[#FFB000] mt-1 font-bold text-lg">&gt;</span>
            <span className="leading-relaxed text-base">{skill}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Skills;
