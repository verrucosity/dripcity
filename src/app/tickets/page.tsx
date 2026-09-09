import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { event, getTierPrice, isPresaleActive } from "@/lib/event";
import { buyTicketAction } from "@/lib/ticket-checkout";
import { getCapacityUsed } from "@/lib/tickets";

export const metadata: Metadata = {
  title: `Tickets, ${event.name} | Drip City Records`,
  description: `Get tickets to ${event.name} at ${event.venue}.`,
};

export default async function TicketsPage(props: PageProps<"/tickets">) {
  const searchParams = await props.searchParams;
  const soldOut = searchParams["sold-out"] === "1";
  const used = await getCapacityUsed();
  const remaining = Math.max(event.totalCapacity - used, 0);

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--accent-dim)_0%,_transparent_60%)] opacity-40" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-[minmax(0,380px)_1fr] md:items-center">
          <div className="relative mx-auto aspect-[683/1024] w-full max-w-sm overflow-hidden border border-line shadow-[0_0_60px_-15px_var(--accent)]">
            <Image
              src={event.flyerImage}
              alt={`${event.name} flyer`}
              fill
              priority
              quality={90}
              sizes="(min-width: 768px) 380px, 90vw"
              className="object-cover"
            />
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-fg-dim">
              Drip City Records Presents
            </p>
            <h1 className="mt-4 font-display text-6xl uppercase leading-[0.9] tracking-tight sm:text-7xl">
              {event.name}
            </h1>
            <p className="mt-6 text-lg text-fg-dim">
              {event.venue}
              <br />
              {event.address}
            </p>
            <p className="mt-2 font-mono text-sm uppercase tracking-wide text-fg-dim">
              {event.date}, {event.time}
            </p>

            <p className="mt-6 text-lg text-fg-dim">
              With {event.lineup.join(", ")}
              <br />
              Hosted by {event.host}
              <br />
              Sounds by {event.sound}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="border border-accent px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                {event.ageRestriction}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
          {soldOut && (
            <p className="mb-8 font-mono text-sm uppercase tracking-wide text-accent">
              That ticket type just sold out for the remaining capacity. Try the other tier.
            </p>
          )}

          {event.postponed && (
            <div className="mb-8 border border-accent bg-accent/10 p-6">
              <p className="font-display text-2xl uppercase text-accent">Event postponed</p>
              <p className="mt-2 text-sm text-fg-dim">
                Ticket sales are closed. A new date and venue will be announced soon. Everyone who
                already bought a ticket or table is being refunded.
              </p>
            </div>
          )}

          {!event.postponed && (isPresaleActive() || used >= event.sellingFastAt) && (
            <div className="mb-8 flex flex-wrap gap-3">
              {used >= event.sellingFastAt && (
                <p className="animate-pulse border border-accent bg-accent px-3 py-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-fg">
                  Tickets selling fast!!
                </p>
              )}
              {isPresaleActive() && (
                <p className="animate-pulse border border-accent px-3 py-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
                  Presale ending soon, $20 tickets go up to $30 on October 7
                </p>
              )}
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col justify-between border-t-2 border-accent bg-bg-raised/90 p-8 backdrop-blur-sm">
              <div>
                <p className="font-display text-2xl uppercase">{event.tiers.ga.label}</p>
                <p className="mt-2 text-sm text-fg-dim">{event.tiers.ga.description}</p>
                <p className="mt-6 font-mono text-3xl">${getTierPrice("ga")}</p>
                {isPresaleActive() && (
                  <p className="mt-1 font-mono text-xs uppercase tracking-wide text-fg-dim">
                    Presale price, ends October 7
                  </p>
                )}
              </div>
              <form action={buyTicketAction} className="mt-8">
                <input type="hidden" name="tier" value="ga" />
                <button
                  type="submit"
                  disabled={event.postponed || remaining < event.tiers.ga.capacityUsed}
                  className="h-14 w-full bg-accent text-sm font-semibold uppercase tracking-[0.2em] text-fg transition-opacity hover:opacity-90 disabled:opacity-40"
                >
                  Buy Ticket
                </button>
              </form>
            </div>

            <div className="flex flex-col justify-between border-t-2 border-fg bg-bg-raised/90 p-8 backdrop-blur-sm">
              <div>
                <p className="font-display text-2xl uppercase">{event.tiers.reserved.label}</p>
                <p className="mt-2 text-sm text-fg-dim">{event.tiers.reserved.description}</p>
                <p className="mt-6 font-mono text-3xl">${getTierPrice("reserved")}</p>
              </div>
              <form action={buyTicketAction} className="mt-8">
                <input type="hidden" name="tier" value="reserved" />
                <button
                  type="submit"
                  disabled={event.postponed || remaining < event.tiers.reserved.capacityUsed}
                  className="h-14 w-full bg-fg text-sm font-semibold uppercase tracking-[0.2em] text-bg transition-opacity hover:opacity-90 disabled:opacity-40"
                >
                  Reserve Table
                </button>
              </form>
            </div>
          </div>

          <p className="mt-10 font-mono text-xs uppercase tracking-wide text-fg-dim">
            <span className="font-bold text-accent">All sales final, no refunds or exchanges.</span>{" "}
            By purchasing you agree to our{" "}
            <Link href="/terms" className="underline hover:text-fg">
              Terms of Service
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
