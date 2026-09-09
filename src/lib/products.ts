import type { Product } from "./types";

export const products: Product[] = [
  {
    handle: "bel-air-hoodie",
    title: "Bel-Air Hoodie",
    subtitle: "Lavender fleece, embroidered chest and sleeve",
    price: 68,
    category: "prodbysu",
    status: "live",
    description:
      "Heavyweight fleece pulled straight from the ProdBySu studio sessions. Embroidered Bel-Air chest hit, @prodbysu sleeve script, garment washed for a soft worn-in hand feel from the first wear.",
    images: [
      { src: "/images/prodbysu/bel-air-hoodie-detail.jpg", alt: "Bel-Air hoodie chest embroidery detail" },
      { src: "/images/prodbysu/night-hoop-portrait.jpg", alt: "Bel-Air hoodie worn courtside at night" },
      { src: "/images/prodbysu/night-hoop-action.jpg", alt: "Bel-Air hoodie in motion under the hoop" },
    ],
    variants: [
      { id: "", size: "S" },
      { id: "", size: "M" },
      { id: "", size: "L" },
      { id: "", size: "XL" },
    ],
  },
  {
    handle: "sed-do-eiusmod",
    title: "Sed Do Eiusmod",
    subtitle: "Blush wide-leg fleece pant",
    price: 58,
    category: "prodbysu",
    status: "live",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    images: [
      { src: "/images/prodbysu/bel-air-set-chair.jpg", alt: "Wide-leg fleece pant poolside" },
      { src: "/images/prodbysu/bel-air-set-lounge.jpg", alt: "Wide-leg fleece pant, alternate angle" },
    ],
    variants: [
      { id: "", size: "XS" },
      { id: "", size: "S" },
      { id: "", size: "M" },
      { id: "", size: "L" },
    ],
  },
  {
    handle: "horizon-graphic-hoodie",
    title: "Horizon Graphic Hoodie",
    subtitle: "Off-white fleece, full back print",
    price: 72,
    category: "prodbysu",
    status: "live",
    description:
      "Off-white heavyweight hoodie carrying a full illustrated back panel, shot golden hour over the hills. Limited run, no reprint once it's gone.",
    images: [
      { src: "/images/prodbysu/horizon-hoodie-hero.jpg", alt: "Horizon graphic hoodie back print at golden hour" },
      { src: "/images/prodbysu/horizon-hoodie-alt.jpg", alt: "Horizon graphic hoodie, alternate angle" },
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
