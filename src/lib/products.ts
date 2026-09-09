import type { Product } from "./types";

export const products: Product[] = [
  {
    handle: "nightfall-graphic-hoodie",
    title: "Nightfall Graphic Hoodie",
    subtitle: "Soft lilac fleece, full back print",
    price: 74,
    category: "dcr-brand",
    status: "live",
    description:
      "Heavyweight fleece in a soft lilac colorway, carrying a full illustrated back panel set under a shooting-star sky. @prodbysu sleeve script on one arm, repeat print down the other.",
    images: [
      { src: "/images/dcr-brand/nightfall-hoodie-lifestyle-3.jpg", alt: "Nightfall hoodie worn poolside" },
      { src: "/images/dcr-brand/nightfall-hoodie-flat.jpg", alt: "Nightfall hoodie back print, flat lay" },
      { src: "/images/dcr-brand/nightfall-hoodie-lifestyle-1.jpg", alt: "Nightfall hoodie, poolside lounge" },
      { src: "/images/dcr-brand/nightfall-hoodie-lifestyle-2.jpg", alt: "Nightfall hoodie, city skyline backdrop" },
    ],
    variants: [
      { id: "", size: "S" },
      { id: "", size: "M" },
      { id: "", size: "L" },
      { id: "", size: "XL" },
    ],
  },
];

export function getProduct(handle: string) {
  return products.find((product) => product.handle === handle);
}

export function getProductsByCategory(category: Product["category"]) {
  return products.filter((product) => product.category === category);
}

const brandLabels: Record<Product["category"], string> = {
  prodbysu: "ProdBySu Merch",
  memes: "ProdBySu Merch",
  "dcr-brand": "DCR Brand",
};

export function getBrandLabel(category: Product["category"]) {
  return brandLabels[category];
}
