import { NextRequest, NextResponse } from "next/server";
import { COOKIE, verifyToken } from "@/lib/session";

export async function middleware(req: NextRequest) {
  if (await verifyToken(req.cookies.get(COOKIE)?.value, process.env.SESSION_SECRET)) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/login", req.url));
}

export const config = { matcher: ["/admin/:path*"] };
