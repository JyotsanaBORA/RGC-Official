import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import * as XLSX from 'xlsx';
import { connectDB } from '../mongodb.js';
import Order from '../../models/Order.js';
import { paymentStatusInfo, callStatusInfo } from '../lead-status.js';

/**
 * Configure Nodemailer transport.
 */
function getTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_PORT === '465',
    auth: { user, pass },
  });
}

/**
 * Escape a field strictly according to RFC 4180 CSV standard.
 * Only quotes if the field contains commas, quotation marks, or line breaks.
 * Empty or null values become clean empty strings without quotes.
 */
function formatCsvCell(val) {
  if (val === null || val === undefined) return '';
  const str = String(val).trim();
  if (str === '') return '';
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * Format timestamp into a clean, unquoted IST string without mid-string commas.
 * Example: "26-Oct-2026 12:29:22 IST"
 */
function formatReportDate(val) {
  if (!val) return 'N/A';
  if (val instanceof Date) {
    if (isNaN(val.getTime())) return 'N/A';
    return (
      val.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false }).replace(/,\s*/, ' ') +
      ' IST'
    );
  }
  const str = String(val).trim();
  const d = new Date(str);
  if (!isNaN(d.getTime())) {
    try {
      const parts = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).formatToParts(d);
      const map = {};
      parts.forEach((p) => {
        map[p.type] = p.value;
      });
      return `${map.day}-${map.month}-${map.year} ${map.hour}:${map.minute}:${map.second} IST`;
    } catch {
      // Fallback
    }
  }
  return str.replace(/,\s*/, ' ');
}

/**
 * Resolve target email distribution list.
 */
export function getReportRecipients(customRecipients) {
  if (customRecipients && Array.isArray(customRecipients) && customRecipients.length > 0) {
    return customRecipients;
  }

  const envRecipients = process.env.DAILY_LEAD_REPORT_RECIPIENTS;
  if (envRecipients) {
    const list = envRecipients.split(',').map((s) => s.trim()).filter(Boolean);
    if (list.length > 0) return list;
  }

  return [
    'Jyotsana.Bora@reddingtonglobal.com',
    'Vishal.Bora@reddingtonglobal.com',
    process.env.SMTP_USER || 'sales@reddingtonglobal.com',
  ];
}

/**
 * Lead rows for the sheet: header row first, one strongly typed row per order.
 */
const LEAD_HEADERS = [
  'Lead / Order ID',
  'Date & Time (IST)',
  'Status',
  'Customer Name',
  'Phone Number',
  'Email Address',
  'Company / Brand',
  'GSTIN',
  'Service Practice',
  'Selected Package',
  'Package Price (INR)',
  'Amount Paid (INR)',
  'Failure / Drop-off Reason',
  'Call Status',
  'Call Notes',
  'Traffic Source',
  'Campaign Name',
  'Landing Page URL',
  'Client Notes / Requirements',
];

export function buildLeadRows(orders) {
  const rows = orders.map((ord) => {
    const amountPaid =
      ord.status === 'paid'
        ? ord.amountInRupees || Math.round((ord.amount || 0) / 100)
        : 0;

    const rawTime =
      ord.paidAtIST ||
      ord.failedAtIST ||
      ord.createdAtIST ||
      ord.createdAt ||
      '';
    const timeIST = formatReportDate(rawTime);

    const statusLabel = paymentStatusInfo(ord.status || 'created').label.toUpperCase();
    const interested = ord.interestedPlan || ord.notes?.interested_plan || '';
    const callInfo = callStatusInfo(ord.callStatus || 'pending');

    return [
      ord.orderId || '',
      timeIST,
      statusLabel,
      ord.customerName || ord.customer?.name || '',
      ord.customerPhone || ord.customer?.phone || '',
      ord.customerEmail || ord.customer?.email || ord.email || '',
      ord.customerCompany || ord.customer?.company || '',
      ord.customerGst || ord.gstNumber || ord.customer?.gstNumber || ord.notes?.gst_number || '',
      ord.service || 'Strategic Business Consultancy',
      [ord.selectedPackage || ord.notes?.selected_package, interested && `Interested: ${interested}`].filter(Boolean).join(' | '),
      Number(ord.packagePrice || 0),
      amountPaid,
      ord.failureReason || (ord.status === 'abandoned' ? 'Left in form before initiating payment' : ''),
      callInfo.label,
      ord.callNotes || '',
      ord.attribution?.source || ord.notes?.utm_source || 'direct',
      ord.attribution?.campaign || ord.notes?.utm_campaign || 'none',
      ord.attribution?.landingPage || ord.notes?.landing_page || '',
      ord.notes?.message || ord.notes?.requirement || '',
    ];
  });
  return [LEAD_HEADERS, ...rows];
}

/** CSV text with a UTF-8 BOM so Microsoft Excel opens international characters correctly. */
export function toLeadsCsv(rows) {
  const lines = rows.map((row) => row.map((v) => (typeof v === 'number' ? v : formatCsvCell(v))).join(','));
  return '\uFEFF' + lines.join('\r\n');
}

/** Excel workbook (.xlsx) buffer with auto-fit column widths. */
export function toLeadsXlsx(rows, sheetName) {
  const [headers] = rows;
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(rows);

  // Auto-fit column widths
  ws['!cols'] = headers.map((hdr, i) => {
    let maxLen = hdr.length;
    for (let r = 1; r < rows.length; r++) {
      const cellVal = rows[r][i];
      const len = cellVal ? String(cellVal).length : 0;
      if (len > maxLen) maxLen = len;
    }
    return { wch: Math.min(Math.max(maxLen + 3, 12), 40) };
  });

  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  return XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
}

/**
 * Every lead and order ever recorded, newest first, as an Excel workbook.
 */
export async function exportAllLeadsXlsx() {
  await connectDB();
  const orders = await Order.find({}).sort({ createdAt: -1 }).lean();
  const dateFile = new Date().toISOString().split('T')[0];
  return {
    buffer: toLeadsXlsx(buildLeadRows(orders), 'All Leads'),
    filename: `Reddington_All_Leads_${dateFile}.xlsx`,
    count: orders.length,
  };
}

/**
 * Every lead and order ever recorded, newest first, as a CSV string with BOM.
 */
export async function exportAllLeadsCsv() {
  await connectDB();
  const orders = await Order.find({}).sort({ createdAt: -1 }).lean();
  const dateFile = new Date().toISOString().split('T')[0];
  return {
    content: toLeadsCsv(buildLeadRows(orders)),
    filename: `Reddington_All_Leads_${dateFile}.csv`,
    count: orders.length,
  };
}

/**
 * Core engine to generate lead report with updated previous statuses,
 * attached CSV & XLSX files with all data, and an executive branded email.
 */
export async function generateDailyLeadsReport({
  sendEmail = true,
  customRecipients = null,
  hours = 24,
} = {}) {
  await connectDB();

  const now = new Date();
  const windowStart = new Date(Date.now() - hours * 60 * 60 * 1000);

  // 1. Fetch ALL leads ever recorded so historical inquiries and updated statuses are preserved
  const allOrders = await Order.find({}).sort({ createdAt: -1 }).lean();

  // 2. Identify inquiries created or updated within the 24h window
  const recentOrders = allOrders.filter((ord) => {
    const cDate = ord.createdAt ? new Date(ord.createdAt) : null;
    const uDate = ord.updatedAt ? new Date(ord.updatedAt) : null;
    return (cDate && cDate >= windowStart) || (uDate && uDate >= windowStart);
  });

  // 3. Compute all-time cumulative metrics across all orders
  let totalPaid = 0;
  let totalRevenue = 0;
  let totalFailed = 0;
  let totalAbandoned = 0;
  let totalCreated = 0;

  // CRM Call Status metrics
  let pendingCalls = 0;
  let calledCount = 0;
  let followUpCount = 0;
  let noAnswerCount = 0;
  let notInterestedCount = 0;
  let closedCount = 0;

  allOrders.forEach((ord) => {
    const amount = ord.amountInRupees || Math.round((ord.amount || 0) / 100);
    if (ord.status === 'paid') {
      totalPaid += 1;
      totalRevenue += amount;
    } else if (ord.status === 'failed') {
      totalFailed += 1;
    } else if (ord.status === 'abandoned') {
      totalAbandoned += 1;
    } else {
      totalCreated += 1;
    }

    const cStatus = ord.callStatus || 'pending';
    if (cStatus === 'pending') pendingCalls += 1;
    else if (cStatus === 'called') calledCount += 1;
    else if (cStatus === 'follow_up') followUpCount += 1;
    else if (cStatus === 'no_answer') noAnswerCount += 1;
    else if (cStatus === 'not_interested') notInterestedCount += 1;
    else if (cStatus === 'closed') closedCount += 1;
    else pendingCalls += 1;
  });

  // 4. Compute 24h window metrics
  let recentPaid = 0;
  let recentAbandoned = 0;
  let recentFailed = 0;
  recentOrders.forEach((ord) => {
    if (ord.status === 'paid') recentPaid += 1;
    else if (ord.status === 'abandoned') recentAbandoned += 1;
    else if (ord.status === 'failed') recentFailed += 1;
  });

  // 5. Build full CSV & XLSX Datasets containing ALL leads with updated statuses
  const leadRows = buildLeadRows(allOrders);
  const csvContent = toLeadsCsv(leadRows);
  const xlsxBuffer = toLeadsXlsx(leadRows, 'All Leads');

  const dateStr = now.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  });
  const dateFile = now.toISOString().split('T')[0];
  const csvFilename = `Reddington_Leads_Report_${dateFile}.csv`;
  const xlsxFilename = `Reddington_Leads_Report_${dateFile}.xlsx`;

  const windowEndIST = formatReportDate(now);

  // Check local PNG logo for inline CID attachment
  const logoLocalPath = path.join(process.cwd(), 'public', 'assets', 'img', 'rgc-logo-opt.png');
  const hasLocalLogo = fs.existsSync(logoLocalPath);
  const logoSrc = hasLocalLogo
    ? 'cid:rgclogo'
    : 'https://www.reddingtonglobal.com/assets/img/rgc-logo-opt.png';

  // 6. Build Executive Branded HTML Email (Outlook MSO & Dark Mode Optimized)
  // Display up to 25 latest inquiries so all recent reach-outs are visible
  const previewOrders = allOrders.slice(0, 25);
  const previewRowsHtml = previewOrders
    .map((o, idx) => {
      const isPaid = o.status === 'paid';
      const isFailed = o.status === 'failed';
      const isAbandoned = o.status === 'abandoned';
      const rowBg = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
      const badgeBg = isPaid ? '#ecfdf5' : isFailed ? '#fef2f2' : isAbandoned ? '#fffbeb' : '#f1f5f9';
      const badgeColor = isPaid ? '#047857' : isFailed ? '#b91c1c' : isAbandoned ? '#b45309' : '#475569';
      const badgeLabel = paymentStatusInfo(o.status || 'created').label.toUpperCase();

      const callInfo = callStatusInfo(o.callStatus || 'pending');
      const timePreview = formatReportDate(o.paidAtIST || o.failedAtIST || o.createdAtIST || o.createdAt);

      return `
        <tr bgcolor="${rowBg}">
          <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; font-family: Arial, sans-serif; font-size: 13px; font-weight: 700; color: #0f172a;">
            ${o.customerName || o.customer?.name || 'Prospect'}
            ${o.customerCompany ? `<div style="font-size: 11px; font-weight: normal; color: #64748b; margin-top: 2px;">${o.customerCompany}</div>` : ''}
          </td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; font-family: Arial, sans-serif; font-size: 12px; color: #334155;">
            <div>${o.customerPhone || o.customer?.phone || '—'}</div>
            <div style="color: #64748b; font-size: 11px; margin-top: 2px;">${o.customerEmail || o.customer?.email || o.email || ''}</div>
          </td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; font-family: Arial, sans-serif; font-size: 12px; color: #475569;">
            ${o.service || 'Consultancy'}
            ${o.selectedPackage ? `<div style="font-size: 11px; color: #b45309; font-weight: 600; margin-top: 2px;">${o.selectedPackage}</div>` : ''}
            ${o.interestedPlan ? `<div style="font-size: 11px; color: #0f766e; font-weight: 600; margin-top: 2px;">Interested: ${o.interestedPlan}</div>` : ''}
          </td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; text-align: center;">
            <span style="display: inline-block; padding: 4px 10px; border-radius: 999px; font-family: Arial, sans-serif; font-size: 10px; font-weight: 700; background-color: ${badgeBg}; color: ${badgeColor}; border: 1px solid ${badgeBg}; white-space: nowrap;">
              ${badgeLabel}
            </span>
          </td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; text-align: center;">
            <span style="display: inline-block; padding: 4px 10px; border-radius: 999px; font-family: Arial, sans-serif; font-size: 10px; font-weight: 700; background-color: ${callInfo.bg}; color: ${callInfo.color}; border: 1px solid ${callInfo.bg}; white-space: nowrap;">
              ${callInfo.icon} ${callInfo.label.toUpperCase()}
            </span>
            ${o.callNotes ? `<div style="font-size: 10px; color: #64748b; margin-top: 3px; max-width: 140px; text-align: center; word-break: break-word;">${o.callNotes}</div>` : ''}
          </td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; font-family: Arial, sans-serif; font-size: 11px; color: #64748b; text-align: right; white-space: nowrap;">
            ${timePreview}
          </td>
        </tr>
      `;
    })
    .join('');

  const htmlContent = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="color-scheme" content="light dark" />
      <meta name="supported-color-schemes" content="light dark" />
      <title>Reddington Global Daily CRM Leads Report</title>
      <!--[if (gte mso 9)|(IE)]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
      <style type="text/css">
        body, table, td, div, p, a, span { font-family: Arial, Helvetica, sans-serif !important; }
      </style>
      <![endif]-->
      <style type="text/css">
        body { margin: 0; padding: 0; background-color: #f1f5f9; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table { border-spacing: 0; border-collapse: collapse; }
        img { border: 0; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
        @media only screen and (max-width: 620px) {
          .kpi-cell { display: block !important; width: 100% !important; margin-bottom: 8px !important; }
          .container-table { width: 100% !important; border-radius: 0 !important; }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 24px 12px; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f1f5f9;">
        <tr>
          <td align="center">
            <!--[if (gte mso 9)|(IE)]>
            <table width="680" align="center" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td>
            <![endif]-->
            <table class="container-table" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 680px; width: 100%; background-color: #ffffff; border-radius: 14px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
              
              <!-- Premium Luxury Obsidian Header -->
              <tr>
                <td bgcolor="#0a101d" style="background-color: #0a101d; padding: 26px 32px; border-bottom: 3px solid #d4af37; text-align: left;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="padding: 0;">
                        <img src="${logoSrc}" alt="Reddington Global" width="170" border="0" style="display: block; width: 170px; max-width: 170px; height: auto; border: 0;" />
                        <div style="font-family: Arial, Helvetica, sans-serif; font-size: 19px; font-weight: 800; color: #ffffff; letter-spacing: 0.05em; text-transform: uppercase; margin-top: 14px; line-height: 1.25;">
                          REDDINGTON GLOBAL CONSULTANCY
                        </div>
                        <div style="font-family: Arial, Helvetica, sans-serif; font-size: 11px; font-weight: 700; color: #d4af37; letter-spacing: 0.12em; text-transform: uppercase; margin-top: 5px;">
                          DAILY CRM LEADS &amp; ALL UPDATED INQUIRIES REPORT
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Email Body -->
              <tr>
                <td style="padding: 28px 32px; background-color: #ffffff;">
                  
                  <!-- Attached Files Banner (CSV + XLSX) -->
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f0fdf4" style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; margin-bottom: 22px;">
                    <tr>
                      <td style="padding: 14px 18px; font-family: Arial, Helvetica, sans-serif; font-size: 13px; color: #166534; line-height: 1.6;">
                        📎 <strong>Attached Data Files (All Updated Leads):</strong><br/>
                        &bull; 📄 <strong style="color: #059669;">${csvFilename}</strong> — Complete CSV file with all previous &amp; latest customer inquiries and updated statuses.<br/>
                        &bull; 📊 <strong style="color: #059669;">${xlsxFilename}</strong> — Interactive Excel workbook with formatted columns.
                      </td>
                    </tr>
                  </table>

                  <p style="margin: 0 0 16px 0; font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #334155; line-height: 1.6;">
                    Dear Leadership &amp; Sales Team,<br/>
                    Here is your automated daily CRM status report for <strong>${dateStr}</strong>. Below is the updated status breakdown of all client consultation inquiries and checkout interactions logged to date, including historical inquiries with their latest payment and CRM follow-up statuses.
                  </p>

                  <!-- Status Overview Strip -->
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f8fafc" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #d4af37; border-radius: 6px; margin-bottom: 22px;">
                    <tr>
                      <td style="padding: 12px 16px; font-family: Arial, sans-serif; font-size: 12.5px; color: #334155; line-height: 1.55;">
                        <strong>Pipeline Status Overview (as of ${windowEndIST}):</strong><br/>
                        &bull; <strong>Total Inquiries in CRM:</strong> <strong>${allOrders.length}</strong> inquiries logged<br/>
                        &bull; <strong>Past 24 Hours Activity:</strong> ${
                          recentOrders.length > 0
                            ? `<strong style="color: #047857;">${recentOrders.length}</strong> new/updated inquiries (${recentPaid} paid, ${recentAbandoned} left in form)`
                            : `<span style="color: #64748b;">0 new inquiries in the last 24h &mdash; displaying all ${allOrders.length} updated previous records below</span>`
                        }
                      </td>
                    </tr>
                  </table>

                  <!-- 4 Payment Pipeline KPI Summary Cards -->
                  <div style="font-family: Arial, sans-serif; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 8px;">
                    Payment &amp; Booking Pipeline
                  </div>
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 18px;">
                    <tr>
                      <!-- Total Inquiries -->
                      <td class="kpi-cell" width="23%" bgcolor="#f8fafc" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 8px; text-align: center;">
                        <div style="font-family: Arial, sans-serif; font-size: 10px; text-transform: uppercase; color: #64748b; font-weight: 700; letter-spacing: 0.04em;">TOTAL INQUIRIES</div>
                        <div style="font-family: Arial, sans-serif; font-size: 24px; font-weight: 800; color: #0f172a; margin-top: 4px;">${allOrders.length}</div>
                        <div style="font-family: Arial, sans-serif; font-size: 10px; color: #94a3b8; margin-top: 2px;">All-Time Updated</div>
                      </td>
                      <td width="2%">&nbsp;</td>

                      <!-- Confirmed Paid -->
                      <td class="kpi-cell" width="23%" bgcolor="#ecfdf5" style="background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; padding: 14px 8px; text-align: center;">
                        <div style="font-family: Arial, sans-serif; font-size: 10px; text-transform: uppercase; color: #047857; font-weight: 700; letter-spacing: 0.04em;">CONFIRMED PAID</div>
                        <div style="font-family: Arial, sans-serif; font-size: 24px; font-weight: 800; color: #059669; margin-top: 4px;">${totalPaid}</div>
                        <div style="font-family: Arial, sans-serif; font-size: 11px; color: #047857; font-weight: 700; margin-top: 2px;">₹${totalRevenue.toLocaleString('en-IN')}</div>
                      </td>
                      <td width="2%">&nbsp;</td>

                      <!-- Left in Form (Warm Leads) -->
                      <td class="kpi-cell" width="23%" bgcolor="#fffbeb" style="background-color: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 14px 8px; text-align: center;">
                        <div style="font-family: Arial, sans-serif; font-size: 10px; text-transform: uppercase; color: #b45309; font-weight: 700; letter-spacing: 0.04em;">LEFT IN FORM</div>
                        <div style="font-family: Arial, sans-serif; font-size: 24px; font-weight: 800; color: #d97706; margin-top: 4px;">${totalAbandoned}</div>
                        <div style="font-family: Arial, sans-serif; font-size: 10px; color: #92400e; font-weight: 600; margin-top: 2px;">Warm Leads</div>
                      </td>
                      <td width="2%">&nbsp;</td>

                      <!-- Failed Payments -->
                      <td class="kpi-cell" width="23%" bgcolor="#fef2f2" style="background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 14px 8px; text-align: center;">
                        <div style="font-family: Arial, sans-serif; font-size: 10px; text-transform: uppercase; color: #b91c1c; font-weight: 700; letter-spacing: 0.04em;">PAYMENT FAILED</div>
                        <div style="font-family: Arial, sans-serif; font-size: 24px; font-weight: 800; color: #dc2626; margin-top: 4px;">${totalFailed}</div>
                        <div style="font-family: Arial, sans-serif; font-size: 10px; color: #991b1b; font-weight: 600; margin-top: 2px;">Follow-up Req.</div>
                      </td>
                    </tr>
                  </table>

                  <!-- 4 CRM Follow-up / Call Status Cards -->
                  <div style="font-family: Arial, sans-serif; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 8px;">
                    CRM Follow-up &amp; Call Statuses
                  </div>
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 26px;">
                    <tr>
                      <!-- Needs Call -->
                      <td class="kpi-cell" width="23%" bgcolor="#fffbeb" style="background-color: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 12px 8px; text-align: center;">
                        <div style="font-family: Arial, sans-serif; font-size: 10px; text-transform: uppercase; color: #92400e; font-weight: 700;">NEEDS CALL</div>
                        <div style="font-family: Arial, sans-serif; font-size: 22px; font-weight: 800; color: #b45309; margin-top: 3px;">${pendingCalls}</div>
                        <div style="font-family: Arial, sans-serif; font-size: 10px; color: #78350f; margin-top: 2px;">Pending Action</div>
                      </td>
                      <td width="2%">&nbsp;</td>

                      <!-- Called / Briefed -->
                      <td class="kpi-cell" width="23%" bgcolor="#ecfdf5" style="background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; padding: 12px 8px; text-align: center;">
                        <div style="font-family: Arial, sans-serif; font-size: 10px; text-transform: uppercase; color: #047857; font-weight: 700;">CALLED / BRIEFED</div>
                        <div style="font-family: Arial, sans-serif; font-size: 22px; font-weight: 800; color: #059669; margin-top: 3px;">${calledCount}</div>
                        <div style="font-family: Arial, sans-serif; font-size: 10px; color: #065f46; margin-top: 2px;">Connected</div>
                      </td>
                      <td width="2%">&nbsp;</td>

                      <!-- Follow-Up Needed -->
                      <td class="kpi-cell" width="23%" bgcolor="#eff6ff" style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 12px 8px; text-align: center;">
                        <div style="font-family: Arial, sans-serif; font-size: 10px; text-transform: uppercase; color: #1d4ed8; font-weight: 700;">FOLLOW-UP</div>
                        <div style="font-family: Arial, sans-serif; font-size: 22px; font-weight: 800; color: #2563eb; margin-top: 3px;">${followUpCount}</div>
                        <div style="font-family: Arial, sans-serif; font-size: 10px; color: #1e40af; margin-top: 2px;">In Progress</div>
                      </td>
                      <td width="2%">&nbsp;</td>

                      <!-- Completed / Closed -->
                      <td class="kpi-cell" width="23%" bgcolor="#f1f5f9" style="background-color: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px 8px; text-align: center;">
                        <div style="font-family: Arial, sans-serif; font-size: 10px; text-transform: uppercase; color: #475569; font-weight: 700;">CLOSED / DONE</div>
                        <div style="font-family: Arial, sans-serif; font-size: 22px; font-weight: 800; color: #334155; margin-top: 3px;">${closedCount}</div>
                        <div style="font-family: Arial, sans-serif; font-size: 10px; color: #64748b; margin-top: 2px;">Finished</div>
                      </td>
                    </tr>
                  </table>

                  <!-- Inquiries Preview Table with Updated Statuses -->
                  <div style="margin-top: 10px;">
                    <div style="font-family: Arial, sans-serif; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #0f172a; margin-bottom: 10px;">
                      Updated Inquiries &amp; Previous Statuses (${previewOrders.length} of ${allOrders.length})
                    </div>
                    ${
                      previewOrders.length === 0
                        ? '<p style="font-family: Arial, sans-serif; font-size: 13px; color: #94a3b8; font-style: italic;">No inquiries logged in the database.</p>'
                        : `
                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; border-collapse: collapse;">
                        <thead>
                          <tr bgcolor="#f8fafc">
                            <th style="padding: 10px 12px; font-family: Arial, sans-serif; font-size: 11px; text-transform: uppercase; color: #64748b; text-align: left; border-bottom: 1px solid #e2e8f0; letter-spacing: 0.04em;">Customer</th>
                            <th style="padding: 10px 12px; font-family: Arial, sans-serif; font-size: 11px; text-transform: uppercase; color: #64748b; text-align: left; border-bottom: 1px solid #e2e8f0; letter-spacing: 0.04em;">Contact</th>
                            <th style="padding: 10px 12px; font-family: Arial, sans-serif; font-size: 11px; text-transform: uppercase; color: #64748b; text-align: left; border-bottom: 1px solid #e2e8f0; letter-spacing: 0.04em;">Service</th>
                            <th style="padding: 10px 12px; font-family: Arial, sans-serif; font-size: 11px; text-transform: uppercase; color: #64748b; text-align: center; border-bottom: 1px solid #e2e8f0; letter-spacing: 0.04em;">Payment</th>
                            <th style="padding: 10px 12px; font-family: Arial, sans-serif; font-size: 11px; text-transform: uppercase; color: #64748b; text-align: center; border-bottom: 1px solid #e2e8f0; letter-spacing: 0.04em;">Call Status</th>
                            <th style="padding: 10px 12px; font-family: Arial, sans-serif; font-size: 11px; text-transform: uppercase; color: #64748b; text-align: right; border-bottom: 1px solid #e2e8f0; letter-spacing: 0.04em;">Time (IST)</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${previewRowsHtml}
                        </tbody>
                      </table>
                    `
                    }
                    ${
                      allOrders.length > previewOrders.length
                        ? `<p style="font-family: Arial, sans-serif; font-size: 11.5px; color: #64748b; margin: 8px 0 0 0;">Showing latest ${previewOrders.length} of ${allOrders.length} total inquiries. All ${allOrders.length} records are attached in <strong>${csvFilename}</strong>.</p>`
                        : ''
                    }
                  </div>

                  <!-- Executive Tip -->
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f8fafc" style="background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; margin-top: 24px;">
                    <tr>
                      <td style="padding: 14px 18px; font-family: Arial, sans-serif; font-size: 12.5px; color: #475569; line-height: 1.5;">
                        💡 <strong>CRM Action Tip:</strong> Review the attached <strong>${csvFilename}</strong> in Excel or Google Sheets to immediately follow up on Warm Leads (Left in Form) and Failed Payments. Call status can be updated live in the Admin Portal.
                      </td>
                    </tr>
                  </table>

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td bgcolor="#f8fafc" style="background-color: #f8fafc; padding: 22px 32px; text-align: center; font-family: Arial, sans-serif; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; line-height: 1.55;">
                  Reddington Global Consultancy Pvt Ltd &middot; Spaze i-Tech Park, Sector 49, Gurugram, Haryana 122018<br/>
                  Automated Executive CRM Dispatch System &middot; Dispatched via sales@reddingtonglobal.com
                </td>
              </tr>

            </table>
            <!--[if (gte mso 9)|(IE)]>
                </td>
              </tr>
            </table>
            <![endif]-->
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  // 7. Dispatch Email if requested
  const recipients = getReportRecipients(customRecipients);
  let emailResult = null;

  if (sendEmail) {
    const transporter = getTransporter();
    if (!transporter) {
      console.warn('[Daily Report] SMTP credentials missing in environment. Running in simulation mode.');
      emailResult = {
        sent: false,
        simulated: true,
        reason: 'SMTP credentials not configured in .env.local',
        recipients,
      };
    } else {
      try {
        const fromAddress =
          process.env.SMTP_FROM ||
          '"Reddington Global Consultancy Pvt Ltd" <sales@reddingtonglobal.com>';

        // Attach BOTH CSV and XLSX files containing all data & updated statuses
        const attachments = [
          {
            filename: csvFilename,
            content: Buffer.from(csvContent, 'utf-8'),
            contentType: 'text/csv; charset=utf-8',
          },
          {
            filename: xlsxFilename,
            content: xlsxBuffer,
            contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          },
        ];

        if (hasLocalLogo) {
          attachments.push({
            filename: 'rgc-logo-opt.png',
            path: logoLocalPath,
            cid: 'rgclogo',
          });
        }

        const info = await transporter.sendMail({
          from: fromAddress,
          to: recipients.join(', '),
          subject: `📊 Daily Leads & Inquiries Report (${allOrders.length} Leads) — ${dateStr} — Reddington Global`,
          html: htmlContent,
          attachments,
        });

        emailResult = {
          sent: true,
          messageId: info.messageId,
          recipients,
        };
      } catch (err) {
        console.error('[Daily Report] Error sending email via SMTP:', err);
        emailResult = {
          sent: false,
          error: err.message,
          recipients,
        };
      }
    }
  }

  return {
    success: true,
    leadCount: allOrders.length,
    recentCount: recentOrders.length,
    metrics: {
      total: allOrders.length,
      paid: totalPaid,
      revenue: totalRevenue,
      failed: totalFailed,
      abandoned: totalAbandoned,
      created: totalCreated,
      pendingCalls,
      calledCount,
      followUpCount,
      noAnswerCount,
      notInterestedCount,
      closedCount,
      recent24h: {
        total: recentOrders.length,
        paid: recentPaid,
        abandoned: recentAbandoned,
        failed: recentFailed,
      },
    },
    filename: csvFilename,
    csvFilename,
    csvContent,
    xlsxFilename,
    xlsxBuffer,
    recipients,
    emailResult,
    generatedAt: now.toISOString(),
  };
}
