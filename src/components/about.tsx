const notes = [
  { k: "01", v: "9 products shipped, all deployed, all still running" },
  { k: "02", v: "3 of them ship their own browser extension" },
  { k: "03", v: "1 of them can read a manga page and translate it live" },
  { k: "04", v: "0 of them share a single template or layout" },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-line px-6 py-24 sm:px-10">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">
            About
          </p>
          <h2 className="font-display mt-5 max-w-lg text-3xl italic leading-tight text-paper sm:text-4xl">
            I build things that could have been boring, and then refuse to
            let them be.
          </h2>
          <div className="mt-8 max-w-xl space-y-5 text-[15px] leading-relaxed text-muted sm:text-base">
            <p>
              Most bookmark managers are a list. Mine is a contact sheet. Most
              CV builders give you a template. Mine changes its entire
              personality depending on the job you are chasing. Give me a
              problem everyone has already solved once, and I will find the
              version of it nobody bothered to make interesting.
            </p>
            <p>
              This portfolio covers a single summer of that habit, nine
              separate products, each with its own stack, its own visual
              language, and its own reason for existing. Some scratch a
              personal itch, like an academic dashboard for my own
              university. Some are just an excuse to learn something new,
              like teaching a browser to read manga out loud.
            </p>
            <p>
              Off the clock I am probably still building something,
              arguing with an API that returns undocumented fields, or
              trying to make a loading spinner feel less like an apology.
            </p>
          </div>
        </div>

        <dl className="grid content-start gap-px overflow-hidden rounded-2xl border border-line bg-line/40 sm:grid-cols-2 lg:grid-cols-1">
          {notes.map((n) => (
            <div key={n.k} className="bg-surface px-6 py-6">
              <dt className="font-mono text-xs text-accent">{n.k}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-paper">{n.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
