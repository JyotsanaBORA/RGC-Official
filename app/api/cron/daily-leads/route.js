import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { generateDailyLeadsReport } from '../../../../lib/reports/dailyLeadsReport';

const CRON_SECRET = process.env.CRON_SECRET || 'rgc_cron_secret_leads_2026';
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'rgc-admin-super-secret-key-2026';

function computeAuthToken(username) {
  return crypto.createHmac('sha256', SESSION_SECRET).update(`${username}-rgc-auth`).digest('hex');
}

/**
 * Verify if request is authorized via CRON_SECRET or Admin Session Cookie.
 */
function isAuthorized(req) {
  try {
    // 1. Bearer Token check
    const authHeader = req.headers?.get?.('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      if (token === CRON_SECRET) return true;
    }

    // 2. Query param check
    const url = new URL(req.url);
    const secretParam = url.searchParams.get('secret');
    if (secretParam === CRON_SECRET) return true;

    // 3. Admin portal session cookie check
    const adminCookie = req.cookies?.get?.('rgc_admin_token')?.value;
    if (adminCookie && adminCookie === computeAuthToken(ADMIN_USER)) {
      return true;
    }
  } catch (err) {
    console.warn('[Cron Auth] Error checking auth:', err);
  }

  return false;
}

export async function GET(req) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { error: 'Unauthorized: Invalid CRON_SECRET or session' },
      { status: 401 }
    );
  }

  try {
    const url = new URL(req.url);
    const download = url.searchParams.get('download');

    // If client requested direct CSV or XLSX download
    if (download === 'csv') {
      const report = await generateDailyLeadsReport({ sendEmail: false });
      return new NextResponse(Buffer.from(report.csvContent, 'utf-8'), {
        status: 200,
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="${report.csvFilename || report.filename}"`,
        },
      });
    }

    if (download === 'xlsx') {
      const report = await generateDailyLeadsReport({ sendEmail: false });
      return new NextResponse(report.xlsxBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': `attachment; filename="${report.xlsxFilename}"`,
        },
      });
    }

    const report = await generateDailyLeadsReport({ sendEmail: true });
    return NextResponse.json({
      success: true,
      message: 'Daily leads report generated and dispatched successfully',
      leadCount: report.leadCount,
      metrics: report.metrics,
      recipients: report.recipients,
      emailResult: report.emailResult,
      filename: report.filename,
      generatedAt: report.generatedAt,
    });
  } catch (error) {
    console.error('[Cron API] Daily leads generation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process daily leads report' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  return GET(req);
}
