import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, countryCode, phone, company, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Configure Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER || process.env.EMAIL_USER,
        pass: process.env.SMTP_PASS || process.env.EMAIL_PASS,
      },
    });

    const recipientEmail = process.env.RECIPIENT_EMAIL || "export@handiloomwood.com";

    // HTML Email Template
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; background-color: #ffffff;">
        <div style="background-color: #1a1a1a; padding: 24px; text-align: center; color: #ffffff;">
          <h1 style="margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 2px; color: #d4a373;">Handiloomwood Export Inquiry</h1>
          <p style="margin: 6px 0 0 0; font-size: 12px; color: #a0a0a0;">New Web Lead Submission</p>
        </div>
        <div style="padding: 30px; color: #333333;">
          <h2 style="font-size: 18px; margin-top: 0; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px; color: #1a1a1a;">Client Details</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 140px; color: #666666;">Full Name:</td>
              <td style="padding: 8px 0; font-size: 15px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666666;">Email Address:</td>
              <td style="padding: 8px 0; font-size: 15px;"><a href="mailto:${email}" style="color: #b84033; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666666;">Phone Number:</td>
              <td style="padding: 8px 0; font-size: 15px;"><a href="tel:${countryCode}${phone}" style="color: #333333; text-decoration: none;">${countryCode} ${phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666666;">Company Name:</td>
              <td style="padding: 8px 0; font-size: 15px;">${company || "N/A"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666666;">Subject / Category:</td>
              <td style="padding: 8px 0; font-size: 15px; font-weight: bold; color: #b84033;">${subject || "General Inquiry"}</td>
            </tr>
          </table>

          <h2 style="font-size: 18px; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px; color: #1a1a1a; margin-top: 25px;">Project Requirements & Specs</h2>
          <div style="background-color: #f9f9f9; padding: 18px; border-radius: 8px; border-left: 4px solid #b84033; white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #444444;">
${message}
          </div>
        </div>
        <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 11px; color: #888888;">
          Sent automatically from HANDILOOMWOOD Website Contact Form
        </div>
      </div>
    `;

    if (process.env.SMTP_USER && process.env.SMTP_PASS && process.env.SMTP_USER !== "your-email@gmail.com") {
      try {
        await transporter.sendMail({
          from: `"${name} via Handiloomwood" <${process.env.SMTP_USER}>`,
          replyTo: email,
          to: recipientEmail,
          subject: `[Export Inquiry] ${subject || "New Web Lead"} - ${name}`,
          html: htmlContent,
        });
        console.log(`[Email Sent] Dispatched inquiry to ${recipientEmail}`);
      } catch (sendError: any) {
        console.error(`[SMTP Auth/Connection Failed] Email could not be sent automatically. Check GoDaddy password or port:`, sendError.message);
      }
    } else {
      console.log(`[Inquiry Received] New Web Lead (Configure SMTP in .env.local to enable direct inbox delivery):`, {
        name,
        email,
        phone: `${countryCode} ${phone}`,
        company,
        subject,
        message,
      });
    }

    return NextResponse.json({ success: true, message: "Inquiry submitted successfully" });
  } catch (error: any) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Failed to process inquiry", details: error.message },
      { status: 500 }
    );
  }
}
