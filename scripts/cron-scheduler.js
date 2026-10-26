#!/usr/bin/env node

/**
 * Reddington Global — Daily 10:00 AM IST Cron Scheduler Daemon
 *
 * Runs as a persistent companion service alongside Next.js under PM2:
 * pm2 start scripts/cron-scheduler.js --name "reddington-cron"
 *
 * Automatically triggers the daily 24-hour leads report every day at exactly 10:00 AM IST (Asia/Kolkata).
 */

const fs = require('fs');
const path = require('path');

// Manually load .env.local
const envPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const idx = trimmed.indexOf('=');
      const key = trimmed.substring(0, idx).trim();
      const val = trimmed.substring(idx + 1).trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  });
}

let isRunning = false;
let lastRunDate = '';

async function triggerDailyReport() {
  if (isRunning) return;
  isRunning = true;
  console.log(`\n======================================================`);
  console.log(`[${new Date().toISOString()}] 🚀 Triggering Scheduled 10:00 AM IST Report...`);
  console.log(`======================================================`);

  try {
    const { generateDailyLeadsReport } = await import('../lib/reports/dailyLeadsReport.js');
    const result = await generateDailyLeadsReport({ sendEmail: true });

    console.log(`✅ [${new Date().toISOString()}] Daily Leads Report Completed Successfully:`);
    console.log(`- Total Leads: ${result.leadCount}`);
    console.log(`- Paid Bookings: ${result.metrics.paid} (₹${result.metrics.revenue})`);
    console.log(`- Left in Form: ${result.metrics.abandoned}`);
    console.log(`- Failed Payments: ${result.metrics.failed}`);
    console.log(`- Recipients: ${result.recipients.join(', ')}`);
    console.log(`- Email Status:`, result.emailResult);
  } catch (err) {
    console.error(`❌ [${new Date().toISOString()}] Error in scheduled report:`, err);
  } finally {
    isRunning = false;
  }
}

function checkSchedule() {
  // Get current Indian Standard Time (IST)
  const istFormatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const parts = istFormatter.formatToParts(new Date());
  const map = {};
  parts.forEach((p) => {
    map[p.type] = p.value;
  });

  const todayStr = `${map.year}-${map.month}-${map.day}`;
  const hour = parseInt(map.hour, 10);
  const minute = parseInt(map.minute, 10);

  // Trigger at 10:00 AM IST
  if (hour === 10 && minute === 0 && lastRunDate !== todayStr) {
    lastRunDate = todayStr;
    triggerDailyReport();
  }
}

console.log('------------------------------------------------------------');
console.log('🕒 Reddington Global Lead Report Cron Daemon Initialized');
console.log('⏰ Scheduled to run daily at 10:00 AM IST (Asia/Kolkata)');
console.log('👥 Recipients: Jyotsana Bora, Vishal Bora, sales@reddingtonglobal.com');
console.log('------------------------------------------------------------');

// Check every 25 seconds for the 10:00 AM IST mark
setInterval(checkSchedule, 25000);
checkSchedule();
