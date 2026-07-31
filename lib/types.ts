// Field names mirror the columns of the Raw Opportunity Bank sheet
// ("AI Opportunity Tracker Public View"), columns A–O.
export interface Opportunity {
  website: string;
  title: string; // "Big Picture"
  summary: string; // "One-sentence Summary of Opportunity"
  submitter: string; // "Submitting Organization / Individual"
  orgType: string;
  govBranch: string; // "If government, please specify which branch"
  orgLocation: string;
  domain: string; // "Societal domain"
  beneficiaries: string; // "Primary Beneficiaries"
  geoScope: string; // "Geographic Scope"
  deploymentStage: string;
  evidence: string; // "Evidence of Impact"
  aiModel: string; // "AI Model or System Description"
  barriers: string; // "Barriers to Wider Adoption"
  enablers: string; // "Key Enablers for Growth"
}

export interface RosterEntry {
  member: boolean;
  name?: string;
  school?: string;
  role?: string;
}

export interface Session {
  email: string;
  name: string;
  school: string;
  role: string;
  iat: number; // epoch ms
}

export interface SearchMatch {
  title: string;
  summary: string;
  domain: string;
  deploymentStage: string;
  source: "opportunity" | "prospect";
  score: number;
}

export type ChatEvent =
  | { type: "text"; text: string }
  | { type: "tool"; name: string; label: string }
  | { type: "done" }
  | { type: "error"; message: string };
