'use server'

import {verifyRecaptcha} from '@/lib/google/verifyRecaptcha'
import {redirect} from 'next/navigation'
import {ContactFormSchema} from '@/lib/zod/contact-form-schema'
import {createTransporter, emailTemplates} from '@/lib/nodemailer/config'

export async function nodemailerAction(formData: FormData) {
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

  // Create transporter
  const transporter = createTransporter()

  // Email content using template
  const mailOptions = emailTemplates.contactForm(body)

  try {
    // Send email
    await transporter.sendMail(mailOptions)
    console.log('Email sent successfully')
  } catch (error) {
    console.error('Error sending email:', error)
    return
  }

  redirect('/thankyou')
}
