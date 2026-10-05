/**
 * Returns formatted Indian Standard Time (IST) string.
 * Example: "05 Oct 2026, 01:45:20 PM IST"
 */
export function getISTTimestamp(date = new Date()) {
  const d = date ? new Date(date) : new Date();
  if (isNaN(d.getTime())) return '';
  return (
    new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).format(d) + ' IST'
  );
}
