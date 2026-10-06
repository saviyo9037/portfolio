import React, { useState } from "react";
import { motion } from "framer-motion";
import SocialIcons from "./SocialIcons";
import { FiArrowUpRight, FiCopy, FiCheck } from "react-icons/fi";

function Contact() {
  return (
    <section id="contact" className="relative bg-[var(--bg-base)] text-[var(--text-main)] py-20 md:py-32 z-20 border-t border-[var(--border-subtle)]">
      <div className="container-custom relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-16 md:mb-24">
          <span className="font-mono text-sm tracking-[0.3em] uppercase text-[var(--accent)] font-bold flex items-center gap-3">
            [06] CONTACT <span className="h-[1px] w-12 bg-[var(--accent)] opacity-40"></span>
          </span>
          <h2 className="font-['Anton'] text-6xl md:text-8xl uppercase tracking-tight leading-none">
            <span className="text-[var(--text-main)]">Get in</span>{" "}
            <span className="text-[var(--text-muted)] opacity-40">Touch</span>
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-24">
          
          {/* Left Column: Intro & Socials */}
          <div className="flex flex-col gap-10 lg:w-5/12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-2.5 h-2.5 rounded-full bg-[#39ff88] animate-pulse shadow-[0_0_15px_#39ff88]" />
                <span className="font-mono text-sm tracking-widest uppercase text-[var(--text-main)]">
                  Available for new opportunities
                </span>
              </div>
              <p className="text-lg md:text-xl text-[var(--text-muted)] leading-relaxed max-w-md font-light">
                Whether you have an idea for a project, need a developer, or just want to say hi, my inbox is always open. Let's build something amazing together.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col gap-5 pt-4"
            >
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] border-b border-[var(--border-subtle)] pb-4 max-w-xs">
                Connect
              </span>
              <div className="mt-2">
                <SocialIcons />
              </div>
            </motion.div>
          </div>

          {/* Right Column: Contact Details */}
          <div className="flex flex-col gap-12 lg:w-6/12 pt-4 lg:pt-0">
            {/* Email */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <ContactDetail title="Email" value="saviyogeorge903734@gmail.com" type="email" />
            </motion.div>

            {/* Phone */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ContactDetail title="Phone" value="+91 9037 348 073" type="tel" />
            </motion.div>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-32 pt-8 border-t border-[var(--border-subtle)] flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
          <span>© {new Date().getFullYear()} Saviyo George</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#39ff88] rounded-full animate-pulse" /> 
            Based in Kerala, India
          </span>
        </div>

      </div>
    </section>
  );
}

// Contact Detail Component
const ContactDetail = ({ title, value, type }) => {
  const [copied, setCopied] = useState(false);
  const href = type === 'email' ? `mailto:${value}` : `tel:${value.replace(/\s+/g, '')}`;
  
  const copy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4 group">
      <span className="font-mono text-sm uppercase tracking-[0.2em] text-[var(--text-muted)]">
        {title}
      </span>
      
      <div className="flex flex-col gap-4">
        <a 
          href={href}
          className="text-2xl md:text-4xl lg:text-5xl font-['Anton'] tracking-wide text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors inline-flex items-center gap-4 break-all"
        >
          {value}
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[var(--border-subtle)] flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:border-[var(--accent)] transition-all duration-300 shrink-0">
            <FiArrowUpRight className="text-xl" />
          </div>
        </a>
        
        <button 
          onClick={copy}
          className="w-max flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-[var(--text-muted)] transition-all"
        >
          {copied ? (
            <>
              <FiCheck className="text-[#39ff88] text-sm" /> 
              <span className="text-[#39ff88]">Copied</span>
            </>
          ) : (
            <>
              <FiCopy className="text-sm" /> 
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Contact;
