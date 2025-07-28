'use client'

import Script from 'next/script'
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
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (error) {
      console.error('AdSense error:', error)
    }
  }, [])

  return (
    <>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2988961562271197`}
        strategy="lazyOnload"
      />
      <ins
        className="adsbygoogle"
        style={{display: 'block'}}
        data-ad-client="ca-pub-2988961562271197"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive}
      />
    </>
  )
}
