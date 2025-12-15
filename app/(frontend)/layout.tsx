import Script from 'next/script'
import Nav from '@/components/base/nav'
import Footer from '@/components/base/footer'
import {GoogleTagManager} from '@next/third-parties/google'
import {Analytics} from '@vercel/analytics/next'
import {Metadata, Viewport} from 'next'
import {Toaster} from '@/components/ui/sonner'

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
    template: '%s | Luis Amador Portfolio',
    default: 'Luis Amador',
  },
  description: 'Luis Amador portfolio to showcase his services and skills.',
  keywords: ['Next.js', 'React', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Portfolio'],
  metadataBase: new URL('https://www.mrluisamador.com/'),
  authors: [{name: 'Luis Amador'}],
  creator: 'Luis Amador',
  publisher: 'Luis Amador',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  other: {
    'Content-Security-Policy':
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://www.google.com https://www.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: http:; connect-src 'self' https://www.google-analytics.com https://analytics.google.com; frame-src 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com; object-src 'none'; base-uri 'self'; form-action 'self';",
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function HomeLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${alice.variable} ${playfair_display.variable}`}>
      <GoogleTagManager gtmId="GTM-WMZTF2CW" />
      <body>
        <Script
          strategy="beforeInteractive"
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        />
        <div className="w-[calc(100%-70px) mr-[70px] lg:mr-[350px] lg:w-[calc(100%-350px)]">
          <Nav />
          <main>{children}</main>
          <Footer />
        </div>
        <Analytics />
        <Toaster />
      </body>
    </html>
  )
}
