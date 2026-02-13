import React from "react";
import SocialIcons from "./SocialIcons";
import ActionButtons from "./ActionButtons";
import { motion } from "framer-motion";
import introGif from "../assets/Gif/introductio.gif";

function Introduction() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
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

  const floatAnimation = {
    y: [0, -15, 0],
    transition: {
      repeat: Infinity,
      duration: 4,
      ease: "easeInOut",
    },
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20" />
      
      {/* Glassmorphism cards in background */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      
      <motion.div
        className="max-w-7xl mx-auto px-6 py-20 relative z-10
                   flex flex-col-reverse md:flex-row items-center gap-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* LEFT CONTENT */}
        <motion.div
          className="w-full md:w-1/2 text-center md:text-left"
          variants={itemVariants}
        >
          <motion.p
            className="text-indigo-400 font-medium mb-4 tracking-wider uppercase"
            variants={itemVariants}
          >
            Hello, I'm
          </motion.p>
          
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4"
            variants={itemVariants}
          >
            <span className="text-gradient">Saviyo George</span>
          </motion.h1>
          
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-300 mb-6"
            variants={itemVariants}
          >
            Full Stack Developer
          </motion.h2>

          <motion.p
            className="text-lg sm:text-xl text-gray-400 mb-8 max-w-xl"
            variants={itemVariants}
          >
            Building modern web applications with cutting-edge technologies.
            Passionate about creating seamless user experiences and scalable solutions.
          </motion.p>

          <motion.div variants={itemVariants}>
            <ActionButtons />
          </motion.div>

          <motion.div className="mt-8" variants={itemVariants}>
            <SocialIcons />
          </motion.div>
        </motion.div>

        {/* RIGHT IMAGE/GIF */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          variants={itemVariants}
          animate={floatAnimation}
        >
          <div className="relative">
            {/* Glow effect behind image */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-3xl opacity-30 scale-90" />
            
            {/* Image container with glassmorphism */}
            <div className="relative glass-dark rounded-3xl p-2">
              <img
                src={introGif}
                alt="Developer Animation"
                className="w-[280px] sm:w-[360px] md:w-[450px] rounded-2xl"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 border-2 border-indigo-400/50 rounded-full flex justify-center pt-2">
          <motion.div
            className="w-1.5 h-1.5 bg-indigo-400 rounded-full"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </div>
      </motion.div>
    </section>
  );
}

export default Introduction;
