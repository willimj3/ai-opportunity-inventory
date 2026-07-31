import Link from "next/link";
import { INTEREST_FORM_URL, SUBSTACK_URL, UT_INVENTORY_URL } from "@/lib/config";
import { getOpportunities, uniqueValues } from "@/lib/inventory";

export const revalidate = 900;

const COLLABORATORS = [
  ["Kevin Frazier", "The University of Texas School of Law"],
  ["Suresh Venkatasubramanian", "Center for Tech Responsibility, Brown University"],
  ["B Cavello", "Aspen Digital, The Aspen Institute"],
  ["Rachael Samberg", "UC Berkeley Library"],
  ["Adefoluke Shemsu", "SeedAI & Horizon Institute for Public Service"],
  ["Matthew Sag", "Emory University School of Law"],
  ["Diane Staheli", "MIT Lincoln Laboratory"],
  ["Dan Zhao", "NYU & MIT"],
  ["Cherry Wu", "Independent"],
  ["Alexander Schneider", "Independent"],
] as const;

const STEPS = [
  {
    n: "01",
    title: "Submit",
    body: "Researchers, civil society organizations, government bodies, and AI labs submit detailed AI use cases: the problem addressed, the system used, who benefits, the evidence, and the barriers to adoption.",
    link: { href: INTEREST_FORM_URL, label: "Express interest", external: true },
  },
  {
    n: "02",
    title: "The Raw Opportunity Bank",
    body: "Every submission lands first in a publicly viewable database — an unfiltered look at the incoming landscape, open for independent analysis and collaboration.",
    link: { href: "/inventory", label: "Browse the bank", external: false },
  },
  {
    n: "03",
    title: "The Vetted Opportunity Bank",
    body: "Student–faculty teams from Texas Law, Brown, Berkeley, and partner schools research each opportunity against criteria for impact, scalability, ethics, and societal alignment — producing memos that pass human editorial review before publication.",
    link: SUBSTACK_URL
      ? { href: SUBSTACK_URL, label: "Read published memos", external: true }
      : { href: "/assistant", label: "See how memos are built", external: false },
  },
] as const;

export default async function Home() {
  let count = 0;
  let domains = 0;
  try {
    const opps = await getOpportunities();
    count = opps.length;
    domains = uniqueValues(opps, "domain").length;
  } catch {
    /* stats are decorative; render without them */
  }

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-rule-strong">
        <div className="mx-auto w-full max-w-6xl px-5 pb-14 pt-16 sm:pb-20 sm:pt-24">
          <p className="label mb-6 text-accent rise">
            A public catalog of AI for the public good
          </p>
          <h1
            className="rise max-w-4xl font-serif text-5xl leading-[1.04] tracking-tight sm:text-7xl"
            style={{ animationDelay: "80ms" }}
          >
            Where could AI actually{" "}
            <em className="text-accent">help</em>?
          </h1>
          <p
            className="rise mt-7 max-w-2xl text-lg leading-relaxed text-ink-soft"
            style={{ animationDelay: "160ms" }}
          >
            The AI Opportunity Inventory identifies, catalogues, and analyzes AI use
            cases with real potential to advance major societal goals — from
            healthcare and education to energy and disaster response — and subjects
            each one to legal and policy scrutiny it can be trusted on.
          </p>
          <div
            className="rise mt-9 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "240ms" }}
          >
            <Link
              href="/inventory"
              className="label border border-rule-strong bg-ink px-5 py-3 text-paper transition-colors hover:bg-accent-deep"
            >
              Browse the inventory
            </Link>
            <Link
              href="/assistant"
              className="label border border-rule-strong px-5 py-3 transition-colors hover:bg-ink hover:text-paper"
            >
              Ask the assistant
            </Link>
          </div>
          {count > 0 ? (
            <div
              className="rise mt-12 flex gap-10 border-t border-rule pt-5"
              style={{ animationDelay: "320ms" }}
            >
              <div>
                <p className="font-serif text-3xl">{count}</p>
                <p className="label mt-1 text-ink-faint">Opportunities logged</p>
              </div>
              <div>
                <p className="font-serif text-3xl">{domains}</p>
                <p className="label mt-1 text-ink-faint">Societal domains</p>
              </div>
              <div>
                <p className="font-serif text-3xl">9+</p>
                <p className="label mt-1 text-ink-faint">Partner institutions</p>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* Why */}
      <section className="border-b border-rule">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 sm:grid-cols-[1fr_1.4fr] sm:py-20">
          <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
            Opportunity, <em className="text-accent">documented</em> — not press-released.
          </h2>
          <div className="space-y-4 text-[1.05rem] leading-relaxed text-ink-soft">
            <p>
              Policymakers, researchers, and funders struggle to find credible AI
              use cases outside of company press releases and blog posts. Every AI
              application carries the possibility of positive and negative social
              outcomes; this inventory deliberately focuses on the opportunity for
              positive results — and welcomes scrutiny of every entry, starting with
              our own.
            </p>
            <p>
              By systematically mapping AI uses against public policy problems, the
              inventory aims to foster collaboration, direct resources effectively,
              and inform policy that accelerates innovation for the public good.
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-b border-rule" id="process">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:py-20">
          <p className="label mb-10 text-ink-faint">How it works</p>
          <ol className="grid gap-px overflow-hidden border border-rule bg-rule sm:grid-cols-3">
            {STEPS.map((step) => (
              <li key={step.n} className="group bg-paper p-7 transition-colors hover:bg-paper-raised">
                <p className="font-serif text-5xl text-rule transition-colors group-hover:text-accent">
                  {step.n}
                </p>
                <h3 className="mt-4 font-serif text-2xl tracking-tight">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{step.body}</p>
                {step.link.external ? (
                  <a
                    href={step.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label mt-5 inline-block text-accent hover:text-accent-deep"
                  >
                    {step.link.label} ↗
                  </a>
                ) : (
                  <Link href={step.link.href} className="label mt-5 inline-block text-accent hover:text-accent-deep">
                    {step.link.label} →
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Assistant callout */}
      <section className="border-b border-rule bg-paper-sunken">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-16 sm:grid-cols-2 sm:py-20">
          <div>
            <p className="label mb-4 text-accent">The Research Assistant</p>
            <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
              A coach for the research,
              <br />
              not a ghostwriter.
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-ink-soft">
              Anyone can ask the assistant about the inventory. Community members
              unlock the full memo workflow: duplicate checks against the bank,
              structured triage, memo assignments, staged draft review, and
              submission to human editors. It will question your analysis — it
              won&apos;t write it for you.
            </p>
            <Link
              href="/assistant"
              className="label mt-7 inline-block border border-rule-strong bg-ink px-5 py-3 text-paper transition-colors hover:bg-accent-deep"
            >
              Open the assistant
            </Link>
          </div>
          <div className="border border-rule bg-paper p-6 text-sm leading-relaxed shadow-[6px_6px_0_0_var(--rule)]">
            <p className="label mb-4 text-ink-faint">From the workflow</p>
            <div className="space-y-3 font-mono text-[0.8rem]">
              <p><span className="text-accent">Decision:</span> Variant — revise direction</p>
              <p><span className="text-accent">Confidence:</span> 0.72</p>
              <p><span className="text-accent">Closest match:</span> Library-augmented generation for scholarly research</p>
              <p><span className="text-accent">Required next step:</span> Narrow to court-record collections and identify the operating institution.</p>
              <p><span className="text-accent">Suggested memo focus:</span> Access-to-justice deployment context; records privacy as the lead legal issue.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Collaborators */}
      <section className="border-b border-rule">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:py-20">
          <p className="label mb-8 text-ink-faint">Collaborators</p>
          <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {COLLABORATORS.map(([name, affiliation]) => (
              <li key={name} className="flex items-baseline justify-between gap-4 border-b border-rule pb-3">
                <span className="font-serif text-lg">{name}</span>
                <span className="text-right text-xs text-ink-faint">{affiliation}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-ink-soft">
            Full program details at{" "}
            <a href={UT_INVENTORY_URL} className="text-accent underline underline-offset-2 hover:text-accent-deep" target="_blank" rel="noopener noreferrer">
              law.utexas.edu/ai
            </a>
            .
          </p>
        </div>
      </section>

      {/* Join */}
      <section>
        <div className="mx-auto w-full max-w-6xl px-5 py-16 text-center sm:py-24">
          <h2 className="mx-auto max-w-2xl font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
            Research an opportunity.
            <br />
            <em className="text-accent">Shape the record.</em>
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-ink-soft">
            Students and researchers at participating institutions can join the
            community to submit AI opportunities, write research memos, or serve as
            editors.
          </p>
          <a
            href={INTEREST_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="label mt-8 inline-block border border-rule-strong bg-accent px-6 py-3.5 text-paper transition-colors hover:bg-accent-deep"
          >
            Join the community ↗
          </a>
        </div>
      </section>
    </div>
  );
}
