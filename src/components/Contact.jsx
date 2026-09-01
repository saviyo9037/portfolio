import React, { useState } from "react";
import { motion } from "framer-motion";
import SocialIcons from "./SocialIcons";
import { FiMail, FiPhone, FiCopy, FiCheck } from "react-icons/fi";

function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

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
      </span>
    ));

  return (
    <section className="bg-[var(--bg-base)] border-t border-[var(--border-subtle)]">
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
          <div className="divider flex-1" />
          <span className="text-xs tracking-[0.3em] uppercase text-[var(--text-muted)] font-medium">
            Contact
          </span>
        </motion.div>

        {/* Big CTA Heading */}
        <div className="overflow-hidden mb-12 md:mb-16">
          <motion.h2
            className="text-5xl md:text-7xl lg:text-[8vw] font-['Anton'] uppercase leading-[0.9]"
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            Let's Work
            <br />
            Together
          </motion.h2>
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

        {/* Contact Info Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-16"
          variants={fadeUp}
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Email */}
          <div className="border border-[var(--border-subtle)] p-6 md:p-8 group hover:border-[var(--border-hover)] transition-colors duration-500">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs tracking-[0.2em] uppercase text-[var(--text-dim)]">
                Email
              </span>
              <FiMail className="text-[var(--text-dim)]" />
            </div>
            <a
              href="mailto:saviyogeorge903734@gmail.com"
              className="text-lg md:text-xl font-medium break-all hover:text-[var(--text-muted)] transition-colors block mb-4"
            >
              saviyogeorge903734@gmail.com
            </a>
            <button
              onClick={() =>
                copyToClipboard("saviyogeorge903734@gmail.com", "email")
              }
              className="text-xs tracking-[0.15em] uppercase text-[var(--text-dim)] hover:text-[var(--text-main)] transition-colors flex items-center gap-2"
            >
              {copiedEmail ? (
                <>
                  <FiCheck className="text-sm" /> Copied
                </>
              ) : (
                <>
                  <FiCopy className="text-sm" /> Copy
                </>
              )}
            </button>
          </div>

          {/* Phone */}
          <div className="border border-[var(--border-subtle)] p-6 md:p-8 group hover:border-[var(--border-hover)] transition-colors duration-500">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs tracking-[0.2em] uppercase text-[var(--text-dim)]">
                Phone
              </span>
              <FiPhone className="text-[var(--text-dim)]" />
            </div>
            <a
              href="tel:+919037348073"
              className="text-lg md:text-xl font-medium hover:text-[var(--text-muted)] transition-colors block mb-4"
            >
              +91 9037 348 073
            </a>
            <button
              onClick={() => copyToClipboard("+919037348073", "phone")}
              className="text-xs tracking-[0.15em] uppercase text-[var(--text-dim)] hover:text-[var(--text-main)] transition-colors flex items-center gap-2"
            >
              {copiedPhone ? (
                <>
                  <FiCheck className="text-sm" /> Copied
                </>
              ) : (
                <>
                  <FiCopy className="text-sm" /> Copy
                </>
              )}
            </button>
          </div>
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
      <div className="container-custom py-8 border-t border-[var(--border-subtle)]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--text-dim)] tracking-widest uppercase">
            © 2026 Saviyo George
          </p>
          <p className="text-xs text-[var(--text-dim)] tracking-wider">
            Built with React & Framer Motion
          </p>
        </div>
      </div>
    </section>
  );
}

export default Contact;
