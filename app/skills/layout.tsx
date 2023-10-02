import Script from 'next/script'
import Nav from "../../components/nav/nav.js"
import Footer from "../../components/footer/footer"
import { Metadata } from 'next'

import { Alice, Playfair_Display } from 'next/font/google';
import '../../styles/global.scss';

const alice = Alice({
  weight: '400',
  variable: '--title-font',
  subsets: ['latin'],
  display: 'swap',
});
 
const playfair_display = Playfair_Display({
  variable: '--text-font',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Skills | Luis Amador Portfolio',
  description: 'Luis Amador Web Developer Portfolio Website And Blog'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${alice.variable} ${playfair_display.variable}`}>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id='G-0M12YC86QL'`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
        window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-0M12YC86QL');
        `}
      </Script>
      <body>
        <div className="w-[calc(100%-70px) mr-[70px] lg:w-[calc(100%-350px)] lg:mr-[350px]">
          <Nav />
          <div>
              <main>
                {children}
              </main>
              <Footer />
          </div>
        </div>
      </body>
    </html>
  )
}
