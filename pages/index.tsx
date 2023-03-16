import Hero from "../components/home/hero/hero";
import About from "../components/home/about/about";
import Skills from "../components/home/skills/skills";
import Projects from "../components/home/projects/projects";
import BlogWidget from "../components/home/blog/blog-widget";
import Contact from "../components/home/contact/contact";
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
          <title>Luis Amador Portfolio</title>
          <meta name="description" content="Luis Amador Web Developer Portfolio Website And Blog" />
      </Head>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <BlogWidget />
      <Contact />
    </>
  )
}
