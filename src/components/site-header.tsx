"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart-provider";

const navGroups = [
  {
    label: "Purchase Beats",
    href: "/beats",
    items: [
      { href: "/beats/section-8", label: "Section 8" },
      { href: "/beats/prodbysu", label: "ProdBySu" },
      { href: "/beats/prodbyjones", label: "ProdByJones" },
      { href: "/beats/prodbygaven", label: "ProdByGaven" },
    ],
  },
  {
    label: "Drip Lab",
    href: "/drip-lab",
    items: [
      { href: "/drip-lab/book-studio-time", label: "Book Studio Time" },
      { href: "/drip-lab/book-music-video", label: "Book Music Video" },
      { href: "/drip-lab/book-drop-mic-video", label: "Book Drop Mic Video" },
      { href: "/drip-lab/book-photo-shoot", label: "Book Photo Shoot" },
      { href: "/drip-lab/song-mix-mastering", label: "Song Mix & Mastering" },
    ],
  },
  {
    label: "Merch",
    href: "/merch",
    items: [
      { href: "/merch/dcr-brand", label: "DCR Brand" },
      { href: "/merch/prodbysu", label: "ProdBySu" },
      { href: "/merch/ebk", label: "EBK" },
      { href: "/merch/b4b", label: "B4B" },
    ],
  },
];

const tickerItems = [
  "New Drop: DCR Brand",
  "ProdBySu Merch Loading",
  "Memes Merch Loading",
  "Shipping Worldwide",
];

export function SiteHeader() {
  const { open, count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

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
          {navGroups.map((group) => (
            <div key={group.label} className="relative">
              <button
                type="button"
                onClick={() => setOpenGroup((current) => (current === group.label ? null : group.label))}
                className="font-mono text-xs uppercase tracking-[0.2em] text-fg-dim transition-colors hover:text-fg"
              >
                {group.label}
              </button>
              {openGroup === group.label && (
                <>
                  <button
                    type="button"
                    aria-label="Close menu"
                    onClick={() => setOpenGroup(null)}
                    className="fixed inset-0 z-40 cursor-default"
                  />
                  <div className="absolute left-0 top-full z-50 mt-4 w-56 border border-line bg-bg-raised py-2">
                    <Link
                      href={group.href}
                      onClick={() => setOpenGroup(null)}
                      className="block px-4 py-3 text-fg hover:text-accent"
                    >
                      All {group.label}
                    </Link>
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpenGroup(null)}
                        className="block px-4 py-3 text-fg-dim hover:text-fg"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
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
          {navGroups.map((group) => (
            <div key={group.label} className="border-b border-line py-4 last:border-b-0">
              <Link
                href={group.href}
                onClick={() => setMenuOpen(false)}
                className="text-fg"
              >
                {group.label}
              </Link>
              <div className="mt-3 flex flex-col gap-3 pl-4">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-xs text-fg-dim hover:text-fg"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      )}
    </header>
  );
}
