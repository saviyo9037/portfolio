import React from "react";
import { motion } from "framer-motion";
import expGif from "../assets/Gif/developerActivity.svg";

function Experiences() {
  return (
    <section className="relative bg-[#0b0b14] text-white py-24 px-6 overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-[-120px] right-[-120px] w-80 h-80 bg-indigo-600 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-120px] left-[-120px] w-80 h-80 bg-purple-600 opacity-20 blur-3xl rounded-full"></div>

      <div className="relative max-w-6xl mx-auto">

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-20 text-center">
          My <span className="text-purple-500">Experience</span>
        </h1>

        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* LEFT – Experience Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 backdrop-blur-xl 
                       border border-white/10 
                       rounded-3xl shadow-2xl 
                       p-8 w-full lg:w-[500px] 
                       hover:shadow-purple-500/20 
                       transition duration-500"
          >
            {/* Company Badge */}
            <div className="inline-block mb-6 px-4 py-2 
                            bg-purple-600/20 
                            border border-purple-500 
                            rounded-full text-purple-400 text-sm font-semibold">
              IROHUB INFOTECH
            </div>

            <h2 className="text-2xl font-semibold mb-2">
              MERN Stack Developer Intern
            </h2>

            <p className="text-gray-400 mb-6">
              June 2025 – December 2025
            </p>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Contributed to full-stack web applications focusing on scalable
              backend architecture and modern responsive frontend design.
            </p>

            <ul className="space-y-3 text-gray-300">
              <li>✔ Built RESTful APIs using Node.js & Express</li>
              <li>✔ Designed MongoDB schemas with Mongoose</li>
              <li>✔ Developed responsive UI using React & Tailwind</li>
              <li>✔ Used Git & GitHub for version control</li>
            </ul>
          </motion.div>

          {/* RIGHT – Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-purple-600 
                            blur-3xl opacity-30 
                            rounded-full"></div>

            <motion.img
              src={expGif}
              alt="Developer Illustration"
              className="relative w-80 md:w-[420px]"
              animate={{ y: [0, -15, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default Experiences;
