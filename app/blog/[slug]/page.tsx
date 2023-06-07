import { getBlog } from '@/sanity/schemas/sanity-utils'
import {PortableText} from '@portabletext/react'
import {getImageDimensions} from '@sanity/asset-utils'
import urlBuilder from '@sanity/image-url'


type Props = {
  params: { slug: string }
}

const Blog = async ({params}: Props) => {
  const slug = params.slug
  const blog =  await getBlog(slug)

    return (
      <>
       <h1>{blog.slug}</h1>
       <PortableText  
        value={blog.body} 
        components={components}
        />
      </>
    )
}

// Barebones lazy-loaded image component
const SampleImageComponent = ({value, isInline}) => {
  const {width, height} = getImageDimensions(value)
  return (
    <img
      src={urlBuilder()
        .image(value)
        .width(isInline ? 100 : 800)
        .fit('max')
        .auto('format')
        .url()}
      alt={value.alt || ' '}
      loading="lazy"
      style={{
        // Display alongside text if image appears inside a block text span
        display: isInline ? 'inline-block' : 'block',

        // Avoid jumping around with aspect-ratio CSS property
        aspectRatio: width / height,
      }}
    />
  )
}

const components = {
  types: {
    image: SampleImageComponent,
    // Any other custom types you have in your content
    // Examples: mapLocation, contactForm, code, featuredProjects, latestNews, etc.
  },
}

export default Blog