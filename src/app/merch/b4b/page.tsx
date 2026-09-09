import type { Metadata } from "next";
import { EmailSignup } from "@/components/email-signup";

export const metadata: Metadata = {
  title: "B4B | Drip City Records",
  description: "B4B merch from Drip City Records. Coming soon.",
};

export default function B4bPage() {
  return (
    <>
      <section className="flex min-h-[70vh] items-center justify-center border-b border-line">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-fg-dim">
            Drip City Records
          </p>
          <h1 className="mt-4 font-display text-6xl uppercase leading-[0.9] tracking-tight sm:text-7xl">
            B4B
          </h1>
          <p className="mx-auto mt-6 max-w-md text-lg text-fg-dim">
            Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil
            molestiae consequatur.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <EmailSignup
            heading="Hear It First"
            description="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
          />
        </div>
      </section>
    </>
  );
}
