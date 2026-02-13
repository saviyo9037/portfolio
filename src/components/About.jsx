import React from "react";
import { motion } from "framer-motion";
import saviyoImage from "../assets/saviyo.jpeg";

function About() {
  const stats = [
    { number: "2+", label: "Years Experience" },
    { number: "10+", label: "Projects Completed" },
    { number: "5+", label: "Technologies" },
  ];

  const technologies = [
    "React",
    "Node.js",
    "MongoDB",
    "Express",
    "JavaScript",
    "Tailwind CSS",
  ];

  return (
    <section className="relative bg-[#0b0b14] text-white py-24 px-6 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-[-120px] right-[-120px] w-80 h-80 bg-indigo-600 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-120px] left-[-120px] w-80 h-80 bg-purple-600 opacity-20 blur-3xl rounded-full"></div>

      <div className="relative max-w-6xl mx-auto">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            About <span className="text-purple-500">Me</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Get to know more about my technical journey and expertise
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT – Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative group">

              {/* Glow */}
              <div className="absolute inset-0 bg-purple-600 
                              blur-3xl opacity-30 
                              group-hover:opacity-50 
                              transition duration-500 
                              rounded-3xl"></div>

              <img
                src={saviyoImage}
                alt="Saviyo"
                className="relative w-72 md:w-96 rounded-3xl 
                           object-cover shadow-2xl 
                           transition duration-500 
                           group-hover:scale-105"
              />

              {/* Floating Experience Badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -bottom-6 -right-6 
                           bg-white/10 backdrop-blur-xl 
                           border border-white/20 
                           px-6 py-4 rounded-2xl shadow-xl"
              >
                <p className="text-2xl font-bold text-purple-400">2+</p>
                <p className="text-xs text-gray-300">Years Experience</p>
              </motion.div>

            </div>
          </motion.div>

          {/* RIGHT – Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl md:text-3xl font-semibold mb-6">
              Full Stack Developer passionate about building scalable web applications
            </h3>

            <p className="text-gray-400 leading-relaxed mb-10">
              I'm a Full Stack Developer specializing in the MERN stack.
              I enjoy designing responsive user interfaces and building
              scalable backend architectures. My goal is to create applications
              that are fast, secure, and visually modern.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-10">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -6 }}
                  className="bg-white/5 backdrop-blur-xl 
                             border border-white/10 
                             rounded-2xl p-6 text-center 
                             shadow-xl transition duration-500"
                >
                  <p className="text-2xl md:text-3xl font-bold text-purple-400">
                    {stat.number}
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Tech Stack */}
            <div>
              <p className="font-medium mb-4">Tech Stack:</p>
              <div className="flex flex-wrap gap-3">
                {technologies.map((tech, index) => (
                  <motion.span
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    className="bg-purple-600/20 border border-purple-500 
                               text-purple-400 px-4 py-2 
                               rounded-full text-sm font-medium"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
