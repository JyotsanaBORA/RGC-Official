/**
 * Dynamically loads the Razorpay checkout script if not already present.
 */
export function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

/**
 * Standard checkout trigger for consultation at ₹99
 */
export async function startConsultationPayment({
  customer,
  serviceName = 'Strategic Business Consultancy',
  amount = 99,
  onSuccess,
  onFailure,
  onCancel,
}) {
  const isLoaded = await loadRazorpayScript();
  if (!isLoaded) {
    throw new Error('Payment gateway SDK failed to load. Please check your internet connection.');
  }

  // 1. Create order on server (stored in MongoDB RGC-Official database)
  const amountInPaise = Math.round(Number(amount) * 100);
  const res = await fetch('/api/create-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount: amountInPaise,
      currency: 'INR',
      service: serviceName,
      customer: {
        name: customer.name || '',
        email: customer.email || '',
        phone: customer.phone || '',
        company: customer.company || '',
      },
      notes: {
        customer_name: customer.name || '',
        customer_email: customer.email || '',
        customer_phone: customer.phone || '',
        company: customer.company || '',
        message: customer.message || customer.requirement || '',
        service: serviceName,
      },
    }),
  });

  const orderData = await res.json();
  if (!res.ok || !orderData.order_id) {
    throw new Error(orderData.error || 'Failed to initialize booking order');
  }

  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_Tjp51jgaiKG1Eb';

  return new Promise((resolve, reject) => {
    const options = {
      key: keyId,
      amount: orderData.amount,
      currency: orderData.currency || 'INR',
      name: 'Reddington Global',
      description: `${serviceName} (₹${amount})`,
      image: '/assets/img/rgc-logo-opt.png',
      order_id: orderData.order_id,
      prefill: {
        name: customer.name || '',
        email: customer.email || '',
        contact: customer.phone || '',
      },
      theme: {
        color: '#D49F2D',
      },
      modal: {
        ondismiss: async () => {
          try {
            await fetch('/api/payment-failed', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                order_id: orderData.order_id,
                reason: 'Booking window closed before completing payment.',
                customer,
              }),
            });
          } catch (_) {}
          if (onCancel) onCancel();
          resolve({ status: 'cancelled', orderId: orderData.order_id });
        },
      },
      handler: async function (response) {
        try {
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
            throw new Error(verifyData.error || 'Signature verification failed');
          }

          if (onSuccess) {
            onSuccess({
              orderId: orderData.order_id,
              paymentId: response.razorpay_payment_id,
              verifyData,
            });
          }
          resolve({
            status: 'success',
            orderId: orderData.order_id,
            paymentId: response.razorpay_payment_id,
          });
        } catch (verifyErr) {
          if (onFailure) onFailure(verifyErr.message);
          reject(verifyErr);
        }
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on('payment.failed', async function (failResponse) {
      const reason = failResponse?.error?.description || 'Payment rejected by bank / UPI provider';
      try {
        await fetch('/api/payment-failed', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            order_id: orderData.order_id,
            reason,
            payment_id: failResponse?.error?.metadata?.payment_id,
            customer,
          }),
        });
      } catch (_) {}
      if (onFailure) onFailure(reason);
      reject(new Error(reason));
    });

    rzp.open();
  });
}
