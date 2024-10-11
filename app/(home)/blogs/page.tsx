import Link from 'next/link'
import {Metadata} from 'next'
import {getWixClient} from '@/wix/useWixClientServer'
import Image from 'next/image'
// import {formatDate} from '@/wix/date-formatter'
import {media} from '@wix/sdk'

export const metadata: Metadata = {
  title: 'Blogs',
  description: 'Portfolio Website And Blog',
}

export default async function Blogs() {
  const myWixBlogs: any = await getWixClient()

  const {items: blogs} = await myWixBlogs.items
    .queryDataItems({
      dataCollectionId: 'blogPost',
      referencedItemOptions: [
        {
          fieldName: 'refAuthors',
        },
        {
          fieldName: 'refCategories',
        },
      ],
    })
    .descending('order')
    .find()

  // console.log(blogs)

  return (
    <section className="h-full py-20 px-5">
      <h1 className="text-5xl text-center mb-20">Blogs</h1>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {blogs.map((blog: any) => (
          <li key={blog.data._id} className="shadow shadow-black rounded bg-white">
            {/* <p>Name {blog.data.refAuthors.title}</p> */}
            {/* <p>Name {blog.data.refCategories.title}</p> */}
            {/* <p className="">{formatDate(new Date(blog.data!._createdDate?.$date))}</p> */}
            {/* <p className="">{formatDate(new Date(blog.data!._updatedDate?.$date))}</p> */}
            <article className="py-5 px-4">
              <div className="">
                <Image
                  src={media.getImageUrl(blog.data!.image).url}
                  width="896"
                  height="800"
                  alt={`media.getImageUrl(blog.data.image).altText`}
                  className="pb-4"
                />
              </div>
              <h2 className="text-center pb-4 font-bold text-xl">
                <Link href={`/blogs/${blog.data.slug}`}>{blog.data.title}</Link>
              </h2>
              <p className="pb-4">{blog.data.description}</p>
              <div className="text-center">
                <Link
                  className="border border-solid border-black text-black py-2.5 px-4 inline-block rounded text-xl hover:bg-black/[.15] transition-colors"
                  href={`/blogs/${blog.data.slug}`}
                >
                  Read More...
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}
