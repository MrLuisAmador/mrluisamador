import {getBlog} from '@/sanity/lib/sanity-utils'
import {PortableText} from '@portabletext/react'
import {RichTextsComponents} from '../../../../sanity/lib/RichTextsComponents'
import Image from 'next/image'
import urlFor from '@/sanity/lib/urlFor'
import {Metadata} from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog | Luis Amador Portfolio',
  description: 'Portfolio Website And Blog',
}

type Props = {
  params: {slug: string}
}

const Blog = async ({params: {slug}}: Props) => {
  const blog = await getBlog(slug)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    datePublished: blog.publishedAt,
    description: blog.description,
    author: [
      {
        '@type': 'Person',
        name: blog.author.name,
        url: `https://www.mrluisamador.com/blogs/${blog.slug}`,
        image: urlFor(blog.mainImage).url(),
      },
    ],
  }

  return (
    <article className="py-16">
      {/* Add JSON-LD to your page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
      />
      <Link className="mx-2 mb-4 xl:mx-6 xl:mb-6 inline-block" href="/blogs">
        Back to Blogs
      </Link>
      <h1 className="text-center text-4xl xl:mb-12">{blog.title}</h1>
      <div className="px-5 pt-14 xl:py-16 mx-auto max-w-4xl xl:shadow xl:shadow-black xl:rounded bg-white">
        <Image
          className="pb-16 underline"
          alt={blog.title}
          src={urlFor(blog.mainImage).url()}
          width={896}
          height={800}
        />
        <PortableText value={blog.body} components={RichTextsComponents} />
      </div>
    </article>
  )
}

export default Blog
