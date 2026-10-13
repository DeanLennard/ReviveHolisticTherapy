/**
 * Temporarily unavailable services. Change this value to `true` to restore
 * Lomi Lomi Massage everywhere it is surfaced on the public site.
 */
export const lomiLomiMassageIsAvailable = false;

export function isServiceAvailable(slug: string) {
  return slug !== "lomi-lomi-massage" || lomiLomiMassageIsAvailable;
}
