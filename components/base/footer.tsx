import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-surface-charcoal w-full py-12 text-white border-t border-surface-charcoal">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-[1200px] mx-auto px-margin-mobile md:px-gutter gap-8">
        <div className="flex flex-row items-center gap-3 text-left">
          <img 
            src="/images/mugshot.png" 
            alt="Luis Amador Logo" 
            className="w-10 h-10 rounded-full border border-primary/20 object-cover"
          />
          <span className="text-label-sm font-label-sm text-white/60">
            © {year} Luis Amador. All rights reserved.
          </span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8">
          <a 
            className="text-label-sm font-label-sm text-white/60 hover:text-primary-fixed-dim transition-colors duration-200" 
            href="https://github.com/MrLuisAmador"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
          <a 
            className="text-label-sm font-label-sm text-white/60 hover:text-primary-fixed-dim transition-colors duration-200" 
            href="https://www.linkedin.com/in/mrluisamador"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a 
            className="text-label-sm font-label-sm text-white/60 hover:text-primary-fixed-dim transition-colors duration-200" 
            href="https://twitter.com/LinuxLue"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
        </div>
      </div>
    </footer>
  )
}

