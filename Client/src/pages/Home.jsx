import React from 'react'
import ThemeToggle from '../components/ThemeToggle'
import NavBar from '../components/NavBar'
import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import Footer from '../components/Footer'
import ContactSection from '../components/ContactSection'
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <div className='overflow-x-hidden'>
      <ThemeToggle/>
      <NavBar/>
      <main>
        <HeroSection/>
        <AboutSection/>
        <ContactSection/>
      </main>
      <Footer/>
    </div>
  )
}

export default Home
