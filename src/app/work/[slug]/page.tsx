import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatMonth, getProject, projects } from "@/data/projects";
import { ProjectAccentSync } from "@/components/project-accent-sync";
import { ProjectGallery } from "@/components/project-gallery";
import { TechIcon } from "@/components/tech-icon";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  GithubIcon,
} from "@/components/icons";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.tagline,
    openGraph: {
      title: `${project.name}, by Abudora`,
      description: project.tagline,
      images: [{ url: project.shots[0].src }],
    },
  };
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const i = projects.findIndex((p) => p.slug === slug);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];

  return (
    <main className="flex-1">
      <ProjectAccentSync accent={project.accent} />

      <section className="relative overflow-hidden px-6 pb-14 pt-32 sm:px-10 sm:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-56 left-1/2 -z-10 h-[34rem] w-[52rem] -translate-x-1/2 rounded-full opacity-70 blur-[130px]"
          style={{ background: "var(--accent-quiet)" }}
        />

        <div className="mx-auto max-w-5xl">
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-fg"
          >
            <ArrowLeftIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
            All work
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] tabular-nums text-faint">
              {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
            <span className="text-faint">·</span>
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted"
              >
                {t}
              </span>
            ))}
          </div>

          <h1 className="font-display mt-6 text-[clamp(2.8rem,9vw,6rem)] font-light italic leading-[0.98] tracking-[-0.02em] text-fg">
            {project.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted sm:text-xl">
            {project.tagline}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={project.deployUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-bg transition-transform duration-300 hover:-translate-y-0.5"
              style={{ background: "var(--accent)" }}
            >
              Visit the live site
              <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3.5 text-sm font-medium text-fg transition-colors duration-300 hover:border-accent-line hover:bg-accent-quiet"
            >
              <GithubIcon className="h-4 w-4" />
              Source
            </a>
          </div>

          {project.deployNote && (
            <p className="mt-4 max-w-xl text-xs leading-relaxed text-faint">
              {project.deployNote}
            </p>
          )}
        </div>
      </section>

      <section className="px-6 sm:px-10">
        <div className="mx-auto max-w-5xl">
          <ProjectGallery project={project} />
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10">
        <div className="mx-auto grid max-w-5xl gap-14 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
              What it does
            </h2>
            <p className="mt-5 text-[15px] leading-[1.75] text-muted sm:text-base">
              {project.description}
            </p>

            <h2 className="mt-12 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
              Notable features
            </h2>
            <ul className="mt-5 space-y-3.5">
              {project.features.map((f) => (
                <li key={f} className="flex gap-3.5 text-[15px] leading-relaxed text-muted">
                  <span
                    className="mt-2 h-1 w-1 shrink-0 rounded-full"
                    style={{ background: "var(--accent)" }}
                  />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Sticks alongside the prose on desktop so the links stay reachable. */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-line bg-bg-raised p-6">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-faint">
                Built with
              </h2>
              <ul className="mt-4 space-y-2.5">
                {project.stack.map((s) => (
                  <li key={s} className="flex items-center gap-2.5 text-sm text-fg">
                    <TechIcon name={s} className="h-4 w-4 shrink-0 text-muted" />
                    {s}
                  </li>
                ))}
              </ul>

              <dl className="mt-7 space-y-3 border-t border-line pt-5 text-xs">
                <div className="flex justify-between gap-4">
                  <dt className="text-faint">Started</dt>
                  <dd className="text-muted">{formatMonth(project.startedAt)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-faint">Shipped</dt>
                  <dd className="text-muted">{formatMonth(project.shippedAt)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-faint">Commits</dt>
                  <dd className="tabular-nums text-muted">{project.commits}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-faint">Domain</dt>
                  <dd className="text-muted">{project.domain}</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </section>

      <nav className="border-t border-line px-6 sm:px-10">
        <div className="mx-auto grid max-w-5xl grid-cols-2 divide-x divide-[var(--line)]">
          {[
            { p: prev, dir: "Previous" as const },
            { p: next, dir: "Next" as const },
          ].map(({ p, dir }) => (
            <Link
              key={dir}
              href={`/work/${p.slug}`}
              className={`group flex items-center gap-4 py-8 transition-colors duration-300 hover:bg-accent-quiet ${
                dir === "Next" ? "flex-row-reverse pl-6 text-right sm:pl-10" : "pr-6 sm:pr-10"
              }`}
            >
              <span className="relative hidden h-14 w-24 shrink-0 overflow-hidden rounded-lg border border-line sm:block">
                <Image
                  src={p.shots[0].src}
                  alt=""
                  fill
                  sizes="96px"
                  className="object-cover object-top"
                />
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                  {dir === "Previous" && (
                    <ArrowLeftIcon className="h-3 w-3 transition-transform duration-300 group-hover:-translate-x-1" />
                  )}
                  {dir}
                  {dir === "Next" && (
                    <ArrowRightIcon className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                  )}
                </span>
                <span className="font-display mt-1 block truncate text-xl italic text-fg transition-colors group-hover:text-accent">
                  {p.name}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </nav>

      <Contact />
      <Footer />
    </main>
  );
}
