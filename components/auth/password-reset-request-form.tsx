"use client";

import { useActionState } from "react";

import { requestPasswordResetAction, type AuthActionState } from "@/app/actions/auth";

const initialState: AuthActionState = {};

export function PasswordResetRequestForm() {
  const [state, formAction, pending] = useActionState(requestPasswordResetAction, initialState);

  return (
    <form action={formAction} className="max-w-xl rounded-[2rem] border border-[color:var(--color-border)] bg-white p-8 shadow-[var(--shadow-soft)]">
      <h2 className="font-display text-3xl font-semibold">Send sign-in link</h2>
      <label className="mt-6 block text-sm font-medium text-[color:var(--color-heading)]">
        Email
        <input name="email" type="email" required className="focus-ring mt-2 w-full rounded-2xl border border-[color:var(--color-border)] px-4 py-3 outline-none" />
      </label>
      {state.message ? (
        <p className="mt-4 text-sm text-[color:var(--color-heading)]" aria-live="polite">
          {state.message}
        </p>
      ) : null}
      <button disabled={pending} type="submit" className="mt-8 rounded-full bg-[color:var(--color-accent)] px-6 py-3 font-semibold text-white disabled:opacity-60">
        {pending ? "Sending..." : "Send sign-in link"}
      </button>
    </form>
  );
}
