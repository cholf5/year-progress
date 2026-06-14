import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { headers, cookies } from "next/headers";
import "./globals.css";
import { generateWebApplicationSchema } from "../lib/structuredData";
import { getSeoBaseUrl } from "../lib/utils/baseUrl";
import { getCachedLanguages, resolveServerLanguage } from "../lib/i18n";

// 中间件注入的请求头：URL 中 ?lang= 的原始值
const URL_LANG_HEADER = "x-url-lang";
// 用户偏好 cookie（与 src/lib/settings.ts 写入的键保持一致）
const SETTINGS_COOKIE = "yearProgressSettings";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | YearProgress.org',
    default: "YearProgress.org - Real-time Yearly Progress Visualization"
  },
  description: "Real-time yearly progress visualization. See how much of the year has passed and how much time remains. Share on social media to generate beautiful progress cards!",
  keywords: ["year progress", "time tracking", "progress bar", "yearly progress", "time visualization", "social sharing", "year tracker", "calendar progress", "time management", "annual progress"],
  authors: [{ name: "YearProgress.org" }],
  creator: "YearProgress.org",
  publisher: "YearProgress.org",
  metadataBase: new URL(getSeoBaseUrl()),
  alternates: {
    canonical: '/',
    languages: Object.fromEntries(
      getCachedLanguages().map(lang => [
        lang,
        lang === 'en' ? '/' : `/?lang=${encodeURIComponent(lang)}`,
      ])
    ),
  },
  manifest: '/manifest.webmanifest',
  // OpenGraph 和 Twitter 卡片信息将在 page.tsx 中动态设置
  // Remove static OG images - they will be set dynamically in page component
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  }),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 在服务端解析当前请求的目标语言（URL > cookie > Accept-Language > 'en'）
  // 这是 <html lang> 的真实值，让爬虫与屏幕阅读器在 SSR 阶段就拿到正确语言
  const [hdrs, cookieStore] = await Promise.all([headers(), cookies()]);
  const language = resolveServerLanguage({
    urlLang: hdrs.get(URL_LANG_HEADER),
    settingsCookie: cookieStore.get(SETTINGS_COOKIE)?.value,
    acceptLanguage: hdrs.get("accept-language"),
  });

  // 生成结构化数据（用解析出的实际语言）
  const structuredData = generateWebApplicationSchema(language);

  return (
    <html lang={language}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="YearProgress.org" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* 结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        
        </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
