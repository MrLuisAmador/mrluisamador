import SendEmail from '@/components/email/sendEmail'
import {Metadata} from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Portfolio Website And Blog',
  alternates: {
    canonical: '/contact',
  },
}

const Contact = () => {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

  return (
    <>
      {recaptchaSiteKey && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
        />
      )}
      <section className="bg-contact-blue flex min-h-[calc(100vh-5rem)] items-center justify-center px-5 py-16 text-white">
        <div className="md:w-3/6">
          <h1 className="mb-5 text-center text-4xl">Do you need something done?</h1>
          <p className="mb-14 text-center text-lg">
            I&apos;m currently accepting new projects and would love to help with yours. Please take a
            few minutes and tell me how I can help.
          </p>

          <SendEmail />
        </div>
      </section>
    </>
  )
}

export default Contact
