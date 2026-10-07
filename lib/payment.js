/**
 * Display full-screen branded verification loader after payment is submitted
 */
let loaderSafetyTimeout = null;

export function showPaymentLoader(
  title = 'Verifying Payment...',
  subtitle = 'Confirming transaction with your bank and generating your tax invoice. Please do not refresh or close this page.'
) {
  if (typeof document === 'undefined') return;
  hidePaymentLoader();

  const overlay = document.createElement('div');
  overlay.id = 'rgc-payment-loader';
  overlay.style.cssText = [
    'position: fixed',
    'top: 0',
    'left: 0',
    'right: 0',
    'bottom: 0',
    'width: 100vw',
    'height: 100vh',
    'background: rgba(15, 23, 42, 0.85)',
    'backdrop-filter: blur(8px)',
    '-webkit-backdrop-filter: blur(8px)',
    'display: flex',
    'align-items: center',
    'justify-content: center',
    'z-index: 9999999',
    'padding: 20px',
    'box-sizing: border-box',
    'animation: rgcFadeIn 0.25s ease-out',
  ].join(';');

  overlay.innerHTML = `
    <div style="
      background: #FFFFFF;
      max-width: 440px;
      width: 100%;
      border-radius: 16px;
      padding: 38px 28px;
      text-align: center;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(226, 232, 240, 0.8);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    ">
      <img src="https://www.reddingtonglobal.com/assets/img/rgc-logo.webp" alt="Reddington Global" style="max-height: 42px; width: auto; margin: 0 auto 20px; display: block;" />
      
      <div style="position: relative; width: 56px; height: 56px; margin: 0 auto 20px;">
        <div style="
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: 4px solid #F1F5F9;
          border-top-color: #D49F2D;
          border-right-color: #D49F2D;
          animation: rgcSpin 0.9s cubic-bezier(0.6, 0.2, 0.4, 0.8) infinite;
          box-sizing: border-box;
        "></div>
      </div>

      <h3 style="margin: 0 0 8px; font-size: 19px; font-weight: 800; color: #0F172A; letter-spacing: -0.01em;">
        ${title}
      </h3>
      <p style="margin: 0 0 22px; font-size: 13.5px; line-height: 1.55; color: #64748B;">
        ${subtitle}
      </p>

      <div style="
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: #F8FAFC;
        border: 1px solid #E2E8F0;
        padding: 6px 14px;
        border-radius: 999px;
        font-size: 12px;
        color: #475569;
        font-weight: 600;
      ">
        <span style="display: inline-block; width: 8px; height: 8px; background: #059669; border-radius: 50%; animation: rgcPulse 1.5s infinite;"></span>
        Bank Gateway Verification in Progress
      </div>
    </div>
    <style>
      @keyframes rgcSpin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes rgcFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes rgcPulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.4; transform: scale(0.85); }
      }
    </style>
  `;

  document.body.appendChild(overlay);

  // Safety fallback timeout to prevent hanging forever
  loaderSafetyTimeout = setTimeout(() => {
    hidePaymentLoader();
  }, 45000);
}

export function hidePaymentLoader() {
  if (typeof document === 'undefined') return;
  if (loaderSafetyTimeout) {
    clearTimeout(loaderSafetyTimeout);
    loaderSafetyTimeout = null;
  }
  const existing = document.getElementById('rgc-payment-loader');
  if (existing) {
    existing.remove();
  }
}

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
          hidePaymentLoader();
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
        // Show prominent branded verification loader while backend processes signature & invoice
        showPaymentLoader(
          'Verifying Payment...',
          'Confirming transaction with bank and issuing your official tax invoice. Please do not refresh or close this window.'
        );

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

          hidePaymentLoader();

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
          hidePaymentLoader();
          if (onFailure) onFailure(verifyErr.message);
          reject(verifyErr);
        }
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on('payment.failed', async function (failResponse) {
      hidePaymentLoader();
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
