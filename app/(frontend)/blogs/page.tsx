import Link from 'next/link'
import {Metadata} from 'next'
import Image from 'next/image'
import {getPayload} from 'payload'
import config from '@/payload.config'
import {Suspense, ViewTransition} from 'react'
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
        <p className="text-on-surface mb-4">Unable to load blogs at the moment.</p>
        <p className="text-on-secondary-container text-sm">
          Please check back later or contact support if the issue persists.
        </p>
      </div>
    )
  }

  if (blogs.length === 0) {
    return <div className="text-on-secondary-container py-20 text-center">No blogs found.</div>
  }

  const featuredBlog = blogs[0]
  const otherBlogs = blogs.slice(1)

  return (
    <div className="space-y-12">
      {/* Featured Blog Post */}
      <article className="card-shadow border-border-subtle group grid items-center gap-8 rounded-xl border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:grid-cols-2 md:p-10">
        <div className="bg-surface-container relative aspect-video overflow-hidden rounded-lg">
          {featuredBlog.coverImage &&
          typeof featuredBlog.coverImage === 'object' &&
          featuredBlog.coverImage.url ? (
            <ViewTransition name={`blog-cover-${featuredBlog.slug}`} share="morph">
              <Image
                src={featuredBlog.coverImage.url}
                alt={featuredBlog.coverImage.alt || featuredBlog.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
            </ViewTransition>
          ) : (
            <div className="bg-surface-container-high flex h-full w-full items-center justify-center">
              <span className="material-symbols-outlined text-outline-variant text-4xl">image</span>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center">
          <div className="mb-4 flex items-center gap-3">
            <span className="bg-surface-container-high text-on-surface rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
              {featuredBlog.category || 'Engineering'}
            </span>
            <span className="text-label-sm font-label-sm text-on-secondary-container">
              {formatDate(featuredBlog.publishedDate)}
            </span>
          </div>
          <Link href={`/blogs/${featuredBlog.slug}`}>
            <h2 className="text-headline-md font-headline-md group-hover:text-primary mb-4 cursor-pointer transition-colors">
              {featuredBlog.title}
            </h2>
          </Link>
          <p className="text-body-md font-body-md text-on-secondary-container mb-8 line-clamp-3">
            {featuredBlog.excerpt}
          </p>
          <Link
            className="text-primary font-button text-button group/link flex items-center gap-2"
            href={`/blogs/${featuredBlog.slug}`}
          >
            Read More
            <span className="material-symbols-outlined transition-transform group-hover/link:translate-x-1">
              arrow_forward
            </span>
          </Link>
        </div>
      </article>

      {/* Grid for other posts */}
      {otherBlogs.length > 0 && (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {otherBlogs.map((blog) => (
            <article
              key={blog.id}
              className="card-shadow border-border-subtle group flex h-full flex-col overflow-hidden rounded-xl border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="bg-surface-container relative h-48 overflow-hidden">
                {blog.coverImage && typeof blog.coverImage === 'object' && blog.coverImage.url ? (
                  <ViewTransition name={`blog-cover-${blog.slug}`} share="morph">
                    <Image
                      src={blog.coverImage.url}
                      alt={blog.coverImage.alt || blog.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </ViewTransition>
                ) : (
                  <div className="bg-surface-container-high flex h-full w-full items-center justify-center">
                    <span className="material-symbols-outlined text-outline-variant text-4xl">
                      image
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-grow flex-col p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="bg-surface-container-high text-on-surface rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
                    {blog.category || 'Strategy'}
                  </span>
                  <span className="text-label-sm font-label-sm text-on-secondary-container opacity-60">
                    {formatDate(blog.publishedDate)}
                  </span>
                </div>
                <Link href={`/blogs/${blog.slug}`}>
                  <h3 className="text-headline-md font-headline-md group-hover:text-primary mb-3 line-clamp-2 cursor-pointer text-xl transition-colors">
                    {blog.title}
                  </h3>
                </Link>
                <p className="text-body-md font-body-md text-on-secondary-container mb-6 line-clamp-3">
                  {blog.excerpt}
                </p>
                <div className="mt-auto">
                  <Link
                    className="text-primary font-button text-button group/link flex items-center gap-2"
                    href={`/blogs/${blog.slug}`}
                  >
                    Read More
                    <span className="material-symbols-outlined transition-transform group-hover/link:translate-x-1">
                      arrow_forward
                    </span>
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
      <div className="card-shadow border-border-subtle grid animate-pulse items-center gap-8 rounded-xl border bg-white p-10 md:grid-cols-2">
        <div className="bg-surface-container aspect-video rounded-lg"></div>
        <div className="space-y-4">
          <div className="bg-surface-container-high h-6 w-32 rounded-full"></div>
          <div className="bg-surface-container-high h-10 w-full"></div>
          <div className="bg-surface-container-high h-4 w-3/4"></div>
          <div className="bg-surface-container-high h-4 w-5/6"></div>
          <div className="bg-surface-container-high h-10 w-32"></div>
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="card-shadow border-border-subtle animate-pulse overflow-hidden rounded-xl border bg-white"
          >
            <div className="bg-surface-container h-48"></div>
            <div className="space-y-4 p-6">
              <div className="bg-surface-container-high h-6 w-24 rounded-full"></div>
              <div className="bg-surface-container-high h-8 w-full"></div>
              <div className="space-y-2">
                <div className="bg-surface-container-high h-4 w-full"></div>
                <div className="bg-surface-container-high h-4 w-5/6"></div>
              </div>
              <div className="bg-surface-container-high h-4 w-24 pt-4"></div>
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
      <main className="pb-section-gap-lg px-margin-mobile md:px-gutter mx-auto max-w-300 pt-24">
        {/* Header Section */}
        <header className="animate-fade-in-up mb-16 max-w-3xl">
          <span className="text-label-sm font-label-sm text-primary mb-4 block tracking-[0.2em] uppercase">
            Insights & Thoughts
          </span>
          <h1 className="text-display-lg-mobile md:text-display-lg font-display-lg text-on-surface mb-6">
            Writing on Web Engineering & Strategy.
          </h1>
          <p className="text-body-lg font-body-lg text-on-secondary-container">
            A collection of technical deep-dives, architectural comparisons, and personal
            experiences building for the modern web.
          </p>
        </header>

        <Suspense
          fallback={
            <ViewTransition exit="slide-down">
              <BlogsListSkeleton />
            </ViewTransition>
          }
        >
          <ViewTransition enter="slide-up" default="none">
            <BlogsList />
          </ViewTransition>
        </Suspense>

        {/* Pagination placeholder (subtle) */}
        <div className="mt-20 flex items-center justify-center gap-4">
          <button className="border-border-subtle hover:bg-surface-container-high text-on-secondary-container flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-full border opacity-50 transition-colors">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <span className="text-label-sm font-label-sm text-on-surface">Page 1 of 1</span>
          <button className="border-border-subtle hover:bg-surface-container-high text-on-secondary-container flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-full border opacity-50 transition-colors">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </main>
    </div>
  )
}
