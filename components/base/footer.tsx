import Image from 'next/image'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-surface-charcoal bg-surface-charcoal py-12 text-white">
      <div className="mx-auto flex max-w-container-max flex-col items-center justify-between gap-8 px-margin-mobile md:flex-row md:px-gutter">
        <div className="flex flex-row items-center gap-3 text-left">
          <Image
            src="/images/mugshot.png"
            alt="Luis Amador Logo"
            className="size-10 rounded-full border border-primary/20 object-cover"
            width={40}
            height={40}
          />
          <span className="text-label-sm font-label-sm text-white/60">
            © {year} Luis Amador. All rights reserved.
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          <a
            className="text-label-sm font-label-sm text-white/60 transition-colors duration-200 hover:text-primary-fixed-dim"
            href="https://www.linkedin.com/in/mrluisamador"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="text-label-sm font-label-sm text-white/60 transition-colors duration-200 hover:text-primary-fixed-dim"
            href="https://twitter.com/LinuxLue"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <a
            className="text-label-sm font-label-sm text-white/60 transition-colors duration-200 hover:text-primary-fixed-dim"
            href="https://github.com/MrLuisAmador"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </div>
      </div>
    </footer>
  )
}
