import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { publicRoutes } from "constants/routes";

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.some((route) => path.match(route));

  const cookie = (await cookies()).get("token")?.value;

  if (!isPublicRoute && !cookie) {
    (await cookies()).set("redirectedFrom", path);
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublicRoute && cookie) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Proxy should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png|.*\\.ico|.*\\.svg|.*\\.json).*)"],
};
