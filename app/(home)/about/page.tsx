import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'About | Luis Amador Portfolio',
    description: 'Portfolio Website And Blog'
}

const About = () => (
  <section id="about-me" className="h-screen px-5 flex justify-center items-center py-16 text-text-grey">
      <div className="md:w-4/5">
          <div className="text-center">
              <h1 className="text-4xl mb-16">About Me</h1>

              <p className="text-lg mb-12">Hello and welcome! I’m Luis Amador. I primarily focus on trying to drive the web forward. I believe
              that goal is best met by leading the field in SEO, Performance, Security and Website Maintenance. Those
              are the major players of a successful website, so this is my driving force. I’m not only a web
              developer, I’m also a Linux Administrator. Jumping on a terminal to monitor a website security and
              health is something I take seriously. I love taking on new challenges so please shoot me an email if you
              would like to hire and include me in your project.</p>

              <p className="text-lg">Code speaks louder than words so keep scrolling down the page to see projects I have been a part of.
              </p>
          </div>
      </div>
  </section>
)

export default About