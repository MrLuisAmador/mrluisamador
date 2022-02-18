import Link from 'next/link';
import styles from "./blog-widget.module.scss";

const BlogWidget = () => {
  return (
        <section id="blog" className={styles.blog + " scrollto"}>
          <h1 className={styles.blogTitle}>Latest Blog</h1>

          <div className={styles.blogOuterWrap}>
            <div className={styles.blogInnerWrap}>
              <h1>JavaScript Compared to PHP Series</h1>

              <p>What are the two language purposes? After several years of web development. I’ve decided to compare JavaScript and PHP head to head. I will try to outline its comparison on a side by side outline, in an effort to truly understand how each work, and how they differ from each other. Both these languages can be […]</p>

              <Link className={styles.readMoreLink} href="#"><a>Read More...</a></Link>
            </div>

            <div className={styles.blogInnerWrap}>
              <h1>Add a slideshow to your Magento 2</h1>

              <p>When it comes to picking a good theme as a starting point, the Ultimo theme seems to be the one we go with the most. It does come with some advanced admin modules and it’s extremely customizable. Making it the number one selling Magento theme on themeforest.net. Ultimo is equipped with administrative module which gives […]</p>

              <Link href="#"><a className={styles.readMoreLink}>Read More...</a></Link>
            </div>
          </div>

          <Link href="/blog"><a className={styles.blogBtn}>More Blogs</a></Link>
        </section>
  )
}

export default BlogWidget
