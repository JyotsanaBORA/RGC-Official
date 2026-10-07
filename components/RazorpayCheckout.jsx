'use client';

import { useState } from 'react';
import { showPaymentLoader, hidePaymentLoader } from '../lib/payment';

/**
 * Helper to dynamically load the Razorpay checkout.js SDK
 */
function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

/**
 * Reusable Razorpay Checkout Component
 * 
 * Props:
 * - amount: Amount in INR rupees (e.g. 500 for ₹500)
 * - serviceName: Name of the service being booked
 * - customerDetails: { name, email, phone }
 * - onSuccess: Callback called with { payment_id, order_id }
 * - onFailure: Callback called with error message
 */
export default function RazorpayCheckout({
  amount = 500,
  serviceName = 'Consultation Retainer',
  customerDetails = { name: '', email: '', phone: '' },
  onSuccess,
  onFailure,
  buttonLabel = 'Proceed to Secure Payment',
  className = 'btn btn--gold',
}) {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const handlePayment = async () => {
    setLoading(true);
    setStatusMessage(null);

    try {
      // 1. Load Razorpay SDK
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        throw new Error('Razorpay SDK failed to load. Check your internet connection.');
      }

      // 2. Call backend order creation API (amount converted to paise)
      const amountInPaise = Math.round(Number(amount) * 100);
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: 'INR',
          receipt: `rcpt_${Date.now()}`,
          notes: {
            service: serviceName,
            customer_name: customerDetails.name || 'Client',
            customer_email: customerDetails.email || '',
          },
        }),
      });

      const orderData = await res.json();
      if (!res.ok) {
        throw new Error(orderData.error || 'Failed to create order on server');
      }

      // 3. Configure Razorpay modal options
      const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_Tjp51jgaiKG1Eb';
      const options = {
        key: keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Reddington Global',
        description: serviceName,
        image: '/assets/img/rgc-logo-opt.png',
        order_id: orderData.order_id,
        prefill: {
          name: customerDetails.name || '',
          email: customerDetails.email || '',
          contact: customerDetails.phone || '',
        },
        theme: {
          color: '#D49F2D', // Reddington 24K Bullion Gold
        },
        modal: {
          ondismiss: () => {
            hidePaymentLoader();
            setLoading(false);
            setStatusMessage({ type: 'warning', text: 'Payment cancelled by user. You can retry when ready.' });
          },
        },
        handler: async function (response) {
          showPaymentLoader('Verifying Payment...', 'Confirming transaction with bank and issuing your tax invoice. Please do not refresh.');
          try {
            // 4. Send payment signature to backend verification endpoint
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();
            if (!verifyRes.ok || !verifyData.success) {
              throw new Error(verifyData.error || 'Payment signature verification failed');
            }

            hidePaymentLoader();
            setLoading(false);
            setStatusMessage({
              type: 'success',
              text: `Payment verified! Reference ID: ${response.razorpay_payment_id}`,
            });

            if (onSuccess) {
              onSuccess({
                payment_id: response.razorpay_payment_id,
                order_id: response.razorpay_order_id,
                amount,
                serviceName,
              });
            }
          } catch (verifyErr) {
            hidePaymentLoader();
            setLoading(false);
            const errMsg = verifyErr.message || 'Verification error occurred';
            setStatusMessage({ type: 'error', text: errMsg });
            if (onFailure) onFailure(errMsg);
          }
        },
      };

      // 5. Open Razorpay Checkout modal
      const rzp = new window.Razorpay(options);

      rzp.on('payment.failed', function (failResponse) {
        hidePaymentLoader();
        setLoading(false);
        const failMsg = failResponse?.error?.description || 'Payment transaction failed. Please retry.';
        setStatusMessage({ type: 'error', text: failMsg });
        if (onFailure) onFailure(failMsg);
      });

      rzp.open();
    } catch (err) {
      setLoading(false);
      const errMsg = err.message || 'Something went wrong initiating payment';
      setStatusMessage({ type: 'error', text: errMsg });
      if (onFailure) onFailure(errMsg);
    }
  };

  return (
    <div className="rzp-checkout-widget">
      <button
        type="button"
        onClick={handlePayment}
        disabled={loading}
        className={className}
      >
        {loading ? 'Initiating Payment...' : buttonLabel}
      </button>

      {statusMessage && (
        <div
          style={{
            marginTop: '12px',
            padding: '10px 14px',
            borderRadius: '8px',
            fontSize: '13.5px',
            backgroundColor:
              statusMessage.type === 'success'
                ? 'rgba(16, 185, 129, 0.12)'
                : statusMessage.type === 'warning'
                ? 'rgba(245, 158, 11, 0.12)'
                : 'rgba(239, 68, 68, 0.12)',
            color:
              statusMessage.type === 'success'
                ? '#10B981'
                : statusMessage.type === 'warning'
                ? '#F59E0B'
                : '#EF4444',
            border: `1px solid ${
              statusMessage.type === 'success'
                ? 'rgba(16, 185, 129, 0.3)'
                : statusMessage.type === 'warning'
                ? 'rgba(245, 158, 11, 0.3)'
                : 'rgba(239, 68, 68, 0.3)'
            }`,
          }}
        >
          {statusMessage.text}
        </div>
      )}
    </div>
  );
}
