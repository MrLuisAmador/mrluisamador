import Image from 'next/image';
import Link from 'next/link'


function AllProjectsItem({lists}) {
    
return (
        <>
            { lists.map( list => (
                <div className={ `basis-6/12 md:basis-1/4 bg-white shadow-[0_0_1px_0_rgba(0,0,0,0.3)] text-text-grey ${list.filter}` } key={list.id}>
                    <Link className="block" target="_blank" rel="noopener noreferrer" href={list.url} aria-label={list.label}>
                        <div className="">
                            <div className="">
                                <Image
                                    width={800}
                                    height={389}
                                    rel="noopener noreferrer"
                                    src={list.image}
                                    className="block"
                                    alt={list.label}
                                />
                            </div>
                            <h4 className="text-grey text-sm px-2.5 py-5 lg:text-base">
                                <span className="">Platform: &nbsp;</span>
                                <span className="">{list.platform}</span>
                            </h4>
                        </div>
                    </Link>
                </div>
            ))}
        </>
    )
}

export default AllProjectsItem;