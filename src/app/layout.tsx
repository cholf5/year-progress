import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Year of Progress - 年度进度",
  description: "实时展示年度进度，看看今年过去了多少，还剩多少时间。Time waits for no one, cherish every day!",
  keywords: ["年度进度", "时间管理", "进度条", "year progress", "time tracking"],
  authors: [{ name: "Year of Progress" }],
  creator: "Year of Progress",
  publisher: "Year of Progress",
  metadataBase: new URL('https://year-of-progress.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: '/',
    title: 'Year of Progress - 年度进度',
    description: '实时展示年度进度，看看今年过去了多少，还剩多少时间。Time waits for no one, cherish every day!',
    siteName: 'Year of Progress',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'Year of Progress - 年度进度卡片',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Year of Progress - 年度进度',
    description: '实时展示年度进度，看看今年过去了多少，还剩多少时间。Time waits for no one, cherish every day!',
    images: ['/api/og'],
    creator: '@yearofprogress',
  },
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
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#667eea" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
