import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { connectDB } from '../../../lib/mongodb';
import Order from '../../../models/Order';
import { sendInvoiceEmail, sendRejectionEmail } from '../../../lib/email';
import { getISTTimestamp } from '../../../lib/date';

/**
 * Razorpay Webhook Handler
 * Supports:
 *  - payment.captured & order.paid: marks order paid, dispatches professional tax invoice email
 *  - payment.failed: marks order failed, dispatches professional payment failure/rejection email
 */
export async function POST(req) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');
    const webhookSecret =
      process.env.RAZORPAY_WEBHOOK_SECRET ||
      process.env.RAZORPAY_KEY_SECRET ||
      '75LPU9tRuBp8YZ1OJJrI0eAJ';

    // 1. Signature Verification
    if (signature) {
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(rawBody)
        .digest('hex');

      if (signature !== expectedSignature) {
        console.error('[Razorpay Webhook] Invalid signature mismatch');
        return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
      }
    } else {
      console.warn('[Razorpay Webhook] Missing x-razorpay-signature header');
    }

    const event = JSON.parse(rawBody || '{}');
    const eventType = event.event;
    console.log(`[Razorpay Webhook] Received event: ${eventType}`);

    const db = await connectDB();

    // ══════════════════════════════════════════════════════════
    // EVENT: Payment Captured / Order Paid (SUCCESS)
    // ══════════════════════════════════════════════════════════
    if (eventType === 'payment.captured' || eventType === 'order.paid') {
      const paymentEntity = event.payload?.payment?.entity || {};
      const orderEntity = event.payload?.order?.entity || {};

      const orderId = paymentEntity.order_id || orderEntity.id;
      const paymentId = paymentEntity.id;
      const payerEmail = paymentEntity.email || '';
      const payerContact = paymentEntity.contact || '';
      const notes = paymentEntity.notes || orderEntity.notes || {};
      const now = new Date();

      if (!orderId) {
        console.warn('[Razorpay Webhook] payment.captured missing order_id');
        return NextResponse.json({ status: 'ok', warning: 'Missing order_id' });
      }

      let orderDoc = null;
      if (db) {
        orderDoc = await Order.findOne({ orderId });

        // If invoice already dispatched (e.g. from verify-payment callback), don't send duplicate
        if (orderDoc && orderDoc.status === 'paid' && orderDoc.invoiceSent) {
          console.log(`[Razorpay Webhook] Order ${orderId} already paid and invoice sent. Skipping duplicate.`);
          return NextResponse.json({ status: 'ok', message: 'Invoice already sent' });
        }

        const customerName = notes.customer_name || orderDoc?.customerName || orderDoc?.customer?.name || 'Valued Client';
        const customerEmail = payerEmail || notes.customer_email || orderDoc?.email || orderDoc?.customer?.email || '';
        const customerPhone = payerContact || notes.customer_phone || orderDoc?.customerPhone || '';

        orderDoc = await Order.findOneAndUpdate(
          { orderId },
          {
            $set: {
              status: 'paid',
              paymentId,
              paidAt: now,
              paidAtIST: getISTTimestamp(now),
              invoiceSent: true,
              invoiceSentAt: now,
              ...(customerEmail ? { email: customerEmail, customerEmail } : {}),
              ...(customerName ? { customerName } : {}),
              ...(customerPhone ? { customerPhone } : {}),
            },
          },
          { new: true }
        );
      }

      // Send Professional Invoice Email
      const targetCustomer = {
        name: orderDoc?.customerName || orderDoc?.customer?.name || notes.customer_name || 'Valued Client',
        email: orderDoc?.email || orderDoc?.customerEmail || orderDoc?.customer?.email || payerEmail,
        phone: orderDoc?.customerPhone || payerContact,
      };

      if (targetCustomer.email) {
        try {
          const emailRes = await sendInvoiceEmail({
            order: orderDoc || {
              orderId,
              service: notes.service || 'Strategic Business Consultancy',
              amount: paymentEntity.amount || 9900,
            },
            customer: targetCustomer,
            paymentId,
          });
          console.log(`[Razorpay Webhook] Invoice email sent to ${targetCustomer.email}:`, emailRes.success);
        } catch (emailErr) {
          console.error('[Razorpay Webhook] Error sending invoice email:', emailErr);
        }
      } else {
        console.warn(`[Razorpay Webhook] No email found for order ${orderId} to dispatch invoice.`);
      }

      return NextResponse.json({ status: 'ok', event: eventType, orderId });
    }

    // ══════════════════════════════════════════════════════════
    // EVENT: Payment Failed (REJECTION)
    // ══════════════════════════════════════════════════════════
    if (eventType === 'payment.failed') {
      const paymentEntity = event.payload?.payment?.entity || {};
      const orderId = paymentEntity.order_id;
      const paymentId = paymentEntity.id;
      const payerEmail = paymentEntity.email || '';
      const notes = paymentEntity.notes || {};
      const failureReason =
        paymentEntity.error_description ||
        paymentEntity.error_reason ||
        'Transaction declined by bank or UPI provider.';
      const now = new Date();

      let orderDoc = null;
      if (db && orderId) {
        orderDoc = await Order.findOne({ orderId });

        if (orderDoc && orderDoc.rejectionSent) {
          console.log(`[Razorpay Webhook] Rejection email already sent for order ${orderId}. Skipping duplicate.`);
          return NextResponse.json({ status: 'ok', message: 'Rejection notice already sent' });
        }

        orderDoc = await Order.findOneAndUpdate(
          { orderId },
          {
            $set: {
              status: 'failed',
              failedAt: now,
              failedAtIST: getISTTimestamp(now),
              failureReason,
              paymentId,
              rejectionSent: true,
            },
          },
          { new: true }
        );
      }

      // Send Professional Rejection / Retry Email
      const targetCustomer = {
        name: orderDoc?.customerName || orderDoc?.customer?.name || notes.customer_name || 'Valued Client',
        email: orderDoc?.email || orderDoc?.customerEmail || orderDoc?.customer?.email || payerEmail,
      };

      if (targetCustomer.email) {
        try {
          const emailRes = await sendRejectionEmail({
            order: orderDoc || {
              orderId,
              service: notes.service || 'Strategic Business Consultancy',
            },
            customer: targetCustomer,
            reason: failureReason,
          });
          console.log(`[Razorpay Webhook] Rejection notice email sent to ${targetCustomer.email}:`, emailRes.success);
        } catch (emailErr) {
          console.error('[Razorpay Webhook] Error sending rejection email:', emailErr);
        }
      }

      return NextResponse.json({ status: 'ok', event: eventType, orderId });
    }

    // Default response for other webhook events
    return NextResponse.json({ status: 'ok', event: eventType });
  } catch (error) {
    console.error('[Razorpay Webhook Error]:', error);
    return NextResponse.json({ error: error.message || 'Webhook processing failed' }, { status: 500 });
  }
}
