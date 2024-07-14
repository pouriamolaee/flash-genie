import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import RootNavBar from "@/lib/navigation/RootNavBar";
import { twMerge } from "tailwind-merge";
import { BRAND_DESCRIPTION, BRAND_NAME } from "@/lib/constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  applicationName: BRAND_NAME,
  title: BRAND_NAME,
  description: BRAND_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: BRAND_NAME,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: BRAND_NAME,
    title: BRAND_NAME,
    description: BRAND_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: BRAND_NAME,
    description: BRAND_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={twMerge(
          inter.className,
          "flex flex-col h-dvh md:min-h-screen",
        )}
      >
        <RootNavBar />
        <main className="container flex flex-1 flex-col items-center p-6">
          {children}
        </main>
      </body>
    </html>
  );
}
