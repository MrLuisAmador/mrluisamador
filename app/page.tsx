"use client"

import Nav from "../components/nav/nav.js"
import Footer from "../components/footer/footer"
import Hero from "../components/home/hero/hero"
import About from "../components/home/about/about"
import Skills from "../components/home/skills/skills"
import Projects from "../components/home/projects/projects"
import BlogWidget from "../components/home/blog/blog-widget"
import Contact from "../components/home/contact/contact"

import { alice, playfair_display } from './fonts';
import '../styles/normalize.scss';
import '../styles/variables.scss';
import '../styles/global.scss';
import styles from "./page.module.scss";


const Home = () => {
  return (
    <div className={`${alice.variable} ${playfair_display.variable} ${styles.bodyContainer}`}>
      <Nav />
      <div className="contentContainer">
          <main className="main-container">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <BlogWidget />
          <Contact />
          </main>
          <Footer />
      </div>
    </div>
  )
}

export default Home