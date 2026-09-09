import type { Metadata } from "next";
import { EmailSignup } from "@/components/email-signup";

export const metadata: Metadata = {
  title: "Meme Merch | ProdBySu",
  description: "Shirts built from the memes that went viral. Drops loading soon.",
};

const teased = [
  { mark: "😭", label: "Drop 001" },
  { mark: "💀", label: "Drop 002" },
  { mark: "🗿", label: "Drop 003" },
  { mark: "🐸", label: "Drop 004" },
  { mark: "🔥", label: "Drop 005" },
  { mark: "👁️", label: "Drop 006" },
];

export default function MemesPage() {
  return (
    <>
      <section className="border-b border-line bg-bg-raised py-24">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-meme">
            ProdBySu Merch
          </p>
          <h1 className="mt-4 font-display text-6xl uppercase leading-[0.9] tracking-tight sm:text-7xl">
            Meme Merch
          </h1>
          <p className="mt-6 max-w-lg text-lg text-fg-dim">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed
            quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {teased.map((item) => (
            <div
              key={item.label}
              className="flex aspect-[4/5] flex-col items-center justify-center gap-4 border border-dashed border-line bg-bg-raised"
            >
              <span className="text-5xl opacity-70">{item.mark}</span>
              <div className="text-center">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-fg-dim">
                  {item.label}
                </p>
                <p className="mt-1 font-display text-sm uppercase tracking-wide text-fg-dim">
                  Loading
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line py-24">
        <div className="mx-auto max-w-6xl px-6">
          <EmailSignup
            heading="Be First to the Drop"
            description="Meme merch launches in limited runs. Get on the list and you'll know the second it's live."
          />
        </div>
      </section>
    </>
  );
}
