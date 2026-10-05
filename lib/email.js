import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';

/**
 * Configure Nodemailer transport.
 * Falls back to simulation mode if SMTP credentials are not present in .env.local.
 */
function getTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_PORT === '465',
    auth: { user, pass },
  });
}

/**
 * Send Tax Invoice Email upon successful payment of ₹99
 */
export async function sendInvoiceEmail({ order, customer, paymentId }) {
  const recipient = customer?.email;
  if (!recipient) {
    console.warn('[Email] No customer email provided for order:', order?.orderId);
    return { success: false, reason: 'No recipient email' };
  }

  const logoPath = path.join(process.cwd(), 'public', 'assets', 'img', 'rgc-logo.webp');
  const hasLogo = fs.existsSync(logoPath);

  const invoiceNo = `INV-${(order?.orderId || Date.now().toString()).replace('order_', '').toUpperCase()}`;
  const orderDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const serviceName = order?.service || 'Strategic Business Consultancy';
  const customerName = customer?.name || 'Valued Client';
  const fromAddress = process.env.SMTP_FROM || '"Reddington Global Consultancy Pvt Ltd" <sales@reddingtonglobal.com>';

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 24px; }
        .invoice-box { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
        .header { background: #0f172a; color: #ffffff; padding: 32px 36px; border-bottom: 3px solid #D49F2D; }
        .brand { font-size: 19px; font-weight: 800; letter-spacing: 0.04em; color: #FDFDFD; }
        .brand span { color: #D49F2D; }
        .invoice-title { font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8; margin-top: 6px; }
        .body { padding: 32px 36px; }
        .success-badge { display: inline-block; background: #ecfdf5; color: #047857; font-weight: 700; font-size: 12px; padding: 4px 12px; border-radius: 999px; margin-bottom: 20px; }
        .grid-meta { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid #f1f5f9; }
        .meta-col p { margin: 0 0 4px; font-size: 12px; color: #64748b; }
        .meta-col strong { font-size: 14px; color: #0f172a; }
        .table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
        .table th { text-align: left; padding: 10px 12px; background: #f8fafc; font-size: 12px; text-transform: uppercase; color: #64748b; border-bottom: 1px solid #e2e8f0; }
        .table td { padding: 14px 12px; font-size: 14px; border-bottom: 1px solid #f1f5f9; }
        .total-row { font-weight: 800; font-size: 16px; color: #0f172a; }
        .total-row td { border-top: 2px solid #e2e8f0; }
        .next-steps { background: #fffbeb; border: 1px solid #fef3c7; border-radius: 8px; padding: 16px 20px; margin-bottom: 24px; }
        .next-steps h4 { margin: 0 0 6px; color: #92400e; font-size: 14px; }
        .next-steps p { margin: 0; color: #78350f; font-size: 13px; line-height: 1.5; }
        .footer { padding: 24px 36px; background: #f8fafc; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
      </style>
    </head>
    <body>
      <div class="invoice-box">
        <div class="header">
          ${hasLogo ? '<img src="cid:rgclogo" alt="Reddington Global Consultancy" style="max-height: 48px; width: auto; display: block; margin-bottom: 14px;" />' : ''}
          <div class="brand">REDDINGTON GLOBAL <span>CONSULTANCY PVT LTD</span></div>
          <div class="invoice-title">Tax Invoice / Payment Receipt</div>
        </div>
        <div class="body">
          <div class="success-badge">✓ Payment Confirmed</div>
          <h2 style="margin: 0 0 8px; font-size: 20px; color: #0f172a;">Thank you, ${customerName}!</h2>
          <p style="margin: 0 0 24px; font-size: 14px; color: #64748b;">
            Your ₹99 consultation booking has been confirmed. Below is your official tax invoice.
          </p>

          <div class="grid-meta">
            <div class="meta-col">
              <p>Invoice Number</p>
              <strong>${invoiceNo}</strong>
            </div>
            <div class="meta-col">
              <p>Invoice Date</p>
              <strong>${orderDate}</strong>
            </div>
            <div class="meta-col">
              <p>Razorpay Order ID</p>
              <strong>${order?.orderId || 'N/A'}</strong>
            </div>
            <div class="meta-col">
              <p>Payment Reference ID</p>
              <strong>${paymentId || 'N/A'}</strong>
            </div>
          </div>

          <table class="table">
            <thead>
              <tr>
                <th>Service Description</th>
                <th style="text-align: right;">Amount (INR)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>${serviceName}</strong><br>
                  <span style="font-size: 12px; color: #64748b;">1-on-1 Senior Consultant Strategy Session (SAC 9983)</span>
                </td>
                <td style="text-align: right;">₹83.90</td>
              </tr>
              <tr>
                <td>GST (18%)</td>
                <td style="text-align: right;">₹15.10</td>
              </tr>
              <tr class="total-row">
                <td>Total Paid</td>
                <td style="text-align: right; color: #D49F2D;">₹99.00</td>
              </tr>
            </tbody>
          </table>

          <div style="text-align: center; margin: 24px 0 20px;">
            <a href="https://www.reddingtonglobal.com/invoice/${order?.orderId}" style="display: inline-block; background: #D49F2D; color: #120800; text-decoration: none; padding: 12px 26px; border-radius: 999px; font-weight: 750; font-size: 13px; box-shadow: 0 2px 8px rgba(212, 159, 45, 0.35);">
              📄 View &amp; Download PDF Invoice &rarr;
            </a>
          </div>

          <div class="next-steps">
            <h4>What happens next?</h4>
            <p>Our senior consulting partner will review your requirements and connect with you within 24 business hours to schedule your consultation call.</p>
          </div>

          <p style="font-size: 13px; color: #64748b; margin: 0;">
            Need immediate assistance? Contact our team at <a href="mailto:sales@reddingtonglobal.com" style="color: #D49F2D;">sales@reddingtonglobal.com</a> or WhatsApp <a href="https://wa.me/919818224495" style="color: #D49F2D;">+91 98182 24495</a>.
          </p>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} Reddington Global Consultancy Pvt Ltd. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;

  const transporter = getTransporter();

  if (!transporter) {
    console.log(`[Invoice Email Simulation] To: ${recipient} | Order: ${order?.orderId} | Invoice: ${invoiceNo}`);
    return { success: true, simulated: true, invoiceNo };
  }

  try {
    const bccAddress = process.env.SMTP_BCC || 'sales@reddingtonglobal.com';
    const attachments = hasLogo
      ? [{ filename: 'rgc-logo.webp', path: logoPath, cid: 'rgclogo' }]
      : [];

    const info = await transporter.sendMail({
      from: fromAddress,
      to: recipient,
      bcc: bccAddress,
      subject: `Invoice & Confirmation: Strategic Consultation (${invoiceNo})`,
      html,
      attachments,
    });
    console.log('[Invoice Email Sent]', info.messageId);
    return { success: true, messageId: info.messageId, invoiceNo };
  } catch (error) {
    console.error('[Invoice Email Error]', error);
    return { success: false, error: error.message };
  }
}

/**
 * Send Rejection / Payment Failed Email
 */
export async function sendRejectionEmail({ order, customer, reason }) {
  const recipient = customer?.email;
  if (!recipient) {
    console.warn('[Email] No customer email provided for rejection notice:', order?.orderId);
    return { success: false, reason: 'No recipient email' };
  }

  const logoPath = path.join(process.cwd(), 'public', 'assets', 'img', 'rgc-logo.webp');
  const hasLogo = fs.existsSync(logoPath);

  const customerName = customer?.name || 'Valued Client';
  const serviceName = order?.service || 'Strategic Business Consultancy';
  const failureReason = reason || 'Transaction could not be completed by your bank/UPI provider.';
  const fromAddress = process.env.SMTP_FROM || '"Reddington Global Consultancy Pvt Ltd" <sales@reddingtonglobal.com>';

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 24px; }
        .box { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
        .header { background: #0f172a; color: #ffffff; padding: 32px 36px; border-bottom: 3px solid #ef4444; }
        .brand { font-size: 19px; font-weight: 800; letter-spacing: 0.04em; color: #FDFDFD; }
        .brand span { color: #D49F2D; }
        .body { padding: 32px 36px; }
        .fail-badge { display: inline-block; background: #fef2f2; color: #b91c1c; font-weight: 700; font-size: 12px; padding: 4px 12px; border-radius: 999px; margin-bottom: 20px; }
        .reason-box { background: #f8fafc; border-left: 4px solid #ef4444; padding: 14px 18px; margin: 20px 0; border-radius: 0 6px 6px 0; }
        .retry-btn { display: inline-block; background: #D49F2D; color: #000000; font-weight: 700; text-decoration: none; padding: 12px 24px; border-radius: 999px; margin-top: 16px; }
        .footer { padding: 24px 36px; background: #f8fafc; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
      </style>
    </head>
    <body>
      <div class="box">
        <div class="header">
          ${hasLogo ? '<img src="cid:rgclogo" alt="Reddington Global Consultancy" style="max-height: 48px; width: auto; display: block; margin-bottom: 14px;" />' : ''}
          <div class="brand">REDDINGTON GLOBAL <span>CONSULTANCY PVT LTD</span></div>
          <div style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8; margin-top: 6px;">Payment Notice</div>
        </div>
        <div class="body">
          <div class="fail-badge">Payment Incomplete / Rejected</div>
          <h2 style="margin: 0 0 8px; font-size: 20px; color: #0f172a;">Hello ${customerName},</h2>
          <p style="margin: 0 0 16px; font-size: 14px; color: #64748b;">
            We noticed that your booking payment for <strong>${serviceName} (₹99)</strong> was not completed.
          </p>

          <div class="reason-box">
            <strong style="font-size: 13px; color: #0f172a;">Status Details:</strong>
            <p style="margin: 4px 0 0; font-size: 13px; color: #64748b;">${failureReason}</p>
          </div>

          <p style="font-size: 14px; color: #64748b;">
            If any amount was debited by your bank, it will be automatically refunded by Razorpay within 3–5 business days.
          </p>

          <p style="font-size: 14px; color: #64748b;">
            You can re-attempt your consultation booking at any time:
          </p>

          <a href="https://www.reddingtonglobal.com/#contact" class="retry-btn">Retry Booking at ₹99 &rarr;</a>

          <p style="font-size: 13px; color: #64748b; margin-top: 24px;">
            Need help? Reach out directly via WhatsApp at <a href="https://wa.me/919818224495" style="color: #D49F2D;">+91 98182 24495</a> or email us at <a href="mailto:sales@reddingtonglobal.com" style="color: #D49F2D;">sales@reddingtonglobal.com</a>.
          </p>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} Reddington Global Consultancy Pvt Ltd. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;

  const transporter = getTransporter();

  if (!transporter) {
    console.log(`[Rejection Email Simulation] To: ${recipient} | Reason: ${failureReason}`);
    return { success: true, simulated: true };
  }

  try {
    const bccAddress = process.env.SMTP_BCC || 'sales@reddingtonglobal.com';
    const attachments = hasLogo
      ? [{ filename: 'rgc-logo.webp', path: logoPath, cid: 'rgclogo' }]
      : [];

    const info = await transporter.sendMail({
      from: fromAddress,
      to: recipient,
      bcc: bccAddress,
      subject: `Payment Incomplete: Strategic Consultation Booking`,
      html,
      attachments,
    });
    console.log('[Rejection Email Sent]', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('[Rejection Email Error]', error);
    return { success: false, error: error.message };
  }
}
