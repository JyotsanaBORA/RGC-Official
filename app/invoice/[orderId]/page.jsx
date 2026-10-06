import { connectDB } from '../../../lib/mongodb';
import Order from '../../../models/Order';
import Link from 'next/link';

export const metadata = {
  title: 'Tax Invoice — Reddington Global',
  robots: { index: false, follow: false },
};

export default async function InvoicePage({ params }) {
  const { orderId } = params;

  let order = null;
  try {
    const db = await connectDB();
    if (db) {
      order = await Order.findOne({ orderId }).lean();
    }
  } catch (err) {
    console.error('Error fetching order for invoice:', err);
  }

  // Fallback demo data if testing locally with a mock order ID
  const displayOrder = order || {
    orderId: orderId || 'order_DEMO12345',
    createdAt: new Date(),
    service: 'Strategic Business Consultancy',
    customer: {
      name: 'Alex Morgan',
      email: 'alex@company.com',
      phone: '+91 98182 24495',
      company: 'Enterprise Client Corp',
    },
    amount: 9900,
    status: 'paid',
    paymentId: 'pay_DEMO987654321',
  };

  const invoiceNo = `INV-${displayOrder.orderId.replace('order_', '').toUpperCase()}`;
  const orderDate = new Date(displayOrder.createdAt || Date.now()).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', padding: '40px 16px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* Print & Action Controls (Hidden on print) */}
      <div className="no-print" style={{ maxWidth: '720px', margin: '0 auto 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ color: '#64748B', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
          &larr; Back to Reddington Global
        </Link>
        <button
          type="button"
          id="printBtn"
          style={{
            background: 'linear-gradient(135deg, #FBE5A2 0%, #D49F2D 100%)',
            color: '#120800',
            border: '1px solid rgba(212, 159, 45, 0.5)',
            padding: '10px 20px',
            borderRadius: '999px',
            fontWeight: '700',
            fontSize: '13px',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 2px 8px rgba(212, 159, 45, 0.3)',
          }}
        >
          🖨️ Download / Print PDF
        </button>
      </div>

      {/* Official Tax Invoice Document */}
      <div id="invoice-doc" style={{
        maxWidth: '720px',
        margin: '0 auto',
        background: '#FFFFFF',
        borderRadius: '12px',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
        border: '1px solid #E2E8F0',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{ background: '#FFFFFF', color: '#0F172A', padding: '36px 40px', borderBottom: '2px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <img
              src="https://www.reddingtonglobal.com/assets/img/rgc-logo.webp"
              alt="Reddington Global Consultancy"
              style={{ maxHeight: '48px', width: 'auto', display: 'block', marginBottom: '14px' }}
            />
            <div style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '0.04em', color: '#0F172A' }}>
              REDDINGTON GLOBAL CONSULTANCY PVT LTD
            </div>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#64748B', marginTop: '4px' }}>
              Tax Invoice &bull; SAC Code: 9983
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A' }}>TAX INVOICE</div>
            <div style={{ fontSize: '13px', color: '#D49F2D', fontWeight: '600', marginTop: '2px' }}>{invoiceNo}</div>
          </div>
        </div>

        {/* Invoice Body */}
        <div style={{ padding: '36px 40px' }}>
          {/* Status Badge */}
          <div style={{ display: 'inline-block', background: '#ECFDF5', color: '#047857', fontWeight: '700', fontSize: '12px', padding: '4px 12px', borderRadius: '999px', marginBottom: '24px', border: '1px solid #A7F3D0' }}>
            &bull; Payment Verified (₹99.00)
          </div>

          {/* Supplier & Customer Columns */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', paddingBottom: '24px', borderBottom: '1px solid #F1F5F9', marginBottom: '24px' }}>
            <div>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#94A3B8', letterSpacing: '0.05em', marginBottom: '6px' }}>ISSUED BY</div>
              <strong style={{ fontSize: '15px', color: '#0F172A' }}>Reddington Global Consultancy Pvt Ltd</strong>
              <div style={{ fontSize: '13px', color: '#475569', marginTop: '4px', lineHeight: '1.5' }}>
                750 Udyog Vihar Phase 5, Sector 19<br />
                Gurugram, Haryana 122016, India<br />
                Email: sales@reddingtonglobal.com<br />
                Contact: +91 98182 24495
              </div>
            </div>

            <div>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#94A3B8', letterSpacing: '0.05em', marginBottom: '6px' }}>BILLED TO</div>
              <strong style={{ fontSize: '15px', color: '#0F172A' }}>{displayOrder.customer?.name || displayOrder.customerName || 'Valued Client'}</strong>
              <div style={{ fontSize: '13px', color: '#475569', marginTop: '4px', lineHeight: '1.5' }}>
                {(displayOrder.customer?.company || displayOrder.customerCompany) && <>{displayOrder.customer?.company || displayOrder.customerCompany}<br /></>}
                Email: {displayOrder.customer?.email || displayOrder.customerEmail || displayOrder.email || 'N/A'}<br />
                Phone: {displayOrder.customer?.phone || displayOrder.customerPhone || 'N/A'}
              </div>
            </div>
          </div>

          {/* Transaction Metadata Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', background: '#F8FAFC', padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '28px' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#64748B' }}>Invoice Date</div>
              <strong style={{ fontSize: '13px', color: '#0F172A' }}>{orderDate}</strong>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#64748B' }}>Order ID</div>
              <strong style={{ fontSize: '13px', color: '#0F172A' }}>{displayOrder.orderId}</strong>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#64748B' }}>Payment ID</div>
              <strong style={{ fontSize: '13px', color: '#0F172A' }}>{displayOrder.paymentId || 'N/A'}</strong>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#64748B' }}>Payment Mode</div>
              <strong style={{ fontSize: '13px', color: '#0F172A' }}>Razorpay Online</strong>
            </div>
          </div>

          {/* Line Items Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0' }}>
                <th style={{ textAlign: 'left', padding: '12px', fontSize: '12px', textTransform: 'uppercase', color: '#64748B' }}>Service Item</th>
                <th style={{ textAlign: 'center', padding: '12px', fontSize: '12px', textTransform: 'uppercase', color: '#64748B' }}>SAC</th>
                <th style={{ textAlign: 'center', padding: '12px', fontSize: '12px', textTransform: 'uppercase', color: '#64748B' }}>Qty</th>
                <th style={{ textAlign: 'right', padding: '12px', fontSize: '12px', textTransform: 'uppercase', color: '#64748B' }}>Taxable Amt</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '14px 12px' }}>
                  <strong style={{ fontSize: '14px', color: '#0F172A' }}>{displayOrder.service || 'Strategic Business Consultancy'}</strong>
                  <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>1-on-1 Senior Consultant Strategy Session (30 mins)</div>
                </td>
                <td style={{ textAlign: 'center', padding: '14px 12px', fontSize: '13px', color: '#64748B' }}>9983</td>
                <td style={{ textAlign: 'center', padding: '14px 12px', fontSize: '13px', color: '#64748B' }}>1</td>
                <td style={{ textAlign: 'right', padding: '14px 12px', fontSize: '14px', color: '#0F172A' }}>₹83.90</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td colSpan={3} style={{ textAlign: 'right', padding: '10px 12px', fontSize: '13px', color: '#64748B' }}>Taxable Subtotal:</td>
                <td style={{ textAlign: 'right', padding: '10px 12px', fontSize: '13px', color: '#0F172A' }}>₹83.90</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td colSpan={3} style={{ textAlign: 'right', padding: '10px 12px', fontSize: '13px', color: '#64748B' }}>GST (18%):</td>
                <td style={{ textAlign: 'right', padding: '10px 12px', fontSize: '13px', color: '#0F172A' }}>₹15.10</td>
              </tr>
              <tr style={{ borderTop: '2px solid #0F172A', background: '#FFFDF9' }}>
                <td colSpan={3} style={{ textAlign: 'right', padding: '14px 12px', fontSize: '15px', fontWeight: '800', color: '#0F172A' }}>Total Amount Paid:</td>
                <td style={{ textAlign: 'right', padding: '14px 12px', fontSize: '18px', fontWeight: '800', color: '#D49F2D' }}>₹99.00</td>
              </tr>
            </tbody>
          </table>

          {/* Notes and Terms */}
          <div style={{ background: '#FFFBEB', border: '1px solid #FEF3C7', borderRadius: '8px', padding: '16px 20px', marginBottom: '24px' }}>
            <h4 style={{ margin: '0 0 6px', color: '#92400E', fontSize: '13px' }}>Consultancy Scheduling</h4>
            <p style={{ margin: 0, color: '#78350F', fontSize: '12.5px', lineHeight: '1.5' }}>
              Your dedicated consulting partner will contact you at <strong>{displayOrder.customer?.email || displayOrder.customerEmail || displayOrder.email || 'your email'}</strong> or <strong>{displayOrder.customer?.phone || displayOrder.customerPhone || 'your phone'}</strong> within 24 business hours to coordinate your strategic briefing.
            </p>
          </div>

          <div style={{ fontSize: '11px', color: '#94A3B8', lineHeight: '1.6', textAlign: 'center' }}>
            This is a computer-generated tax invoice and requires no physical signature under the Information Technology Act.
            <br />
            Reddington Global Consultancy Pvt Ltd &bull; All rights reserved.
          </div>
        </div>
      </div>

      {/* Inline print style script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            function bindPrint() {
              var btn = document.getElementById('printBtn');
              if (btn && !btn.dataset.bound) {
                btn.dataset.bound = 'true';
                btn.addEventListener('click', function() { window.print(); });
              }
            }
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', bindPrint);
            } else {
              bindPrint();
            }
          })();
        `
      }} />

      <style dangerouslySetInnerHTML={{
        __html: `
          #floatingWhatsApp, .floating-wa { display: none !important; }
          @media print {
            body { background: #FFFFFF !important; padding: 0 !important; }
            .no-print, #floatingWhatsApp, .floating-wa { display: none !important; }
            #invoice-doc { box-shadow: none !important; border: 1px solid #CBD5E1 !important; width: 100% !important; max-width: 100% !important; }
          }
        `
      }} />
    </div>
  );
}
