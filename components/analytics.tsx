"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const STORAGE_KEY = "revive_cookie_preferences";

type Preferences = {
  essential: true;
  analytics: boolean;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    function syncPreference() {
      const existing = window.localStorage.getItem(STORAGE_KEY);

      if (!existing) {
        setEnabled(false);
        return;
      }

      try {
        const preferences = JSON.parse(existing) as Preferences;
        setEnabled(Boolean(preferences.analytics));
      } catch {
        setEnabled(false);
      }
    }

    syncPreference();
    window.addEventListener("cookie-preferences-updated", syncPreference);
    return () => window.removeEventListener("cookie-preferences-updated", syncPreference);
  }, []);

  if (!gaId || !enabled) {
    return null;
  }

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}

export function trackEvent(eventName: string, parameters: Record<string, unknown> = {}) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, parameters);
  }
}
