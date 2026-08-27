import { artist } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-ink px-5 pb-10 pt-6 text-white md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 border-t border-white/15 pt-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-2xl font-semibold uppercase tracking-[-0.04em]">
            Aureliah Milagres
          </p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
            © {new Date().getFullYear()} · {artist.email}
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/55">
          {artist.socials.map((social) => (
            <li key={social.name}>
              <a href={social.href} target="_blank" rel="noreferrer" className="hover:text-white">
                {social.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
