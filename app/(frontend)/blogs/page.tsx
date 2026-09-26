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
        <p className="mb-4 text-on-surface">Unable to load blogs at the moment.</p>
        <p className="text-sm text-on-secondary-container">
          Please check back later or contact support if the issue persists.
        </p>
      </div>
    )
  }

  if (blogs.length === 0) {
    return <div className="py-20 text-center text-on-secondary-container">No blogs found.</div>
  }

  const featuredBlog = blogs[0]
  const otherBlogs = blogs.slice(1)

  return (
    <div className="space-y-12">
      {/* Featured Blog Post */}
      <article className="group grid items-center gap-8 rounded-xl border border-border-subtle bg-white p-6 card-shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:grid-cols-2 md:p-10">
        <div className="relative aspect-video overflow-hidden rounded-lg bg-surface-container">
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
            <div className="flex size-full items-center justify-center bg-surface-container-high">
              <span className="material-symbols-outlined text-4xl text-outline-variant">image</span>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center">
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full bg-surface-container-high px-3 py-1 text-[10px] font-bold tracking-widest text-on-surface uppercase">
              {featuredBlog.category || 'Engineering'}
            </span>
            <span className="text-label-sm font-label-sm text-on-secondary-container">
              {formatDate(featuredBlog.publishedDate)}
            </span>
          </div>
          <Link href={`/blogs/${featuredBlog.slug}`}>
            <h2 className="mb-4 cursor-pointer text-headline-md font-headline-md transition-colors group-hover:text-primary">
              {featuredBlog.title}
            </h2>
          </Link>
          <p className="mb-8 line-clamp-3 text-body-md font-body-md text-on-secondary-container">
            {featuredBlog.excerpt}
          </p>
          <Link
            className="group/link flex items-center gap-2 text-button font-button text-primary"
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
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-border-subtle bg-white card-shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-48 overflow-hidden bg-surface-container">
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
                  <div className="flex size-full items-center justify-center bg-surface-container-high">
                    <span className="material-symbols-outlined text-4xl text-outline-variant">
                      image
                    </span>
                  </div>
                )}
              </div>
              <div className="flex grow flex-col p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="rounded-full bg-surface-container-high px-3 py-1 text-[10px] font-bold tracking-widest text-on-surface uppercase">
                    {blog.category || 'Strategy'}
                  </span>
                  <span className="text-label-sm font-label-sm text-on-secondary-container opacity-60">
                    {formatDate(blog.publishedDate)}
                  </span>
                </div>
                <Link href={`/blogs/${blog.slug}`}>
                  <h3 className="mb-3 line-clamp-2 cursor-pointer text-headline-md font-headline-md text-xl transition-colors group-hover:text-primary">
                    {blog.title}
                  </h3>
                </Link>
                <p className="mb-6 line-clamp-3 text-body-md font-body-md text-on-secondary-container">
                  {blog.excerpt}
                </p>
                <div className="mt-auto">
                  <Link
                    className="group/link flex items-center gap-2 text-button font-button text-primary"
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
      <div className="grid animate-pulse items-center gap-8 rounded-xl border border-border-subtle bg-white p-10 card-shadow md:grid-cols-2">
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
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse overflow-hidden rounded-xl border border-border-subtle bg-white card-shadow"
          >
            <div className="h-48 bg-surface-container"></div>
            <div className="space-y-4 p-6">
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
    <div className="min-h-screen bg-surface">
      <main className="mx-auto max-w-container-max px-margin-mobile pt-24 pb-section-gap-lg md:px-gutter">
        {/* Header Section */}
        <header className="mb-16 max-w-3xl animate-fade-in-up">
          <span className="mb-4 block text-label-sm font-label-sm tracking-[0.2em] text-primary uppercase">
            Insights & Thoughts
          </span>
          <h1 className="mb-6 text-display-lg-mobile font-display-lg text-on-surface md:text-display-lg">
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
          <button className="flex size-10 cursor-not-allowed items-center justify-center rounded-full border border-border-subtle text-on-secondary-container opacity-50 transition-colors hover:bg-surface-container-high">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <span className="text-label-sm font-label-sm text-on-surface">Page 1 of 1</span>
          <button className="flex size-10 cursor-not-allowed items-center justify-center rounded-full border border-border-subtle text-on-secondary-container opacity-50 transition-colors hover:bg-surface-container-high">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </main>
    </div>
  )
}
