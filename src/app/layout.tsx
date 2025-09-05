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
  title: "Year Progress - Real-time Yearly Progress Visualization",
  description: "Real-time yearly progress visualization. See how much of the year has passed and how much time remains. Share on social media to generate beautiful progress cards!",
  keywords: ["year progress", "time tracking", "progress bar", "yearly progress", "time visualization", "social sharing"],
  authors: [{ name: "Year Progress" }],
  creator: "Year Progress",
  publisher: "Year Progress",
  metadataBase: new URL('https://yearprogressbar.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Year Progress - Real-time Yearly Progress Visualization',
    description: 'Real-time yearly progress visualization. See how much of the year has passed and how much time remains. Share to generate beautiful progress cards!',
    siteName: 'Year Progress',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'Year Progress - Real-time yearly progress card',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Year Progress - Real-time Yearly Progress Visualization',
    description: 'Real-time yearly progress visualization. See how much of the year has passed and how much time remains.',
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
    <html lang="en">
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
