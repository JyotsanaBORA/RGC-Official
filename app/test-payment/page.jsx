'use client';

import { useState } from 'react';
import SiteNav from '../../components/SiteNav';
import SiteFooter from '../../components/SiteFooter';
import RazorpayCheckout from '../../components/RazorpayCheckout';

export default function TestPaymentPage() {
  const [amount, setAmount] = useState(500);
  const [service, setService] = useState('BPO Consultation Retainer');
  const [paymentResult, setPaymentResult] = useState(null);

  return (
    <>
      <SiteNav />

      <main style={{ minHeight: '80vh', padding: '120px 20px 80px', background: '#080402', color: '#F8EEE8' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span style={{
              display: 'inline-block',
              padding: '4px 12px',
              borderRadius: '999px',
              background: 'rgba(212, 159, 45, 0.15)',
              color: '#F6D97E',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '12px'
            }}>
              Sandbox Environment
            </span>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px', color: '#FFFFFF' }}>
              Razorpay Payment Sandbox
            </h1>
            <p style={{ color: 'rgba(248, 238, 232, 0.7)', fontSize: '14.5px' }}>
              Test order generation, standard modal checkout, and HMAC-SHA256 signature verification.
            </p>
          </div>

          {/* Test Credentials Helper Card */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(212, 159, 45, 0.3)',
            borderRadius: '14px',
            padding: '20px',
            marginBottom: '28px'
          }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#D49F2D', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>
              📋 Available Test Credentials
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '13.5px' }}>
              <div style={{ background: 'rgba(0, 0, 0, 0.35)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <strong style={{ color: '#F6D97E', display: 'block', marginBottom: '4px' }}>💳 Test Card</strong>
                <div style={{ fontFamily: 'monospace', letterSpacing: '0.05em' }}>4100 2800 0000 1007</div>
                <div style={{ color: 'rgba(248, 238, 232, 0.6)', marginTop: '4px' }}>CVV: 123 · Exp: 12/26</div>
              </div>

              <div style={{ background: 'rgba(0, 0, 0, 0.35)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <strong style={{ color: '#F6D97E', display: 'block', marginBottom: '4px' }}>⚡ Test UPI / QR</strong>
                <div style={{ fontFamily: 'monospace' }}>test@razorpay</div>
                <div style={{ color: 'rgba(248, 238, 232, 0.6)', marginTop: '4px' }}>Auto-approves in sandbox</div>
              </div>
            </div>
          </div>

          {/* Checkout Test Box */}
          <div style={{
            background: '#140C07',
            border: '1.5px solid rgba(212, 159, 45, 0.4)',
            borderRadius: '16px',
            padding: '28px',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)'
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '20px', color: '#F8EEE8' }}>
              Simulate Service Order
            </h2>

            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'rgba(248, 238, 232, 0.8)', marginBottom: '6px' }}>
                Service Name
              </label>
              <input
                type="text"
                value={service}
                onChange={(e) => setService(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  background: 'rgba(255, 255, 255, 0.06)',
                  color: '#FFFFFF',
                  fontSize: '14.5px'
                }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'rgba(248, 238, 232, 0.8)', marginBottom: '6px' }}>
                Amount (INR Rupees)
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="number"
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    background: 'rgba(255, 255, 255, 0.06)',
                    color: '#FFFFFF',
                    fontSize: '16px',
                    fontWeight: 700
                  }}
                />
                <button
                  type="button"
                  onClick={() => setAmount(500)}
                  className="btn btn--sm"
                  style={{ background: 'rgba(255, 255, 255, 0.08)', color: '#F8EEE8' }}
                >
                  ₹500
                </button>
                <button
                  type="button"
                  onClick={() => setAmount(2500)}
                  className="btn btn--sm"
                  style={{ background: 'rgba(255, 255, 255, 0.08)', color: '#F8EEE8' }}
                >
                  ₹2,500
                </button>
              </div>
              <span style={{ display: 'block', fontSize: '12px', color: 'rgba(248, 238, 232, 0.5)', marginTop: '4px' }}>
                Sent to Razorpay as: <strong>{amount * 100} paise</strong>
              </span>
            </div>

            {/* Razorpay Component */}
            <RazorpayCheckout
              amount={amount}
              serviceName={service}
              customerDetails={{
                name: 'Test Client',
                email: 'client@example.com',
                phone: '9818224495'
              }}
              buttonLabel={`Pay ₹${amount} with Razorpay`}
              className="btn btn--gold"
              onSuccess={(result) => {
                setPaymentResult({
                  status: 'success',
                  ...result
                });
              }}
              onFailure={(error) => {
                setPaymentResult({
                  status: 'failed',
                  error
                });
              }}
            />

            {/* Result Display */}
            {paymentResult && (
              <div style={{
                marginTop: '20px',
                padding: '16px',
                borderRadius: '10px',
                background: paymentResult.status === 'success' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                border: `1px solid ${paymentResult.status === 'success' ? '#10B981' : '#EF4444'}`
              }}>
                {paymentResult.status === 'success' ? (
                  <div>
                    <h4 style={{ color: '#10B981', fontWeight: 700, marginBottom: '6px' }}>
                      ✓ Payment Verified Successfully!
                    </h4>
                    <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.85)', margin: '2px 0' }}>
                      <strong>Payment ID:</strong> {paymentResult.payment_id}
                    </p>
                    <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.85)', margin: '2px 0' }}>
                      <strong>Order ID:</strong> {paymentResult.order_id}
                    </p>
                    <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.85)', margin: '2px 0' }}>
                      <strong>Amount Verified:</strong> ₹{paymentResult.amount} ({paymentResult.amount * 100} paise)
                    </p>
                  </div>
                ) : (
                  <div>
                    <h4 style={{ color: '#EF4444', fontWeight: 700, marginBottom: '6px' }}>
                      ✕ Payment Failed or Rejected
                    </h4>
                    <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.85)' }}>
                      {paymentResult.error}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
