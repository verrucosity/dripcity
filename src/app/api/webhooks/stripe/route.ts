import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { event } from "@/lib/event";
import { sendTicketEmail } from "@/lib/email";
import { generateTicketQrCode } from "@/lib/qr";
import { getStripe } from "@/lib/stripe";
import { createTicket, getTicketByStripeSession } from "@/lib/tickets";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let stripeEvent;
  try {
    stripeEvent = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (stripeEvent.type === "checkout.session.completed") {
    const session = stripeEvent.data.object;

    const existing = await getTicketByStripeSession(session.id);
    if (existing) {
      return NextResponse.json({ received: true });
    }

    const tierKey = session.metadata?.tier === "reserved" ? "reserved" : "ga";
    const tier = event.tiers[tierKey];
    const capacityUsed = Number(session.metadata?.capacityUsed ?? tier.capacityUsed);
    const buyerEmail = session.customer_details?.email ?? "";
    const nameField = session.custom_fields?.find((field) => field.key === "ticket_name");
    const buyerName = nameField?.text?.value || session.customer_details?.name || "Guest";

    const ticketId = randomUUID();

    await createTicket({
      id: ticketId,
      tier: tierKey,
      capacityUsed,
      buyerName,
      buyerEmail,
      stripeSessionId: session.id,
    });

    if (buyerEmail) {
      const qrCodeDataUrl = await generateTicketQrCode(ticketId);
      await sendTicketEmail({
        to: buyerEmail,
        buyerName,
        ticketId,
        tierLabel: tier.label,
        qrCodeDataUrl,
      });
    }
  }

  return NextResponse.json({ received: true });
}
