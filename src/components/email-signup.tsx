"use client";

import { useState } from "react";
import type { FormEvent } from "react";

export function EmailSignup({
  heading,
  description,
}: {
  heading: string;
  description: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "done">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email) return;
    setStatus("done");
    setEmail("");
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="font-display text-3xl uppercase leading-tight sm:text-4xl">{heading}</p>
        <p className="mt-3 max-w-md text-fg-dim">{description}</p>
      </div>
      {status === "done" ? (
        <p className="font-mono text-sm uppercase tracking-wide text-accent">
          You&apos;re on the list.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@email.com"
            className="h-14 flex-1 border border-line bg-transparent px-4 text-sm outline-none placeholder:text-fg-dim focus:border-fg"
          />
          <button
            type="submit"
            className="h-14 shrink-0 bg-fg px-8 text-sm font-semibold uppercase tracking-[0.2em] text-bg"
          >
            Notify Me
          </button>
        </form>
      )}
    </div>
  );
}
