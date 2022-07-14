import Layout from "../components/layout/layout";
import Head from 'next/head'

import '../styles/normalize.scss';
import '../styles/variables.scss';
import '../styles/global.scss';
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
  <Layout>
    <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=UA-70247510-1`}
    />
    <Script id="google-analytics" strategy="lazyOnload">
      {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
             gtag('config', 'UA-70247510-1', {
              page_path: window.location.pathname,
            });
                `}
    </Script>

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
