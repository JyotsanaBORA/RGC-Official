'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [orders, setOrders] = useState([]);
  const [metrics, setMetrics] = useState({
    totalBookings: 0,
    totalPaid: 0,
    totalRevenue: 0,
    pendingCalls: 0,
    completedCalls: 0,
  });

  // Login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginSubmitting, setLoginSubmitting] = useState(false);

  // Filter & Search state
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'needs_call' | 'paid' | 'failed'
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  // Fetch admin data
  const fetchAdminData = async () => {
    try {
      const res = await fetch('/api/admin', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data.authenticated) {
          setAuthenticated(true);
          setOrders(data.orders || []);
          setMetrics(data.metrics || {});
        } else {
          setAuthenticated(false);
        }
      } else {
        setAuthenticated(false);
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginSubmitting(true);
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', username, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setAuthenticated(true);
        fetchAdminData();
      } else {
        setLoginError(data.error || 'Invalid credentials');
      }
    } catch {
      setLoginError('Failed to connect to server');
    } finally {
      setLoginSubmitting(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'logout' }),
      });
      setAuthenticated(false);
      setOrders([]);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Handle Call Status update
  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingOrderId(orderId);
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_call', orderId, callStatus: newStatus }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((ord) => (ord.orderId === orderId ? { ...ord, callStatus: newStatus } : ord))
        );
        fetchAdminData();
      }
    } catch (err) {
      console.error('Status update error:', err);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  // Handle Call Notes update
  const handleNotesBlur = async (orderId, notesText) => {
    try {
      await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_call', orderId, callNotes: notesText }),
      });
    } catch (err) {
      console.error('Notes update error:', err);
    }
  };

  // Handle Delete Order
  const handleDeleteOrder = async (orderId, customerName) => {
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete booking data and invoice for "${customerName || orderId}"? This action cannot be undone.`
    );
    if (!confirmed) return;

    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete_order', orderId }),
      });
      if (res.ok) {
        setOrders((prev) => prev.filter((ord) => ord.orderId !== orderId));
        fetchAdminData();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to delete order');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Error connecting to server to delete order');
    }
  };

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    // Tab filter
    if (activeTab === 'needs_call') {
      if (order.status !== 'paid' || order.callStatus !== 'pending') return false;
    } else if (activeTab === 'paid') {
      if (order.status !== 'paid') return false;
    } else if (activeTab === 'failed') {
      if (order.status === 'paid') return false;
    }

    // Search query
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const nameMatch = (order.customerName || '').toLowerCase().includes(q);
    const emailMatch = (order.customerEmail || '').toLowerCase().includes(q);
    const phoneMatch = (order.customerPhone || '').toLowerCase().includes(q);
    const companyMatch = (order.customerCompany || '').toLowerCase().includes(q);
    const orderMatch = (order.orderId || '').toLowerCase().includes(q);
    return nameMatch || emailMatch || phoneMatch || companyMatch || orderMatch;
  });

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0F172A', color: '#F8FAFC', fontFamily: 'sans-serif' }}>
        <div>Loading Admin Portal...</div>
      </div>
    );
  }

  // ──────────────────────────────────────────
  // 1. LOGIN SCREEN
  // ──────────────────────────────────────────
  if (!authenticated) {
    return (
      <div style={{ minHeight: '100vh', background: 'radial-gradient(circle at 50% 20%, #1E293B 0%, #0F172A 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        <div style={{ width: '100%', maxWidth: '420px', background: '#FFFFFF', borderRadius: '16px', padding: '36px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', border: '1px solid #E2E8F0' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <img
              src="https://www.reddingtonglobal.com/assets/img/rgc-logo.webp"
              alt="Reddington Global"
              style={{ maxHeight: '48px', margin: '0 auto 14px', display: 'block' }}
            />
            <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#0F172A', margin: '0 0 4px' }}>
              Admin Portal
            </h1>
            <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
              Payment Tracking &amp; Client Call Management
            </p>
          </div>

          {loginError && (
            <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#B91C1C', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '20px' }}>
              ⚠️ {loginError}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#334155', marginBottom: '6px' }}>
                Admin Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
                style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#334155', marginBottom: '6px' }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <button
              type="submit"
              disabled={loginSubmitting}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #D49F2D 0%, #B8861E 100%)',
                color: '#FFFFFF',
                padding: '13px',
                borderRadius: '8px',
                border: 'none',
                fontWeight: '700',
                fontSize: '14px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(212, 159, 45, 0.3)',
              }}
            >
              {loginSubmitting ? 'Verifying...' : 'Sign In to Dashboard →'}
            </button>
          </form>

          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <Link href="/" style={{ fontSize: '13px', color: '#64748B', textDecoration: 'none' }}>
              &larr; Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ──────────────────────────────────────────
  // 2. DASHBOARD SCREEN
  // ──────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', color: '#0F172A', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', paddingBottom: '60px' }}>
      {/* Top Navbar */}
      <header style={{ background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '16px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <img
            src="https://www.reddingtonglobal.com/assets/img/rgc-logo.webp"
            alt="Reddington Global"
            style={{ maxHeight: '36px', width: 'auto' }}
          />
          <div>
            <div style={{ fontSize: '16px', fontWeight: '800', color: '#0F172A' }}>
              Reddington Global <span style={{ color: '#D49F2D' }}>CRM &amp; Payments</span>
            </div>
            <div style={{ fontSize: '11px', color: '#64748B' }}>Client Consultation Call Management</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={fetchAdminData}
            style={{ background: '#F1F5F9', border: '1px solid #CBD5E1', padding: '8px 14px', borderRadius: '6px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', color: '#334155' }}
          >
            🔄 Refresh
          </button>
          <button
            onClick={handleLogout}
            style={{ background: '#FEE2E2', border: '1px solid #FECACA', padding: '8px 14px', borderRadius: '6px', fontSize: '13px', fontWeight: '700', color: '#DC2626', cursor: 'pointer' }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '1320px', margin: '28px auto', padding: '0 20px' }}>
        {/* KPI Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px', marginBottom: '28px' }}>
          <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: '600', textTransform: 'uppercase' }}>Total Bookings</div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: '#0F172A', marginTop: '6px' }}>{metrics.totalBookings || 0}</div>
            <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px' }}>All recorded checkout attempts</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: '12px', color: '#047857', fontWeight: '600', textTransform: 'uppercase' }}>Confirmed Paid</div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: '#059669', marginTop: '6px' }}>{metrics.totalPaid || 0}</div>
            <div style={{ fontSize: '12px', color: '#059669', marginTop: '4px' }}>Revenue: ₹{(metrics.totalRevenue || 0).toLocaleString('en-IN')}</div>
          </div>

          <div style={{ background: '#FFFBEB', padding: '20px', borderRadius: '12px', border: '1px solid #FDE68A', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: '12px', color: '#B45309', fontWeight: '700', textTransform: 'uppercase' }}>📞 Needs Call (Action)</div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: '#D97706', marginTop: '6px' }}>{metrics.pendingCalls || 0}</div>
            <div style={{ fontSize: '12px', color: '#B45309', marginTop: '4px' }}>Paid clients awaiting partner briefing</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: '12px', color: '#475569', fontWeight: '600', textTransform: 'uppercase' }}>Calls Handled</div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: '#2563EB', marginTop: '6px' }}>{metrics.completedCalls || 0}</div>
            <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>Called, follow-up, or completed</div>
          </div>
        </div>

        {/* Filters & Search Toolbar */}
        <div style={{ background: '#FFFFFF', padding: '16px 20px', borderRadius: '12px', border: '1px solid #E2E8F0', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveTab('all')}
              style={{
                padding: '8px 16px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: '700',
                border: 'none',
                cursor: 'pointer',
                background: activeTab === 'all' ? '#0F172A' : '#F1F5F9',
                color: activeTab === 'all' ? '#FFFFFF' : '#475569',
              }}
            >
              All Users ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('needs_call')}
              style={{
                padding: '8px 16px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: '700',
                border: 'none',
                cursor: 'pointer',
                background: activeTab === 'needs_call' ? '#D97706' : '#FEF3C7',
                color: activeTab === 'needs_call' ? '#FFFFFF' : '#92400E',
              }}
            >
              📞 Needs Call ({orders.filter(o => o.status === 'paid' && o.callStatus === 'pending').length})
            </button>
            <button
              onClick={() => setActiveTab('paid')}
              style={{
                padding: '8px 16px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: '700',
                border: 'none',
                cursor: 'pointer',
                background: activeTab === 'paid' ? '#059669' : '#ECFDF5',
                color: activeTab === 'paid' ? '#FFFFFF' : '#047857',
              }}
            >
              Paid Only ({orders.filter(o => o.status === 'paid').length})
            </button>
            <button
              onClick={() => setActiveTab('failed')}
              style={{
                padding: '8px 16px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: '700',
                border: 'none',
                cursor: 'pointer',
                background: activeTab === 'failed' ? '#DC2626' : '#FEE2E2',
                color: activeTab === 'failed' ? '#FFFFFF' : '#B91C1C',
              }}
            >
              Incomplete ({orders.filter(o => o.status !== 'paid').length})
            </button>
          </div>

          {/* Search Box */}
          <div style={{ minWidth: '280px', flex: '1', maxWidth: '400px' }}>
            <input
              type="text"
              placeholder="Search by name, email, phone, company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '13px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
        </div>

        {/* Orders Table */}
        <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  <th style={{ padding: '14px 18px' }}>Customer &amp; Company</th>
                  <th style={{ padding: '14px 18px' }}>Contact</th>
                  <th style={{ padding: '14px 18px' }}>Payment Status</th>
                  <th style={{ padding: '14px 18px' }}>Call Status (Update)</th>
                  <th style={{ padding: '14px 18px' }}>Notes</th>
                  <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: '#94A3B8' }}>
                      No client bookings match this filter or search.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => {
                    const isPaid = order.status === 'paid';
                    const needsCall = isPaid && order.callStatus === 'pending';

                    return (
                      <tr
                        key={order.orderId}
                        style={{
                          borderBottom: '1px solid #F1F5F9',
                          background: needsCall ? '#FFFDF5' : '#FFFFFF',
                        }}
                      >
                        {/* Customer */}
                        <td style={{ padding: '16px 18px', verticalAlign: 'top' }}>
                          <div style={{ fontWeight: '700', color: '#0F172A', fontSize: '14px' }}>
                            {order.customerName}
                          </div>
                          {order.customerCompany && (
                            <div style={{ fontSize: '12px', color: '#475569', marginTop: '2px' }}>
                              🏢 {order.customerCompany}
                            </div>
                          )}
                          <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '4px' }}>
                            {order.service}
                          </div>
                        </td>

                        {/* Contact */}
                        <td style={{ padding: '16px 18px', verticalAlign: 'top' }}>
                          <div style={{ color: '#0F172A', fontWeight: '500' }}>{order.customerEmail || '—'}</div>
                          <div style={{ color: '#64748B', marginTop: '3px' }}>{order.customerPhone || '—'}</div>
                          {order.customerPhone && (
                            <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                              <a
                                href={`tel:${order.customerPhone.replace(/\s+/g, '')}`}
                                style={{
                                  fontSize: '11px',
                                  padding: '2px 8px',
                                  background: '#EFF6FF',
                                  color: '#1D4ED8',
                                  borderRadius: '4px',
                                  textDecoration: 'none',
                                  fontWeight: '600',
                                }}
                              >
                                📞 Call
                              </a>
                              <a
                                href={`https://wa.me/${order.customerPhone.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                  fontSize: '11px',
                                  padding: '2px 8px',
                                  background: '#ECFDF5',
                                  color: '#047857',
                                  borderRadius: '4px',
                                  textDecoration: 'none',
                                  fontWeight: '600',
                                }}
                              >
                                💬 WA
                              </a>
                            </div>
                          )}
                        </td>

                        {/* Payment Status */}
                        <td style={{ padding: '16px 18px', verticalAlign: 'top' }}>
                          <span
                            style={{
                              display: 'inline-block',
                              padding: '4px 10px',
                              borderRadius: '999px',
                              fontSize: '11px',
                              fontWeight: '700',
                              textTransform: 'uppercase',
                              background: isPaid ? '#ECFDF5' : order.status === 'created' ? '#FFFBEB' : '#FEF2F2',
                              color: isPaid ? '#047857' : order.status === 'created' ? '#B45309' : '#B91C1C',
                            }}
                          >
                            {isPaid ? `✓ Paid ₹${order.amount}` : order.status}
                          </span>
                          <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '6px' }}>
                            {order.paidAtIST || order.createdAtIST || (order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN') : 'N/A')}
                          </div>
                        </td>

                        {/* Call Status Dropdown */}
                        <td style={{ padding: '16px 18px', verticalAlign: 'top' }}>
                          <select
                            value={order.callStatus || 'pending'}
                            disabled={updatingOrderId === order.orderId}
                            onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                            style={{
                              padding: '6px 10px',
                              borderRadius: '6px',
                              fontSize: '12px',
                              fontWeight: '700',
                              border: '1px solid #CBD5E1',
                              cursor: 'pointer',
                              background:
                                order.callStatus === 'called'
                                  ? '#ECFDF5'
                                  : order.callStatus === 'follow_up'
                                  ? '#EFF6FF'
                                  : order.callStatus === 'no_answer'
                                  ? '#FEF2F2'
                                  : order.callStatus === 'closed'
                                  ? '#F1F5F9'
                                  : '#FEF3C7',
                              color:
                                order.callStatus === 'called'
                                  ? '#047857'
                                  : order.callStatus === 'follow_up'
                                  ? '#1D4ED8'
                                  : order.callStatus === 'no_answer'
                                  ? '#B91C1C'
                                  : order.callStatus === 'closed'
                                  ? '#475569'
                                  : '#92400E',
                            }}
                          >
                            <option value="pending">📞 Needs Call</option>
                            <option value="called">✅ Called / Briefed</option>
                            <option value="follow_up">🔁 Follow-Up Needed</option>
                            <option value="no_answer">📵 No Answer / Retry</option>
                            <option value="closed">🔒 Completed / Closed</option>
                          </select>
                          {order.calledAt && (
                            <div style={{ fontSize: '10px', color: '#94A3B8', marginTop: '4px' }}>
                              Updated {new Date(order.calledAt).toLocaleDateString('en-IN')}
                            </div>
                          )}
                        </td>

                        {/* Call Notes */}
                        <td style={{ padding: '16px 18px', verticalAlign: 'top', minWidth: '220px' }}>
                          <input
                            type="text"
                            defaultValue={order.callNotes || ''}
                            placeholder="Add call notes..."
                            onBlur={(e) => handleNotesBlur(order.orderId, e.target.value)}
                            style={{
                              width: '100%',
                              padding: '6px 10px',
                              borderRadius: '6px',
                              border: '1px solid #E2E8F0',
                              fontSize: '12px',
                              color: '#334155',
                              outline: 'none',
                              boxSizing: 'border-box',
                            }}
                          />
                        </td>

                        {/* Action: Invoice & Delete */}
                        <td style={{ padding: '16px 18px', verticalAlign: 'top', textAlign: 'right', whiteSpace: 'nowrap' }}>
                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Link
                              href={`/invoice/${order.orderId}`}
                              target="_blank"
                              style={{
                                display: 'inline-block',
                                padding: '6px 11px',
                                background: '#F8FAFC',
                                color: '#0F172A',
                                border: '1px solid #CBD5E1',
                                borderRadius: '6px',
                                fontSize: '12px',
                                fontWeight: '600',
                                textDecoration: 'none',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              📄 Invoice
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleDeleteOrder(order.orderId, order.customerName)}
                              title="Delete booking data & invoice"
                              style={{
                                background: '#FEF2F2',
                                border: '1px solid #FECACA',
                                color: '#DC2626',
                                padding: '6px 11px',
                                borderRadius: '6px',
                                fontSize: '12px',
                                fontWeight: '700',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
