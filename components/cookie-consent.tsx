"use client";

import { useState } from "react";

const STORAGE_KEY = "revive_cookie_preferences";

type Preferences = {
  essential: true;
  analytics: boolean;
};

export function CookieConsent() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return !window.localStorage.getItem(STORAGE_KEY);
  });

  function save(preferences: Preferences) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    window.dispatchEvent(new CustomEvent("cookie-preferences-updated", { detail: preferences }));
    setVisible(false);
  }

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[90] mx-auto max-w-4xl rounded-[1.75rem] border border-[color:var(--color-border)] bg-white p-6 shadow-[var(--shadow-panel)]">
      <p className="font-display text-2xl font-semibold text-[color:var(--color-heading)]">Cookie preferences</p>
      <p className="mt-3 text-sm leading-7 text-[color:var(--color-text-muted)]">
        Essential cookies are used for site security and core functionality. You can also allow analytics cookies to help improve the website.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <button type="button" onClick={() => save({ essential: true, analytics: true })} className="rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
          Accept analytics
        </button>
        <button type="button" onClick={() => save({ essential: true, analytics: false })} className="rounded-full border border-[color:var(--color-border)] px-5 py-3 font-semibold text-[color:var(--color-heading)]">
          Essential only
        </button>
      </div>
    </div>
  );
}
