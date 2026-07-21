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
    <div className="fixed bottom-0 inset-x-0 z-50 border-t border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-4 md:flex-row md:items-center md:justify-between md:px-10">
        <p className="text-sm leading-relaxed text-steel">
          We use cookies and similar tools to enhance your experience. By
          continuing to visit this site, you agree to our use of cookies as
          described in our{" "}
          <a href="/cookie-policy" className="text-accent underline underline-offset-2 hover:text-accent-hover">
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
            className="inline-flex items-center rounded bg-accent px-4 py-2 text-[0.7rem] font-semibold tracking-wider text-white transition-colors hover:bg-accent-hover"
          >
            ACCEPT
          </button>
          <button
            type="button"
            onClick={() => {
              localStorage.setItem("cookie-consent", "declined");
              setVisible(false);
            }}
            className="inline-flex items-center rounded border border-anchor bg-transparent px-4 py-2 text-[0.7rem] font-semibold tracking-wider text-anchor transition-colors hover:bg-anchor hover:text-dark-text"
          >
            DECLINE
          </button>
        </div>
      </div>
    </div>
  );
}