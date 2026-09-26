import Link from 'next/link'
import Image from 'next/image'
import {Metadata} from 'next'
import {ScrollObserver} from '@/components/base/ScrollObserver'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Luis Amador has over 10 years of experience bridging complex technical challenges and elegant, user-centric solutions. Senior Frontend Engineer specializing in React, Next.js, and AI Agentic Workflows.',
  alternates: {
    canonical: '/about',
  },
}

export default function About() {
  return (
    <>
      {/* Hero Section */}
      <header className="px-margin-mobile pt-20 pb-section-gap-sm md:px-gutter md:pt-28 md:pb-section-gap-lg">
        <div className="mx-auto grid max-w-container-max grid-cols-1 items-end gap-12 md:grid-cols-12">
          <div className="space-y-6 md:col-span-8">
            <span className="block text-label-sm font-label-sm tracking-[0.2em] text-primary uppercase">
              Crafting Digital Excellence
            </span>
            <h1 className="text-display-lg-mobile font-display-lg text-on-surface md:text-display-lg">
              A decade of engineering, <br className="hidden md:block" />
              built on rigor and curiosity.
            </h1>
            <p className="max-w-2xl text-body-lg font-body-lg leading-relaxed text-text-muted">
              I am a Senior Frontend Engineer with over 10 years of experience bridging the gap
              between complex technical challenges and elegant, user-centric solutions.
            </p>
          </div>
          <div className="md:col-span-4">
            <div className="group relative">
              <div className="absolute -inset-2 rounded-xl bg-primary/5 transition-all duration-300 group-hover:-inset-3"></div>
              <Image
                className="relative aspect-4/5 w-full rounded-xl object-cover shadow-lg grayscale transition-all duration-700 hover:grayscale-0"
                alt="Portrait of Luis Amador"
                src="/images/luis-portrait.jpg"
                width={600}
                height={750}
              />
            </div>
          </div>
        </div>
      </header>

      <section className="border-y border-border-subtle/30 bg-white py-section-gap-sm md:py-section-gap-lg">
        <div className="mx-auto max-w-container-max px-margin-mobile md:px-gutter">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 lg:gap-16">
            <div className="md:col-span-6">
              <h2 className="mb-8 text-headline-md font-headline-md text-on-surface">
                The Professional Journey
              </h2>
              <div className="space-y-6 text-body-lg font-body-lg leading-relaxed text-text-muted">
                <p>
                  My path in software development hasn&apos;t just been about writing code;
                  it&apos;s been about mastering the craft of architecture and efficiency.
                  Currently, I am a Senior Frontend Engineer at Aeroflow Health, where I lead the
                  development of scalable internal React applications, leveraging the power of
                  TypeScript and Hooks to deliver high-performance tools.
                </p>
                <p>
                  I specialize in building robust web applications using{' '}
                  <span className="font-semibold text-on-surface">Next.js and TypeScript</span>, and
                  recently, I have deeply integrated{' '}
                  <span className="font-semibold text-on-surface">
                    AI Engineering and Agentic Workflows
                  </span>{' '}
                  into my repertoire. I focus on developing autonomous systems that leverage LLMs to
                  drive real business value, moving beyond simple wrappers into full-fledged agentic
                  architectures.
                </p>
              </div>
            </div>
            <div className="md:col-span-6">
              <h2 className="mb-8 text-headline-md font-headline-md text-on-surface">
                Beyond the Screen
              </h2>
              <div className="space-y-6 text-body-lg font-body-lg leading-relaxed text-text-muted">
                <p>
                  Beyond the code editor, my life is anchored by family and a continuous pursuit of
                  knowledge. I believe that being a great engineer starts with being a well-rounded
                  individual, and I structure my time to reflect those core values.
                </p>
                <p>
                  I am a father first and foremost. I also hold a deep passion for business,
                  economics, finance, and mentorship. Whether I&apos;m teaching the next generation
                  of developers or exploring new academic subjects, I am always seeking
                  opportunities to grow and share what I&apos;ve learned.
                </p>
              </div>
              <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col justify-between rounded-xl border border-border-subtle/50 bg-surface-container-low p-6">
                  <div>
                    <span className="material-symbols-outlined mb-4 text-3xl text-primary">
                      family_history
                    </span>
                    <h4 className="font-bold text-on-surface">Family First</h4>
                  </div>
                  <p className="mt-2 text-label-sm font-label-sm text-text-muted">
                    Foundational values
                  </p>
                </div>
                <div className="flex flex-col justify-between rounded-xl border border-border-subtle/50 bg-surface-container-low p-6">
                  <div>
                    <span className="material-symbols-outlined mb-4 text-3xl text-primary">
                      school
                    </span>
                    <h4 className="font-bold text-on-surface">Mentorship</h4>
                  </div>
                  <p className="mt-2 text-label-sm font-label-sm text-text-muted">
                    Teaching the next gen
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-margin-mobile py-section-gap-sm md:px-gutter md:py-section-gap-lg">
        <div className="mx-auto max-w-container-max">
          <div className="mb-16">
            <span className="mb-4 block text-label-sm font-label-sm tracking-[0.2em] text-primary uppercase">
              The Toolkit
            </span>
            <h2 className="text-display-lg-mobile font-headline-md md:text-headline-md">
              Technological Expertise
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="skill-card rounded-xl border border-border-subtle bg-white p-8 shadow-sm transition-all duration-300">
              <span className="material-symbols-outlined mb-6 text-4xl text-primary">code</span>
              <h3 className="mb-4 text-headline-md font-headline-md text-on-surface">Languages</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-text-muted">
                  <span className="size-1.5 rounded-full bg-primary"></span> TypeScript / JavaScript
                </li>
                <li className="flex items-center gap-2 text-text-muted">
                  <span className="size-1.5 rounded-full bg-primary"></span> HTML
                </li>
                <li className="flex items-center gap-2 text-text-muted">
                  <span className="size-1.5 rounded-full bg-primary"></span>CSS
                </li>
                <li className="flex items-center gap-2 text-text-muted">
                  <span className="size-1.5 rounded-full bg-primary"></span>PHP
                </li>
                <li className="flex items-center gap-2 text-text-muted">
                  <span className="size-1.5 rounded-full bg-primary"></span>SQL
                </li>
                <li className="flex items-center gap-2 text-text-muted">
                  <span className="size-1.5 rounded-full bg-primary"></span>Bash / Shell
                </li>
              </ul>
            </div>
            <div className="skill-card rounded-xl border border-border-subtle bg-white p-8 shadow-sm transition-all duration-300">
              <span className="material-symbols-outlined mb-6 text-4xl text-primary">layers</span>
              <h3 className="mb-4 text-headline-md font-headline-md text-on-surface">Platforms</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-text-muted">
                  <span className="size-1.5 rounded-full bg-primary"></span>Next.js
                </li>
                <li className="flex items-center gap-2 text-text-muted">
                  <span className="size-1.5 rounded-full bg-primary"></span> Adobe Experience
                  Manager
                </li>
                <li className="flex items-center gap-2 text-text-muted">
                  <span className="size-1.5 rounded-full bg-primary"></span> WordPress
                </li>
                <li className="flex items-center gap-2 text-text-muted">
                  <span className="size-1.5 rounded-full bg-primary"></span> Shopify
                </li>
                <li className="flex items-center gap-2 text-text-muted">
                  <span className="size-1.5 rounded-full bg-primary"></span> Adobe Commerce
                </li>
              </ul>
            </div>
            <div className="skill-card rounded-xl border border-border-subtle bg-white p-8 shadow-sm transition-all duration-300">
              <span className="material-symbols-outlined mb-6 text-4xl text-primary">database</span>
              <h3 className="mb-4 text-headline-md font-headline-md text-on-surface">Databases</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-text-muted">
                  <span className="size-1.5 rounded-full bg-primary"></span>PostgreSQL / Prisma
                </li>
                <li className="flex items-center gap-2 text-text-muted">
                  <span className="size-1.5 rounded-full bg-primary"></span>Drizzle ORM
                </li>
                <li className="flex items-center gap-2 text-text-muted">
                  <span className="size-1.5 rounded-full bg-primary"></span>Redis / Upstash
                </li>
                <li className="flex items-center gap-2 text-text-muted">
                  <span className="size-1.5 rounded-full bg-primary"></span>MongoDB
                </li>
              </ul>
            </div>
            <div className="skill-card rounded-xl border border-border-subtle bg-white p-8 shadow-sm transition-all duration-300">
              <span className="material-symbols-outlined mb-6 text-4xl text-primary">
                smart_toy
              </span>
              <h3 className="mb-4 text-headline-md font-headline-md text-on-surface">
                AI & Systems
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-text-muted">
                  <span className="size-1.5 rounded-full bg-primary"></span>Agentic Workflows
                </li>
                <li className="flex items-center gap-2 text-text-muted">
                  <span className="size-1.5 rounded-full bg-primary"></span>Claude Code
                </li>
                <li className="flex items-center gap-2 text-text-muted">
                  <span className="size-1.5 rounded-full bg-primary"></span>Codex
                </li>
                <li className="flex items-center gap-2 text-text-muted">
                  <span className="size-1.5 rounded-full bg-primary"></span>Antigravity
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-margin-mobile py-section-gap-sm md:px-gutter md:py-section-gap-lg">
        <div className="relative z-10 mx-auto max-w-container-max rounded-3xl bg-surface-charcoal p-8 md:p-16 lg:p-24">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <h2 className="text-display-lg-mobile font-headline-md text-white md:text-headline-md">
                Let&apos;s build something exceptional.
              </h2>
              <p className="text-body-lg font-body-lg leading-relaxed text-secondary-fixed-dim">
                Whether you&apos;re looking for a Senior Frontend Engineer for your full-time team
                or a consultant for a specialized Next.js/Wix project, I bring a decade of rigor to
                every role.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/contact"
                  className="hover:bg-on-primary-fixed-variant rounded bg-primary px-8 py-4 text-center font-button text-on-primary transition-all duration-150 active:scale-95"
                >
                  Hire Me Full-Time
                </Link>
                <Link
                  href="/contact"
                  className="rounded border border-white/20 px-8 py-4 text-center font-button text-white transition-all duration-150 hover:bg-white/10 active:scale-95"
                >
                  Consulting & Contract
                </Link>
              </div>
            </div>
            <div className="relative hidden md:block">
              <Image
                className="w-full rotate-2 rounded-xl object-cover shadow-2xl transition-transform duration-500 hover:rotate-0"
                alt="A clean, minimalist workspace"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD37So8htCHxB_qgXM1pOGmK6tLBAaMWnzluAnBCCy4l4E-g8nUhe8_ZaMJstsr9GxnzMJFlxoPIgny3nyJarXHr3CbS2blgO_q11gSvZ1ECyEuC1l40qvItTBRnI89ho2TQM0ppIxeFpKxsEp5Xo6GsipRGUEa-BFoqwBF8DHdrF34ql1IS7AtsqllaTKgoGLt4NoeNE8Qswf_G44oD9u2MVImq3rExg-awqCExLBJxE6uoTky6uIkmwsY3PzWrKA31ClJtY_iAyo"
                width={800}
                height={600}
              />
            </div>
          </div>
          <div className="pointer-events-none absolute top-0 right-0 h-full w-1/2 opacity-10">
            <svg fill="none" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M400 200C400 310.457 310.457 400 200 400C89.543 400 0 310.457 0 200C0 89.543 89.543 0 200 0C310.457 0 400 89.543 400 200Z"
                fill="currentColor"
                className="text-white"
              />
            </svg>
          </div>
        </div>
      </section>

      <ScrollObserver />
    </>
  )
}
