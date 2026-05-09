import {Metadata} from 'next'
import {Suspense} from 'react'
import {getPayload} from 'payload'
import config from '@/payload.config'
import ProjectList from '@/components/projects/ProjectList'
import {Project as PayloadProject} from '@/payload-types'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Portfolio Website And Blog',
  alternates: {
    canonical: '/projects',
  },
}

async function ProjectsList() {
  let projects: PayloadProject[] = []
  try {
    const payload = await getPayload({config})
    const result = await payload.find({
      collection: 'projects',
      sort: 'orderId',
      limit: 100, 
      pagination: false, // Explicitly disable pagination to get all items up to the limit
    })
    console.log(`Fetched ${result.docs.length} projects from Payload`)
    projects = result.docs
  } catch (error) {
    console.error('Error fetching projects from Payload:', error)
    return (
      <div className="py-10 text-center">
        <p className="mb-4 text-white">Unable to load projects at the moment.</p>
        <p className="text-sm text-white/80">
          Please check back later or contact support if the issue persists.
        </p>
      </div>
    )
  }

  return <ProjectList projects={projects} />
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
