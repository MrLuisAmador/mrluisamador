import Link from 'next/link'
import Image from 'next/image'
import {Metadata} from 'next'
import {ScrollObserver} from '@/components/base/ScrollObserver'

export const metadata: Metadata = {
  title: 'Luis Amador | Senior Frontend Engineer',
  description:
    'Senior Full-Stack & AI Engineer specializing in Next.js, Agentic Workflows, and Wix enterprise solutions. Open to full-time roles.',
  alternates: {
    canonical: '/',
  },
}

export default function Home() {
  return (
    <>
      <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-primary pt-20">
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-10">
          <span className="absolute -top-32 -left-32 font-headline-md text-[600px] leading-none text-white select-none">
            LA
          </span>
        </div>
        <div className="relative z-10 mx-auto grid max-w-container-max grid-cols-1 items-center gap-12 px-margin-mobile py-24 md:px-gutter lg:grid-cols-2 lg:gap-24">
          <div className="animate-fade-in-up space-y-10 text-white">
            <div className="space-y-4">
              <span className="inline-block rounded bg-white/10 px-3 py-1 text-label-sm font-label-sm tracking-[0.2em] text-white/90 uppercase">
                Senior Frontend Engineer
              </span>
              <h1 className="text-display-lg-mobile font-display-lg text-white md:text-display-lg">
                Luis Amador
              </h1>
              <h2 className="text-headline-md font-headline-md leading-relaxed italic opacity-90">
                Why you should hire me?
              </h2>
            </div>
            <p className="max-w-xl text-body-lg font-body-lg leading-relaxed text-white/80">
              I bridge the gap between complex engineering and elegant design, delivering high
              performance digital experiences tailored to your unique business goals with precision
              and passion.
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <Link
                className="rounded-lg bg-white px-10 py-5 text-button font-button text-primary shadow-xl transition-all duration-200 hover:bg-surface-container-lowest active:scale-95"
                href="/about"
              >
                Who am I?
              </Link>
              <Link
                className="rounded-lg border-2 border-white/40 px-10 py-5 text-button font-button text-white transition-all duration-200 hover:bg-white/10 active:scale-95"
                href="/projects"
              >
                View Projects
              </Link>
            </div>
          </div>
          <div className="relative mt-12 hidden animate-fade-in-up justify-center [animation-delay:200ms] md:flex lg:mt-0">
            <div className="relative flex size-80 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md lg:size-95 xl:size-112.5">
              <Image
                alt="Luis Amador Portrait"
                className="size-56 object-contain brightness-110 drop-shadow-2xl grayscale filter transition-transform duration-700 hover:scale-105 lg:size-64 xl:size-80"
                src="/images/mugshot.png"
                width={450}
                height={450}
                priority
              />
            </div>
            <a
              href="#expertise"
              className="absolute -right-8 -bottom-8 hidden animate-bounce cursor-pointer rounded-2xl bg-white p-6 shadow-2xl card-shadow lg:block"
              aria-label="Scroll to expertise section"
            >
              <span className="material-symbols-outlined text-4xl text-primary">code</span>
            </a>
          </div>
        </div>
      </section>

      <section id="expertise" className="relative scroll-mt-20 bg-surface py-section-gap-lg">
        <div className="mx-auto max-w-container-max px-margin-mobile md:px-gutter">
          <div className="mx-auto mb-24 max-w-3xl text-center">
            <span className="mb-6 inline-block rounded-full bg-primary/10 px-6 py-2 text-label-sm font-label-sm tracking-[0.2em] text-primary uppercase">
              Strategic Thinking
            </span>
            <h2 className="text-display-lg-mobile font-display-lg leading-tight md:text-[56px]">
              Senior Frontend Engineering & Strategy
            </h2>
            <p className="mt-8 font-body-lg text-text-muted">
              Engineering robust systems that don&apos;t just scale, they thrive under pressure. My
              approach combines technical depth with business first architectural decisions.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
            <div className="animate-on-scroll group rounded-2xl border border-border-subtle bg-white p-10 card-shadow transition-all duration-300 hover:border-primary/30">
              <div className="mb-8 flex size-16 items-center justify-center rounded-xl bg-primary/5">
                <span className="material-symbols-outlined text-4xl text-primary">
                  account_tree
                </span>
              </div>
              <h3 className="mb-4 font-headline-md text-2xl">Enterprise React & Next.js</h3>
              <p className="font-body-md leading-relaxed text-text-muted">
                10+ years of experience delivering high performance web applications across
                E-commerce and Healthcare using React, Next.js, and TypeScript with modular
                components.
              </p>
            </div>

            <div className="animate-on-scroll group rounded-2xl border border-border-subtle bg-white p-10 card-shadow transition-all duration-300 hover:border-primary/30">
              <div className="mb-8 flex size-16 items-center justify-center rounded-xl bg-primary/5">
                <span className="material-symbols-outlined text-4xl text-primary">smart_toy</span>
              </div>
              <h3 className="mb-4 font-headline-md text-2xl">AI-Accelerated Development</h3>
              <p className="font-body-md leading-relaxed text-text-muted">
                Developing software using agentic AI, AI managers, and advanced coding assistants. I
                leverage these workflows to drastically accelerate the development lifecycle and
                deliver robust code efficiently.
              </p>
            </div>

            <div className="animate-on-scroll group rounded-2xl border border-border-subtle bg-white p-10 card-shadow transition-all duration-300 hover:border-primary/30">
              <div className="mb-8 flex size-16 items-center justify-center rounded-xl bg-primary/5">
                <span className="material-symbols-outlined text-4xl text-primary">
                  dynamic_feed
                </span>
              </div>
              <h3 className="mb-4 font-headline-md text-2xl">Architecture & Testing</h3>
              <p className="font-body-md leading-relaxed text-text-muted">
                Leading architectural shifts with React Server Components, Drizzle ORM, and
                comprehensive testing suites using Jest, Cypress, and Playwright for robust
                reliability.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low py-section-gap-lg">
        <div className="mx-auto max-w-container-max px-margin-mobile md:px-gutter">
          <div className="flex flex-col items-center justify-between gap-24 lg:flex-row">
            <div className="space-y-10 lg:w-1/2">
              <h2 className="font-display-lg text-[48px] leading-tight">
                Expert craftsmanship for the modern web.
              </h2>
              <p className="font-body-lg leading-relaxed text-on-surface-variant">
                With years of experience in both rapid prototyping and enterprise-grade software
                development, I deliver bespoke digital solutions that don&apos;t just work, they
                excel in the marketplace.
              </p>
              <div className="pt-4">
                <div className="space-y-2">
                  <span className="block font-headline-md text-5xl font-bold text-primary">
                    10+
                  </span>
                  <span className="font-label-sm tracking-wider text-on-surface-variant uppercase">
                    Years Experience
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative aspect-4/3 overflow-hidden rounded-3xl shadow-2xl">
                <Image
                  alt="Modern clean workspace with laptop"
                  className="size-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCv9J6a_YaqXCdPE8uZJ2s2rKp7W8fhY-Kwz7GmB1f_LymX-VjC9vXup449PxOD4DIokxoHVzW2IczJh18h6Q2jDS-HjDR8DUM_5rRbmK1tUXOz9LEY61MiW30USxRu6T8-4o7YeNtuki9Lu_YAlEksiTk38OEy3NB0tF-1EAuhO1vTUsaMl-zNBxDTARWRRWMKcAYW8fzU01SDen2E0HIw_KpH-8uHxMipGnplen3ne-CTpeX5WDIuEex_Nw9Wp0wCnyXSXSwiUPI"
                  width={1200}
                  height={900}
                />
                <div className="absolute inset-0 flex items-end bg-linear-to-t from-black/70 via-black/20 to-transparent p-12">
                  <span className="font-headline-md text-2xl leading-relaxed text-white italic">
                    &quot;Precision in every single line of code, elegance in every pixel.&quot;
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
