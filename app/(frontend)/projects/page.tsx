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
    <div className="mx-auto max-w-container-max px-margin-mobile md:px-gutter">
      <div className="mb-12 flex flex-wrap gap-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-10 w-28 rounded-full bg-surface-container-high"></div>
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
              className={`${colSpan} flex h-125 flex-col rounded-xl border border-border-subtle bg-white p-8`}
            >
              <div className="mb-6 aspect-video w-full rounded-lg bg-surface-container"></div>
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
      <section className="mx-auto mb-10 max-w-container-max px-margin-mobile pt-24 pb-12 md:px-gutter">
        <span className="mb-4 block text-label-sm font-label-sm tracking-[0.2em] text-primary uppercase">
          Portfolio
        </span>
        <h1 className="max-w-3xl text-display-lg-mobile font-display-lg text-on-surface md:text-display-lg">
          Crafting high-performance digital experiences across platforms.
        </h1>
        <p className="mt-6 max-w-2xl text-body-lg font-body-lg text-on-secondary-container">
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

      <section className="mx-auto mt-section-gap-lg max-w-container-max px-margin-mobile text-center md:px-gutter">
        <div className="rounded-3xl border border-border-subtle/50 bg-surface-container-low p-12 md:p-24">
          <h2 className="mb-6 text-headline-md font-headline-md text-on-surface">
            Looking for a Senior Frontend Engineer?
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-body-lg font-body-lg text-on-secondary-container">
            Whether you need a Senior Frontend Engineer for your full-time team or a consultant for
            a specialized AI/Next.js project, let&apos;s connect.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/contact" className="w-full sm:w-auto">
              <button className="w-full cursor-pointer rounded-lg bg-primary px-10 py-4 text-button font-button text-on-primary shadow-md transition-all hover:opacity-90 active:scale-95">
                Start a Conversation
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
