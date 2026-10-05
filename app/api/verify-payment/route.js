import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { connectDB } from '../../../lib/mongodb';
import Order from '../../../models/Order';
import { sendInvoiceEmail, sendRejectionEmail } from '../../../lib/email';
import { getISTTimestamp } from '../../../lib/date';

export async function POST(req) {
  try {
    const keySecret = process.env.RAZORPAY_KEY_SECRET || '75LPU9tRuBp8YZ1OJJrI0eAJ';

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json().catch(() => ({}));

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: 'Missing required payment verification parameters' },
        { status: 400 }
      );
    }

    // 1. Verify HMAC-SHA256 signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(body)
      .digest('hex');

    const isMatch =
      expectedSignature.length === razorpay_signature.length &&
      crypto.timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(razorpay_signature));

    const db = await connectDB();

    if (!isMatch) {
      // Mark as failed in DB if connected
      let failedDoc = null;
      if (db) {
        try {
          const now = new Date();
          failedDoc = await Order.findOneAndUpdate(
            { orderId: razorpay_order_id },
            {
              status: 'failed',
              failedAt: now,
              failedAtIST: getISTTimestamp(now),
              failureReason: 'Signature mismatch',
            },
            { new: true }
          );
        } catch (dbErr) {
          console.error('Failed to update failed order status in DB:', dbErr);
        }
      }

      if (failedDoc?.customer?.email || failedDoc?.email) {
        try {
          await sendRejectionEmail({
            order: failedDoc,
            customer: failedDoc.customer || { email: failedDoc.email, name: failedDoc.customerName },
            reason: 'Payment signature verification failed.',
          });
        } catch (emailErr) {
          console.error('Error sending rejection email:', emailErr);
        }
      }

      return NextResponse.json(
        { success: false, error: 'Invalid payment signature. Verification failed.' },
        { status: 400 }
      );
    }

    // 2. Signature is valid — update DB to 'paid' (Idempotent update)
    let orderDoc = null;
    if (db) {
      try {
        const now = new Date();
        orderDoc = await Order.findOneAndUpdate(
          { orderId: razorpay_order_id },
          {
            status: 'paid',
            paymentId: razorpay_payment_id,
            signature: razorpay_signature,
            paidAt: now,
            paidAtIST: getISTTimestamp(now),
          },
          { new: true }
        );
      } catch (dbErr) {
        console.error('Failed to update paid order status in DB:', dbErr);
      }
    }

    // 3. Dispatch Tax Invoice Email with consultation booking details (if not already sent by webhook)
    let emailResult = null;
    const recipientEmail = orderDoc?.email || orderDoc?.customerEmail || orderDoc?.customer?.email;
    if (recipientEmail && !orderDoc?.invoiceSent) {
      try {
        emailResult = await sendInvoiceEmail({
          order: orderDoc,
          customer: orderDoc.customer || { email: recipientEmail, name: orderDoc.customerName },
          paymentId: razorpay_payment_id,
        });
        if (emailResult?.success && db) {
          await Order.updateOne(
            { orderId: razorpay_order_id },
            { $set: { invoiceSent: true, invoiceSentAt: new Date() } }
          );
        }
      } catch (emailErr) {
        console.error('Error sending invoice email:', emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully and invoice dispatched',
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
      invoice_sent: emailResult?.success || false,
      order: orderDoc || undefined,
    });
  } catch (error) {
    console.error('Razorpay Verify Payment Error:', error);
    return NextResponse.json(
      { error: error.message || 'Payment verification failed' },
      { status: 500 }
    );
  }
}
