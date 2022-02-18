import AnchorLink from 'react-anchor-link-smooth-scroll'
import styles from './hero.module.scss'

const Hero = () => (
  <header className={styles.headerContainer}>
    <div className={styles.siteHeaderCenter}>
      <h1 className={styles.headerTitle}>Luis Amador</h1>

      <h2 className={styles.headerSubtitle}>
        <span className={styles.typejs}>Web Developer, making the web a better place.</span>
        <span className={styles.typedCursor}>|</span>
      </h2>

      <AnchorLink className={styles.headerCta} href="#contact-me">Let's Talk!</AnchorLink>
    </div>
  </header>
)

export default Hero
