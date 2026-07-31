import { NextResponse } from "next/server";
import { checkRoster } from "@/lib/appsScript";
import { signSession, verifySession } from "@/lib/session";
import { INTEREST_FORM_URL, SESSION_COOKIE, SESSION_MAX_AGE_DAYS } from "@/lib/config";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function GET(request: Request) {
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader.match(new RegExp(`${SESSION_COOKIE}=([^;]+)`));
  const session = verifySession(match?.[1]);
  if (!session) return NextResponse.json({ member: false });
  return NextResponse.json({ member: true, name: session.name, school: session.school });
}

export async function POST(request: Request) {
  let email = "";
  try {
    const body = await request.json();
    email = String(body.email || "").trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  try {
    const roster = await checkRoster(email);
    if (!roster.member) {
      return NextResponse.json({ member: false, interestFormUrl: INTEREST_FORM_URL });
    }
    const token = signSession({
      email,
      name: roster.name || "",
      school: roster.school || "",
      role: roster.role || "",
      iat: Date.now(),
    });
    const res = NextResponse.json({ member: true, name: roster.name, school: roster.school });
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE_DAYS * 24 * 60 * 60,
    });
    return res;
  } catch (err) {
    console.error("verify failed:", err);
    return NextResponse.json(
      { error: "We couldn't check the member roster right now. Please try again shortly." },
      { status: 502 },
    );
  }
}

export async function DELETE() {
  const res = NextResponse.json({ member: false });
  res.cookies.delete(SESSION_COOKIE);
  return res;
}
