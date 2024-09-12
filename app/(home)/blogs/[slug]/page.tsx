import {getBlog} from '@/sanity/lib/sanity-utils'
import {PortableText} from '@portabletext/react'
import {RichTextsComponents} from '../../../../sanity/lib/RichTextsComponents'
import Image from 'next/image'
import urlFor from '@/sanity/lib/urlFor'
import {Metadata} from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog | Luis Amador Portfolio',
  description: 'Portfolio Website And Blog',
}

type Props = {
  params: {slug: string}
}

const Blog = async ({params: {slug}}: Props) => {
  const blog = await getBlog(slug)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    datePublished: blog.publishedAt,
    description: blog.description,
    author: [
      {
        '@type': 'Person',
        name: 'Luis Amador',
        url: `https://www.mrluisamador.com/blogs/${blog.slug}`,
        image: urlFor(blog.mainImage).url(),
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
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2988961562271197"
        crossOrigin="anonymous"
      ></script>
      {/* <!-- In feed ads --> */}
      <ins
        className="adsbygoogle"
        style={{display: 'block'}}
        data-ad-client="ca-pub-2988961562271197"
        data-ad-slot="6682160780"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      {/* <!-- In feed ads --> */}
      {/* <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2988961562271197"
        crossOrigin="anonymous"
      ></script>
      <ins
        className="adsbygoogle"
        style={{display: 'block'}}
        data-ad-format="fluid"
        data-ad-layout-key="+3d+ql+42-68+4l"
        data-ad-client="ca-pub-2988961562271197"
        data-ad-slot="5724302338"
      ></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script> */}
      {/* <!-- In feed ads --> */}
      {/* <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2988961562271197"
        crossOrigin="anonymous"
      ></script>
      <ins
        className="adsbygoogle"
        style={{display: 'block', textAlign: 'center'}}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-2988961562271197"
        data-ad-slot="7549014731"
      ></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script> */}
      <Link className="mx-2 mb-4 xl:mx-6 xl:mb-6 inline-block" href="/blogs">
        Back to Blogs
      </Link>
      <h1 className="text-center text-4xl xl:mb-12">{blog.title}</h1>
      <div className="px-5 pt-14 xl:py-16 mx-auto max-w-4xl xl:shadow xl:shadow-black xl:rounded bg-white">
        <Image
          className="pb-16 underline"
          alt={blog.title}
          src={urlFor(blog.mainImage).url()}
          width={896}
          height={800}
        />
        <PortableText value={blog.body} components={RichTextsComponents} />
      </div>
    </article>
  )
}

export default Blog
