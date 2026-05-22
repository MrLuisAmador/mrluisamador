'use client'

import {useEffect} from 'react'

export function ScrollObserver() {
  useEffect(() => {
    // 1. Header scroll animation (transition height and padding)
    const header = document.querySelector('header')
    const handleScroll = () => {
      if (!header) return
      if (window.scrollY > 20) {
        header.classList.add('py-1')
        header.classList.remove('h-20')
        header.classList.add('h-16')
      } else {
        header.classList.remove('py-1')
        header.classList.remove('h-16')
        header.classList.add('h-20')
      }
    }

    window.addEventListener('scroll', handleScroll)
    // Run once initially
    handleScroll()

    // 2. Intersection Observer for scroll-driven animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0')
          entry.target.classList.remove('opacity-0', 'translate-y-12')
        }
      })
    }, observerOptions)

    const elementsToAnimate = document.querySelectorAll('section:not(:first-of-type) h2, section:not(:first-of-type) p, .animate-on-scroll, section:not(:first-of-type) .grid > div')
    elementsToAnimate.forEach(el => {
      el.classList.add('opacity-0', 'translate-y-12', 'transition-all', 'duration-1000', 'ease-out')
      observer.observe(el)
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      elementsToAnimate.forEach(el => {
        try {
          observer.unobserve(el)
        } catch (e) {
          // ignore
        }
      })
    }
  }, [])

  return null
}
