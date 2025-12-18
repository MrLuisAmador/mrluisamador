import Link from 'next/link'
import {Metadata} from 'next'
import {getWixClient} from '@/lib/wix/useWixClientServer'
import Image from 'next/image'
import {media} from '@wix/sdk'

export const metadata: Metadata = {
  title: 'Blogs',
  description: 'Portfolio Website And Blog',
  alternates: {
    canonical: '/blogs',
  },
}

import {Suspense} from 'react'

async function BlogsList() {
  let blogs
  try {
    const myWixBlogs = await getWixClient()
    const result = await myWixBlogs.items.query('blogPost').descending('order').find()
    blogs = result.items
  } catch {
    // Wix API may not be available during build-time static generation
    // Error is handled gracefully with user-friendly message
    return (
      <div className="py-10 text-center">
        <p className="mb-4 text-gray-600">Unable to load blogs at the moment.</p>
        <p className="text-sm text-gray-500">
          Please check back later or contact support if the issue persists.
        </p>
      </div>
    )
  }

  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {blogs.map((blog) => (
        <li key={blog._id} className="rounded bg-white shadow shadow-black">
          <article className="px-4 py-5">
            <div className="">
              <Image
                src={media.getImageUrl(blog.image).url}
                width="896"
                height="800"
                alt={`media.getImageUrl(blog.data.image).altText`}
                className="pb-4"
              />
            </div>
            <h2 className="pb-4 text-center text-xl font-bold">
              <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
            </h2>
            <p className="pb-4">{blog.description}</p>
            <div className="text-center">
              <Link
                className="inline-block rounded border border-solid border-black px-4 py-2.5 text-xl text-black transition-colors hover:bg-black/15"
                href={`/blogs/${blog.slug}`}
              >
                Read More...
              </Link>
            </div>
          </article>
        </li>
      ))}
    </ul>
  )
}

function BlogsListSkeleton() {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {[...Array(4)].map((_, i) => (
        <li key={i} className="animate-pulse rounded bg-white shadow shadow-black">
          <article className="px-4 py-5">
            <div className="mb-4 h-48 w-full rounded bg-gray-200"></div>
            <div className="mx-auto mb-4 h-6 w-3/4 rounded bg-gray-200"></div>
            <div className="mb-4 space-y-2">
              <div className="h-4 rounded bg-gray-200"></div>
              <div className="h-4 w-5/6 rounded bg-gray-200"></div>
            </div>
            <div className="text-center">
              <div className="mx-auto h-10 w-32 rounded bg-gray-200"></div>
            </div>
          </article>
        </li>
      ))}
    </ul>
  )
}

export default function Blogs() {
  return (
    <section className="h-full px-5 py-20">
      <h1 className="mb-20 text-center text-5xl">Blogs</h1>

      <Suspense fallback={<BlogsListSkeleton />}>
        <BlogsList />
      </Suspense>
    </section>
  )
}
