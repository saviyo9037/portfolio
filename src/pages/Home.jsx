import React from 'react'
import Proficiency from '../components/Proficiency'
import Education from '../components/Education'
import Experiences from '../components/Experiences'
import Projects from '../components/Projects'
import WhatLearning from '../components/WhatLearning'
import Contact from '../components/Contact'
import Achievements from '../components/Achievements'
import Introduction from '../components/Introductio'
import Navbar from '../components/Navbars'




function Home() {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8">
      <div><Navbar/></div>
      <div><Introduction/></div>
      <div><Proficiency/></div>
      <div><Education/></div>
      <div><Experiences/></div>
      <div><Projects/></div>
      <div><WhatLearning/></div>
      <div><Achievements/></div>
      <div><Contact/></div>
    </div>
  )
}

export default Home
