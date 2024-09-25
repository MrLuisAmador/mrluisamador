import Script from 'next/script'
import Nav from '../components/nav'
import Footer from '../components/footer'
import {Metadata} from 'next'

import {Alice, Playfair_Display} from 'next/font/google'
import '../../styles/global.css'

const alice = Alice({
  weight: '400',
  variable: '--title-font',
  subsets: ['latin'],
  display: 'swap',
})

const playfair_display = Playfair_Display({
  variable: '--text-font',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Web Developer Portfolio',
    default: 'Luis Amador',
  },
  keywords: ['Next.js', 'React', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Portfolio'],
  alternates: {
    canonical: 'https://mrluisamador.com/',
  },
}

export default function HomeLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${alice.variable} ${playfair_display.variable}`}>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2988961562271197`}
        strategy="afterInteractive"
      />
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=G-M2KRSHY4X8'`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
         window.dataLayer = window.dataLayer || [];
         function gtag(){dataLayer.push(arguments);}
         gtag('js', new Date());
         gtag('config', 'G-M2KRSHY4X8');
        `}
      </Script>
      <body>
        <div className="w-[calc(100%-70px) mr-[70px] lg:w-[calc(100%-350px)] lg:mr-[350px]">
          <Nav />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
