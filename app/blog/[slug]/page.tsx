import { getBlog } from '@/sanity/lib/sanity-utils'
import {PortableText} from '@portabletext/react'
import {RichTextsComponents} from '../../../components/sanity/RichTextsComponents'


type Props = {
  params: { slug: string }
}

const Blog = async ({params: {slug}}: Props) => {
  
  const blog =  await getBlog(slug)
    return (
      <>
       <h1>{blog.title}</h1>
       <p>{blog.slug}</p>
       <PortableText value={blog.body} components={RichTextsComponents} />
      </>
    )
}

export default Blog