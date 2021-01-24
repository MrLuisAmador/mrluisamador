import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
  <>
    <main className="main">
      <Component {...pageProps} />
    </main>

    <footer className="footer">
      <a
        href="https://www.mrluisamador.com/"
        target="_blank"
        rel="noopener noreferrer"
      >Powered by Luis Amador
      </a>
    </footer>
  </>
  )
}

export default MyApp
