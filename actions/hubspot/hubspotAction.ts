'use server'

import {verifyRecaptcha} from '@/lib/google/verifyRecaptcha'
import {ContactFormSchema} from '@/lib/zod/contact-form-schema'

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

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'An unknown error occurred'
}

export async function hubspotAction(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const formDataObj = Object.fromEntries(formData.entries())
    const result = ContactFormSchema.safeParse(formDataObj)

    if (!result.success) {
      return {
        success: false,
        errors: result.error.flatten().fieldErrors as FormState['errors'],
      }
    }

    const token = formData.get('recaptchaToken')
    const tokenValue = typeof token === 'string' ? token : null
    if (!tokenValue) {
      return {
        success: false,
        errors: {
          recaptcha: ['reCAPTCHA token is missing. Please try again.'],
        },
      }
    }

    const isHuman = await verifyRecaptcha(tokenValue)
    if (!isHuman) {
      return {
        success: false,
        errors: {
          recaptcha: ['reCAPTCHA verification failed. Please try again.'],
        },
      }
    }

    const {name, email, message} = result.data

    // Split the name into firstname and lastname
    const nameParts = name.trim().split(' ')
    const firstname = nameParts[0]
    const lastname = nameParts.length > 1 ? nameParts.slice(1).join(' ') : ''

    const portalId = '1654039'
    const formGuid = '5eb27d0e-2cc5-4438-9e2f-3af045c6c5ef'

    const hubspotData = {
      fields: [
        {name: 'email', value: email},
        {name: 'firstname', value: firstname},
        {name: 'lastname', value: lastname},
        {name: 'message', value: message},
      ],
    }

    const response = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hubspotData),
      }
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('HubSpot Forms API Error:', errorData)
      throw new Error(`Failed to submit to HubSpot Forms: ${response.statusText}`)
    }

    return {
      success: true,
      errors: undefined,
    }
  } catch (error) {
    console.error('Form submission error:', error)
    return {
      success: false,
      errors: {
        server: [getErrorMessage(error)],
      },
    }
  }
}
