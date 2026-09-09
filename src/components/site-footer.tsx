import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-bg-raised">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16 md:flex-row md:justify-between">
        <div className="max-w-sm">
          <p className="font-display text-3xl uppercase">Drip City Records</p>
          <p className="mt-4 text-sm text-fg-dim">
            Lorem ipsum dolor sit amet consectetur adipiscing elit.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-4">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-fg-dim">
              Beats
            </p>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/beats" className="hover:text-accent">
                  All Beats
                </Link>
              </li>
              <li>
                <Link href="/drip-lab" className="hover:text-accent">
                  Drip Lab
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-fg-dim">
              Merch
            </p>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/merch/dcr-brand" className="hover:text-accent">
                  DCR Brand
                </Link>
              </li>
              <li>
                <Link href="/merch/prodbysu" className="hover:text-accent">
                  ProdBySu
                </Link>
              </li>
              <li>
                <Link href="/merch/ebk" className="hover:text-accent">
                  EBK
                </Link>
              </li>
              <li>
                <Link href="/merch/b4b" className="hover:text-accent">
                  B4B
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-fg-dim">
              Follow
            </p>
            <ul className="flex flex-col gap-2">
              <li>
                <a href="#" className="hover:text-accent">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent">
                  TikTok
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-line px-6 py-6 text-center font-mono text-xs uppercase tracking-[0.2em] text-fg-dim">
        © {new Date().getFullYear()} Drip City Records. All rights reserved.
      </div>
    </footer>
  );
}
