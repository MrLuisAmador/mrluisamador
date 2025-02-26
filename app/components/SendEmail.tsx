'use client'

import {create} from '../(home)/contact/actions'
import {useRef} from 'react'

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void
      execute: (siteKey: string, options: {action: string}) => Promise<string>
    }
  }
}

const SendEmail = () => {
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (formData: FormData) => {
    try {
      // Execute reCAPTCHA
      const token = await window.grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!, {
        action: 'submit',
      })

      // Add token to form data
      formData.append('recaptchaToken', token)

      // Call server action
      await create(formData)
    } catch (error) {
      console.error('reCAPTCHA or form submission error:', error)
    }
  }

  return (
    <form ref={formRef} action={handleSubmit} id="mail" className="mail">
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
        ></textarea>
      </label>
      <label className="">
        <span className="absolute border-0 overflow-hidden h-px w-px m-[-1px] p-0">Submit</span>
        <input
          id="submit"
          type="submit"
          value="Send It!"
          className="border border-solid border-white text-white py-2.5 px-4 w-full max-w-[50%] inline-block rounded text-xl hover:bg-white/[.15] transition-colors cursor-pointer"
        />
      </label>
    </form>
  )
}

export default SendEmail
