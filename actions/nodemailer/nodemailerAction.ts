'use server'

import {verifyRecaptcha} from '@/actions/google/verifyRecaptcha'
import {redirect} from 'next/navigation'
import {ContactFormSchema} from '@/lib/zod/contact-form-schema'
import {createTransporter, emailTemplates} from '@/lib/nodemailer/config'

export async function nodemailerAction(formData: FormData) {
  const formDataObj = Object.fromEntries(formData.entries())
  const parsedData = ContactFormSchema.safeParse(formDataObj)

  if (!parsedData.success) {
    console.error('Validation errors:', parsedData.error)
    return
  }

  const token = formData.get('recaptchaToken') as string

  if (!token) {
    console.error('reCAPTCHA token is empty')
    return
  }

  const isHuman = await verifyRecaptcha(token)
  if (!isHuman) {
    console.error('reCAPTCHA verification failed:')
    return
  }

  const body = {
    email: formData.get('email') as string,
    message: formData.get('message') as string,
  }

  const transporter = createTransporter()

  const mailOptions = emailTemplates.contactForm(body)

  try {
    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.error('Error sending email:', error)
    return
  }

  redirect('/thankyou')
}
