import Layout from "../components/layout/layout";
import Head from 'next/head'

import '../styles/normalize.scss';
import '../styles/variables.scss';
import '../styles/global.scss';

function MyApp({ Component, pageProps }) {
  return (
  <Layout>
    <Head>
      <link
          href="https://fonts.googleapis.com/css2?family=Alice&display=swap"
          rel="stylesheet"
      />

      <link
          href="https://fonts.googleapis.com/css2?family=Alice&family=Playfair+Display&display=swap"
          rel="stylesheet"
      />
    </Head>
    <Component {...pageProps} />
  </Layout>
  )
}

export default MyApp
