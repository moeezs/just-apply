import { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const to = formData.get('to') as string;
    const subject = formData.get('subject') as string;
    const body = formData.get('body') as string;

    if (!to || !subject || !body) {
      return Response.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const resume = formData.get('resume');
    const letter = formData.get('letter');

    const attachments = [];
    
    if (resume instanceof File) {
      const buffer = Buffer.from(await resume.arrayBuffer());
      attachments.push({
        filename: resume.name,
        content: buffer,
      });
    }

    if (letter instanceof File) {
      const buffer = Buffer.from(await letter.arrayBuffer());
      attachments.push({
        filename: letter.name,
        content: buffer,
      });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        secure: false,
        auth: {
            user: process.env.GMAIL_FROM,
            pass: process.env.GMAIL_APP_PASSWORD
        }
    });

    const mailOptions = {
      from: 'Moeez <moeezsprojects@gmail.com>',
      to,
      subject,
      text: body,
      attachments,
    };

    await transporter.sendMail(mailOptions);

    return Response.json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, message: 'Failed to send email' }, { status: 500 });
  }
}