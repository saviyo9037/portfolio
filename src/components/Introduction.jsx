import React from "react";
import SocialIcons from "./SocialIcons";
import ActionButtons from "./ActionButtons";
import { motion } from "framer-motion";

function Introduction() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#09090B]">
      {/* Decorative scanline background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(transparent 50%, rgba(0,0,0,0.25) 50%)', backgroundSize: '100% 4px' }} />
      
      <motion.div
        className="max-w-7xl mx-auto px-6 py-20 relative z-10 flex flex-col items-center justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* CENTERED CONTENT */}
        <motion.div className="w-full max-w-4xl flex flex-col items-center text-center" variants={itemVariants}>
          <motion.p className="font-mono text-[#00F0FF] mb-2 text-sm md:text-base" variants={itemVariants}>
            SYS.INIT // USER DETECTED
          </motion.p>
          
          <motion.h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 font-mono tracking-tighter" variants={itemVariants}>
            SAVIYO GEORGE
          </motion.h1>
          
          <motion.h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#FFB000] mb-8 font-mono" variants={itemVariants}>
            Full Stack Developer | MERN Stack | React.js | Node.js | PHP
          </motion.h2>

          <motion.p className="text-base sm:text-lg md:text-xl text-[#A1A1AA] mb-12 leading-relaxed" variants={itemVariants}>
            As a Full Stack Developer specializing in the MERN stack, I excel in building responsive and scalable web applications. With hands-on experience integrating front-end and back-end technologies, I've contributed to real-world applications through project-based training. My technical skills, paired with a commitment to continuous learning, let me deliver effective solutions.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full">
            <ActionButtons />
          </motion.div>
          
          <motion.div variants={itemVariants} className="mt-8">
             <SocialIcons />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Introduction;
