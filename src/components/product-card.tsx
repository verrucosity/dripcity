import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.handle}`} className="group flex flex-col gap-4">
      <div className="relative aspect-[4/5] overflow-hidden bg-bg-raised">
        <Image
          src={product.images[0].src}
          alt={product.images[0].alt}
          fill
          quality={90}
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-display text-xl uppercase leading-tight">{product.title}</p>
          <p className="mt-1 text-sm text-fg-dim">{product.subtitle}</p>
        </div>
        <p className="font-mono text-sm text-fg-dim">${product.price}</p>
      </div>
    </Link>
  );
}
