import { MediaField } from "@/components/admin/media-field";
import { AdminListDetails, AdminPageHeader, AdminPanel } from "@/components/admin/admin-ui";
import { deleteContentItem, upsertService } from "@/lib/admin-actions";
import { getAllServicesForAdmin } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Admin Services | Revive Holistic Therapies",
  description: "Manage services, pricing, SEO, payment controls, and treatment publishing.",
  path: "/admin/services",
});

export default async function AdminServicesPage() {
  const services = await getAllServicesForAdmin();

  return (
    <>
      <AdminPageHeader
        eyebrow="Services"
        title="Manage treatments in a cleaner list format"
        description="Add new treatments at the top, then edit existing services from a tidy expandable list. Each item keeps pricing, payment rules, SEO, imagery, and status in one place."
      />

      <AdminPanel title="Add service" description="Create a new treatment or therapy offering.">
        <form action={upsertService} className="grid gap-3">
          <input name="title" placeholder="Title" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
          <input name="slug" placeholder="Slug" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
          <input name="category" placeholder="Category" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
          <textarea name="shortDescription" placeholder="Short description" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
          <textarea name="fullDescription" placeholder="Full description" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
          <textarea name="benefits" placeholder="Benefits, one per line" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
          <textarea name="idealFor" placeholder="Ideal for, one per line" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
          <div className="grid gap-3 md:grid-cols-2">
            <input name="durationMinutes" placeholder="Duration in minutes" type="number" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
            <input name="price" placeholder="Price" type="number" step="0.01" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <select name="depositType" defaultValue="percentage" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm">
              <option value="percentage">percentage</option>
              <option value="fixed">fixed</option>
              <option value="none">none</option>
            </select>
            <input name="depositValue" placeholder="Deposit value" type="number" step="0.01" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <select name="paymentMode" defaultValue="deposit" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm">
              <option value="full-online">full-online</option>
              <option value="deposit">deposit</option>
              <option value="pay-later">pay-later</option>
            </select>
            <input name="displayOrder" placeholder="Display order" type="number" defaultValue={services.length + 1} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
          </div>
          <input name="acceptedPaymentMethods" placeholder="stripe, gocardless, clinic" defaultValue="stripe, gocardless, clinic" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
          <div className="grid gap-3 text-sm">
            <label><input name="fullPaymentRequired" type="checkbox" className="mr-2" /> Require full payment</label>
            <label><input name="payLaterEnabled" type="checkbox" defaultChecked className="mr-2" /> Allow pay later</label>
          </div>
          <MediaField
            name="featuredImage"
            label="Featured image"
            placeholder="Paste an image URL or upload a service image"
            helpText="Upload a featured service image or paste an existing path."
          />
          <input name="featuredImageAlt" placeholder="Featured image alt text" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
          <textarea name="galleryImages" placeholder="Gallery items, one per line: /image.jpg | Alt text" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
          <input name="seoTitle" placeholder="SEO title" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
          <textarea name="metaDescription" placeholder="Meta description" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
          <label className="text-sm"><input name="isActive" type="checkbox" defaultChecked className="mr-2" /> Active</label>
          <button type="submit" className="w-fit rounded-full bg-[color:var(--color-accent)] px-4 py-2 text-sm font-semibold text-white">
            Create service
          </button>
        </form>
      </AdminPanel>

      <AdminPanel title="Service list" description="Open a service to edit or delete it.">
        <div className="space-y-4">
          {services.map((service, index) => (
            <AdminListDetails
              key={service._id?.toHexString()}
              summary={service.title}
              meta={`${service.category} | ${service.durationMinutes} mins | GBP ${service.price.toFixed(2)}`}
              defaultOpen={index === 0}
            >
              <form action={upsertService} className="grid gap-3">
                <input type="hidden" name="id" value={service._id?.toHexString()} />
                <input type="hidden" name="collection" value="services" />
                <input name="title" defaultValue={service.title} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                <input name="slug" defaultValue={service.slug} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                <input name="category" defaultValue={service.category} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                <textarea name="shortDescription" defaultValue={service.shortDescription} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                <textarea name="fullDescription" defaultValue={service.fullDescription} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                <textarea name="benefits" defaultValue={service.benefits.join("\n")} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                <textarea name="idealFor" defaultValue={service.idealFor.join("\n")} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                <div className="grid gap-3 md:grid-cols-2">
                  <input name="durationMinutes" type="number" defaultValue={service.durationMinutes} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                  <input name="price" type="number" step="0.01" defaultValue={service.price} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <select name="depositType" defaultValue={service.depositType} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm">
                    <option value="percentage">percentage</option>
                    <option value="fixed">fixed</option>
                    <option value="none">none</option>
                  </select>
                  <input name="depositValue" type="number" step="0.01" defaultValue={service.depositValue} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <select name="paymentMode" defaultValue={service.paymentMode} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm">
                    <option value="full-online">full-online</option>
                    <option value="deposit">deposit</option>
                    <option value="pay-later">pay-later</option>
                  </select>
                  <input name="displayOrder" type="number" defaultValue={service.displayOrder} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                </div>
                <input name="acceptedPaymentMethods" defaultValue={service.acceptedPaymentMethods?.join(", ") ?? "stripe, gocardless, clinic"} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                <div className="grid gap-3 text-sm">
                  <label><input name="fullPaymentRequired" type="checkbox" defaultChecked={service.fullPaymentRequired} className="mr-2" /> Require full payment</label>
                  <label><input name="payLaterEnabled" type="checkbox" defaultChecked={service.payLaterEnabled ?? true} className="mr-2" /> Allow pay later</label>
                </div>
                <MediaField
                  name="featuredImage"
                  label="Featured image"
                  defaultValue={service.featuredImage}
                  placeholder="Paste an image URL or upload a service image"
                  helpText="Upload a replacement image or keep the current path."
                />
                <input name="featuredImageAlt" defaultValue={service.featuredImageAlt} placeholder="Featured image alt text" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                <textarea
                  name="galleryImages"
                  defaultValue={service.galleryImages.map((item) => `${item.url} | ${item.alt}`).join("\n")}
                  placeholder="Gallery items, one per line: /image.jpg | Alt text"
                  className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm"
                />
                <input name="seoTitle" defaultValue={service.seoTitle} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                <textarea name="metaDescription" defaultValue={service.metaDescription} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <label className="text-sm"><input name="isActive" type="checkbox" defaultChecked={service.isActive} className="mr-2" /> Active</label>
                  <div className="flex flex-wrap gap-2">
                    <button type="submit" className="rounded-full bg-[color:var(--color-accent)] px-4 py-2 text-sm font-semibold text-white">Save service</button>
                    <button formAction={deleteContentItem} type="submit" className="rounded-full border border-[color:var(--color-border)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--color-heading)]">Delete</button>
                  </div>
                </div>
              </form>
            </AdminListDetails>
          ))}
        </div>
      </AdminPanel>
    </>
  );
}
