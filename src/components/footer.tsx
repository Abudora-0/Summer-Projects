import { GithubIcon, LinkedinIcon, MailIcon, ArrowUpRightIcon } from "@/components/icons";

const links = [
  {
    label: "GitHub",
    href: "https://github.com/Abudora-0",
    icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/m-abdullah-94367b3a1/",
    icon: LinkedinIcon,
  },
  {
    label: "Email",
    href: "mailto:m.abdullah21306@gmail.com",
    icon: MailIcon,
  },
];

export function Footer() {
  return (
    <footer
      id="contact"
      className="scroll-mt-24 border-t border-line px-6 py-24 sm:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">
          Contact
        </p>
        <h2 className="font-display mt-5 max-w-xl text-3xl italic leading-tight text-paper sm:text-4xl">
          Nine products down. Tell me about the tenth.
        </h2>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-muted sm:text-base">
          Open to work, collaborations, or just a good argument about
          whether a bookmark manager really needed a loupe view. It did.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
              data-cursor="link"
              data-cursor-label={l.label}
              className="group flex items-center gap-2.5 rounded-full border border-line px-5 py-3 text-sm text-paper transition-colors hover:border-accent"
            >
              <l.icon className="h-4 w-4 text-muted transition-colors group-hover:text-accent" />
              {l.label}
              <ArrowUpRightIcon className="h-3.5 w-3.5 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ))}
        </div>

        <div className="mt-20 flex flex-col gap-2 border-t border-line pt-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>Abudora, built one summer at a time.</span>
          <span className="font-mono">Lahore, Pakistan</span>
        </div>
      </div>
    </footer>
  );
}
