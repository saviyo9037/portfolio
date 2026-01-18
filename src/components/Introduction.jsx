import React, { useRef } from "react";
import SocialIcons from "./SocialIcons";
import Skills from "./Skills";
import ActionButtons from "./ActionButtons";
import { motion } from "framer-motion";
import introGif from "../assets/Gif/introductio.gif";

function Introduction() {
  const containerRef = useRef(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.25 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
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
    <section ref={containerRef} className="text-white">
      <motion.div
        className="max-w-7xl mx-auto px-6 py-20
                   flex flex-col-reverse md:flex-row items-center gap-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* LEFT */}
        <motion.div
          className="w-full md:w-1/2 text-center md:text-left"
          variants={itemVariants}
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
            variants={itemVariants}
          >
            Hi all, I'm <span className="text-indigo-400">Saviyo</span> 👋
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg text-slate-300 mb-8"
            variants={itemVariants}
          >
            A passionate Full Stack Software Developer 🚀 experienced in
            building modern web applications using React & Node.js.
          </motion.p>

          <motion.div variants={itemVariants}>
            <SocialIcons />
          </motion.div>

          <motion.div className="mt-6" variants={itemVariants}>
            <ActionButtons />
          </motion.div>
        </motion.div>

        {/* RIGHT – GIF */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          variants={itemVariants}
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
        >
          <img
            src={introGif}
            alt="Developer Animation"
            className="w-[260px] sm:w-[320px] md:w-[420px]"
          />
        </motion.div>
      </motion.div>

    </section>
  );
}

export default Introduction;
