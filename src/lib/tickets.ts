import { getSql } from "./db";

export type TicketTier = "ga" | "reserved";

export type Ticket = {
  id: string;
  tier: TicketTier;
  capacity_used: number;
  buyer_name: string;
  buyer_email: string;
  stripe_session_id: string;
  used: boolean;
  used_at: string | null;
  created_at: string;
};

export async function getCapacityUsed() {
  const sql = getSql();
  const rows = await sql`SELECT COALESCE(SUM(capacity_used), 0) AS used FROM tickets`;
  return Number(rows[0].used);
}

export async function createTicket(input: {
  id: string;
  tier: TicketTier;
  capacityUsed: number;
  buyerName: string;
  buyerEmail: string;
  stripeSessionId: string;
}) {
  const sql = getSql();
  await sql`
    INSERT INTO tickets (id, tier, capacity_used, buyer_name, buyer_email, stripe_session_id)
    VALUES (${input.id}, ${input.tier}, ${input.capacityUsed}, ${input.buyerName}, ${input.buyerEmail}, ${input.stripeSessionId})
  `;
}

export async function getTicketById(id: string) {
  const sql = getSql();
  const rows = await sql`SELECT * FROM tickets WHERE id = ${id}`;
  return rows[0] as Ticket | undefined;
}

export async function markTicketUsed(id: string) {
  const sql = getSql();
  const rows = await sql`
    UPDATE tickets SET used = true, used_at = now()
    WHERE id = ${id} AND used = false
    RETURNING *
  `;
  return rows[0] as Ticket | undefined;
}

export async function getTicketByStripeSession(stripeSessionId: string) {
  const sql = getSql();
  const rows = await sql`SELECT * FROM tickets WHERE stripe_session_id = ${stripeSessionId}`;
  return rows[0] as Ticket | undefined;
}
