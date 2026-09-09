import Link from "next/link";
import type { Metadata } from "next";
import { getTicketByStripeSession } from "@/lib/tickets";

export const metadata: Metadata = {
  title: "You're In | Drip City Records",
};

export default async function TicketSuccessPage(props: PageProps<"/tickets/success">) {
  const searchParams = await props.searchParams;
  const sessionId = typeof searchParams.session_id === "string" ? searchParams.session_id : "";
  const ticket = sessionId ? await getTicketByStripeSession(sessionId) : undefined;

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-fg-dim">
        Drip City Records
      </p>
      <h1 className="mt-4 font-display text-5xl uppercase leading-tight sm:text-6xl">
        You&apos;re In
      </h1>
      {ticket ? (
        <p className="mt-6 max-w-md text-lg text-fg-dim">
          Your ticket is on its way to {ticket.buyer_email}. Show the QR code from that
          email at the door.
        </p>
      ) : (
        <p className="mt-6 max-w-md text-lg text-fg-dim">
          Payment went through. Your ticket with a QR code is on its way to your email
          now, give it a minute if it&apos;s not there yet.
        </p>
      )}
      <Link
        href="/"
        className="mt-10 flex h-14 items-center bg-accent px-8 text-sm font-semibold uppercase tracking-[0.2em] text-fg transition-opacity hover:opacity-90"
      >
        Back To Home
      </Link>
    </section>
  );
}
