import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { EmailSignup } from "@/components/email-signup";

export const metadata: Metadata = {
  title: "ProdBySu Merch | Drip City Records",
  description: "Fleece and graphics from the ProdBySu studio sessions. Next drop loading.",
};

const teased = [{ label: "Drop 001" }, { label: "Drop 002" }, { label: "Drop 003" }];

export default function ProdBySuPage() {
  return (
    <>
      <section className="relative flex min-h-[70vh] items-end overflow-hidden">
        <Image
          src="/images/prodbysu/night-hoop-action.jpg"
          alt="ProdBySu, courtside at night"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[center_25%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-bg/10" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-fg-dim">
            Drip City Records Presents
          </p>
          <h1 className="font-display text-6xl uppercase leading-[0.9] tracking-tight sm:text-7xl">
            ProdBySu Merch
          </h1>
          <p className="mt-6 max-w-lg text-lg text-fg-dim">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="flex items-end justify-between gap-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-fg-dim">
            Next Drop
          </p>
          <Link
            href="/merch/prodbysu/memes"
            className="font-mono text-xs uppercase tracking-[0.2em] text-fg-dim hover:text-fg"
          >
            Meme Merch →
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {teased.map((item) => (
            <div
              key={item.label}
              className="flex aspect-[4/5] flex-col items-center justify-center gap-2 border border-dashed border-line bg-bg-raised"
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-fg-dim">
                {item.label}
              </p>
              <p className="font-display text-sm uppercase tracking-wide text-fg-dim">
                Loading
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-bg-raised py-24">
        <div className="mx-auto grid max-w-6xl gap-2 px-6 sm:grid-cols-3">
          {[
            { src: "/images/prodbysu/bel-air-set-chair.jpg", alt: "ProdBySu, poolside" },
            { src: "/images/prodbysu/bel-air-hoodie-detail.jpg", alt: "ProdBySu, studio detail" },
            { src: "/images/prodbysu/night-hoop-portrait.jpg", alt: "ProdBySu, at night" },
          ].map((image) => (
            <div key={image.src} className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                quality={90}
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <section id="notify" className="mx-auto max-w-6xl px-6 py-24">
        <EmailSignup
          heading="Get the Next Drop First"
          description="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
        />
      </section>
    </>
  );
}
