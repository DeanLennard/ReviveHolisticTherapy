import Image from "next/image";

import { MediaField } from "@/components/admin/media-field";
import { AdminListDetails, AdminPageHeader, AdminPanel } from "@/components/admin/admin-ui";
import { deleteContentItem, moveHeroSlide, upsertFaq, upsertHeroSlide, upsertTestimonial } from "@/lib/admin-actions";
import { getAllFaqsForAdmin, getAllHeroSlidesFromDb, getAllTestimonialsForAdmin } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Admin Content | Revive Holistic Therapies",
  description: "Manage hero slides, FAQs, and testimonials from dedicated admin sections.",
  path: "/admin/content",
});

export default async function AdminContentPage() {
  const [slides, faqs, testimonials] = await Promise.all([
    getAllHeroSlidesFromDb(),
    getAllFaqsForAdmin(),
    getAllTestimonialsForAdmin(),
  ]);

  return (
    <>
      <AdminPageHeader
        eyebrow="Content"
        title="Content editing is now split into clearer lists"
        description="Homepage slides, FAQs, and testimonials each have their own add form and expandable edit list, which makes routine content management much easier to follow."
      />

      <AdminPanel title="Hero carousel" description="Add, reorder, activate, edit, and delete homepage slides.">
        <div className="space-y-5">
          <form action={upsertHeroSlide} className="rounded-[1.5rem] bg-[color:var(--color-surface)] p-5">
            <p className="font-semibold text-[color:var(--color-heading)]">Add slide</p>
            <div className="mt-4 grid gap-3">
              <input name="eyebrow" placeholder="Eyebrow" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
              <input name="title" placeholder="Title" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
              <textarea name="subtitle" placeholder="Subtitle" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
              <div className="grid gap-3 md:grid-cols-2">
                <input name="primaryCtaText" placeholder="Primary CTA text" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                <input name="primaryCtaLink" placeholder="/booking" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <input name="secondaryCtaText" placeholder="Secondary CTA text" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                <input name="secondaryCtaLink" placeholder="/treatments" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
              </div>
              <MediaField
                name="imageUrl"
                label="Slide image"
                placeholder="Paste an image URL or upload a slide image"
                helpText="Upload a homepage image or paste an existing path."
              />
              <input name="imageAlt" placeholder="Image alt text" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
              <div className="flex flex-wrap items-center gap-3">
                <input name="displayOrder" type="number" defaultValue={slides.length + 1} className="w-28 rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                <label className="text-sm"><input name="isActive" type="checkbox" defaultChecked className="mr-2" /> Active</label>
                <button type="submit" className="rounded-full bg-[color:var(--color-accent)] px-4 py-2 text-sm font-semibold text-white">Create slide</button>
              </div>
            </div>
          </form>

          <div className="space-y-4">
            {slides.map((slide, index) => (
              <AdminListDetails
                key={slide._id?.toHexString()}
                summary={slide.title}
                meta={`Order ${slide.displayOrder} | ${slide.isActive ? "Active" : "Inactive"}`}
                defaultOpen={index === 0}
              >
                <form action={upsertHeroSlide} className="grid gap-3">
                  <input type="hidden" name="id" value={slide._id?.toHexString()} />
                  <input type="hidden" name="collection" value="heroSlides" />
                  <input name="eyebrow" defaultValue={slide.eyebrow} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                  <input name="title" defaultValue={slide.title} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                  <textarea name="subtitle" defaultValue={slide.subtitle} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                  <div className="grid gap-3 md:grid-cols-2">
                    <input name="primaryCtaText" defaultValue={slide.primaryCtaText} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                    <input name="primaryCtaLink" defaultValue={slide.primaryCtaLink} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <input name="secondaryCtaText" defaultValue={slide.secondaryCtaText} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                    <input name="secondaryCtaLink" defaultValue={slide.secondaryCtaLink} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                  </div>
                  <MediaField
                    name="imageUrl"
                    label="Slide image"
                    defaultValue={slide.imageUrl}
                    placeholder="Paste an image URL or upload a slide image"
                    helpText="Upload a replacement image or keep the current path."
                  />
                  <input name="imageAlt" defaultValue={slide.imageAlt} placeholder="Image alt" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                  {slide.imageUrl ? (
                    <div className="overflow-hidden rounded-[1.25rem] border border-[color:var(--color-border)] bg-white">
                      <div className="relative h-40 w-full">
                        <Image
                          src={slide.imageUrl}
                          alt={slide.imageAlt || slide.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 600px"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  ) : null}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <input name="displayOrder" type="number" defaultValue={slide.displayOrder} className="w-28 rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                      <label className="text-sm"><input name="isActive" type="checkbox" defaultChecked={slide.isActive} className="mr-2" /> Active</label>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button type="submit" className="rounded-full bg-[color:var(--color-accent)] px-4 py-2 text-sm font-semibold text-white">Save slide</button>
                      <button formAction={deleteContentItem} type="submit" className="rounded-full border border-[color:var(--color-border)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--color-heading)]">Delete</button>
                    </div>
                  </div>
                </form>
                <div className="mt-3 flex flex-wrap gap-2">
                  <form action={moveHeroSlide}>
                    <input type="hidden" name="id" value={slide._id?.toHexString()} />
                    <input type="hidden" name="direction" value="up" />
                    <button type="submit" className="rounded-full border border-[color:var(--color-border)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--color-heading)]">
                      Move up
                    </button>
                  </form>
                  <form action={moveHeroSlide}>
                    <input type="hidden" name="id" value={slide._id?.toHexString()} />
                    <input type="hidden" name="direction" value="down" />
                    <button type="submit" className="rounded-full border border-[color:var(--color-border)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--color-heading)]">
                      Move down
                    </button>
                  </form>
                </div>
              </AdminListDetails>
            ))}
          </div>
        </div>
      </AdminPanel>

      <div className="grid gap-6 xl:grid-cols-2">
        <AdminPanel title="FAQs" description="Add and maintain frequently asked questions.">
          <div className="space-y-5">
            <form action={upsertFaq} className="rounded-[1.5rem] bg-[color:var(--color-surface)] p-5">
              <p className="font-semibold text-[color:var(--color-heading)]">Add FAQ</p>
              <div className="mt-4 grid gap-3">
                <input name="question" placeholder="Question" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                <textarea name="answer" placeholder="Answer" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                <div className="grid gap-3 md:grid-cols-2">
                  <input name="category" placeholder="Category" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                  <input name="displayOrder" type="number" defaultValue={faqs.length + 1} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                </div>
                <label className="text-sm"><input name="isActive" type="checkbox" defaultChecked className="mr-2" /> Active</label>
                <button type="submit" className="w-fit rounded-full bg-[color:var(--color-accent)] px-4 py-2 text-sm font-semibold text-white">Create FAQ</button>
              </div>
            </form>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <AdminListDetails
                  key={faq._id?.toHexString()}
                  summary={faq.question}
                  meta={`${faq.category} | ${faq.isActive ? "Active" : "Inactive"}`}
                  defaultOpen={index === 0}
                >
                  <form action={upsertFaq} className="grid gap-3">
                    <input type="hidden" name="id" value={faq._id?.toHexString()} />
                    <input type="hidden" name="collection" value="faqs" />
                    <input name="question" defaultValue={faq.question} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                    <textarea name="answer" defaultValue={faq.answer} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                    <div className="grid gap-3 md:grid-cols-2">
                      <input name="category" defaultValue={faq.category} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                      <input name="displayOrder" type="number" defaultValue={faq.displayOrder} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <label className="text-sm"><input name="isActive" type="checkbox" defaultChecked={faq.isActive} className="mr-2" /> Active</label>
                      <div className="flex flex-wrap gap-2">
                        <button type="submit" className="rounded-full bg-[color:var(--color-accent)] px-4 py-2 text-sm font-semibold text-white">Save FAQ</button>
                        <button formAction={deleteContentItem} type="submit" className="rounded-full border border-[color:var(--color-border)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--color-heading)]">Delete</button>
                      </div>
                    </div>
                  </form>
                </AdminListDetails>
              ))}
            </div>
          </div>
        </AdminPanel>

        <AdminPanel title="Testimonials" description="Approve, edit, and remove client reviews.">
          <div className="space-y-5">
            <form action={upsertTestimonial} className="rounded-[1.5rem] bg-[color:var(--color-surface)] p-5">
              <p className="font-semibold text-[color:var(--color-heading)]">Add testimonial</p>
              <div className="mt-4 grid gap-3">
                <div className="grid gap-3 md:grid-cols-2">
                  <input name="customerName" placeholder="Customer name" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                  <input name="source" placeholder="Source" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                </div>
                <textarea name="content" placeholder="Review content" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                <div className="grid gap-3 md:grid-cols-2">
                  <input name="rating" type="number" min="1" max="5" defaultValue="5" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                  <input name="displayOrder" type="number" defaultValue={testimonials.length + 1} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                </div>
                <label className="text-sm"><input name="approved" type="checkbox" defaultChecked className="mr-2" /> Approved</label>
                <button type="submit" className="w-fit rounded-full bg-[color:var(--color-accent)] px-4 py-2 text-sm font-semibold text-white">Create testimonial</button>
              </div>
            </form>
            <div className="space-y-4">
              {testimonials.map((testimonial, index) => (
                <AdminListDetails
                  key={testimonial._id?.toHexString()}
                  summary={testimonial.customerName}
                  meta={`${testimonial.source} | ${testimonial.rating}/5`}
                  defaultOpen={index === 0}
                >
                  <form action={upsertTestimonial} className="grid gap-3">
                    <input type="hidden" name="id" value={testimonial._id?.toHexString()} />
                    <input type="hidden" name="collection" value="testimonials" />
                    <div className="grid gap-3 md:grid-cols-2">
                      <input name="customerName" defaultValue={testimonial.customerName} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                      <input name="source" defaultValue={testimonial.source} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                    </div>
                    <textarea name="content" defaultValue={testimonial.content} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                    <div className="grid gap-3 md:grid-cols-2">
                      <input name="rating" type="number" min="1" max="5" defaultValue={testimonial.rating} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                      <input name="displayOrder" type="number" defaultValue={testimonial.displayOrder} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <label className="text-sm"><input name="approved" type="checkbox" defaultChecked={testimonial.approved} className="mr-2" /> Approved</label>
                      <div className="flex flex-wrap gap-2">
                        <button type="submit" className="rounded-full bg-[color:var(--color-accent)] px-4 py-2 text-sm font-semibold text-white">Save review</button>
                        <button formAction={deleteContentItem} type="submit" className="rounded-full border border-[color:var(--color-border)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--color-heading)]">Delete</button>
                      </div>
                    </div>
                  </form>
                </AdminListDetails>
              ))}
            </div>
          </div>
        </AdminPanel>
      </div>
    </>
  );
}
