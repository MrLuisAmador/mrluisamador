import {Metadata} from 'next'
import {Suspense, ViewTransition} from 'react'
import Link from 'next/link'
import {getPayload} from 'payload'
import config from '@/payload.config'
import ProjectList from '@/components/projects/ProjectList'
import {Project as PayloadProject} from '@/payload-types'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Portfolio showcasing Next.js applications, Wix platforms, and AI Engineering agentic workflows.',
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
        <p className="text-on-surface mb-4">Unable to load projects at the moment.</p>
        <p className="text-on-surface-variant text-sm">
          Please check back later or contact support if the issue persists.
        </p>
      </div>
    )
  }

  return <ProjectList projects={projects} />
}

function ProjectsListSkeleton() {
  return (
    <div className="px-margin-mobile md:px-gutter mx-auto max-w-300">
      <div className="mb-12 flex flex-wrap gap-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-surface-container-high h-10 w-28 rounded-full"></div>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        {[...Array(4)].map((_, i) => {
          const patternIndex = i % 4
          const colSpan =
            patternIndex === 0
              ? 'lg:col-span-8 md:col-span-6'
              : patternIndex === 1
                ? 'lg:col-span-4 md:col-span-6'
                : 'lg:col-span-6 md:col-span-6'
          return (
            <div
              key={i}
              className={`${colSpan} border-border-subtle flex h-125 flex-col rounded-xl border bg-white p-8`}
            >
              <div className="bg-surface-container mb-6 aspect-video w-full rounded-lg"></div>
              <div className="bg-surface-container-high mb-4 h-4 w-20 rounded"></div>
              <div className="bg-surface-container-high mb-4 h-8 w-3/4 rounded"></div>
              <div className="flex-1 space-y-3">
                <div className="bg-surface-container-high h-4 w-full rounded"></div>
                <div className="bg-surface-container-high h-4 w-5/6 rounded"></div>
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
    <div className="pb-section-gap-lg min-h-screen">
      <section className="px-margin-mobile md:px-gutter mx-auto mb-10 max-w-300 pt-24 pb-12">
        <span className="text-label-sm font-label-sm text-primary mb-4 block tracking-[0.2em] uppercase">
          Portfolio
        </span>
        <h1 className="text-display-lg-mobile md:text-display-lg font-display-lg text-on-surface max-w-3xl">
          Crafting high-performance digital experiences across platforms.
        </h1>
        <p className="text-body-lg font-body-lg text-on-secondary-container mt-6 max-w-2xl">
          A curated selection of technical solutions spanning AI-powered agentic workflows,
          enterprise Next.js applications, and custom Wix platforms.
        </p>
      </section>

      <Suspense
        fallback={
          <ViewTransition exit="slide-down">
            <ProjectsListSkeleton />
          </ViewTransition>
        }
      >
        <ViewTransition enter="slide-up" default="none">
          <ProjectsList />
        </ViewTransition>
      </Suspense>

      <section className="mt-section-gap-lg px-margin-mobile md:px-gutter mx-auto max-w-300 text-center">
        <div className="bg-surface-container-low border-border-subtle/50 rounded-3xl border p-12 md:p-24">
          <h2 className="text-headline-md font-headline-md text-on-surface mb-6">
            Looking for a Senior Frontend Engineer?
          </h2>
          <p className="text-body-lg font-body-lg text-on-secondary-container mx-auto mb-10 max-w-xl">
            Whether you need a Senior Frontend Engineer for your full-time team or a consultant for
            a specialized AI/Next.js project, let&apos;s connect.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/contact" className="w-full sm:w-auto">
              <button className="bg-primary text-on-primary text-button font-button w-full cursor-pointer rounded-lg px-10 py-4 shadow-md transition-all hover:opacity-90 active:scale-95">
                Start a Conversation
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
