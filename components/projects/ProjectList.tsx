'use client'

import React, {useState, startTransition, ViewTransition} from 'react'
import ProjectCard from './ProjectCard'
import {Project as PayloadProject} from '@/payload-types'

interface ProjectListProps {
  projects: PayloadProject[]
}

export default function ProjectList({projects}: ProjectListProps) {
  const [activeFilter, setActiveFilter] = useState('All')

  // Normalize filters by trimming whitespace and handling potential missing values
  const filters = [
    'All',
    ...new Set(projects.map((p) => p.filter?.trim() || 'Other').filter(Boolean)),
  ]

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => (p.filter?.trim() || 'Other') === activeFilter)

  return (
    <>
      {/* Filter Section */}
      <section className="px-margin-mobile md:px-gutter mx-auto mb-12 max-w-300">
        <div className="flex flex-wrap items-center gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`text-label-sm font-label-sm cursor-pointer rounded-full px-6 py-2 transition-all duration-200 ${
                activeFilter === filter
                  ? 'bg-primary text-on-primary shadow-md'
                  : 'border-border-subtle text-on-secondary-container hover:bg-surface-container-low border bg-white'
              }`}
              onClick={() => {
                startTransition(() => {
                  setActiveFilter(filter)
                })
              }}
            >
              {filter === 'All' ? 'All Projects' : filter}
            </button>
          ))}
        </div>
      </section>

      {/* Grid Section */}
      <section className="px-margin-mobile md:px-gutter mx-auto max-w-300">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {filteredProjects.map((project, index) => {
            // Bento layout logic
            // Desktop (lg): Cycle 8-4, 6-6
            // Tablet (md): 2 columns (6-6)
            // Mobile: 1 column
            const patternIndex = index % 4
            let colSpan = 'lg:col-span-6 md:col-span-6'
            let aspect = 'aspect-3/2'

            if (patternIndex === 0) {
              colSpan = 'lg:col-span-8 md:col-span-6'
              aspect = 'lg:aspect-video aspect-3/2'
            } else if (patternIndex === 1) {
              colSpan = 'lg:col-span-4 md:col-span-6'
              aspect = 'lg:aspect-4/5 aspect-3/2'
            }

            return (
              <ViewTransition key={project.id}>
                <ProjectCard
                  title={project.title}
                  filter={project.filter}
                  url={project.url}
                  image={project.image}
                  description={project.description ?? undefined}
                  colSpan={colSpan}
                  aspect={aspect}
                />
              </ViewTransition>
            )
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="w-full py-32 text-center opacity-60">
            <p className="text-body-lg">No projects found for this category.</p>
          </div>
        )}
      </section>
    </>
  )
}
