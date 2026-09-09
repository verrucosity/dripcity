import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Drip City Records",
  description: "Terms of service for Drip City Records, including event ticket sales.",
};

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-fg-dim">
        Drip City Records
      </p>
      <h1 className="mt-4 font-display text-5xl uppercase leading-[0.95] tracking-tight sm:text-6xl">
        Terms of Service
      </h1>
      <p className="mt-4 font-mono text-xs uppercase tracking-wide text-fg-dim">
        Last updated October 1, 2026
      </p>

      <div className="mt-12 flex flex-col gap-10 text-fg-dim">
        <p>
          These Terms of Service govern your use of dripcityrecords.com (the &ldquo;Site&rdquo;)
          and any purchase, booking, or ticket made through it. By using the Site, you agree to
          these terms. If you don&rsquo;t agree, don&rsquo;t use the Site.
        </p>

        <div>
          <h2 className="font-display text-2xl uppercase text-fg">What Drip City Records Is</h2>
          <p className="mt-3">
            Drip City Records is an independent label. Through this Site we sell merchandise,
            link out to beat stores operated by our producers, take booking requests for studio
            and production services (&ldquo;Drip Lab&rdquo;), and sell tickets to events we host
            or are involved in presenting.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl uppercase text-fg">Merchandise</h2>
          <p className="mt-3">
            Merch purchases are processed through Shopify. Pricing, availability, and shipping
            are shown at checkout. We&rsquo;re not responsible for delays or issues caused by the
            shipping carrier once an order has left our hands. If something arrives damaged or
            wrong, contact us and we&rsquo;ll sort it out.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl uppercase text-fg">Beats</h2>
          <p className="mt-3">
            Beats linked from this Site are sold through TrakTrain or similar third-party
            platforms operated independently by each producer. Any purchase, license, or dispute
            related to a beat is between you and that platform or producer, not Drip City
            Records.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl uppercase text-fg">Drip Lab Bookings</h2>
          <p className="mt-3">
            Submitting a booking request through the Site is an inquiry, not a confirmed
            reservation. A booking is only confirmed once we follow up directly with you to lock
            in details, pricing, and scheduling.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl uppercase text-fg">Event Tickets</h2>
          <p className="mt-3">
            Tickets purchased through the Site are sold by Drip City Records for the specific
            event listed at checkout. By purchasing a ticket, you agree to the following:
          </p>
          <ul className="mt-3 flex flex-col gap-2 pl-5">
            <li className="list-disc">
              All ticket sales are final. We don&rsquo;t offer refunds or exchanges, except if
              the event is cancelled outright by Drip City Records, in which case ticket holders
              will be offered a refund or credit at our discretion.
            </li>
            <li className="list-disc">
              Your ticket is the QR code sent to the email you provide at checkout. You&rsquo;re
              responsible for keeping it accessible and secure. We&rsquo;re not responsible for
              lost, deleted, shared, or screenshotted-by-someone-else tickets.
            </li>
            <li className="list-disc">
              Events listed as 21+ require valid government-issued photo ID matching the name on
              entry at the door. Entry will be refused without one, with no refund.
            </li>
            <li className="list-disc">
              Venue staff and security reserve the right to refuse entry or remove any guest for
              any reason, including intoxication, aggression, or violation of venue policy.
            </li>
            <li className="list-disc">
              Lineup, set times, doors time, and other event details are subject to change
              without notice. We&rsquo;re not liable for changes to the event as advertised.
            </li>
            <li className="list-disc">
              A Reserved/Table + Bottle Service ticket admits the number of guests stated at
              purchase under a single QR code. The group is responsible for arriving together or
              coordinating entry.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-2xl uppercase text-fg">Conduct</h2>
          <p className="mt-3">
            Don&rsquo;t use the Site to do anything illegal, attempt to interfere with its
            operation, or try to circumvent ticket capacity, pricing, or security measures.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl uppercase text-fg">Intellectual Property</h2>
          <p className="mt-3">
            All branding, artwork, photography, and content on this Site belong to Drip City
            Records or its artists and may not be used without permission.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl uppercase text-fg">Limitation of Liability</h2>
          <p className="mt-3">
            Drip City Records is not liable for indirect, incidental, or consequential damages
            arising from your use of the Site, attendance at an event, or any purchase made
            through it, to the fullest extent permitted by law. Attendance at any event is at
            your own risk.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl uppercase text-fg">Governing Law</h2>
          <p className="mt-3">
            These terms are governed by the laws of the State of California, without regard to
            conflict of law principles.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl uppercase text-fg">Changes</h2>
          <p className="mt-3">
            We may update these terms from time to time. Continued use of the Site after a
            change means you accept the updated terms.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl uppercase text-fg">Contact</h2>
          <p className="mt-3">
            Questions about these terms: su@dripcityrecords.com.
          </p>
        </div>
      </div>
    </section>
  );
}
