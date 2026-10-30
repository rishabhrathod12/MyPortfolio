/** Formats an ISO date (YYYY-MM-DD) as e.g. "30 October 2026", independent of the viewer's time zone. */
export function formatIsoDate(iso: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${iso}T00:00:00Z`))
}
