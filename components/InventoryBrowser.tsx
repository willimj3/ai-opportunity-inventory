"use client";

import { useMemo, useState } from "react";
import type { Opportunity } from "@/lib/types";

interface Props {
  opportunities: Opportunity[];
  domains: string[];
  stages: string[];
  orgTypes: string[];
}

function stageShort(stage: string): string {
  const idx = stage.indexOf(":");
  return idx > 0 ? stage.slice(0, idx) : stage;
}

const DETAIL_FIELDS: Array<[keyof Opportunity, string]> = [
  ["beneficiaries", "Primary beneficiaries"],
  ["geoScope", "Geographic scope"],
  ["aiModel", "AI model / system"],
  ["evidence", "Evidence of impact"],
  ["barriers", "Barriers to wider adoption"],
  ["enablers", "Key enablers for growth"],
];

export function InventoryBrowser({ opportunities, domains, stages, orgTypes }: Props) {
  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState("");
  const [stage, setStage] = useState("");
  const [orgType, setOrgType] = useState("");
  const [open, setOpen] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return opportunities.filter((opp) => {
      if (domain && opp.domain !== domain) return false;
      if (stage && opp.deploymentStage !== stage) return false;
      if (orgType && opp.orgType !== orgType) return false;
      if (!q) return true;
      const haystack =
        `${opp.title} ${opp.summary} ${opp.submitter} ${opp.domain} ${opp.beneficiaries} ${opp.geoScope} ${opp.aiModel}`.toLowerCase();
      return q.split(/\s+/).every((word) => haystack.includes(word));
    });
  }, [opportunities, query, domain, stage, orgType]);

  const selectClass =
    "label border border-rule bg-paper-raised px-3 py-2.5 text-ink-soft outline-none focus:border-accent transition-colors max-w-full";

  return (
    <div className="mt-10">
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3 border-y border-rule-strong py-4">
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(null);
          }}
          placeholder="Search titles, summaries, models…"
          className="min-w-52 flex-1 border border-rule bg-paper-raised px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-ink-faint focus:border-accent"
        />
        <select value={domain} onChange={(e) => setDomain(e.target.value)} className={selectClass} aria-label="Filter by societal domain">
          <option value="">All domains</option>
          {domains.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <select value={stage} onChange={(e) => setStage(e.target.value)} className={selectClass} aria-label="Filter by deployment stage">
          <option value="">All stages</option>
          {stages.map((s) => (
            <option key={s} value={s}>{stageShort(s)}</option>
          ))}
        </select>
        <select value={orgType} onChange={(e) => setOrgType(e.target.value)} className={selectClass} aria-label="Filter by organization type">
          <option value="">All org types</option>
          {orgTypes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <p className="label mt-4 text-ink-faint">
        {filtered.length} {filtered.length === 1 ? "entry" : "entries"}
        {filtered.length !== opportunities.length ? ` of ${opportunities.length}` : ""}
      </p>

      {/* Entries */}
      <ul className="mt-4 space-y-4">
        {filtered.map((opp, i) => {
          const isOpen = open === i;
          return (
            <li key={`${opp.title}-${i}`} className="border border-rule bg-paper-raised transition-shadow hover:shadow-[4px_4px_0_0_var(--rule)]">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full p-5 text-left sm:p-6"
                aria-expanded={isOpen}
              >
                <div className="flex flex-wrap items-center gap-2">
                  {opp.domain ? <span className="label bg-accent-wash px-2 py-1 text-accent-deep">{opp.domain}</span> : null}
                  {opp.deploymentStage ? (
                    <span className="label border border-rule px-2 py-1 text-ink-faint">{stageShort(opp.deploymentStage)}</span>
                  ) : null}
                </div>
                <h2
                  className={`mt-3 font-serif leading-snug tracking-tight ${
                    opp.title.length > 120 ? "text-lg" : "text-2xl"
                  } ${isOpen ? "" : "line-clamp-3"}`}
                >
                  {opp.title}
                </h2>
                <p className={`mt-2 text-sm leading-relaxed text-ink-soft ${isOpen ? "" : "line-clamp-4"}`}>
                  {opp.summary}
                </p>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <p className="label text-ink-faint">
                    {opp.submitter}
                    {opp.orgLocation ? ` · ${opp.orgLocation}` : ""}
                  </p>
                  <span className="label text-accent">{isOpen ? "Close −" : "Details +"}</span>
                </div>
              </button>
              {isOpen ? (
                <div className="border-t border-rule px-5 pb-6 pt-4 sm:px-6">
                  <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                    {DETAIL_FIELDS.map(([field, heading]) =>
                      opp[field] ? (
                        <div key={field}>
                          <dt className="label mb-1.5 text-ink-faint">{heading}</dt>
                          <dd className="whitespace-pre-line text-sm leading-relaxed text-ink-soft">{opp[field]}</dd>
                        </div>
                      ) : null,
                    )}
                  </dl>
                  {opp.website ? (
                    <a
                      href={opp.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label mt-5 inline-block text-accent hover:text-accent-deep"
                    >
                      Visit website ↗
                    </a>
                  ) : null}
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>

      {filtered.length === 0 ? (
        <div className="mt-4 border border-rule bg-paper-sunken p-10 text-center">
          <p className="font-serif text-2xl">No entries match.</p>
          <p className="mt-2 text-sm text-ink-soft">Try clearing a filter or broadening your search.</p>
        </div>
      ) : null}
    </div>
  );
}
