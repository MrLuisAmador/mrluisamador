'use client'

import {useActionState, useEffect, startTransition} from 'react'
import {useRouter} from 'next/navigation'
import {hubspotAction} from '@/actions/hubspot/hubspotAction'

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
    name?: string[]
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
  const [state, formAction, isPending] = useActionState(hubspotAction, initialState)

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
    <form onSubmit={handleSubmit} className="space-y-8" id="contact-form">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="relative">
          <label className="mb-2 block text-label-sm font-label-sm text-on-secondary-container uppercase">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            className={`w-full rounded-t-md border-0 border-b bg-surface-container-low px-4 py-3 transition-all duration-200 placeholder:text-outline-variant focus:border-primary focus:outline-none ${
              state.errors?.name ? 'border-red-500' : 'border-border-subtle'
            }`}
          />
          {state.errors?.name?.map((error: string, i: number) => (
            <p key={i} className="pt-1 text-xs text-red-500">
              {error}
            </p>
          ))}
        </div>
        <div className="relative">
          <label className="mb-2 block text-label-sm font-label-sm text-on-secondary-container uppercase">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="john@example.com"
            className={`w-full rounded-t-md border-0 border-b bg-surface-container-low px-4 py-3 transition-all duration-200 placeholder:text-outline-variant focus:border-primary focus:outline-none ${
              state.errors?.email ? 'border-red-500' : 'border-border-subtle'
            }`}
          />
          {state.errors?.email?.map((error: string, i: number) => (
            <p key={i} className="pt-1 text-xs text-red-500">
              {error}
            </p>
          ))}
        </div>
      </div>

      <div className="relative">
        <label className="mb-2 block text-label-sm font-label-sm text-on-secondary-container uppercase">
          Message
        </label>
        <textarea
          name="message"
          rows={4}
          placeholder="Tell me about your project..."
          className={`w-full resize-none rounded-t-md border-0 border-b bg-surface-container-low px-4 py-3 transition-all duration-200 placeholder:text-outline-variant focus:border-primary focus:outline-none ${
            state.errors?.message ? 'border-red-500' : 'border-border-subtle'
          }`}
        />
        {state.errors?.message?.map((error: string, i: number) => (
          <p key={i} className="pt-1 text-xs text-red-500">
            {error}
          </p>
        ))}
      </div>

      {/* Server error */}
      {state.errors?.server?.map((error: string, i: number) => (
        <p key={i} className="text-sm text-red-500">
          {error}
        </p>
      ))}

      <div className="pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="flex h-12 w-full transform cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-10 font-button text-on-primary shadow-md transition-all duration-200 hover:-translate-y-1 hover:opacity-90 hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
        >
          {isPending ? (
            <>
              <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
              Sending...
            </>
          ) : (
            <>
              Send Message
              <span className="material-symbols-outlined text-[20px]">send</span>
            </>
          )}
        </button>
      </div>
    </form>
  )
}

export default SendEmail
