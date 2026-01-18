import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import college from "../assets/college.png";
import plusTwo from "../assets/plusTwo.png";
import tenth from "../assets/tenth.png";
import avodha from "../assets/avodha.png";
import irohub from "../assets/irohub.png";

function Education() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const educationItems = [
    {
      img: irohub,
      title: "IROHUB INFOTECH",
      degree: "Mern Stack Development",
      duration: "June 2025 - December 2025",
    },
    {
      img: avodha,
      title: "AVODHA",
      degree: "Php Full Stack Development",
      duration: "August 2024 - February 2025",
    },
    {
      img: college,
      title: "Sree Sabareesa college Murikkumvayal",
      degree: "Bachelor of Computer Applications (BCA)",
      duration: "September-2021 - March 2024",
    },
    {
      img: plusTwo,
      title: "J.J.Murphy Memorial H S S Yendayar",
      degree: "Computer Science",
      duration: "2019 -2021",
    },
    {
      img: tenth,
      title: "St George Hs Mukkulam",
      degree: "SSLC",
      duration: "March-2019",
    },
  ];

  return (
    <section ref={targetRef} className="text-white py-10 md:py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          Education
        </h1>
        {educationItems.map((item, index) => {
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
            <motion.div
              key={index}
              style={{ scale, opacity }}
              className="flex flex-col md:flex-row items-center md:items-start mb-12 p-6 bg-gray-800 rounded-lg shadow-lg gap-6"
            >
              <div className="flex-shrink-0">
                <img
                  className="w-24 h-24 md:w-32 md:h-32 object-contain rounded-full bg-white p-2"
                  src={item.img}
                  alt={item.title}
                />
              </div>
              <div className="text-center md:text-left mt-4 md:mt-0">
                <h1 className="font-bold text-xl md:text-2xl mb-1">
                  {item.title}
                </h1>
                <p className="text-lg md:text-xl font-medium text-indigo-400 mb-1">
                  {item.degree}
                </p>
                <p className="text-md md:text-lg text-slate-300">
                  {item.duration}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default Education;
