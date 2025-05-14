import SendEmail from '@/components/sendgrid/sendEmail'
import {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Portfolio Website And Blog',
}

const Contact = () => {
  return (
    <section className="h-screen items-center flex justify-center text-white py-16 bg-contact-blue px-5">
      <div className="md:w-3/6">
        <h1 className="text-4xl mb-5 text-center">Do you need something done?</h1>
        <p className="mb-14 text-lg text-center">
          I&apos;m currently accepting new projects and would love to help with yours. Please take a
          few minutes and tell me how I can help.
        </p>

        <SendEmail />
      </div>
    </section>
  )
}

export default Contact
