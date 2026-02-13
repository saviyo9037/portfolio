import React from "react";
import { motion } from "framer-motion";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGitAlt,
} from "react-icons/fa";
import { SiMongodb, SiExpress, SiPostman, SiTailwindcss } from "react-icons/si";

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "HTML", icon: FaHtml5, color: "text-orange-500" },
      { name: "CSS", icon: FaCss3Alt, color: "text-blue-500" },
      { name: "JavaScript", icon: FaJs, color: "text-yellow-400" },
      { name: "React", icon: FaReact, color: "text-cyan-400" },
      { name: "Tailwind", icon: SiTailwindcss, color: "text-cyan-400" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: FaNodeJs, color: "text-green-500" },
      { name: "Express.js", icon: SiExpress, color: "text-gray-400" },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "MongoDB", icon: SiMongodb, color: "text-green-600" },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", icon: FaGitAlt, color: "text-orange-600" },
      { name: "Postman", icon: SiPostman, color: "text-orange-500" },
    ],
  },
];

function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const skillItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  };

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Title */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-gradient">Skills & Technologies</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A comprehensive overview of my technical expertise and the technologies I work with
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                variants={itemVariants}
                className="glass rounded-2xl p-6"
                whileHover={{ y: -5 }}
              >
                {/* Category Title */}
                <h3 className="text-xl font-semibold text-white mb-6 text-center">
                  {category.title}
                </h3>

                {/* Skills List */}
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      variants={skillItemVariants}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                      whileHover={{ scale: 1.05 }}
                    >
                      <skill.icon className={`text-2xl ${skill.color}`} />
                      <span className="text-gray-300 font-medium">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;
