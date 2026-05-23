import Link from 'next/link'
import {Metadata} from 'next'
import {ScrollObserver} from '@/components/base/ScrollObserver'

export const metadata: Metadata = {
  title: 'About',
  description: 'Luis Amador has over 10 years of experience bridging complex technical challenges and elegant, user-centric solutions. Senior Software Engineer specializing in React, Next.js, and AI Agentic Workflows.',
  alternates: {
    canonical: '/about',
  },
}

export default function About() {
  return (
    <>
      {/* Hero Section */}
      <header className="pt-20 pb-section-gap-sm md:pt-28 md:pb-section-gap-lg px-margin-mobile md:px-gutter">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
          <div className="md:col-span-8 space-y-6">
            <span className="text-label-sm font-label-sm text-primary uppercase tracking-[0.2em] block">
              Crafting Digital Excellence
            </span>
            <h1 className="text-display-lg-mobile md:text-display-lg font-display-lg text-on-surface">
              A decade of engineering, <br className="hidden md:block" />
              built on rigor and curiosity.
            </h1>
            <p className="text-body-lg font-body-lg text-text-muted max-w-2xl leading-relaxed">
              I am a Full-Stack Software Engineer with over 10 years of experience bridging the gap between complex technical challenges and elegant, user-centric solutions.
            </p>
          </div>
          <div className="md:col-span-4">
            <div className="relative group">
              <div className="absolute -inset-2 bg-primary/5 rounded-xl transition-all duration-300 group-hover:-inset-3"></div>
              <img 
                className="relative rounded-xl shadow-lg w-full grayscale hover:grayscale-0 transition-all duration-700 aspect-[4/5] object-cover" 
                alt="Portrait of Luis Amador" 
                src="/images/luis-portrait.jpg" 
              />
            </div>
          </div>
        </div>
      </header>

      {/* Biography / Personal Side */}
      <section className="py-section-gap-sm md:py-section-gap-lg bg-white border-y border-border-subtle/30">
        <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-gutter">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
            <div className="md:col-span-6">
              <h2 className="text-headline-md font-headline-md text-on-surface mb-8">The Professional Journey</h2>
              <div className="space-y-6 text-body-lg font-body-lg text-text-muted leading-relaxed">
                <p>
                  My path in software development hasn&apos;t just been about writing code; it&apos;s been about mastering the craft of architecture and efficiency. Currently, I am a Senior Frontend Engineer at Aeroflow Health, where I lead the development of scalable internal React applications, leveraging the power of TypeScript and Hooks to deliver high-performance tools.
                </p>
                <p>
                  I specialize in building robust web applications using <span className="text-on-surface font-semibold">Next.js and TypeScript</span>, and recently, I have deeply integrated <span className="text-on-surface font-semibold">AI Engineering and Agentic Workflows</span> into my repertoire. I focus on developing autonomous systems that leverage LLMs to drive real business value, moving beyond simple wrappers into full-fledged agentic architectures.
                </p>
              </div>
            </div>
            <div className="md:col-span-6">
              <h2 className="text-headline-md font-headline-md text-on-surface mb-8">Beyond the Screen</h2>
              <div className="space-y-6 text-body-lg font-body-lg text-text-muted leading-relaxed">
                <p>
                  Beyond the code editor, my life is anchored by family and a continuous pursuit of knowledge. I believe that being a great engineer starts with being a well-rounded individual, and I structure my time to reflect those core values.
                </p>
                <p>
                  I am a father first and foremost. I also hold a deep passion for business, economics, finance, and mentorship. Whether I&apos;m teaching the next generation of developers or exploring new academic subjects, I am always seeking opportunities to grow and share what I&apos;ve learned.
                </p>
              </div>
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 bg-surface-container-low rounded-xl border border-border-subtle/50 flex flex-col justify-between">
                  <div>
                    <span className="material-symbols-outlined text-primary text-3xl mb-4">family_history</span>
                    <h4 className="text-on-surface font-bold">Family First</h4>
                  </div>
                  <p className="text-label-sm font-label-sm mt-2 text-text-muted">Foundational values</p>
                </div>
                <div className="p-6 bg-surface-container-low rounded-xl border border-border-subtle/50 flex flex-col justify-between">
                  <div>
                    <span className="material-symbols-outlined text-primary text-3xl mb-4">school</span>
                    <h4 className="text-on-surface font-bold">Mentorship</h4>
                  </div>
                  <p className="text-label-sm font-label-sm mt-2 text-text-muted">Teaching the next gen</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack / Skills Section */}
      <section className="py-section-gap-sm md:py-section-gap-lg px-margin-mobile md:px-gutter">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-16">
            <span className="text-label-sm font-label-sm text-primary uppercase tracking-[0.2em] mb-4 block">The Toolkit</span>
            <h2 className="text-display-lg-mobile md:text-headline-md font-headline-md">Technological Expertise</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Languages */}
            <div className="skill-card p-8 bg-white rounded-xl border border-border-subtle shadow-sm transition-all duration-300">
              <span className="material-symbols-outlined text-primary mb-6 text-4xl">code</span>
              <h3 className="text-headline-md font-headline-md text-on-surface mb-4">Languages</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-text-muted"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> TypeScript / JavaScript</li>
                <li className="flex items-center gap-2 text-text-muted"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Node.js</li>
                <li className="flex items-center gap-2 text-text-muted"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Python</li>
                <li className="flex items-center gap-2 text-text-muted"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> GoLang</li>
              </ul>
            </div>
            {/* Frontend */}
            <div className="skill-card p-8 bg-white rounded-xl border border-border-subtle shadow-sm transition-all duration-300">
              <span className="material-symbols-outlined text-primary mb-6 text-4xl">layers</span>
              <h3 className="text-headline-md font-headline-md text-on-surface mb-4">Frontend</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-text-muted"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> React / Next.js</li>
                <li className="flex items-center gap-2 text-text-muted"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> TypeScript / Hooks</li>
                <li className="flex items-center gap-2 text-text-muted"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Tailwind CSS</li>
                <li className="flex items-center gap-2 text-text-muted"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Adobe Commerce / AEM</li>
              </ul>
            </div>
            {/* Databases */}
            <div className="skill-card p-8 bg-white rounded-xl border border-border-subtle shadow-sm transition-all duration-300">
              <span className="material-symbols-outlined text-primary mb-6 text-4xl">database</span>
              <h3 className="text-headline-md font-headline-md text-on-surface mb-4">Databases</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-text-muted"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> PostgreSQL / Prisma</li>
                <li className="flex items-center gap-2 text-text-muted"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Drizzle ORM</li>
                <li className="flex items-center gap-2 text-text-muted"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Redis / Upstash</li>
                <li className="flex items-center gap-2 text-text-muted"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> MongoDB</li>
              </ul>
            </div>
            {/* AI & Systems */}
            <div className="skill-card p-8 bg-white rounded-xl border border-border-subtle shadow-sm transition-all duration-300">
              <span className="material-symbols-outlined text-primary mb-6 text-4xl">smart_toy</span>
              <h3 className="text-headline-md font-headline-md text-on-surface mb-4">AI & Systems</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-text-muted"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Agentic Workflows</li>
                <li className="flex items-center gap-2 text-text-muted"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> LLM Orchestration</li>
                <li className="flex items-center gap-2 text-text-muted"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> LangChain / OpenAI</li>
                <li className="flex items-center gap-2 text-text-muted"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> AWS / Vercel</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Visual CTA Section */}
      <section className="py-section-gap-sm md:py-section-gap-lg px-margin-mobile md:px-gutter relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto bg-surface-charcoal rounded-3xl p-8 md:p-16 lg:p-24 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-display-lg-mobile md:text-headline-md font-headline-md text-white">
                Let&apos;s build something exceptional.
              </h2>
              <p className="text-body-lg font-body-lg text-secondary-fixed-dim leading-relaxed">
                Whether you're looking for a Senior Engineer for your full-time team or a consultant for a specialized Next.js/Wix project, I bring a decade of rigor to every role.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link 
                  href="/contact" 
                  className="bg-primary text-on-primary px-8 py-4 rounded font-button hover:bg-on-primary-fixed-variant transition-all active:scale-95 duration-150 text-center"
                >
                  Hire Me Full-Time
                </Link>
                <Link 
                  href="/contact" 
                  className="border border-white/20 text-white px-8 py-4 rounded font-button hover:bg-white/10 transition-all active:scale-95 duration-150 text-center"
                >
                  Consulting & Contract
                </Link>
              </div>
            </div>
            <div className="relative hidden md:block">
              <img 
                className="rounded-xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 w-full object-cover" 
                alt="A clean, minimalist workspace" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD37So8htCHxB_qgXM1pOGmK6tLBAaMWnzluAnBCCy4l4E-g8nUhe8_ZaMJstsr9GxnzMJFlxoPIgny3nyJarXHr3CbS2blgO_q11gSvZ1ECyEuC1l40qvItTBRnI89ho2TQM0ppIxeFpKxsEp5Xo6GsipRGUEa-BFoqwBF8DHdrF34ql1IS7AtsqllaTKgoGLt4NoeNE8Qswf_G44oD9u2MVImq3rExg-awqCExLBJxE6uoTky6uIkmwsY3PzWrKA31ClJtY_iAyo" 
              />
            </div>
          </div>
          {/* Abstract Background Element */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
            <svg fill="none" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
              <path d="M400 200C400 310.457 310.457 400 200 400C89.543 400 0 310.457 0 200C0 89.543 89.543 0 200 0C310.457 0 400 89.543 400 200Z" fill="currentColor" className="text-white" />
            </svg>
          </div>
        </div>
      </section>

      {/* Scroll observer client script */}
      <ScrollObserver />
    </>
  )
}
