import Link from 'next/link'
import Image from 'next/image'
import {getWixClient} from '@/wix/useWixClientServer'
import RichContentViewer from '@/wix/RichContentViewer'
import {media} from '@wix/sdk'

type Props = {
  params: Promise<{slug: string}>
}

export async function generateMetadata(props: Props) {
  const params = await props.params

  const {slug} = params

  const queryWixBlogs: any = await getWixClient()

  const {items: blog} = await queryWixBlogs.items.query('blogPost').eq('slug', slug).find()

  const post = blog![0]

  const metaURL = media.getImageUrl(post.image).url
  const metaAuthor = post.refAuthors.title
  const metaDate = post._updatedDate.$date
  const metaTile = post.title

  return {
    title: metaTile,
    description: post.description,
    openGraph: {
      images: [
        {
          url: metaURL,
          width: 800,
          height: 600,
          alt: metaTile,
        },
      ],
      type: 'article',
      publishedTime: metaDate,
      authors: metaAuthor,
    },
    twitter: {
      images: [
        {
          url: metaURL,
          width: 800,
          height: 600,
          alt: metaTile,
        },
      ],
      creator: metaAuthor,
    },
  }
}

const Blog = async (props: Props) => {
  const params = await props.params

  const {slug} = params

  const queryWixBlogs: any = await getWixClient()

  const {items: blog} = await queryWixBlogs.items.query('blogPost').eq('slug', slug).find()

  const post = blog![0]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: post.publishedAt,
    description: post.description,
    author: [
      {
        '@type': 'Person',
        name: 'Luis Amador',
        url: `https://www.mrluisamador.com/blogs/${blog.slug}`,
        image: `metaURL`,
      },
    ],
  }

  return (
    <article className="py-16">
      {/* Add JSON-LD to your page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
      />

      <Link className="mx-2 mb-4 xl:mx-6 xl:mb-6 inline-block" href="/blogs">
        Back to Blogs
      </Link>
      <h1 className="text-center text-4xl xl:mb-12">{post.title}</h1>

      <div className="px-5 pt-14 xl:py-16 mx-auto max-w-4xl xl:shadow xl:shadow-black xl:rounded bg-white">
        <Image
          src={media.getImageUrl(post.image).url}
          width="896"
          height="800"
          alt={`media.getImageUrl(post.image).altText`}
          className="pb-16"
        />
        <RichContentViewer content={post.content} />
      </div>
    </article>
  )
}

export default Blog
