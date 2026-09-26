'use client'

import {useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {usePathname} from 'next/navigation'
import {cn} from '@/lib/utils'

export default function Nav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [prevPathname, setPrevPathname] = useState(pathname)

  // Close mobile menu when pathname changes
  if (pathname !== prevPathname) {
    setPrevPathname(pathname)
    setIsOpen(false)
  }

  const navItems = [
    {href: '/', label: 'Home'},
    {href: '/about', label: 'About'},
    {href: '/projects', label: 'Projects'},
    {href: '/blogs', label: 'Blogs'},
  ]

  return (
    <header className="fixed top-0 z-50 h-20 w-full border-b border-border-subtle/20 bg-surface/80 shadow-sm backdrop-blur-md transition-all duration-300 dark:border-outline/20 dark:bg-surface-charcoal/80">
      <div className="mx-auto flex h-full max-w-container-max items-center justify-between px-margin-mobile md:px-gutter">
        {/* Logo & Avatar */}
        <Link href="/" className="group flex items-center gap-4">
          <Image
            alt="Luis Amador"
            className="size-10 rounded-full border border-outline-variant object-cover"
            src="/images/mugshot.png"
            width={40}
            height={40}
          />
          <span className="text-headline-md font-headline-md tracking-tight text-primary uppercase transition-opacity group-hover:opacity-85 dark:text-primary-fixed-dim">
            LUIS AMADOR
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden gap-10 lg:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'pb-1 text-label-sm font-label-sm transition-all duration-200',
                  isActive
                    ? 'border-b-2 border-primary text-primary dark:border-primary-fixed-dim dark:text-primary-fixed-dim'
                    : 'text-on-secondary-container hover:text-primary dark:text-secondary-fixed-dim dark:hover:text-primary-fixed-dim'
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
            <button className="cursor-pointer rounded-lg bg-primary px-6 py-2.5 text-button font-button text-on-primary shadow-md transition-all duration-155 hover:opacity-90 active:scale-95">
              Contact Me
            </button>
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex size-10 cursor-pointer items-center justify-center rounded-md border border-border-subtle text-on-background transition-colors duration-200 hover:bg-surface-container-low lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? (
              <svg
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="border-t border-border-subtle bg-surface duration-200 animate-in fade-in slide-in-from-top-4 lg:hidden">
          <nav className="flex flex-col space-y-4 p-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'rounded-md px-3 py-2 text-base font-medium transition-colors',
                    isActive
                      ? 'bg-primary/5 font-semibold text-primary'
                      : 'text-text-muted hover:bg-surface-container-low hover:text-on-background'
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
            <Link href="/contact" className="w-full">
              <button className="w-full cursor-pointer rounded-lg bg-primary py-3 text-button font-button text-on-primary shadow-md transition-all duration-150 hover:opacity-90 active:scale-95">
                Contact Me
              </button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
