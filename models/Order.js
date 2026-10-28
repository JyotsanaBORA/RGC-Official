import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    idempotencyKey: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
    },
    // Primary customer contact at top-level of schema
    email: {
      type: String,
      default: '',
      index: true,
    },
    customerName: {
      type: String,
      default: '',
    },
    customerEmail: {
      type: String,
      default: '',
      index: true,
    },
    customerPhone: {
      type: String,
      default: '',
    },
    customerCompany: {
      type: String,
      default: '',
    },
    // GST Number (Optional corporate tax identifier)
    customerGst: {
      type: String,
      default: '',
      index: true,
    },
    gstNumber: {
      type: String,
      default: '',
    },

    // Selected Service Package / Tier
    selectedPackage: {
      type: String,
      default: '',
    },
    packageId: {
      type: String,
      default: '',
    },
    packagePrice: {
      type: Number,
      default: 0,
    },
    // Plan the client showed interest in before the consultation (e.g. "Web Development — Standard")
    interestedPlan: {
      type: String,
      default: '',
    },

    // Amount representation
    amount: {
      type: Number,
      required: true, // Amount in paise (Razorpay standard, e.g. 9900)
    },
    amountInRupees: {
      type: Number,
      default: 99, // Amount in Rupees (e.g. 99)
    },
    currency: {
      type: String,
      default: 'INR',
    },
    status: {
      type: String,
      enum: ['abandoned', 'created', 'paid', 'failed', 'refunded'],
      default: 'created',
      index: true,
    },
    receipt: {
      type: String,
    },
    service: {
      type: String,
    },

    // Nested customer details (preserved for backward compatibility)
    customer: {
      name: { type: String, default: '' },
      email: { type: String, default: '' },
      phone: { type: String, default: '' },
      company: { type: String, default: '' },
      gstNumber: { type: String, default: '' },
    },
    paymentId: {
      type: String,
      sparse: true,
      index: true,
    },
    signature: {
      type: String,
    },
    failureReason: {
      type: String,
    },
    notes: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    // Marketing & Ad Campaign Attribution (Meta Ads, Google, UTMs)
    attribution: {
      source: { type: String, default: 'direct', index: true },
      medium: { type: String, default: 'none' },
      campaign: { type: String, default: 'none', index: true },
      content: { type: String, default: '' },
      term: { type: String, default: '' },
      fbclid: { type: String, default: '' },
      gclid: { type: String, default: '' },
      landingPage: { type: String, default: '' },
      referrer: { type: String, default: '' },
    },

    // Call Tracking / CRM Status
    callStatus: {
      type: String,
      enum: ['pending', 'called', 'follow_up', 'no_answer', 'wrong_number', 'not_interested', 'closed'],
      default: 'pending',
      index: true,
    },
    callNotes: {
      type: String,
      default: '',
    },
    calledAt: {
      type: Date,
    },

    // Human-readable IST (Indian Standard Time) timestamps
    createdAtIST: {
      type: String,
    },
    paidAtIST: {
      type: String,
    },
    failedAtIST: {
      type: String,
    },

    // Email dispatch tracking (prevents duplicate sends between webhook and client callback)
    invoiceSent: {
      type: Boolean,
      default: false,
    },
    invoiceSentAt: {
      type: Date,
    },
    rejectionSent: {
      type: Boolean,
      default: false,
    },

    paidAt: {
      type: Date,
    },
    failedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
