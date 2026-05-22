'use client'

import {useState, useEffect} from 'react'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {cn} from '@/lib/utils'

export default function Nav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const navItems = [
    {href: '/', label: 'Home'},
    {href: '/about', label: 'About'},
    {href: '/projects', label: 'Projects'},
    {href: '/blogs', label: 'Blogs'},
  ]

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-surface-charcoal/80 backdrop-blur-md shadow-sm border-b border-border-subtle/20 dark:border-outline/20 h-20 transition-all duration-300">
      <div className="flex justify-between items-center max-w-[1200px] mx-auto px-margin-mobile md:px-gutter h-full">
        {/* Logo & Avatar */}
        <Link href="/" className="flex items-center gap-4 group">
          <img 
            alt="Luis Amador" 
            className="w-10 h-10 rounded-full border border-outline-variant object-cover" 
            src="/images/mugshot.png"
          />
          <span className="text-headline-md font-headline-md text-primary dark:text-primary-fixed-dim tracking-tight uppercase group-hover:opacity-85 transition-opacity">
            LUIS AMADOR
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-10">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-label-sm font-label-sm pb-1 transition-all duration-200',
                  isActive 
                    ? 'text-primary dark:text-primary-fixed-dim border-b-2 border-primary dark:border-primary-fixed-dim' 
                    : 'text-on-secondary-container dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-primary-fixed-dim'
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Action Button & Hamburger Toggle */}
        <div className="flex items-center gap-4">
          <Link href="/contact" className="hidden lg:inline-block">
            <button className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-button text-button hover:opacity-90 active:scale-95 transition-all duration-155 shadow-md cursor-pointer">
              Contact Me
            </button>
          </Link>
          
          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-border-subtle text-[#191c1d] hover:bg-surface-container-low lg:hidden transition-colors duration-200 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="border-t border-border-subtle bg-surface lg:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-4 p-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'text-base font-medium py-2 px-3 rounded-md transition-colors',
                    isActive 
                      ? 'bg-primary/5 text-primary font-semibold' 
                      : 'text-[#60646C] hover:bg-surface-container-low hover:text-[#191c1d]'
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
            <Link href="/contact" className="w-full">
              <button className="w-full bg-primary text-on-primary py-3 rounded-lg font-button text-button hover:opacity-90 active:scale-95 transition-all duration-150 shadow-md cursor-pointer">
                Contact Me
              </button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
