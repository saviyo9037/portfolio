import React from "react";
import { Reveal } from "../components/motion/effects";
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
    <div className="bg-transparent text-[var(--text-main)] min-h-dvh relative selection:bg-[#ff8a1f] selection:text-black">
      {/* Soft orange light in two corners. Fixed to the viewport, so it never adds scroll width. */}
      <div aria-hidden="true" className="pointer-events-none fixed -left-48 -top-48 z-0 h-[36rem] w-[36rem] rounded-full bg-orange-500/15 blur-[140px]" />
      <div aria-hidden="true" className="pointer-events-none fixed -bottom-48 -right-48 z-0 h-[36rem] w-[36rem] rounded-full bg-orange-500/15 blur-[140px]" />

      <main className="relative bg-transparent">
        <section id="introduction" className="relative bg-transparent">
          <Introduction />
        </section>

        <section id="about" className="relative bg-transparent">
          <Reveal><About /></Reveal>
        </section>

        <section id="experience" className="relative bg-transparent">
          <Reveal><Experiences /></Reveal>
        </section>

        <section id="skills" className="relative bg-transparent">
          <Reveal><Skills /></Reveal>
        </section>

        <section id="education" className="relative bg-transparent">
          <Reveal><Education /></Reveal>
        </section>

        {/* Horizontal Project Ticker removed to fix duplicate projects */}

        <div
          id="projects"
          className="relative bg-transparent"
        >
          <Reveal><Projects /></Reveal>
        </div>

        <section id="contact" className="relative bg-transparent">
          <Reveal><Contact /></Reveal>
        </section>
      </main>
    </div>
  );
}

export default Home;