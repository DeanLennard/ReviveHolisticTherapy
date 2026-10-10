"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const STORAGE_KEY = "revive_cookie_preferences";
const DEFAULT_GA_MEASUREMENT_ID = "G-4BJJC191VT";

type Preferences = {
  essential: true;
  analytics: boolean;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

function getAnalyticsConsent() {
  if (typeof window === "undefined") {
    return false;
  }

  const existing = window.localStorage.getItem(STORAGE_KEY);

  if (!existing) {
    return false;
  }

  try {
    return Boolean((JSON.parse(existing) as Preferences).analytics);
  } catch {
    return false;
  }
}

function clearGoogleAnalyticsCookies() {
  if (typeof document === "undefined") {
    return;
  }

  const domains = [window.location.hostname];

  if (window.location.hostname.startsWith("www.")) {
    domains.push(`.${window.location.hostname.slice(4)}`);
  }

  for (const cookie of document.cookie.split(";")) {
    const name = cookie.trim().split("=")[0];

    if (!name || !/^_(ga|gid|gat|gac)/.test(name)) {
      continue;
    }

    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;

    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`;
    }
  }
}

export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || DEFAULT_GA_MEASUREMENT_ID;
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    function syncPreference() {
      const hasConsent = getAnalyticsConsent();

      window[`ga-disable-${gaId}`] = !hasConsent;

      if (!hasConsent) {
        clearGoogleAnalyticsCookies();
      }

      setEnabled(hasConsent);
    }

    syncPreference();
    window.addEventListener("cookie-preferences-updated", syncPreference);
    return () => window.removeEventListener("cookie-preferences-updated", syncPreference);
  }, [gaId]);

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
  if (typeof window !== "undefined" && getAnalyticsConsent() && typeof window.gtag === "function") {
    window.gtag("event", eventName, parameters);
  }
}
