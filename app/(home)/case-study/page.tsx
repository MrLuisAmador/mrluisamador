import Link from 'next/link'
import Image from 'next/image';
import { getCaseStudies } from '@/sanity/lib/sanity-utils'
import urlFor from '@/sanity/lib/urlFor';

export default async function caseStudy() {
    const caseStudies = await getCaseStudies()

    return (
        <section className="h-full py-20 px-5">
            <h1 className="text-5xl text-center mb-10 md:mb-20">Case Study</h1>

            <ul className="grid grid-cols-1 gap-4">
            {caseStudies.map((cases) => (
                <li key={cases._id} className="shadow shadow-black rounded bg-white">
                    <article className="grid grid-cols-1 md:grid-cols-2 gap-4 py-5 px-4">
                        <div className="">
                            <Image className="pb-4" alt={cases.title} src={urlFor(cases.mainImage).url()} width={800} height={400} />
                        </div>

                        <div>
                            <h2 className="text-center pb-4 font-bold text-xl"><Link href={`/blog/${cases.slug}`}>{cases.title}</Link></h2>
                            <p className="pb-4">{cases.description}</p>
                            <div className="text-center">
                                <Link className="border border-solid border-black text-black py-2.5 px-4 inline-block rounded text-xl hover:bg-black/[.15] transition-colors" href={`/case-study/${cases.slug}`}>Read More...</Link>
                            </div>
                        </div>
                    </article>
                </li>
            ))}
            </ul>
        </section>
    )
}