import Link from "next/link";
import type { Metadata } from "next";
import { producers } from "@/lib/beats";

export const metadata: Metadata = {
  title: "Purchase Beats | Drip City Records",
  description: "Beats from the Drip City Records roster of producers.",
};

export default function BeatsPage() {
  return (
    <>
      <section className="border-b border-line bg-bg-raised py-24">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-fg-dim">
            Drip City Records
          </p>
          <h1 className="mt-4 font-display text-6xl uppercase leading-[0.9] tracking-tight sm:text-7xl">
            Purchase Beats
          </h1>
          <p className="mt-6 max-w-lg text-lg text-fg-dim">
            Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil
            molestiae consequatur.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-6 sm:grid-cols-2">
          {producers.map((producer) => (
            <Link
              key={producer.handle}
              href={`/beats/${producer.handle}`}
              className="group flex aspect-[16/10] flex-col justify-end border border-line bg-bg-raised p-8 transition-colors hover:border-fg"
            >
              <p className="font-display text-3xl uppercase">{producer.name}</p>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-fg-dim">
                {producer.traktrainUrl ? "Shop Beats" : "Loading"}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
