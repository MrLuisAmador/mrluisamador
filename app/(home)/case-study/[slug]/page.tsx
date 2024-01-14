import { getCaseStudy } from '@/sanity/lib/sanity-utils'
import {PortableText} from '@portabletext/react'
import {RichTextsComponents} from '../../../../sanity/lib/RichTextsComponents'
import Image from 'next/image';
import urlFor from '@/sanity/lib/urlFor';
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Case Study | Luis Amador Portfolio',
  description: 'Portfolio Website And Blog'
}

type Props = {
  params: { slug: string }
}

const Blog = async ({params: {slug}}: Props) => {
  
  const caseStudy =  await getCaseStudy(slug)
    return (
      <article className="py-16">
        <h1 className="text-center text-4xl mb-12">{caseStudy.title}</h1>
        <div className="px-5 py-16 mx-auto max-w-4xl xl:shadow xl:shadow-black xl:rounded bg-white">
          <Image className="pb-16" alt={caseStudy.title} src={urlFor(caseStudy.descriptionImage).url()} width={896} height={800} />
          <PortableText value={caseStudy.body} components={RichTextsComponents} />
        </div>
      </article>
    )
}

export default Blog