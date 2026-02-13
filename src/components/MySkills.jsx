import React from "react";
import { motion } from "framer-motion";
import skillsGif from "../assets/Gif/manOnTable.svg";

const proficiency = [
  { name: "Frontend / UI Design", level: 80 },
  { name: "Backend Development", level: 70 },
  { name: "Programming Logic", level: 65 },
];

function Proficiency() {
  return (
    <section className="relative bg-[#0b0b14] text-white py-24 px-6 overflow-hidden">

      {/* Floating background effects */}
      <div className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-purple-600 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-72 h-72 bg-indigo-600 opacity-20 blur-3xl rounded-full"></div>

      <div className="relative max-w-6xl mx-auto 
                      bg-white/5 backdrop-blur-xl 
                      border border-white/10 
                      rounded-3xl p-10 
                      flex flex-col md:flex-row 
                      items-center justify-between gap-16 shadow-2xl">

        {/* LEFT SIDE */}
        <motion.div
          className="md:w-1/2 w-full"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-12">
            My <span className="text-purple-500">Proficiency</span>
          </h1>

          {proficiency.map((skill, index) => (
            <div key={index} className="mb-10">
              
              <div className="flex justify-between items-center mb-3">
                <p className="text-gray-300 text-lg tracking-wide">
                  {skill.name}
                </p>
                <span className="text-purple-400 font-semibold">
                  {skill.level}%
                </span>
              </div>

              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r 
                             from-purple-500 via-indigo-500 to-pink-500 
                             rounded-full shadow-lg"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.3, ease: "easeInOut" }}
                />
              </div>
            </div>
          ))}
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          className="md:w-1/2 w-full flex justify-center"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative group">
            
            <div className="absolute inset-0 bg-purple-600 
                            blur-3xl opacity-30 
                            group-hover:opacity-50 
                            transition duration-500 
                            rounded-full"></div>

            <img
              src={skillsGif}
              alt="Skills Illustration"
              className="relative w-80 md:w-96 
                         transition-transform duration-500 
                         group-hover:scale-105"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default Proficiency;
