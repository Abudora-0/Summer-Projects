"use client";

import Link from "next/link";
import { projects } from "@/data/projects";
import { LocalTime } from "@/components/local-time";
import {
  ArrowUpIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
} from "@/components/icons";

const SITEMAP = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#work" },
  { label: "Contact", href: "/#contact" },
];

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/Abudora-0", Icon: GithubIcon },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/m-abdullah-94367b3a1/",
    Icon: LinkedinIcon,
  },
  { label: "Email", href: "mailto:m.abdullah21306@gmail.com", Icon: MailIcon },
];

function Column({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
  external,
  dot,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  dot?: string;
}) {
  const className =
    "group inline-flex items-center gap-2 text-sm text-muted transition-colors duration-300 hover:text-fg";
  const inner = (
    <>
      {dot && (
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full transition-transform duration-300 group-hover:scale-150"
          style={{ background: dot }}
        />
      )}
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:origin-left group-hover:scale-x-100" />
      </span>
    </>
  );

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={className}>
      {inner}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg-sunken">
      <div className="mx-auto max-w-6xl px-6 pt-20 sm:px-10">
        <div className="grid gap-10 pb-16 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <p className="font-display text-xl italic text-fg">Abudora</p>
            <p className="mt-3 max-w-[24ch] text-sm leading-relaxed text-muted">
              Nine products, one summer, built in Lahore and deployed from a
              bedroom desk.
            </p>
            <div className="mt-5">
              <LocalTime compact />
            </div>
          </div>

          <Column title="Site">
            {SITEMAP.map((l) => (
              <li key={l.href}>
                <FooterLink href={l.href}>{l.label}</FooterLink>
              </li>
            ))}
          </Column>

          <Column title="The nine">
            {projects.map((p) => (
              <li key={p.slug}>
                <FooterLink href={`/work/${p.slug}`} dot={p.accent}>
                  {p.name}
                </FooterLink>
              </li>
            ))}
          </Column>

          <div className="space-y-8">
            <Column title="Elsewhere">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group inline-flex items-center gap-2.5 text-sm text-muted transition-colors duration-300 hover:text-fg"
                  >
                    <s.Icon className="h-3.5 w-3.5 transition-colors group-hover:text-accent" />
                    {s.label}
                  </a>
                </li>
              ))}
            </Column>

            <div>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                Colophon
              </h3>
              <p className="mt-4 text-xs leading-relaxed text-faint">
                Next.js and Tailwind, typeset in Fraunces, Bricolage Grotesque
                and Geist. Screenshots captured from the live deployments by a
                script in this repo.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* The wordmark as a floor: cropped by the viewport edge on purpose. */}
      <div className="relative select-none overflow-hidden px-6 sm:px-10">
        <p
          aria-hidden
          className="font-mark pointer-events-none w-full translate-y-[0.18em] text-center text-[19vw] font-bold leading-[0.78] tracking-[-0.04em] text-fg opacity-[0.07]"
        >
          Abudora
        </p>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-4 border-t border-line px-6 py-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <p>
          © {new Date().getFullYear()} Muhammad Abdullah. MIT licensed.
        </p>
        <div className="flex items-center gap-5">
          <span className="font-mono">Built one summer at a time</span>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group inline-flex items-center gap-1.5 transition-colors hover:text-fg"
          >
            <ArrowUpIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            Top
          </button>
        </div>
      </div>
    </footer>
  );
}
