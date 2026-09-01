import React from "react";
import Navbar from "../components/Navbar";
import Introduction from "../components/Introduction";
import About from "../components/About";
import Skills from "../components/Skills";
import Education from "../components/Education";
import Experiences from "../components/Experiences";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import StickySection from "../components/StickySection";

function Home() {
  return (
    <div className="bg-[var(--bg-base)] text-[var(--text-main)] min-h-screen relative">
      <Navbar />

      <main className="relative">
        <StickySection
          id="introduction"
          zIndex={10}
        >
          <Introduction />
        </StickySection>

        <StickySection
          id="about"
          zIndex={20}
        >
          <About />
        </StickySection>

        <StickySection
          id="experience"
          zIndex={30}
          className="shadow-[0_-20px_50px_rgba(0,0,0,0.05)] border-t border-[var(--border-subtle)]"
        >
          <Experiences />
        </StickySection>

        <StickySection
          id="skills"
          zIndex={40}
          className="shadow-[0_-20px_50px_rgba(0,0,0,0.05)] border-t border-[var(--border-subtle)]"
        >
          <Skills />
        </StickySection>

        <StickySection
          id="education"
          zIndex={50}
          className="shadow-[0_-20px_50px_rgba(0,0,0,0.05)] border-t border-[var(--border-subtle)]"
        >
          <Education />
        </StickySection>

        <StickySection
          id="projects"
          zIndex={60}
          className="shadow-[0_-20px_50px_rgba(0,0,0,0.05)] border-t border-[var(--border-subtle)]"
        >
          <Projects />
        </StickySection>

        <StickySection
          id="contact"
          zIndex={70}
          className="shadow-[0_-20px_50px_rgba(0,0,0,0.1)]"
        >
          <Contact />
        </StickySection>
      </main>
    </div>
  );
}

export default Home;