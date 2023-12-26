import Script from 'next/script'
import Nav from "../../components/nav"
import Footer from "../../components/footer"
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
  title: 'Contact | Luis Amador Portfolio',
  description: 'Portfolio Website And Blog'
}

export default function ThankYouLayout({
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
            <main>
              {children}
            </main>
            <Footer />
        </div>
      </body>
    </html>
  )
}
