import { NextRequest, NextResponse } from "next/server";

// 把 URL ?lang= 的原始值塞到请求头里，让 RootLayout（server component）
// 在 SSR 阶段就能解析出正确的 <html lang>。
// 注：layout 不接 searchParams，但能读 headers()。
const URL_LANG_HEADER = "x-url-lang";

export function middleware(request: NextRequest) {
  const lang = request.nextUrl.searchParams.get("lang");
  if (!lang) return NextResponse.next();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(URL_LANG_HEADER, lang);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

// 只对页面路由生效，避开静态资源、API 路由、Next 内部资源
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon|robots.txt|sitemap.xml|.*\\..*).*)"],
};
