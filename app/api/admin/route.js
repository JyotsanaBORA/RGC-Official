import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { connectDB } from '../../../lib/mongodb';
import Order from '../../../models/Order';

const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'admin@reddington2026';
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'rgc-admin-super-secret-key-2026';

function computeAuthToken(username) {
  return crypto.createHmac('sha256', SESSION_SECRET).update(`${username}-rgc-auth`).digest('hex');
}

function verifyAuth(req) {
  const token = req.cookies.get('rgc_admin_token')?.value;
  if (!token) return false;
  return token === computeAuthToken(ADMIN_USER);
}

/**
 * GET /api/admin
 * Checks session and returns all orders with summary metrics.
 */
export async function GET(req) {
  if (!verifyAuth(req)) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  try {
    await connectDB();
    const orders = await Order.find({}).sort({ createdAt: -1 }).lean();

    // Compute live metrics
    let totalPaid = 0;
    let totalRevenue = 0;
    let pendingCalls = 0;
    let completedCalls = 0;

    const normalizedOrders = orders.map((order) => {
      const isPaid = order.status === 'paid';
      const callStatus = order.callStatus || 'pending';

      if (isPaid) {
        totalPaid += 1;
        totalRevenue += order.amountInRupees || Math.round((order.amount || 0) / 100);
        if (callStatus === 'pending') {
          pendingCalls += 1;
        } else {
          completedCalls += 1;
        }
      }

      return {
        _id: order._id?.toString(),
        orderId: order.orderId,
        paymentId: order.paymentId || '',
        status: order.status || 'created',
        amount: order.amountInRupees || Math.round((order.amount || 0) / 100),
        currency: order.currency || 'INR',
        service: order.service || 'Strategic Business Consultancy',
        customerName: order.customer?.name || order.customerName || 'Valued Client',
        customerEmail: order.customer?.email || order.customerEmail || order.email || '',
        customerPhone: order.customer?.phone || order.customerPhone || '',
        customerCompany: order.customer?.company || order.customerCompany || '',
        callStatus: callStatus,
        callNotes: order.callNotes || '',
        calledAt: order.calledAt || null,
        createdAt: order.createdAt || null,
        paidAt: order.paidAt || null,
        createdAtIST: order.createdAtIST || '',
        paidAtIST: order.paidAtIST || '',
      };
    });

    return NextResponse.json({
      authenticated: true,
      metrics: {
        totalBookings: normalizedOrders.length,
        totalPaid,
        totalRevenue,
        pendingCalls,
        completedCalls,
      },
      orders: normalizedOrders,
    });
  } catch (error) {
    console.error('[Admin API] Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to retrieve orders' }, { status: 500 });
  }
}

/**
 * POST /api/admin
 * Handles login, logout, and call status updates.
 */
export async function POST(req) {
  try {
    const body = await req.json();
    const { action } = body;

    // 1. Action: Login
    if (action === 'login') {
      const { username, password } = body;
      if (username === ADMIN_USER && password === ADMIN_PASS) {
        const token = computeAuthToken(ADMIN_USER);
        const res = NextResponse.json({ success: true, message: 'Logged in successfully' });
        res.cookies.set('rgc_admin_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: 60 * 60 * 24 * 7, // 7 days
        });
        return res;
      }
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    // 2. Action: Logout
    if (action === 'logout') {
      const res = NextResponse.json({ success: true, message: 'Logged out successfully' });
      res.cookies.delete('rgc_admin_token');
      return res;
    }

    // 3. Action: Update Call Status
    if (action === 'update_call') {
      if (!verifyAuth(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const { orderId, callStatus, callNotes } = body;
      if (!orderId) {
        return NextResponse.json({ error: 'orderId is required' }, { status: 400 });
      }

      await connectDB();
      const updateData = {};
      if (callStatus !== undefined) {
        updateData.callStatus = callStatus;
        if (callStatus !== 'pending') {
          updateData.calledAt = new Date();
        }
      }
      if (callNotes !== undefined) {
        updateData.callNotes = callNotes;
      }

      const updated = await Order.findOneAndUpdate(
        { orderId },
        { $set: updateData },
        { new: true }
      ).lean();

      if (!updated) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      }

      return NextResponse.json({
        success: true,
        orderId,
        callStatus: updated.callStatus,
        callNotes: updated.callNotes,
        calledAt: updated.calledAt,
      });
    }

    // 4. Action: Delete Order / Invoice data
    if (action === 'delete_order') {
      if (!verifyAuth(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const { orderId } = body;
      if (!orderId) {
        return NextResponse.json({ error: 'orderId is required' }, { status: 400 });
      }

      await connectDB();
      const deleted = await Order.findOneAndDelete({ orderId });

      if (!deleted) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      }

      return NextResponse.json({ success: true, orderId });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('[Admin API] Action error:', error);
    return NextResponse.json({ error: error.message || 'Internal error' }, { status: 500 });
  }
}
