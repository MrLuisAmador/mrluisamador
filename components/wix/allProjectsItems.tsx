import Link from 'next/link'
import {WixMediaImage} from './WixMediaImage'
import {Project} from '@/lib/types/wix'

interface AllProjectsItemsProps {
  lists: Project[]
}

function AllProjectsItems({lists}: AllProjectsItemsProps) {
  return (
    <>
      {lists.map((list: Project) => (
        <div
          className={`text-text-grey basis-6/12 bg-white shadow-[0_0_1px_0_rgba(0,0,0,0.3)] md:basis-1/4 ${list.filter}`}
          key={list._id}
        >
          <Link
            className="block"
            target="_blank"
            rel="noopener noreferrer"
            href={list.url as string}
            aria-label={list.title}
          >
            <div className="">
              <WixMediaImage media={list.image} alt={list.title} disableZoom={false} />
              <h4 className="text-grey px-2.5 py-5 text-sm lg:text-base">
                <span className="">Platform: &nbsp;</span>
                <span className="">{list.title}</span>
              </h4>
            </div>
          </Link>
        </div>
      ))}
    </>
  )
}

export default AllProjectsItems
