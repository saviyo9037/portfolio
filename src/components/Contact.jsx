import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import avatar from "../assets/saviyo-cutout.png";
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
        className="group flex items-center gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3.5 transition-[border-color,transform,background-color] duration-300 active:scale-[0.98] sm:gap-4 sm:p-4 md:hover:translate-x-2 hover:border-[#ff4d00]/70 hover:bg-[#ff4d00]/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ff4d00]"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg text-white sm:h-12 sm:w-12 sm:text-xl transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110" style={{ backgroundColor: ACCENT }}>
          {icon}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--text-dim)]">{label}</span>
          <span className="block truncate text-[15px] font-semibold text-[var(--text-main)] sm:text-lg">{value}</span>
        </span>
        {copy ? (
          <button
            type="button"
            onClick={doCopy}
            aria-label={`Copy ${label}`}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center gap-2 rounded-full border border-[var(--border-subtle)] text-sm sm:h-10 sm:w-auto sm:px-4 text-[var(--text-main)] transition-colors hover:border-[#ff4d00]"
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
      className="relative min-w-0 overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 sm:p-9"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,77,0,0.22), transparent 65%)" }} />

      <h3 className="relative m-0 text-2xl text-[var(--text-main)] sm:text-3xl" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, letterSpacing: "-0.03em" }}>
        Tell me about your <span className="serif-accent">idea</span>
      </h3>

      <fieldset className="relative m-0 mt-6 border-0 p-0">
        <legend className="mb-3 p-0 font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--text-dim)]">I need a</legend>
        <div className="-mx-5 flex snap-x gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
          {TOPICS.map((t) => {
            const on = topic === t;
            return (
              <button
                key={t}
                type="button"
                aria-pressed={on}
                onClick={() => setTopic(t)}
                className="shrink-0 snap-start whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-200 active:scale-95 md:hover:-translate-y-0.5"
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
          <input className={`${field} ${bad(name.trim().length < 2)}`} value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" autoComplete="name" enterKeyHint="next" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm text-[var(--text-muted)]">Your email</span>
          <input className={`${field} ${bad(!emailOk)}`} value={from} onChange={(e) => setFrom(e.target.value)} placeholder="jane@company.com" type="email" inputMode="email" autoComplete="email" enterKeyHint="next" />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-2 block text-sm text-[var(--text-muted)]">What are you building?</span>
          <textarea className={`${field} min-h-[8.5rem] resize-y ${bad(message.trim().length < 10)}`} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="A few lines about the project, the timeline and who it is for." />
        </label>
      </div>

      <div className="relative mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="hero-shine relative inline-flex h-14 w-full items-center justify-center gap-2 overflow-hidden rounded-full px-7 text-base font-semibold text-[#0b0a12] transition-colors hover:bg-[#ff4d00] hover:text-white active:scale-[0.98] sm:h-12 sm:w-auto"
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

// Phones only: the contact page as a chat. Messages pop in one after another, you pick a topic as a quick reply,
// then write your note in a composer. Wider screens use the layout above and never see this.
function MobileContact({ reduce }) {
  const [topic, setTopic] = useState(null);
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState(false);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const emailOk = /^\S+@\S+\.\S+$/.test(from);
  const valid = name.trim().length > 1 && emailOk && message.trim().length > 9;

  const submit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;
    const subject = `${topic ?? "Hello"}: message from ${name.trim()}`;
    const body = `${message.trim()}\n\n${name.trim()}\n${from.trim()}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: the mail link still works */
    }
  };

  // A bubble that pops in from its side, one after the other
  const pop = (i, right = false) => ({
    initial: reduce ? false : { opacity: 0, scale: 0.8, y: 18, x: right ? 14 : -14 },
    whileInView: { opacity: 1, scale: 1, y: 0, x: 0 },
    viewport: { once: true, margin: "-4% 0px" },
    transition: { type: "spring", stiffness: 320, damping: 22, delay: i * 0.12 },
  });
  const bubble = "max-w-[86%] rounded-2xl rounded-bl-md bg-[#26213a] px-4 py-2.5 text-[15px] leading-snug text-[var(--text-main)]";
  const field = "w-full rounded-2xl border border-white/12 bg-[var(--bg-base)]/70 px-4 py-3.5 text-base text-[var(--text-main)] outline-none placeholder:text-[var(--text-dim)] focus:border-[#ff4d00]";
  const bad = (cond) => (touched && cond ? "border-red-400/70" : "");

  const actions = [
    { label: "Call", sub: PHONE, href: `tel:${PHONE.replace(/\s+/g, "")}`, icon: <FiPhone aria-hidden="true" /> },
    { label: "Email", sub: "Open mail app", href: `mailto:${EMAIL}`, icon: <FiMail aria-hidden="true" /> },
    { label: "Location", sub: "Kerala, India", href: "https://www.google.com/maps/search/Kerala,+India", icon: <FiMapPin aria-hidden="true" /> },
  ];

  return (
    <div className="mx-auto w-full max-w-md px-4 md:hidden">
      {/* Chat header */}
      <motion.header {...pop(0)} className="flex items-center gap-3 rounded-3xl border border-white/12 bg-[var(--bg-surface)] p-3">
        <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full" style={{ background: "radial-gradient(80% 80% at 50% 30%, #7c5cd6, #2a1d55)" }}>
          <img src={avatar} alt="" aria-hidden="true" width="768" height="1024" className="absolute inset-x-0 bottom-0 h-[130%] w-full max-w-none object-cover object-top" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-base font-bold text-[var(--text-main)]">Saviyo George</span>
          <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Online · replies within a day
          </span>
        </span>
      </motion.header>

      <h2 className="sr-only">Contact</h2>

      {/* The conversation */}
      <div className="mt-6 space-y-3">
        <motion.p {...pop(0)} className={`${bubble} m-0`}>
          Hey 👋 I&apos;m Saviyo, a full-stack developer from Kerala.
        </motion.p>
        <motion.p {...pop(1)} className={`${bubble} m-0`}>
          Have a project in <span className="serif-accent">mind</span>? I build web apps, ERP &amp; POS systems and AI tools.
        </motion.p>
        <motion.p {...pop(2)} className={`${bubble} m-0`}>
          What do you need?
        </motion.p>

        {/* Quick replies */}
        <motion.ul {...pop(3)} className="m-0 flex list-none flex-wrap gap-2 p-0 pl-1">
          {TOPICS.map((t) => {
            const on = topic === t;
            return (
              <li key={t}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => setTopic(t)}
                  className="rounded-full border px-4 py-2 text-sm font-semibold transition-colors active:scale-95"
                  style={on ? { backgroundColor: ACCENT, borderColor: ACCENT, color: "#fff" } : { borderColor: "rgba(196,181,253,0.5)", color: "#c4b5fd" }}
                >
                  {t}
                </button>
              </li>
            );
          })}
        </motion.ul>

        {/* Your pick, and the reply to it */}
        <AnimatePresence>
          {topic && (
            <motion.p
              key={`you-${topic}`}
              initial={{ opacity: 0, scale: 0.8, y: 14, x: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className="m-0 ml-auto w-fit max-w-[86%] rounded-2xl rounded-br-md px-4 py-2.5 text-[15px] font-semibold text-white"
              style={{ backgroundColor: ACCENT }}
            >
              I need a {topic}
            </motion.p>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {topic && (
            <motion.p
              key="reply"
              initial={{ opacity: 0, scale: 0.8, y: 14, x: -14 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 22, delay: 0.35 }}
              className={`${bubble} m-0`}
            >
              Nice! Tell me a little about it below 👇
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* The composer */}
      <motion.form {...pop(0)} onSubmit={submit} noValidate className="mt-6 space-y-3 rounded-3xl border border-white/12 bg-[var(--bg-surface)] p-4">
        <label className="block">
          <span className="mb-1.5 block text-xs text-[var(--text-muted)]">Your name</span>
          <input className={`${field} ${bad(name.trim().length < 2)}`} value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" autoComplete="name" enterKeyHint="next" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs text-[var(--text-muted)]">Your email</span>
          <input className={`${field} ${bad(!emailOk)}`} value={from} onChange={(e) => setFrom(e.target.value)} placeholder="jane@company.com" type="email" inputMode="email" autoComplete="email" enterKeyHint="next" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs text-[var(--text-muted)]">Your message</span>
          <textarea className={`${field} min-h-[7.5rem] resize-none ${bad(message.trim().length < 10)}`} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="A few lines about the project and the timeline." />
        </label>
        <button type="submit" className="hero-shine relative flex h-14 w-full items-center justify-center gap-2 overflow-hidden rounded-full text-base font-semibold text-[#0b0a12] active:scale-[0.98]" style={{ backgroundColor: "#f4f0ff" }}>
          Send message <FiSend aria-hidden="true" />
        </button>
        <p className="m-0 text-center text-xs" role="status" aria-live="polite" style={{ color: touched && !valid ? "#ff8a7a" : "var(--text-dim)" }}>
          {sent ? "Your email app should open with the message ready to send." : touched && !valid ? "Please fill in your name, a valid email and a few lines." : "This opens your email app with everything filled in."}
        </p>
      </motion.form>

      {/* Or reach me straight away */}
      <p className="m-0 mt-8 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--text-dim)]">Or reach me directly</p>
      <ul className="m-0 mt-3 grid list-none grid-cols-2 gap-3 p-0">
        {actions.map((a, i) => (
          <motion.li key={a.label} {...pop(i * 0.5, i % 2 === 1)}>
            <a href={a.href} className="flex h-full flex-col gap-3 rounded-2xl border border-white/12 bg-[var(--bg-surface)] p-4 active:scale-[0.97]">
              <span className="flex h-10 w-10 items-center justify-center rounded-full text-lg text-white" style={{ backgroundColor: ACCENT }}>
                {a.icon}
              </span>
              <span>
                <span className="block text-base font-bold text-[var(--text-main)]">{a.label}</span>
                <span className="block truncate text-xs text-[var(--text-muted)]">{a.sub}</span>
              </span>
            </a>
          </motion.li>
        ))}
        <motion.li {...pop(1.5, true)}>
          <button type="button" onClick={copyEmail} className="flex h-full w-full flex-col gap-3 rounded-2xl border border-white/12 bg-[var(--bg-surface)] p-4 text-left active:scale-[0.97]">
            <span className="flex h-10 w-10 items-center justify-center rounded-full text-lg text-white" style={{ backgroundColor: ACCENT }}>
              {copied ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />}
            </span>
            <span>
              <span className="block text-base font-bold text-[var(--text-main)]">{copied ? "Copied!" : "Copy email"}</span>
              <span className="block truncate text-xs text-[var(--text-muted)]">{EMAIL}</span>
            </span>
          </button>
        </motion.li>
      </ul>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {SOCIAL.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 text-sm font-semibold text-[var(--text-main)] active:scale-[0.97]">
            <s.Icon aria-hidden="true" /> {s.label}
          </a>
        ))}
      </div>

      <p className="m-0 mt-10 border-t border-white/10 pt-6 text-center text-xs text-[var(--text-dim)]">
        © {new Date().getFullYear()} Saviyo George · Kerala, India
      </p>
    </div>
  );
}

export default function Contact() {
  const reduce = useReducedMotion();

  return (
    <section id="contact" className="relative w-full overflow-hidden py-12 md:py-28">
      <MobileContact reduce={reduce} />

      <div className="mx-auto hidden w-full max-w-[1500px] gap-10 px-5 md:grid md:gap-12 md:px-8 lg:grid-cols-2 lg:gap-16">
        {/* Left: the message and every way to reach me */}
        <div className="min-w-0">
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
          <p className="mb-0 mt-5 max-w-[46ch] text-base leading-relaxed sm:mt-6 sm:text-lg text-[var(--text-muted)]">
            I build web apps, ERP and POS systems and AI-powered tools. Send me a message, and I will reply within a day.
          </p>

          <ul className="m-0 mt-9 space-y-3 p-0">
            <ContactRow icon={<FiMail aria-hidden="true" />} label="Email" value={EMAIL} href={`mailto:${EMAIL}`} copy={EMAIL} delay={0} reduce={reduce} />
            <ContactRow icon={<FiPhone aria-hidden="true" />} label="Phone" value={PHONE} href={`tel:${PHONE.replace(/\s+/g, "")}`} copy={PHONE} delay={0.08} reduce={reduce} />
            <ContactRow icon={<FiMapPin aria-hidden="true" />} label="Based in" value="Kerala, India (IST)" href="https://www.google.com/maps/search/Kerala,+India" delay={0.16} reduce={reduce} />
          </ul>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-7 sm:flex sm:flex-wrap">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[var(--border-subtle)] px-4 text-sm font-semibold active:scale-[0.98] sm:h-11 sm:px-5 text-[var(--text-main)] transition-colors hover:border-[#ff4d00] hover:text-[#ff4d00]"
              >
                <s.Icon aria-hidden="true" /> {s.label} <FiArrowUpRight aria-hidden="true" className="text-[var(--text-dim)]" />
              </a>
            ))}
          </div>
        </div>

        {/* Right: the form */}
        <ContactForm reduce={reduce} />
      </div>

      <div className="mx-auto mt-14 hidden w-full max-w-[1500px] flex-col items-center justify-between gap-2 border-t border-[var(--border-subtle)] px-5 pt-8 text-sm text-[var(--text-muted)] md:mt-28 md:flex md:flex-row md:px-8">
        <span>© {new Date().getFullYear()} Saviyo George</span>
        <span>Designed and built in Kerala, India</span>
      </div>
    </section>
  );
}
