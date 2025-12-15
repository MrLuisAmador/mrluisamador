'use server'

import {verifyRecaptcha} from '@/lib/google/verifyRecaptcha'
import {redirect} from 'next/navigation'
import {ContactFormSchema} from '@/lib/zod/contact-form-schema'
import {createTransporter, emailTemplates} from '@/lib/nodemailer/config'

type ActionResult = {success: true} | {success: false; error: string}

export async function nodemailerAction(formData: FormData): Promise<ActionResult> {
  const formDataObj = Object.fromEntries(formData.entries())
  const parsedData = ContactFormSchema.safeParse(formDataObj)

  if (!parsedData.success) {
    return {
      success: false,
      error: 'Invalid form data',
    }
  }

  const token = formData.get('recaptchaToken') as string

  if (!token) {
    return {
      success: false,
      error: 'reCAPTCHA token is missing',
    }
  }

  const isHuman = await verifyRecaptcha(token)
  if (!isHuman) {
    return {
      success: false,
      error: 'reCAPTCHA verification failed',
    }
  }

  const body = {
    email: formData.get('email') as string,
    message: formData.get('message') as string,
  }

  const transporter = createTransporter()
  const mailOptions = emailTemplates.contactForm(body)

  try {
    await transporter.sendMail(mailOptions)
    redirect('/thankyou')
  } catch (error) {
    console.error('Error sending email:', error)
    return {
      success: false,
      error: 'Failed to send email. Please try again.',
    }
  }
}
