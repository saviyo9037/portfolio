import React, { useState } from "react";
import { motion } from "framer-motion";
import irohub from "../assets/certificate/irohub.jpeg";
import avodha from "../assets/certificate/avodha.jpg";
import yip from "../assets/certificate/Yip.jpeg";
import pw2redteam from "../assets/certificate/pw2redteam.jpeg";
import redteamcamp from "../assets/certificate/redteamcamp.jpeg";

function Achievements() {
  const [selectedImage, setSelectedImage] = useState(null);

  const certificates = [
    {
      img: irohub,
      title: "MERN Stack Internship – IROHUB",
      desc: "Completed MERN Stack internship covering React, Node.js, Express & MongoDB.",
    },
    {
      img: avodha,
      title: "Full Stack Development – Avodha",
      desc: "Hands-on training in full-stack web development fundamentals.",
    },
    {
      img: yip,
      title: "Young Innovators Programme (YIP)",
      desc: "Participated in innovation and problem-solving initiatives.",
    },
    {
      img: pw2redteam,
      title: "Red Team Security – PW2",
      desc: "Introduction to ethical hacking and red team security concepts.",
    },
    {
      img: redteamcamp,
      title: "Red Team Camp",
      desc: "Practical exposure to cybersecurity fundamentals.",
    },
  ];

  return (
    <section className="relative bg-[#0b0b14] text-white py-24 px-6 overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-[-120px] left-[-120px] w-80 h-80 bg-purple-600 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-80 h-80 bg-indigo-600 opacity-20 blur-3xl rounded-full"></div>

      <div className="relative max-w-6xl mx-auto">

        {/* Title */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Achievements & <span className="text-purple-500">Certifications</span>
        </motion.h1>

        <p className="text-gray-400 text-center mb-16">
          Click on any certificate to view it in full size.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {certificates.map((certificate, index) => (
            <motion.div
              key={index}
              onClick={() => setSelectedImage(certificate.img)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className="relative group bg-white/5 
                         backdrop-blur-xl 
                         border border-white/10 
                         rounded-3xl 
                         overflow-hidden 
                         shadow-2xl 
                         hover:shadow-purple-500/20 
                         transition duration-500 cursor-pointer"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-purple-600 opacity-0 
                              group-hover:opacity-10 transition duration-500"></div>

              <img
                src={certificate.img}
                alt={certificate.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">
                  {certificate.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {certificate.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 
                     flex items-center justify-center p-6"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <button
              className="absolute -top-10 right-0 text-white text-3xl font-bold"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>

            <img
              src={selectedImage}
              alt="Certificate Full View"
              className="max-w-[90vw] max-h-[85vh] rounded-xl shadow-2xl"
            />
          </motion.div>
        </div>
      )}
    </section>
  );
}

export default Achievements;
