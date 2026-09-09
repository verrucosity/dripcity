"use client";

import { useState } from "react";
import type { FormEvent } from "react";

export function InquiryForm({ service }: { service: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState<"idle" | "done">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name || !email) return;
    setStatus("done");
    setName("");
    setEmail("");
    setDetails("");
  }

  if (status === "done") {
    return (
      <div className="border border-line bg-bg-raised p-8">
        <p className="font-display text-2xl uppercase">Request Sent</p>
        <p className="mt-2 text-fg-dim">
          The Drip Lab team will follow up by email to confirm details.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-lg flex-col gap-4">
      <input type="hidden" name="service" value={service} />
      <div className="flex flex-col gap-2">
        <label htmlFor="inquiry-name" className="font-mono text-xs uppercase tracking-[0.2em] text-fg-dim">
          Name
        </label>
        <input
          id="inquiry-name"
          type="text"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="h-14 border border-line bg-transparent px-4 text-sm outline-none focus:border-fg"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="inquiry-email" className="font-mono text-xs uppercase tracking-[0.2em] text-fg-dim">
          Email
        </label>
        <input
          id="inquiry-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="h-14 border border-line bg-transparent px-4 text-sm outline-none focus:border-fg"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="inquiry-details" className="font-mono text-xs uppercase tracking-[0.2em] text-fg-dim">
          Details
        </label>
        <textarea
          id="inquiry-details"
          rows={4}
          value={details}
          onChange={(event) => setDetails(event.target.value)}
          placeholder="Preferred dates, project details, anything else worth knowing."
          className="border border-line bg-transparent px-4 py-3 text-sm outline-none focus:border-fg"
        />
      </div>
      <button
        type="submit"
        className="h-14 w-full bg-accent text-sm font-semibold uppercase tracking-[0.2em] text-fg transition-opacity hover:opacity-90"
      >
        Send Request
      </button>
    </form>
  );
}
