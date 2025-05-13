'use client'

import AllProjectsItem from './projects-item'
import {useState} from 'react'

interface Project {
  filter: string
}

interface ShuffleProps {
  initialProjects: Project[]
}

function Shuffle({initialProjects}: ShuffleProps) {
  const [state, setState] = useState<Project[]>(initialProjects)
  const filters = ['All', ...new Set(initialProjects.map((project) => project.filter))]

  const handleBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    const word = e.currentTarget.value

    if (word === 'All') {
      setState(initialProjects)
    } else {
      const filtered = initialProjects.filter((item) => item.filter === word)
      setState(filtered)
    }
  }

  return (
    <>
      <div className="mb-16 text-center">
        {filters.map((filter, index) => (
          <button
            key={index}
            className={`mr-1 md:mr-1.5 mb-2.5 py-2.5 px-4 text-xs md:text-sm border ${
              index === 0 ? 'rounded-l-lg' : ''
            } ${
              index === filters.length - 1 ? 'rounded-e-lg' : ''
            } hover:bg-white/[.15] transition-colors`}
            value={filter}
            onClick={handleBtn}
          >
            {filter}
          </button>
        ))}
      </div>
      <div id="filter-container" className="flex flex-wrap">
        <AllProjectsItem lists={state} />
      </div>
    </>
  )
}

export default Shuffle
