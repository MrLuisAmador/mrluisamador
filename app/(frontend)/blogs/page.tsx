import Link from 'next/link'
import {Metadata} from 'next'
import Image from 'next/image'
import {getPayload} from 'payload'
import config from '@/payload.config'
import {Suspense} from 'react'
import {Blog as PayloadBlog} from '@/payload-types'

export const metadata: Metadata = {
  title: 'Blogs',
  description: 'Writing on Web Engineering & Strategy.',
  alternates: {
    canonical: '/blogs',
  },
}

function formatDate(dateString?: string | null) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

async function BlogsList() {
  let blogs: PayloadBlog[] = []
  try {
    const payload = await getPayload({config})
    const result = await payload.find({
      collection: 'blogs',
      sort: '-publishedDate',
      limit: 100,
      pagination: false,
    })
    blogs = result.docs
  } catch (error) {
    console.error('Error fetching blogs from Payload:', error)
    return (
      <div className="py-20 text-center">
        <p className="mb-4 text-on-surface">Unable to load blogs at the moment.</p>
        <p className="text-sm text-on-secondary-container">
          Please check back later or contact support if the issue persists.
        </p>
      </div>
    )
  }

  if (blogs.length === 0) {
    return (
      <div className="py-20 text-center text-on-secondary-container">
        No blogs found.
      </div>
    )
  }

  const featuredBlog = blogs[0]
  const otherBlogs = blogs.slice(1)

  return (
    <div className="space-y-12">
      {/* Featured Blog Post */}
      <article className="grid md:grid-cols-2 gap-8 items-center bg-white p-6 md:p-10 rounded-xl card-shadow border border-border-subtle group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="relative aspect-video overflow-hidden rounded-lg bg-surface-container">
          {featuredBlog.coverImage && typeof featuredBlog.coverImage === 'object' && featuredBlog.coverImage.url ? (
            <Image
              src={featuredBlog.coverImage.url}
              alt={featuredBlog.coverImage.alt || featuredBlog.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-surface-container-high">
              <span className="material-symbols-outlined text-outline-variant text-4xl">image</span>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-surface-container-high px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-on-surface uppercase">
              {featuredBlog.category || 'Engineering'}
            </span>
            <span className="text-label-sm font-label-sm text-on-secondary-container">
              {formatDate(featuredBlog.publishedDate)}
            </span>
          </div>
          <Link href={`/blogs/${featuredBlog.slug}`}>
            <h2 className="text-headline-md font-headline-md mb-4 group-hover:text-primary transition-colors cursor-pointer">
              {featuredBlog.title}
            </h2>
          </Link>
          <p className="text-body-md font-body-md text-on-secondary-container mb-8 line-clamp-3">
            {featuredBlog.excerpt}
          </p>
          <Link 
            className="flex items-center gap-2 text-primary font-button text-button group/link" 
            href={`/blogs/${featuredBlog.slug}`}
          >
            Read More
            <span className="material-symbols-outlined group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
        </div>
      </article>

      {/* Grid for other posts */}
      {otherBlogs.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherBlogs.map((blog) => (
            <article 
              key={blog.id} 
              className="bg-white flex flex-col h-full rounded-xl card-shadow border border-border-subtle overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-48 overflow-hidden bg-surface-container">
                {blog.coverImage && typeof blog.coverImage === 'object' && blog.coverImage.url ? (
                  <Image
                    src={blog.coverImage.url}
                    alt={blog.coverImage.alt || blog.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-surface-container-high">
                    <span className="material-symbols-outlined text-outline-variant text-4xl">image</span>
                  </div>
                )}
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-surface-container-high px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-on-surface uppercase">
                    {blog.category || 'Strategy'}
                  </span>
                  <span className="text-label-sm font-label-sm text-on-secondary-container opacity-60">
                    {formatDate(blog.publishedDate)}
                  </span>
                </div>
                <Link href={`/blogs/${blog.slug}`}>
                  <h3 className="text-headline-md font-headline-md text-xl mb-3 group-hover:text-primary transition-colors cursor-pointer line-clamp-2">
                    {blog.title}
                  </h3>
                </Link>
                <p className="text-body-md font-body-md text-on-secondary-container mb-6 line-clamp-3">
                  {blog.excerpt}
                </p>
                <div className="mt-auto">
                  <Link 
                    className="flex items-center gap-2 text-primary font-button text-button group/link" 
                    href={`/blogs/${blog.slug}`}
                  >
                    Read More
                    <span className="material-symbols-outlined group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

function BlogsListSkeleton() {
  return (
    <div className="space-y-12">
      {/* Featured Skeleton */}
      <div className="grid md:grid-cols-2 gap-8 items-center bg-white p-10 rounded-xl card-shadow border border-border-subtle animate-pulse">
        <div className="aspect-video rounded-lg bg-surface-container"></div>
        <div className="space-y-4">
          <div className="h-6 w-32 rounded-full bg-surface-container-high"></div>
          <div className="h-10 w-full bg-surface-container-high"></div>
          <div className="h-4 w-3/4 bg-surface-container-high"></div>
          <div className="h-4 w-5/6 bg-surface-container-high"></div>
          <div className="h-10 w-32 bg-surface-container-high"></div>
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl card-shadow border border-border-subtle overflow-hidden animate-pulse">
            <div className="h-48 bg-surface-container"></div>
            <div className="p-6 space-y-4">
              <div className="h-6 w-24 rounded-full bg-surface-container-high"></div>
              <div className="h-8 w-full bg-surface-container-high"></div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-surface-container-high"></div>
                <div className="h-4 w-5/6 bg-surface-container-high"></div>
              </div>
              <div className="h-4 w-24 bg-surface-container-high pt-4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Blogs() {
  return (
    <div className="bg-surface min-h-screen">
      <main className="pt-24 pb-section-gap-lg max-w-[1200px] mx-auto px-margin-mobile md:px-gutter">
        {/* Header Section */}
        <header className="max-w-3xl mb-16 animate-fade-in-up">
          <span className="text-label-sm font-label-sm text-primary uppercase tracking-[0.2em] mb-4 block">
            Insights & Thoughts
          </span>
          <h1 className="text-display-lg-mobile md:text-display-lg font-display-lg text-on-surface mb-6">
            Writing on Web Engineering & Strategy.
          </h1>
          <p className="text-body-lg font-body-lg text-on-secondary-container">
            A collection of technical deep-dives, architectural comparisons, and personal experiences building for the modern web.
          </p>
        </header>

        <Suspense fallback={<BlogsListSkeleton />}>
          <BlogsList />
        </Suspense>

        {/* Pagination placeholder (subtle) */}
        <div className="mt-20 flex justify-center items-center gap-4">
          <button className="w-10 h-10 rounded-full flex items-center justify-center border border-border-subtle hover:bg-surface-container-high transition-colors text-on-secondary-container opacity-50 cursor-not-allowed">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <span className="text-label-sm font-label-sm text-on-surface">Page 1 of 1</span>
          <button className="w-10 h-10 rounded-full flex items-center justify-center border border-border-subtle hover:bg-surface-container-high transition-colors text-on-secondary-container opacity-50 cursor-not-allowed">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </main>
    </div>
  )
}
