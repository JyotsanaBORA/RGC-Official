/**
 * Plain-language meaning of every lead status, shared by the admin panel and the Excel/CSV exports.
 */

// Payment stage of the ₹99 consultation (Order.status)
export const PAYMENT_STATUS = {
  paid: {
    label: 'Paid',
    icon: '✓',
    meaning: '₹99 payment succeeded. Confirmed booking; GST invoice emailed automatically.',
    action: 'Call within 24 hours. Top priority.',
  },
  failed: {
    label: 'Payment Failed',
    icon: '✕',
    meaning: 'Tried to pay but it did not go through (declined, cancelled or not verified). Reason shown below the badge.',
    action: 'Call and help them pay again. Any debited amount is auto-refunded by Razorpay.',
  },
  created: {
    label: 'Payment Started',
    icon: '⏳',
    meaning: 'Clicked "Pay ₹99" and opened the payment window, but no result came back.',
    action: 'Usually closed the payment window. Follow up if it stays like this.',
  },
  abandoned: {
    label: 'Left in Form',
    icon: '📝',
    meaning: 'Typed their phone or email in the booking form but never clicked Pay.',
    action: 'Warm lead. Call or WhatsApp to complete the booking.',
  },
  refunded: {
    label: 'Refunded',
    icon: '↩',
    meaning: 'Payment was refunded. Only set manually; Razorpay refunds are not synced.',
    action: 'No action needed.',
  },
};

// Follow-up call stage, set from the admin panel (Order.callStatus)
export const CALL_STATUS = {
  pending: {
    label: 'Needs Call',
    icon: '📞',
    meaning: 'Not called yet. Every new lead starts here.',
  },
  called: {
    label: 'Called / Briefed',
    icon: '✅',
    meaning: 'Consultation call done.',
  },
  follow_up: {
    label: 'Follow-Up Needed',
    icon: '🔁',
    meaning: 'Spoke to them; another call is needed (deciding, sending details).',
  },
  no_answer: {
    label: 'No Answer / Retry',
    icon: '📵',
    meaning: 'Called but they did not pick up. Try again.',
  },
  closed: {
    label: 'Completed / Closed',
    icon: '🔒',
    meaning: 'Finished: became a client or not interested. Note the outcome in Call Notes.',
  },
};

export const paymentStatusInfo = (status) =>
  PAYMENT_STATUS[status] || { label: status || 'Unknown', icon: '•', meaning: '', action: '' };

export const callStatusInfo = (status) => CALL_STATUS[status] || CALL_STATUS.pending;
