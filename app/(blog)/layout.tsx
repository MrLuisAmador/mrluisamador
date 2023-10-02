import Script from 'next/script'

export const metadata = {
  title: 'Blog | Luis Amador Portfolio',
  description: 'Luis Amador Web Developer Portfolio Website And Blog'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
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
      <body>{children}</body>
    </html>
  )
}
