import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { EmailSignup } from "@/components/email-signup";
import { getProduct } from "@/lib/products";

export const metadata: Metadata = {
  title: "DCR Brand | Drip City Records",
  description: "DCR Brand, the Nightfall Graphic Hoodie is live now.",
};

export default function DcrBrandPage() {
  const product = getProduct("nightfall-graphic-hoodie");

  return (
    <>
      <section className="relative flex min-h-[70vh] items-end overflow-hidden">
        <Image
          src="/images/dcr-brand/nightfall-hoodie-lifestyle-4.jpg"
          alt="DCR Brand Nightfall Hoodie, poolside"
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
            DCR Brand
          </h1>
          <p className="mt-6 max-w-lg text-lg text-fg-dim">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
            doloremque laudantium.
          </p>
        </div>
      </section>

      {product && (
        <section className="mx-auto max-w-6xl px-6 py-24">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-fg-dim">
            The Drop
          </p>
          <div className="mt-8 grid gap-10 md:grid-cols-2 md:items-center">
            <Link
              href={`/product/${product.handle}`}
              className="group relative aspect-[4/5] overflow-hidden bg-bg-raised"
            >
              <Image
                src={product.images[0].src}
                alt={product.images[0].alt}
                fill
                quality={90}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
            <div>
              <p className="font-display text-4xl uppercase leading-tight">{product.title}</p>
              <p className="mt-2 text-fg-dim">{product.subtitle}</p>
              <p className="mt-6 font-mono text-2xl">${product.price}</p>
              <p className="mt-6 max-w-md text-fg-dim">{product.description}</p>
              <Link
                href={`/product/${product.handle}`}
                className="mt-8 flex h-14 w-full max-w-xs items-center justify-center bg-accent text-sm font-semibold uppercase tracking-[0.2em] text-fg transition-opacity hover:opacity-90"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-line bg-bg-raised py-24">
        <div className="mx-auto grid max-w-6xl gap-2 px-6 sm:grid-cols-3">
          {[
            { src: "/images/dcr-brand/nightfall-hoodie-lifestyle-1.jpg", alt: "Nightfall hoodie, poolside lounge" },
            { src: "/images/dcr-brand/nightfall-hoodie-lifestyle-2.jpg", alt: "Nightfall hoodie, city skyline backdrop" },
            { src: "/images/dcr-brand/nightfall-hoodie-lifestyle-3.jpg", alt: "Nightfall hoodie worn poolside" },
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

      <section className="border-t border-line py-24">
        <div className="mx-auto max-w-6xl px-6">
          <EmailSignup
            heading="Hear It First"
            description="Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
          />
        </div>
      </section>
    </>
  );
}
