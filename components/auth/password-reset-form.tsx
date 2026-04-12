"use client";

import { useActionState } from "react";

import { resetPasswordAction, type AuthActionState } from "@/app/actions/auth";

const initialState: AuthActionState = {};

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;

  return (
    <p className="mt-2 text-sm text-red-700" aria-live="polite">
      {errors[0]}
    </p>
  );
}

export function PasswordResetForm({ token }: { token: string }) {
  const [state, formAction, pending] = useActionState(resetPasswordAction, initialState);

  return (
    <form action={formAction} className="max-w-xl rounded-[2rem] border border-[color:var(--color-border)] bg-white p-8 shadow-[var(--shadow-soft)]">
      <h2 className="font-display text-3xl font-semibold">Set new password</h2>
      <input type="hidden" name="token" value={token} />
      <label className="mt-6 block text-sm font-medium text-[color:var(--color-heading)]">
        New password
        <input name="password" type="password" minLength={8} required className="focus-ring mt-2 w-full rounded-2xl border border-[color:var(--color-border)] px-4 py-3 outline-none" />
        <FieldError errors={state.errors?.password} />
      </label>
      <label className="mt-6 block text-sm font-medium text-[color:var(--color-heading)]">
        Confirm password
        <input name="confirmPassword" type="password" minLength={8} required className="focus-ring mt-2 w-full rounded-2xl border border-[color:var(--color-border)] px-4 py-3 outline-none" />
        <FieldError errors={state.errors?.confirmPassword} />
      </label>
      {state.message ? (
        <p className="mt-4 text-sm text-[color:var(--color-heading)]" aria-live="polite">
          {state.message}
        </p>
      ) : null}
      <button disabled={pending} type="submit" className="mt-8 rounded-full bg-[color:var(--color-accent)] px-6 py-3 font-semibold text-white disabled:opacity-60">
        {pending ? "Updating password..." : "Update password"}
      </button>
    </form>
  );
}
