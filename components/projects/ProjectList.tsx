'use client'

import React, { useState } from 'react'
import ProjectCard from './ProjectCard'
import { Project as PayloadProject } from '@/payload-types'

interface ProjectListProps {
  projects: PayloadProject[]
}

export default function ProjectList({ projects }: ProjectListProps) {
  const [activeFilter, setActiveFilter] = useState('All')
  
  // Normalize filters by trimming whitespace and handling potential missing values
  const filters = ['All', ...new Set(projects.map((p) => p.filter?.trim() || 'Other').filter(Boolean))]
  
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter((p) => (p.filter?.trim() || 'Other') === activeFilter)

  return (
    <>
      {/* Filter Section */}
      <section className="max-w-[1200px] mx-auto px-margin-mobile md:px-gutter mb-12">
        <div className="flex flex-wrap gap-3 items-center">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`px-6 py-2 rounded-full text-label-sm font-label-sm transition-all duration-200 cursor-pointer ${
                activeFilter === filter
                  ? 'bg-primary text-on-primary shadow-md'
                  : 'bg-white border border-border-subtle text-on-secondary-container hover:bg-surface-container-low'
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter === 'All' ? 'All Projects' : filter}
            </button>
          ))}
        </div>
      </section>
      
      {/* Grid Section */}
      <section className="max-w-[1200px] mx-auto px-margin-mobile md:px-gutter">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {filteredProjects.map((project, index) => {
            // Bento layout logic
            // Desktop (lg): Cycle 8-4, 6-6
            // Tablet (md): 2 columns (6-6)
            // Mobile: 1 column
            const patternIndex = index % 4
            let colSpan = 'lg:col-span-6 md:col-span-6'
            let aspect = 'aspect-[3/2]'
            
            if (patternIndex === 0) {
              colSpan = 'lg:col-span-8 md:col-span-6'
              aspect = 'lg:aspect-[16/9] aspect-[3/2]'
            } else if (patternIndex === 1) {
              colSpan = 'lg:col-span-4 md:col-span-6'
              aspect = 'lg:aspect-[4/5] aspect-[3/2]'
            }

            return (
              <ProjectCard
                key={project.id}
                index={index}
                title={project.title}
                filter={project.filter}
                url={project.url}
                image={project.image}
                description={project.description}
                colSpan={colSpan}
                aspect={aspect}
              />
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
