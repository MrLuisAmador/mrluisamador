'use server'

import {verifyRecaptcha} from '@/lib/google/verifyRecaptcha'
import {ContactFormSchema} from '@/lib/zod/contact-form-schema'
import {createTransporter, emailTemplates} from '@/lib/nodemailer/config'

type FormState = {
  success: boolean
  errors?: {
    email?: string[]
    message?: string[]
    recaptcha?: string[]
    server?: string[]
  }
}

export async function nodemailerAction(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    // 1. Parse & validate
    const formDataObj = Object.fromEntries(formData.entries())
    const result = ContactFormSchema.safeParse(formDataObj)

    if (!result.success) {
      return {
        success: false,
        errors: result.error.flatten().fieldErrors as FormState['errors'],
      }
    }

    // 2. Security - verify reCAPTCHA
    const token = formData.get('recaptchaToken') as string | null
    if (!token) {
      return {
        success: false,
        errors: {
          recaptcha: ['reCAPTCHA token is missing. Please try again.'],
        },
      }
    }

    const isHuman = await verifyRecaptcha(token)
    if (!isHuman) {
      return {
        success: false,
        errors: {
          recaptcha: ['reCAPTCHA verification failed. Please try again.'],
        },
      }
    }

    // 3. Send email
    const transporter = createTransporter()
    const mailOptions = emailTemplates.contactForm(result.data)

    await transporter.sendMail(mailOptions)

    return {
      success: true,
      errors: undefined,
    }
  } catch (error) {
    console.error('Email sending error:', error)
    return {
      success: false,
      errors: {
        server: [(error as Error).message || 'An unknown error occurred'],
      },
    }
  }
}
