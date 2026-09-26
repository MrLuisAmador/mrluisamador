import SendEmail from '@/components/email/sendEmail'
import {Metadata} from 'next'
import Script from 'next/script'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Connect with Luis Amador for full-time opportunities in Senior Frontend Engineer and AI Engineer roles, or for select contract work.',
  alternates: {
    canonical: '/contact',
  },
}

const Contact = () => {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

  return (
    <div className="min-h-screen bg-surface">
      {recaptchaSiteKey && (
        <Script src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`} />
      )}

      <main className="mx-auto max-w-container-max px-margin-mobile pt-24 pb-section-gap-lg md:px-gutter">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12">
          <div className="animate-fade-in-up space-y-12 lg:col-span-5">
            <header>
              <span className="mb-4 block text-label-sm font-label-sm tracking-[0.2em] text-primary uppercase">
                Get In Touch
              </span>
              <h1 className="mb-6 text-display-lg-mobile font-display-lg leading-tight text-on-surface md:text-display-lg">
                Let&apos;s connect.
              </h1>
              <p className="max-w-md text-body-lg font-body-lg text-on-secondary-container">
                I am currently open to full-time opportunities as a Senior Frontend Engineer or AI
                Engineer, as well as select contract work. Let&apos;s build something remarkable.
              </p>
            </header>

            <div className="space-y-6 pt-4">
              <div className="group flex items-start gap-5 rounded-xl p-4 transition-all duration-300 hover:bg-surface-container-low">
                <div className="bg-primary-fixed flex size-12 shrink-0 items-center justify-center rounded-full text-primary transition-transform group-hover:scale-110">
                  <span className="material-symbols-outlined">alternate_email</span>
                </div>
                <div>
                  <p className="mb-1 text-label-sm font-label-sm text-on-surface-variant uppercase">
                    Email Me
                  </p>
                  <a
                    className="text-body-lg font-body-lg font-semibold text-on-surface transition-colors hover:text-primary"
                    href="mailto:mrluisamador@gmail.com"
                  >
                    mrluisamador@gmail.com
                  </a>
                </div>
              </div>

              <div className="group flex items-start gap-5 rounded-xl p-4 transition-all duration-300 hover:bg-surface-container-low">
                <div className="bg-primary-fixed flex size-12 shrink-0 items-center justify-center rounded-full text-primary transition-transform group-hover:scale-110">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <p className="mb-1 text-label-sm font-label-sm text-on-surface-variant uppercase">
                    Based In
                  </p>
                  <p className="text-body-lg font-body-lg font-semibold text-on-surface">
                    Wesley Chapel, FL
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <p className="mb-6 text-label-sm font-label-sm tracking-widest text-on-secondary-container uppercase opacity-60">
                Connect with me
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/mrluisamador"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-11 items-center justify-center rounded-lg border border-border-subtle text-on-secondary-container transition-all duration-200 hover:border-primary hover:text-primary"
                  title="LinkedIn"
                >
                  <svg className="size-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                  </svg>
                </a>
                <a
                  href="https://twitter.com/LinuxLue"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-11 items-center justify-center rounded-lg border border-border-subtle text-on-secondary-container transition-all duration-200 hover:border-primary hover:text-primary"
                  title="Twitter"
                >
                  <svg className="size-5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </a>
                <a
                  href="https://github.com/MrLuisAmador"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-11 items-center justify-center rounded-lg border border-border-subtle text-on-secondary-container transition-all duration-200 hover:border-primary hover:text-primary"
                  title="GitHub"
                >
                  <svg className="size-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="animate-fade-in-up rounded-2xl border border-border-subtle bg-white p-8 card-shadow [animation-delay:200ms] md:p-12 lg:col-span-7">
            <SendEmail />
          </div>
        </div>
      </main>

      <section className="mx-auto max-w-container-max px-margin-mobile pb-section-gap-lg md:px-gutter">
        <div className="group relative h-112.5 w-full overflow-hidden rounded-3xl border border-border-subtle shadow-sm">
          <Image
            alt="Location map"
            className="size-full object-cover opacity-80 grayscale transition-all duration-1000 group-hover:opacity-100 group-hover:grayscale-0"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7S4gXEE2K_W3V_h0qnsBcBF3QPXAMgclI88wm8uD95q0Zqiao0nIWheKiVUzhvSORjejN6Hvd3QkFz0bQflqtnMiew3_oBbwOEW5Ix2y6z2BCeY2sxPbO8a21cv9eKTE-y1RI6VeHCnek-t0Hlhq6eN769p8Ig7vQBmQUp8XRyA5lspfSRwqGcMb_xK57V4pxnh5ZWhEKQyyTimInQ4uYRYQrTy2wmyKOut1kmAN3Q8YqgTU6DcIMwvAzyNd5nTSgTeRi6I6CAoM"
            width={1200}
            height={450}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
          <div className="absolute bottom-10 left-10 max-w-sm animate-fade-in-up rounded-2xl border border-white/50 bg-white/90 p-8 shadow-2xl backdrop-blur-md [animation-delay:400ms]">
            <h3 className="mb-3 text-headline-md font-headline-md text-primary">Office</h3>
            <p className="text-body-md font-body-md text-on-secondary-container">
              Currently working remotely, collaborating with teams across the globe.
            </p>
            <div className="mt-6 flex items-center gap-3 text-sm font-bold tracking-widest text-primary uppercase">
              <span className="relative flex size-3">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex size-3 rounded-full bg-primary"></span>
              </span>
              Open for Full Time or Contract Work
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
