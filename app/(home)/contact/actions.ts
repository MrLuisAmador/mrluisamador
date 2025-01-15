'use server'

import mail from '@sendgrid/mail'
import {redirect} from 'next/navigation'

async function verifyRecaptcha(token: string) {
  const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify'
  const response = await fetch(verifyUrl, {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
  })

  const data = await response.json()
  return data.success && data.score >= 0.5
}

export async function create(formData: FormData) {
  const token = formData.get('recaptchaToken') as string
  const isHuman = await verifyRecaptcha(token)

  if (!isHuman) {
    console.error('Failed reCAPTCHA verification')
    return
  }

  let body: any = {
    email: formData.get('email'),
    message: formData.get('message'),
  }

  mail.setApiKey(process.env.SENDGRID_API_KEY || '')

  const message = `
    Email: ${body.email}\r\n
    Message: ${body.message}
  `

  const data = {
    to: 'mrluisamador@gmail.com',
    from: 'webmaster@mrluisamador.com',
    subject: 'What service do you need done?',
    text: message,
    html: message.replace(/\r\n/g, '<br>'),
  }

  try {
    await mail.send(data)
  } catch (error) {
    console.error('There was an error sending the email:', error)
    return
  }

  redirect('/thankyou')
}
