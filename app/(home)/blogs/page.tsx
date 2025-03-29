import Link from 'next/link'
import {Metadata} from 'next'
import {getWixClient} from '@/wix/useWixClientServer'
import Image from 'next/image'
import {media} from '@wix/sdk'

export const metadata: Metadata = {
  title: 'Blogs',
  description: 'Portfolio Website And Blog',
}

export default async function Blogs() {
  const myWixBlogs: any = await getWixClient()

  const {items: blogs} = await myWixBlogs.items.query('blogPost').descending('order').find()

  return (
    <section className="h-full py-20 px-5">
      <h1 className="text-5xl text-center mb-20">Blogs</h1>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {blogs.map((blog: any) => (
          <li key={blog._id} className="shadow shadow-black rounded bg-white">
            {/* <p>Name {blog.data.refAuthors.title}</p> */}
            {/* <p>Name {blog.data.refCategories.title}</p> */}
            {/* <p className="">{formatDate(new Date(blog.data!._createdDate?.$date))}</p> */}
            {/* <p className="">{formatDate(new Date(blog.data!._updatedDate?.$date))}</p> */}
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
      <ins
        className="adsbygoogle"
        style={{display: 'block'}}
        data-ad-client="ca-pub-2988961562271197"
        data-ad-slot="6232399682"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    </section>
  )
}
