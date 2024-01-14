import mail from '@sendgrid/mail';
import { NextResponse } from 'next/server';

mail.setApiKey(process.env.SENDGRID_API_KEY || '');

type ResponseData = {
  status?: string;
  message?: string;
};

export async function POST(request: Request) {
  let response: ResponseData = {};
  const body = await request.json();
  
  const message = `
    Name: ${body.name}\r\n
    Email: ${body.email}\r\n
    Subject: ${body.subject}\r\n
    Message: ${body.message}
  `;
  
  const data = {
    to: 'mrluisamador@gmail.com',
    from: 'webmaster@mrluisamador.com',
    subject: body.subject,
    text: message,
    html: message.replace(/\r\n/g, '<br>')
  };

  await mail
    .send(data)
    .then(() => {
      response = {
        status: 'success',
        message: "Your message was sent. I'll be in contact shortly.",
      };
    })
    .catch((error) => {
      response = {
        status: 'error',
        message: `Message failed to send with error, ${error}`,
      };
    });

  return NextResponse.json(response);
}
