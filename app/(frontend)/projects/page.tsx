import {Metadata} from 'next'
import {Suspense} from 'react'
import Link from 'next/link'
import {getPayload} from 'payload'
import config from '@/payload.config'
import ProjectList from '@/components/projects/ProjectList'
import {Project as PayloadProject} from '@/payload-types'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Portfolio showcasing Next.js applications, Wix platforms, and AI Engineering agentic workflows.',
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
      pagination: false,
      depth: 1,
    })
    projects = result.docs
  } catch (error) {
    console.error('Error fetching projects from Payload:', error)
    return (
      <div className="py-20 text-center">
        <p className="mb-4 text-on-surface">Unable to load projects at the moment.</p>
        <p className="text-sm text-on-surface-variant">
          Please check back later or contact support if the issue persists.
        </p>
      </div>
    )
  }

  return <ProjectList projects={projects} />
}

function ProjectsListSkeleton() {
  return (
    <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-gutter">
      <div className="mb-12 flex flex-wrap gap-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-10 w-28 rounded-full bg-surface-container-high"></div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {[...Array(4)].map((_, i) => {
          const patternIndex = i % 4
          const colSpan = patternIndex === 0 ? 'lg:col-span-8 md:col-span-6' : 
                          patternIndex === 1 ? 'lg:col-span-4 md:col-span-6' : 
                          'lg:col-span-6 md:col-span-6'
          return (
            <div key={i} className={`${colSpan} rounded-xl bg-white border border-border-subtle p-8 flex flex-col h-[500px]`}>
              <div className="mb-6 aspect-[16/9] w-full rounded-lg bg-surface-container"></div>
              <div className="mb-4 h-4 w-20 rounded bg-surface-container-high"></div>
              <div className="mb-4 h-8 w-3/4 rounded bg-surface-container-high"></div>
              <div className="flex-1 space-y-3">
                <div className="h-4 w-full rounded bg-surface-container-high"></div>
                <div className="h-4 w-5/6 rounded bg-surface-container-high"></div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <div className="min-h-screen pb-section-gap-lg">
      <section className="max-w-[1200px] mx-auto px-margin-mobile md:px-gutter pt-24 pb-12 mb-10">
        <span className="text-label-sm font-label-sm text-primary uppercase tracking-[0.2em] block mb-4">
          Portfolio
        </span>
        <h1 className="text-display-lg-mobile md:text-display-lg font-display-lg text-on-surface max-w-3xl">
          Crafting high-performance digital experiences across platforms.
        </h1>
        <p className="text-body-lg font-body-lg text-on-secondary-container mt-6 max-w-2xl">
          A curated selection of technical solutions spanning AI-powered agentic workflows, enterprise Next.js applications, and custom Wix platforms.
        </p>
      </section>

      <Suspense fallback={<ProjectsListSkeleton />}>
        <ProjectsList />
      </Suspense>

      <section className="mt-section-gap-lg max-w-[1200px] mx-auto px-margin-mobile md:px-gutter text-center">
        <div className="bg-surface-container-low rounded-3xl p-12 md:p-24 border border-border-subtle/50">
          <h2 className="text-headline-md font-headline-md mb-6 text-on-surface">Looking for a Senior Frontend Engineer?</h2>
          <p className="text-body-lg font-body-lg text-on-secondary-container mb-10 max-w-xl mx-auto">
            Whether you need a Senior Frontend Engineer for your full-time team or a consultant for a specialized AI/Next.js project, let's connect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="w-full sm:w-auto">
              <button className="bg-primary cursor-pointer text-on-primary px-10 py-4 rounded-lg text-button font-button hover:opacity-90 active:scale-95 transition-all shadow-md w-full">
                Start a Conversation
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
