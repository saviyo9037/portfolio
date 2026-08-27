import React, { useState } from "react";
import { motion } from "framer-motion";
import SocialIcons from "./SocialIcons";
import saviyo from "../assets/saviyo.jpeg";

function Contact() {
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  return (
    <section className="relative bg-[#09090B] py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
        
        <div className="md:w-2/3 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-mono">
              SYS.OPEN<span className="text-cyan">("CONTACT")</span>
            </h1>

            <p className="text-[#A1A1AA] text-lg mb-8 max-w-xl font-mono">
              // Connection request pending. Ready to establish secure link.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-8">
              <button
                onClick={() => setShowEmail(!showEmail)}
                className="btn-tech px-6 py-3 rounded-sm"
              >
                [ DECRYPT_EMAIL ]
              </button>

              <button
                onClick={() => setShowPhone(!showPhone)}
                className="btn-tech px-6 py-3 rounded-sm"
              >
                [ DECRYPT_PHONE ]
              </button>
            </div>

            {/* Reveal Section */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-8 min-h-[60px]">
              {showEmail && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-[#18181B] border-l-2 border-cyan px-6 py-3 font-mono text-cyan"
                >
                  saviyogeorge903734@gmail.com
                </motion.div>
              )}

              {showPhone && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-[#18181B] border-l-2 border-amber px-6 py-3 font-mono text-amber"
                >
                  +91 9037348073
                </motion.div>
              )}
            </div>

            <SocialIcons />
          </motion.div>
        </div>

        {/* Image */}
        <motion.div 
          className="md:w-1/3 flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="relative p-2 border border-[#18181B] bg-[#18181B]">
            {/* Tech corner accents */}
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#00F0FF]" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#00F0FF]" />
            
            <img
              src={saviyo}
              alt="Saviyo"
              className="w-56 h-56 md:w-72 md:h-72 object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default Contact;
