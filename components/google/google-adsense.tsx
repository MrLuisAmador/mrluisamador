'use client'

import {useEffect, useRef, useState} from 'react'

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
  const adRef = useRef<HTMLModElement>(null)
  const isInitialized = useRef(false)
  const [mounted, setMounted] = useState(false)
  const isDev = process.env.NODE_ENV === 'development'

  useEffect(() => {
    setMounted(true)
    if (isDev) return

    // Prevent multiple initializations of the same ad
    if (isInitialized.current) return

    // Initialize adsbygoogle array if it doesn't exist
    if (typeof window !== 'undefined') {
      window.adsbygoogle = window.adsbygoogle || []
    }

    const initializeAd = () => {
      try {
        // Check if this specific ad element has already been processed
        if (adRef.current && !adRef.current.hasAttribute('data-adsbygoogle-status')) {
          window.adsbygoogle.push({})
          isInitialized.current = true
        }
      } catch (error) {
        console.error('AdSense error:', error)
      }
    }

    // Load AdSense script dynamically
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

        // Initialize ad when script loads
        script.onload = () => {
          // Small delay to ensure DOM is ready
          setTimeout(initializeAd, 100)
        }

        document.head.appendChild(script)
      } else {
        // Script already exists, initialize immediately
        setTimeout(initializeAd, 100)
      }
    }

    // Load the script
    loadAdSenseScript()

    // Cleanup function to reset initialization state when component unmounts
    return () => {
      isInitialized.current = false
    }
  }, [adSlot, isDev]) // Re-run effect only when adSlot changes

  // Use the 'mounted' check to prevent hydration mismatch errors.
  // The server will render the <ins> tag, and once the client mounts, 
  // it will switch to the placeholder in development mode.
  if (isDev && mounted) {
    return (
      <div className="flex min-h-[250px] w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 text-gray-400">
        <div className="text-center">
          <p className="font-semibold text-gray-500">Advertisement Placeholder</p>
          <p className="text-xs text-gray-400 font-normal">Slot: {adSlot}</p>
          <p className="mt-1 text-[10px] uppercase tracking-widest opacity-60">(Visible on Localhost only)</p>
        </div>
      </div>
    )
  }

  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={{display: 'block'}}
      data-ad-client="ca-pub-2988961562271197"
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={fullWidthResponsive}
    />
  )
}
