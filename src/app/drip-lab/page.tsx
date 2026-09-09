import Link from "next/link";
import type { Metadata } from "next";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Drip Lab | Drip City Records",
  description: "Studio time, video, photography, and mixing services from Drip Lab.",
};

export default function DripLabPage() {
  return (
    <>
      <section className="border-b border-line bg-bg-raised py-24">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-fg-dim">
            Drip City Records
          </p>
          <h1 className="mt-4 font-display text-6xl uppercase leading-[0.9] tracking-tight sm:text-7xl">
            Drip Lab
          </h1>
          <p className="mt-6 max-w-lg text-lg text-fg-dim">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed
            quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-6 sm:grid-cols-2">
          {services.map((service) => (
            <Link
              key={service.handle}
              href={`/drip-lab/${service.handle}`}
              className="group border border-line bg-bg-raised p-8 transition-colors hover:border-fg"
            >
              <p className="font-display text-2xl uppercase">{service.title}</p>
              <p className="mt-2 text-sm text-fg-dim">{service.description}</p>
              <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-fg-dim">
                Request →
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
