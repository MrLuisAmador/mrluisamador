import {Metadata} from 'next'
import {getWixClient} from '@/lib/wix/useWixClientServer'
import ProjectFilter from '@/components/wix/projectFilter'
import {Project} from '@/lib/types/wix'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Portfolio Website And Blog',
}

async function Projects() {
  const queryWixProjects = await getWixClient()
  const {items} = await queryWixProjects.items.query('projectGallery').ascending('orderId').find()

  // Cast the items to Project[] type since we know the structure matches
  const projects = items as Project[]

  return (
    <section id="projects" className="h-full text-white bg-projects-orange py-16">
      <div className="mb-12">
        <h2 className="text-5xl text-center mb-10">Projects</h2>

        <h3 className="text-lg mb-8 text-center">List of Projects.</h3>
      </div>

      <ProjectFilter projects={projects} />
    </section>
  )
}

export default Projects
