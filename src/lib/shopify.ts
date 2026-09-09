const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const apiVersion = "2025-01";

export const shopifyConfigured = Boolean(domain && token);

type ShopifyLine = {
  variantId: string;
  quantity: number;
};

async function shopifyFetch(query: string, variables: Record<string, unknown>) {
  const response = await fetch(`https://${domain}/api/${apiVersion}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token as string,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  const json = await response.json();

  if (json.errors) {
    throw new Error(json.errors[0]?.message ?? "Shopify request failed");
  }

  return json.data;
}

const CART_CREATE_MUTATION = `
  mutation CartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart {
        checkoutUrl
      }
      userErrors {
        message
      }
    }
  }
`;

export async function createShopifyCheckout(lines: ShopifyLine[]) {
  if (!shopifyConfigured || lines.length === 0) return null;

  const data = await shopifyFetch(CART_CREATE_MUTATION, {
    lines: lines.map((line) => ({
      merchandiseId: line.variantId,
      quantity: line.quantity,
    })),
  });

  const userErrors = data?.cartCreate?.userErrors;
  if (userErrors?.length) {
    throw new Error(userErrors[0].message);
  }

  return (data?.cartCreate?.cart?.checkoutUrl as string | undefined) ?? null;
}
