import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/mongodb';
import Order from '../../../models/Order';
import { getISTTimestamp } from '../../../lib/date';

/**
 * POST /api/lead-draft
 * Captures in-progress form leads when users enter contact details (email or phone).
 * If the user later completes payment, this draft is promoted to a live order.
 * If the user abandons the form, this lead remains available in the Admin Panel for CRM outreach.
 */
export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const customerPhone = (body.phone || body.customerPhone || '').trim();
    const customerEmail = (body.email || body.customerEmail || '').trim();
    const customerName = (body.name || body.customerName || '').trim();
    const customerCompany = (body.company || body.customerCompany || '').trim();
    const customerGst = (body.gstNumber || body.customerGst || '').toUpperCase().trim();
    const service = body.service || 'Strategic Business Consultancy';
    const selectedPackage = body.selectedPackage || body.package || 'Consultation';
    const packageId = body.packageId || '';
    const packagePrice = Number(body.packagePrice || 99);
    const interestedPlan = String(body.interestedPlan || body.notes?.interested_plan || '').slice(0, 120);
    const amountInPaise = Number(body.amount || packagePrice * 100);
    const amountInRupees = Math.round(amountInPaise / 100);

    // Require at least a valid contact identifier (phone or email)
    if (!customerPhone && !customerEmail) {
      return NextResponse.json(
        { error: 'Contact phone or email is required to capture lead draft.' },
        { status: 400 }
      );
    }

    const db = await connectDB();
    if (!db) {
      return NextResponse.json({ error: 'Database connection unavailable' }, { status: 503 });
    }

    // Capture traffic source & marketing attribution
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

    let leadId = body.leadId;
    let existingLead = null;

    if (leadId) {
      existingLead = await Order.findOne({ orderId: leadId });
    }

    const now = new Date();
    const updatePayload = {
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
      interestedPlan,
      amount: amountInPaise,
      amountInRupees,
      currency: 'INR',
      service,
      customer: {
        name: customerName,
        email: customerEmail,
        phone: customerPhone,
        company: customerCompany,
        gstNumber: customerGst,
      },
      notes: {
        ...(body.notes || {}),
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        company: customerCompany,
        gst_number: customerGst,
        selected_package: selectedPackage,
        interested_plan: interestedPlan,
        lead_stage: 'abandoned_in_form',
      },
      attribution: attributionData,
      status: 'abandoned',
      failureReason: 'Left in form before initiating payment',
    };

    if (existingLead && existingLead.status === 'abandoned') {
      await Order.updateOne({ _id: existingLead._id }, { $set: updatePayload });
      return NextResponse.json({
        success: true,
        leadId: existingLead.orderId,
        message: 'Draft lead updated',
      });
    }

    // Generate unique ID for this abandoned lead session
    leadId = leadId || `lead_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

    await Order.create({
      ...updatePayload,
      orderId: leadId,
      createdAtIST: getISTTimestamp(now),
    });

    return NextResponse.json({
      success: true,
      leadId,
      message: 'Draft lead captured successfully',
    });
  } catch (error) {
    console.error('[Lead Draft API] Error saving draft lead:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to save lead draft' },
      { status: 500 }
    );
  }
}
