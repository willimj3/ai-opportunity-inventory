import type { Opportunity } from "./types";
import { listOpportunities } from "./appsScript";

const TTL_MS = 15 * 60 * 1000;

let cached: { at: number; data: Opportunity[] } | null = null;

/** Opportunities from the Raw Opportunity Bank, cached per server instance. */
export async function getOpportunities(): Promise<Opportunity[]> {
  if (cached && Date.now() - cached.at < TTL_MS) return cached.data;
  const data = await listOpportunities();
  cached = { at: Date.now(), data };
  return data;
}

export function uniqueValues(opps: Opportunity[], field: keyof Opportunity): string[] {
  const seen = new Set<string>();
  for (const opp of opps) {
    const value = (opp[field] || "").trim();
    if (value) seen.add(value);
  }
  return [...seen].sort();
}
