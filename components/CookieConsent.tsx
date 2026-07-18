"use client";

import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem("cookie-consent")) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 border-t border-steel/20 bg-carbon/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-4 md:flex-row md:items-center md:justify-between md:px-10">
        <p className="text-sm leading-relaxed text-steel">
          We use cookies and similar tools to enhance your experience. By
          continuing to visit this site, you agree to our use of cookies as
          described in our{" "}
          <a href="/cookie-policy" className="text-orange underline">
            Cookie Policy
          </a>
          .
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => {
              localStorage.setItem("cookie-consent", "accepted");
              setVisible(false);
            }}
            className="inline-flex items-center rounded bg-orange px-4 py-2 text-[0.7rem] font-semibold tracking-wider text-obsidian transition-colors hover:bg-orange/90"
          >
            ACCEPT
          </button>
          <button
            type="button"
            onClick={() => {
              localStorage.setItem("cookie-consent", "declined");
              setVisible(false);
            }}
            className="inline-flex items-center rounded border border-steel px-4 py-2 text-[0.7rem] font-semibold tracking-wider text-steel transition-colors hover:border-silver hover:text-silver"
          >
            DECLINE
          </button>
        </div>
      </div>
    </div>
  );
}