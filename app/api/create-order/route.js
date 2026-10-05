import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { connectDB } from '../../../lib/mongodb';
import Order from '../../../models/Order';

export async function POST(req) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID || 'rzp_test_Tjp51jgaiKG1Eb';
    const keySecret = process.env.RAZORPAY_KEY_SECRET || '75LPU9tRuBp8YZ1OJJrI0eAJ';

    const body = await req.json().catch(() => ({}));
    const amount = Number(body.amount);
    const currency = body.currency || 'INR';
    const receipt = body.receipt || `rcpt_${Date.now()}`;
    const idempotencyKey = body.idempotency_key || req.headers.get('x-idempotency-key') || null;

    if (!amount || isNaN(amount) || amount < 100) {
      return NextResponse.json(
        { error: 'Amount is required and must be at least 100 paise (1 INR)' },
        { status: 400 }
      );
    }

    // 1. Idempotency Check in MongoDB (if connected)
    const db = await connectDB();
    if (db && idempotencyKey) {
      const existingOrder = await Order.findOne({ idempotencyKey });
      if (existingOrder) {
        return NextResponse.json({
          order_id: existingOrder.orderId,
          amount: existingOrder.amount,
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

    // 3. Persist Order in MongoDB (if connected)
    if (db) {
      try {
        await Order.create({
          orderId: order.id,
          idempotencyKey: idempotencyKey || undefined,
          amount: order.amount,
          currency: order.currency,
          receipt,
          service: body.notes?.service || body.service || 'Strategic Business Consultancy',
          customer: {
            name: body.notes?.customer_name || body.customer?.name || '',
            email: body.notes?.customer_email || body.customer?.email || '',
            phone: body.notes?.customer_phone || body.customer?.phone || '',
            company: body.notes?.company || body.customer?.company || '',
          },
          notes: body.notes || {},
          status: 'created',
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
