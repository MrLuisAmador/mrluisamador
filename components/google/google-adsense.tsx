'use client'

import {useEffect} from 'react'

interface GoogleAdProps {
  adSlot: string
  adFormat?: string
  fullWidthResponsive?: boolean
}

export default function GoogleAd({
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
}: GoogleAdProps) {
  useEffect(() => {
    // Initialize adsbygoogle array if it doesn't exist
    if (typeof window !== 'undefined') {
      window.adsbygoogle = window.adsbygoogle || []
    }

    // Load AdSense script dynamically to avoid Next.js data-nscript attribute
    const loadAdSenseScript = () => {
      if (
        typeof window !== 'undefined' &&
        !document.querySelector('script[src*="adsbygoogle.js"]')
      ) {
        const script = document.createElement('script')
        script.async = true
        script.src =
          'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2988961562271197'
        script.crossOrigin = 'anonymous'

        // Add onload handler to initialize ads when script loads
        script.onload = () => {
          try {
            if (window.adsbygoogle) {
              window.adsbygoogle.push({})
            }
          } catch (error) {
            console.error('AdSense error:', error)
          }
        }

        document.head.appendChild(script)
      } else {
        // Script already exists, just initialize ads
        try {
          if (window.adsbygoogle) {
            window.adsbygoogle.push({})
          }
        } catch (error) {
          console.error('AdSense error:', error)
        }
      }
    }

    // Load the script
    loadAdSenseScript()
  }, [])

  return (
    <ins
      className="adsbygoogle"
      style={{display: 'block'}}
      data-ad-client="ca-pub-2988961562271197"
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={fullWidthResponsive}
    />
  )
}
