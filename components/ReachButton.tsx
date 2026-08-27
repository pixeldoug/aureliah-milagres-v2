type Shared = {
  children: string;
  invert?: boolean;
};

type Props = Shared & ({ href: string; onClick?: never } | { href?: never; onClick: () => void });

export function ReachButton({ children, invert = false, ...props }: Props) {
  const dark = invert;
  const className = `group inline-flex items-stretch overflow-hidden border text-[11px] font-medium uppercase tracking-[0.18em] transition-colors ${
    dark
      ? "border-white bg-transparent text-white hover:bg-white hover:text-ink"
      : "border-ink bg-white text-ink hover:bg-ink hover:text-white"
  }`;

  const inner = (
    <>
      <span className="px-5 py-3">{children}</span>
      <span
        className={`flex w-11 items-center justify-center border-l transition-transform duration-300 ${
          dark ? "border-white/30" : "border-ink/20"
        } group-hover:translate-x-0.5`}
      >
        →
      </span>
    </>
  );

  if ("onClick" in props && props.onClick) {
    return (
      <button type="button" onClick={props.onClick} className={className}>
        {inner}
      </button>
    );
  }

  return (
    <a href={"href" in props ? props.href : undefined} className={className}>
      {inner}
    </a>
  );
}
