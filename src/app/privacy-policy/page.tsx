import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Drip City Records",
  description: "How Drip City Records collects and uses your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-fg-dim">
        Drip City Records
      </p>
      <h1 className="mt-4 font-display text-5xl uppercase leading-[0.95] tracking-tight sm:text-6xl">
        Privacy Policy
      </h1>
      <p className="mt-4 font-mono text-xs uppercase tracking-wide text-fg-dim">
        Last updated October 1, 2026
      </p>

      <div className="mt-12 flex flex-col gap-10 text-fg-dim">
        <p>
          This policy covers how Drip City Records collects, uses, and protects information when
          you use dripcityrecords.com (the &ldquo;Site&rdquo;).
        </p>

        <div>
          <h2 className="font-display text-2xl uppercase text-fg">Information We Collect</h2>
          <p className="mt-3">Depending on how you use the Site, we may collect:</p>
          <ul className="mt-3 flex flex-col gap-2 pl-5">
            <li className="list-disc">
              Your name and email address, when you buy a ticket, submit a Drip Lab booking
              request, or sign up for email updates.
            </li>
            <li className="list-disc">
              Order and booking details you provide, like preferred dates or project details.
            </li>
            <li className="list-disc">
              Payment information when you make a purchase. We don&rsquo;t see or store your full
              card number. That&rsquo;s handled directly by Stripe (tickets) or Shopify (merch).
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-2xl uppercase text-fg">How We Use It</h2>
          <ul className="mt-3 flex flex-col gap-2 pl-5">
            <li className="list-disc">To deliver your ticket (including the QR code) by email.</li>
            <li className="list-disc">To process and fulfill merch orders.</li>
            <li className="list-disc">To follow up on and confirm Drip Lab booking requests.</li>
            <li className="list-disc">
              To send updates about drops, shows, or releases, if you signed up for them.
            </li>
            <li className="list-disc">
              To verify tickets and prevent duplicate entry at the door.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-2xl uppercase text-fg">Third-Party Services</h2>
          <p className="mt-3">We use the following services to run the Site. Each handles the data involved in its own part of the process:</p>
          <ul className="mt-3 flex flex-col gap-2 pl-5">
            <li className="list-disc">
              <span className="text-fg">Stripe</span> processes ticket payments and stores your
              payment details securely.
            </li>
            <li className="list-disc">
              <span className="text-fg">Shopify</span> processes merch orders and payments.
            </li>
            <li className="list-disc">
              <span className="text-fg">Resend</span> sends transactional emails, like your
              ticket and booking confirmations.
            </li>
            <li className="list-disc">
              <span className="text-fg">Vercel and Neon</span> host the Site and store ticket and
              order records.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-2xl uppercase text-fg">Email Communications</h2>
          <p className="mt-3">
            If you sign up for email updates, you can unsubscribe at any time using the link in
            any email we send. Transactional emails, like a ticket confirmation, aren&rsquo;t
            optional since they contain something you need.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl uppercase text-fg">Data Retention</h2>
          <p className="mt-3">
            We keep ticket and order records as long as needed for event check-in, customer
            support, and our own business and legal purposes.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl uppercase text-fg">Security</h2>
          <p className="mt-3">
            We take reasonable steps to protect the information you give us, but no online system
            is completely secure. Payment information is handled directly by Stripe and Shopify
            and never stored on our own servers.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl uppercase text-fg">Children&rsquo;s Privacy</h2>
          <p className="mt-3">
            This Site isn&rsquo;t directed at children, and our 21+ events aren&rsquo;t open to
            minors. We don&rsquo;t knowingly collect information from anyone under 13.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl uppercase text-fg">Your Choices</h2>
          <p className="mt-3">
            You can ask us to delete information we hold about you or unsubscribe from marketing
            emails at any time by contacting us below.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl uppercase text-fg">Changes</h2>
          <p className="mt-3">
            We may update this policy from time to time. Changes take effect as soon as they&rsquo;re
            posted here.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl uppercase text-fg">Contact</h2>
          <p className="mt-3">
            Questions about this policy or your data: su@dripcityrecords.com.
          </p>
        </div>
      </div>
    </section>
  );
}
