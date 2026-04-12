# Revive Holistic Therapies Implementation Status

## Completed in this pass

- Environment-based configuration via `.env.local` and `.env.example`
- MongoDB connection utility and typed collection definitions
- Seed bootstrap for settings, hero slides, services, FAQs, testimonials, and initial admin account
- Session-based authentication foundation using signed cookies
- Protected route checks for `/admin` and `/portal/account` via `proxy.ts`
- Server actions for login, signup, logout, settings update, booking status updates, blocked-date management, enquiry status updates, profile updates, and portal cancel/reschedule flows
- API routes for:
  - current session
  - public booking creation
  - public enquiry creation
  - admin bookings read/update
  - admin settings read/update
  - admin content CRUD for services, hero slides, FAQs, and testimonials
- Public content pages moved onto database-backed read paths with seed fallback
- Booking rules now enforced in application logic:
  - maximum booking horizon
  - minimum notice
  - cancellation window
  - reschedule window
  - blocked date/time handling
  - slot availability checks before booking insert
- Contact form now persists enquiries to MongoDB with a honeypot field and basic rate limiting
- Password reset request and reset flows, with token storage and optional email delivery
- Cookie consent manager and consent-aware analytics loading
- DB-backed editable privacy policy, cookie policy, and terms pages in admin
- Audit logging foundation for key admin and auth actions
- Real embedded Google Map on the homepage
- Schema coverage expanded with organisation, website, FAQ, service, review, and breadcrumb support
- Admin dashboard now includes:
  - booking status management
  - month-view booking calendar and booking filters
  - manual booking creation and CSV export
  - deeper booking edit workflow for date, time, status, payment state, references, and admin notes
  - service, slide, FAQ, and testimonial editing
  - booking rule settings fields
  - availability management for day/time windows, slot intervals, buffers, and practitioner naming
  - blocked date/time management
  - enquiry inbox status handling
  - policy page editing
  - payment log and reconciliation panel with manual payment/refund entries
  - reporting snapshot cards
- Admin media upload workflow for hero slides and service featured images via `/api/admin/uploads`
- Portal account now includes:
  - editable profile details
  - cancellation/reschedule actions
  - rule-aware disable states for late changes
  - payment history list
  - downloadable text receipt flow
- Booking creation now writes payment-log records for deposit/full-payment journeys and sends optional SMTP-backed confirmations/admin alerts
- WhatsApp quick-action links are now present in the header/footer
- Footer CTA content is now settings-backed in the footer component
- Provider-hosted payment flow is now wired into booking:
  - Stripe Checkout session creation
  - GoCardless Billing Request / hosted flow creation
  - booking success / cancelled return pages
  - Stripe and GoCardless webhook endpoints
  - payment sync on hosted-checkout return
- Per-service payment controls now exist for accepted payment methods, full-payment requirements, and pay-later enablement
- Multi-practitioner-aware allocation is now supported through practitioner-specific availability rules and practitioner-labelled slots/bookings
- PDF invoice download is now available in the portal in addition to text receipts
- Admin refund actions now call provider refund logic when provider transaction details and credentials are available
- Static redirect baseline added for common legacy URL variants
- Reminder automation route now exists at `/api/cron/reminders` using configured lead hours
- Admin now includes explicit day/week/month booking views instead of month-only visibility
- Homepage booking CTA content is now settings-backed instead of fixed copy
- Public image rendering moved to `next/image` and the app now passes both `npm run lint` and `npm run build` cleanly

## Still to implement

- More complete media management for galleries and a fuller media-library experience
- Richer SEO field management across all content areas
- Scheduler deployment for reminder automation in production
- Final live credential setup and provider dashboard/webhook configuration for Stripe and GoCardless
- Deeper analytics dashboards and broader conversion event coverage
- Fully editable homepage block system and broader CMS block reordering
- Broader redirect mapping from any real legacy URL inventory
- Full accessibility, contrast, keyboard, and screen-reader QA in-browser for final WCAG signoff

## Seed admin account

- Email defaults to the configured site email
- Password defaults to `ChangeMe123!`
- Change this immediately in production
