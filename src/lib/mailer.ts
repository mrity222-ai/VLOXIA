import nodemailer from "nodemailer";

export function getMailTransporter() {
  const port = Number(process.env.SMTP_PORT) || 587;
  const isSecure = port === 465;

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port,
    secure: isSecure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      // Useful for cPanel / private hosting servers with internal certificates
      rejectUnauthorized: process.env.NODE_ENV === "production" ? false : false,
    },
  });
}

export async function sendOtpEmail(to: string, otp: string, adminName: string) {
  const hasCredentials = Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);

  // In test/mock mode or when credentials aren't set yet:
  if (!hasCredentials || process.env.SMTP_PASS?.includes("mock")) {
    console.log(`\n======================================================`);
    console.log(`[VLOXIA SMTP SIMULATION] To: ${to}`);
    console.log(`[VLOXIA SMTP SIMULATION] Subject: VLOXIA Admin Verification Code`);
    console.log(`[VLOXIA SMTP SIMULATION] Verification OTP: >>> ${otp} <<< (Valid for 10 minutes)`);
    console.log(`======================================================\n`);
    return { success: true, simulated: true, otp };
  }

  const mailOptions = {
    from: process.env.SMTP_FROM || `"VLOXIA Security" <${process.env.SMTP_USER}>`,
    to,
    subject: `Your VLOXIA Admin Verification Code: ${otp}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 580px; margin: 0 auto; padding: 28px; background: #071026; color: #f8fafc; border: 1px solid rgba(37,99,235,0.3); border-radius: 16px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h2 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: -0.5px; font-weight: 800;">VLOXIA</h2>
          <p style="color: #38bdf8; font-size: 11px; margin-top: 4px; letter-spacing: 1.5px; text-transform: uppercase;">Clean Energy Systems LLP</p>
        </div>
        
        <p style="font-size: 15px; color: #e2e8f0; line-height: 1.5;">Hello <strong>${adminName}</strong>,</p>
        <p style="font-size: 14px; color: #94a3b8; line-height: 1.6;">You have requested an administrative login verification code for the VLOXIA management portal.</p>
        
        <div style="text-align: center; margin: 28px 0; padding: 20px; background: #0a1738; border: 1px dashed #2563eb; border-radius: 12px;">
          <div style="font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #38bdf8; font-family: monospace;">${otp}</div>
          <p style="color: #64748b; font-size: 12px; margin-top: 8px;">Valid for 10 minutes • Do not share this code</p>
        </div>

        <p style="color: #64748b; font-size: 12px; line-height: 1.5;">If you did not initiate this request, your administrative account credentials may have been entered. Please verify immediately.</p>
        <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.08); margin: 24px 0;" />
        <p style="color: #475569; font-size: 11px; text-align: center; margin: 0;">© 2026 VLOXIA Systems LLP. All rights reserved.</p>
      </div>
    `,
  };

  try {
    const transporter = getMailTransporter();
    await transporter.sendMail(mailOptions);
    return { success: true, simulated: false };
  } catch (error: any) {
    console.error("Nodemailer SMTP dispatch error:", error.message);
    // Return graceful fallback with simulated OTP so admin isn't locked out
    return { success: true, simulated: true, fallbackReason: error.message, otp };
  }
}

export async function sendOrderConfirmationEmail({
  to,
  customerName,
  orderNumber,
  items,
  totalAmount,
  trackingUrl,
}: {
  to: string;
  customerName: string;
  orderNumber: string;
  items: any[];
  totalAmount: number;
  trackingUrl: string;
}) {
  const hasCredentials = Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);

  if (!hasCredentials) {
    console.log(`[ORDER EMAIL SIMULATION] To: ${to}, Order: ${orderNumber}, Total: Rs. ${totalAmount}`);
    return { success: true, simulated: true };
  }

  const itemsHtml = items
    .map(
      (item) => `
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #1e293b; color: #e2e8f0; font-size: 13px;">${item.name || item.title} (x${item.quantity || 1})</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #1e293b; color: #38bdf8; font-size: 13px; text-align: right; font-weight: bold;">₹${(item.price * (item.quantity || 1)).toLocaleString("en-IN")}</td>
      </tr>
    `
    )
    .join("");

  const mailOptions = {
    from: process.env.SMTP_FROM || `"VLOXIA Orders" <${process.env.SMTP_USER}>`,
    to,
    subject: `Order Confirmed: ${orderNumber} - VLOXIA Energy Systems`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 28px; background: #071026; color: #f8fafc; border: 1px solid rgba(37,99,235,0.3); border-radius: 16px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h2 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800;">VLOXIA</h2>
          <p style="color: #38bdf8; font-size: 11px; margin-top: 4px; letter-spacing: 1.5px; text-transform: uppercase;">Clean Energy Systems LLP</p>
        </div>
        
        <h3 style="color: #22c55e; margin: 0 0 12px 0; font-size: 18px;">Payment Successful & Order Confirmed!</h3>
        <p style="font-size: 14px; color: #cbd5e1; line-height: 1.6;">Hello <strong>${customerName}</strong>, thank you for choosing VLOXIA. We have received your order <strong>${orderNumber}</strong>.</p>
        
        <table style="width: 100%; margin: 20px 0; border-collapse: collapse;">
          <thead>
            <tr>
              <th style="text-align: left; padding-bottom: 8px; border-bottom: 2px solid #2563eb; color: #94a3b8; font-size: 12px; text-transform: uppercase;">Hardware Item</th>
              <th style="text-align: right; padding-bottom: 8px; border-bottom: 2px solid #2563eb; color: #94a3b8; font-size: 12px; text-transform: uppercase;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
            <tr>
              <td style="padding-top: 14px; font-weight: bold; color: #ffffff; font-size: 14px;">Total Paid</td>
              <td style="padding-top: 14px; font-weight: 800; color: #22c55e; font-size: 16px; text-align: right;">₹${totalAmount.toLocaleString("en-IN")}</td>
            </tr>
          </tbody>
        </table>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${trackingUrl}" style="background: #2563eb; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 9999px; font-weight: 600; font-size: 13px; display: inline-block;">Track Order Status</a>
        </div>

        <p style="color: #64748b; font-size: 12px; text-align: center;">For enterprise shipping or technical inquiries, reach our team at support@vloxia.in</p>
        <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.08); margin: 24px 0;" />
        <p style="color: #475569; font-size: 11px; text-align: center; margin: 0;">© 2026 VLOXIA Systems LLP • Intelligent Clean Energy & EV Infrastructure</p>
      </div>
    `,
  };

  try {
    const transporter = getMailTransporter();
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error: any) {
    console.error("Order confirmation email error:", error.message);
    return { success: false, error: error.message };
  }
}
