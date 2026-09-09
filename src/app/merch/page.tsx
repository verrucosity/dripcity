import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merch | Drip City Records",
  description: "DCR Brand, ProdBySu, EBK, and B4B merch from Drip City Records.",
};

const lines = [
  {
    href: "/merch/dcr-brand",
    label: "DCR Brand",
    status: "Now Shopping",
    image: "/images/dcr-brand/nightfall-hoodie-lifestyle-4.jpg",
  },
  {
    href: "/merch/prodbysu",
    label: "ProdBySu",
    status: "Loading",
    image: "/images/prodbysu/night-hoop-action.jpg",
  },
  {
    href: "/merch/ebk",
    label: "EBK",
    status: "Loading",
    image: null,
  },
  {
    href: "/merch/b4b",
    label: "B4B",
    status: "Loading",
    image: null,
  },
];

export default function MerchPage() {
  return (
    <>
      <section className="border-b border-line bg-bg-raised py-24">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-fg-dim">
            Drip City Records
          </p>
          <h1 className="mt-4 font-display text-6xl uppercase leading-[0.9] tracking-tight sm:text-7xl">
            Merch
          </h1>
          <p className="mt-6 max-w-lg text-lg text-fg-dim">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
            doloremque laudantium.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-6 sm:grid-cols-2">
          {lines.map((line) => (
            <Link
              key={line.href}
              href={line.href}
              className="group relative flex aspect-[16/10] flex-col justify-end overflow-hidden border border-line bg-bg-raised p-8"
            >
              {line.image && (
                <Image
                  src={line.image}
                  alt={line.label}
                  fill
                  quality={90}
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
              {line.image && (
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
              )}
              <div className="relative z-10">
                <p className="font-display text-3xl uppercase">{line.label}</p>
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-fg-dim">
                  {line.status}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
