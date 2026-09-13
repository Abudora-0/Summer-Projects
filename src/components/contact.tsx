"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LocalTime } from "@/components/local-time";
import {
  ArrowUpRightIcon,
  CheckIcon,
  CopyIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
} from "@/components/icons";

const EMAIL = "m.abdullah21306@gmail.com";

/*
 * There is no backend here, so a contact form would be a lie. Instead the
 * intent chips assemble a mailto with the subject and opening line already
 * written, which is the part people stall on anyway.
 */
const INTENTS = [
  {
    id: "hiring",
    label: "Hiring",
    subject: "A role I think you would fit",
    body: "Hi Abdullah,\n\nWe are hiring and your summer projects caught my eye. Here is what we are working on:\n\n",
  },
  {
    id: "freelance",
    label: "Freelance",
    subject: "A project I would like built",
    body: "Hi Abdullah,\n\nI have something I would like built. Rough shape of it:\n\n",
  },
  {
    id: "collab",
    label: "Collaboration",
    subject: "Want to build something together?",
    body: "Hi Abdullah,\n\nI have an idea I think we could build together:\n\n",
  },
  {
    id: "hello",
    label: "Just saying hi",
    subject: "Hello",
    body: "Hi Abdullah,\n\nSaw your portfolio. ",
  },
];

const SOCIALS = [
  { label: "GitHub", handle: "Abudora-0", href: "https://github.com/Abudora-0", Icon: GithubIcon },
  {
    label: "LinkedIn",
    handle: "m-abdullah",
    href: "https://www.linkedin.com/in/m-abdullah-94367b3a1/",
    Icon: LinkedinIcon,
  },
];

export function Contact() {
  const [intent, setIntent] = useState(INTENTS[0]);
  const [copied, setCopied] = useState(false);

  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(
    intent.subject
  )}&body=${encodeURIComponent(intent.body)}`;

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked. The address is on screen either way.
    }
  }

  return (
    <section
      id="contact"
      className="relative scroll-mt-28 overflow-hidden border-t border-line px-6 py-24 sm:px-10 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 -z-10 h-[30rem] w-[46rem] -translate-x-1/2 rounded-full opacity-60 blur-[120px]"
        style={{ background: "var(--accent-quiet)" }}
      />

      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-accent">
          Contact
        </p>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="font-display text-[clamp(2.4rem,6.5vw,4.5rem)] font-light italic leading-[1.02] tracking-[-0.02em] text-fg">
              Nine down.
              <br />
              Tell me about
              <br />
              the tenth.
            </h2>

            <p className="mt-7 max-w-md text-base leading-relaxed text-muted">
              Open to work, collaborations, or a good argument about whether a
              bookmark manager really needed a loupe view. It did.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <LocalTime compact />
              <span className="font-mono text-xs text-faint">Usually replies same day</span>
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-bg-raised p-6 sm:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
              What is this about?
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {INTENTS.map((option) => {
                const active = option.id === intent.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => setIntent(option)}
                    className="relative rounded-full px-4 py-2 text-xs transition-colors duration-300"
                  >
                    {active && (
                      <motion.span
                        layoutId="intent-pill"
                        className="absolute inset-0 rounded-full border border-accent-line bg-accent-soft"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span
                      className={`relative ${active ? "text-fg" : "text-muted"}`}
                    >
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 rounded-xl border border-line bg-bg p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                Subject
              </p>
              <p className="mt-1.5 text-sm text-fg">{intent.subject}</p>
            </div>

            <a
              href={mailto}
              className="group mt-4 flex w-full items-center justify-between gap-3 rounded-xl bg-fg px-5 py-4 text-sm font-medium text-bg transition-transform duration-300 hover:-translate-y-0.5"
            >
              <span className="flex items-center gap-2.5">
                <MailIcon className="h-4 w-4" />
                Open in your mail app
              </span>
              <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <button
              onClick={copyEmail}
              className="mt-3 flex w-full items-center justify-between gap-3 rounded-xl border border-line px-5 py-3.5 text-sm text-muted transition-colors duration-300 hover:border-accent-line hover:text-fg"
            >
              <span className="truncate font-mono text-xs">{EMAIL}</span>
              <span className="flex shrink-0 items-center gap-1.5 text-xs">
                {copied ? (
                  <>
                    <CheckIcon className="h-3.5 w-3.5 text-accent" />
                    Copied
                  </>
                ) : (
                  <>
                    <CopyIcon className="h-3.5 w-3.5" />
                    Copy
                  </>
                )}
              </span>
            </button>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-xl border border-line px-4 py-3.5 transition-colors duration-300 hover:border-accent-line"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
                    style={{ background: "var(--accent-quiet)" }}
                  />
                  <span className="relative flex items-center gap-2.5">
                    <s.Icon className="h-4 w-4 text-muted transition-colors group-hover:text-accent" />
                    <span className="min-w-0">
                      <span className="block text-xs text-fg">{s.label}</span>
                      <span className="block truncate font-mono text-[10px] text-faint">
                        {s.handle}
                      </span>
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
