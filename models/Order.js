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
      enum: ['created', 'paid', 'failed', 'refunded'],
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
