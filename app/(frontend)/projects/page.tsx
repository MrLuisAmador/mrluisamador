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
  let projects: Project[]
  try {
    const queryWixProjects = await getWixClient()
    const {items} = await queryWixProjects.items.query('projectGallery').ascending('orderId').find()

    // Cast the items to Project[] type since we know the structure matches
    projects = items as Project[]
  } catch {
    // Wix API may not be available during build-time static generation
    // Error is handled gracefully with user-friendly message
    return (
      <div className="py-10 text-center">
        <p className="mb-4 text-white">Unable to load projects at the moment.</p>
        <p className="text-sm text-white/80">
          Please check back later or contact support if the issue persists.
        </p>
      </div>
    )
  }

  return <ProjectFilter projects={projects} />
}

function ProjectsListSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-8 flex justify-center space-x-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-10 w-24 rounded bg-white/20"></div>
        ))}
      </div>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-lg bg-white/10 p-4">
            <div className="mb-4 h-48 w-full rounded bg-white/20"></div>
            <div className="mb-2 h-6 rounded bg-white/20"></div>
            <div className="h-4 w-3/4 rounded bg-white/20"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="bg-projects-orange h-full py-16 text-white">
      <div className="mb-12">
        <h2 className="mb-10 text-center text-5xl">Projects</h2>
        <h3 className="mb-8 text-center text-lg">List of Projects.</h3>
      </div>

      <Suspense fallback={<ProjectsListSkeleton />}>
        <ProjectsList />
      </Suspense>
    </section>
  )
}
