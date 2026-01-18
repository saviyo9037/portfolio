import React from "react";
import { motion } from "framer-motion";
import devImg from "../assets/Gif/programmer.svg";
import {
  FaCss3Alt,
  FaHtml5,
  FaJs,
  FaNodeJs,
  FaReact,
} from "react-icons/fa";
import { SiMongodb, SiNpm, SiExpress } from "react-icons/si";

function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 18,
      },
    },
  };

  return (
    <motion.section
      className="text-white w-full"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div
        className="
          w-full
          px-4 sm:px-6 lg:px-12 xl:px-20
          py-14 sm:py-16 lg:py-20
          flex flex-col md:flex-row
          items-center gap-10 md:gap-16
        "
      >
        {/* LEFT IMAGE */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <motion.img
            src={devImg}
            alt="Programmer illustration"
            className="
              w-60 sm:w-72 md:w-[380px] lg:w-[450px]
              rounded-xl
            "
          />
        </motion.div>

        {/* RIGHT CONTENT */}
        <motion.div
          className="w-full md:w-1/2 text-center md:text-left"
          variants={containerVariants}
        >
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4"
            variants={itemVariants}
          >
            What I Do
          </motion.h2>

          <motion.p
            className="uppercase tracking-wide text-slate-400 text-xs sm:text-sm mb-6 sm:mb-8"
            variants={itemVariants}
          >
            MERN Stack Developer building modern full-stack web applications
          </motion.p>

          {/* TECH STACK ICONS */}
          <motion.div
            className="
              flex flex-wrap justify-center md:justify-start
              gap-4 sm:gap-5 lg:gap-6
              text-2xl sm:text-3xl lg:text-4xl
              text-slate-400
              mb-8 sm:mb-10
            "
            variants={containerVariants}
          >
            {[
              FaHtml5,
              FaCss3Alt,
              FaJs,
              FaReact,
              FaNodeJs,
              SiExpress,
              SiMongodb,
              SiNpm,
            ].map((Icon, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.25,
                  rotate: 5,
                  color: "#a855f7",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="cursor-pointer"
              >
                <Icon />
              </motion.div>
            ))}
          </motion.div>

          {/* SKILLS LIST */}
          <motion.ul
            className="
              space-y-3 sm:space-y-4
              text-sm sm:text-base lg:text-lg
              text-slate-300
            "
            variants={containerVariants}
          >
            <motion.li variants={itemVariants}>
              ⚡ Build responsive & interactive UIs using React & Tailwind CSS
            </motion.li>
            <motion.li variants={itemVariants}>
              ⚡ Develop RESTful APIs with Node.js & Express.js
            </motion.li>
            <motion.li variants={itemVariants}>
              ⚡ Design & manage databases using MongoDB & Mongoose
            </motion.li>
            <motion.li variants={itemVariants}>
              ⚡ Implement JWT authentication & authorization
            </motion.li>
            <motion.li variants={itemVariants}>
              ⚡ Deploy full-stack apps using Vercel & Render
            </motion.li>
          </motion.ul>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Skills;
