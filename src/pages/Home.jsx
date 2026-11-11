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
    <div className="bg-transparent text-[var(--text-main)] min-h-dvh relative selection:bg-[#39ff88] selection:text-[#0A0A0A]">
      <Navbar />

      <main className="relative bg-transparent">
        <section id="introduction" className="relative bg-transparent">
          <Introduction />
        </section>

        <section id="about" className="relative bg-transparent">
          <About />
        </section>

        <section id="experience" className="relative bg-transparent">
          <Experiences />
        </section>

        <section id="skills" className="relative bg-transparent">
          <Skills />
        </section>

        <section id="education" className="relative bg-transparent">
          <Education />
        </section>

        {/* Horizontal Project Ticker removed to fix duplicate projects */}

        <div
          id="projects"
          className="relative bg-transparent"
        >
          <Projects />
        </div>

        <section id="contact" className="relative bg-transparent">
          <Contact />
        </section>
      </main>
    </div>
  );
}

export default Home;