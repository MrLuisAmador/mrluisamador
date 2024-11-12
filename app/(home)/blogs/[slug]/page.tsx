import Link from 'next/link'
import {getBlog} from '@/sanity/lib/sanity-utils'
import {PortableText} from '@portabletext/react'
import {RichTextsComponents} from '../../../../sanity/lib/RichTextsComponents'
import Image from 'next/image'
import urlFor from '@/sanity/lib/urlFor'
import {Metadata} from 'next'

type Props = {
  params: {
    slug: string
  }
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const post = await getBlog(params.slug)

  const metaURL = urlFor(post.mainImage).url()
  const metaAuthor = post.author.name
  const metaDate = post._updatedAt
  const metaTitle = post.title

  return {
    title: metaTitle,
    description: post.description,
    openGraph: {
      images: [
        {
          url: metaURL,
          width: 800,
          height: 600,
          alt: metaTitle,
        },
      ],
      type: 'article',
      publishedTime: metaDate,
      authors: [metaAuthor],
    },
    twitter: {
      card: 'summary_large_image',
      images: [
        {
          url: metaURL,
          width: 800,
          height: 600,
          alt: metaTitle,
        },
      ],
      creator: metaAuthor,
    },
  }
}

export default async function Blog({params}: Props) {
  const blog = await getBlog(params.slug)

  return (
    <article className="py-16">
      <Link className="mx-2 mb-4 xl:mx-6 xl:mb-6 inline-block" href="/blogs">
        Back to Blogs
      </Link>
      <h1 className="text-center text-4xl mb-12">{blog.title}</h1>
      <div className="px-5 py-16 mx-auto max-w-4xl xl:shadow xl:shadow-black xl:rounded bg-white">
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
