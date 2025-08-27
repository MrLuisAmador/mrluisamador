import Link from 'next/link'
import {Metadata} from 'next'
import {getWixClient} from '@/lib/wix/useWixClientServer'
import Image from 'next/image'
import {media} from '@wix/sdk'
import CommentSection from '@/components/comments/CommentSection'

export const metadata: Metadata = {
  title: 'Blogs',
  description: 'Portfolio Website And Blog',
  alternates: {
    canonical: '/blogs',
  },
}

import {Suspense} from 'react'

async function BlogsList() {
  try {
    const myWixBlogs = await getWixClient()
    const {items: blogs} = await myWixBlogs.items.query('blogPost').descending('order').find()

    return (
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {blogs.map((blog) => (
          <li key={blog._id} className="shadow shadow-black rounded bg-white">
            <article className="py-5 px-4">
              <div className="">
                <Image
                  src={media.getImageUrl(blog.image).url}
                  width="896"
                  height="800"
                  alt={`media.getImageUrl(blog.data.image).altText`}
                  className="pb-4"
                />
              </div>
              <h2 className="text-center pb-4 font-bold text-xl">
                <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
              </h2>
              <p className="pb-4">{blog.description}</p>
              <div className="text-center">
                <Link
                  className="border border-solid border-black text-black py-2.5 px-4 inline-block rounded text-xl hover:bg-black/[.15] transition-colors"
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
  } catch (error) {
    console.error('Failed to fetch blogs:', error)
    return (
      <div className="text-center py-10">
        <p className="text-gray-600 mb-4">Unable to load blogs at the moment.</p>
        <p className="text-sm text-gray-500">
          Please check back later or contact support if the issue persists.
        </p>
      </div>
    )
  }
}

function BlogsListSkeleton() {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[...Array(4)].map((_, i) => (
        <li key={i} className="shadow shadow-black rounded bg-white animate-pulse">
          <article className="py-5 px-4">
            <div className="w-full h-48 bg-gray-200 rounded mb-4"></div>
            <div className="h-6 bg-gray-200 rounded mb-4 mx-auto w-3/4"></div>
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
            <div className="text-center">
              <div className="h-10 bg-gray-200 rounded w-32 mx-auto"></div>
            </div>
          </article>
        </li>
      ))}
    </ul>
  )
}

export default function Blogs() {
  return (
    <section className="h-full py-20 px-5">
      <h1 className="text-5xl text-center mb-20">Blogs</h1>

      <Suspense fallback={<BlogsListSkeleton />}>
        <BlogsList />
      </Suspense>
    </section>
  )
}
