import { NextResponse } from "next/server";
import { event } from "@/lib/event";
import { isRateLimited, recordAttempt } from "@/lib/rate-limit";
import { getTicketById, markTicketUsed } from "@/lib/tickets";

const PIN_ATTEMPT_LIMIT = 8;
const PIN_ATTEMPT_WINDOW_MS = 10 * 60 * 1000;

export async function POST(request: Request) {
  const body = await request.json();
  const { ticketId, pin } = body as { ticketId?: string; pin?: string };

  const clientKey = `pin:${request.headers.get("x-forwarded-for") ?? "unknown"}`;

  if (isRateLimited(clientKey, PIN_ATTEMPT_LIMIT)) {
    return NextResponse.json({ status: "unauthorized" }, { status: 429 });
  }

  if (pin !== process.env.CHECKIN_PIN) {
    recordAttempt(clientKey, PIN_ATTEMPT_WINDOW_MS);
    return NextResponse.json({ status: "unauthorized" }, { status: 401 });
  }

  if (!ticketId) {
    return NextResponse.json({ status: "invalid" });
  }

  const ticket = await getTicketById(ticketId.trim());

  if (!ticket) {
    return NextResponse.json({ status: "invalid" });
  }

  if (ticket.used) {
    return NextResponse.json({
      status: "already-used",
      usedAt: ticket.used_at,
      buyerName: ticket.buyer_name,
      tierLabel: event.tiers[ticket.tier].label,
    });
  }

  const updated = await markTicketUsed(ticket.id);

  if (!updated) {
    return NextResponse.json({ status: "already-used", buyerName: ticket.buyer_name });
  }

  return NextResponse.json({
    status: "valid",
    buyerName: updated.buyer_name,
    tierLabel: event.tiers[updated.tier].label,
  });
}
