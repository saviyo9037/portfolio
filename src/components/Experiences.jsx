import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function Experiences() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section
      ref={targetRef}
      className="text-white py-16 sm:py-20 px-4 sm:px-6"
    >
      <div className="mx-auto px-4 sm:px-6 md:px-20">
        {/* Section Title */}
        <h1
          className="text-3xl sm:text-4xl font-bold mb-10 sm:mb-14 
                       border-l-4 border-blue-500 pl-4"
        >
          Experience
        </h1>

        {/* Experience Card Wrapper */}
        <div className="flex justify-center lg:justify-start">
          {/* Experience Card */}
          <motion.div
            style={{ scale, opacity }}
            className="bg-slate-900 rounded-xl overflow-hidden shadow-xl 
                          w-full sm:w-[420px]"
          >
            {/* Top Color Bar */}
            <div
              className="bg-blue-600 h-20 sm:h-24 
                            flex items-center justify-center"
            >
              <h2 className="text-xl sm:text-2xl font-semibold">IROHUB</h2>
            </div>

            {/* Card Content */}
            <div className="p-5 sm:p-6 text-center">
              <h3 className="text-lg sm:text-xl font-semibold">
                MERN Stack Developer Intern
              </h3>

              <p className="text-gray-400 text-sm sm:text-base mt-2">
                June 2025 – December 2025
              </p>

              <p className="text-gray-300 text-sm sm:text-base mt-4">
                Worked as a MERN Stack Developer Intern, contributing to
                full-stack web applications with focus on performance,
                scalability, and clean UI design.
              </p>

              <ul
                className="mt-4 text-left list-disc list-inside 
                             text-gray-300 text-sm sm:text-base space-y-2"
              >
                <li>Developed RESTful APIs using Node.js & Express</li>
                <li>Managed MongoDB collections using Mongoose</li>
                <li>Built responsive user interfaces using React & Tailwind</li>
                <li>Used Git & GitHub for version control</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Experiences;
