export type ProductCategory = "prodbysu" | "memes" | "dr-brand";

export type ProductImage = {
  src: string;
  alt: string;
};

export type ProductVariant = {
  id: string;
  size: string;
};

export type Product = {
  handle: string;
  title: string;
  subtitle: string;
  price: number;
  category: ProductCategory;
  status: "live" | "coming-soon";
  description: string;
  images: ProductImage[];
  variants: ProductVariant[];
};

export type CartLine = {
  handle: string;
  variantId: string;
  title: string;
  size: string;
  price: number;
  image: string;
  quantity: number;
};
