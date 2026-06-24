'use server'

import nodemailer from 'nodemailer'

export async function submitQuote(formData: Record<string, string>) {
  const { name, company, email, users, products, needs } = formData

  if (!name || !email) {
    return { error: 'Name and email are required.' }
  }

  // Configure your SMTP transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER, // Your cloudpxlsupport@gmail.com
      pass: process.env.SMTP_PASSWORD, // Your Google App Password
    },
  })

  // 1. Internal Notification (Sent to you)
  const internalMailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.SMTP_USER, // Sending to yourself
    replyTo: email, // Allows you to hit "Reply" and email the client directly
    subject: `🚨 New Lead: ${company || name} - CloudPxl`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px;">
        <h2>New Infrastructure Quote Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr />
        <h3>Scale Data:</h3>
        <p><strong>Users:</strong> ${users || 'N/A'}</p>
        <p><strong>Products/Tenants:</strong> ${products || 'N/A'}</p>
        <hr />
        <h3>Architecture Needs:</h3>
        <p style="white-space: pre-wrap;">${needs || 'None provided.'}</p>
      </div>
    `,
  }

  // 2. External Auto-Reply (Sent to the client)
  const clientMailOptions = {
    from: `"CloudPxl Engineering" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Request Received: CloudPxl Architecture Scope',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #0A0A0A;">
        <h2 style="color: #0818A8;">Request Received.</h2>
        <p>Hi ${name},</p>
        <p>Thank you for reaching out to CloudPxl. We have received the infrastructure requirements for ${company || 'your project'}.</p>
        <p>A senior engineer is currently reviewing your concurrent workflow parameters and will reach out within 24 hours to discuss a precise technical and financial roadmap.</p>
        
        <hr style="border: none; border-top: 1px solid rgba(10,10,10,0.1); margin: 30px 0;" />
        
        <h3 style="margin-bottom: 15px;">What happens next?</h3>
        <ul style="padding-left: 20px; line-height: 1.6;">
          <li style="margin-bottom: 10px;"><strong>Architecture Review:</strong> We analyze your stack preferences, compliance needs, and multi-tenant constraints.</li>
          <li style="margin-bottom: 10px;"><strong>Scoping Call:</strong> We will schedule a brief technical alignment session to eliminate any ambiguity.</li>
          <li style="margin-bottom: 10px;"><strong>Environment Provisioning:</strong> Once aligned, we deploy your isolated infrastructure.</li>
        </ul>

        <p style="margin-top: 30px;">If you have any immediate documentation to share, simply reply directly to this email.</p>
        <br/>
        <p>Best regards,</p>
        <p><strong>The CloudPxl Team</strong></p>
      </div>
    `,
  }

  try {
    // Send both emails concurrently
    await Promise.all([
      transporter.sendMail(internalMailOptions),
      transporter.sendMail(clientMailOptions)
    ])
    return { success: true }
  } catch (error: any) {
    // This forces the actual Google error to show up on the frontend UI
    return { error: `Raw Error: ${error.message || 'Unknown SMTP error'}` }
  }
}