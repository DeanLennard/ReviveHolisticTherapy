"use client";

import Link from "next/link";
import { useActionState } from "react";

import { loginAction, type AuthActionState } from "@/app/actions/auth";

const initialState: AuthActionState = {};

export function LoginForm() {
  const [loginState, loginFormAction, loginPending] = useActionState(loginAction, initialState);

  return (
    <div className="grid gap-8">
      <form action={loginFormAction} className="max-w-2xl rounded-[2rem] border border-[color:var(--color-border)] bg-white p-8 shadow-[var(--shadow-soft)]">
        <h2 className="font-display text-3xl font-semibold">Email me a sign-in link</h2>
        <label className="mt-6 block text-sm font-medium text-[color:var(--color-heading)]">
          Email
          <input name="email" type="email" required className="focus-ring mt-2 w-full rounded-2xl border border-[color:var(--color-border)] px-4 py-3 outline-none" />
        </label>
        <p className="mt-4 text-sm text-[color:var(--color-text-muted)]">
          Enter the email address you used when booking. If we have an account for you, we will send a secure magic link you can use to access your portal without a password.
        </p>
        {loginState.message ? (
          <p className="mt-4 text-sm text-[color:var(--color-heading)]" aria-live="polite">
            {loginState.message}
          </p>
        ) : null}
        <button disabled={loginPending} type="submit" className="mt-8 rounded-full bg-[color:var(--color-accent)] px-6 py-3 font-semibold text-white disabled:opacity-60">
          {loginPending ? "Sending link..." : "Send sign-in link"}
        </button>
        <div className="mt-6 flex flex-wrap gap-4 text-sm text-[color:var(--color-text-muted)]">
          <Link href="/booking">Continue to booking</Link>
        </div>
      </form>
    </div>
  );
}
