import React from "react";
import { motion } from "framer-motion";
import college from "../assets/college.png";
import plusTwo from "../assets/plusTwo.png";
import tenth from "../assets/tenth.png";
import avodha from "../assets/avodha.png";
import irohub from "../assets/irohub.png";

const educationItems = [
  {
    img: irohub,
    title: "IROHUB INFOTECH",
    degree: "MERN Stack Development",
    duration: "June 2025 - December 2025",
  },
  {
    img: avodha,
    title: "AVODHA",
    degree: "PHP Full Stack Development",
    duration: "August 2024 - February 2025",
  },
  {
    img: college,
    title: "Sree Sabareesa College, Murikkumvayal",
    degree: "Bachelor of Computer Applications (BCA)",
    duration: "September 2021 - March 2024",
  },
  {
    img: plusTwo,
    title: "J.J. Murphy Memorial HSS Yendayar",
    degree: "Computer Science",
    duration: "2019 - 2021",
  },
  {
    img: tenth,
    title: "St George HS Mukkulam",
    degree: "SSLC",
    duration: "March 2019",
  },
];

function Education() {
  return (
    <section className="relative bg-[#0b0b14] text-white py-24 px-6 overflow-hidden">

      {/* Background glow effects */}
      <div className="absolute top-[-120px] left-[-120px] w-80 h-80 bg-purple-600 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-80 h-80 bg-indigo-600 opacity-20 blur-3xl rounded-full"></div>

      <div className="relative max-w-5xl mx-auto">
        
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-20">
          My <span className="text-purple-500">Education</span>
        </h1>

        <div className="relative border-l border-white/10">

          {educationItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="mb-16 ml-6"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-3 w-6 h-6 bg-purple-600 rounded-full border-4 border-[#0b0b14]"></div>

              {/* Card */}
              <div className="bg-white/5 backdrop-blur-xl 
                              border border-white/10 
                              p-6 rounded-2xl shadow-xl 
                              hover:shadow-purple-500/20 
                              transition duration-500">

                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-16 h-16 object-contain rounded-lg bg-white p-2"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">
                      {item.title}
                    </h2>
                    <p className="text-purple-400 font-medium">
                      {item.degree}
                    </p>
                  </div>
                </div>

                <p className="text-gray-400 text-sm">
                  {item.duration}
                </p>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default Education;
