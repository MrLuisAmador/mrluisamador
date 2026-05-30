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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          <label className="text-label-sm font-label-sm text-on-secondary-container uppercase block mb-2">Name</label>
          <input 
            type="text"
            name="name"
            placeholder="John Doe"
            className={`w-full bg-surface-container-low border-0 border-b py-3 px-4 rounded-t-md focus:outline-none focus:border-primary transition-all duration-200 placeholder:text-outline-variant ${
              state.errors?.name ? 'border-red-500' : 'border-border-subtle'
            }`}
          />
          {state.errors?.name?.map((error: string, i: number) => (
            <p key={i} className="pt-1 text-xs text-red-500">{error}</p>
          ))}
        </div>
        <div className="relative">
          <label className="text-label-sm font-label-sm text-on-secondary-container uppercase block mb-2">Email</label>
          <input 
            type="email"
            name="email"
            placeholder="john@example.com"
            className={`w-full bg-surface-container-low border-0 border-b py-3 px-4 rounded-t-md focus:outline-none focus:border-primary transition-all duration-200 placeholder:text-outline-variant ${
              state.errors?.email ? 'border-red-500' : 'border-border-subtle'
            }`}
          />
          {state.errors?.email?.map((error: string, i: number) => (
            <p key={i} className="pt-1 text-xs text-red-500">{error}</p>
          ))}
        </div>
      </div>

      <div className="relative">
        <label className="text-label-sm font-label-sm text-on-secondary-container uppercase block mb-2">Message</label>
        <textarea 
          name="message"
          rows={4}
          placeholder="Tell me about your project..."
          className={`w-full bg-surface-container-low border-0 border-b py-3 px-4 rounded-t-md focus:outline-none focus:border-primary transition-all duration-200 placeholder:text-outline-variant resize-none ${
            state.errors?.message ? 'border-red-500' : 'border-border-subtle'
          }`}
        />
        {state.errors?.message?.map((error: string, i: number) => (
          <p key={i} className="pt-1 text-xs text-red-500">{error}</p>
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
          className="w-full md:w-auto cursor-pointer px-10 h-12 bg-primary text-on-primary font-button rounded-lg hover:opacity-90 transition-all duration-200 transform hover:-translate-y-1 shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
