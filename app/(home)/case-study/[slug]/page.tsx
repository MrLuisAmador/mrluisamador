import {getCaseStudy} from '@/sanity/lib/sanity-utils'
import {PortableText} from '@portabletext/react'
import {RichTextsComponents} from '../../../../sanity/lib/RichTextsComponents'
import Image from 'next/image'
import urlFor from '@/sanity/lib/urlFor'
import {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Case Study | Luis Amador Portfolio',
  description: 'Portfolio Website And Blog',
}

type Props = {
  params: {slug: string}
}

const Blog = async ({params: {slug}}: Props) => {
  const caseStudy = await getCaseStudy(slug)
  return (
    <article className="py-16 px-5">
      <h1 className="text-center text-4xl mb-12">{caseStudy.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-4">
        <div className="px-5 py-16 shadow shadow-black rounded bg-white md:order-last md:col-span-4 md:sticky md:top-9">
          <h2 className="max-md:text-center pb-4 font-bold text-xl">Technology List:</h2>
          <PortableText value={caseStudy.technology} components={RichTextsComponents} />
        </div>

        <div className="px-5 py-16 shadow shadow-black rounded bg-white md:col-span-8">
          <Image
            className="pb-16"
            alt={caseStudy.title}
            src={urlFor(caseStudy.descriptionImage).url()}
            width={896}
            height={800}
          />
          <PortableText value={caseStudy.body} components={RichTextsComponents} />
        </div>
      </div>
    </article>
  )
}

export default Blog
