import Link from 'next/link'
import { getBlogs } from '@/sanity/lib/sanity-utils'

export default async function Blogs() {
  const blogs = await getBlogs()

  return (
    <>
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          Back to home
        </Link>
      </h2>

      <ul>
        {blogs.map((blog) => (
            <li key={blog._id}>
              <h1><Link href={`/blog/${blog.slug}`}>{blog.title}</Link></h1>
              <p>{blog.description}</p>
            </li>
        ))}
      </ul>
    </>
  )
}