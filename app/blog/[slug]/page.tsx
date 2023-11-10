import { getBlog } from '@/sanity/lib/sanity-utils'
import {PortableText} from '@portabletext/react'
import {RichTextsComponents} from '../components/RichTextsComponents'
import Image from 'next/image';
import urlFor from '@/sanity/lib/urlFor';


type Props = {
  params: { slug: string }
}

const Blog = async ({params: {slug}}: Props) => {
  
  const blog =  await getBlog(slug)
    return (
      <article className="py-16">
        <div className="px-5 py-16 mx-auto max-w-4xl xl:shadow xl:shadow-black xl:rounded bg-white">
          <Image className="pb-16" alt={blog.title} src={urlFor(blog.mainImage).url()} width={896} height={800} />
          <h1 className="text-center text-4xl mb-8">{blog.title}</h1>
          <PortableText value={blog.body} components={RichTextsComponents} />
        </div>
      </article>
    )
}

export default Blog