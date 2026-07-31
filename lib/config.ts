export const SITE_NAME = "AI Opportunity Inventory";

export const CONTACT_EMAIL = "ai@law.utexas.edu";

export const UT_PROGRAM_URL = "https://law.utexas.edu/ai/";
export const UT_INVENTORY_URL = "https://law.utexas.edu/ai/ai-opportunity-inventory/";

export const INTEREST_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSd_O9UWQqchZS97EwM0zbXI5j1wHSgifq8HS8A63r9idEhIrg/viewform";

// Set NEXT_PUBLIC_SUBSTACK_URL once Kevin spins up the publication.
export const SUBSTACK_URL = process.env.NEXT_PUBLIC_SUBSTACK_URL || "";

export const SESSION_COOKIE = "aoi_member";
export const SESSION_MAX_AGE_DAYS = 30;

// Per-request guardrails for the chat endpoint.
export const CHAT_MAX_MESSAGES = 60;
export const CHAT_MAX_TOTAL_CHARS = 80_000;
export const CHAT_MAX_TOOL_ROUNDS = 8;

export const CLAUDE_MODEL = process.env.CLAUDE_MODEL || "claude-sonnet-5";
