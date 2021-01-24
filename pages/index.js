import Head from 'next/head'
import styles from '../styles/Bob.module.css'

function Home() {
  return (
    <>
      <Head>
        <title>Home | Experimental Projects</title>
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>

      <h1 className={styles.title}>
        Experimental Projects
      </h1>

      <h2 className={styles.description}>
        Get started by selecting one of the cards to pick and choose a project to review. 
      </h2>

      <div className={styles.grid}>
        <a href="/" className={styles.card}>
          <h3>WordPress Blog &rarr;</h3>
          <p>Coming Soon</p>
        </a>

        <a href="/" className={styles.card}>
          <h3>Shopify Store &rarr;</h3>
          <p>Coming Soon</p>
        </a>

        <a
          href="/"
          className={styles.card}
        >
          <h3>Big Com Store &rarr;</h3>
          <p>Coming Soon</p>
        </a>

        <a
          href="/"
          className={styles.card}
        >
          <h3>Magento Store &rarr;</h3>
          <p>Coming Soon</p>
        </a>
      </div>
    </>
  )
}

export default Home;