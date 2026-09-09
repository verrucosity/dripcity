import Image from "next/image";
import type { Metadata } from "next";
import { EmailSignup } from "@/components/email-signup";

export const metadata: Metadata = {
  title: "DR Brand | Drip City Records",
  description: "Drip City Records Brand streetwear line. Coming soon.",
};

export default function DrBrandPage() {
  return (
    <>
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
        <Image
          src="/images/prodbysu/studio-session-bts.jpg"
          alt="Drip City Records Brand, coming soon"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-top opacity-30 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/60 to-bg" />
        <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-fg-dim">
            Drip City Records
          </p>
          <h1 className="mt-4 font-display text-6xl uppercase leading-[0.9] tracking-tight sm:text-7xl">
            DR Brand
          </h1>
          <p className="mx-auto mt-6 max-w-md text-lg text-fg-dim">
            Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil
            molestiae consequatur.
          </p>
        </div>
      </section>

      <section className="border-t border-line py-24">
        <div className="mx-auto max-w-6xl px-6">
          <EmailSignup
            heading="Hear It First"
            description="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti."
          />
        </div>
      </section>
    </>
  );
}
