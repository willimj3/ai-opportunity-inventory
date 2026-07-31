import crypto from "crypto";
import type { Session } from "./types";
import { SESSION_MAX_AGE_DAYS } from "./config";

const SECRET = process.env.SESSION_SECRET || "dev-only-session-secret-change-me";

function hmac(data: string): string {
  return crypto.createHmac("sha256", SECRET).update(data).digest("base64url");
}

export function signSession(session: Session): string {
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");
  return `${payload}.${hmac(payload)}`;
}

export function verifySession(token: string | undefined): Session | null {
  if (!token) return null;
  const dot = token.lastIndexOf(".");
  if (dot < 0) return null;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = hmac(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString()) as Session;
    const ageMs = Date.now() - session.iat;
    if (ageMs < 0 || ageMs > SESSION_MAX_AGE_DAYS * 24 * 60 * 60 * 1000) return null;
    if (typeof session.email !== "string" || !session.email) return null;
    return session;
  } catch {
    return null;
  }
}
