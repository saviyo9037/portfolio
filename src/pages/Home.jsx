import React from "react";
import Navbar from "../components/Navbar";
import Introduction from "../components/Introduction";
import About from "../components/About";
import Skills from "../components/Skills";
import Education from "../components/Education";
import Experiences from "../components/Experiences";
import Projects from "../components/Projects";
import ProjectTicker from "../components/ProjectTicker";
import Contact from "../components/Contact";
import { CurvedDivider } from "../components/CurvedDivider";

function Home() {
  return (
    <div className="bg-[var(--bg-base)] text-[var(--text-main)] min-h-screen relative selection:bg-[var(--accent)] selection:text-black">
      <Navbar />

      <main className="relative bg-[var(--bg-base)]">
        <section id="introduction" className="relative z-10 bg-[var(--bg-base)]">
          <Introduction />
        </section>

        <section id="about" className="relative z-20 bg-[var(--bg-base)] border-t border-[var(--border-subtle)]">
          <About />
        </section>

        {/* Curved wave transition */}
        <div className="relative z-[25] bg-[var(--bg-base)]">
          <CurvedDivider color="var(--bg-surface)" />
        </div>

        <section id="experience" className="relative z-30 bg-[var(--bg-base)] border-t border-[var(--border-subtle)]">
          <Experiences />
        </section>

        <section id="skills" className="relative z-40 bg-[var(--bg-base)] border-t border-[var(--border-subtle)]">
          <Skills />
        </section>

        <section id="education" className="relative z-50 bg-[var(--bg-base)] border-t border-[var(--border-subtle)]">
          <Education />
        </section>

        {/* Horizontal Project Ticker */}
        <div className="relative z-[55] bg-[var(--bg-base)]">
          <ProjectTicker />
        </div>

        <div
          id="projects"
          className="relative z-[60] bg-[var(--bg-base)] border-t border-[var(--border-subtle)]"
        >
          <Projects />
        </div>

        {/* Curved wave before contact */}
        <div className="relative z-[65] bg-[var(--bg-base)]">
          <CurvedDivider color="var(--bg-surface)" inverted />
        </div>

        <section id="contact" className="relative z-70 bg-[var(--bg-base)] border-t border-[var(--border-subtle)]">
          <Contact />
        </section>
      </main>
    </div>
  );
}

export default Home;