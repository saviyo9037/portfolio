import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import learningImg from "../assets/Gif/jsFramework.svg";

function WhatLearning() {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const learningItems = [
    "Advanced React patterns",
    "API optimization",
    "Authentication & authorization best practices",
    "Full-stack deployment",
    "Clean code & project architecture",
  ];

  return (
    <section
      ref={targetRef}
      className="text-white py-16 px-6"
    >
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center gap-10">
        
        {/* LEFT SIDE IMAGE */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.img
            src={learningImg}
            alt="Learning JavaScript Frameworks"
            className="w-72 sm:w-80 md:w-96 rounded-xl shadow-lg"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          />
        </motion.div>

        {/* RIGHT SIDE CONTENT */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8">
            💡 What I’m Learning
          </h1>

          <ul className="space-y-4 text-gray-300 text-base sm:text-lg">
            {learningItems.map((item, index) => {
              const scale = useTransform(
                scrollYProgress,
                [0.1 * index, 0.1 * index + 0.2],
                [0.5, 1]
              );

              const opacity = useTransform(
                scrollYProgress,
                [0.1 * index, 0.1 * index + 0.2],
                [0, 1]
              );

              return (
                <motion.li
                  key={index}
                  style={{ scale, opacity }}
                  className="flex items-center justify-between border-b border-slate-700 pb-2"
                >
                  <span>{item}</span>
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default WhatLearning;
