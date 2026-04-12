"use client";

import { useState } from "react";

import { trackEvent } from "@/components/analytics";

const initialState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  consent: true,
  website: "",
};

export function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");

    const response = await fetch("/api/enquiries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.error ?? "We could not send your enquiry. Please try again.");
      setSubmitting(false);
      return;
    }

    setMessage("Your enquiry has been sent. We will get back to you as soon as possible.");
    trackEvent("enquiry_form_submitted", {
      subject: form.subject,
    });
    setForm(initialState);
    setSubmitting(false);
  }

  function updateField<K extends keyof typeof initialState>(key: K, value: (typeof initialState)[K]) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[2rem] border border-[color:var(--color-border)] bg-white p-8 shadow-[var(--shadow-soft)]">
      <p className="eyebrow">Send a message</p>
      <h2 className="mt-5 font-display text-3xl font-semibold">Send a message</h2>
      <p className="mt-4 text-base leading-7 text-[color:var(--color-text-muted)]">
        If you have a question or would like help choosing the right treatment, send us a message and we will get back to you as soon as possible.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <label className="text-sm font-medium text-[color:var(--color-heading)]">
          Name
          <input
            type="text"
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            required
            className="focus-ring mt-2 w-full rounded-2xl border border-[color:var(--color-border)] px-4 py-3 outline-none"
            placeholder="Your name"
          />
        </label>
        <label className="text-sm font-medium text-[color:var(--color-heading)]">
          Email
          <input
            type="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            required
            className="focus-ring mt-2 w-full rounded-2xl border border-[color:var(--color-border)] px-4 py-3 outline-none"
            placeholder="you@example.com"
          />
        </label>
        <label className="text-sm font-medium text-[color:var(--color-heading)]">
          Phone
          <input
            type="tel"
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            required
            className="focus-ring mt-2 w-full rounded-2xl border border-[color:var(--color-border)] px-4 py-3 outline-none"
            placeholder="07730 282309"
          />
        </label>
        <label className="text-sm font-medium text-[color:var(--color-heading)]">
          Subject
          <input
            type="text"
            value={form.subject}
            onChange={(event) => updateField("subject", event.target.value)}
            required
            className="focus-ring mt-2 w-full rounded-2xl border border-[color:var(--color-border)] px-4 py-3 outline-none"
            placeholder="How can we help?"
          />
        </label>
      </div>
      <label className="mt-6 block text-sm font-medium text-[color:var(--color-heading)]">
        Message
        <textarea
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
          required
          className="focus-ring mt-2 min-h-36 w-full rounded-[1.5rem] border border-[color:var(--color-border)] px-4 py-3 outline-none"
          placeholder="Tell us what you need help with."
        />
      </label>
      <label className="sr-only" aria-hidden="true">
        Website
        <input
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(event) => updateField("website", event.target.value)}
        />
      </label>
      <label className="mt-6 flex items-start gap-3 rounded-[1.25rem] bg-[color:var(--color-surface)] p-4 text-sm text-[color:var(--color-heading)]">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(event) => updateField("consent", event.target.checked)}
          className="mt-1"
        />
        <span>I agree to be contacted in response to this enquiry and understand that my details will be stored securely.</span>
      </label>

      {message ? (
        <p className="mt-4 text-sm font-medium text-[color:var(--color-heading)]" aria-live="polite">
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="mt-8 rounded-full bg-[color:var(--color-accent)] px-6 py-3 font-semibold text-white disabled:opacity-60"
      >
        {submitting ? "Sending message..." : "Send Message"}
      </button>
    </form>
  );
}
