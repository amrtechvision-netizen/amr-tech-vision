import GoogleAnalytics from "@/components/GoogleAnalytics";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://amr-tech-vision.vercel.app"),

  title: {
    default: "AMR TECH VISION | Complete ELV & Security Solutions",
    template: "%s | AMR TECH VISION",
  },

  description:
    "AMR TECH VISION is a leading ELV & Security Solution provider in Mumbai. We specialize in CCTV Installation, Fire Alarm Systems, Access Control, Networking, Building Management Systems (BMS), PA Systems, AMC Services, and complete security solutions.",

  keywords: [
    "AMR TECH VISION",
    "CCTV Installation Mumbai",
    "Fire Alarm System",
    "Access Control",
    "Networking",
    "Building Management System",
    "BMS",
    "PA System",
    "Security System",
    "ELV Company",
    "ELV Contractor",
    "CCTV Camera",
    "Video Surveillance",
    "AMC Services",
    "Mumbai",
  ],

  authors: [
    {
      name: "AMR TECH VISION",
    },
  ],

  creator: "AMR TECH VISION",

  publisher: "AMR TECH VISION",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "AMR TECH VISION",
    description:
      "Complete ELV & Security Solution Provider in Mumbai.",

    url: "https://amr-tech-vision.vercel.app",

    siteName: "AMR TECH VISION",

    locale: "en_IN",

    type: "website",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AMR TECH VISION",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "AMR TECH VISION",

    description:
      "Complete ELV & Security Solution Provider",

    images: ["/og-image.jpg"],
    
  },
  verification: {
  google: "S-sByf-uYuXuk0w0WRanx2gBVIEsmQc-p9vfr18glHU",
},

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <GoogleAnalytics />{children}</body>
    </html>
  );
}