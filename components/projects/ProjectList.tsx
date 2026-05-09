'use client'

import React, { useState } from 'react'
import ProjectCard from './ProjectCard'
import { Project as PayloadProject } from '@/payload-types'

interface ProjectListProps {
  projects: PayloadProject[]
}

export default function ProjectList({ projects }: ProjectListProps) {
  const [activeFilter, setActiveFilter] = useState('All')
  
  // Normalize filters by trimming whitespace
  const filters = ['All', ...new Set(projects.map((p) => p.filter.trim()))]
  
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter((p) => p.filter.trim() === activeFilter)

  return (
    <>
      <div className="mb-16 text-center">
        {filters.map((filter, index) => (
          <button
            key={filter}
            className={`mr-1 mb-2.5 border px-4 py-2.5 text-xs md:mr-1.5 md:text-sm ${
              index === 0 ? 'rounded-l-lg' : ''
            } ${
              index === filters.length - 1 ? 'rounded-e-lg' : ''
            } transition-colors hover:bg-white/15`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      
      <div id="filter-container" className="flex flex-wrap">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            filter={project.filter}
            url={project.url}
            image={project.image}
          />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="w-full py-20 text-center opacity-60">
          No projects found for this filter.
        </div>
      )}
    </>
  )
}
