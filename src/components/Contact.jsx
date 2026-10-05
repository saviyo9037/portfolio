import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import SocialIcons from "./SocialIcons";
import { FiMail, FiPhone, FiCopy, FiCheck } from "react-icons/fi";

function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const headingRef = useRef(null);
  const sectionRef = useRef(null);

  // Scroll-driven heading reveal
  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ["start 90%", "start 40%"],
  });
  const headingX = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);
  const headingX2 = useTransform(scrollYProgress, [0, 1], ["20%", "0%"]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const headingScale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const headingRotate = useTransform(scrollYProgress, [0, 1], [-5, 0]);

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
        className="text-[14vw] md:text-[10vw] font-['Anton'] uppercase leading-[0.9] tracking-tight whitespace-nowrap px-[2vw] text-transparent text-stroke"
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
        x: (e.clientX - centerX) * 0.3,
        y: (e.clientY - centerY) * 0.3,
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
    <section ref={sectionRef} className="relative overflow-hidden bg-transparent text-[var(--text-main)]">
      {/* Animated mesh background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[120px]"
          style={{ background: "rgba(99,102,241,0.08)" }}
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -80, 60, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[100px]"
          style={{ background: "rgba(236,72,153,0.07)" }}
          animate={{
            x: [0, -80, 50, 0],
            y: [0, 60, -40, 0],
            scale: [1, 0.9, 1.15, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container-custom section-padding relative z-10">
        {/* Section Label */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-16 md:mb-24"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-emerald-400 font-bold bg-emerald-950/40 px-4 py-2 rounded-full border border-emerald-500/30">
            06
          </span>
          <motion.div
            className="divider flex-1 border-t border-white/10"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "left" }}
          />
          <span className="text-xs tracking-[0.3em] uppercase text-slate-400 font-medium">
            Contact
          </span>
        </motion.div>

        {/* Big CTA Heading — 3D Scroll-driven reveal */}
        <div ref={headingRef} className="overflow-hidden mb-12 md:mb-16" style={{ perspective: "1500px" }}>
          <motion.div style={{ x: headingX, opacity: headingOpacity, scale: headingScale, rotateX: headingRotate }}>
            <h2 className="text-6xl md:text-8xl lg:text-[9vw] font-['Anton'] uppercase leading-[0.85] heading-gradient">
              Let's Work
            </h2>
          </motion.div>
          <motion.div style={{ x: headingX2, opacity: headingOpacity, scale: headingScale, rotateX: headingRotate }}>
            <h2 className="text-6xl md:text-8xl lg:text-[9vw] font-['Anton'] uppercase leading-[0.85] md:ml-[10vw] text-white">
              Together
            </h2>
          </motion.div>
        </div>

        <motion.p
          className="text-lg md:text-xl text-slate-300 leading-[1.8] max-w-xl mb-16 font-light"
          variants={fadeUp}
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Currently open to new opportunities. Feel free to reach out for
          collaborations, freelance projects, or just a friendly chat.
        </motion.p>

        {/* Contact Info Grid — Premium Glassmorphism */}
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
            className="relative p-8 md:p-10 group rounded-2xl overflow-hidden bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] shadow-xl transition-all duration-300"
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs tracking-[0.2em] uppercase text-[var(--text-dim)] bg-[var(--badge-bg)] px-3 py-1.5 rounded-full border border-[var(--badge-border)]">
                  Email
                </span>
                <FiMail className="text-xl text-[var(--text-dim)] group-hover:text-[var(--text-main)] group-hover:scale-110 transition-all duration-300" />
              </div>
              <a
                href="mailto:saviyogeorge903734@gmail.com"
                className="text-xl md:text-3xl font-light text-[var(--text-main)] hover:text-emerald-400 hover:italic transition-all duration-300 link-underline block mb-6 break-all"
                data-cursor-label="HIRE ME"
              >
                saviyogeorge903734@gmail.com
              </a>
              <MagneticButton
                onClick={() => copyToClipboard("saviyogeorge903734@gmail.com", "email")}
                className="text-xs tracking-[0.15em] uppercase text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors flex items-center gap-2 bg-[var(--badge-bg)] hover:opacity-90 px-4 py-2 rounded-full border border-[var(--badge-border)] shadow-sm cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      <FiCheck className="text-sm text-emerald-400" />
                    </motion.span>
                    <span className="text-emerald-400 font-semibold">Copied!</span>
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
            className="relative p-8 md:p-10 group rounded-2xl overflow-hidden bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] shadow-xl transition-all duration-300"
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs tracking-[0.2em] uppercase text-[var(--text-dim)] bg-[var(--badge-bg)] px-3 py-1.5 rounded-full border border-[var(--badge-border)]">
                  Phone
                </span>
                <FiPhone className="text-xl text-[var(--text-dim)] group-hover:text-[var(--text-main)] group-hover:scale-110 transition-all duration-300" />
              </div>
              <a
                href="tel:+919037348073"
                className="text-xl md:text-2xl font-semibold text-[var(--text-main)] hover:text-emerald-400 transition-colors block mb-6 tracking-tight"
              >
                +91 9037 348 073
              </a>
              <MagneticButton
                onClick={() => copyToClipboard("+919037348073", "phone")}
                className="text-xs tracking-[0.15em] uppercase text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors flex items-center gap-2 bg-[var(--badge-bg)] hover:opacity-90 px-4 py-2 rounded-full border border-[var(--badge-border)] shadow-sm cursor-pointer"
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

      {/* Footer */}
      <motion.div
        className="container-custom py-10 border-t border-[var(--border-subtle)] relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--text-dim)] tracking-widest uppercase">
            © 2026 Saviyo George
          </p>
          <p className="text-xs text-[var(--text-dim)] tracking-wider flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_#4ade80]" />
            Built with React & Framer Motion
          </p>
        </div>
      </motion.div>
    </section>
  );
}

export default Contact;
