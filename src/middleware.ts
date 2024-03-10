import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "./lib/supabase/middleware";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

// Constants for paths and error messages
const DASHBOARD_PATH = "/dashboard";
const LOGIN_PATH = "/login";
const REGISTER_PATH = "/register";
const ROOT_PATH = "/";
const EMAIL_LINK_ERROR = "Email link is invalid or has expired";

// Function to check if a path is one of the specified paths
const isPathOneOf = (path: string, paths: string[]) => paths.includes(path);

export async function middleware(req: NextRequest) {
  const {
    user: {
      data: { user },
      error,
    },
    response,
  } = await updateSession(req);

  // Check if the request is for the dashboard and there's no session
  if (req.nextUrl.pathname.startsWith(DASHBOARD_PATH) && !user) {
    return NextResponse.redirect(new URL(LOGIN_PATH, req.url));
  }

  // Check if there's an email link error and the request is not for registration
  if (
    req.nextUrl.searchParams.get("error_description") === EMAIL_LINK_ERROR &&
    req.nextUrl.pathname !== REGISTER_PATH
  ) {
    return NextResponse.redirect(
      new URL(
        `${REGISTER_PATH}?error_description=${req.nextUrl.searchParams.get(
          "error_description",
        )}`,
        req.url,
      ),
    );
  }

  // Check if the request is for login, registration, or root and there's a session
  if (
    isPathOneOf(req.nextUrl.pathname, [LOGIN_PATH, REGISTER_PATH, ROOT_PATH]) &&
    user
  ) {
    return NextResponse.redirect(new URL(DASHBOARD_PATH, req.url));
  }
  return response;
}

/*
 * Match all request paths except for the ones starting with:
 * - _next/static (static files)
 * - _next/image (image optimization files)
 * - favicon.ico (favicon file)
 */

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
