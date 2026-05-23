'use server'

import {verifyRecaptcha} from '@/lib/google/verifyRecaptcha'
import {createTransporter, emailTemplates} from '@/lib/nodemailer/config'
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

export async function nodemailerAction(
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
        server: [getErrorMessage(error)],
      },
    }
  }
}
