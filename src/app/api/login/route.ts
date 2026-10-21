import { NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "crypto";
import { COOKIE, createToken } from "@/lib/session";

export const runtime = "nodejs";

const same = (a: string, b: string) =>
  timingSafeEqual(createHash("sha256").update(a).digest(), createHash("sha256").update(b).digest());

export async function POST(req: Request) {
  const { ADMIN_USER, ADMIN_PASSWORD, SESSION_SECRET } = process.env;
  if (!ADMIN_USER || !ADMIN_PASSWORD || !SESSION_SECRET) {
    return NextResponse.json({ error: "Login is not configured" }, { status: 503 });
  }

  const { username = "", password = "" } = await req.json().catch(() => ({}));
  const ok = same(String(username), ADMIN_USER) && same(String(password), ADMIN_PASSWORD);
  if (!ok) {
    await new Promise((r) => setTimeout(r, 1000)); // slow down guessing
    return NextResponse.json({ error: "Ghalat username ya password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, await createToken(SESSION_SECRET), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 3600,
  });
  return res;
}
