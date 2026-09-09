"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart-provider";

const navLinks = [
  { href: "/prodbysu", label: "ProdBySu" },
  { href: "/prodbysu/memes", label: "Memes" },
  { href: "/dr-brand", label: "DR Brand" },
];

const tickerItems = [
  "New Drop: Bel-Air Collection",
  "Memes Merch Loading",
  "DR Brand Coming Soon",
  "Shipping Worldwide",
];

export function SiteHeader() {
  const { open, count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-bg/95 backdrop-blur">
      <div className="overflow-hidden border-b border-line bg-bg-raised py-2">
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap font-mono text-xs uppercase tracking-[0.3em] text-fg-dim">
          {[0, 1].map((group) => (
            <div key={group} className="flex gap-12 pr-12">
              {tickerItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="font-display text-2xl uppercase tracking-tight">
          Drip City Records
        </Link>
        <nav className="hidden gap-8 font-mono text-xs uppercase tracking-[0.2em] md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-fg-dim transition-colors hover:text-fg"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={open}
            className="font-mono text-xs uppercase tracking-[0.2em] text-fg transition-colors hover:text-accent"
          >
            Cart ({count})
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            className="font-mono text-xs uppercase tracking-[0.2em] text-fg md:hidden"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav className="flex flex-col border-t border-line px-6 py-4 font-mono text-sm uppercase tracking-[0.2em] md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-line py-4 text-fg-dim last:border-b-0 hover:text-fg"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
