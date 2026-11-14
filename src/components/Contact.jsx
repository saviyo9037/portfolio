import React, { useState } from "react";
import { Magnetic } from "./motion/effects";
import { FiArrowUpRight, FiCopy, FiCheck, FiGithub, FiLinkedin, FiMail, FiPhone } from "react-icons/fi";

const ACCENT = "#ff4d00";
const EMAIL = "saviyogeorge903734@gmail.com";
const PHONE = "+91 9037 348 073";

function CopyPill(props) {
  const { value, label } = props;
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: the link still works */
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${label}`}
      className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-5 py-3 text-sm font-semibold text-[var(--text-main)] transition-colors hover:border-[#ff4d00]"
    >
      {copied ? <FiCheck aria-hidden="true" style={{ color: ACCENT }} /> : <props.pill.Icon aria-hidden="true" />}
      {copied ? "Copied" : `Copy ${label}`}
    </button>
  );
}

const LINKS = [
  { label: "Call", href: `tel:${PHONE.replace(/\s+/g, "")}`, Icon: FiPhone },
  { label: "GitHub", href: "https://github.com/saviyo9037", Icon: FiGithub, external: true },
  { label: "LinkedIn", href: "https://linkedin.com/in/saviyo-george", Icon: FiLinkedin, external: true },
];

export default function Contact() {
  return (
    <section id="contact" className="mx-auto w-full max-w-[1680px] px-5 py-20 text-center md:px-8 md:py-32">
      <p className="m-0 inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] px-4 py-1.5 text-sm text-[var(--text-muted)]">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        Available for new opportunities
      </p>

      <h2
        className="mb-0 mt-8 text-[clamp(3.5rem,11vw,9rem)] font-black leading-[0.9] tracking-tighter text-[var(--text-main)]"
        style={{ fontFamily: "'Inter', sans-serif", textTransform: "none" }}
      >
        Let's <span className="serif-accent">talk</span>.
      </h2>

      <p className="mx-auto mb-0 mt-6 max-w-[48ch] text-lg leading-relaxed text-[var(--text-muted)]">
        Got an idea, a role or just a question? My inbox is open.
      </p>

      <Magnetic strength={0.12}>
      <a
        href={`mailto:${EMAIL}`}
        className="mx-auto mt-10 inline-flex max-w-full items-center gap-2 border-b-4 pb-2 text-[clamp(0.8rem,4.2vw,1.25rem)] font-bold sm:gap-3 sm:text-xl text-[var(--text-main)] transition-colors hover:text-[var(--accent)] md:text-3xl"
        style={{ borderColor: ACCENT }}
      >
        <FiMail aria-hidden="true" className="shrink-0" style={{ color: ACCENT }} />
        {EMAIL}
      </a>
      </Magnetic>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <CopyPill value={EMAIL} label="email" pill={{ Icon: FiCopy }} />
        {LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-[var(--text-main)] transition-colors hover:text-[var(--accent)]"
          >
            <link.Icon aria-hidden="true" /> {link.label} <FiArrowUpRight aria-hidden="true" className="text-[var(--text-dim)]" />
          </a>
        ))}
      </div>

      <div className="mt-24 flex flex-col items-center justify-between gap-2 border-t border-[var(--border-subtle)] pt-8 text-sm text-[var(--text-muted)] md:flex-row">
        <span>© {new Date().getFullYear()} Saviyo George</span>
        <span>Based in Kerala, India</span>
      </div>
    </section>
  );
}
