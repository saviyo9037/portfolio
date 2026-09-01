import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SocialIcons from "./SocialIcons";
import { FiMail, FiPhone, FiCopy, FiCheck } from "react-icons/fi";

function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const headingRef = useRef(null);

  // Scroll-driven heading reveal
  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ["start 90%", "start 40%"],
  });
  const headingX = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);
  const headingX2 = useTransform(scrollYProgress, [0, 1], ["20%", "0%"]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const marqueeItems = (text, count = 6) =>
    [...Array(count)].map((_, i) => (
      <span
        key={i}
        className="text-[14vw] md:text-[10vw] font-['Anton'] uppercase leading-[0.9] tracking-tight whitespace-nowrap px-[2vw] text-[var(--text-main)]"
      >
        {text}
        <span className="text-[var(--text-dim)] mx-[1vw]">✦</span>
      </span>
    ));

  // Magnetic button component
  const MagneticButton = ({ children, className, onClick, ...props }) => {
    const btnRef = useRef(null);
    const [pos, setPos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
      const rect = btnRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      setPos({
        x: (e.clientX - centerX) * 0.2,
        y: (e.clientY - centerY) * 0.2,
      });
    };

    return (
      <motion.button
        ref={btnRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setPos({ x: 0, y: 0 })}
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: "spring", stiffness: 200, damping: 12, mass: 0.1 }}
        onClick={onClick}
        className={className}
        {...props}
      >
        {children}
      </motion.button>
    );
  };

  return (
    <section className="relative section-dark">
      <div className="container-custom section-padding">
        {/* Section Label */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-16 md:mb-24"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-[var(--text-muted)] font-medium">
            06
          </span>
          <motion.div
            className="divider flex-1"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "left" }}
          />
          <span className="text-xs tracking-[0.3em] uppercase text-[var(--text-muted)] font-medium">
            Contact
          </span>
        </motion.div>

        {/* Big CTA Heading — Scroll-driven reveal from sides */}
        <div ref={headingRef} className="overflow-hidden mb-12 md:mb-16">
          <motion.div style={{ x: headingX, opacity: headingOpacity }}>
            <h2 className="text-5xl md:text-7xl lg:text-[8vw] font-['Anton'] uppercase leading-[0.9]">
              Let's Work
            </h2>
          </motion.div>
          <motion.div style={{ x: headingX2, opacity: headingOpacity }}>
            <h2 className="text-5xl md:text-7xl lg:text-[8vw] font-['Anton'] uppercase leading-[0.9] md:ml-[10vw]">
              Together
            </h2>
          </motion.div>
        </div>

        <motion.p
          className="text-base md:text-lg text-[var(--text-muted)] leading-[1.8] max-w-xl mb-12"
          variants={fadeUp}
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Currently open to new opportunities. Feel free to reach out for
          collaborations, freelance projects, or just a friendly chat.
        </motion.p>

        {/* Contact Info Grid — Glassmorphism */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-16"
          variants={fadeUp}
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Email — Glass Card */}
          <motion.div
            className="glass-card p-6 md:p-8 group rounded-xl relative overflow-hidden"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
          >
            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-0 rounded-xl border border-white/10" />
              <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] rounded-xl"
                style={{
                  background: "conic-gradient(from 0deg, transparent, rgba(255,255,255,0.08), transparent, transparent)",
                  animation: "spin-slow 4s linear infinite",
                }}
              />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs tracking-[0.2em] uppercase text-[var(--text-dim)]">
                  Email
                </span>
                <FiMail className="text-[var(--text-dim)] group-hover:text-[var(--text-main)] transition-colors" />
              </div>
              <a
                href="mailto:saviyogeorge903734@gmail.com"
                className="text-lg md:text-xl font-medium break-all hover:text-[var(--text-muted)] transition-colors block mb-4"
              >
                saviyogeorge903734@gmail.com
              </a>
              <MagneticButton
                onClick={() => copyToClipboard("saviyogeorge903734@gmail.com", "email")}
                className="text-xs tracking-[0.15em] uppercase text-[var(--text-dim)] hover:text-[var(--text-main)] transition-colors flex items-center gap-2"
              >
                {copiedEmail ? (
                  <>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      <FiCheck className="text-sm text-green-400" />
                    </motion.span>
                    <span className="text-green-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <FiCopy className="text-sm" /> Copy
                  </>
                )}
              </MagneticButton>
            </div>
          </motion.div>

          {/* Phone — Glass Card */}
          <motion.div
            className="glass-card p-6 md:p-8 group rounded-xl relative overflow-hidden"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
          >
            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-0 rounded-xl border border-white/10" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs tracking-[0.2em] uppercase text-[var(--text-dim)]">
                  Phone
                </span>
                <FiPhone className="text-[var(--text-dim)] group-hover:text-[var(--text-main)] transition-colors" />
              </div>
              <a
                href="tel:+919037348073"
                className="text-lg md:text-xl font-medium hover:text-[var(--text-muted)] transition-colors block mb-4"
              >
                +91 9037 348 073
              </a>
              <MagneticButton
                onClick={() => copyToClipboard("+919037348073", "phone")}
                className="text-xs tracking-[0.15em] uppercase text-[var(--text-dim)] hover:text-[var(--text-main)] transition-colors flex items-center gap-2"
              >
                {copiedPhone ? (
                  <>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      <FiCheck className="text-sm text-green-400" />
                    </motion.span>
                    <span className="text-green-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <FiCopy className="text-sm" /> Copy
                  </>
                )}
              </MagneticButton>
            </div>
          </motion.div>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          variants={fadeUp}
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <SocialIcons />
        </motion.div>
      </div>

      {/* Marquee Footer Strip */}
      <div className="border-t border-[var(--border-subtle)] py-6 overflow-hidden">
        <div className="marquee-track-reverse">
          {marqueeItems("Say Hello")}
          {marqueeItems("Say Hello")}
        </div>
      </div>

      {/* Footer */}
      <motion.div
        className="container-custom py-8 border-t border-[var(--border-subtle)]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--text-dim)] tracking-widest uppercase">
            © 2026 Saviyo George
          </p>
          <p className="text-xs text-[var(--text-dim)] tracking-wider">
            Built with React & Framer Motion
          </p>
        </div>
      </motion.div>
    </section>
  );
}

export default Contact;
