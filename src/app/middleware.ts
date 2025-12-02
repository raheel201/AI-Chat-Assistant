import { auth } from "@/lib/auth";
export const middleware = auth((req: any) => {
  const isAuthPage = req.nextUrl.pathname === "/";
  const isAuthApiPage = req.nextUrl.pathname.startsWith("/api/auth");
  const isProtectedPage = req.nextUrl.pathname.startsWith("/chat");
  if (!req.auth) {
    if (isProtectedPage) {
      const newUrl = new URL("/", req.nextUrl.origin);
      return Response.redirect(newUrl);
    }
  } else {
    if (isAuthPage) {
      const newUrl = new URL("/chat", req.nextUrl.origin);
      return Response.redirect(newUrl);
    }
  }
});
export const config = {
  matcher: ["/", "/chat/:path*"],
};