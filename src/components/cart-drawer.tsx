"use client";

import Image from "next/image";
import Link from "next/link";
import { checkoutAction } from "@/lib/actions";
import { lineKey, useCart } from "@/components/cart-provider";

export function CartDrawer() {
  const { lines, isOpen, close, subtotal, removeLine, commerceEnabled } = useCart();

  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-50 transition-opacity ${
        isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <button
        type="button"
        onClick={close}
        aria-label="Close cart"
        className="absolute inset-0 bg-black/70"
      />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-bg-raised transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-fg-dim">
            Cart
          </span>
          <button type="button" onClick={close} className="text-sm uppercase tracking-wide">
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {lines.length === 0 ? (
            <p className="text-fg-dim">Your cart is empty.</p>
          ) : (
            <ul className="flex flex-col gap-6">
              {lines.map((line) => (
                <li key={lineKey(line)} className="flex gap-4">
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-bg">
                    {line.image && (
                      <Image
                        src={line.image}
                        alt={line.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="font-display text-lg leading-tight">{line.title}</p>
                      <p className="font-mono text-xs uppercase tracking-wide text-fg-dim">
                        Size {line.size} · Qty {line.quantity}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm">${line.price * line.quantity}</span>
                      <button
                        type="button"
                        onClick={() => removeLine(lineKey(line))}
                        className="text-xs uppercase tracking-wide text-fg-dim hover:text-fg"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-line px-6 py-6">
          <div className="mb-4 flex items-center justify-between font-mono text-sm uppercase tracking-wide">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>
          {commerceEnabled ? (
            <form action={checkoutAction}>
              <input type="hidden" name="cart" value={JSON.stringify(lines)} />
              <button
                type="submit"
                disabled={lines.length === 0}
                className="h-14 w-full bg-accent text-sm font-semibold uppercase tracking-[0.2em] text-fg disabled:opacity-40"
              >
                Checkout
              </button>
            </form>
          ) : (
            <div className="flex flex-col gap-3">
              <p className="font-mono text-xs uppercase tracking-wide text-fg-dim">
                Store checkout isn&apos;t live yet.
              </p>
              <Link
                href="/prodbysu#notify"
                onClick={close}
                className="flex h-14 w-full items-center justify-center bg-fg text-sm font-semibold uppercase tracking-[0.2em] text-bg"
              >
                Join the Waitlist
              </Link>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
