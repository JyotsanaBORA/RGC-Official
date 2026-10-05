import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { connectDB } from '../../../lib/mongodb';
import Order from '../../../models/Order';

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
      if (db) {
        try {
          await Order.findOneAndUpdate(
            { orderId: razorpay_order_id },
            { status: 'failed', failedAt: new Date() }
          );
        } catch (dbErr) {
          console.error('Failed to update failed order status in DB:', dbErr);
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
        orderDoc = await Order.findOneAndUpdate(
          { orderId: razorpay_order_id },
          {
            status: 'paid',
            paymentId: razorpay_payment_id,
            signature: razorpay_signature,
            paidAt: new Date(),
          },
          { new: true }
        );
      } catch (dbErr) {
        console.error('Failed to update paid order status in DB:', dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
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
