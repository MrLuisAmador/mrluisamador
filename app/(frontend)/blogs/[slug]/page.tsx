import Link from 'next/link'
import Image from 'next/image'
import {getWixClient} from '@/lib/wix/useWixClientServer'
import RichContentViewer from '@/components/wix/RichContentViewer'
import {media} from '@wix/sdk'
import GoogleAd from '@/components/google/google-adsense'
import CommentSection from '@/components/comments/CommentSection'
import {Suspense} from 'react'
import {Metadata} from 'next'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{slug: string}>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params

  const {slug} = params

  const queryWixBlogs = await getWixClient()

  const {items: blog} = await queryWixBlogs.items.query('blogPost').eq('slug', slug).find()

  const post = blog![0]

  const metaURL = media.getImageUrl(post.image).url
  const metaAuthor = post.refAuthors.title
  const metaDate = post._updatedDate?.toISOString()
  const metaTile = post.title

  return {
    title: metaTile,
    description: post.description,
    alternates: {
      canonical: `/blogs/${slug}`,
    },
    openGraph: {
      images: [
        {
          url: metaURL,
          width: 800,
          height: 600,
          alt: metaTile,
        },
      ],
      type: 'article',
      publishedTime: metaDate,
      authors: metaAuthor,
    },
    twitter: {
      images: [
        {
          url: metaURL,
          width: 800,
          height: 600,
          alt: metaTile,
        },
      ],
      creator: metaAuthor,
    },
  }
}

async function BlogContent({slug: blogSlug}: {slug: string}) {
  const queryWixBlogs = await getWixClient()

  const {items: blog} = await queryWixBlogs.items.query('blogPost').eq('slug', blogSlug).find()

  const post = blog![0]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: post.publishedAt,
    description: post.description,
    author: [
      {
        '@type': 'Person',
        name: 'Luis Amador',
        url: `https://www.mrluisamador.com/blogs/${post.slug}`,
        image: media.getImageUrl(post.image).url,
      },
    ],
  }

  return (
    <>
      {/* Add JSON-LD to your page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
      />

      <Link
        className="mx-2 mb-4 inline-block hover:cursor-pointer hover:text-blue-600 xl:mx-6 xl:mb-6"
        href="/blogs"
      >
        ← Back to the Blogs
      </Link>
      <h1 className="text-center text-4xl xl:mb-12">{post.title}</h1>

      <div className="mx-auto max-w-4xl bg-white px-5 pt-14 xl:rounded xl:py-16 xl:shadow-sm xl:shadow-black">
        <Image
          src={media.getImageUrl(post.image).url}
          width="896"
          height="800"
          alt={`media.getImageUrl(post.image).altText`}
          className="pb-16"
        />
        <div className="my-8">
          <GoogleAd adSlot="6232399682" />
        </div>
        <RichContentViewer content={post.content} />
      </div>

      <div className="mx-auto max-w-4xl px-5 md:px-0">
        <CommentSection blogSlug={blogSlug} />
      </div>
    </>
  )
}

function BlogSkeleton() {
  return (
    <>
      <div className="mx-2 mb-4 h-6 w-32 animate-pulse bg-gray-200 xl:mx-6 xl:mb-6"></div>
      <div className="mx-auto mb-12 h-12 w-3/4 animate-pulse bg-gray-200"></div>
      <div className="mx-auto max-w-4xl bg-white px-5 pt-14 xl:rounded xl:py-16 xl:shadow-sm xl:shadow-black">
        <div className="mb-16 h-96 w-full animate-pulse bg-gray-200"></div>
        <div className="my-8 h-32 w-full animate-pulse bg-gray-200"></div>
        <div className="space-y-4">
          <div className="h-4 w-full animate-pulse bg-gray-200"></div>
          <div className="h-4 w-5/6 animate-pulse bg-gray-200"></div>
          <div className="h-4 w-full animate-pulse bg-gray-200"></div>
        </div>
      </div>
      <div className="mx-auto max-w-4xl px-5 md:px-0">
        <div className="h-64 w-full animate-pulse bg-gray-200"></div>
      </div>
    </>
  )
}

const Blog = async (props: Props) => {
  const params = await props.params
  const {slug} = params

  return (
    <article className="py-16">
      <Suspense fallback={<BlogSkeleton />}>
        <BlogContent slug={slug} />
      </Suspense>
    </article>
  )
}

export default Blog
