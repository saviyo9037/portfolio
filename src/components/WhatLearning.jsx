import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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
      <div className="mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* LEFT SIDE IMAGE */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            // src={learningImg}
            alt="Learning"
            className="w-72 sm:w-80 md:w-96 rounded-xl shadow-lg"
          />
        </div>

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
