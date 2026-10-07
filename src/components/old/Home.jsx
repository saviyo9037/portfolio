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
    <div className="bg-transparent text-[var(--text-main)] min-h-screen relative selection:bg-[#39ff88] selection:text-[#0A0A0A]">
      <Navbar />

      <main className="relative bg-transparent">
        <section id="introduction" className="relative z-10 bg-transparent">
          <Introduction />
        </section>

        <section id="about" className="relative z-20 bg-transparent">
          <About />
        </section>

        <section id="experience" className="relative z-30 bg-transparent">
          <Experiences />
        </section>

        <section id="skills" className="relative z-40 bg-transparent">
          <Skills />
        </section>

        <section id="education" className="relative z-50 bg-transparent">
          <Education />
        </section>

        {/* Horizontal Project Ticker */}
        <div className="relative z-[55] bg-transparent">
          <ProjectTicker />
        </div>

        <div
          id="projects"
          className="relative z-[60] bg-transparent"
        >
          <Projects />
        </div>

        <section id="contact" className="relative z-70 bg-transparent">
          <Contact />
        </section>
      </main>
    </div>
  );
}

export default Home;