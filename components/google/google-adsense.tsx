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
    // Load AdSense script dynamically to avoid Next.js data-nscript attribute
    const loadAdSenseScript = () => {
      if (typeof window !== 'undefined' && !window.adsbygoogle) {
        const script = document.createElement('script')
        script.async = true
        script.src =
          'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2988961562271197'
        script.crossOrigin = 'anonymous'
        document.head.appendChild(script)
      }
    }

    // Load the script
    loadAdSenseScript()

    // Initialize ads after script loads
    const initAds = () => {
      try {
        if (window.adsbygoogle) {
          ;(window.adsbygoogle = window.adsbygoogle || []).push({})
        }
      } catch (error) {
        console.error('AdSense error:', error)
      }
    }

    // Wait for script to load, then initialize ads
    const checkAdsbyGoogle = setInterval(() => {
      if (window.adsbygoogle) {
        clearInterval(checkAdsbyGoogle)
        initAds()
      }
    }, 100)

    // Cleanup interval after 10 seconds to prevent infinite checking
    setTimeout(() => clearInterval(checkAdsbyGoogle), 10000)

    return () => {
      clearInterval(checkAdsbyGoogle)
    }
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
