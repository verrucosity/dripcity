import { notFound } from "next/navigation";
import { InquiryForm } from "@/components/inquiry-form";
import { getService, services } from "@/lib/services";

export function generateStaticParams() {
  return services.map((service) => ({ service: service.handle }));
}

export async function generateMetadata(props: PageProps<"/drip-lab/[service]">) {
  const { service: handle } = await props.params;
  const service = getService(handle);
  if (!service) return {};
  return {
    title: `${service.title} | Drip Lab`,
    description: service.description,
  };
}

export default async function ServicePage(props: PageProps<"/drip-lab/[service]">) {
  const { service: handle } = await props.params;
  const service = getService(handle);

  if (!service) notFound();

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-fg-dim">Drip Lab</p>
      <h1 className="mt-4 font-display text-5xl uppercase leading-tight sm:text-6xl">
        {service.title}
      </h1>
      <p className="mt-4 max-w-lg text-lg text-fg-dim">{service.description}</p>
      <div className="mt-12">
        <InquiryForm service={service.title} />
      </div>
    </section>
  );
}
