import { AdminListDetails, AdminPageHeader, AdminPanel } from "@/components/admin/admin-ui";
import {
  deleteAvailability,
  deleteBlockedDate,
  updateSettings,
  upsertAvailability,
  upsertBlockedDate,
  upsertPolicyPage,
} from "@/lib/admin-actions";
import { getAvailabilityForAdmin, getBlockedDatesForAdmin, getPolicyPagesForAdmin, getSiteSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Admin Settings | Revive Holistic Therapies",
  description: "Manage business settings, booking rules, availability, blocked dates, and policies.",
  path: "/admin/settings",
});

export default async function AdminSettingsPage() {
  const [settings, blockedDates, availabilityRules, policyPages] = await Promise.all([
    getSiteSettings(),
    getBlockedDatesForAdmin(),
    getAvailabilityForAdmin(),
    getPolicyPagesForAdmin(),
  ]);

  return (
    <>
      <AdminPageHeader
        eyebrow="Settings"
        title="Business settings now live on their own page"
        description="Core business details, booking rules, clinic availability, blackout periods, and policy pages have been grouped here so the operational setup is easier to manage."
      />

      <AdminPanel title="Business settings" description="Update contact details, payment toggles, booking rules, and editable CTA copy.">
        <form action={updateSettings} className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm font-medium">
              Site name
              <input name="siteName" defaultValue={settings?.siteName ?? ""} className="mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-white px-4 py-3 text-[color:var(--color-heading)]" />
            </label>
            <label className="block text-sm font-medium">
              Contact email
              <input name="contactEmail" defaultValue={settings?.contactEmail ?? ""} className="mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-white px-4 py-3 text-[color:var(--color-heading)]" />
            </label>
            <label className="block text-sm font-medium">
              Contact phone
              <input name="contactPhone" defaultValue={settings?.contactPhone ?? ""} className="mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-white px-4 py-3 text-[color:var(--color-heading)]" />
            </label>
            <label className="block text-sm font-medium">
              WhatsApp number
              <input name="whatsappNumber" defaultValue={settings?.contactOptions?.whatsappNumber ?? ""} className="mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-white px-4 py-3 text-[color:var(--color-heading)]" />
            </label>
            <label className="block text-sm font-medium">
              Address line 1
              <input name="addressLine1" defaultValue={settings?.address?.[0] ?? ""} className="mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-white px-4 py-3 text-[color:var(--color-heading)]" />
            </label>
            <label className="block text-sm font-medium">
              Address line 2
              <input name="addressLine2" defaultValue={settings?.address?.[1] ?? ""} className="mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-white px-4 py-3 text-[color:var(--color-heading)]" />
            </label>
            <label className="block text-sm font-medium md:col-span-2">
              Address line 3
              <input name="addressLine3" defaultValue={settings?.address?.[2] ?? ""} className="mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-white px-4 py-3 text-[color:var(--color-heading)]" />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm font-medium">
              Title template
              <input name="titleTemplate" defaultValue={settings?.seoDefaults?.titleTemplate ?? "%s | Revive Holistic Therapies"} className="mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-white px-4 py-3 text-[color:var(--color-heading)]" />
            </label>
            <label className="block text-sm font-medium">
              Local areas
              <input name="localAreas" defaultValue={settings?.seoDefaults?.localAreas?.join(", ") ?? ""} className="mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-white px-4 py-3 text-[color:var(--color-heading)]" />
            </label>
            <label className="block text-sm font-medium md:col-span-2">
              Default description
              <textarea name="defaultDescription" defaultValue={settings?.seoDefaults?.defaultDescription ?? ""} className="mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-white px-4 py-3 text-[color:var(--color-heading)]" />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm font-medium">
              Default payment method
              <select name="defaultMethod" defaultValue={settings?.paymentSettings?.defaultMethod ?? "Stripe"} className="mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-white px-4 py-3 text-[color:var(--color-heading)]">
                <option value="Stripe">Stripe</option>
                <option value="GoCardless">GoCardless</option>
                <option value="Pay on arrival">Pay on arrival</option>
              </select>
            </label>
            <label className="block text-sm font-medium">
              Default deposit value
              <input name="defaultDepositValue" type="number" min="0" step="0.01" defaultValue={settings?.paymentSettings?.defaultDepositValue ?? 25} className="mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-white px-4 py-3 text-[color:var(--color-heading)]" />
            </label>
            <label className="block text-sm font-medium">
              Deposit mode
              <select name="depositCollectionMode" defaultValue={settings?.paymentSettings?.depositCollectionMode ?? "service"} className="mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-white px-4 py-3 text-[color:var(--color-heading)]">
                <option value="service">Per service</option>
                <option value="fixed">Fixed default</option>
                <option value="percentage">Percentage default</option>
              </select>
            </label>
            <label className="block text-sm font-medium">
              Booking horizon (days)
              <input name="maximumBookingHorizonDays" type="number" min="1" defaultValue={settings?.bookingSettings?.maximumBookingHorizonDays ?? 90} className="mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-white px-4 py-3 text-[color:var(--color-heading)]" />
            </label>
            <label className="block text-sm font-medium">
              Minimum notice (hours)
              <input name="minimumNoticeHours" type="number" min="0" defaultValue={settings?.bookingSettings?.minimumNoticeHours ?? 12} className="mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-white px-4 py-3 text-[color:var(--color-heading)]" />
            </label>
            <label className="block text-sm font-medium">
              Cancellation window (hours)
              <input name="cancellationWindowHours" type="number" min="0" defaultValue={settings?.bookingSettings?.cancellationWindowHours ?? 24} className="mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-white px-4 py-3 text-[color:var(--color-heading)]" />
            </label>
            <label className="block text-sm font-medium">
              Reschedule window (hours)
              <input name="rescheduleWindowHours" type="number" min="0" defaultValue={settings?.bookingSettings?.rescheduleWindowHours ?? 24} className="mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-white px-4 py-3 text-[color:var(--color-heading)]" />
            </label>
          </div>

          <div className="grid gap-3 text-sm md:grid-cols-2">
            <label><input name="stripeEnabled" type="checkbox" defaultChecked={settings?.paymentSettings?.stripeEnabled ?? true} className="mr-2" /> Stripe enabled</label>
            <label><input name="goCardlessEnabled" type="checkbox" defaultChecked={settings?.paymentSettings?.goCardlessEnabled ?? true} className="mr-2" /> GoCardless enabled</label>
            <label><input name="payLaterEnabled" type="checkbox" defaultChecked={settings?.paymentSettings?.payLaterEnabled ?? true} className="mr-2" /> Pay later enabled</label>
            <label><input name="refundSupport" type="checkbox" defaultChecked={settings?.paymentSettings?.refundSupport ?? true} className="mr-2" /> Refund support enabled</label>
            <label><input name="whatsappEnabled" type="checkbox" defaultChecked={settings?.contactOptions?.whatsappEnabled ?? true} className="mr-2" /> WhatsApp CTA enabled</label>
            <label><input name="bookingConfirmationEnabled" type="checkbox" defaultChecked={settings?.emailSettings?.bookingConfirmationEnabled ?? true} className="mr-2" /> Booking confirmation emails enabled</label>
            <label><input name="paymentEmailsEnabled" type="checkbox" defaultChecked={settings?.emailSettings?.paymentEmailsEnabled ?? true} className="mr-2" /> Payment emails enabled</label>
            <label><input name="adminCancelledBookingNotifications" type="checkbox" defaultChecked={settings?.emailSettings?.adminCancelledBookingNotifications ?? true} className="mr-2" /> Cancelled booking admin notifications</label>
            <label><input name="adminFailedPaymentNotifications" type="checkbox" defaultChecked={settings?.emailSettings?.adminFailedPaymentNotifications ?? true} className="mr-2" /> Failed payment admin notifications</label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm font-medium">
              Sender name
              <input name="senderName" defaultValue={settings?.emailSettings?.senderName ?? settings?.siteName ?? ""} className="mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-white px-4 py-3 text-[color:var(--color-heading)]" />
            </label>
            <label className="block text-sm font-medium">
              Sender email
              <input name="senderEmail" defaultValue={settings?.emailSettings?.senderEmail ?? settings?.contactEmail ?? ""} className="mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-white px-4 py-3 text-[color:var(--color-heading)]" />
            </label>
            <label className="block text-sm font-medium md:col-span-2">
              Notification recipients
              <input name="notificationRecipients" defaultValue={settings?.emailSettings?.notificationRecipients?.join(", ") ?? settings?.contactEmail ?? ""} className="mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-white px-4 py-3 text-[color:var(--color-heading)]" />
            </label>
            <label className="block text-sm font-medium">
              Reminder lead hours
              <input name="reminderLeadHours" type="number" min="1" defaultValue={settings?.emailSettings?.reminderLeadHours ?? 24} className="mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-white px-4 py-3 text-[color:var(--color-heading)]" />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm font-medium">
              Booking confirmation template
              <textarea name="bookingConfirmationTemplate" defaultValue={settings?.emailSettings?.bookingConfirmationTemplate ?? ""} className="mt-2 min-h-28 w-full rounded-2xl border border-[color:var(--color-border)] bg-white px-4 py-3 text-[color:var(--color-heading)]" />
            </label>
            <label className="block text-sm font-medium">
              Payment confirmation template
              <textarea name="paymentConfirmationTemplate" defaultValue={settings?.emailSettings?.paymentConfirmationTemplate ?? ""} className="mt-2 min-h-28 w-full rounded-2xl border border-[color:var(--color-border)] bg-white px-4 py-3 text-[color:var(--color-heading)]" />
            </label>
            <label className="block text-sm font-medium md:col-span-2">
              Admin notification template
              <textarea name="adminNotificationTemplate" defaultValue={settings?.emailSettings?.adminNotificationTemplate ?? ""} className="mt-2 min-h-28 w-full rounded-2xl border border-[color:var(--color-border)] bg-white px-4 py-3 text-[color:var(--color-heading)]" />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm font-medium">
              Homepage CTA title
              <input name="homepageCtaTitle" defaultValue={settings?.homepageCta?.title ?? ""} className="mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-white px-4 py-3 text-[color:var(--color-heading)]" />
            </label>
            <label className="block text-sm font-medium">
              Homepage CTA primary text
              <input name="homepageCtaPrimaryText" defaultValue={settings?.homepageCta?.primaryText ?? ""} className="mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-white px-4 py-3 text-[color:var(--color-heading)]" />
            </label>
            <label className="block text-sm font-medium md:col-span-2">
              Homepage CTA body
              <textarea name="homepageCtaBody" defaultValue={settings?.homepageCta?.body ?? ""} className="mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-white px-4 py-3 text-[color:var(--color-heading)]" />
            </label>
            <label className="block text-sm font-medium">
              Homepage CTA primary link
              <input name="homepageCtaPrimaryLink" defaultValue={settings?.homepageCta?.primaryLink ?? "/booking"} className="mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-white px-4 py-3 text-[color:var(--color-heading)]" />
            </label>
            <label className="block text-sm font-medium">
              Homepage CTA secondary text
              <input name="homepageCtaSecondaryText" defaultValue={settings?.homepageCta?.secondaryText ?? ""} className="mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-white px-4 py-3 text-[color:var(--color-heading)]" />
            </label>
            <label className="block text-sm font-medium md:col-span-2">
              Homepage CTA secondary link
              <input name="homepageCtaSecondaryLink" defaultValue={settings?.homepageCta?.secondaryLink ?? "/portal/account"} className="mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-white px-4 py-3 text-[color:var(--color-heading)]" />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm font-medium">
              Footer CTA title
              <input name="footerCtaTitle" defaultValue={settings?.footerCta?.title ?? ""} className="mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-white px-4 py-3 text-[color:var(--color-heading)]" />
            </label>
            <label className="block text-sm font-medium">
              Footer CTA button text
              <input name="footerCtaButtonText" defaultValue={settings?.footerCta?.buttonText ?? ""} className="mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-white px-4 py-3 text-[color:var(--color-heading)]" />
            </label>
            <label className="block text-sm font-medium md:col-span-2">
              Footer CTA body
              <textarea name="footerCtaBody" defaultValue={settings?.footerCta?.body ?? ""} className="mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-white px-4 py-3 text-[color:var(--color-heading)]" />
            </label>
            <label className="block text-sm font-medium md:col-span-2">
              Footer CTA link
              <input name="footerCtaButtonLink" defaultValue={settings?.footerCta?.buttonLink ?? "/contact"} className="mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-white px-4 py-3 text-[color:var(--color-heading)]" />
            </label>
          </div>

          <button type="submit" className="w-fit rounded-full bg-[color:var(--color-accent)] px-5 py-3 text-sm font-semibold text-white">
            Save settings
          </button>
        </form>
      </AdminPanel>

      <div className="grid gap-6 xl:grid-cols-2">
        <AdminPanel title="Blocked dates and times" description="Add blackout periods, then manage them from a simple list.">
          <div className="space-y-5">
            <form action={upsertBlockedDate} className="rounded-[1.5rem] bg-[color:var(--color-surface)] p-5">
              <p className="font-semibold text-[color:var(--color-heading)]">Add blocked period</p>
              <div className="mt-4 grid gap-3">
                <input name="startDateTime" type="datetime-local" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                <input name="endDateTime" type="datetime-local" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                <input name="reason" placeholder="Reason" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                <button type="submit" className="w-fit rounded-full bg-[color:var(--color-accent)] px-4 py-2 text-sm font-semibold text-white">Add blocked period</button>
              </div>
            </form>
            <div className="space-y-4">
              {blockedDates.length ? (
                blockedDates.map((item, index) => (
                  <AdminListDetails
                    key={item._id?.toHexString()}
                    summary={item.reason}
                    meta={`${new Date(item.startDateTime).toLocaleString("en-GB")} to ${new Date(item.endDateTime).toLocaleString("en-GB")}`}
                    defaultOpen={index === 0}
                  >
                    <form action={upsertBlockedDate} className="grid gap-3">
                      <input type="hidden" name="id" value={item._id?.toHexString()} />
                      <input name="startDateTime" type="datetime-local" defaultValue={new Date(item.startDateTime).toISOString().slice(0, 16)} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                      <input name="endDateTime" type="datetime-local" defaultValue={new Date(item.endDateTime).toISOString().slice(0, 16)} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                      <input name="reason" defaultValue={item.reason} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                      <div className="flex flex-wrap gap-2">
                        <button type="submit" className="rounded-full bg-[color:var(--color-accent)] px-4 py-2 text-sm font-semibold text-white">Save</button>
                        <button formAction={deleteBlockedDate} type="submit" className="rounded-full border border-[color:var(--color-border)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--color-heading)]">Delete</button>
                      </div>
                    </form>
                  </AdminListDetails>
                ))
              ) : (
                <p className="text-sm text-[color:var(--color-text-muted)]">No blocked periods configured yet.</p>
              )}
            </div>
          </div>
        </AdminPanel>

        <AdminPanel title="Availability management" description="Add practitioner availability and maintain it from a tidy list view.">
          <div className="space-y-5">
            <form action={upsertAvailability} className="rounded-[1.5rem] bg-[color:var(--color-surface)] p-5">
              <p className="font-semibold text-[color:var(--color-heading)]">Add practitioner availability</p>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <input name="practitionerName" placeholder="Practitioner name" defaultValue="Primary therapist" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                <select name="dayOfWeek" defaultValue="1" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm">
                  {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day, index) => (
                    <option key={day} value={index}>
                      {day}
                    </option>
                  ))}
                </select>
                <input name="startTime" type="time" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                <input name="endTime" type="time" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                <input name="slotInterval" type="number" defaultValue="15" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                <input name="bufferBefore" type="number" defaultValue="0" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                <input name="bufferAfter" type="number" defaultValue="15" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                <label className="text-sm"><input name="isActive" type="checkbox" defaultChecked className="mr-2" /> Active</label>
              </div>
              <button type="submit" className="mt-4 rounded-full bg-[color:var(--color-accent)] px-4 py-2 text-sm font-semibold text-white">Add availability</button>
            </form>
            <div className="space-y-4">
              {availabilityRules.map((rule, index) => (
                <AdminListDetails
                  key={rule._id?.toHexString()}
                  summary={rule.practitionerName ?? "Primary therapist"}
                  meta={`${["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][rule.dayOfWeek]} | ${rule.startTime}-${rule.endTime}`}
                  defaultOpen={index === 0}
                >
                  <form action={upsertAvailability} className="grid gap-3 md:grid-cols-2">
                    <input type="hidden" name="id" value={rule._id?.toHexString()} />
                    <input name="practitionerName" defaultValue={rule.practitionerName ?? "Primary therapist"} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                    <select name="dayOfWeek" defaultValue={String(rule.dayOfWeek)} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm">
                      {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day, idx) => (
                        <option key={day} value={idx}>
                          {day}
                        </option>
                      ))}
                    </select>
                    <input name="startTime" type="time" defaultValue={rule.startTime} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                    <input name="endTime" type="time" defaultValue={rule.endTime} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                    <input name="slotInterval" type="number" defaultValue={rule.slotInterval} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                    <input name="bufferBefore" type="number" defaultValue={rule.bufferBefore} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                    <input name="bufferAfter" type="number" defaultValue={rule.bufferAfter} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                    <label className="text-sm"><input name="isActive" type="checkbox" defaultChecked={rule.isActive} className="mr-2" /> Active</label>
                    <div className="md:col-span-2 flex flex-wrap gap-2">
                      <button type="submit" className="rounded-full bg-[color:var(--color-accent)] px-4 py-2 text-sm font-semibold text-white">Save</button>
                      <button formAction={deleteAvailability} type="submit" className="rounded-full border border-[color:var(--color-border)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--color-heading)]">Delete</button>
                    </div>
                  </form>
                </AdminListDetails>
              ))}
            </div>
          </div>
        </AdminPanel>
      </div>

      <AdminPanel title="Policy pages" description="Edit privacy, cookie, and terms content from one place.">
        <div className="space-y-4">
          {policyPages.map((policyPage, index) => (
            <AdminListDetails key={policyPage.slug} summary={policyPage.title} meta={policyPage.slug} defaultOpen={index === 0}>
              <form action={upsertPolicyPage} className="grid gap-3">
                <input type="hidden" name="slug" value={policyPage.slug} />
                <input name="title" defaultValue={policyPage.title} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                <textarea name="description" defaultValue={policyPage.description} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                <textarea
                  name="content"
                  defaultValue={policyPage.content.join("\n\n")}
                  className="min-h-52 rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm"
                />
                <button type="submit" className="w-fit rounded-full bg-[color:var(--color-accent)] px-4 py-2 text-sm font-semibold text-white">
                  Save {policyPage.title}
                </button>
              </form>
            </AdminListDetails>
          ))}
        </div>
      </AdminPanel>
    </>
  );
}
