"use client";

import { useActionState } from "react";
import { submitInquiryAction } from "@/lib/inquiry";

export function InquiryForm({ service }: { service: string }) {
  const [state, formAction, pending] = useActionState(submitInquiryAction, {
    status: "idle",
  });

  if (state.status === "success") {
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
    <form action={formAction} className="flex max-w-lg flex-col gap-4">
      <input type="hidden" name="service" value={service} />
      <div className="flex flex-col gap-2">
        <label htmlFor="inquiry-name" className="font-mono text-xs uppercase tracking-[0.2em] text-fg-dim">
          Name
        </label>
        <input
          id="inquiry-name"
          name="name"
          type="text"
          required
          className="h-14 border border-line bg-transparent px-4 text-sm outline-none focus:border-fg"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="inquiry-email" className="font-mono text-xs uppercase tracking-[0.2em] text-fg-dim">
          Email
        </label>
        <input
          id="inquiry-email"
          name="email"
          type="email"
          required
          className="h-14 border border-line bg-transparent px-4 text-sm outline-none focus:border-fg"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="inquiry-details" className="font-mono text-xs uppercase tracking-[0.2em] text-fg-dim">
          Details
        </label>
        <textarea
          id="inquiry-details"
          name="details"
          rows={4}
          placeholder="Preferred dates, project details, anything else worth knowing."
          className="border border-line bg-transparent px-4 py-3 text-sm outline-none focus:border-fg"
        />
      </div>
      {state.status === "error" && (
        <p className="font-mono text-xs uppercase tracking-wide text-accent">{state.message}</p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="h-14 w-full bg-accent text-sm font-semibold uppercase tracking-[0.2em] text-fg transition-opacity hover:opacity-90 disabled:opacity-40"
      >
        {pending ? "Sending..." : "Send Request"}
      </button>
    </form>
  );
}
