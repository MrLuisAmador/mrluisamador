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
        <button
          className="mr-1 md:mr-1.5 mb-2.5 py-2.5 px-4 text-xs md:text-sm border rounded-l-lg hover:bg-white/[.15] transition-colors"
          value="All"
          onClick={handleBtn}
        >
          All
        </button>
        <button
          className="mr-1 md:mr-1.5 mb-2.5 py-2.5 px-4 text-xs md:text-sm border hover:bg-white/[.15] transition-colors"
          value="Magento"
          onClick={handleBtn}
        >
          Magento
        </button>
        <button
          className="mr-1 md:mr-1.5 mb-2.5 py-2.5 px-4 text-xs md:text-sm border hover:bg-white/[.15] transition-colors"
          value="WordPress"
          onClick={handleBtn}
        >
          WordPress
        </button>
        <button
          className="mb-2.5 py-2.5 px-4 text-xs md:text-sm border rounded-e-lg hover:bg-white/[.15] transition-colors"
          value="Misc"
          onClick={handleBtn}
        >
          Misc
        </button>
      </div>
      <div id="filter-container" className="flex flex-wrap">
        <AllProjectsItem lists={state} />
      </div>
    </>
  )
}

export default Shuffle
