import React from 'react'
import Navbar from '../components/Navbar'
import Introduction from '../components/Introduction'
import MySkills from '../components/MySkills'
import Education from '../components/Education'
import Experiences from '../components/Experiences'
import Projects from '../components/Projects'
import WhatLearning from '../components/WhatLearning'
import Contact from '../components/Contact'
import Achievements from '../components/Achievements'
import Skills from '../components/Skills'


function Home() {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8">
      <div><Navbar/></div>
      <div id="introduction"><Introduction/></div>
      <div id="my-skills"><Skills/></div>

      <div ><MySkills/></div>
      <div id="education"><Education/></div>
      <div id="experience"><Experiences/></div>
      <div id="projects"><Projects/></div>
      <div id="what-learning"><WhatLearning/></div>
      <div id="achievements"><Achievements/></div>
      <div id="contact"><Contact/></div>
    </div>
  )
}

export default Home