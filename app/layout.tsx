import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import RootNavBar from "@/lib/navigation";
import { twMerge } from "tailwind-merge";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flash Genie",
  description: "Memorize like a Genie!",
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
          "flex flex-col h-lvh md:h-auto md:min-h-screen",
        )}
      >
        <RootNavBar />
        <main className="flex flex-1 flex-col items-center p-6">
          {children}
        </main>
      </body>
    </html>
  );
}
