import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { connectDB } from '../../../lib/mongodb';
import Order from '../../../models/Order';
import { getISTTimestamp } from '../../../lib/date';

export async function POST(req) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID || 'rzp_test_Tjp51jgaiKG1Eb';
    const keySecret = process.env.RAZORPAY_KEY_SECRET || '75LPU9tRuBp8YZ1OJJrI0eAJ';

    const body = await req.json().catch(() => ({}));
    // Authoritative server-side price: ₹99 (9900 paise) prevents client-side price tampering
    const amount = 9900;
    const currency = body.currency || 'INR';
    const receipt = body.receipt || `rcpt_${Date.now()}`;
    const idempotencyKey = body.idempotency_key || req.headers.get('x-idempotency-key') || null;

    // 1. Idempotency Check in MongoDB (if connected)
    const db = await connectDB();
    if (db && idempotencyKey) {
      const existingOrder = await Order.findOne({ idempotencyKey });
      if (existingOrder) {
        return NextResponse.json({
          order_id: existingOrder.orderId,
          amount: existingOrder.amount,
          amount_in_rupees: existingOrder.amountInRupees || Math.round(existingOrder.amount / 100),
          currency: existingOrder.currency,
          idempotent_replay: true,
        });
      }
    }

    // 2. Create Order via Razorpay API
    const instance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const order = await instance.orders.create({
      amount: Math.round(amount),
      currency,
      receipt,
      notes: body.notes || {},
    });

    const customerName = body.notes?.customer_name || body.customer?.name || '';
    const customerEmail = body.notes?.customer_email || body.customer?.email || '';
    const customerPhone = body.notes?.customer_phone || body.customer?.phone || '';
    const customerCompany = body.notes?.company || body.customer?.company || '';
    const amountInRupees = Math.round(Number(order.amount) / 100);

    // 3. Persist Order in MongoDB (if connected)
    if (db) {
      try {
        await Order.create({
          orderId: order.id,
          idempotencyKey: idempotencyKey || undefined,
          email: customerEmail,
          customerName,
          customerEmail,
          customerPhone,
          customerCompany,
          amount: order.amount,
          amountInRupees,
          currency: order.currency,
          receipt,
          service: body.notes?.service || body.service || 'Strategic Business Consultancy',
          customer: {
            name: customerName,
            email: customerEmail,
            phone: customerPhone,
            company: customerCompany,
          },
          notes: body.notes || {},
          status: 'created',
          createdAtIST: getISTTimestamp(),
        });
      } catch (dbErr) {
        console.error('Failed to save order to MongoDB:', dbErr);
        // Do not fail the client if DB write fails; order is already created on Razorpay
      }
    }

    return NextResponse.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error('Razorpay Create Order Error:', error);
    return NextResponse.json(
      { error: error?.error?.description || error.message || 'Failed to create Razorpay order' },
      { status: 500 }
    );
  }
}
