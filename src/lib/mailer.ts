import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendOtpEmail(to: string, otp: string, adminName: string) {
  const isMock = !process.env.SMTP_PASS || process.env.SMTP_PASS.includes("mock");

  // In test/mock mode, we log OTP directly to console
  if (isMock) {
    console.log(`\n======================================================`);
    console.log(`[SMTP SIMULATION] To: ${to}`);
    console.log(`[SMTP SIMULATION] Subject: VLOXIA Admin Verification Code`);
    console.log(`[SMTP SIMULATION] Verification OTP: >>> ${otp} <<< (Valid for 10 minutes)`);
    console.log(`======================================================\n`);
    return { success: true, simulated: true };
  }

  const mailOptions = {
    from: process.env.SMTP_FROM || '"VLOXIA Security" <no-reply@vloxia.in>',
    to,
    subject: `Your VLOXIA Admin Verification Code: ${otp}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <div style="background-color: #0F172A; padding: 15px; border-radius: 8px; text-align: center;">
          <h2 style="color: #ffffff; margin: 0;">VLOXIA SYSTEMS LLP</h2>
        </div>
        <p style="margin-top: 20px;">Hello <strong>${adminName}</strong>,</p>
        <p>You have requested an administrative login verification code for the VLOXIA Systems platform.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <span style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #2563eb; background: #eff6ff; padding: 10px 24px; border-radius: 8px; border: 1px dashed #bfdbfe;">${otp}</span>
          <p style="color: #64748b; font-size: 12px; margin-top: 8px;">Valid for 10 minutes only</p>
        </div>

        <p style="color: #64748b; font-size: 13px;">If you did not initiate this request, please contact VLOXIA Security immediately.</p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p style="color: #94a3b8; font-size: 11px; text-align: center;">© 2026 VLOXIA Systems LLP. All rights reserved.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error: any) {
    console.error("Nodemailer SMTP dispatch error:", error);
    return { success: false, error: error.message };
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
  items: Array<{ name: string; qty?: number; quantity?: number; price?: number }>;
  totalAmount: number;
  trackingUrl: string;
}) {
  const isMock = !process.env.SMTP_PASS || process.env.SMTP_PASS.includes("mock");

  // In test/mock mode, log detailed email simulation
  if (isMock) {
    console.log(`\n======================================================`);
    console.log(`[SMTP SIMULATION] Order Confirmation Email Dispatched!`);
    console.log(`[SMTP SIMULATION] Recipient: ${to}`);
    console.log(`[SMTP SIMULATION] Order Number: ${orderNumber}`);
    console.log(`[SMTP SIMULATION] Total Amount: ₹${totalAmount.toLocaleString("en-IN")}`);
    console.log(`[SMTP SIMULATION] Tracking URL: ${trackingUrl}`);
    console.log(`[SMTP SIMULATION] Items: ${JSON.stringify(items)}`);
    console.log(`======================================================\n`);
    return { success: true, simulated: true };
  }

  const itemsListHtml = items
    .map(
      (item) => `
      <tr style="border-bottom: 1px solid #f1f5f9;">
        <td style="padding: 10px 0; font-weight: bold; color: #1e293b;">${item.name}</td>
        <td style="padding: 10px 0; text-align: center; color: #64748b;">${item.qty || item.quantity || 1}</td>
        <td style="padding: 10px 0; text-align: right; font-weight: bold; color: #2563eb;">₹${Number(item.price || totalAmount).toLocaleString("en-IN")}</td>
      </tr>
    `
    )
    .join("");

  const mailOptions = {
    from: process.env.SMTP_FROM || '"VLOXIA Clean Energy" <orders@vloxia.in>',
    to,
    subject: `Order Confirmed: VLOXIA Order #${orderNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
        <div style="background-color: #0F172A; padding: 18px; border-radius: 12px; text-align: center; margin-bottom: 24px;">
          <h2 style="color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 1px;">VLOXIA SYSTEMS LLP</h2>
          <span style="color: #38bdf8; font-size: 11px; text-transform: uppercase; font-weight: bold;">Order Fulfillment & Dispatch Desk</span>
        </div>

        <h3 style="color: #0f172a; margin-top: 0; font-size: 18px;">Thank you for your purchase, ${customerName}!</h3>
        <p style="color: #475569; font-size: 14px; line-height: 1.6;">
          Your clean energy hardware order has been successfully placed and confirmed. Our engineering inspection team has initiated packing and dispatch preparations.
        </p>

        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin: 20px 0;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: #64748b; font-size: 13px;">Order Reference:</span>
            <strong style="color: #0f172a; font-family: monospace;">${orderNumber}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: #64748b; font-size: 13px;">Payment Status:</span>
            <strong style="color: #16a34a; font-size: 13px;">PAID & VERIFIED (Razorpay)</strong>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #64748b; font-size: 13px;">Dispatch Timeline:</span>
            <strong style="color: #2563eb; font-size: 13px;">24–48 Hours Across India</strong>
          </div>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
          <thead>
            <tr style="border-bottom: 2px solid #e2e8f0; color: #64748b; font-size: 12px; text-transform: uppercase;">
              <th style="padding: 8px 0; text-align: left;">Item</th>
              <th style="padding: 8px 0; text-align: center;">Qty</th>
              <th style="padding: 8px 0; text-align: right;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${itemsListHtml}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" style="padding-top: 14px; font-weight: bold; color: #0f172a;">Grand Total Paid:</td>
              <td style="padding-top: 14px; text-align: right; font-weight: bold; font-size: 16px; color: #2563eb;">₹${totalAmount.toLocaleString("en-IN")}</td>
            </tr>
          </tfoot>
        </table>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${trackingUrl}" style="background-color: #2563eb; color: #ffffff; padding: 14px 28px; border-radius: 9999px; text-decoration: none; font-weight: bold; font-size: 14px; display: inline-block;">
            Track Your Order Status Live ➔
          </a>
        </div>

        <p style="color: #64748b; font-size: 12px; line-height: 1.5; margin-top: 24px;">
          For any installation, technical, or dispatch inquiries, reach our direct engineering hotline at <a href="tel:+918178810456" style="color: #2563eb;">+91 8178810456</a> or write to <a href="mailto:vloxiasystems@gmail.com" style="color: #2563eb;">vloxiasystems@gmail.com</a>.
        </p>

        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p style="color: #94a3b8; font-size: 11px; text-align: center; margin: 0;">
          © 2026 VLOXIA Systems LLP. All rights reserved.
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error: any) {
    console.error("Nodemailer Order Confirmation dispatch error:", error);
    return { success: false, error: error.message };
  }
}
