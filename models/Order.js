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
    amount: {
      type: Number,
      required: true, // Amount in paise
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
