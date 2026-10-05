import React, { useRef, useState, useEffect } from "react";

const SKILLS_DATA = [
  [
    "Frontend Wire",
    [
      ["Languages", "JavaScript (ES6+), TypeScript"],
      ["Frameworks", "React.js, Next.js, Redux, TanStack React Query"],
      ["Styling", "Tailwind CSS, Bootstrap, HTML5, CSS3"],
      ["Design", "Figma, Canva"],
    ],
  ],
  [
    "Backend Desk",
    [
      ["Runtime", "Node.js, Express.js"],
      ["APIs", "RESTful APIs, Axios, JWT Authentication"],
      ["Realtime", "WebSockets / Socket.IO"],
      ["Databases", "MongoDB, Mongoose ODM, MySQL, SQLite / Drift"],
      ["Also", "PHP, Python, Dart"],
    ],
  ],
  [
    "Enterprise & Hardware",
    [
      ["Niche", "Enterprise ERP & POS Systems"],
      ["Hardware", "ESC/POS Thermal Printing"],
      ["Codes", "Barcode & QR Generation"],
      ["Packaging", "PyInstaller Desktop Packaging"],
      ["AI", "Voice Assistant (STT/TTS)"],
      ["Tools", "Git, GitHub, Postman, VS Code, Vite, npm, XAMPP"],
    ],
  ],
];

const CH = [
  [
    "01",
    "Frontend Wire",
    "Client architecture & reactive systems",
    "Responsive, high-performance interfaces built on typed components and cached server state.",
  ],
  [
    "02",
    "Backend Desk",
    "Services, data & realtime",
    "REST APIs with JWT & RBAC, validated middleware, and schemas that hold up in production.",
  ],
  [
    "03",
    "Enterprise & Hardware",
    "ERP, POS & physical bridges",
    "ERP/POS platforms that connect the browser to thermal printers, scanners and desktop daemons.",
  ],
];

const Rows = ({ i }) => (
  <div className="flex-1 flex flex-col justify-center gap-3">
    {SKILLS_DATA[i][1].map(([k, v]) => (
      <div key={k} className="border-b border-[#161616]/15 pb-2">
        <div className="font-mono text-[10px] font-bold tracking-widest mb-1.5 flex items-center">
          <span className="inline-block w-2 h-2 bg-[#161616] mr-2" />
          {k.toUpperCase()}
        </div>
        <div className="flex flex-wrap gap-1.5 font-mono">
          {v.split(", ").map((c) => (
            <span
              key={c}
              className="text-[12px] border border-[#161616]/30 bg-white/40 px-2 py-0.5 rounded-sm"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const Hd = ({ a, b }) => (
  <div className="font-mono text-[10px] tracking-widest flex justify-between border-b border-[#161616]/20 pb-2">
    <span>{a}</span>
    <span>{b}</span>
  </div>
);

const Left = ({ i }) => {
  const c = CH[i];
  return (
    <>
      <Hd a="THE DEVELOPER GAZETTE" b={"CHAP. " + c[0]} />
      <div className="flex-1 flex flex-col justify-center">
        <div
          className="font-['Anton']"
          style={{ fontSize: "clamp(5rem,10vw,9rem)", opacity: 0.12 }}
        >
          {c[0]}
        </div>
        <h4 className="font-['Anton'] text-4xl lg:text-5xl -mt-4 lg:-mt-8">
          {c[1]}
        </h4>
        <p className="font-mono text-[11px] tracking-widest mt-2 text-[#4a4a4a]">
          {c[2].toUpperCase()}
        </p>
        <p className="italic text-lg leading-snug mt-6">“{c[3]}”</p>
        <span className="font-mono text-[10px] mt-6 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#1a9c52] animate-pulse" />
          PRODUCTION VERIFIED @ D3INNOVATIVES
        </span>
      </div>
      <div className="font-mono text-[10px] border-t border-[#161616]/20 pt-2">
        PAGE {String(2 * i + 2).padStart(2, "0")}
      </div>
    </>
  );
};

const Right = ({ i }) => (
  <>
    <Hd a="CLASSIFIED INVENTORY" b="2026 REGISTER" />
    <Rows i={i} />
    <div className="font-mono text-[10px] border-t border-[#161616]/20 pt-2 text-right">
      PAGE {String(2 * i + 3).padStart(2, "0")}
    </div>
    <span className="cr" />
  </>
);

const Cover = () => (
  <div className="flex-1 flex flex-col justify-between p-5 border border-[#39ff88]/40 h-full">
    <span className="font-mono text-[10px] tracking-widest text-[#39ff88]">
      VOL. XXIV · NO. 08
    </span>
    <div>
      <h4 className="font-['Anton'] text-5xl lg:text-6xl text-white">
        The Developer
        <br />
        <span className="text-stroke text-transparent">Gazette</span>
      </h4>
      <p className="font-mono text-[11px] tracking-widest mt-4 text-[#9a9a9a]">
        TECHNICAL LEDGER // SAVIYO GEORGE
      </p>
    </div>
    <div>
      <p className="font-mono text-[10px] tracking-widest text-[#9a9a9a]">
        MALAPPURAM &amp; KERALA EDITION · EST. 2021
      </p>
      <p className="font-mono text-[11px] mt-3 text-[#39ff88] animate-pulse font-bold">
        CLICK TO OPEN ▸
      </p>
    </div>
  </div>
);

const Back = () => {
  const scrollToContact = (e) => {
    e.stopPropagation();
    const el = document.getElementById("contact");
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-5 text-center border border-[#39ff88]/40 p-5 h-full">
      <span className="font-mono text-[10px] tracking-widest text-[#39ff88]">
        END OF LEDGER
      </span>
      <h4 className="font-['Anton'] text-4xl text-white">
        Need this stack
        <br />
        on your team?
      </h4>
      <button
        onClick={scrollToContact}
        className="btn-minimal px-6 py-2.5 text-xs font-mono font-bold tracking-widest uppercase hover:border-[#39ff88] hover:text-[#39ff88] transition-colors"
      >
        [ INITIATE_COMMS ]
      </button>
    </div>
  );
};

export default function Skills() {
  const box = useRef(null);
  const [pr, setPr] = useState(0);
  const tr = useRef(1);

  useEffect(() => {
    const f = () => {
      if (!box.current) return;
      const r = box.current.getBoundingClientRect();
      tr.current = Math.max(1, r.height - (window.innerHeight - 80));
      setPr(Math.max(0, Math.min(1, (80 - r.top) / tr.current)));
    };
    f();
    window.addEventListener("scroll", f, { passive: true });
    window.addEventListener("resize", f);
    return () => {
      window.removeEventListener("scroll", f);
      window.removeEventListener("resize", f);
    };
  }, []);

  const t = pr * 4;
  const f = (i) => {
    const x = Math.max(0, Math.min(1, (t - i - 0.15) / 0.7));
    return x * x * (3 - 2 * x);
  };

  const cur = Math.max(0, Math.min(4, Math.round(t)));
  const sh = -25 * (1 - f(0)) + 25 * f(3);
  const op = Math.min(1, f(0) * 3, (1 - f(3)) * 3);

  const go = (n) => {
    n = Math.max(0, Math.min(4, n));
    if (!box.current) return;
    const r = box.current.getBoundingClientRect();
    const target = window.scrollY + r.top - 80 + (n / 4) * tr.current;
    if (window.__lenis) {
      window.__lenis.scrollTo(target, { duration: 1.2 });
    } else {
      window.scrollTo({ top: target, behavior: "smooth" });
    }
  };

  const tabs = ["COVER", "01 FRONTEND", "02 BACKEND", "03 ENTERPRISE"];

  const F = (i, face, cls, child, fn) => (
    <div
      className={"pg " + cls}
      aria-hidden={face === "f" ? f(i) > 0.5 : f(i) <= 0.5}
      onClick={fn}
    >
      {child}
    </div>
  );

  return (
    <section id="skills" className="relative max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20 text-[var(--text-main)] transition-colors duration-300">
      <div className="flex items-baseline gap-4 mb-6 border-b border-[var(--border-subtle)] pb-4">
        <span className="section-label">[03]</span>
        <h2 className="font-['Anton'] text-5xl md:text-7xl uppercase tracking-tight">
          <span className="heading-gradient-cyan">THE DEVELOPER</span>{" "}
          <span className="text-[var(--text-main)]">GAZETTE</span>
        </h2>
      </div>

      {/* Desktop 3D Scrollable Book Chamber */}
      <div ref={box} className="hidden md:block" style={{ height: "440vh" }}>
        <div
          tabIndex={0}
          aria-label="Skills book. It turns as you scroll. Arrow keys also turn pages."
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              e.preventDefault();
              go(cur + 1);
            }
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              go(cur - 1);
            }
          }}
          style={{
            position: "sticky",
            top: 80,
            height: "calc(100vh - 80px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* Top Controls Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex flex-wrap gap-2">
              {tabs.map((x, i) => (
                <button
                  key={x}
                  onClick={() => go(i)}
                  aria-label={"Go to " + x}
                  className="font-mono text-xs px-3 py-1.5 border transition-all cursor-pointer shadow-sm"
                  style={{
                    borderRadius: 999,
                    borderColor: cur === i ? "#39ff88" : "rgba(255, 255, 255, 0.12)",
                    background: cur === i ? "rgba(57, 255, 136, 0.15)" : "rgba(255, 255, 255, 0.05)",
                    color: cur === i ? "#39ff88" : "#94a3b8",
                    fontWeight: cur === i ? 700 : 500,
                  }}
                >
                  {x}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 font-mono text-xs">
              <button
                className="px-3 py-1.5 rounded-full border border-[var(--badge-border)] bg-[var(--badge-bg)] text-[var(--text-main)] hover:opacity-80 transition-all cursor-pointer shadow-sm"
                aria-label="Previous page"
                disabled={cur === 0}
                style={{ opacity: cur === 0 ? 0.35 : 1 }}
                onClick={() => go(cur - 1)}
              >
                ◂ PREV
              </button>
              <span className="text-[11px] font-semibold text-[var(--text-dim)]">
                0{cur + 1} / 05
              </span>
              <button
                className="px-3 py-1.5 rounded-full border border-[var(--badge-border)] bg-[var(--badge-bg)] text-[var(--text-main)] hover:opacity-80 transition-all cursor-pointer shadow-sm"
                aria-label="Next page"
                disabled={cur === 4}
                style={{ opacity: cur === 4 ? 0.35 : 1 }}
                onClick={() => go(cur + 1)}
              >
                NEXT ▸
              </button>
            </div>
          </div>

          {/* 3D Perspective Stage */}
          <div style={{ perspective: "2400px", padding: "16px 0 12px" }}>
            <div
              style={{
                width: "min(100%, 1000px, calc((100vh - 250px) * 1.5625))",
                aspectRatio: "1000 / 640",
                margin: "0 auto",
                position: "relative",
                transformStyle: "preserve-3d",
                transform: "translateX(" + sh + "%) rotateX(3deg)",
                transition: "transform 0.2s ease-out",
              }}
            >
              {/* Hardcover Inner Board Background */}
              <div
                style={{
                  position: "absolute",
                  inset: "-10px",
                  background: "#121212",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: 8,
                  boxShadow:
                    "0 50px 90px rgba(0,0,0,.85), 0 0 70px rgba(57,255,136,.12)",
                  opacity: op,
                  transition: "opacity 0.3s ease",
                }}
              />

              {/* 4 Multi-Leaf Flip Pages */}
              {[0, 1, 2, 3].map((i) => {
                const x = f(i);
                return (
                  <div
                    key={i}
                    className="lf"
                    style={{
                      transition: "none",
                      transform: "rotateY(" + -180 * x + "deg)",
                      zIndex: x > 0 && x < 1 ? 30 : x >= 1 ? i + 1 : 10 - i,
                    }}
                  >
                    {F(
                      i,
                      "f",
                      i === 0 ? "f cv" : "f R",
                      i === 0 ? <Cover /> : <Right i={i - 1} />,
                      () => go(cur + 1)
                    )}
                    {F(
                      i,
                      "b",
                      i === 3 ? "b cv" : "b",
                      i === 3 ? <Back /> : <Left i={i} />,
                      () => go(cur - 1)
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <p className="font-mono text-[11px] text-[var(--text-dim)] text-center mt-2">
            SCROLL TO TURN THE PAGES · CLICK A PAGE · ← → KEYS · OR USE THE TABS
          </p>
        </div>
      </div>

      {/* Mobile Stacked View */}
      <div className="md:hidden space-y-4 pt-4">
        {CH.map((c, i) => (
          <div
            key={c[0]}
            style={{
              background: "linear-gradient(135deg, #efe9db, #e2dccb)",
              color: "#161616",
              fontFamily: "Georgia, serif",
              padding: 20,
              borderRadius: 8,
            }}
          >
            <div className="font-mono text-[10px] tracking-widest">
              CHAP. {c[0]}
            </div>
            <h4 className="font-['Anton'] text-4xl mt-1">{c[1]}</h4>
            <p className="font-mono text-[10px] tracking-widest mt-1 mb-4 text-[#4a4a4a]">
              {c[2].toUpperCase()}
            </p>
            <Rows i={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
