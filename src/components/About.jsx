import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { scrollToId } from "../lib/scroll";
import { SAVIYO_PROFILE } from "../data/chatbotKnowledge";

const ACCENT = "#ffc933";

const Label = ({ children }) => (
  <p className="m-0 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-dim)]">{children}</p>
);

export default function About() {
  return (
    <section id="about-details" className="relative mx-auto w-full max-w-[1680px] px-5 py-20 md:px-8 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="m-0 text-xs font-semibold uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
          About
        </p>
        <h2
          className="mb-0 mt-4 max-w-[18ch] text-[clamp(2.1rem,4.4vw,3.9rem)] font-black leading-[1.02] tracking-tighter text-[var(--text-main)]"
          style={{ fontFamily: "'Inter', sans-serif", textTransform: "none" }}
        >
          Engineering software that <span style={{ color: ACCENT }}>holds up</span>.
        </h2>

        <div className="mt-12 flex flex-col gap-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 md:p-9 lg:mt-16">
          <p className="m-0 max-w-[60ch] text-lg leading-relaxed text-[var(--text-main)]">
            I architect production-grade platforms where complex enterprise ERP rules, sub-second POS state and physical
            IoT daemons come together into software that businesses rely on every day.
          </p>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <Label>What I build</Label>
              <p className="m-0 mt-2 leading-relaxed text-[var(--text-muted)]">
                Enterprise ERP and POS systems, CRM and LMS platforms and AI-powered tools. Ten-plus ERP modules
                covering billing, inventory, POS, customers and role-based access are in live use.
              </p>
            </div>
            <div>
              <Label>How I work</Label>
              <p className="m-0 mt-2 leading-relaxed text-[var(--text-muted)]">
                TanStack Query optimistic updates and multi-tier state sync keep screens under a second. I also connect
                software to hardware: WebSocket thermal receipts (ESC/POS) and barcode scanner automation.
              </p>
            </div>
          </div>

          <dl className="m-0 grid gap-6 border-t border-[var(--border-subtle)] pt-6 sm:grid-cols-3">
            <div>
              <dt><Label>Based in</Label></dt>
              <dd className="m-0 mt-2 text-[var(--text-main)]">Kerala, India (UTC+5:30)</dd>
            </div>
            <div>
              <dt><Label>Languages</Label></dt>
              <dd className="m-0 mt-2 text-[var(--text-main)]">{SAVIYO_PROFILE.languagesSpoken.join(", ")}</dd>
            </div>
            <div>
              <dt><Label>Availability</Label></dt>
              <dd className="m-0 mt-2 text-[var(--text-main)]">Open to full-time roles, freelance projects and collaborations</dd>
            </div>
          </dl>

          <div>
            <button
              type="button"
              onClick={() => scrollToId("contact")}
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-black transition-colors hover:bg-[#f5f5f5]"
              style={{ backgroundColor: ACCENT }}
            >
              Let's collaborate <FiArrowRight aria-hidden="true" />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
