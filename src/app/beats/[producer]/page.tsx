import { notFound } from "next/navigation";
import { EmailSignup } from "@/components/email-signup";
import { getProducer, producers } from "@/lib/beats";

export function generateStaticParams() {
  return producers.map((producer) => ({ producer: producer.handle }));
}

export async function generateMetadata(props: PageProps<"/beats/[producer]">) {
  const { producer: handle } = await props.params;
  const producer = getProducer(handle);
  if (!producer) return {};
  return {
    title: `${producer.name} | Purchase Beats`,
    description: `Beats from ${producer.name} on Drip City Records.`,
  };
}

export default async function ProducerPage(props: PageProps<"/beats/[producer]">) {
  const { producer: handle } = await props.params;
  const producer = getProducer(handle);

  if (!producer) notFound();

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-fg-dim">
        Purchase Beats
      </p>
      <h1 className="mt-4 font-display text-6xl uppercase leading-[0.9] tracking-tight sm:text-7xl">
        {producer.name}
      </h1>
      {producer.traktrainWidgetSrc ? (
        <div className="mt-12">
          <iframe
            src={producer.traktrainWidgetSrc}
            title={`${producer.name} beat store`}
            className="h-[900px] w-full border border-line"
          />
        </div>
      ) : producer.traktrainUrl ? (
        <div className="mt-12 max-w-2xl">
          <p className="text-lg text-fg-dim">
            {producer.name} beats are sold through TrakTrain. Head over to shop the full
            catalog.
          </p>
          <a
            href={producer.traktrainUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 flex h-14 w-full max-w-xs items-center justify-center bg-accent text-sm font-semibold uppercase tracking-[0.2em] text-fg transition-opacity hover:opacity-90"
          >
            Shop on TrakTrain
          </a>
        </div>
      ) : (
        <div className="mt-12 max-w-2xl">
          <p className="text-lg text-fg-dim">
            The {producer.name} beat store is loading. Drop your email and get word the
            second it goes live.
          </p>
          <div className="mt-10">
            <EmailSignup
              heading="Get Notified"
              description="Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            />
          </div>
        </div>
      )}
    </section>
  );
}
