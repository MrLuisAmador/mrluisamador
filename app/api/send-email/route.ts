import {NextResponse} from 'next/server'
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '')

export async function POST(req: Request) {
  try {
    const {to, subject, text} = await req.json()

    if (!to || !subject || !text) {
      return NextResponse.json({error: 'Missing fields'}, {status: 400})
    }

    const msg = {
      to,
      from: process.env.SENDGRID_FROM_EMAIL || 'webmaster@mrluisamador.com',
      subject,
      text,
    }

    await sgMail.send(msg)
    return NextResponse.json({success: true, message: 'Email sent!'})
  } catch (error) {
    console.error('SendGrid Error:', error)
    return NextResponse.json({error: 'Failed to send email'}, {status: 500})
  }
}
