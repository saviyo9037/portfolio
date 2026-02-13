import React, { useState } from "react";
import { motion } from "framer-motion";
import SocialIcons from "./SocialIcons";
import saviyo from "../assets/saviyo.jpeg";

function Contact() {
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  return (
    <section className="relative bg-[#0b0b14] text-white py-24 px-6 overflow-hidden">

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">

        <div className="md:w-2/3 text-center md:text-left">

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Let’s Build Something{" "}
            <span className="text-purple-500">Amazing Together</span>
          </h1>

          <p className="text-gray-300 text-lg mb-8 max-w-xl">
            Have a project or opportunity? Let’s connect.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-6">

            <button
              onClick={() => setShowEmail(!showEmail)}
              className="bg-purple-600 hover:bg-purple-700 
                         px-6 py-3 rounded-full 
                         font-medium shadow-lg 
                         transition duration-300"
            >
              📩 Show Email
            </button>

            <button
              onClick={() => setShowPhone(!showPhone)}
              className="bg-green-600 hover:bg-green-700 
                         px-6 py-3 rounded-full 
                         font-medium shadow-lg 
                         transition duration-300"
            >
              📞 Show Phone
            </button>

            <a
              href="/Saviyo_George_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-purple-500 text-purple-400 
                         px-6 py-3 rounded-full 
                         hover:bg-purple-600/20 
                         transition duration-300"
            >
              📄 Download Resume
            </a>

          </div>

          {/* Reveal Section */}
          <div className="flex flex-col gap-4">

            {showEmail && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-md 
                           border border-white/10 
                           px-6 py-4 rounded-xl inline-block"
              >
                <p className="text-purple-400 font-medium">
                  saviyogeorge903734@gmail.com
                </p>
              </motion.div>
            )}

            {showPhone && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-md 
                           border border-white/10 
                           px-6 py-4 rounded-xl inline-block"
              >
                <p className="text-green-400 font-medium">
                  9037348073
                </p>
              </motion.div>
            )}

          </div>

          <div className="mt-8">
            <SocialIcons />
          </div>

        </div>

        {/* Image */}
        <div className="md:w-1/3 flex justify-center">
          <img
            src={saviyo}
            alt="Saviyo"
            className="w-56 h-56 rounded-full object-cover
                       border-4 border-purple-500 shadow-2xl"
          />
        </div>

      </div>
    </section>
  );
}

export default Contact;
