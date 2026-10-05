import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/mongodb';
import Order from '../../../models/Order';
import { sendRejectionEmail } from '../../../lib/email';

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const { order_id, reason, payment_id, customer } = body;

    if (!order_id) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    const db = await connectDB();
    let orderDoc = null;

    if (db) {
      try {
        orderDoc = await Order.findOneAndUpdate(
          { orderId: order_id },
          {
            status: 'failed',
            failedAt: new Date(),
            failureReason: reason || 'Payment cancelled or declined',
            paymentId: payment_id || undefined,
          },
          { new: true }
        );
      } catch (dbErr) {
        console.error('Error updating failed order in MongoDB:', dbErr);
      }
    }

    // Send rejection/incomplete payment notice email to the client
    const targetCustomer = orderDoc?.customer || customer;
    if (targetCustomer?.email) {
      try {
        await sendRejectionEmail({
          order: orderDoc || { orderId: order_id, service: 'Strategic Business Consultancy' },
          customer: targetCustomer,
          reason: reason || 'Transaction could not be completed by your payment provider.',
        });
      } catch (emailErr) {
        console.error('Failed to send rejection email:', emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Payment failure recorded and notification processed',
    });
  } catch (error) {
    console.error('Payment failure route error:', error);
    return NextResponse.json(
      { error: error.message || 'Error processing failure' },
      { status: 500 }
    );
  }
}
