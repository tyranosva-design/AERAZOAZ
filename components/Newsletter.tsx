"use client";

import { useState, type FormEvent } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="newsletter"
      className="border-t border-steel/20 bg-carbon px-6 py-16 md:px-10 md:py-20"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-lg">
          <p className="font-mono text-xs tracking-[0.2em] text-orange">
            STAY UPDATED
          </p>
          <h2 className="font-heading mt-3 text-2xl font-bold text-silver md:text-3xl">
            Get new Reports, Guides, Tools, and daily News Flashes in your
            inbox.
          </h2>
          <p className="mt-3 text-sm text-steel">
            No fluff, same standard as everything else on AERAZOAZ. Unsubscribe
            anytime.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="w-full rounded-full border border-steel/30 bg-obsidian px-5 py-3 text-sm text-silver placeholder:text-steel focus:border-orange focus:outline-none"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="shrink-0 rounded-full bg-orange px-6 py-3 font-mono text-xs tracking-[0.15em] text-obsidian transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {status === "loading" ? "SUBSCRIBING…" : "SUBSCRIBE"}
          </button>
        </form>
      </div>

      {status === "success" && (
        <p className="mx-auto mt-4 max-w-7xl text-sm text-orange">
          You&rsquo;re subscribed. Watch your inbox.
        </p>
      )}
      {status === "error" && (
        <p className="mx-auto mt-4 max-w-7xl text-sm text-red-400">
          Something went wrong — please try again in a moment.
        </p>
      )}
    </section>
  );
}
