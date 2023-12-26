import Link from 'next/link'
import Image from 'next/image';
import { getBlogs } from '@/sanity/lib/sanity-utils'
import urlFor from '@/sanity/lib/urlFor';

export default async function Blogs() {
  const blogs = await getBlogs()
  
  return (
    <section className="h-full py-20 px-5">
      <h1 className="text-5xl text-center mb-20">Blog</h1>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {blogs.map((blog) => (
            <li key={blog._id} className="shadow shadow-black rounded bg-white">
              <article className="py-5 px-4">
                <div className="">
                  <Image className="pb-4" alt={blog.title} src={urlFor(blog.descriptionImage).url()} width={600} height={400} />
                </div>
                <h2 className="text-center pb-4 font-bold text-xl"><Link href={`/blog/${blog.slug}`}>{blog.title}</Link></h2>
                <p className="pb-4">{blog.description}</p>
                <div className="text-center">
                  <Link className="border border-solid border-black text-black py-2.5 px-4 inline-block rounded text-xl hover:bg-black/[.15] transition-colors" href={`/blog/${blog.slug}`}>Read More...</Link>
                </div>
              </article>
            </li>
        ))}
      </ul>
    </section>
  )
}