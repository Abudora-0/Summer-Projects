import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import { ProjectAccentSync } from "@/components/project-accent-sync";
import { ProjectGallery } from "@/components/project-gallery";
import { Footer } from "@/components/footer";
import { GithubIcon, ArrowUpRightIcon } from "@/components/icons";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} - Abudora`,
    description: project.tagline,
  };
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <main className="flex-1">
      <ProjectAccentSync accent={project.accent} accentSoft={project.accentSoft} />

      <section className="border-b border-line px-6 pb-16 pt-16 sm:px-10 sm:pt-20">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/#work"
            data-cursor="link"
            className="font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-paper"
          >
            ← All work
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-muted"
              >
                {t}
              </span>
            ))}
            {project.deployNote && (
              <span className="rounded-full border border-accent/40 px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-accent">
                Note
              </span>
            )}
          </div>

          <h1 className="font-display mt-6 text-4xl italic leading-tight text-paper sm:text-6xl">
            {project.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">{project.tagline}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={project.deployUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              data-cursor-label="Open"
              className="group flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--accent)" }}
            >
              View live
              <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-medium text-paper transition-colors hover:border-accent"
            >
              <GithubIcon className="h-4 w-4" />
              View source
            </a>
            <span className="font-mono text-xs text-muted">
              Shipped {project.lastShipped}
            </span>
          </div>

          {project.deployNote && (
            <p className="mt-4 max-w-xl text-xs leading-relaxed text-muted">
              {project.deployNote}
            </p>
          )}
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-4xl">
          <ProjectGallery project={project} />
        </div>
      </section>

      <section className="border-t border-line px-6 py-16 sm:px-10">
        <div className="mx-auto grid max-w-4xl gap-12 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">
              What it does
            </p>
            <p className="mt-5 text-[15px] leading-relaxed text-muted sm:text-base">
              {project.description}
            </p>

            <p className="mt-10 font-mono text-xs uppercase tracking-[0.24em] text-accent">
              Notable features
            </p>
            <ul className="mt-5 space-y-3">
              {project.features.map((f) => (
                <li
                  key={f}
                  className="flex gap-3 text-[15px] leading-relaxed text-muted sm:text-base"
                >
                  <span
                    className="mt-2.5 h-1 w-1 shrink-0 rounded-full"
                    style={{ background: "var(--accent)" }}
                  />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">
              Stack
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-lg border border-line px-3 py-1.5 font-mono text-xs text-paper"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line px-6 py-10 sm:px-10">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-6">
          <Link
            href={`/work/${prev.slug}`}
            data-cursor="link"
            className="group flex flex-col text-left"
          >
            <span className="font-mono text-[10px] uppercase tracking-wide text-muted">
              Previous
            </span>
            <span className="font-display italic text-paper transition-colors group-hover:text-accent">
              {prev.name}
            </span>
          </Link>
          <Link
            href={`/work/${next.slug}`}
            data-cursor="link"
            className="group flex flex-col text-right"
          >
            <span className="font-mono text-[10px] uppercase tracking-wide text-muted">
              Next
            </span>
            <span className="font-display italic text-paper transition-colors group-hover:text-accent">
              {next.name}
            </span>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
