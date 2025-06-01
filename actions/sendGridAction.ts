'use server'

import mail from '@sendgrid/mail'
import {verifyRecaptcha} from '@/lib/google/verifyRecaptcha'
import {redirect} from 'next/navigation'
import {ContactFormSchema} from '@/lib/zod/contact-form-schema'

export async function sendGridAction(formData: FormData) {
  const formDataObj = Object.fromEntries(formData.entries())
  const parsedData = ContactFormSchema.safeParse(formDataObj)

  // Validate form data
  if (!parsedData.success) {
    const errors = parsedData.error.flatten()
    console.error('Validation errors:', errors.fieldErrors)
    return
  }

  // Check if reCAPTCHA is enabled
  const token = formData.get('recaptchaToken') as string
  if (!token) {
    console.error('reCAPTCHA token is empty')
    return
  }

  // Verify reCAPTCHA token
  const isHuman = await verifyRecaptcha(token)
  if (!isHuman) {
    console.error('reCAPTCHA verification failed:')
    return
  }

  // Extract email and message from form data
  const body = {
    email: formData.get('email') as string,
    message: formData.get('message') as string,
  }

  mail.setApiKey(process.env.SENDGRID_API_KEY || '')

  if (!process.env.SENDGRID_API_KEY) {
    console.error('SENDGRID_API_KEY is not set')
    return
  }

  const message = `
    <h1>Contact Form Submission</h1>
    <p><strong>Email:</strong> ${body.email}</p>
    <p><strong>Message:</strong></p>
    <p>${body.message}</p>
  `
  const data = {
    to: 'mrluisamador@gmail.com',
    from: 'webmaster@mrluisamador.com',
    subject: 'What service do you need done?',
    html: message,
  }

  try {
    await mail.send(data)
    console.log('Email sent successfully')
  } catch (error) {
    console.error('Error sending email:', error)
    return
  }

  redirect('/thankyou')
}
