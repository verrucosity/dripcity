"use client";

import { useState } from "react";
import { useCart } from "@/components/cart-provider";
import type { Product } from "@/lib/types";

export function AddToCart({ product }: { product: Product }) {
  const [size, setSize] = useState(product.variants[0]?.size ?? "");
  const [added, setAdded] = useState(false);
  const { addLine, commerceEnabled } = useCart();
  const variant = product.variants.find((item) => item.size === size);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {product.variants.map((item) => (
          <button
            key={item.size}
            type="button"
            onClick={() => setSize(item.size)}
            className={`h-11 min-w-11 border px-3 font-mono text-sm uppercase tracking-wide transition-colors ${
              size === item.size
                ? "border-fg bg-fg text-bg"
                : "border-line text-fg hover:border-fg"
            }`}
          >
            {item.size}
          </button>
        ))}
      </div>
      <button
        type="button"
        disabled={!variant}
        onClick={() => {
          if (!variant) return;
          addLine({
            handle: product.handle,
            variantId: variant.id,
            title: product.title,
            size: variant.size,
            price: product.price,
            image: product.images[0]?.src ?? "",
            quantity: 1,
          });
          setAdded(true);
        }}
        className="h-14 w-full bg-accent text-sm font-semibold uppercase tracking-[0.2em] text-fg transition-opacity hover:opacity-90 disabled:opacity-40"
      >
        {added ? "Added" : commerceEnabled ? "Add to Cart" : "Join the Waitlist"}
      </button>
      {!commerceEnabled && (
        <p className="font-mono text-xs uppercase tracking-wide text-fg-dim">
          Checkout goes live once the Shopify store connects. You&apos;ll be first in line.
        </p>
      )}
    </div>
  );
}
