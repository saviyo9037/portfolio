import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight, FiCheck, FiCopy, FiGithub, FiLinkedin, FiMail, FiMapPin, FiPhone, FiSend } from "react-icons/fi";

const ACCENT = "#ff4d00";
const EASE = [0.16, 1, 0.3, 1];
const EMAIL = "saviyogeorge903734@gmail.com";
const PHONE = "+91 9037 348 073";
const TOPICS = ["Web app", "ERP / POS", "CRM / LMS", "AI tool", "Something else"];

const SOCIAL = [
  { label: "GitHub", href: "https://github.com/saviyo9037", Icon: FiGithub },
  { label: "LinkedIn", href: "https://linkedin.com/in/saviyo-george", Icon: FiLinkedin },
];

// One way to reach me: an icon, a label, the value and an action on the right
function ContactRow({ icon, label, value, href, copy, delay, reduce }) {
  const [copied, setCopied] = useState(false);
  const doCopy = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(copy);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: the link still works */
    }
  };

  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className="list-none"
    >
      <a
        href={href}
        className="group flex items-center gap-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 transition-[border-color,transform,background-color] duration-300 hover:translate-x-2 hover:border-[#ff4d00]/70 hover:bg-[#ff4d00]/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ff4d00]"
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl text-white transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110" style={{ backgroundColor: ACCENT }}>
          {icon}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--text-dim)]">{label}</span>
          <span className="block truncate text-base font-semibold text-[var(--text-main)] sm:text-lg">{value}</span>
        </span>
        {copy ? (
          <button
            type="button"
            onClick={doCopy}
            aria-label={`Copy ${label}`}
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-[var(--border-subtle)] px-4 text-sm text-[var(--text-main)] transition-colors hover:border-[#ff4d00]"
          >
            {copied ? <FiCheck aria-hidden="true" style={{ color: ACCENT }} /> : <FiCopy aria-hidden="true" />}
            <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
          </button>
        ) : (
          <FiArrowUpRight aria-hidden="true" className="shrink-0 text-2xl text-[var(--text-dim)] transition-transform duration-300 group-hover:rotate-45 group-hover:text-[#ff4d00]" />
        )}
      </a>
    </motion.li>
  );
}

// A form that writes the email for you and opens your mail app. Nothing is sent to a server.
function ContactForm({ reduce }) {
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");
  const [topic, setTopic] = useState(TOPICS[0]);
  const [touched, setTouched] = useState(false);
  const [sent, setSent] = useState(false);

  const emailOk = /^\S+@\S+\.\S+$/.test(from);
  const valid = name.trim().length > 1 && emailOk && message.trim().length > 9;

  const submit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;
    const subject = `${topic}: message from ${name.trim()}`;
    const body = `${message.trim()}\\n\\n${name.trim()}\\n${from.trim()}`.replace(/\\n/g, "\n");
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field =
    "w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-base)]/60 px-4 py-3.5 text-base text-[var(--text-main)] outline-none transition-[border-color,box-shadow] placeholder:text-[var(--text-dim)] focus:border-[#ff4d00] focus:shadow-[0_0_0_4px_rgba(255,77,0,0.15)]";
  const bad = (cond) => (touched && cond ? "border-red-400/70" : "");

  return (
    <motion.form
      onSubmit={submit}
      noValidate
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, ease: EASE }}
      className="relative overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-9"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,77,0,0.22), transparent 65%)" }} />

      <h3 className="relative m-0 text-2xl text-[var(--text-main)] sm:text-3xl" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, letterSpacing: "-0.03em" }}>
        Tell me about your <span className="serif-accent">idea</span>
      </h3>

      <fieldset className="relative m-0 mt-6 border-0 p-0">
        <legend className="mb-3 p-0 font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--text-dim)]">I need a</legend>
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((t) => {
            const on = topic === t;
            return (
              <button
                key={t}
                type="button"
                aria-pressed={on}
                onClick={() => setTopic(t)}
                className="rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                style={on ? { backgroundColor: ACCENT, color: "#fff" } : { backgroundColor: "#c4b5fd", color: "#1a1030", opacity: 0.8 }}
              >
                {t}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="relative mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm text-[var(--text-muted)]">Your name</span>
          <input className={`${field} ${bad(name.trim().length < 2)}`} value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" autoComplete="name" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm text-[var(--text-muted)]">Your email</span>
          <input className={`${field} ${bad(!emailOk)}`} value={from} onChange={(e) => setFrom(e.target.value)} placeholder="jane@company.com" type="email" autoComplete="email" />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-2 block text-sm text-[var(--text-muted)]">What are you building?</span>
          <textarea className={`${field} min-h-[8.5rem] resize-y ${bad(message.trim().length < 10)}`} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="A few lines about the project, the timeline and who it is for." />
        </label>
      </div>

      <div className="relative mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="hero-shine relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full px-7 text-base font-semibold text-[#0b0a12] transition-colors hover:bg-[#ff4d00] hover:text-white"
          style={{ backgroundColor: "#f4f0ff" }}
        >
          Send message <FiSend aria-hidden="true" />
        </button>
        <p className="m-0 text-sm" role="status" aria-live="polite" style={{ color: touched && !valid ? "#ff8a7a" : "var(--text-dim)" }}>
          {sent ? "Your email app should open with the message ready to send." : touched && !valid ? "Please fill in your name, a valid email and a few lines." : "This opens your email app with everything filled in."}
        </p>
      </div>
    </motion.form>
  );
}

const MARQUEE_WORDS = ["Let's work together", "Let's build something", "Say hello"];

export default function Contact() {
  const reduce = useReducedMotion();

  return (
    <section id="contact" className="relative w-full overflow-hidden py-16 md:py-28">
      {/* A huge line of text sliding across the top */}
      <div aria-hidden="true" className="mb-14 overflow-hidden whitespace-nowrap md:mb-20" style={{ maskImage: "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)" }}>
        <div className="hero-marquee flex w-max items-center gap-10" style={{ animationDuration: "46s" }}>
          {[...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS].map((w, i) => (
            <span key={i} className="inline-flex items-center gap-10 text-[clamp(3rem,9vw,8rem)] leading-none" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, letterSpacing: "-0.05em", color: i % 2 ? "transparent" : "var(--text-main)", WebkitTextStroke: i % 2 ? "1.5px rgba(244,240,255,0.5)" : undefined }}>
              {w}
              <span className="serif-accent text-[0.8em]">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-[1500px] gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-16">
        {/* Left: the message and every way to reach me */}
        <div>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="m-0 inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] px-4 py-1.5 text-sm text-[var(--text-muted)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for new opportunities
          </motion.p>

          <h2 className="mb-0 mt-6 text-[clamp(2.6rem,6.5vw,5.6rem)] leading-[0.98] text-[var(--text-main)]" style={{ fontFamily: "'Inter', sans-serif" }}>
            Have a project <br />
            in <span className="serif-accent">mind</span>?
          </h2>
          <p className="mb-0 mt-6 max-w-[46ch] text-lg leading-relaxed text-[var(--text-muted)]">
            I build web apps, ERP and POS systems and AI-powered tools. Send me a message, and I will reply within a day.
          </p>

          <ul className="m-0 mt-9 space-y-3 p-0">
            <ContactRow icon={<FiMail aria-hidden="true" />} label="Email" value={EMAIL} href={`mailto:${EMAIL}`} copy={EMAIL} delay={0} reduce={reduce} />
            <ContactRow icon={<FiPhone aria-hidden="true" />} label="Phone" value={PHONE} href={`tel:${PHONE.replace(/\s+/g, "")}`} copy={PHONE} delay={0.08} reduce={reduce} />
            <ContactRow icon={<FiMapPin aria-hidden="true" />} label="Based in" value="Kerala, India (IST)" href="https://www.google.com/maps/search/Kerala,+India" delay={0.16} reduce={reduce} />
          </ul>

          <div className="mt-7 flex flex-wrap gap-3">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--border-subtle)] px-5 text-sm font-semibold text-[var(--text-main)] transition-colors hover:border-[#ff4d00] hover:text-[#ff4d00]"
              >
                <s.Icon aria-hidden="true" /> {s.label} <FiArrowUpRight aria-hidden="true" className="text-[var(--text-dim)]" />
              </a>
            ))}
          </div>
        </div>

        {/* Right: the form */}
        <ContactForm reduce={reduce} />
      </div>

      <div className="mx-auto mt-20 flex w-full max-w-[1500px] flex-col items-center justify-between gap-2 border-t border-[var(--border-subtle)] px-5 pt-8 text-sm text-[var(--text-muted)] md:mt-28 md:flex-row md:px-8">
        <span>© {new Date().getFullYear()} Saviyo George</span>
        <span>Designed and built in Kerala, India</span>
      </div>
    </section>
  );
}
