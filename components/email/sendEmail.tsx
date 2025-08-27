'use client'

import {nodemailerAction} from '@/actions/nodemailer/nodemailerAction'
import {ContactFormSchema} from '@/lib/zod/contact-form-schema'
import {useActionState} from 'react'

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void
      execute: (siteKey: string, options: {action: string}) => Promise<string>
    }
  }
}

type FormState = {
  success: boolean
  errors?: {
    email?: string[]
    message?: string[]
    recaptcha?: string[]
    server?: string[]
  }
}

const SendEmail = () => {
  const initialState: FormState = {
    success: false,
    errors: undefined,
  }

  const [state, formAction, isPending] = useActionState(
    async (_prevState: FormState, formData: FormData) => {
      try {
        const formDataObj = Object.fromEntries(formData.entries())
        const result = ContactFormSchema.safeParse(formDataObj)

        if (!result.success) {
          return {
            success: false,
            errors: result.error.flatten().fieldErrors as FormState['errors'],
          }
        }

        let token
        try {
          token = await window.grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!, {
            action: 'submit',
          })
          formData.append('recaptchaToken', token)
        } catch (error) {
          console.error('reCAPTCHA error:', error)
          return {
            success: false,
            errors: {
              recaptcha: ['reCAPTCHA verification failed. Please try again.'],
            },
          }
        }

        await nodemailerAction(formData)

        return {
          success: true,
          errors: undefined,
        }
      } catch (error) {
        console.error('Form submission error:', error)
        return {
          success: false,
          errors: {
            server: [(error as Error).message || 'An unknown error occurred'],
          },
        }
      }
    },
    initialState
  )

  return (
    <form action={formAction} id="mail" className="mail">
      <label className="">
        <span className="absolute border-0 overflow-hidden h-px w-px m-[-1px] p-0">Email</span>
        <input
          type="email"
          name="email"
          size={40}
          className={`w-full bg-[#053c50] text-xl mb-2.5 pl-2.5 border-none rounded h-12 ${
            state.errors?.email ? 'border-2 border-red-500' : ''
          }`}
          id="email"
          placeholder="Email"
          autoComplete="off"
        />
        {state.errors?.email && (
          <div className="text-red-500 text-sm mb-[10px]">
            {state.errors.email.map((error, i) => (
              <p key={i}>{error}</p>
            ))}
          </div>
        )}
      </label>

      <label className="">
        <span className="absolute border-0 overflow-hidden h-px w-px m-[-1px] p-0">
          What service do you need done?
        </span>
        <textarea
          id="message"
          name="message"
          cols={40}
          rows={10}
          className={`w-full bg-[#053c50] text-xl mb-2.5 p-2.5 border-none rounded h-12 min-h-[250px] ${
            state.errors?.message ? 'border-2 border-red-500' : ''
          }`}
          placeholder="What service do you need done?"
          autoComplete="off"
          aria-label="Enter your comment"
        ></textarea>
        {state.errors?.message && (
          <div className="text-red-500 text-sm mb-[20px]">
            {state.errors.message.map((error, i) => (
              <p key={i}>{error}</p>
            ))}
          </div>
        )}
      </label>

      <label className="">
        <span className="absolute border-0 overflow-hidden h-px w-px m-[-1px] p-0">Submit</span>
        <input
          id="submit"
          type="submit"
          value={isPending ? 'Sending...' : 'Send It!'}
          disabled={isPending}
          className="border border-solid border-white text-white py-2.5 px-4 w-full max-w-[50%] inline-block rounded text-xl hover:bg-white/[.15] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </label>
    </form>
  )
}

export default SendEmail
