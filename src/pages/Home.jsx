import React from "react";
import Navbar from "../components/Navbar";
import Introduction from "../components/Introduction";
import Skills from "../components/Skills";
import Education from "../components/Education";
import Experiences from "../components/Experiences";
import Projects from "../components/Projects";
import Contact from "../components/Contact";

function Home() {
  return (
    <div className="bg-[#09090B] text-[#FAFAFA] scroll-smooth min-h-screen">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Sections */}
      <main className="pt-20">
        <section id="introduction">
          <Introduction />
        </section>

        <section id="skills">
          <Skills />
        </section>

        <section id="experience">
          <Experiences />
        </section>
        
        <section id="education">
          <Education />
        </section>

        <section id="projects">
          <Projects />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </main>
    </div>
  );
}

export default Home;
