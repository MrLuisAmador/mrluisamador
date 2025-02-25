'use client'
import {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void
      execute: (siteKey: string, options: {action: string}) => Promise<string>
    }
  }
}

export default function SendEmail() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')

  useEffect(() => {
    // Load reCAPTCHA script
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`
    script.async = true
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  async function sendEmail() {
    setLoading(true)
    setStatus('')

    try {
      // Get reCAPTCHA token
      const token = await window.grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!, {
        action: 'submit',
      })

      // Format message with email included
      const formattedMessage = `
        Email: ${email}\r\n
        Message: ${message}
      `

      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          to: 'mrluisamador@gmail.com',
          from: 'webmaster@mrluisamador.com',
          subject: 'What service do you need done?',
          text: formattedMessage,
          recaptchaToken: token,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setEmail('')
        setMessage('')
        router.push('/thankyou')
      } else {
        setStatus('❌ Failed to send email')
      }
    } catch (error) {
      console.error('Error:', error)
      setStatus('❌ Failed to send email')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form id="mail" className="mail">
      <label className="">
        <span className="absolute border-0 overflow-hidden h-px w-px m-[-1px] p-0">Email</span>
        <input
          required={true}
          type="email"
          name="email"
          size={40}
          className="w-full bg-[#053c50] text-xl mb-2.5 pl-2.5 border-none rounded h-12"
          id="email"
          placeholder="Email"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className="">
        <span className="absolute border-0 overflow-hidden h-px w-px m-[-1px] p-0">
          What service do you need done?
        </span>
        <textarea
          minLength={20}
          required={true}
          id="message"
          name="message"
          cols={40}
          rows={10}
          className="w-full bg-[#053c50] text-xl mb-2.5 p-2.5 border-none rounded h-12 min-h-[250px]"
          placeholder="What service do you need done?"
          autoComplete="off"
          aria-label="Enter your comment"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </label>
      <label className="">
        <span className="absolute border-0 overflow-hidden h-px w-px m-[-1px] p-0">Submit</span>
        <input
          onClick={sendEmail}
          disabled={loading}
          id="submit"
          type="submit"
          value={loading ? 'Sending...' : 'Send It!'}
          className="border border-solid border-white text-white py-2.5 px-4 w-full max-w-[50%] inline-block rounded text-xl hover:bg-white/[.15] transition-colors cursor-pointer"
        />
      </label>
      {status && <p className="mt-2">{status}</p>}
    </form>
  )
}
