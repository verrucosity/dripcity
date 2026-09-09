import { notFound } from "next/navigation";
import { AddToCart } from "@/components/add-to-cart";
import { ProductGallery } from "@/components/product-gallery";
import { getProduct, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((product) => ({ handle: product.handle }));
}

export async function generateMetadata(props: PageProps<"/product/[handle]">) {
  const { handle } = await props.params;
  const product = getProduct(handle);
  if (!product) return {};
  return {
    title: `${product.title} | ProdBySu Merch`,
    description: product.description,
  };
}

export default async function ProductPage(props: PageProps<"/product/[handle]">) {
  const { handle } = await props.params;
  const product = getProduct(handle);

  if (!product) notFound();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-12 lg:grid-cols-2">
        <ProductGallery images={product.images} />
        <div className="flex flex-col gap-8 lg:pt-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-fg-dim">
              ProdBySu Merch
            </p>
            <h1 className="mt-3 font-display text-4xl uppercase leading-tight sm:text-5xl">
              {product.title}
            </h1>
            <p className="mt-2 text-fg-dim">{product.subtitle}</p>
            <p className="mt-6 font-mono text-2xl">${product.price}</p>
          </div>
          <p className="max-w-md text-fg-dim">{product.description}</p>
          <AddToCart product={product} />
        </div>
      </div>
    </section>
  );
}
