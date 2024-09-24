'use server'

import mail from '@sendgrid/mail'
import {redirect} from 'next/navigation'

export async function create(formData: FormData) {
  'use server'

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
