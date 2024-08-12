import Link from 'next/link'
import {WixMediaImage} from '../../../wix/WixMediaImage'

function AllProjectsItem({lists}: any) {
  return (
    <>
      {lists.map((list: any) => (
        <div
          className={`basis-6/12 md:basis-1/4 bg-white shadow-[0_0_1px_0_rgba(0,0,0,0.3)] text-text-grey ${list.data.filter}`}
          key={list._id}
        >
          <Link
            className="block"
            target="_blank"
            rel="noopener noreferrer"
            href={list.data.url}
            aria-label={list.data.title}
          >
            <div className="">
              <WixMediaImage media={list.data.image} alt={list.data.title} disableZoom={false} />
              <h4 className="text-grey text-sm px-2.5 py-5 lg:text-base">
                <span className="">Platform: &nbsp;</span>
                <span className="">{list.data.title}</span>
              </h4>
            </div>
          </Link>
        </div>
      ))}
    </>
  )
}

export default AllProjectsItem
