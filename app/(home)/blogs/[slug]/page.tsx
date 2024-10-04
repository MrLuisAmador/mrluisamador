import Link from 'next/link'
import Image from 'next/image'
import {getWixClient} from '@/wix/useWixClientServer'
import RichContentViewer from '@/wix/RichContentViewer'
import {toDraft} from 'ricos-content/libs/toDraft'
import {media} from '@wix/sdk'

type Props = {
  params: {slug: string}
}

export async function generateMetadata({params: {slug}}: Props) {
  const queryWixBlogs: any = await getWixClient()

  const {items: blog} = await queryWixBlogs.items
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
    .eq('slug', slug)
    .find()

  const post = blog![0]

  const metaURL = media.getImageUrl(post.data.image).url
  const metaAuthor = post.data.refAuthors.title
  const metaDate = post.data._updatedDate.$date
  const metaTile = post.data.title

  // console.log(post)
  // console.log(post.data)
  // console.log(post.data.authors)
  // console.log(post.data.categories)
  // console.log(media.getImageUrl(post.data.image).url)
  // console.log(media.getImageUrl(post.data.image).altText)

  return {
    title: metaTile,
    description: post.data.description,
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

const Blog = async ({params: {slug}}: Props) => {
  const queryWixBlogs: any = await getWixClient()

  const {items: blog} = await queryWixBlogs.items
    .queryDataItems({
      dataCollectionId: 'blogPost',
    })
    .eq('slug', slug)
    .find()

  const post = blog![0]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.data.title,
    datePublished: post.publishedAt,
    description: post.data.description,
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
      <h1 className="text-center text-4xl xl:mb-12">{post.data.title}</h1>

      <div className="px-5 pt-14 xl:py-16 mx-auto max-w-4xl xl:shadow xl:shadow-black xl:rounded bg-white">
        <Image
          src={media.getImageUrl(post.data.image).url}
          width="896"
          height="800"
          alt={`media.getImageUrl(post.data.image).altText`}
          className="pb-16"
        />
        <RichContentViewer content={toDraft(post.data!.content) as {blocks: any; entityMap: any}} />
      </div>
    </article>
  )
}

export default Blog
