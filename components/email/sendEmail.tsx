'use client'

import {useActionState, useEffect, startTransition} from 'react'
import {useRouter} from 'next/navigation'
import {nodemailerAction} from '@/actions/nodemailer/nodemailerAction'

declare global {
  interface Window {
    grecaptcha: {
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

const initialState: FormState = {
  success: false,
  errors: undefined,
}

const SendEmail = () => {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState(nodemailerAction, initialState)

  // Redirect on success
  useEffect(() => {
    if (state.success) {
      if (typeof window !== 'undefined' && 'dataLayer' in window) {
        const dataLayer = (window as {dataLayer: object[]}).dataLayer
        dataLayer.push({
          event: 'form_submit',
          form_name: 'contact_form',
          page_location: window.location.href,
        })
      }
      router.push('/thankyou')
    }
  }, [state.success, router])

  // Inject reCAPTCHA token before submit
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const token = await window.grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!, {
        action: 'submit',
      })

      formData.append('recaptchaToken', token)

      startTransition(() => {
        formAction(formData)
      })
    } catch {
      alert('reCAPTCHA failed. Please refresh and try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mail">
      {/* Email */}
      <input
        type="email"
        name="email"
        placeholder="Email"
        className={`mb-2.5 h-12 w-full rounded bg-[#053c50] pl-2.5 text-xl ${
          state.errors?.email ? 'border-2 border-red-500' : ''
        }`}
      />
      {state.errors?.email?.map((error: string, i: number) => (
        <p key={i} className="pb-2 text-sm text-red-500">
          {error}
        </p>
      ))}

      {/* Message */}
      <textarea
        name="message"
        placeholder="What service do you need done?"
        className={`mb-2.5 min-h-[250px] w-full rounded bg-[#053c50] p-2.5 text-xl ${
          state.errors?.message ? 'border-2 border-red-500' : ''
        }`}
      />
      {state.errors?.message?.map((error: string, i: number) => (
        <p key={i} className="text-sm text-red-500">
          {error}
        </p>
      ))}

      {/* Server error */}
      {state.errors?.server?.map((error: string, i: number) => (
        <p key={i} className="text-sm text-red-500">
          {error}
        </p>
      ))}

      <button
        type="submit"
        disabled={isPending}
        className="mt-4 w-full max-w-[50%] rounded border border-white px-4 py-2.5 text-xl text-white disabled:opacity-50"
      >
        {isPending ? 'Sending...' : 'Send It!'}
      </button>
    </form>
  )
}

export default SendEmail
