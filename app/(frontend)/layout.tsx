import Nav from '@/components/base/nav'
import Footer from '@/components/base/footer'
import {GoogleTagManager} from '@next/third-parties/google'
import {Analytics} from '@vercel/analytics/next'
import {Metadata, Viewport} from 'next'
import {Toaster} from '@/components/ui/sonner'
import {cn} from '@/lib/utils'

import {Newsreader, Inter} from 'next/font/google'
import '../../styles/global.css'

const newsreader = Newsreader({
  variable: '--title-font',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const inter = Inter({
  variable: '--text-font',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Luis Amador Portfolio',
    default: 'Luis Amador',
  },
  description: 'Luis Amador portfolio to showcase his projects and skills.',
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
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://www.google.com https://www.gstatic.com https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: http:; connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com; frame-src 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com; object-src 'none'; base-uri 'self'; form-action 'self';",
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function HomeLayout({children}: {children: React.ReactNode}) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID

  return (
    <html lang="en" className={cn(newsreader.variable, inter.variable)}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      {gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
      <body className="bg-surface text-on-surface font-body-md overflow-x-hidden antialiased">
        <div className="flex flex-col min-h-screen">
          <Nav />
          <main className="flex-1 w-full pt-20">
            {children}
          </main>
          <Footer />
        </div>
        <Analytics />
        <Toaster />
      </body>
    </html>
  )
}
