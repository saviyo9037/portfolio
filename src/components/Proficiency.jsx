import React from "react";
import { motion } from "framer-motion";

const proficiency = [
  { name: "Frontend / Design", level: 80 },
  { name: "Backend", level: 70 },
  { name: "Programming", level: 65 },
];

function Proficiency() {
  return (
    <section className="text-white md:min-h-screen flex flex-col md:flex-row items-center justify-center py-10 md:py-20 px-4">
      <div className="md:w-1/2 md:pr-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center md:text-left">
          Proficiency
        </h1>

        {proficiency.map((skill, index) => (
          <div key={index} className="mb-6">
            <p className="text-lg mb-2">{skill.name}</p>

            <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-400 to-indigo-600 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
        {/* illustration / image here */}
        <p className="text-gray-400">Illustration/Image goes here</p>
      </div>
    </section>
  );
}

export default Proficiency;
