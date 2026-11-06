import nodemailer from "nodemailer";
import { getSystemSettings } from "@/lib/settings";

export async function getMailTransporter(customConfig?: {
  smtpHost?: string;
  smtpPort?: number;
  smtpUser?: string;
  smtpPass?: string;
}) {
  const settings = await getSystemSettings();

  const host = customConfig?.smtpHost || settings.smtpHost;
  const port = Number(customConfig?.smtpPort || settings.smtpPort) || 587;
  const isSecure = port === 465;
  const user = customConfig?.smtpUser || settings.smtpUser;
  const pass = customConfig?.smtpPass || settings.smtpPass;

  return nodemailer.createTransport({
    host,
    port,
    secure: isSecure,
    auth: user && pass ? { user, pass } : undefined,
    tls: {
      rejectUnauthorized: false, // Compatibility for private hosting/cPanel certificates
    },
  });
}

export async function sendOtpEmail(to: string, otp: string, adminName: string) {
  const settings = await getSystemSettings();
  const hasCredentials = Boolean(settings.smtpUser && settings.smtpPass);

  if (!hasCredentials || settings.smtpPass?.includes("mock")) {
    console.log(`\n======================================================`);
    console.log(`[VLOXIA SMTP SIMULATION] To: ${to}`);
    console.log(`[VLOXIA SMTP SIMULATION] Subject: VLOXIA Admin Verification Code`);
    console.log(
      `[VLOXIA SMTP SIMULATION] Verification OTP: >>> ${otp} <<< (Valid for 10 minutes)`
    );
    console.log(`======================================================\n`);
    return { success: true, simulated: true, otp };
  }

  const mailOptions = {
    from: settings.smtpFrom || `"VLOXIA Security" <${settings.smtpUser}>`,
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
    const transporter = await getMailTransporter();
    await transporter.sendMail(mailOptions);
    return { success: true, simulated: false };
  } catch (error: any) {
    console.error("Nodemailer SMTP dispatch error:", error.message);
    return { success: true, simulated: true, fallbackReason: error.message, otp };
  }
}

export async function sendPasswordResetEmail(
  to: string,
  resetLink: string,
  adminName: string
) {
  const settings = await getSystemSettings();
  const hasCredentials = Boolean(settings.smtpUser && settings.smtpPass);

  if (!hasCredentials || settings.smtpPass?.includes("mock")) {
    console.log(`\n======================================================`);
    console.log(`[VLOXIA RESET PASSWORD SIMULATION] To: ${to}`);
    console.log(`[VLOXIA RESET PASSWORD SIMULATION] Subject: Reset Your VLOXIA Admin Password`);
    console.log(`[VLOXIA RESET PASSWORD SIMULATION] Reset Link: >>> ${resetLink} <<<`);
    console.log(`======================================================\n`);
    return { success: true, simulated: true, resetLink };
  }

  const mailOptions = {
    from: settings.smtpFrom || `"VLOXIA Security" <${settings.smtpUser}>`,
    to,
    subject: `Reset Your VLOXIA Admin Password`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 580px; margin: 0 auto; padding: 28px; background: #071026; color: #f8fafc; border: 1px solid rgba(37,99,235,0.3); border-radius: 16px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h2 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: -0.5px; font-weight: 800;">VLOXIA</h2>
          <p style="color: #38bdf8; font-size: 11px; margin-top: 4px; letter-spacing: 1.5px; text-transform: uppercase;">Clean Energy Systems LLP</p>
        </div>
        
        <p style="font-size: 15px; color: #e2e8f0; line-height: 1.5;">Hello <strong>${adminName}</strong>,</p>
        <p style="font-size: 14px; color: #94a3b8; line-height: 1.6;">We received a request to reset your password for the VLOXIA Management Portal. Click the button below to set a new password:</p>
        
        <div style="text-align: center; margin: 32px 0;">
          <a href="${resetLink}" target="_blank" style="display: inline-block; background: #2563eb; color: #ffffff; font-weight: 700; font-size: 14px; padding: 14px 28px; border-radius: 12px; text-decoration: none; box-shadow: 0 4px 14px rgba(37,99,235,0.4);">
            Reset Admin Password →
          </a>
          <p style="color: #64748b; font-size: 12px; margin-top: 14px;">This link is valid for 1 hour. If you didn't request a password reset, you can safely ignore this email.</p>
        </div>

        <div style="background: #0a1738; padding: 12px 16px; border-radius: 8px; font-size: 12px; color: #94a3b8; word-break: break-all;">
          <span style="color: #38bdf8; font-weight: 600;">Direct Link:</span> <a href="${resetLink}" style="color: #94a3b8; text-decoration: underline;">${resetLink}</a>
        </div>

        <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.08); margin: 24px 0;" />
        <p style="color: #475569; font-size: 11px; text-align: center; margin: 0;">© 2026 VLOXIA Systems LLP. All rights reserved.</p>
      </div>
    `,
  };

  try {
    const transporter = await getMailTransporter();
    await transporter.sendMail(mailOptions);
    return { success: true, simulated: false };
  } catch (error: any) {
    console.error("Nodemailer reset link dispatch error:", error.message);
    return { success: false, error: error.message, simulated: true, resetLink };
  }
}

export async function sendTestEmail(
  to: string,
  customConfig?: {
    smtpHost?: string;
    smtpPort?: number;
    smtpUser?: string;
    smtpPass?: string;
    smtpFrom?: string;
  }
) {
  const transporter = await getMailTransporter(customConfig);
  const from =
    customConfig?.smtpFrom ||
    `"VLOXIA Test" <${customConfig?.smtpUser || "admin@vloxia.in"}>`;

  const mailOptions = {
    from,
    to,
    subject: `VLOXIA SMTP Connection Verified Successfully!`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 580px; margin: 0 auto; padding: 28px; background: #071026; color: #f8fafc; border: 1px solid rgba(16,185,129,0.3); border-radius: 16px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h2 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800;">VLOXIA</h2>
          <p style="color: #10b981; font-size: 12px; margin-top: 4px; font-weight: bold; letter-spacing: 1px;">✓ SMTP CONFIGURATION VERIFIED</p>
        </div>
        <p style="font-size: 14px; color: #e2e8f0; line-height: 1.6;">Congratulations! Your SMTP settings in the VLOXIA Admin Panel are working properly.</p>
        <p style="font-size: 13px; color: #94a3b8;">This test email confirms that your server can reliably dispatch administrative OTPs, password reset links, and customer purchase receipts.</p>
        <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.08); margin: 24px 0;" />
        <p style="color: #475569; font-size: 11px; text-align: center; margin: 0;">Sent automatically by VLOXIA Enterprise Settings Manager.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
  return { success: true };
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
  const settings = await getSystemSettings();
  const hasCredentials = Boolean(settings.smtpUser && settings.smtpPass);

  if (!hasCredentials) {
    console.log(
      `[ORDER EMAIL SIMULATION] To: ${to}, Order: ${orderNumber}, Total: Rs. ${totalAmount}`
    );
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
    from: settings.smtpFrom || `"VLOXIA Orders" <${settings.smtpUser}>`,
    to,
    subject: `Order Confirmed: #${orderNumber} | VLOXIA Systems LLP`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 28px; background: #071026; color: #f8fafc; border: 1px solid rgba(37,99,235,0.3); border-radius: 16px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h2 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800;">VLOXIA</h2>
          <p style="color: #38bdf8; font-size: 11px; margin-top: 4px; letter-spacing: 1.5px; text-transform: uppercase;">Clean Energy Systems LLP</p>
        </div>

        <p style="font-size: 15px; color: #e2e8f0;">Hello <strong>${customerName}</strong>,</p>
        <p style="font-size: 14px; color: #94a3b8; line-height: 1.6;">Thank you for your order! Your clean energy hardware order <strong>#${orderNumber}</strong> has been received and is currently being processed by our fulfillment facility.</p>

        <div style="margin: 24px 0; background: #0b152d; border: 1px solid #1e293b; border-radius: 12px; padding: 18px;">
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr>
                <th style="text-align: left; padding-bottom: 8px; color: #64748b; font-size: 11px; text-transform: uppercase;">Item Description</th>
                <th style="text-align: right; padding-bottom: 8px; color: #64748b; font-size: 11px; text-transform: uppercase;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
            <tfoot>
              <tr>
                <td style="padding-top: 14px; font-weight: bold; color: #ffffff; font-size: 14px;">Total Amount Paid</td>
                <td style="padding-top: 14px; font-weight: bold; color: #38bdf8; font-size: 16px; text-align: right; font-family: monospace;">₹${totalAmount.toLocaleString("en-IN")}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div style="text-align: center; margin: 28px 0;">
          <a href="${trackingUrl}" target="_blank" style="display: inline-block; background: #2563eb; color: #ffffff; font-weight: 600; font-size: 13px; padding: 12px 24px; border-radius: 8px; text-decoration: none;">Track Order Status →</a>
        </div>

        <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.08); margin: 24px 0;" />
        <p style="color: #475569; font-size: 11px; text-align: center; margin: 0;">© 2026 VLOXIA Systems LLP. Customer Support: +91 8178810456 | vloxiasystems@gmail.com</p>
      </div>
    `,
  };

  try {
    const transporter = await getMailTransporter();
    await transporter.sendMail(mailOptions);
    return { success: true, simulated: false };
  } catch (error: any) {
    console.error("Order email error:", error.message);
    return { success: false, simulated: true, error: error.message };
  }
}
