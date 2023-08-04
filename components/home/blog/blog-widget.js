import Link from 'next/link'
import { getBlogs } from '../../../sanity/lib/sanity-utils'

import styles from "./blog-widget.module.scss"

export default async function BlogWidget() {
  const blogs = await getBlogs()

  return (
    <section id="blog" className={styles.blog + " scrollto"}>
      <h1 className={styles.blogTitle}>Latest Blog</h1>

      <section className={styles.blogOuterWrap}>
        {blogs.map((blog) => (
           <article key={blog._id} className={styles.blogInnerWrap}>
             <h1>{blog.title}</h1>

             <p>{blog.description} […]</p>

             <Link className={styles.readMoreLink} href={`/blog/${blog.slug}`}>Read More...</Link>
           </article>

        )).slice(0,1)}
         </section>
    </section>
  )
}
