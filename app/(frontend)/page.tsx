import Link from 'next/link'
import {Metadata} from 'next'
import {ScrollObserver} from '@/components/base/ScrollObserver'

export const metadata: Metadata = {
  title: 'Luis Amador | Senior Full-Stack Engineer',
  description: 'Senior Full-Stack & AI Engineer specializing in Next.js, Agentic Workflows, and Wix enterprise solutions. Open to full-time roles.',
  alternates: {
    canonical: '/',
  },
}

export default function Home() {
  return (
    <>
      <section className="relative min-h-[90vh] flex items-center bg-primary overflow-hidden pt-20">
        <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
          <span className="absolute -top-32 -left-32 text-[600px] font-headline-md text-white select-none leading-none">LA</span>
        </div>
        <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-gutter grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-24 relative z-10 py-24">
          <div className="text-white space-y-10 animate-fade-in-up">
            <div className="space-y-4">
              <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] opacity-80 bg-white/10 px-3 py-1 rounded inline-block">
                Full-Stack Engineer
              </span>
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-white">
                Luis Amador
              </h1>
              <h2 className="font-headline-md text-headline-md italic opacity-90 leading-relaxed">
                Why you should hire me?
              </h2>
            </div>
            <p className="font-body-lg text-body-lg text-white/80 max-w-xl leading-relaxed">
              I bridge the gap between complex engineering and elegant design, delivering high performance digital experiences tailored to your unique business goals with precision and passion.
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <Link 
                className="bg-white text-primary px-10 py-5 rounded-lg font-button text-button hover:bg-surface-container-lowest transition-all shadow-xl active:scale-95 duration-200" 
                href="/about"
              >
                Who am I?
              </Link>
              <Link 
                className="border-2 border-white/40 text-white px-10 py-5 rounded-lg font-button text-button hover:bg-white/10 transition-all active:scale-95 duration-200" 
                href="/projects"
              >
                View Projects
              </Link>
            </div>
          </div>
          <div className="hidden md:flex justify-center relative animate-fade-in-up [animation-delay:200ms] mt-12 lg:mt-0">
            <div className="relative w-[320px] h-[320px] lg:w-[380px] lg:h-[380px] xl:w-[450px] xl:h-[450px] bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20">
              <img 
                alt="Luis Amador Portrait" 
                className="w-56 h-56 lg:w-64 lg:h-64 xl:w-80 xl:h-80 object-contain filter grayscale brightness-110 drop-shadow-2xl transition-transform hover:scale-105 duration-700" 
                src="/images/mugshot.png" 
              />
            </div>
            <a 
              href="#expertise" 
              className="hidden lg:block absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl card-shadow animate-bounce shadow-2xl cursor-pointer"
              aria-label="Scroll to expertise section"
            >
              <span className="material-symbols-outlined text-primary text-4xl">code</span>
            </a>
          </div>
        </div>
      </section>

      <section id="expertise" className="py-section-gap-lg bg-surface relative scroll-mt-20">
        <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-gutter">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-[0.2em] bg-primary/10 px-6 py-2 rounded-full inline-block mb-6">
              Strategic Thinking
            </span>
            <h2 className="font-display-lg text-display-lg-mobile md:text-[56px] leading-tight">
              Senior Frontend Engineering & Strategy
            </h2>
            <p className="mt-8 font-body-lg text-text-muted">
              Engineering robust systems that don't just scale, they thrive under pressure. My approach combines technical depth with business first architectural decisions.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="animate-on-scroll p-10 bg-white rounded-2xl border border-border-subtle card-shadow group hover:border-primary/30 transition-all duration-300">
              <div className="w-16 h-16 bg-primary/5 rounded-xl flex items-center justify-center mb-8">
                <span className="material-symbols-outlined text-4xl text-primary">account_tree</span>
              </div>
              <h3 className="font-headline-md text-2xl mb-4">Enterprise React & Next.js</h3>
              <p className="font-body-md text-text-muted leading-relaxed">
                10+ years of experience delivering high performance web applications across E-commerce and Healthcare using React, Next.js, and TypeScript with modular components.
              </p>
            </div>
            
            <div className="animate-on-scroll p-10 bg-white rounded-2xl border border-border-subtle card-shadow group hover:border-primary/30 transition-all duration-300">
              <div className="w-16 h-16 bg-primary/5 rounded-xl flex items-center justify-center mb-8">
                <span className="material-symbols-outlined text-4xl text-primary">smart_toy</span>
              </div>
              <h3 className="font-headline-md text-2xl mb-4">AI-Accelerated Development</h3>
              <p className="font-body-md text-text-muted leading-relaxed">
                Developing software using agentic AI, AI managers, and advanced coding assistants. I leverage these workflows to drastically accelerate the development lifecycle and deliver robust code efficiently.
              </p>
            </div>

            <div className="animate-on-scroll p-10 bg-white rounded-2xl border border-border-subtle card-shadow group hover:border-primary/30 transition-all duration-300">
              <div className="w-16 h-16 bg-primary/5 rounded-xl flex items-center justify-center mb-8">
                <span className="material-symbols-outlined text-4xl text-primary">dynamic_feed</span>
              </div>
              <h3 className="font-headline-md text-2xl mb-4">Architecture & Testing</h3>
              <p className="font-body-md text-text-muted leading-relaxed">
                Leading architectural shifts with React Server Components, Drizzle ORM, and comprehensive testing suites using Jest, Cypress, and Playwright for robust reliability.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-section-gap-lg bg-surface-container-low">
        <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-gutter">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-24">
            <div className="lg:w-1/2 space-y-10">
              <h2 className="font-display-lg text-[48px] leading-tight">
                Expert craftsmanship for the modern web.
              </h2>
              <p className="font-body-lg text-on-surface-variant leading-relaxed">
                With years of experience in both rapid prototyping and enterprise-grade software development, I deliver bespoke digital solutions that don't just work, they excel in the marketplace.
              </p>
              <div className="grid grid-cols-2 gap-12 pt-4">
                <div className="space-y-2">
                  <span className="block text-5xl font-headline-md text-primary font-bold">10+</span>
                  <span className="font-label-sm text-on-surface-variant uppercase tracking-wider">
                    Years Experience
                  </span>
                </div>
                <div className="space-y-2">
                  <span className="block text-5xl font-headline-md text-primary font-bold">AI</span>
                  <span className="font-label-sm text-on-surface-variant uppercase tracking-wider">
                    Production Agents
                  </span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
                <img 
                  alt="Modern clean workspace with laptop" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCv9J6a_YaqXCdPE8uZJ2s2rKp7W8fhY-Kwz7GmB1f_LymX-VjC9vXup449PxOD4DIokxoHVzW2IczJh18h6Q2jDS-HjDR8DUM_5rRbmK1tUXOz9LEY61MiW30USxRu6T8-4o7YeNtuki9Lu_YAlEksiTk38OEy3NB0tF-1EAuhO1vTUsaMl-zNBxDTARWRRWMKcAYW8fzU01SDen2E0HIw_KpH-8uHxMipGnplen3ne-CTpeX5WDIuEex_Nw9Wp0wCnyXSXSwiUPI" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-12">
                  <span className="text-white font-headline-md text-2xl italic leading-relaxed">
                    "Precision in every single line of code, elegance in every pixel."
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll observer client script */}
      <ScrollObserver />
    </>
  )
}
