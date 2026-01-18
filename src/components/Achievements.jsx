import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
      desc: "Practical exposure to cybersecurity and penetration testing basics.",
    },
  ];

  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={targetRef}
      className="text-white py-16 px-6"
    >
      <div className="mx-auto">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Achievements & Certifications 🏆
        </h1>

        <p className="text-gray-400 mb-10">
          Click on any certificate to view it in full size.
        </p>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {certificates.map((certificate, index) => {
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
                onClick={() => setSelectedImage(certificate.img)}
                className="bg-slate-900 rounded-xl shadow-lg overflow-hidden
                         hover:scale-105 transition duration-300 cursor-pointer"
              >
                <img
                  src={certificate.img}
                  alt={certificate.title}
                  className="w-full h-56 object-cover"
                />

                <div className="p-4">
                  <h3 className="text-lg font-semibold">{certificate.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    {certificate.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* FULL IMAGE MODAL */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50
                       flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 text-white text-4xl font-bold"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>

            {/* Image */}
            <img
              src={selectedImage}
              alt="Certificate Full View"
              className="max-w-[90%] max-h-[90%] object-contain"
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default Achievements;
