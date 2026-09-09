import Image from "next/image";
import Link from "next/link";
import { EmailSignup } from "@/components/email-signup";
import { ProductCard } from "@/components/product-card";
import { getProductsByCategory } from "@/lib/products";

export default function HomePage() {
  const drops = getProductsByCategory("prodbysu");

  return (
    <>
      <section className="relative flex min-h-[92vh] items-end overflow-hidden">
        <Image
          src="/images/prodbysu/horizon-hoodie-hero.jpg"
          alt="ProdBySu Horizon Graphic Hoodie, shot golden hour over the hills"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[center_20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-bg/10" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-fg-dim">
            Independent Label / Merch Division
          </p>
          <h1 className="font-display text-6xl uppercase leading-[0.9] tracking-tight text-balance sm:text-8xl">
            Drip City
            <br />
            Records
          </h1>
          <p className="mt-6 max-w-lg text-lg text-fg-dim">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/prodbysu"
              className="flex h-14 items-center bg-accent px-8 text-sm font-semibold uppercase tracking-[0.2em] text-fg transition-opacity hover:opacity-90"
            >
              Shop ProdBySu
            </Link>
            <a
              href="#roster"
              className="flex h-14 items-center border border-line px-8 text-sm font-semibold uppercase tracking-[0.2em] transition-colors hover:border-fg"
            >
              View the Roster
            </a>
          </div>
        </div>
      </section>

      <section id="roster" className="mx-auto max-w-6xl px-6 py-24">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-fg-dim">The Roster</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Link
            href="/prodbysu"
            className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden bg-bg-raised p-8 sm:aspect-[16/10]"
          >
            <Image
              src="/images/prodbysu/night-hoop-action.jpg"
              alt="ProdBySu Merch"
              fill
              quality={90}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/10 to-transparent" />
            <div className="relative z-10">
              <p className="font-display text-3xl uppercase">ProdBySu Merch</p>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-fg-dim">
                Now Shopping
              </p>
            </div>
          </Link>
          <Link
            href="/dr-brand"
            className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden bg-bg-raised p-8 sm:aspect-[16/10]"
          >
            <Image
              src="/images/prodbysu/studio-session-bts.jpg"
              alt="Drip City Records Brand, coming soon"
              fill
              quality={90}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-top opacity-40 grayscale transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
            <div className="relative z-10">
              <p className="font-display text-3xl uppercase">DR Brand</p>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-fg-dim">
                Coming Soon
              </p>
            </div>
          </Link>
        </div>
      </section>

      <section className="border-t border-line bg-bg-raised py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-fg-dim">
                Latest Drop
              </p>
              <p className="mt-3 font-display text-4xl uppercase">Bel-Air Collection</p>
            </div>
            <Link
              href="/prodbysu"
              className="hidden font-mono text-xs uppercase tracking-[0.2em] text-fg-dim hover:text-fg sm:block"
            >
              Shop All →
            </Link>
          </div>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {drops.map((product) => (
              <ProductCard key={product.handle} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="relative aspect-[4/5] overflow-hidden bg-bg-raised">
            <Image
              src="/images/prodbysu/studio-session-bts-2.jpg"
              alt="Behind the scenes on a Drip City Records shoot"
              fill
              quality={90}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-fg-dim">
              Behind The Label
            </p>
            <p className="mt-4 font-display text-4xl uppercase leading-tight text-balance">
              Consectetur Adipiscing Elit
            </p>
            <p className="mt-6 max-w-md text-fg-dim">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-24">
        <div className="mx-auto max-w-6xl px-6">
          <EmailSignup
            heading="Join the Roster"
            description="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
          />
        </div>
      </section>
    </>
  );
}
