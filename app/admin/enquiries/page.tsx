import { AdminListDetails, AdminPageHeader, AdminPanel, AdminStatCard, AdminStatGrid } from "@/components/admin/admin-ui";
import { updateEnquiryStatus } from "@/lib/admin-actions";
import { getEnquiriesForAdmin } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Admin Enquiries | Revive Holistic Therapies",
  description: "Manage contact form enquiries and follow-up status.",
  path: "/admin/enquiries",
});

export default async function AdminEnquiriesPage() {
  const enquiries = await getEnquiriesForAdmin();

  return (
    <>
      <AdminPageHeader
        eyebrow="Enquiries"
        title="Enquiries now have their own inbox page"
        description="This keeps message handling separate from bookings and settings so follow-up is simpler and more focused."
      />

      <AdminStatGrid>
        <AdminStatCard label="Total enquiries" value={String(enquiries.length)} helper="All saved contact submissions" />
        <AdminStatCard label="New" value={String(enquiries.filter((enquiry) => enquiry.status === "new").length)} helper="Needs first response" />
        <AdminStatCard label="Responded" value={String(enquiries.filter((enquiry) => enquiry.status === "responded").length)} helper="Already followed up" />
        <AdminStatCard label="Archived" value={String(enquiries.filter((enquiry) => enquiry.status === "archived").length)} helper="Closed or filed away" />
      </AdminStatGrid>

      <AdminPanel title="Enquiry inbox" description="Expand a message to review it and update the status.">
        <div className="space-y-4">
          {enquiries.length ? (
            enquiries.map((enquiry, index) => (
              <AdminListDetails
                key={enquiry._id?.toHexString()}
                summary={enquiry.subject}
                meta={`${enquiry.name} | ${enquiry.status}`}
                defaultOpen={index === 0}
              >
                <div className="space-y-4">
                  <div className="grid gap-2 text-sm text-[color:var(--color-text-muted)]">
                    <p>Name: {enquiry.name}</p>
                    <p>Email: {enquiry.email}</p>
                    <p>Phone: {enquiry.phone}</p>
                    <p>Received: {new Date(enquiry.createdAt).toLocaleString("en-GB")}</p>
                    <p className="rounded-[1.25rem] bg-white p-4 leading-6">{enquiry.message}</p>
                  </div>
                  <form action={updateEnquiryStatus} className="flex flex-wrap items-center gap-3">
                    <input type="hidden" name="enquiryId" value={enquiry._id?.toHexString()} />
                    <select name="status" defaultValue={enquiry.status} className="rounded-full border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm">
                      {["new", "read", "responded", "archived"].map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                    <button type="submit" className="rounded-full bg-[color:var(--color-accent)] px-4 py-2 text-sm font-semibold text-white">
                      Save status
                    </button>
                  </form>
                </div>
              </AdminListDetails>
            ))
          ) : (
            <p className="text-sm text-[color:var(--color-text-muted)]">No enquiries received yet.</p>
          )}
        </div>
      </AdminPanel>
    </>
  );
}
