import { verifyToken } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    verifyToken(token);
    return NextResponse.next();
  } catch {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.set("token", "", {
      httpOnly: true,
      path: "/",
      expires: new Date(0),
    });
    return response;
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/trades/:path*",
    "/strategies/:path*",
    "/rulebook/:path*",
  ],
};