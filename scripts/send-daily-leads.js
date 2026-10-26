#!/usr/bin/env node

/**
 * Standalone CLI runner to trigger 24-hour lead report and email dispatch.
 * Can be executed on demand or scheduled via Linux Crontab / Windows Task Scheduler.
 *
 * Example Crontab Entry (Runs daily at 10:00 AM IST):
 * 0 10 * * * cd /path/to/repo && /usr/bin/node scripts/send-daily-leads.js >> /var/log/leads-cron.log 2>&1
 */

const fs = require('fs');
const path = require('path');

// Manually load .env.local if running in standalone mode outside Next.js
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

async function run() {
  console.log(`[${new Date().toISOString()}] Starting Daily Leads Report Job...`);

  // Dynamically import ES Module
  const { generateDailyLeadsReport } = await import('../lib/reports/dailyLeadsReport.js');

  const result = await generateDailyLeadsReport({ sendEmail: true });

  console.log('✅ Daily Leads Report Finished:');
  console.log(`- Total Leads: ${result.leadCount}`);
  console.log(`- Paid Bookings: ${result.metrics.paid} (₹${result.metrics.revenue})`);
  console.log(`- Left in Form: ${result.metrics.abandoned}`);
  console.log(`- Failed Payments: ${result.metrics.failed}`);
  console.log(`- Gateway Created: ${result.metrics.created}`);
  console.log(`- Recipients: ${result.recipients.join(', ')}`);
  console.log(`- Attached File: ${result.filename}`);
  console.log(`- Email Status:`, result.emailResult);

  process.exit(0);
}

run().catch((err) => {
  console.error('❌ Daily Leads Report Failed:', err);
  process.exit(1);
});
