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
  title: "AMR TECH VISION | CCTV, Fire Alarm & ELV Solutions",
  description:
    "Professional CCTV Installation, Fire Alarm Systems, Access Control, Networking, BMS, PA System and complete ELV Solutions in Mumbai, India.",

  keywords: [
    "AMR TECH VISION",
    "CCTV Installation Mumbai",
    "Fire Alarm System",
    "Access Control",
    "Networking",
    "BMS",
    "PA System",
    "ELV Solutions",
    "Security Systems",
  ],

  authors: [{ name: "AMR TECH VISION" }],
  creator: "AMR TECH VISION",

  openGraph: {
    title: "AMR TECH VISION",
    description: "Professional ELV & Security Solutions in Mumbai",
    url: "https://amr-tech-vision.vercel.app/",
    siteName: "AMR TECH VISION",
    images: [
      {
        url: "/images/logo2.jpeg",
        width: 1200,
        height: 630,
        alt: "AMR TECH VISION Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
