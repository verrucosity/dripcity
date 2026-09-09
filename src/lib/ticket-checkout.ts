"use server";

import { redirect } from "next/navigation";
import { event, getTierPrice } from "./event";
import { getStripe } from "./stripe";
import { getCapacityUsed } from "./tickets";

function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3010";
}

export async function buyTicketAction(formData: FormData) {
  const tierKey = formData.get("tier");
  if (tierKey !== "ga" && tierKey !== "reserved") return;

  const tier = event.tiers[tierKey];
  const used = await getCapacityUsed();

  if (used + tier.capacityUsed > event.totalCapacity) {
    redirect("/tickets?sold-out=1");
  }

  const origin = siteUrl();

  const session = await getStripe().checkout.sessions.create({
    mode: "payment",
    managed_payments: { enabled: false },
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: getTierPrice(tierKey) * 100,
          product_data: {
            name: `${tier.label}, ${event.name}`,
            description: tier.description,
          },
        },
        quantity: 1,
      },
    ],
    custom_fields: [
      {
        key: "ticket_name",
        label: { type: "custom", custom: "Name on ticket" },
        type: "text",
      },
    ],
    metadata: {
      tier: tierKey,
      capacityUsed: String(tier.capacityUsed),
    },
    success_url: `${origin}/tickets/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/tickets`,
  });

  if (session.url) redirect(session.url);
}
