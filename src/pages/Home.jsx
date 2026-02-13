import React from "react";
import Navbar from "../components/Navbar";
import Introduction from "../components/Introduction";
import MySkills from "../components/MySkills";
import Education from "../components/Education";
import Experiences from "../components/Experiences";
import Projects from "../components/Projects";
import WhatLearning from "../components/WhatLearning";
import Contact from "../components/Contact";
import Achievements from "../components/Achievements";
import Skills from "../components/Skills";

function Home() {
  return (
    <div className="bg-[#0b0b14] text-white scroll-smooth">

      {/* Fixed Navbar */}
      <Navbar/>

      {/* Sections */}
      <main className="pt-20">

        <section id="introduction">
          <Introduction />
        </section>

        <section id="my-skills">
          <Skills />
        </section>

        <section>
          <MySkills />
        </section>

        <section id="education">
          <Education />
        </section>

        <section id="experience">
          <Experiences />
        </section>

        <section id="projects">
          <Projects />
        </section>

        <section id="what-learning">
          <WhatLearning />
        </section>

        <section id="achievements">
          <Achievements />
        </section>

        <section id="contact">
          <Contact />
        </section>

      </main>
    </div>
  );
}

export default Home;
