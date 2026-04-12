"use client";

import Link from "next/link";
import { useActionState } from "react";

import { loginAction, signupAction, type AuthActionState } from "@/app/actions/auth";

const initialState: AuthActionState = {};

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) {
    return null;
  }

  return (
    <p className="mt-2 text-sm text-red-700" aria-live="polite">
      {errors[0]}
    </p>
  );
}

export function LoginForm() {
  const [loginState, loginFormAction, loginPending] = useActionState(loginAction, initialState);
  const [signupState, signupFormAction, signupPending] = useActionState(signupAction, initialState);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form action={loginFormAction} className="rounded-[2rem] border border-[color:var(--color-border)] bg-white p-8 shadow-[var(--shadow-soft)]">
        <h2 className="font-display text-3xl font-semibold">Sign in</h2>
        <label className="mt-6 block text-sm font-medium text-[color:var(--color-heading)]">
          Email
          <input name="email" type="email" required className="focus-ring mt-2 w-full rounded-2xl border border-[color:var(--color-border)] px-4 py-3 outline-none" />
        </label>
        <label className="mt-6 block text-sm font-medium text-[color:var(--color-heading)]">
          Password
          <input name="password" type="password" required minLength={8} className="focus-ring mt-2 w-full rounded-2xl border border-[color:var(--color-border)] px-4 py-3 outline-none" />
        </label>
        {loginState.message ? (
          <p className="mt-4 text-sm text-red-700" aria-live="polite">
            {loginState.message}
          </p>
        ) : null}
        <button disabled={loginPending} type="submit" className="mt-8 rounded-full bg-[color:var(--color-accent)] px-6 py-3 font-semibold text-white disabled:opacity-60">
          {loginPending ? "Signing in..." : "Sign in"}
        </button>
        <div className="mt-6 flex flex-wrap gap-4 text-sm text-[color:var(--color-text-muted)]">
          <Link href="/portal/forgot-password">Forgot password?</Link>
          <Link href="/booking">Continue to booking</Link>
        </div>
      </form>

      <form action={signupFormAction} className="rounded-[2rem] border border-[color:var(--color-border)] bg-white p-8 shadow-[var(--shadow-soft)]">
        <h2 className="font-display text-3xl font-semibold">Create account</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium text-[color:var(--color-heading)]">
            First name
            <input name="firstName" required className="focus-ring mt-2 w-full rounded-2xl border border-[color:var(--color-border)] px-4 py-3 outline-none" />
            <FieldError errors={signupState.errors?.firstName} />
          </label>
          <label className="text-sm font-medium text-[color:var(--color-heading)]">
            Last name
            <input name="lastName" required className="focus-ring mt-2 w-full rounded-2xl border border-[color:var(--color-border)] px-4 py-3 outline-none" />
            <FieldError errors={signupState.errors?.lastName} />
          </label>
          <label className="text-sm font-medium text-[color:var(--color-heading)]">
            Email
            <input name="email" type="email" required className="focus-ring mt-2 w-full rounded-2xl border border-[color:var(--color-border)] px-4 py-3 outline-none" />
            <FieldError errors={signupState.errors?.email} />
          </label>
          <label className="text-sm font-medium text-[color:var(--color-heading)]">
            Phone
            <input name="phone" required className="focus-ring mt-2 w-full rounded-2xl border border-[color:var(--color-border)] px-4 py-3 outline-none" />
            <FieldError errors={signupState.errors?.phone} />
          </label>
        </div>
        <label className="mt-4 block text-sm font-medium text-[color:var(--color-heading)]">
          Password
          <input name="password" type="password" required minLength={8} className="focus-ring mt-2 w-full rounded-2xl border border-[color:var(--color-border)] px-4 py-3 outline-none" />
          <FieldError errors={signupState.errors?.password} />
        </label>
        <label className="mt-4 flex items-start gap-3 text-sm text-[color:var(--color-heading)]">
          <input name="marketingConsent" type="checkbox" className="mt-1" />
          <span>I would like to receive occasional marketing updates from Revive Holistic Therapies.</span>
        </label>
        {signupState.message ? (
          <p className="mt-4 text-sm text-red-700" aria-live="polite">
            {signupState.message}
          </p>
        ) : null}
        <button disabled={signupPending} type="submit" className="mt-8 rounded-full bg-[color:var(--color-accent)] px-6 py-3 font-semibold text-white disabled:opacity-60">
          {signupPending ? "Creating account..." : "Create account"}
        </button>
      </form>
    </div>
  );
}
