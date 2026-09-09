"use server";

import { redirect } from "next/navigation";
import { createShopifyCheckout } from "@/lib/shopify";
import type { CartLine } from "@/lib/types";

export async function checkoutAction(formData: FormData) {
  const raw = formData.get("cart");
  if (typeof raw !== "string") return;

  const lines = JSON.parse(raw) as CartLine[];
  const validLines = lines.filter((line) => line.variantId);
  if (validLines.length === 0) return;

  const checkoutUrl = await createShopifyCheckout(
    validLines.map((line) => ({ variantId: line.variantId, quantity: line.quantity }))
  );

  if (checkoutUrl) redirect(checkoutUrl);
}
