import type { Metadata } from "next";
import { EmailSignup } from "@/components/email-signup";

export const metadata: Metadata = {
  title: "EBK | Drip City Records",
  description: "EBK merch from Drip City Records. Coming soon.",
};

export default function EbkPage() {
  return (
    <>
      <section className="flex min-h-[70vh] items-center justify-center border-b border-line">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-fg-dim">
            Drip City Records
          </p>
          <h1 className="mt-4 font-display text-6xl uppercase leading-[0.9] tracking-tight sm:text-7xl">
            EBK
          </h1>
          <p className="mx-auto mt-6 max-w-md text-lg text-fg-dim">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
            praesentium voluptatum deleniti atque corrupti.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <EmailSignup
            heading="Hear It First"
            description="Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit."
          />
        </div>
      </section>
    </>
  );
}
