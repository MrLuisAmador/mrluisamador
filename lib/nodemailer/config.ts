import nodemailer from 'nodemailer'

// Email configuration
export const emailConfig = {
  host: process.env.SMTP_HOST || '',
  port: parseInt(process.env.SMTP_PORT || ''),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASSWORD || '',
  },
}

// Create reusable transporter
export const createTransporter = () => {
  return nodemailer.createTransport(emailConfig)
}

// Email templates
export const emailTemplates = {
  contactForm: (data: {email: string; message: string}) => ({
    from: process.env.SMTP_FROM || 'webmaster@mrluisamador.com',
    to: 'mrluisamador@gmail.com',
    subject: 'What service do you need done?',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333; border-bottom: 2px solid #cf4646; padding-bottom: 10px;">
          Contact Form Submission
        </h1>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #555; margin-top: 0;">Contact Information</h2>
          <p><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #cf4646;">${data.email}</a></p>
        </div>
        
        <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #555; margin-top: 0;">Message</h2>
          <p style="line-height: 1.6; color: #333;">${data.message.replace(/\n/g, '<br>')}</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
          <p>This email was sent from your website contact form.</p>
          <p>Time: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `,
  }),
}
