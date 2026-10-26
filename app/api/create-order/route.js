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
    // Support package price or requested amount (default to 499900 paise for ₹4,999 website booking)
    let amount = 499900;
    if (body.amount && Number(body.amount) > 0) {
      amount = Number(body.amount);
    } else if (body.notes?.package_price && Number(body.notes?.package_price) > 0) {
      amount = Number(body.notes.package_price) * 100;
    } else if (body.packagePrice && Number(body.packagePrice) > 0) {
      amount = Number(body.packagePrice) * 100;
    }
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
    const customerGst = (body.notes?.gst_number || body.customer?.gstNumber || body.customer?.customerGst || '').toUpperCase().trim();
    const selectedPackage = body.notes?.selected_package || body.selectedPackage || body.package?.name || '';
    const packageId = body.notes?.package_id || body.packageId || body.package?.id || '';
    const packagePrice = Number(body.notes?.package_price || body.packagePrice || body.package?.price || 0);
    const amountInRupees = Math.round(Number(order.amount) / 100);

    const attr = body.attribution || {};
    const attributionData = {
      source: attr.source || body.notes?.utm_source || 'direct',
      medium: attr.medium || body.notes?.utm_medium || 'none',
      campaign: attr.campaign || body.notes?.utm_campaign || 'none',
      content: attr.content || body.notes?.utm_content || '',
      term: attr.term || body.notes?.utm_term || '',
      fbclid: attr.fbclid || body.notes?.fbclid || '',
      gclid: attr.gclid || body.notes?.gclid || '',
      landingPage: attr.landingPage || body.notes?.landing_page || '/',
      referrer: attr.referrer || '',
    };

    // 3. Persist Order in MongoDB (if connected)
    if (db) {
      try {
        const orderData = {
          orderId: order.id,
          idempotencyKey: idempotencyKey || undefined,
          email: customerEmail,
          customerName,
          customerEmail,
          customerPhone,
          customerCompany,
          customerGst,
          gstNumber: customerGst,
          selectedPackage,
          packageId,
          packagePrice,
          amount: order.amount,
          amountInRupees,
          currency: order.currency,
          receipt,
          service: body.notes?.service || body.service || 'Website Development Service',
          customer: {
            name: customerName,
            email: customerEmail,
            phone: customerPhone,
            company: customerCompany,
            gstNumber: customerGst,
          },
          notes: {
            ...(body.notes || {}),
            gst_number: customerGst,
            selected_package: selectedPackage,
          },
          attribution: attributionData,
          status: 'created',
          createdAtIST: getISTTimestamp(),
        };

        const leadId = body.leadId || body.customer?.leadId || body.notes?.lead_id;
        if (leadId) {
          const updated = await Order.findOneAndUpdate(
            { orderId: leadId },
            { $set: orderData, $unset: { failureReason: 1 } },
            { new: true }
          );
          if (!updated) {
            await Order.create(orderData);
          }
        } else {
          await Order.create(orderData);
        }
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
