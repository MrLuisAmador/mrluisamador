import Link from 'next/link'
import Image from 'next/image'
import {getWixClient} from '@/lib/wix/useWixClientServer'
import RichContentViewer from '@/components/wix/RichContentViewer'
import {media} from '@wix/sdk'
import GoogleAd from '@/components/google/google-adsense'
import CommentSection from '@/components/comments/CommentSection'

type Props = {
  params: Promise<{slug: string}>
}

export async function generateMetadata(props: Props) {
  const params = await props.params

  const {slug} = params

  const queryWixBlogs = await getWixClient()

  const {items: blog} = await queryWixBlogs.items.query('blogPost').eq('slug', slug).find()

  const post = blog![0]

  const metaURL = media.getImageUrl(post.image).url
  const metaAuthor = post.refAuthors.title
  const metaDate = post._updatedDate?.toISOString()
  const metaTile = post.title

  return {
    title: metaTile,
    description: post.description,
    alternates: {
      canonical: `/blogs/${slug}`,
    },
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

  const queryWixBlogs = await getWixClient()

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
        url: `https://www.mrluisamador.com/blogs/${post.slug}`,
        image: media.getImageUrl(post.image).url,
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
        <div className="my-8">
          <GoogleAd adSlot="6232399682" />
        </div>
        <RichContentViewer content={post.content} />
      </div>

      {/* Comments Section */}
      <div className="px-5 mx-auto max-w-4xl">
        <CommentSection blogSlug={slug} />
      </div>
    </article>
  )
}

export default Blog
