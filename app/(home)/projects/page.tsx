import {Metadata} from 'next'
import {getWixClient} from '../../../wix/useWixClientServer'
import Shuffle from './shuffle'

export const metadata: Metadata = {
  title: 'Projects - Luis Amador Web Developer',
  description: 'Portfolio Website And Blog',
}

async function Projects() {
  const initialProjects: any = await getWixClient()
  return (
    <section id="projects" className="h-full text-white bg-projects-orange py-16">
      <div className="mb-12">
        <h2 className="text-5xl text-center mb-10">Projects</h2>

        <h3 className="text-lg mb-8 text-center">List of Projects.</h3>
      </div>

      <Shuffle initialProjects={initialProjects} />
    </section>
  )
}

export default Projects
