import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-6 text-center">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-fg-dim">
          Drip City Records
        </p>
        <h1 className="mt-4 font-display text-7xl uppercase leading-[0.9] tracking-tight sm:text-8xl">
          404
        </h1>
        <p className="mx-auto mt-6 max-w-sm text-lg text-fg-dim">
          This page isn&apos;t here. Might&apos;ve moved, might&apos;ve never existed.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex h-14 items-center bg-accent px-8 text-sm font-semibold uppercase tracking-[0.2em] text-fg transition-opacity hover:opacity-90"
        >
          Back To Home
        </Link>
      </div>
    </section>
  );
}
