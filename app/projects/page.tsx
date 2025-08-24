import {Metadata} from 'next'
import {Suspense} from 'react'
import {getWixClient} from '@/lib/wix/useWixClientServer'
import ProjectFilter from '@/components/wix/projectFilter'
import {Project} from '@/lib/types/wix'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Portfolio Website And Blog',
  alternates: {
    canonical: '/projects',
  },
}

async function ProjectsList() {
  try {
    const queryWixProjects = await getWixClient()
    const {items} = await queryWixProjects.items.query('projectGallery').ascending('orderId').find()

    // Cast the items to Project[] type since we know the structure matches
    const projects = items as Project[]

    return <ProjectFilter projects={projects} />
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return (
      <div className="text-center py-10">
        <p className="text-white mb-4">Unable to load projects at the moment.</p>
        <p className="text-white/80 text-sm">
          Please check back later or contact support if the issue persists.
        </p>
      </div>
    )
  }
}

function ProjectsListSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex justify-center space-x-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-10 bg-white/20 rounded w-24"></div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white/10 rounded-lg p-4">
            <div className="w-full h-48 bg-white/20 rounded mb-4"></div>
            <div className="h-6 bg-white/20 rounded mb-2"></div>
            <div className="h-4 bg-white/20 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="h-full text-white bg-projects-orange py-16">
      <div className="mb-12">
        <h2 className="text-5xl text-center mb-10">Projects</h2>
        <h3 className="text-lg mb-8 text-center">List of Projects.</h3>
      </div>

      <Suspense fallback={<ProjectsListSkeleton />}>
        <ProjectsList />
      </Suspense>
    </section>
  )
}
